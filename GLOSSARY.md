# Showroom

Monorepo of small framework playgrounds. This glossary holds the vocabulary of the demos themselves, not the frameworks they use.

## HTML-in-Canvas

**Drawable**:
A DOM element that opts in to being painted into a `<canvas>` as its own paint root. Marked with the `drawable` attribute; only laid out when the canvas has `content="drawable"`.
_Avoid_: layoutsubtree element, HTML texture source, overlay

**Drawable subtree**:
A drawable plus all of its descendants, excluding any nested drawable and that drawable's own descendants. One drawable subtree is one image when drawn.
_Avoid_: paint root tree, layer

**Paint event**:
The browser's signal on a canvas that a drawable descendant changed visually and the canvas should redraw. Carries the list of changed drawables. Can also be requested explicitly for animation.
_Avoid_: repaint callback, render event, frame event

**Element geometry**:
Where a drawn drawable sits on the canvas, in CSS pixels. The browser uses it to route clicks, answer layout queries, and report bounds to assistive technology. Set automatically by 2D drawing, set manually for WebGL and WebGPU.
_Avoid_: hit box, bounds, hit-test rect, transform (alone)
