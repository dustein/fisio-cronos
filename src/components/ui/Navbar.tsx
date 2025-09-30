'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' }
  ];


  return (
    <nav className="bg-blue-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <Link href="/" className="text-md font-bold text-blue-50">
            Fisio Cronos
          </Link>

          {/* Menu Items */}
          <div className="flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-2 rounded-md text-sm font-medium transition-colors text-sm${
                  pathname === item.href
                    ? 'bg-blue-100 text-amber-600'
                    : 'text-gray-800 hover:text-amber-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
