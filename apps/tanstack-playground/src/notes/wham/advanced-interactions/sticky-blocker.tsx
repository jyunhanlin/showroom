const HEADER_HEIGHT = 48;

export function StickyBlockerDemo() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-500">
        Scroll inside this card to see the header background change as each section&apos;s blocker takes over.
      </p>
      <div className="relative h-[360px] overflow-y-auto rounded-md ring-1 ring-slate-200">
        {/* Transparent header — sticks to top of scroll container. No background of its own. */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-4"
          style={{ height: HEADER_HEIGHT, marginBottom: -HEADER_HEIGHT }}
        >
          <span className="text-sm font-semibold tracking-tight text-slate-900">whimsical.dev</span>
          <span className="text-xs text-slate-700">Article</span>
        </header>

        {/* Hero section — light blue. */}
        <section className="relative bg-sky-200">
          {/* Blocker: matches section bg, sticks under the header until parent's bottom. */}
          <div className="sticky top-0 z-0 bg-sky-200" style={{ height: HEADER_HEIGHT }} />
          <div className="relative z-10 px-6 pt-2 pb-10">
            <h1 className="text-2xl font-bold text-slate-900">A pure-CSS sticky trick</h1>
            <p className="mt-2 text-sm text-slate-700">
              The header above is transparent — what you see is each section&apos;s own blocker stuck to the top.
            </p>
          </div>
        </section>

        {/* Main content — white. */}
        <section className="relative bg-white">
          <div className="sticky top-0 z-0 bg-white" style={{ height: HEADER_HEIGHT }} />
          <div className="relative z-10 space-y-3 px-6 pt-2 pb-10 text-sm text-slate-700">
            <p>
              Each section owns a `position: sticky; top: 0` blocker whose background matches the section. When you
              scroll past the hero, this section&apos;s white blocker reaches the top and the previous one bottoms out —
              the visible color behind the header swaps.
            </p>
            <p>
              No JavaScript, no IntersectionObserver. Just sticky positioning constrained by each parent&apos;s scroll
              bounds.
            </p>
            <p>
              The trade-off is space: every section needs vertical room equal to header height, otherwise the blocker
              eats into your content area.
            </p>
            <p>
              On longer pages you can chain as many sections as you want — each one only needs to know its own
              background color.
            </p>
            <p>Keep scrolling to see the white blocker fully take over.</p>
            <p>Filler line so you can scroll a bit further and feel the handoff.</p>
            <p>
              The header text stays readable on both sky-200 and white because slate-900 has enough contrast on either.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
