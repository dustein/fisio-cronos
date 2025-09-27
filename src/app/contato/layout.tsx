import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato - Meu App Next.js',
  description: 'Entre em contato conosco através do nosso formulário',
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
