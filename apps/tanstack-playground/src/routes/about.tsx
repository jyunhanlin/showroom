import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <section>
      <h1>About</h1>
      <p>File-based routing, type-safe links, and SPA-mode prerendered shell.</p>
    </section>
  );
}
