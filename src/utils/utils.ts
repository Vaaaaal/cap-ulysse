/**
 * Clamp a value between a min and max
 * @param current The x
 * @param target The x
 * @param factor The x
 */
export function lerp(current: number, target: number, factor: number) {
  return (1 - factor) * current + factor * target;
}

/**
 * Get the mouse position
 * @param evt The event
 */
export function getMousePosition(evt: MouseEvent) {
  return {
    y: evt.pageY,
    x: evt.pageX,
  };
}

/**
 * Get the mouse position relative to an element
 * @param evt The event
 */
export function getMousePositionRelativeToElement(evt: MouseEvent) {
  return {
    y: evt.clientY,
    x: evt.clientX,
  };
}

/**
 * Calculate the distance between two points
 * @param x1 The x1
 * @param y1 The y1
 * @param x2 The x2
 * @param y2 The y2
 */
export function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x1 - x2, y1 - y2);
}
