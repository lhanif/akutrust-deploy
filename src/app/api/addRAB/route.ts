import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import Rab from '@/lib/models/Rab';
import { connectDB } from "@/lib/mongodb";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: File | null = formData.get('file') as unknown as File;
  const id_proyek = formData.get('id_proyek') as string;

  if (!file || !id_proyek) {
    return NextResponse.json({ error: 'File dan id_proyek harus diisi.' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await connectDB();

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'rab_docs',
          resource_type: 'raw',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });

    const savedRab = await Rab.create({
      id_proyek,
      file_url: (uploadResult as any).secure_url,
    });

    return NextResponse.json(savedRab, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Upload gagal' }, { status: 500 });
  }
}
