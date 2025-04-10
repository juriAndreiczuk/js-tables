class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector
	}
	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html
			return this
		}
		return this.$el.outerHTML.trim()
	}
	text(text) {
		if (typeof text !== 'undefined') {
			this.$el.textContent = text
			return this
		}
		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim()
		}
		return this.$el.textContent.trim()
	}
	clear() {
		this.html('')
		return this
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback)
	}

	off(eventType, listener) {
		this.$el.removeEventListener(eventType, listener)
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.$el
		}
		if (Element.prototype.append) {
			this.$el.append(node)
		} else {
			this.$el.appendChild(node)
		}
		return this
	}
	get data() {
		return this.$el.dataset
	}
	closest(selector) {
		return $(this.$el.closest(selector))
	}
	getCoords() {
		return this.$el.getBoundingClientRect()
	}
	findAll(selector) {
		return this.$el.querySelectorAll(selector)
	}
	find(selector) {
		return $(this.$el.querySelector(selector))
	}
	classToggle(className) {
		this.$el.classList.contains(className) ?
			this.$el.classList.remove(className) : this.$el.classList.add(className)
		return this
	}
	addClass(className) {
		this.$el.classList.add(className)
	}
	removeClass(className) {
		this.$el.classList.remove(className)
	}
	css(styles = {}) {
		Object
			.keys(styles)
			.forEach(key => {
			this.$el.style[key] = styles[key]
		})
		return this
	}

	getStyles(styles = []) {
		return styles.reduce((acc, s) => {
			acc[s] = this.$el.style[s]
			return acc
		}, {})
	}

	id(parse) {
		if (parse) {
			const parsed = this.id().split(':')
			return {
				row: +parsed[0],
				col: +parsed[1]
			}
		}
		return this.data.id
	}
	focus() {
		this.$el.focus()
		return this
	}
	attr(name, value) {
		if (value) {
			this.$el.setAttribute(name, value)
			return this
		}
		return this.$el.getAttribute(name)
	}
}

export function $(selector) {
	return new Dom(selector)
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName)
	if (classes) {
		el.classList.add(classes)
	}
	return $(el)
}
