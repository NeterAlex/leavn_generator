export function genYearsList() {
    const currentYear = new Date().getFullYear()
    return [
        currentYear,
        currentYear - 1,
        currentYear - 2,
        currentYear - 3,
        currentYear - 4
    ]
}
