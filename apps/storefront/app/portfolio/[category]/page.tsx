import Container from '@repo/ui/components/storefront/container';
import { getPhotosFromCategory } from '../../../actions';
import Heading from '@repo/ui/components/storefront/heading';
import Gallery from './components/gallery';

interface CategoryPageProps {
	params: {
		category: string;
	};
}
export default function CategoryPage({
	params: { category },
}: CategoryPageProps) {
	const photos = getPhotosFromCategory(category);
	return (
		<Container>
			<Heading title={category} />
			<Gallery photos={photos}/>
		</Container>
	);
}
