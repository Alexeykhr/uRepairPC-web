'use strict'

import { getColumnUsers } from './storage'
import * as roles from '@/enum/roles'

/** @type {array} */
export const COLUMNS_DATES = ['updated_at', 'created_at']

/** @return {Object} - prop, label, model */
export function users() {
	const defaultActive = ['first_name', 'last_name', 'email', 'phone']

	const columns = [
		{ prop: 'id', label: 'ID', 'min-width': 70, sortable: true },
		{ prop: 'first_name', label: 'Ім\'я', 'min-width': 150, sortable: true },
		{ prop: 'middle_name', label: 'По-батькові', 'min-width': 150, sortable: true },
		{ prop: 'last_name', label: 'Прізвище', 'min-width': 150, sortable: true },
		{ prop: 'role', label: 'Роль', 'min-width': 150, access: [roles.ADMIN], sortable: true },
		{ prop: 'email', label: 'E-mail', 'min-width': 250, sortable: true },
		{ prop: 'phone', label: 'Телефон', 'min-width': 150, sortable: true },
		{ prop: 'updated_at', label: 'Оновлено', 'min-width': 150, sortable: true },
		{ prop: 'created_at', label: 'Створений', 'min-width': 150, sortable: true }
	]

	const data = getColumnUsers() || defaultActive

	return columns.map((column) => {
		return { ...column, model: data.includes(column.prop) }
	})
}
