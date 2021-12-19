import axios from 'axios'
import { combineReducers } from 'redux'

/**
 * TRANSACTION
 * ACTION TYPES
 */

export const CREATE_NEW_REQ = 'sos/transaction/CREATE_NEW_REQ'
export const CREATE_NEW_DONE = 'sos/transaction/CREATE_NEW_DONE'
export const CREATE_NEW_FAIL = 'sos/transaction/CREATE_NEW_FAIL'
export const CREATE_NEW_RESET = 'sos/transaction/CREATE_NEW_RESET'

export const FETCH_LIST_REQ = 'sos/transaction/FETCH_LIST_REQ'
export const FETCH_LIST_DONE = 'sos/transaction/FETCH_LIST_DONE'
export const FETCH_LIST_FAIL = 'sos/transaction/FETCH_LIST_FAIL'
export const FETCH_LIST_RESET = 'sos/transaction/FETCH_LIST_RESET'

/**
 * REDUCER
 */

/** STATE SHAPE CREATE TRANSACTION
 * {
 *   transaction: { object },
 *   loading: boolean,
 * }
 */
const createTXReducer = (
  state = {
    transaction: {},
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case CREATE_NEW_REQ:
      return { loading: true, transaction: {} }

    case CREATE_NEW_DONE:
      return { loading: false, success: true, transaction: action.payload }

    case CREATE_NEW_FAIL:
      return { loading: false, error: action.payload }

    case CREATE_NEW_RESET:
      return {}

    default:
      return state
  }
}

/** STATE SHAPE FETCH TRANSACTION LIST
 * {
 *   transactions: [],
 *   loading: boolean,
 * }
 */
const fetchTXReducer = (
  state = {
    transactions: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case FETCH_LIST_REQ:
      return { loading: true, transactions: [] }

    case FETCH_LIST_DONE:
      return { loading: false, success: true, transactions: action.payload }

    case FETCH_LIST_FAIL:
      return { loading: false, error: action.payload }

    case FETCH_LIST_RESET:
      return {}

    default:
      return state
  }
}

export default combineReducers({
  createTX: createTXReducer,
  fetchTX: fetchTXReducer,
})

/**
 * ACTION CREATORS
 */

export function createTX({ buyerItemId, sellerItemId }) {
  return async (dispatch, getState) => {
    // Get current logged in user info
    const {
      user: {
        userLogin: { user },
      },
    } = getState()

    try {
      dispatch({
        type: CREATE_NEW_REQ,
      })

      const config = {
        method: 'post',
        url: `/api/transactions/`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        data: JSON.stringify({ buyerItemId, sellerItemId }),
      }

      const { data } = await axios(config)

      dispatch({
        type: CREATE_NEW_DONE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CREATE_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export function fetchTransactions() {
  return async (dispatch, getState) => {
    // Get current logged in user info
    const {
      user: {
        userLogin: { user },
      },
    } = getState()

    try {
      dispatch({
        type: FETCH_LIST_REQ,
      })

      const config = {
        method: 'get',
        url: `/api/transactions/`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios(config)

      dispatch({
        type: FETCH_LIST_DONE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: FETCH_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
