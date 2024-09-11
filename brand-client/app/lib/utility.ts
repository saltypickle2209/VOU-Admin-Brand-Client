export function formatDate(dateString: string): string {
    const datePart = getDatePart(dateString)
    const elements: string[] = datePart.split("-")
    return `${elements[2]}/${elements[1]}/${elements[0]}`
}

export function getDatePart(dateString: string): string {
    const [datePart] = dateString.split("T")
    return datePart
}

export function getDateTime(dateString: string): string {
  const dateObj = new Date(dateString);

  dateObj.setHours(dateObj.getHours() + 7);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getFullDateFromObject(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with zero if needed
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`
}

export function getClientSideToken(): string {
    const cookies = document.cookie
    const match = cookies.match(/(^|;\s*)token=([^;]*)/)
    if (match) {
      return match[2]
    } else {
      return ''
    }
}