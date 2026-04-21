import { Link } from '@tanstack/react-router';
import { courseName } from '~/notes/_courses';
import { topicName } from '~/notes/_topics';

type Props = {
  course?: string;
  topic?: string;
  title?: string;
};

export function Breadcrumb({ course, topic, title }: Props) {
  return (
    <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-500">
      <Link to="/" className="hover:text-blue-600">
        All notes
      </Link>
      {course && (
        <>
          <Separator />
          <Link to="/$course" params={{ course }} className="hover:text-blue-600">
            {courseName(course)}
          </Link>
        </>
      )}
      {course && topic && (
        <>
          <Separator />
          <Link to="/$course/$topic" params={{ course, topic }} className="hover:text-blue-600">
            {topicName(topic)}
          </Link>
        </>
      )}
      {title && (
        <>
          <Separator />
          <span className="text-gray-700">{title}</span>
        </>
      )}
    </nav>
  );
}

function Separator() {
  return <span className="mx-2 text-gray-300">›</span>;
}
