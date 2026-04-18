import Link from 'next/link';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export const NavOrAside = () => {
  return (
    <div className="flex items-baseline justify-between sm:block sm:justify-normal">
      <Link href="/">
        <h1 className="shrink-0 cursor-pointer text-2xl font-bold">Hank Lin</h1>
      </Link>
      <div className="flex flex-row sm:flex-col">
        <a
          href="https://github.com/jyunhanlin"
          target="_blank"
          rel="noreferrer noopener"
          className="p-2 hover:underline"
        >
          <span className="flex items-center">
            <FiGithub />
            <span className="hidden pl-2 sm:inline">GitHub</span>
          </span>
        </a>
        <a
          href="https://twitter.com/jhlin1986"
          target="_blank"
          rel="noreferrer noopener"
          className="p-2 hover:underline"
        >
          <span className="flex items-center">
            <FiTwitter />
            <span className="hidden pl-2 sm:inline">Twitter</span>
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/jyunhanlin/"
          target="_blank"
          rel="noreferrer noopener"
          className="p-2 hover:underline"
        >
          <span className="flex items-center">
            <FiLinkedin />
            <span className="hidden pl-2 sm:inline">Linkedin</span>
          </span>
        </a>
      </div>
    </div>
  );
};
