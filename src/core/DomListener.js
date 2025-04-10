import {getMethodName} from '@core/utils'

export class DomListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error('no $root')
		}
		this.$root = $root
		this.listeners = listeners
	}
	initDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			if (!this[method]) {
				throw new Error(
					`Method ${method} is not implemented in ${this.name} Component`
				)
			} else {
				this[method] = this[method].bind(this)
				this.$root.on(listener, this[method])
			}
		})
	}
	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
				this.$root.off(listener, this[method])
		})
	}
}
