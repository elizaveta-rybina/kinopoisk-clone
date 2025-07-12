export class KinoApiError extends Error {
	public status: number
	public endpoint: string

	constructor(message: string, status: number, endpoint: string) {
		super(message)
		this.name = 'KinoApiError'
		this.status = status
		this.endpoint = endpoint
	}
}
