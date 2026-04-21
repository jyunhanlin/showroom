import { createFileRoute, notFound } from '@tanstack/react-router';
import { NoteLayout } from '~/components/note-layout';
import { findNote } from '~/notes/_registry';

export const Route = createFileRoute('/$course/$topic/$slug')({
  loader: async ({ params }) => {
    const note = findNote(params.course, params.topic, params.slug);
    if (!note) throw notFound();
    const mod = await note.load();
    return { note, Content: mod.default };
  },
  component: NotePage,
});

function NotePage() {
  const { note, Content } = Route.useLoaderData();
  return (
    <NoteLayout note={note}>
      <Content />
    </NoteLayout>
  );
}
