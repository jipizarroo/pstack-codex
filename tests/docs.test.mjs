import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

test('docs checker accepts the port and rejects broken links, skills, and model defaults', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'pstack-docs-'));
  try {
    mkdirSync(join(fixture, 'scripts'));
    cpSync(join(root, 'scripts/check-pstack-docs.mjs'), join(fixture, 'scripts/check-pstack-docs.mjs'));
    cpSync(join(root, 'plugins'), join(fixture, 'plugins'), {
      recursive: true,
      filter: source => !source.split('/').includes('node_modules'),
    });
    const readme = join(fixture, 'plugins/pstack/README.md');
    const original = readFileSync(readme, 'utf8');
    const check = () => spawnSync(process.execPath, [join(fixture, 'scripts/check-pstack-docs.mjs')], {encoding:'utf8'});
    assert.equal(check().status, 0);
    for (const [addition, expected] of [
      ['\n[Missing](docs/missing.md)\n', /links to docs\/missing.md, which does not exist/],
      ['\nUse `$missing-skill`.\n', /names \$missing-skill/],
      ['\nDefault model: gpt-999-fake.\n', /names model gpt-999-fake/],
    ]) {
      writeFileSync(readme, original + addition);
      const result = check();
      assert.equal(result.status, 1, result.stdout + result.stderr);
      assert.match(result.stdout, expected);
    }
  } finally {
    rmSync(fixture, {recursive:true, force:true});
  }
});
