import fs from 'fs';
import path from 'path';

export function getRandomFile(directory: string): string | null {
    try {
        const files = fs.readdirSync(directory);
        if (files.length === 0) return null; // Return null if directory is empty

        const randomIndex = Math.floor(Math.random() * files.length);
        return path.join(directory, files[randomIndex]); // Return full path
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
        return null;
    }
}