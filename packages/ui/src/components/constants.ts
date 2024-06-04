import { CSSProperties } from 'react';

export const bgStyle = (src: string): CSSProperties => ({
	backgroundImage: `url("${src}")`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
});
