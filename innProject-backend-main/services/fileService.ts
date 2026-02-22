import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export class FileService {
  async uploadToCloudinary(filePath: string, folder: string) {
    try {
      const result = await cloudinary.uploader.upload(filePath, { folder });
      fs.unlinkSync(filePath); // remove temp file
      return result.secure_url;
    } catch (error) {
      throw new Error(`Cloudinary upload failed: ${error}`);
    }
  }
}
