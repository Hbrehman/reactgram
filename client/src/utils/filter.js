export const filter = (items, currentFilter, def = "All Gadgets") => {
  if (currentFilter === def) return items;
  const filtered = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].category.name === currentFilter) filtered.push(items[i]);
  }
  return filtered;
};
