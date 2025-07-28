import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { ImageFile, ImageCategory } from '@/types';

const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];
const CATEGORIES: ImageCategory[] = ['items', 'loadingscreen', 'maps', 'other', 'vehicles'];

async function getImageDimensions(imagePath: string): Promise<{ width: number; height: number } | undefined> {
  try {
    // For now, we'll return undefined since getting dimensions server-side requires additional packages
    // You can add sharp or image-size package later if needed
    return undefined;
  } catch {
    return undefined;
  }
}

async function scanDirectory(dirPath: string, category: ImageCategory): Promise<ImageFile[]> {
  try {
    const files = await fs.readdir(dirPath);
    const imageFiles: ImageFile[] = [];

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase();
        
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          const dimensions = await getImageDimensions(filePath);
          
          imageFiles.push({
            id: `${category}_${file}_${Date.now()}`,
            name: file,
            url: `/${category}/${file}`,
            category,
            size: stat.size,
            lastModified: stat.mtime,
            dimensions,
          });
        }
      }
    }

    return imageFiles;
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    const publicPath = path.join(process.cwd(), 'public');
    const allImages: ImageFile[] = [];

    // Scan each category folder
    for (const category of CATEGORIES) {
      const categoryPath = path.join(publicPath, category);
      
      try {
        await fs.access(categoryPath);
        const categoryImages = await scanDirectory(categoryPath, category);
        allImages.push(...categoryImages);
      } catch (error) {
        console.log(`Category folder ${category} not found or inaccessible`);
      }
    }

    // Sort by name by default
    allImages.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(allImages);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}