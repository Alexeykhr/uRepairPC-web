'use strict'

import axios from 'axios'

/** @type {string} */
export const API_POINT = 'equipments/models'

export default class EquipmentModel {

	/* | ------------------------------------------------------------------------------------------------
	 * | - Requests -
	 * | ------------------------------------------------------------------------------------------------
	 */

	/**
	 * Get resource.
	 *
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchAll(config = null) {
		return axios.get(API_POINT, config)
	}

	/**
	 * Edit resource data by id.
	 *
	 * @param {number} id
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchEdit(id, data = null, config = null) {
		return axios.put(`${API_POINT}/${id}`, data, config)
	}

	/**
	 * Store resource by id.
	 *
	 * @param {*} data
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchStore(data = null, config = null) {
		return axios.post(API_POINT, data, config)
	}

	/**
	 * Delete resource by id.
	 *
	 * @param {number} id
	 * @param {AxiosRequestConfig} config
	 * @return {Promise<AxiosPromise<any>>}
	 */
	static fetchDelete(id, config = null) {
		return axios.delete(`${API_POINT}/${id}`, config)
	}

}