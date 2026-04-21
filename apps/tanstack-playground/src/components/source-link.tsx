export function SourceLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600"
    >
      <span aria-hidden="true">📖</span>
      <span>原始課程</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
