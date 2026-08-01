export const getOrderedVisibleSections = (customization) => {
  if (!customization) return [];
  const { sectionOrder = [], sectionVisibility = {} } = customization;
  return sectionOrder.filter((key) => sectionVisibility[key] !== false);
};

export const formatDateRange = (start, end, current) => {
  if (!start && !end) return '';
  const from = start || '';
  const to = current ? 'Present' : end || '';
  return [from, to].filter(Boolean).join(' — ');
};

export const FONT_SIZE_MAP = {
  small: { base: '12.5px', name: '22px', heading: '13px' },
  medium: { base: '14px', name: '26px', heading: '14.5px' },
  large: { base: '15.5px', name: '30px', heading: '16px' },
};
