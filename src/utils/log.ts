const logData: {
	[key in string]: any
} = {}

export const logger = {
	add: (key: string, value: string) => {
		logData[key] = value
	},
	get: () => {
		return Object.entries(logData)
	}
}
