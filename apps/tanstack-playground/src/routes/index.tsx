import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <section>
      <h1>TanStack Playground</h1>
      <p>TanStack Start running in SPA mode.</p>
    </section>
  );
}
