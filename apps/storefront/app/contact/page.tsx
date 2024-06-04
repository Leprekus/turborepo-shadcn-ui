import Container from '@ui/components/storefront/container';
import Image from 'next/image';
import ContactForm from './components/contact-form';

export default function ContactPage() {
  return (
	<Container className='flex'>
		<div className='flex-1 flex rounded-md overflow-hidden border shadow'>
			<div className='h-full w-2/3 md:w-1/2 p-4'>
				<ContactForm/>
			</div>
			<div className='relative h-full w-1/3 md:w-1/2'>
				<Image alt='contact form image' fill className='object-cover' src='/contact-form.jpg'/>
			</div>
		</div>
	</Container>
  )
}
