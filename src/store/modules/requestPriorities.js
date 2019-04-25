'use strict'

import RequestPriority from '@/classes/RequestPriority'

const state = {
	loading: false,
	list: []
}

const mutations = {
	SET_LOADING(state, toggle) {
		state.loading = toggle
	},
	SET_LIST(state, arr) {
		state.list = arr
	},
	CLEAR_ALL(state) {
		state.loading = false
		state.list = []
	}
}

const actions = {
	fetchList({ commit }) {
		commit('SET_LOADING', true)

		RequestPriority.fetchAll()
			.then(({ data }) => {
				commit('SET_LIST', data)
			})
			.finally(() => {
				commit('SET_LOADING', false)
			})
	}
}

export default {
	state, mutations, actions
}