import fs from 'fs';
import path from 'path';
import pkg from '../../package.json';

const SRC = path.join(__dirname, '..');
const ROOT = path.join(__dirname, '..', '..');

const sourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === '__tests__' ? [] : sourceFiles(full);
    }
    return /\.tsx?$/.test(entry.name) ? [full] : [];
  });

const bareImports = (file: string): string[] =>
  Array.from(fs.readFileSync(file, 'utf8').matchAll(/from '([^']+)'/g))
    .map((m) => m[1])
    .filter((spec) => !spec.startsWith('.'));

describe('package manifest', () => {
  const declared = new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ]);

  it.each(
    sourceFiles(SRC).flatMap((f) => bareImports(f).map((i) => [i] as const))
  )('declares %s as a runtime dependency', (spec) => {
    expect(declared).toContain(spec.split('/')[0]);
  });

  it('only ships paths that exist', () => {
    const missing = pkg.files
      .filter((entry) => !entry.startsWith('!') && entry !== 'lib')
      .filter((entry) => !fs.existsSync(path.join(ROOT, entry)));
    expect(missing).toEqual([]);
  });
});
