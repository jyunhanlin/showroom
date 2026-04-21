import { createFileRoute, notFound } from '@tanstack/react-router';
import { Suspense, lazy, useMemo } from 'react';
import { NoteLayout } from '~/components/note-layout';
import { findNote } from '~/notes/_registry';

export const Route = createFileRoute('/$course_/$topic_/$slug')({
  loader: ({ params }) => {
    if (!findNote(params.course, params.topic, params.slug)) {
      throw notFound();
    }
    return params;
  },
  component: NotePage,
});

function NotePage() {
  const { course, topic, slug } = Route.useLoaderData();
  const note = findNote(course, topic, slug);
  if (!note) return null;

  const Content = useMemo(() => lazy(() => note.load()), [note]);

  return (
    <NoteLayout note={note}>
      <Suspense fallback={<p className="text-gray-500">Loading note…</p>}>
        <Content />
      </Suspense>
    </NoteLayout>
  );
}
