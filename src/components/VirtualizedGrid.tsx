'use client';

import { useMemo } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
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
						gap: '24px',
						padding: '12px',
						...style,
					}}
				>
					{children}
				</div>
			),
			Item: ({ children, ...props }: any) => (
				<div
					{...props}
					style={{
						width: `calc(${100 / cardsPerRow}% - ${(24 * (cardsPerRow - 1)) / cardsPerRow}px)`,
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
			<div className='flex items-center justify-center h-96'>
				<div className='text-center'>
					<div className='text-6xl mb-4'>🖼️</div>
					<h3 className='text-xl font-semibold text-white mb-2'>No images found</h3>
					<p className='text-white/60'>Try adjusting your search or filters</p>
				</div>
			</div>
		);
	}

	return (
		<div className='h-[calc(100vh-300px)] min-h-[600px]'>
			<VirtuosoGrid
				style={{ height: '100%' }}
				totalCount={images.length}
				data={images}
				components={gridComponents}
				itemContent={(index, image) => <ImageCard image={image} index={index} />}
				overscan={10}
			/>
		</div>
	);
};
