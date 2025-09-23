import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

export async function downloadImage(imageUrl: string): Promise<string> {
  try {
    const urlObj = new URL(imageUrl);
    const fileName = path.basename(urlObj.pathname);
    const filePath = path.join('public/images/downloads', fileName);
    fs.mkdirSync('public/images/downloads', { recursive: true });
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise<string>((resolve, reject) => {
      writer.on('finish', () => resolve('/images/downloads/' + fileName));
      writer.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(new Error('Write file fail. ' + err.message));
      });
    });
  } catch (error: any) {
    throw new Error(`Download file failed "${imageUrl}": ${error.message}`);
  }
}
