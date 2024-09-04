import {fileURLToPath} from 'url';
import { dirname } from 'path';
import multer from 'multer';

//------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}