import { Link } from '@tanstack/react-router';
import type { NoteEntry } from '~/notes/_registry';
import { TagPill } from './tag-pill';

export function NoteCard({ note }: { note: NoteEntry }) {
  const { course, topic, slug, frontmatter } = note;
  return (
    <Link
      to="/$course/$topic/$slug"
      params={{ course, topic, slug }}
      className="block rounded-lg border border-gray-200 p-4 transition hover:border-blue-500 hover:shadow-sm"
    >
      <h3 className="font-semibold text-gray-900">{frontmatter.title}</h3>
      {frontmatter.summary && <p className="mt-1 text-sm text-gray-600">{frontmatter.summary}</p>}
      {frontmatter.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      )}
    </Link>
  );
}
