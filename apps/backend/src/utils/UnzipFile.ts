import fs from 'node:fs';
import { join } from 'node:path';
import AdmZip from 'adm-zip';
import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

export function unzipFile(zipFilePath: string, extractTo: string): void {
  try {
    const zip = new AdmZip(zipFilePath);
    const zipEntries = zip.getEntries();

    zipEntries.forEach((entry) => {
      const entryPath = join(extractTo, entry.name);

      if (entry.isDirectory) {
        fs.mkdirSync(entryPath, { recursive: true });
      } else {
        const fileData = zip.readFile(entry);
        if (fileData) {
          fs.writeFileSync(entryPath, fileData);
        }
      }
    });

    fs.unlinkSync(zipFilePath);
  } catch (error) {
    throw new HttpException('Wystąpił błąd podczas rozpakowywania pliku', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
