import {fileURLToPath} from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });
