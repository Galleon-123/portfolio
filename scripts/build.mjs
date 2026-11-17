import { mkdir, copyFile, cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
const out = resolve('dist');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'resume.html', 'robots.txt', 'sitemap.xml', '_headers', '404.html']) await copyFile(file, resolve(out, file));
for (const dir of ['assets', '25IT200']) await cp(dir, resolve(out, dir), { recursive: true, filter: src => !src.endsWith('.DS_Store') });
console.log('Built static portfolio in dist/ — no runtime dependencies.');
