import _get from "lodash/get"

/**
 *
 * @param {Object} slice Prismic Slice Object
 * @returns {
 *  getPrimary: (field) => String,
 *  items: Array
 * }
 */
export function useSlice(slice) {
	const { primary, items } = slice

	/**
	 *
	 * @param {String} field
	 * @returns
	 */
	const getPrimary = (field) => {
		return _get(primary, field, null)
	}

	return {
		getPrimary,
		items: items || []
	}
}
