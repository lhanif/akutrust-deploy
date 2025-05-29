import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Proyek from '@/lib/models/Proyek';
import { getTokenFromCookies } from '@/lib/auth';
import { jwtVerify } from 'jose';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: Request) {
  try {
    await connectDB();

    // Verifikasi token
    const token = await getTokenFromCookies();
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id;

    // Ambil data dari form
    const formData = await req.formData();
    const nama_proyek = formData.get('nama_proyek')?.toString() || '';
    const deskripsi_proyek = formData.get('deskripsi_proyek')?.toString() || '';
    const lokasi_proyek = formData.get('lokasi_proyek')?.toString() || '';
    const status_proyek = formData.get('status_proyek')?.toString() || 'Belum';
    // const id_instansi = formData.get('id_instansi')?.toString() || '';

    const fileFoto = formData.get('foto_proyek') as File | null;
    const fileDokumen = formData.get('dokumen_proyek') as File | null;

    // Konfigurasi Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
    });

    // Fungsi upload ke Cloudinary
    const uploadToCloudinary = async (file: File, folder: string) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Ambil nama file asli dari File object
      const originalName = file.name || 'file';
      const extension = file.type === 'application/pdf' ? '.pdf' : '';
      const filename = originalName.endsWith(extension) ? originalName : originalName + extension;

      return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: filename.replace(/\.[^/.]+$/, ''), // tanpa ekstensi
            resource_type: file.type.startsWith('image') ? 'image' : 'raw',
            format: extension.replace('.', ''), // pastikan PDF tersimpan sebagai .pdf
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result?.secure_url || '');
          }
        ).end(buffer);
      });
    };


    // Upload file ke Cloudinary
    let fotoURL = '';
    let dokumenURL = '';

    if (fileFoto && fileFoto.type.startsWith('image')) {
      fotoURL = await uploadToCloudinary(fileFoto, 'foto_proyek');
    }

    if (fileDokumen && fileDokumen.type === 'application/pdf') {
      dokumenURL = await uploadToCloudinary(fileDokumen, 'dokumen_proyek');
    }

    // Simpan ke database
    const newProyek = new Proyek({
      nama_proyek,
      deskripsi_proyek,
      lokasi_proyek,
      status_proyek,
      foto_proyek: fotoURL,
      dokumen_proyek: dokumenURL,
      id_user: userId,
    });

    console.log("📦 Data sebelum disimpan:", newProyek.toJSON());

    await newProyek.save();

    return NextResponse.json({
      message: 'Proyek berhasil ditambahkan',
      proyek: newProyek,
    });
  } catch (error: any) {
    console.error('🔥 Gagal menambahkan proyek:', error);
    return NextResponse.json({
      message: 'Terjadi kesalahan saat menambahkan proyek',
      error: error?.message || 'Unknown error',
      detail: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    }, { status: 500 });
  }
}
