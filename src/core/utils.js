// pure functions
export function capitalize(string) {
	if (typeof string !== 'string') {
		return ''
	}
	return string[0].toUpperCase() + string.slice(1)
}

export function getMethodName(eventName) {
	return `on${capitalize(eventName)}`
}
