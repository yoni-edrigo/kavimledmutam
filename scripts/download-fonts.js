#!/usr/bin/env node
// Downloads all Ot Hayim fonts to public/fonts/ so they can be served locally,
// avoiding CORS issues with the ot-hayim.co.il origin.
// Run with: node scripts/download-fonts.js

import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const registry = JSON.parse(
  await import('fs').then((fs) =>
    fs.promises.readFile(
      path.join(__dirname, '../src/font-registry.json'),
      'utf8'
    )
  )
);

const OUT_DIR = path.join(__dirname, '../public/fonts');
mkdirSync(OUT_DIR, { recursive: true });

let downloaded = 0;
let skipped = 0;
let failed = 0;

for (const entry of registry) {
  const url = entry['font-url'];
  const filename = url.split('/').pop();
  const dest = path.join(OUT_DIR, filename);

  if (existsSync(dest)) {
    skipped++;
    continue;
  }

  process.stdout.write(`Downloading ${filename} ...`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await pipeline(res.body, createWriteStream(dest));
    console.log(' done');
    downloaded++;
  } catch (err) {
    console.log(` FAILED (${err.message})`);
    failed++;
  }
}

console.log(`\nDone. Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`);
