'use client';

import { useMemo } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { motion } from 'framer-motion';
import { ImageCard } from './ImageCard';
import { ImageFile } from '@/types';

interface VirtualizedGridProps {
	images: ImageFile[];
}

export const VirtualizedGrid = ({ images }: VirtualizedGridProps) => {
	const useCardsPerRow = () => {
		if (typeof window === 'undefined') return 4;

		const width = window.innerWidth;
		if (width < 640) return 1;
		if (width < 768) return 2;
		if (width < 1024) return 3;
		if (width < 1280) return 4;
		if (width < 1536) return 5;
		return 6;
	};

	const cardsPerRow = useCardsPerRow();

	const gridComponents = useMemo(
		() => ({
			List: ({ style, children, ...props }: any) => (
				<div
					{...props}
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '20px',
						padding: '0 20px 40px',
						...style,
					}}
					className='scrollbar-thin'
				>
					{children}
				</div>
			),
			Item: ({ children, ...props }: any) => (
				<div
					{...props}
					style={{
						width: `calc(${100 / cardsPerRow}% - ${(20 * (cardsPerRow - 1)) / cardsPerRow}px)`,
						minWidth: '280px',
						maxWidth: '400px',
					}}
				>
					{children}
				</div>
			),
		}),
		[cardsPerRow]
	);

	if (images.length === 0) {
		return (
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='flex items-center justify-center h-96 relative z-10'>
				<div className='text-center glass-card rounded-2xl p-12'>
					<motion.div
						animate={{
							rotate: 360,
							scale: [1, 1.1, 1],
						}}
						transition={{
							rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
							scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
						}}
						className='text-6xl mb-6'
					>
						🌌
					</motion.div>
					<h3 className='text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'>No assets found</h3>
					<p className='text-neutral-400'>Try adjusting your search filters or explore different categories</p>
				</div>
			</motion.div>
		);
	}

	return (
		<div className='h-[calc(100vh-280px)] min-h-[600px] relative z-10'>
			<VirtuosoGrid
				style={{ height: '100%' }}
				totalCount={images.length}
				data={images}
				components={gridComponents}
				itemContent={(index, image) => <ImageCard image={image} index={index} />}
				overscan={20}
			/>
		</div>
	);
};
