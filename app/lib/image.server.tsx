import cloudinary from "cloudinary";
import { writeAsyncIterableToWritable } from "@remix-run/node";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});

// image upload helper. NB: fix any types
export async function uploadImage(data: any) {
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder: "remixImages",
      type: "private",
      },
      (error: any, result: any) => {
        if (error) {
          reject(error)
          return;
        }
        resolve(result)
      }
    )
    await writeAsyncIterableToWritable(data, uploadStream);
  });
  return uploadPromise;
}