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

export function getClientSideToken(): string {
    const cookies = document.cookie
    const match = cookies.match(/(^|;\s*)token=([^;]*)/)
    if (match) {
      return match[2]
    } else {
      return ''
    }
}