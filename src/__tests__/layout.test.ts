import { createGetItemLayout } from '../utils/layout';

const metrics = {
  selectedItemWidth: 170,
  unselectedItemWidth: 38,
  itemSpacing: 10,
};

describe('createGetItemLayout', () => {
  it('measures an item by its width, including horizontal margins', () => {
    const layout = createGetItemLayout({ ...metrics, selectedIndex: -1 });
    expect(layout(2).length).toBe(58);
  });

  it('gives the wider measurement to the selected item', () => {
    const layout = createGetItemLayout({ ...metrics, selectedIndex: 2 });
    expect(layout(2).length).toBe(190);
    expect(layout(1).length).toBe(58);
  });

  it('places the first item at offset zero', () => {
    const layout = createGetItemLayout({ ...metrics, selectedIndex: 0 });
    expect(layout(0).offset).toBe(0);
  });

  it('accumulates the widths of every preceding item', () => {
    const layout = createGetItemLayout({ ...metrics, selectedIndex: -1 });
    expect(layout(1).offset).toBe(58);
    expect(layout(3).offset).toBe(174);
  });

  it('accounts for a wide selected item sitting before the requested index', () => {
    const layout = createGetItemLayout({ ...metrics, selectedIndex: 0 });
    expect(layout(1).offset).toBe(190);
    expect(layout(2).offset).toBe(248);
  });

  it('leaves offsets untouched when the selection sits after the index', () => {
    const layout = createGetItemLayout({ ...metrics, selectedIndex: 5 });
    expect(layout(2).offset).toBe(116);
  });

  it('echoes the index back for FlatList', () => {
    const layout = createGetItemLayout({ ...metrics, selectedIndex: 1 });
    expect(layout(4).index).toBe(4);
  });
});
