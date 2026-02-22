import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export class FileService {

  async uploadToCloudinary(
    fileBuffer: Buffer,
    folder: string
  ): Promise<string> {

    return new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url || '');
        }
      );

      stream.end(fileBuffer);
    });
  }
}
