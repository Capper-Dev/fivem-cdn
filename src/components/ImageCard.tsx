'use client';

import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye } from 'lucide-react';
import { ImageFile } from '@/types';

interface ImageCardProps {
	image: ImageFile;
	index: number;
}

export const ImageCard = memo(({ image, index }: ImageCardProps) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const sizes = ['B', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
	};

	const getCategoryColor = (category: string) => {
		const colors = {
			vehicles: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
			items: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
			loadingscreen: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
			maps: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
			other: 'bg-neutral-500/20 text-neutral-300 border-neutral-500/30',
		};
		return colors[category as keyof typeof colors] || colors.other;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				delay: Math.min(index * 0.02, 0.5),
				duration: 0.5,
				ease: 'easeOut',
			}}
			whileHover={{
				scale: 1.02,
				y: -2,
				transition: { duration: 0.2 },
			}}
			className='group glass-card rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 w-full h-auto'
		>
			<div className='relative aspect-square bg-black/40 overflow-hidden'>
				{!imageError ? (
					<motion.img
						src={image.url}
						alt={image.name}
						loading='lazy'
						onLoad={() => setImageLoaded(true)}
						onError={() => setImageError(true)}
						className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
						initial={{ scale: 1.05 }}
						animate={{ scale: imageLoaded ? 1 : 1.05 }}
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-neutral-500'>
						<Eye className='w-8 h-8' />
					</div>
				)}

				{!imageLoaded && !imageError && (
					<div className='absolute inset-0 bg-neutral-800/50'>
						<div className='w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse' />
					</div>
				)}

				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4'>
					<div className='flex gap-3'>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={() => window.open(image.url, '_blank')}
							className='p-3 glass rounded-lg hover:bg-white/20 transition-all duration-200'
							title='View Full Size'
						>
							<Eye className='w-5 h-5 text-white' />
						</motion.button>
						<motion.a
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							href={image.url}
							download={image.name}
							className='p-3 glass rounded-lg hover:bg-white/20 transition-all duration-200'
							title='Download'
						>
							<Download className='w-5 h-5 text-white' />
						</motion.a>
					</div>
				</div>
			</div>

			<div className='p-4 space-y-3'>
				<div className='flex items-center justify-between'>
					<span className={`px-3 py-1 rounded-lg text-xs font-medium border font-mono ${getCategoryColor(image.category)}`}>{image.category.toUpperCase()}</span>
					<span className='text-xs text-neutral-400 font-mono'>{formatFileSize(image.size)}</span>
				</div>

				<h3 className='text-white font-medium text-sm leading-relaxed truncate' title={image.name}>
					{image.name}
				</h3>

				{image.dimensions && (
					<p className='text-xs text-neutral-400 font-mono'>
						{image.dimensions.width} × {image.dimensions.height}
					</p>
				)}
			</div>
		</motion.div>
	);
});

ImageCard.displayName = 'ImageCard';
