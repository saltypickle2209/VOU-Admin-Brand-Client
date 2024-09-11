export function getDatePart(dateString: string): string {
    const [datePart] = dateString.split("T")
    return datePart
}

export function getFullDateFromObject(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with zero if needed
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`
  }