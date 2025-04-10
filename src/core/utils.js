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
export function range(start, end) {
	if (start > end) {
		[end, start] = [start, end]
	}
	return new Array(end - start + 1)
		.fill('')
		.map((_, index) => start + index)
}

export function storage(key, data = null) {
	if (!data) {
		return JSON.parse(localStorage.getItem(key))
	}
	localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
	if (typeof a === 'object' && typeof b === 'object') {
		return JSON.stringify(a) === JSON.stringify(b)
	}
	return a === b
}

export function camelToDashCase(myStr) {
	return myStr.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
	return Object.keys(styles)
		.map(key => `${camelToDashCase(key)}: ${styles[key]}`)
		.join(';')
}

export function debounce(fn, wait) {
	let timeout
	return function(...args) {
		const later = () => {
			clearTimeout(timeout)
			// eslint-disable-next-line
			fn.apply(this, args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

export function clone(obj) {
	return JSON.parse(JSON.stringify(obj))
}
