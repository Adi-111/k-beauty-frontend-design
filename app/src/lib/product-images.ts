const map: Record<string, any> = {
  '/products/toner-pad-1.jpg':          require('@/assets/images/products/toner-pad-1.jpg'),
  '/products/toner-pad-2.jpg':          require('@/assets/images/products/toner-pad-2.jpg'),
  '/products/toner-pad-3.jpg':          require('@/assets/images/products/toner-pad-3.jpg'),
  '/products/cica-mask-1.jpg':          require('@/assets/images/products/cica-mask-1.jpg'),
  '/products/cica-mask-2.jpg':          require('@/assets/images/products/cica-mask-2.jpg'),
  '/products/cica-mask-3.jpg':          require('@/assets/images/products/cica-mask-3.jpg'),
  '/products/cat-banner-bestseller.jpg':require('@/assets/images/products/cat-banner-bestseller.jpg'),
  '/products/cat-banner-member.jpg':    require('@/assets/images/products/cat-banner-member.jpg'),
  '/products/cat-banner-rewards.jpg':   require('@/assets/images/products/cat-banner-rewards.jpg'),
  '/products/cat-body.jpg':             require('@/assets/images/products/cat-body.jpg'),
  '/products/cat-cleansers.jpg':        require('@/assets/images/products/cat-cleansers.jpg'),
  '/products/cat-essences.jpg':         require('@/assets/images/products/cat-essences.jpg'),
  '/products/cat-exfoliators.jpg':      require('@/assets/images/products/cat-exfoliators.jpg'),
  '/products/cat-eye-care.jpg':         require('@/assets/images/products/cat-eye-care.jpg'),
  '/products/cat-lip-care.jpg':         require('@/assets/images/products/cat-lip-care.jpg'),
  '/products/cat-moisturizers-2.jpg':   require('@/assets/images/products/cat-moisturizers-2.jpg'),
  '/products/cat-moisturizers.jpg':     require('@/assets/images/products/cat-moisturizers.jpg'),
  '/products/cat-serums-2.jpg':         require('@/assets/images/products/cat-serums-2.jpg'),
  '/products/cat-serums.jpg':           require('@/assets/images/products/cat-serums.jpg'),
  '/products/cat-sheet-masks.jpg':      require('@/assets/images/products/cat-sheet-masks.jpg'),
  '/products/cat-suncare.jpg':          require('@/assets/images/products/cat-suncare.jpg'),
  '/products/cat-toner-pads.jpg':       require('@/assets/images/products/cat-toner-pads.jpg'),
  '/products/cat-toners.jpg':           require('@/assets/images/products/cat-toners.jpg'),
};

export function resolveImage(path: string | undefined): any {
  if (!path) return undefined;
  return map[path];
}
