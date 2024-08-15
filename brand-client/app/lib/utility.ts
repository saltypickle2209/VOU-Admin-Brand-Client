export function formatDate(dateString: string): string {
    const elements: string[] = dateString.split("-")
    return `${elements[2]}/${elements[1]}/${elements[0]}`
}