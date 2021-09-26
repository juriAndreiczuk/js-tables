import {$} from '@core/dom'

export function resizeHandler(event, $root) {
	const $resizer = $(event.target)
	const $parent = $resizer.closest('[data-type="resizable"]')
	const coords = $parent.getCoords()
	let value = 0;

	$resizer.classToggle('resizing')

	document.onmousemove = e => {
		if ($resizer.data.resize === 'col') {
			const delta = Math.floor(e.pageX - coords.right)
			value = (coords.width + delta) + 'px'
			$parent.css({'width': value})
		} else if ($resizer.data.resize === 'row') {
			const delta = Math.floor(e.pageY - coords.bottom)
			value = (coords.height + delta) + 'px'
			$parent.css({'height': value})
		}
	}

	document.onmouseup = () => {
		document.onmousemove = null
		document.onmouseup = null
		$resizer.classToggle('resizing')
		if ($resizer.data.resize === 'col') {
			$root
				.findAll([`[data-col="${$parent.data.col}"]`])
				.forEach(el => $(el).css({'width': value}))
		}
	}
}
