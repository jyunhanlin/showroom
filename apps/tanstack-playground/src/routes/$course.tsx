import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import { courses, courseName } from '~/notes/_courses';
import { notesByTopic, topicsInCourse } from '~/notes/_registry';
import { topics, topicName } from '~/notes/_topics';

export const Route = createFileRoute('/$course')({
  loader: ({ params }) => {
    if (!(params.course in courses)) {
      if (topicsInCourse(params.course).length === 0) throw notFound();
    }
    return { course: params.course };
  },
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData();
  const topicIds = topicsInCourse(course);

  return (
    <section>
      <h1 className="text-2xl font-semibold">{courseName(course)}</h1>
      {topicIds.length === 0 ? (
        <p className="mt-4 text-gray-600">這個課程還沒有筆記。</p>
      ) : (
        <div className="mt-6 space-y-3">
          {topicIds.map((topic) => {
            const count = notesByTopic(course, topic).length;
            return (
              <Link
                key={topic}
                to="/$course/$topic"
                params={{ course, topic }}
                className="block rounded-lg border border-gray-200 p-4 hover:border-blue-500"
              >
                <div className="font-semibold text-gray-900">{topicName(topic)}</div>
                {topics[topic]?.description && (
                  <div className="mt-1 text-sm text-gray-600">{topics[topic]?.description}</div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  {count} lesson{count === 1 ? '' : 's'}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
