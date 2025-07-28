'use client';

import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Copy, Check } from 'lucide-react';
import { ImageFile } from '@/types';

interface ImageCardProps {
	image: ImageFile;
	index: number;
}

export const ImageCard = memo(({ image, index }: ImageCardProps) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleCopyUrl = async () => {
		try {
			await navigator.clipboard.writeText(image.url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy URL:', err);
		}
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const getCategoryColor = (category: string) => {
		const colors = {
			vehicles: 'bg-blue-500/20 text-blue-400',
			items: 'bg-green-500/20 text-green-400',
			loadingscreen: 'bg-purple-500/20 text-purple-400',
			maps: 'bg-orange-500/20 text-orange-400',
			other: 'bg-gray-500/20 text-gray-400',
		};
		return colors[category as keyof typeof colors] || colors.other;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: Math.min(index * 0.02, 0.5) }}
			className='group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] w-full h-auto'
		>
			<div className='relative aspect-square bg-gray-800/50'>
				{!imageError ? (
					<img
						src={image.url}
						alt={image.name}
						loading='lazy'
						onLoad={() => setImageLoaded(true)}
						onError={() => setImageError(true)}
						className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-white/40'>
						<Eye className='w-8 h-8' />
					</div>
				)}

				{!imageLoaded && !imageError && <div className='absolute inset-0 bg-gray-800/50 animate-pulse' />}

				<div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3'>
					<button onClick={handleCopyUrl} className='p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors' title='Copy URL'>
						{copied ? <Check className='w-5 h-5 text-green-400' /> : <Copy className='w-5 h-5 text-white' />}
					</button>
					<button onClick={() => window.open(image.url, '_blank')} className='p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors' title='View Full Size'>
						<Eye className='w-5 h-5 text-white' />
					</button>
					<a href={image.url} download={image.name} className='p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors' title='Download'>
						<Download className='w-5 h-5 text-white' />
					</a>
				</div>
			</div>

			<div className='p-4'>
				<div className='flex items-center justify-between mb-2'>
					<span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(image.category)}`}>{image.category}</span>
					<span className='text-xs text-white/60'>{formatFileSize(image.size)}</span>
				</div>

				<h3 className='text-white font-medium text-sm truncate' title={image.name}>
					{image.name}
				</h3>

				{image.dimensions && (
					<p className='text-xs text-white/60 mt-1'>
						{image.dimensions.width} × {image.dimensions.height}
					</p>
				)}
			</div>
		</motion.div>
	);
});

ImageCard.displayName = 'ImageCard';
