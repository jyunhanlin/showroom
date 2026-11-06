# Showroom

Monorepo of small framework playgrounds. This glossary holds the vocabulary of the demos themselves, not the frameworks they use.

## HTML-in-Canvas

**Drawable**:
A DOM element that opts in to being painted into a canvas as its own paint root.
_Avoid_: layoutsubtree element, HTML texture source, overlay

**Drawable subtree**:
A drawable plus all of its descendants, excluding any nested drawable and that drawable's own descendants. One drawable subtree is one image when drawn.
_Avoid_: paint root tree, layer

**Paint event**:
The browser's signal to a canvas that a drawable changed visually or that a redraw was requested.
_Avoid_: repaint callback, render event, frame event

**Element geometry**:
The position and shape of a drawn drawable on its canvas, as the browser knows it for input routing and assistive technology.
_Avoid_: hit box, bounds, hit-test rect, transform (alone)

## Stress test

**Seat**:
One selectable place in the seat-map scenario the stress test simulates.
_Avoid_: drawable (a seat is one only in that rendering mode), cell, item

**Rendering mode**:
One of the compared ways to put seats on a canvas.
_Avoid_: scene, backend, strategy

**Benchmark run**:
One measurement of one rendering mode at one seat count.
_Avoid_: round, test (a run contains several tests)
