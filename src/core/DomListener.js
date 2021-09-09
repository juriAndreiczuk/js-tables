export class DomListener {
	constructor($root) {
		if (!$root) {
			throw new Error('no $root')
		}
		this.$root = $root
	}
}
