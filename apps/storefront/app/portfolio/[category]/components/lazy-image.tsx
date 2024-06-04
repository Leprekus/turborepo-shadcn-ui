'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
interface LazyImageProps {
	src: string;
	alt: string;
	className?: string;
}

//TODO: improve performance by passing dimensions
// dimensions of actual image
// instead of rendering src twice
export default function LazyImage({ src, alt, className }: LazyImageProps) {
	const [inView, setInView] = useState(false);

	const placeholderRef = useRef<null | HTMLImageElement>(null);

	function onIntersection(
		entries: IntersectionObserverEntry[],
		opts: IntersectionObserverInit
	) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setInView(true);
			}
		});
	}

	useEffect(() => {
		const observer = new IntersectionObserver(onIntersection, {
			root: null, // default is the viewport
			threshold: 0.3, // percentage of target's visible area. Triggers "onIntersection"
		});

		if (placeholderRef?.current) {
			observer.observe(placeholderRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return inView ? (
		<motion.img
			className={className}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.8,
				delay: 0.5,
				ease: [0, 0.71, 0.2, 1.01],
			}}
			src={src}
			alt={alt}
		/>
	) : (
		<img
			ref={placeholderRef}
			src={src}
			className={twMerge('invisible', className)}
			alt={alt || ''}
		/>
	);

}
