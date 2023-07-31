import { Providers } from './providers';

export default function ChakraUiLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
