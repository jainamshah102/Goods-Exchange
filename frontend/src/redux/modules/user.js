import axios from 'axios'
import { combineReducers } from 'redux'

/**
 * USER MODULE
 * ACTION TYPES
 */
export const LOGIN_REQ = 'sos/user/LOGIN_REQ'
export const LOGIN_DONE = 'sos/user/LOGIN_DONE'
export const LOGIN_FAIL = 'sos/user/LOGIN_FAIL'
export const LOGOUT = 'sos/user/LOGOUT'

export const REGISTER_REQ = 'sos/user/REGISTER_REQ'
export const REGISTER_DONE = 'sos/user/REGISTER_DONE'
export const REGISTER_FAIL = 'sos/user/REGISTER_FAIL'
export const REGISTER_RESET = 'sos/user/REGISTER_RESET'

export const PROFILE_REQ = 'sos/user/PROFILE_REQ'
export const PROFILE_DONE = 'sos/user/PROFILE_DONE'
export const PROFILE_FAIL = 'sos/user/PROFILE_FAIL'

export const UPDATE_PROFILE_REQ = 'sos/user/UPDATE_PROFILE_REQ'
export const UPDATE_PROFILE_DONE = 'sos/user/UPDATE_PROFILE_DONE'
export const UPDATE_PROFILE_FAIL = 'sos/user/UPDATE_PROFILE_FAIL'

/**
 * REDUCERS
 */

/** STATE SHAPE
 * {
 *   user: {object},
 *   loading: boolean,
 * }
 */
const userLoginReducer = (
  state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQ:
      return { loading: true, user: null }

    case LOGIN_DONE:
      return { loading: false, isSuccess: true, user: action.payload }

    case LOGIN_FAIL:
      return { loading: false, error: action.payload }

    case LOGOUT:
      return { user: null }

    default:
      return state
  }
}

/** STATE SHAPE
 * {
 *   user: {object},
 *   loading: boolean,
 * }
 */
const userRegisterReducer = (
  state = {
    user: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case REGISTER_REQ:
      return { loading: true, user: null }

    case REGISTER_DONE:
      return { loading: false, isSuccess: true, user: action.payload }

    case REGISTER_FAIL:
      return { loading: false, error: action.payload }

    case REGISTER_RESET:
      return {}

    default:
      return state
  }
}

/** STATE SHAPE
 * {
 *   user: {object},
 *   loading: boolean,
 * }
 */
const userProfileReducer = (
  state = {
    user: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case PROFILE_REQ:
      return { loading: true, user: null }

    case PROFILE_DONE:
      return { loading: false, isSuccess: true, user: action.payload }

    case PROFILE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

/** STATE SHAPE
 * {
 *   user: {object},
 *   loading: boolean,
 * }
 */
const updateProfileReducer = (
  state = {
    user: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQ:
      return { loading: true, user: null }

    case UPDATE_PROFILE_DONE:
      return { loading: false, isSuccess: true, user: action.payload }

    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  updateProfile: updateProfileReducer,
})

/**
 * ACTION CREATORS
 */
export function login(email, password) {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQ,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users/login',
        {
          email,
          password,
        },
        config
      )

      dispatch({
        type: LOGIN_DONE,
        payload: data,
      })

      localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export function logout() {
  return async (dispatch) => {
    await dispatch({ type: LOGOUT })
    localStorage.removeItem('user')
    
  }
}

export function register(name, email, password) {
  return async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQ,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users/register',
        { name, email, password },
        config
      )

      dispatch({
        type: REGISTER_DONE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export function fetchProfile() {
  return async (dispatch, getState) => {
    const {
      user: {
        userLogin: { user },
      },
    } = getState()

    try {
      dispatch({
        type: PROFILE_REQ,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.get('/api/users/profile', config)

      dispatch({
        type: PROFILE_DONE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export function updateProfile(userUpdateProfile) {
  return async (dispatch, getState) => {
    const {
      user: {
        userLogin: { user },
      },
    } = getState()

    try {
      dispatch({
        type: UPDATE_PROFILE_REQ,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.put(
        '/api/users/profile',
        userUpdateProfile,
        config
      )

      dispatch({
        type: UPDATE_PROFILE_DONE,
        payload: data,
      })

      dispatch({
        type: LOGIN_DONE,
        payload: data,
      })

      localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
