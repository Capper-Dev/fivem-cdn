import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'CDN Assets Manager',
	description: 'Browse and manage your CDN assets with a clean, performant interface',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
