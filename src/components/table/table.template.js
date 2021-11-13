import {toInlineStyles} from '../../core/utils'
import {defaultStyles} from '../../core/constans'
import parse from '../../core/parse'
const CODES = {
	A: 65,
	Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24
function getWidth(state, index) {
	return state ? (state[index] || DEFAULT_WIDTH) : DEFAULT_WIDTH
}
function getHeight(state, index) {
		return state ? (state[index] || DEFAULT_HEIGHT) : DEFAULT_HEIGHT + 'px'
}

function toCell(row, col, state) {
	const id = `${row}:${col}`
	const data = state.dataState[id]
	const styles = toInlineStyles({
		...defaultStyles,
		...state.stylesState[id]
	})

	return `
		<div
			class="cell"
			contenteditable
		 	data-col="${col}"
		 	data-type="cell"
		 	data-id="${id}"
			data-value="${data || ''}"
		 	style="${styles}; width: ${getWidth(state.colState, col)}"
		>${parse(data) || ''}</div>
	`
}

function toColumn({col, index, width}) {
	return `
		<div
			class="column"
		 	data-type="resizable"
		 	data-col="${index}"
		 	style="width: ${width}"
		>
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

function createRow(content, index, state = null) {
	const height = getHeight(state, index)
	const resizer = index + 1
		? '<div class="row-resize" data-resize="row"></div>'
		: ''
	return `
		<div
			class="row"
			data-type="resizable"
		 	data-row="${index}"
		 	style="height: ${height}"
		>
			<div class="row-info">
				${index + 1 ? index + 1 : ''}
				${resizer}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
	return function(col, index) {
		return {
			col,
			index,
			width: getWidth(state.colState, index)
		}
	}
}

export function createTable(rowsCount = 20, state) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(withWidthFrom(state))
		.map(toColumn)
		.join('')
	rows.push(createRow(cols))

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map((_, index)=> toCell(row, index, state))
			.join('')
		rows.push(createRow(cells, row, state.rowState))
	}
	return rows.join('')
}
