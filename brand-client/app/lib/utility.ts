export function formatDate(dateString: string): string {
    const datePart = getDatePart(dateString)
    const elements: string[] = datePart.split("-")
    return `${elements[2]}/${elements[1]}/${elements[0]}`
}

export function getDatePart(dateString: string): string {
    const [datePart] = dateString.split("T")
    return datePart
}