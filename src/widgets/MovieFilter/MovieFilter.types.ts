export interface MovieFilterProps {
	onFilterChange?: (filters: {
		genres?: string[]
		ratingMin?: number
		yearMin?: number
	}) => void
}
