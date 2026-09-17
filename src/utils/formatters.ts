export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function calculatePixDiscountSavings(original: number, pixPrice: number): string {
  const diff = original - pixPrice;
  return formatBRL(diff);
}
