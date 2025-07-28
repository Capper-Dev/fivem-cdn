'use client';

import { useState, useEffect } from 'react';
import { ImageFile, ImageCategory } from '@/types';

export const useImageLoader = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/images');
        if (!response.ok) throw new Error('Failed to fetch images');
        
        const imageData = await response.json();
        setImages(imageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return { images, loading, error };
};

export const categorizeImage = (filename: string): ImageCategory => {
  const name = filename.toLowerCase();
  
  if (name.includes('vehicle') || name.includes('car') || name.includes('truck')) {
    return 'vehicles';
  }
  if (name.includes('item') || name.includes('weapon') || name.includes('tool')) {
    return 'items';
  }
  if (name.includes('loading') || name.includes('splash')) {
    return 'loadingscreen';
  }
  if (name.includes('map') || name.includes('location')) {
    return 'maps';
  }
  
  return 'other';
};