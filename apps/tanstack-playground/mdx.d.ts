declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { NoteFrontmatter } from '~/notes/_schema';

  export const frontmatter: NoteFrontmatter;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
