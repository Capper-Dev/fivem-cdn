'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ParticleBackground = () => {
	const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

	useEffect(() => {
		const particleCount = 50;
		const newParticles = Array.from({ length: particleCount }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			delay: Math.random() * 20,
		}));
		setParticles(newParticles);
	}, []);

	return (
		<div className='fixed inset-0 pointer-events-none z-0'>
			<div className='absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900' />
			<div className='absolute inset-0 dot-pattern' />

			{particles.map((particle) => (
				<motion.div
					key={particle.id}
					className='absolute rounded-full bg-white opacity-10'
					style={{
						left: `${particle.x}%`,
						top: `${particle.y}%`,
						width: `${particle.size}px`,
						height: `${particle.size}px`,
					}}
					animate={{
						y: [-20, -40, -20],
						x: [-5, 5, -5],
						opacity: [0.1, 0.3, 0.1],
					}}
					transition={{
						duration: 8 + particle.delay,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: particle.delay,
					}}
				/>
			))}
		</div>
	);
};
