export interface MovieFilterProps {
	onFilterChange?: (filters: {
		genres: string[]
		rating: { min: number; max: number }
		yearMin: number
		yearMax: number
	}) => void
}
