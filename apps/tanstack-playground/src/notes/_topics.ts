export type TopicMeta = { name: string; description?: string };

export const topics: Record<string, TopicMeta> = {
  'canvas-animation': {
    name: 'Canvas Animation',
    description: 'rAF loop, deltaTime, velocity-based animation',
  },
  'motion-and-react': {
    name: 'Motion + React',
    description: 'motion/react library, layout & exit animations',
  },
  'advanced-interactions': {
    name: 'Advanced Interactions',
    description: 'cursor tracking, clip-path, scroll & view transitions',
  },
  svg: {
    name: 'SVG',
    description: 'primitives, paths, animation, springs & easings',
  },
  particles: {
    name: 'Particles',
    description: 'DOM particle systems, easings, polar coords, lerp',
  },
};

export function topicName(id: string): string {
  return topics[id]?.name ?? id;
}
