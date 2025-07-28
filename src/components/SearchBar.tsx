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
		<motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8'>
			<div className='flex flex-col lg:flex-row gap-4 items-center'>
				<div className='relative flex-1 min-w-0'>
					<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5' />
					<input
						type='text'
						placeholder='Search images...'
						value={filters.search}
						onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
						className='w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400 transition-colors'
					/>
				</div>

				<div className='flex flex-wrap gap-3 items-center'>
					<div className='flex items-center gap-2'>
						<Filter className='w-4 h-4 text-white/60' />
						<select
							value={filters.category}
							onChange={(e) => onFiltersChange({ ...filters, category: e.target.value as ImageCategory | 'all' })}
							className='bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400'
						>
							{categories.map((cat) => (
								<option key={cat.value} value={cat.value} className='bg-gray-800'>
									{cat.label}
								</option>
							))}
						</select>
					</div>

					<select
						value={filters.sortBy}
						onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as 'name' | 'size' | 'date' })}
						className='bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400'
					>
						<option value='name' className='bg-gray-800'>
							Name
						</option>
						<option value='size' className='bg-gray-800'>
							Size
						</option>
						<option value='date' className='bg-gray-800'>
							Date
						</option>
					</select>

					<button
						onClick={() => onFiltersChange({ ...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
						className='p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors'
					>
						{filters.sortOrder === 'asc' ? <SortAsc className='w-4 h-4 text-white' /> : <SortDesc className='w-4 h-4 text-white' />}
					</button>
				</div>
			</div>

			<div className='mt-4 text-sm text-white/60'>
				Showing {filteredCount} of {totalImages} images
			</div>
		</motion.div>
	);
};
