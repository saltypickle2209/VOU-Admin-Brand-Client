export function formatDate(dateString: string): string {
    const [datePart] = dateString.split("T")
    const elements: string[] = datePart.split("-")
    return `${elements[2]}/${elements[1]}/${elements[0]}`
}