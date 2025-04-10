import {
	CHANGE_TEXT,
	TABLE_RESIZE,
	APPLY_STYLE,
	CHANGE_STYLES,
	CHANGE_TITLE,
	UPDATE_DATE
}
from '@/redux/types'

export function tableResize(data) {
	return {
		type: TABLE_RESIZE,
		data
	}
}
export function changeText(data) {
	return {
		type: CHANGE_TEXT,
		data
	}
}
export function changeStyles(data) {
	return {
		type: CHANGE_STYLES,
		data
	}
}


export function applyStyle(data) {
	return {
		type: APPLY_STYLE,
		data
	}
}

export function changeTitle(data) {
	return {
		type: CHANGE_TITLE,
		data
	}
}

export function updateDate() {
	return {
		type: UPDATE_DATE
	}
}
