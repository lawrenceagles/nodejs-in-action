import { promises as fsPromises } from 'fs';
import path from 'path';
import pLimit from 'p-limit';



async function recursiveFind(dir, keyword) {
  const limit = pLimit(5);
  const hits = [];
  await limit(() => scanDir(dir, keyword, hits, limit));
  return hits;
}

async function scanDir(dir, keyword, hits, limit) {
  const dirEntries = await fsPromises.readdir(dir);
  const promises = [];
  for (const dirEntry of dirEntries) {
    promises.push(limit(async () => await findInFileTask(path.join(dir, dirEntry), keyword, hits, limit)));
  }
  await Promise.all(promises);
  return;
}

async function findInFileTask(dirEntryPath, keyword, hits, limit) {
  const stat = await fsPromises.stat(dirEntryPath);
  if (stat.isDirectory()) {
    return scanDir(dirEntryPath, keyword, hits, limit);
  } else {
    findKeywordInFileContents(dirEntryPath, keyword, hits);
  }
}

async function findKeywordInFileContents(file, keyword, hits) {
  const contents = await fsPromises.readFile(file, 'utf-8');
  if (contents.match(keyword)) {
    hits.push(file);
  }
  return;
}


recursiveFind('sample_dir', 'foo')
  .then(console.log)
  .catch(console.error);
