import Image from 'next/image';
import logo from '@/public/logo.svg';
import { JSXElementConstructor } from 'react';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
	w?: number;
	h?: number;
	href?: string;
	Component?: string | JSXElementConstructor<any>;
}
const Logo = ({ w = 40, h = 40, Component = 'div', ...rest }: LogoProps) => (
	<Component {...rest}>
		<Image src={logo} alt="Logo" width={w} height={h} />
	</Component>
);

export default Logo;
