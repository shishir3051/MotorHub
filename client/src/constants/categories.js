export const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'cruiser', label: 'Cruiser' },
  { value: 'sportbike', label: 'Sportbike' },
  { value: 'touring', label: 'Touring' },
  { value: 'dirt-bike', label: 'Dirt Bike' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'naked-bike', label: 'Naked Bike' },
];

export function formatCategory(value) {
  if (!value) return 'All';
  const found = CATEGORIES.find((c) => c.value === value);
  return found ? found.label : value.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
