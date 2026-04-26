import { Link, createFileRoute } from '@tanstack/react-router';
import { NoteCard } from '~/components/note-card';
import { courseName } from '~/notes/_courses';
import { type NoteEntry, notes } from '~/notes/_registry';
import { topicName, topics } from '~/notes/_topics';

export const Route = createFileRoute('/')({
  component: AllNotes,
});

type CourseGroup = {
  course: string;
  topics: Array<{ topic: string; notes: NoteEntry[] }>;
};

function groupByCourseThenTopic(items: NoteEntry[]): CourseGroup[] {
  const groups: CourseGroup[] = [];
  for (const note of items) {
    let courseGroup = groups.find((g) => g.course === note.course);
    if (!courseGroup) {
      courseGroup = { course: note.course, topics: [] };
      groups.push(courseGroup);
    }
    let topicGroup = courseGroup.topics.find((t) => t.topic === note.topic);
    if (!topicGroup) {
      topicGroup = { topic: note.topic, notes: [] };
      courseGroup.topics.push(topicGroup);
    }
    topicGroup.notes.push(note);
  }
  return groups;
}

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

  const grouped = groupByCourseThenTopic(notes);

  return (
    <section>
      <h1 className="text-2xl font-semibold">All notes</h1>
      <div className="mt-8 space-y-12">
        {grouped.map(({ course, topics: courseTopics }) => (
          <section key={course}>
            <h2 className="text-xl font-semibold tracking-tight">
              <Link to="/$course" params={{ course }} className="text-gray-900 hover:text-blue-600">
                {courseName(course)}
              </Link>
            </h2>
            <div className="mt-6 space-y-8">
              {courseTopics.map(({ topic, notes: topicNotes }) => (
                <div key={topic}>
                  <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-base font-semibold text-gray-700">
                      <Link to="/$course/$topic" params={{ course, topic }} className="hover:text-blue-600">
                        {topicName(topic)}
                      </Link>
                    </h3>
                    {topics[topic]?.description && (
                      <span className="text-sm text-gray-500">{topics[topic]?.description}</span>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {topicNotes.map((note) => (
                      <NoteCard key={note.path} note={note} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
