import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://floydslabs.com'),
  title: 'Floyd Labs | Garage-Born AI, Spite-Driven Innovation',
  description:
    'Floyd Labs builds AI tools that belong to YOU — not to shareholders. 73+ tools, 13 MCP servers, zero subscriptions. Powered by caffeine and spite from Brown County, Indiana.',
  keywords: [
    'Floyd Labs', 'AI tools', 'MCP server', 'open source AI',
    'no subscription AI', 'local AI', 'Floyd AI', 'Legacy AI',
  ],
  openGraph: {
    title: 'Floyd Labs | Garage-Born AI, Spite-Driven Innovation',
    description:
      'Building AI that belongs to you, not to shareholders. 73+ tools, 13 MCP servers, $0 subscriptions.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1024, height: 1024, alt: 'Floyd\'s Labs - Legacy AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floyd Labs | Garage-Born AI',
    description: 'AI that belongs to you, not to shareholders.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" async />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FYLCYNM25F" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FYLCYNM25F');
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
