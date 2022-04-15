import { goto } from '$app/navigation';

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

export function setPageSearchParam(page: number)
{
  const url = new URL(location.href);
  url.searchParams.set('page', page.toString());
  goto(url.toString());
}
