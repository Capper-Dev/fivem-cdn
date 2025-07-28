'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/SearchBar';
import { VirtualizedGrid } from '@/components/VirtualizedGrid';
import { ParticleBackground } from '@/components/ParticleBackground';
import { useImageLoader } from '@/hooks/useImageLoader';
import { FilterState, ImageFile } from '@/types';

export default function Home() {
	const { images, loading, error } = useImageLoader();
	const [filters, setFilters] = useState<FilterState>({
		search: '',
		category: 'all',
		sortBy: 'name',
		sortOrder: 'asc',
	});

	const filteredAndSortedImages = useMemo(() => {
		let result = [...images];

		if (filters.search) {
			const searchLower = filters.search.toLowerCase();
			result = result.filter((img) => img.name.toLowerCase().includes(searchLower));
		}

		if (filters.category !== 'all') {
			result = result.filter((img) => img.category === filters.category);
		}

		result.sort((a, b) => {
			let aVal: string | number, bVal: string | number;

			switch (filters.sortBy) {
				case 'name':
					aVal = a.name.toLowerCase();
					bVal = b.name.toLowerCase();
					break;
				case 'size':
					aVal = a.size;
					bVal = b.size;
					break;
				case 'date':
					aVal = a.lastModified.getTime();
					bVal = b.lastModified.getTime();
					break;
				default:
					return 0;
			}

			if (aVal < bVal) return filters.sortOrder === 'asc' ? -1 : 1;
			if (aVal > bVal) return filters.sortOrder === 'asc' ? 1 : -1;
			return 0;
		});

		return result;
	}, [images, filters]);

	if (loading) {
		return (
			<div className='min-h-screen bg-black flex items-center justify-center relative overflow-hidden'>
				<ParticleBackground />
				<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className='text-center glass-card rounded-2xl p-12 relative z-10'>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
						className='w-20 h-20 border-4 border-white/20 border-t-white rounded-full mx-auto mb-6'
					/>
					<h2 className='text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'>Loading CDN Assets</h2>
					<p className='text-neutral-400 font-mono'>Scanning the cosmos for your images...</p>
				</motion.div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen bg-black flex items-center justify-center relative overflow-hidden'>
				<ParticleBackground />
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='text-center glass-card rounded-2xl p-12 relative z-10'>
					<motion.div
						animate={{
							scale: [1, 1.1, 1],
							rotate: [0, 5, -5, 0],
						}}
						transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
						className='text-8xl mb-6'
					>
						⚠️
					</motion.div>
					<h2 className='text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'>System Error</h2>
					<p className='text-neutral-400 font-mono'>{error}</p>
				</motion.div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-black relative overflow-hidden'>
			<ParticleBackground />

			<div className='relative z-10 w-full h-full'>
				<div className='mx-auto p-12'>
					<motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='text-center mb-8'>
						<motion.h1
							className='text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'
							animate={{
								backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
							}}
							transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
						>
							CDN ASSETS
						</motion.h1>
						<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className='text-xl text-neutral-300 font-mono'>
							Navigate the digital cosmos of your content delivery network
						</motion.p>
					</motion.header>

					<SearchBar filters={filters} onFiltersChange={setFilters} totalImages={images.length} filteredCount={filteredAndSortedImages.length} />

					<VirtualizedGrid images={filteredAndSortedImages} />
				</div>
			</div>
		</div>
	);
}
