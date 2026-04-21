import type { ComponentType } from 'react';
import { NoteFrontmatterSchema, type NoteFrontmatter } from './_schema';

type MdxModule = { default: ComponentType };

type FrontmatterGlobEntry = { frontmatter: unknown };

const frontmatterModules = import.meta.glob<FrontmatterGlobEntry>('./**/*.mdx', {
  eager: true,
});

const lazyLoaders = import.meta.glob<MdxModule>('./**/*.mdx');

export type NoteEntry = {
  course: string;
  topic: string;
  slug: string;
  path: string;
  frontmatter: NoteFrontmatter;
  load: () => Promise<MdxModule>;
};

function parsePath(globKey: string): { course: string; topic: string; slug: string } {
  const stripped = globKey.replace(/^\.\//, '').replace(/\.mdx$/, '');
  const parts = stripped.split('/');
  if (parts.length !== 3) {
    throw new Error(`Note must be at course/topic/slug depth (got ${parts.length} parts): ${globKey}`);
  }
  const [course, topic, slug] = parts as [string, string, string];
  return { course, topic, slug };
}

function buildEntries(): NoteEntry[] {
  const entries: NoteEntry[] = [];
  for (const [globKey, mod] of Object.entries(frontmatterModules)) {
    const { course, topic, slug } = parsePath(globKey);
    const loader = lazyLoaders[globKey];
    if (!loader) {
      throw new Error(`Lazy loader missing for ${globKey}`);
    }
    const parsed = NoteFrontmatterSchema.safeParse(mod.frontmatter);
    if (!parsed.success) {
      throw new Error(`Invalid frontmatter in ${globKey}: ${parsed.error.message}`);
    }
    entries.push({
      course,
      topic,
      slug,
      path: globKey,
      frontmatter: parsed.data,
      load: loader,
    });
  }
  return entries.toSorted(compareEntries);
}

function orderKey(entry: NoteEntry): number {
  const { order, lessonNumber } = entry.frontmatter;
  if (typeof order === 'number') return order;
  if (lessonNumber) {
    const leading = parseInt(lessonNumber, 10);
    if (!Number.isNaN(leading)) return leading;
  }
  return Number.MAX_SAFE_INTEGER;
}

function compareEntries(a: NoteEntry, b: NoteEntry): number {
  const diff = orderKey(a) - orderKey(b);
  if (diff !== 0) return diff;
  return a.slug.localeCompare(b.slug);
}

export const notes: NoteEntry[] = buildEntries();

export function findNote(course: string, topic: string, slug: string): NoteEntry | undefined {
  return notes.find((n) => n.course === course && n.topic === topic && n.slug === slug);
}

export function notesByCourse(course: string): NoteEntry[] {
  return notes.filter((n) => n.course === course);
}

export function notesByTopic(course: string, topic: string): NoteEntry[] {
  return notes.filter((n) => n.course === course && n.topic === topic);
}

export function coursesInUse(): string[] {
  return Array.from(new Set(notes.map((n) => n.course)));
}

export function topicsInCourse(course: string): string[] {
  return Array.from(new Set(notes.filter((n) => n.course === course).map((n) => n.topic)));
}
