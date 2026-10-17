import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const audit = fileURLToPath(new URL('./worktree-audit.sh', import.meta.url));
test('audit preserves spaced paths, scopes session metadata, and holds unpreserved work', () => {
  const fixture = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'pstack audit ')));
  const repo = path.join(fixture, 'main repo');
  const home = path.join(fixture, 'home');
  const bin = path.join(fixture, 'bin');
  fs.mkdirSync(repo); fs.mkdirSync(bin); fs.mkdirSync(home);
  const env = {...process.env, HOME:home, PATH:`${bin}:${process.env.PATH}`, GIT_CONFIG_NOSYSTEM:'1'};
  const git = (...args) => execFileSync('git', ['-C',repo,...args], {env,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
  try {
    git('init','-b','main'); git('config','user.name','Fixture'); git('config','user.email','fixture@example.invalid');
    git('commit','--allow-empty','-m','base'); git('update-ref','refs/remotes/origin/main','HEAD');
    const paths = {};
    for (const branch of ['safe','recent','quoted','closed','scratch']) {
      paths[branch] = path.join(fixture,`${branch} tree`);
      git('worktree','add','-b',branch,paths[branch],'main');
    }
    execFileSync('git',['-C',paths.closed,'commit','--allow-empty','-m','unmerged'],{env,stdio:'ignore'});
    fs.writeFileSync(path.join(paths.scratch,'precious.txt'),'user work');
    fs.writeFileSync(path.join(bin,'gh'),'#!/bin/sh\nprintf \'[{"number":1,"state":"CLOSED","headRefName":"closed"}]\\n\'\n',{mode:0o755});
    fs.writeFileSync(path.join(bin,'origin'),'#!/bin/sh\nexit 1\n',{mode:0o755});
    const sessions=path.join(home,'.codex','sessions'); fs.mkdirSync(sessions,{recursive:true});
    fs.writeFileSync(path.join(sessions,'recent chat.jsonl'), JSON.stringify({type:'session_meta',payload:{cwd:paths.recent}})+'\n');
    fs.writeFileSync(path.join(sessions,'quoted chat.jsonl'), JSON.stringify({type:'session_meta',payload:{cwd:repo}})+'\n'+JSON.stringify({type:'message',text:paths.quoted})+'\n');
    const out=execFileSync('bash',[audit,repo],{env,encoding:'utf8',stdio:['ignore','pipe','pipe']});
    const rows=new Map(out.trim().split('\n').filter(line => !line.startsWith('#')).slice(1).map(line=>{const c=line.split('\t'); return [c[8],c];}));
    assert.equal(rows.size,5);
    assert.equal(rows.get(paths.safe)[7],'safe');
    assert.equal(rows.get(paths.recent)[7],'verify-recent-chat');
    assert.equal(rows.get(paths.quoted)[7],'safe');
    assert.equal(rows.get(paths.closed)[7],'review');
    assert.equal(rows.get(paths.scratch)[7],'hold-wip');
    assert.equal(fs.readFileSync(path.join(paths.scratch,'precious.txt'),'utf8'),'user work');
  } finally { fs.rmSync(fixture,{recursive:true,force:true}); }
});


function withBaseFixture(operation) {
  const fixture = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'pstack audit base ')));
  const repo = path.join(fixture, 'repo');
  const bin = path.join(fixture, 'bin');
  const home = path.join(fixture, 'home');
  const candidate = path.join(fixture, 'candidate tree');
  const calls = path.join(fixture, 'fetch-calls');
  fs.mkdirSync(repo); fs.mkdirSync(bin); fs.mkdirSync(home);
  const env = { ...process.env, HOME: home, PATH: `${bin}:${process.env.PATH}`, GIT_CONFIG_NOSYSTEM: '1' };
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], { env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  const realGit = execFileSync('which', ['git'], { encoding: 'utf8' }).trim();
  try {
    git('init', '-b', 'main'); git('config', 'user.name', 'Fixture'); git('config', 'user.email', 'fixture@example.invalid');
    git('commit', '--allow-empty', '-m', 'base');
    git('update-ref', 'refs/remotes/origin/main', 'HEAD');
    git('commit', '--allow-empty', '-m', 'integration');
    git('branch', 'integration');
    git('update-ref', 'refs/remotes/origin/integration', 'HEAD');
    git('symbolic-ref', 'refs/remotes/origin/HEAD', 'refs/remotes/origin/integration');
    git('worktree', 'add', '-b', 'candidate', candidate, 'integration');
    fs.writeFileSync(path.join(bin, 'git'), `#!/bin/sh
if [ "$1" = fetch ]; then printf 'fetch\\n' >> '${calls}'; exit 2; fi
exec '${realGit}' "$@"
`, { mode: 0o755 });
    fs.writeFileSync(path.join(bin, 'gh'), `#!/bin/sh\nprintf '[]\\n'\n`, { mode: 0o755 });
    fs.writeFileSync(path.join(bin, 'origin'), '#!/bin/sh\nexit 1\n', { mode: 0o755 });
    const run = (...args) => spawnSync('bash', [audit, ...args, repo], { env, encoding: 'utf8', timeout: 5000 });
    const row = (result) => result.stdout.trim().split('\n').find(line => line.endsWith(`\t${candidate}`))?.split('\t');
    operation({ git, run, row, bin, candidate });
    assert.equal(fs.existsSync(calls), false, 'audit uses cached refs without fetching');
  } finally { fs.rmSync(fixture, { recursive: true, force: true }); }
}

test('audit uses the remote default branch before origin/main', () => {
  withBaseFixture(({ run, row }) => {
    const result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(row(result)?.[2], 'YES', result.stdout);
    assert.match(result.stdout, /^# base: origin\/integration\n/u);
  });
});

for (const option of ['-b', '--base']) {
  test(`audit accepts ${option} and a local integration base`, () => {
    withBaseFixture(({ run, row }) => {
      const result = run(option, 'integration');
      assert.equal(result.status, 0, result.stderr);
      assert.equal(row(result)?.[2], 'YES', result.stdout);
      const other = run(option, 'origin/main');
      assert.equal(other.status, 0, other.stderr);
      assert.equal(row(other)?.[2], 'no', other.stdout);
    });
  });
}

test('audit falls back to origin/master when the default and main refs are missing', () => {
  withBaseFixture(({ git, run, row }) => {
    git('symbolic-ref', '--delete', 'refs/remotes/origin/HEAD');
    git('update-ref', '-d', 'refs/remotes/origin/main');
    git('update-ref', 'refs/remotes/origin/master', 'integration');
    const result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(row(result)?.[2], 'YES', result.stdout);
    assert.match(result.stdout, /^# base: origin\/master\n/u);
  });
});

test('audit rejects an unknown explicit base', () => {
  withBaseFixture(({ run }) => {
    const result = run('--base', 'missing-base');
    assert.equal(result.status, 1);
    assert.match(result.stderr, /base ref not found: missing-base/u);
  });
});

test('audit holds draft pull requests returned by Origin', () => {
  withBaseFixture(({ run, row, bin }) => {
    fs.writeFileSync(path.join(bin, 'origin'), `#!/bin/sh\nprintf '[{"number":2,"status":"draft","headRef":"candidate"}]\\n'\n`, { mode: 0o755 });
    const result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(row(result)?.[5], '#2/draft', result.stdout);
    assert.equal(row(result)?.[7], 'hold-open-pr', result.stdout);
  });
});
