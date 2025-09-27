import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre - Meu App Next.js',
  description: 'Conheça mais sobre nosso projeto Next.js 15 com TypeScript',
};

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
