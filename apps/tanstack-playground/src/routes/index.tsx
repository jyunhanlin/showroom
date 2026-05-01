import { Link, createFileRoute } from '@tanstack/react-router';
import { courseName } from '~/notes/_courses';
import { coursesInUse, notes, notesByTopic, topicsInCourse } from '~/notes/_registry';
import { topicName, topics } from '~/notes/_topics';

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

  const courseList = coursesInUse();

  return (
    <section className="space-y-12">
      {courseList.map((course) => {
        const topicIds = topicsInCourse(course);
        return (
          <section key={course}>
            <h1 className="text-2xl font-semibold">
              <Link to="/$course" params={{ course }} className="text-gray-900 hover:text-blue-600">
                {courseName(course)}
              </Link>
            </h1>
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
          </section>
        );
      })}
    </section>
  );
}
