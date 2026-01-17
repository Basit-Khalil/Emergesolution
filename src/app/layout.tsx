import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Emerge Solutions - Secure Payment Processing',
  description: 'Secure payment processing with Revolut Business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-blue-800">Emergesolutions Payment</h1>
                <nav>
                  <ul className="flex space-x-6">
                    <li><a href="https://www.emergesolutions.io" className="text-blue-600 hover:text-blue-800 font-medium">Home</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>

          <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="bg-white border-t mt-12 py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
              <p>© {new Date().getFullYear()} © EMERGE SOLUTIONS — SEIVANUMERICA UNIPESSOAL LDA. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}