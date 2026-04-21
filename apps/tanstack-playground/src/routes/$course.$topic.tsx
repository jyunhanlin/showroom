import { createFileRoute, notFound } from '@tanstack/react-router';
import { Breadcrumb } from '~/components/breadcrumb';
import { NoteCard } from '~/components/note-card';
import { notesByTopic } from '~/notes/_registry';
import { topics, topicName } from '~/notes/_topics';

export const Route = createFileRoute('/$course/$topic')({
  loader: ({ params }) => {
    const items = notesByTopic(params.course, params.topic);
    if (items.length === 0) throw notFound();
    return { ...params, items };
  },
  component: TopicPage,
});

function TopicPage() {
  const { course, topic, items } = Route.useLoaderData();
  return (
    <section>
      <Breadcrumb course={course} topic={topic} />
      <h1 className="text-2xl font-semibold">{topicName(topic)}</h1>
      {topics[topic]?.description && <p className="mt-2 text-gray-600">{topics[topic]?.description}</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((note) => (
          <NoteCard key={note.path} note={note} />
        ))}
      </div>
    </section>
  );
}
