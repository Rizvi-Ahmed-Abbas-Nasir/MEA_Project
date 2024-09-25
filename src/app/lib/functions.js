import path from "path";
import { promises as fs } from 'fs';
// import { writeFile } from "fs/promises";

export function isApiValid(key) {
    if (process.env.NEXT_PUBLIC_API_KEY === key){
        return true
    } else {
        return false
    }
}


export async function generateUniqueFileName(directory, fileName) {
    let counter = 1;
    let newFileName = fileName;
    const fileExtension = path.extname(fileName);
    const fileNameWithoutExtension = path.basename(fileName, fileExtension);
  
    while (await fs.stat(path.join(directory, newFileName)).catch(() => false)) {
      newFileName = `${fileNameWithoutExtension}(${counter})${fileExtension}`;
      counter += 1;
    }
    
    return newFileName;
  }