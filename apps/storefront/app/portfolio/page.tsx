import Image from 'next/image'
import Link from 'next/link'
import { bgStyle } from '../../../../packages/ui/src/components/constants'
import Container from '@repo/ui/components/storefront/container'
import { getCategories } from '../../actions'

export default function PublicationsPage() {
	const categories = getCategories()
  return (
	<Container>
		<div //grid
			className='
			grid
			grid-cols-2
			md:grid-cols-3
			gap-6
			w-fit
			items-center
			place-content-center
			place-items-center
			justify-center
			m-auto
			'>
			{
				categories.map(category =>
				<Link
				style={bgStyle(category.image_url)}
				href={`/portfolio/${category.title}`}
				className='
				relative
				h-60
				w-40
				object-fill
				md:h-[336px]
				md:w-56
				lg:h-[432px]
				lg:w-72'
				key={category.id}>
					<span className='
						absolute
						z-10
						inset-0
						bg-black
						bg-opacity-70
						opacity-0
						transition-all
						hover:opacity-100
						flex
						items-center
						justify-center
						lg:text-3xl
						md:text-xl
						text-white
						uppercase'>{ category.title }</span>
				</Link>)
			}
		</div>
	</Container>
  )
}
