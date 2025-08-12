export function fmtCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function fmtDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function levelLabel(level: string): string {
  const labels = {
    low: 'Low Dependence',
    moderate: 'Moderate Dependence', 
    high: 'High Dependence',
    very_high: 'Very High Dependence'
  };
  return (labels as any)[level] || level;
}