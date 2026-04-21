import { Link } from '@tanstack/react-router';
import { notesByTopic, type NoteEntry } from '~/notes/_registry';

type Props = {
  course: string;
  topic: string;
  slug: string;
};

export function PrevNextNav({ course, topic, slug }: Props) {
  const siblings = notesByTopic(course, topic);
  const index = siblings.findIndex((n) => n.slug === slug);
  const prev = index > 0 ? siblings[index - 1] : undefined;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined;

  if (!prev && !next) return null;

  return (
    <nav aria-label="pagination" className="mt-10 flex justify-between gap-4 border-t border-gray-200 pt-6">
      <Side note={prev} direction="prev" />
      <Side note={next} direction="next" />
    </nav>
  );
}

function Side({ note, direction }: { note: NoteEntry | undefined; direction: 'prev' | 'next' }) {
  if (!note) return <span />;
  const label = direction === 'prev' ? '← 上一篇' : '下一篇 →';
  const alignment = direction === 'prev' ? 'text-left' : 'text-right';
  return (
    <Link
      to="/$course/$topic/$slug"
      params={{ course: note.course, topic: note.topic, slug: note.slug }}
      className={`block max-w-[48%] rounded-md border border-gray-200 p-3 hover:border-blue-400 ${alignment}`}
    >
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-0.5 font-medium text-gray-900">{note.frontmatter.title}</div>
    </Link>
  );
}
