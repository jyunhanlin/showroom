export const courses = {
  wham: {
    name: 'Whimsical Animations',
    author: 'Josh W Comeau',
    baseUrl: 'https://courses.joshwcomeau.com/wham',
  },
} as const;

export type CourseId = keyof typeof courses;

export function courseName(id: string): string {
  return (courses as Record<string, { name: string }>)[id]?.name ?? id;
}
