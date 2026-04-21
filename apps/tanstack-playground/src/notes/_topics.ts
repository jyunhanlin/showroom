export type TopicMeta = { name: string; description?: string };

export const topics: Record<string, TopicMeta> = {
  'canvas-animation': {
    name: 'Canvas Animation',
    description: 'rAF loop, deltaTime, velocity-based animation',
  },
};

export function topicName(id: string): string {
  return topics[id]?.name ?? id;
}
