'use client';

import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { motion } from 'framer-motion';
import { FilterState, ImageCategory } from '@/types';

interface SearchBarProps {
	filters: FilterState;
	onFiltersChange: (filters: FilterState) => void;
	totalImages: number;
	filteredCount: number;
}

const categories: { value: ImageCategory | 'all'; label: string }[] = [
	{ value: 'all', label: 'All' },
	{ value: 'vehicles', label: 'Vehicles' },
	{ value: 'items', label: 'Items' },
	{ value: 'loadingscreen', label: 'Loading Screens' },
	{ value: 'maps', label: 'Maps' },
	{ value: 'other', label: 'Other' },
];

export const SearchBar = ({ filters, onFiltersChange, totalImages, filteredCount }: SearchBarProps) => {
	return (
		<motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='glass rounded-2xl p-6 mb-8 relative z-10'>
			<div className='flex flex-col lg:flex-row gap-6 items-center'>
				<div className='relative flex-1 min-w-0 w-full'>
					<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5' />
					<input
						type='text'
						placeholder='Search images...'
						value={filters.search}
						onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
						className='w-full pl-12 pr-4 py-4 bg-black/20 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm'
					/>
				</div>

				<div className='flex flex-wrap gap-4 items-center w-full lg:w-auto'>
					<div className='flex items-center gap-3 min-w-0'>
						<Filter className='w-4 h-4 text-neutral-400 flex-shrink-0' />
						<select
							value={filters.category}
							onChange={(e) => onFiltersChange({ ...filters, category: e.target.value as ImageCategory | 'all' })}
							className='bg-black/20 border border-neutral-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm min-w-0'
						>
							{categories.map((cat) => (
								<option key={cat.value} value={cat.value} className='bg-black text-white'>
									{cat.label}
								</option>
							))}
						</select>
					</div>

					<select
						value={filters.sortBy}
						onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as 'name' | 'size' | 'date' })}
						className='bg-black/20 border border-neutral-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm'
					>
						<option value='name' className='bg-black text-white'>
							Name
						</option>
						<option value='size' className='bg-black text-white'>
							Size
						</option>
						<option value='date' className='bg-black text-white'>
							Date
						</option>
					</select>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => onFiltersChange({ ...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
						className='p-3 bg-black/20 border border-neutral-700 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm'
						title={`Sort ${filters.sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
					>
						{filters.sortOrder === 'asc' ? <SortAsc className='w-4 h-4 text-white' /> : <SortDesc className='w-4 h-4 text-white' />}
					</motion.button>
				</div>
			</div>

			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className='mt-6 flex items-center justify-between text-sm'>
				<span className='text-neutral-300 font-mono'>
					Showing <span className='text-white font-medium'>{filteredCount}</span> of <span className='text-white font-medium'>{totalImages}</span> images
				</span>
				<div className='h-1 w-20 bg-neutral-800 rounded-full overflow-hidden'>
					<motion.div
						className='h-full bg-gradient-to-r from-white to-neutral-300'
						initial={{ width: 0 }}
						animate={{ width: `${totalImages > 0 ? (filteredCount / totalImages) * 100 : 0}%` }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
					/>
				</div>
			</motion.div>
		</motion.div>
	);
};
