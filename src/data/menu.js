'use strict'

import sections from '@/data/sections'
import * as roles from '@/enum/roles'
import * as types from '@/enum/types'
import router from '@/router'

/**
 * Display on sidebar. Route name must be equal to
 * template.sidebar store for show on left sidebar.
 * @type {object} of objects
 */
export default {
	[sections.home]: {
		icon: 'home',
		title: 'Головна сторінка',
		route: { name: sections.home }
	},
	[sections.requests]: {
		icon: 'description',
		title: 'Заявки',
		route: { name: sections.requests },
		history: {
			show: true
		},
		actions: {
			add: {
				title: 'Створити заявку',
				icon: 'add',
				type: types.PRIMARY,
				action: () => router.push({ name: `${sections.requests}-create` })
			}
		}
	},
	[sections.users]: {
		icon: 'people_outline',
		title: 'Користувачі',
		route: { name: sections.users },
		history: {
			show: true,
			callback: (obj) => `[${obj.id}] ${obj.last_name} ${obj.first_name}`
		},
		actions: {
			add: {
				title: 'Створити користувача',
				icon: 'add',
				type: types.PRIMARY,
				access: [roles.ADMIN],
				action: () => router.push({ name: `${sections.users}-create` })
			}
		}
	},
	[sections.equipments]: {
		icon: 'storage',
		title: 'Обладнання',
		route: { name: sections.equipments },
		access: [roles.ADMIN, roles.WORKER],
		history: {
			show: true
		},
		actions: {
			add: {
				title: 'Створити обладнання',
				icon: 'add',
				type: types.PRIMARY,
				action: () => router.push({ name: `${sections.equipments}-create` })
			}
		}
	},
	[sections.workers]: {
		icon: 'people',
		title: 'Працівники',
		route: { name: sections.workers },
		access: [roles.ADMIN]
	},
	[sections.settings]: {
		icon: 'settings',
		title: 'Конфігурація',
		route: { name: sections.settings },
		access: [roles.ADMIN, roles.WORKER],
		actions: {
			[sections.settingsManufacturers]: {
				title: 'Виробники обладнання',
				icon: 'keyboard_arrow_right',
				tag: 'page',
				action: () => router.push({ name: `${sections.settingsManufacturers}` })
			},
			[sections.settingsTypes]: {
				title: 'Типи обладнання',
				icon: 'keyboard_arrow_right',
				tag: 'page',
				action: () => router.push({ name: `${sections.settingsTypes}` })
			},
			[sections.settingsModels]: {
				title: 'Моделі обладнання',
				icon: 'keyboard_arrow_right',
				tag: 'page',
				action: () => router.push({ name: `${sections.settingsModels}` })
			}
		}
	}
}