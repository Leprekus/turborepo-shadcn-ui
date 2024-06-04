import Container from '@ui/components/storefront/container';
import Heading from '@ui/components/storefront/heading';
import { Button } from '@ui/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
	return (
		<Container>
			<div className='flex flex-col items-center gap-y-10 lg:flex-row lg:px-20 max-w-7xl mx-auto'>
				<div className='flex flex-col gap-8 lg:w-2/3'>
					<Heading
						title='RODRIGO ROMERO'
						className='text-black font-medium md:text-5xl lg:text-7xl p-0'
					/>
					<div className='flex flex-col text-justify gap-4 items-center lg:items-start'>
						<div className='relative h-96 w-80 lg:h-[450px] lg:w-[400px]'>
							<Image src='/about-picture.jpeg' fill alt='profile picture'/>
						</div>
						<p className='text-gray-700 text-sm'>
							<span className='text-gray-400'>LANGUAGE:</span> SPANISH <br/>
							<span className='text-gray-400'>NATIONALITY:</span> SALVADOREAN<br/>
							<span className='text-gray-400'>COUNTRY OF RESIDENCE:</span> CANADA<br/>
						</p>
					</div>
				</div>
				<div className='lg:w-1/3 text-justify'>
					<Button asChild className='w-full text-lg py-5 uppercase'>
						<Link href='/contact'>Contact</Link>
					</Button>

					<div className='space-y-7 tracking-tight text-sm pt-20'>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Incidunt obcaecati non totam quo suscipit, dolorem
							laborum corporis debitis! Explicabo repudiandae nihil
							corporis sunt vel itaque architecto eius quis atque
							praesentium?
						</p>

						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Incidunt obcaecati non totam quo suscipit, dolorem
							laborum corporis debitis! Explicabo repudiandae nihil
							corporis sunt vel itaque architecto eius quis atque
							praesentium?
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Incidunt obcaecati non totam quo suscipit, dolorem
							laborum corporis debitis! Explicabo repudiandae nihil
							corporis sunt vel itaque architecto eius quis atque
							praesentium?
						</p>
					</div>
				</div>
			</div>
		</Container>
	);
}
