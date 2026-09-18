import fs from 'fs';
import path from 'path';

try {
  fs.cpSync(path.resolve('src/managed'), path.resolve('dist/managed'), { recursive: true });
  console.log('Successfully copied src/managed to dist/managed for production runtime.');
} catch (error) {
  console.error('Failed to copy managed artifacts:', error);
  process.exit(1);
}
