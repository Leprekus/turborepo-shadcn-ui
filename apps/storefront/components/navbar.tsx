'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Toggle } from '@repo/ui/components/ui/toggle';
export default function Navbar() {
	const pathname = usePathname();
	const navItems = [
		{
			label: 'New',
			href: '/',
		},
		{
			label: 'Portfolio',
			href: '/portfolio',
		},
		{
			label: 'About',
			href: '/about',
		},
		{
			label: 'Contact',
			href: '/contact',
		},
	];

	const [display, setDisplay] = useState<boolean>(false)
	const handleResize = () => {
		const w = window.innerWidth
		setDisplay(w >= 1024)
	}
	useEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	},[])

	const shift = () => {
		//180 is padding offset
		const threeFourthsWidth = (window.innerWidth - (window.innerWidth / 4)) - 180
		return -threeFourthsWidth


	}
	return (
		<nav className='
		fixed top-0 left-0 right-0 h-14 w-full z-50
		bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30

		flex items-center gap-8 px-8'>
			<Link href='/'>
				<Image src='/archive-logo.png' alt='logo' width={40} height={40} />
			</Link>
			<motion.div className='block lg:hidden z-50 relative'
				initial={{ right: 0 }}
				animate={{ right: display ? shift() : 0 }}
			>
				<Toggle onClick={() => setDisplay(!display)}>
					<div className='space-y-2'>
						<span className='block w-8 h-0.5 bg-gray-600'></span>
						<span className='block w-5 h-0.5 bg-gray-600'></span>
					</div>
				</Toggle>
			</motion.div>

			<AnimatePresence>
				{display &&
				<motion.div
				initial={{ left:  window.innerWidth >= 1024 ? 0 : -1000 }}
				animate={{ left: 0 }}
				exit={{ left: -1000 }}
				className={`
				absolute
				font-medium
				top-0
				left-0
				h-screen
				flex
				flex-col
				p-20
				gap-12
				w-3/4
				bg-white
				text-gray-700
				text-3xl

				lg:bg-transparent
				lg:relative
				lg:p-0
				lg:flex
				lg:gap-8
				lg:flex-row
				lg:text-white
				lg:text-base
				lg:h-full
				`}
				>
					{navItems.map((item) => (
						<Link href={item.href} key={item.label} className={`uppercase h-full flex items-center justify-center ${item.href === pathname && 'border-b-2 border-b-gray-300'}`}>
							{item.label}
						</Link>
					))}
				</motion.div>}
			</AnimatePresence>
			{/* <Toggle onClick={() => setDisplay(!display)} className='block lg:hidden absolute right-4 top-2'>
				<div className='space-y-2'>
					<span className='block w-8 h-0.5 bg-gray-600'></span>
					<span className='block w-5 h-0.5 bg-gray-600'></span>
				</div>
			</Toggle> */}
		</nav>
	);
}
