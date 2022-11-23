export function formatDate(date: Date | string | undefined | null) {
  if (!date) return ''

  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } as Intl.DateTimeFormatOptions

  return new Intl.DateTimeFormat('default', options).format(new Date(date))
}
