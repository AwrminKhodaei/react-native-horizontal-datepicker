export interface ItemMetrics {
  /** Index of the currently selected day, or -1 when nothing is selected. */
  selectedIndex: number;
  selectedItemWidth: number;
  unselectedItemWidth: number;
  /** Horizontal margin applied to each side of every item. */
  itemSpacing: number;
}

export interface ItemLayout {
  length: number;
  offset: number;
  index: number;
}

/**
 * Builds a `getItemLayout` for the horizontal list. Item widths vary — the
 * selected day is wider than the rest — so an offset is the running total of
 * every preceding item rather than a fixed stride.
 */
export const createGetItemLayout = ({
  selectedIndex,
  selectedItemWidth,
  unselectedItemWidth,
  itemSpacing,
}: ItemMetrics) => {
  const margins = itemSpacing * 2;
  const selected = selectedItemWidth + margins;
  const unselected = unselectedItemWidth + margins;

  return (index: number): ItemLayout => {
    const selectedPrecedes = selectedIndex >= 0 && selectedIndex < index;
    return {
      length: index === selectedIndex ? selected : unselected,
      offset:
        index * unselected + (selectedPrecedes ? selected - unselected : 0),
      index,
    };
  };
};
