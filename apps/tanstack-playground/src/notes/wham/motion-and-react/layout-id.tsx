import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';

const SPRING = { type: 'spring', stiffness: 380, damping: 30 } as const;

type NavLink = { slug: string; label: string; href: string; bg: string };

const LINKS: NavLink[] = [
  { slug: 'home', label: 'Home', href: '/', bg: 'hsl(250deg 100% 45%)' },
  { slug: 'usage', label: 'Usage', href: '/usage', bg: 'hsl(50deg 100% 35%)' },
  { slug: 'integrations', label: 'Integrations', href: '/integrations', bg: 'hsl(350deg 100% 40%)' },
];

export function LayoutIdNav() {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const id = useId();

  return (
    <nav onMouseLeave={() => setHoveredNavItem(null)} className="flex justify-center rounded-md bg-slate-800 p-3">
      <ul className="m-0 flex list-none gap-1 p-0">
        {LINKS.map(({ slug, label, href, bg }) => (
          <li key={slug} className="relative" style={{ zIndex: hoveredNavItem === slug ? 1 : 2 }}>
            {hoveredNavItem === slug && (
              <motion.div
                layoutId={id}
                initial={{ borderRadius: 8 }}
                transition={SPRING}
                style={{ backgroundColor: bg }}
                className="absolute inset-0"
              />
            )}
            <a
              href={href}
              onMouseEnter={() => setHoveredNavItem(slug)}
              onClick={(event) => event.preventDefault()}
              className="relative block px-4 py-2 text-sm font-semibold text-white"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type Card = { id: string; label: string; description: string; bg: string; text: string };

const CARDS: Card[] = [
  {
    id: 'aurora',
    label: 'Aurora',
    description: 'Glow that paints the polar sky after sunset.',
    bg: 'bg-cyan-500',
    text: 'text-cyan-50',
  },
  {
    id: 'tide',
    label: 'Tide',
    description: 'Twice-daily breath of the moon, pulling the shoreline back and forth.',
    bg: 'bg-blue-600',
    text: 'text-blue-50',
  },
  {
    id: 'bloom',
    label: 'Bloom',
    description: 'The first burst of color after the thaw, brief and unrepeatable.',
    bg: 'bg-rose-500',
    text: 'text-rose-50',
  },
  {
    id: 'ember',
    label: 'Ember',
    description: 'Held warmth at dusk, just before the dark settles in.',
    bg: 'bg-orange-500',
    text: 'text-orange-50',
  },
];

export function LayoutIdCardExpand() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = CARDS.find((card) => card.id === activeId) ?? null;

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-md bg-slate-900 p-4">
      <div className="grid grid-cols-2 gap-3">
        {CARDS.map((card) => (
          <div key={card.id} className="h-32">
            {activeId !== card.id && (
              <motion.button
                type="button"
                layoutId={`card-${card.id}`}
                onClick={() => setActiveId(card.id)}
                initial={{ borderRadius: 12 }}
                transition={SPRING}
                className={`flex h-full w-full items-end justify-start p-3 ${card.bg} ${card.text} cursor-pointer text-left font-semibold`}
              >
                {card.label}
              </motion.button>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              key="detail"
              layoutId={`card-${active.id}`}
              initial={{ borderRadius: 12 }}
              transition={SPRING}
              className={`absolute inset-4 flex flex-col p-6 ${active.bg} ${active.text}`}
            >
              <motion.h3 layout="position" transition={SPRING} className="m-0 text-2xl font-semibold">
                {active.label}
              </motion.h3>
              <motion.p layout="position" transition={SPRING} className="mt-3 text-base">
                {active.description}
              </motion.p>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="mt-auto self-start rounded-md bg-black/30 px-3 py-1.5 text-sm font-medium text-white hover:bg-black/40"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
