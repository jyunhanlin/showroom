import { Metadata } from 'next';
import { Fira_Mono } from 'next/font/google';

export const metadata: Metadata = {
  title: {
    template: '%s | Hank Lin',
    default: 'Showroom | Hank Lin', // a default is required when creating a template
  },
};

const firaMono = Fira_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={firaMono.className}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                height: 100%;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
