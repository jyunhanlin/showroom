import { createFileRoute } from '@tanstack/react-router';
import { NoteCard } from '~/components/note-card';
import { notes } from '~/notes/_registry';

export const Route = createFileRoute('/')({
  component: AllNotes,
});

function AllNotes() {
  if (notes.length === 0) {
    return (
      <section>
        <h1 className="text-2xl font-semibold">All notes</h1>
        <p className="mt-4 text-gray-600">
          還沒有筆記。把 <code>.mdx</code> 放到 <code>src/notes/&lt;course&gt;/&lt;topic&gt;/</code> 就會出現在這裡。
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold">All notes</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {notes.map((note) => (
          <NoteCard key={note.path} note={note} />
        ))}
      </div>
    </section>
  );
}
