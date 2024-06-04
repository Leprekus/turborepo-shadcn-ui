'use client';
import { motion } from 'framer-motion';
import LazyImage from './lazy-image';

interface GalleryProps {
	photos: string[];
}
export default function Gallery({ photos }: GalleryProps) {
	return (
		<div className='
			image-gallery
			flex
			flex-wrap
			gap-5
		'>
			{photos.map((photo, i) => (
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.8,
						delay: Math.random() * 0.8,
						ease: [0, 0.71, 0.2, 1.01],
					}}
					key={i}
					className='
					flex-auto
					h-[300px]
					md:h-[400px]
					lg:h-[800px]
					
					relative'
				>
					<LazyImage alt='gallery photo' src={photo} />
				</motion.div>
			))}
		</div>
	);
}
