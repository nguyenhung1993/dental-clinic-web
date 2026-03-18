'use server';

import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function uploadXrayAction(formData: FormData, patientId: string) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload lên Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `phoenix/patients/${patientId}/xrays`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    // Lưu vào Database
    const xray = await prisma.xrayFile.create({
      data: {
        patientId,
        url: result.secure_url,
        publicId: result.public_id,
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type, // panorama, cephalo, periapical (có thể cập nhật từ UI sau)
        metadata: {
          width: result.width,
          height: result.height,
          format: result.format
        }
      }
    });

    revalidatePath(`/patients/records/${patientId}`);
    return { success: true, data: xray };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: 'Failed to upload image' };
  }
}

export async function deleteXrayAction(xrayId: string, publicId: string) {
  try {
    // 1. Xóa trên Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // 2. Xóa trong DB
    await prisma.xrayFile.delete({
      where: { id: xrayId }
    });

    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: 'Failed to delete image' };
  }
}
