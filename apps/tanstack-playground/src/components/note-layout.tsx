import type { ReactNode } from 'react';
import type { NoteEntry } from '~/notes/_registry';
import { Breadcrumb } from './breadcrumb';
import { PrevNextNav } from './prev-next-nav';
import { SourceLink } from './source-link';
import { TagPill } from './tag-pill';

export function NoteLayout({ note, children }: { note: NoteEntry; children: ReactNode }) {
  const { course, topic, slug, frontmatter } = note;
  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumb course={course} topic={topic} title={frontmatter.title} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{frontmatter.title}</h1>
        {frontmatter.summary && <p className="mt-3 text-lg text-gray-600">{frontmatter.summary}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {frontmatter.sourceUrl && <SourceLink href={frontmatter.sourceUrl} />}
          {frontmatter.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      </header>
      <div className="prose prose-lg max-w-none">{children}</div>
      <footer>
        <PrevNextNav course={course} topic={topic} slug={slug} />
      </footer>
    </article>
  );
}
