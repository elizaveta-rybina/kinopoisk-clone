import { API_BASE_URL, headers } from './constants'
import { KinoApiError } from './errors'

export async function fetchFromApi<T>(endpoint: string): Promise<T> {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers })

		if (!response.ok) {
			const errorText = await response.text().catch(() => 'No response body')
			throw new KinoApiError(
				`API request failed: ${response.statusText} (${response.status}). Response: ${errorText}`,
				response.status,
				endpoint
			)
		}

		return await response.json()
	} catch (error) {
		if (error instanceof KinoApiError) {
			throw error
		}
		throw new KinoApiError(
			`Network error: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`,
			0,
			endpoint
		)
	}
}
