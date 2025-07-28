'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/SearchBar';
import { VirtualizedGrid } from '@/components/VirtualizedGrid';
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
			<div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center'>
				<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className='text-center'>
					<div className='w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
					<h2 className='text-2xl font-semibold text-white'>Loading CDN Assets</h2>
					<p className='text-white/60 mt-2'>Fetching your images...</p>
				</motion.div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center'>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='text-center'>
					<div className='text-6xl mb-4'>⚠️</div>
					<h2 className='text-2xl font-semibold text-white mb-2'>Error Loading Assets</h2>
					<p className='text-white/60'>{error}</p>
				</motion.div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'>
			<div className='container mx-auto px-6 py-8'>
				<motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='text-center mb-8'>
					<h1 className='text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>CDN Assets</h1>
					<p className='text-xl text-white/80'>Browse and manage your content delivery network assets</p>
				</motion.header>

				<SearchBar filters={filters} onFiltersChange={setFilters} totalImages={images.length} filteredCount={filteredAndSortedImages.length} />

				<VirtualizedGrid images={filteredAndSortedImages} />
			</div>
		</div>
	);
}
