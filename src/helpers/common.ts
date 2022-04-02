export function formatCurrency(amount = 0)
{
  return amount.toLocaleString('default', {
    style: 'currency',
    currency: 'PHP'
  });
}

export function formatDate(dateString: string)
{
  return new Date(dateString)
    .toLocaleString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
}
