/**
 * Sort item by the given param
 * @param param The param to sort the items
 */
export function sortFamily(family: HTMLElement) {
  const sortBy = family.querySelectorAll('[data-sort-by]');
  const sortedItems = Array.from(sortBy).sort((a: Element, b: Element) => {
    if (family.getAttribute('data-sort-type') === 'number') {
      return comparator('number', a as HTMLElement, b as HTMLElement);
    }
    return comparator('string', a as HTMLElement, b as HTMLElement);
  });

  family.innerHTML = '';
  sortedItems.forEach(() => {
    sortedItems.forEach((sortedItem) => {
      family.appendChild(sortedItem);
    });
  });
}

function comparator(type: string, a: HTMLElement, b: HTMLElement) {
  console.log(type);
  if (type === 'number') {
    return Number(a.dataset.sortBy) - Number(b.dataset.sortBy);
  }
  if ((a.dataset.sortBy ?? '') < (b.dataset.sortBy ?? '')) return -1;
  if ((a.dataset.sortBy ?? '') > (b.dataset.sortBy ?? '')) return 1;
  return 0;
}
