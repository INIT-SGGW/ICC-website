import AdmZip from 'adm-zip';
import fs from 'fs';
import { join } from 'path';

export async function unzipFile(zipFilePath: string, extractTo: string) {
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
        throw new Error('Failed to unzip the file');
    }
}