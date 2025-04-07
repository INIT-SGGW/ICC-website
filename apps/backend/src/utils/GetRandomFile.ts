import fs from 'node:fs';
import path from 'node:path';
import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

export function getRandomFile(directory: string): string | null {
  try {
    const files = fs.readdirSync(directory);
    if (files.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * files.length);
    return path.join(directory, files[randomIndex]);
  } catch (error) {
    throw new HttpException('Failed to read the directory', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
