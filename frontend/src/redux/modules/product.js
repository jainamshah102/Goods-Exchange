import axios from 'axios'
import { combineReducers } from 'redux'

/**
 * PRODUCT
 * ACTION TYPES
 */
export const FETCH_LIST_REQ = 'sos/product/FETCH_LIST_REQ'
export const FETCH_LIST_DONE = 'sos/product/FETCH_LIST_DONE'
export const FETCH_LIST_FAIL = 'sos/product/FETCH_LIST_FAIL'

export const FETCH_MY_LIST_REQ = 'sos/product/FETCH_MY_LIST_REQ'
export const FETCH_MY_LIST_DONE = 'sos/product/FETCH_MY_LIST_DONE'
export const FETCH_MY_LIST_FAIL = 'sos/product/FETCH_MY_LIST_FAIL'

export const FETCH_DETAILS_REQ = 'sos/product/FETCH_DETAILS_REQ'
export const FETCH_DETAILS_DONE = 'sos/product/FETCH_DETAILS_DONE'
export const FETCH_DETAILS_FAIL = 'sos/product/FETCH_DETAILS_FAIL'

export const CREATE_NEW_REQ = 'sos/product/CREATE_NEW_REQ'
export const CREATE_NEW_DONE = 'sos/product/CREATE_NEW_DONE'
export const CREATE_NEW_FAIL = 'sos/product/CREATE_NEW_FAIL'
export const CREATE_NEW_RESET = 'sos/product/CREATE_NEW_RESET'

export const UPDATE_REQ = 'sos/product/UPDATE_REQ'
export const UPDATE_DONE = 'sos/product/UPDATE_DONE'
export const UPDATE_FAIL = 'sos/product/UPDATE_FAIL'
export const UPDATE_RESET = 'sos/product/UPDATE_RESET'

export const CREATE_LIKE_REQ = 'sos/product/CREATE_LIKE_REQ'
export const CREATE_LIKE_DONE = 'sos/product/CREATE_LIKE_DONE'
export const CREATE_LIKE_FAIL = 'sos/product/CREATE_LIKE_FAIL'

export const CREATE_COMMENT_REQ = 'sos/product/CREATE_COMMENT_REQ'
export const CREATE_COMMENT_DONE = 'sos/product/CREATE_COMMENT_DONE'
export const CREATE_COMMENT_FAIL = 'sos/product/CREATE_COMMENT_FAIL'
export const CREATE_COMMENT_RESET = 'sos/product/CREATE_COMMENT_RESET'

export const FETCH_REQUESTS_REQ = 'sos/product/FETCH_REQUESTS_REQ'
export const FETCH_REQUESTS_DONE = 'sos/product/FETCH_REQUESTS_DONE'
export const FETCH_REQUESTS_FAIL = 'sos/product/FETCH_REQUESTS_FAIL'
export const FETCH_REQUESTS_RESET = 'sos/product/FETCH_REQUESTS_RESET'

export const CREATE_REQUEST_REQ = 'sos/product/CREATE_REQUEST_REQ'
export const CREATE_REQUEST_DONE = 'sos/product/CREATE_REQUEST_DONE'
export const CREATE_REQUEST_FAIL = 'sos/product/CREATE_REQUEST_FAIL'
export const CREATE_REQUEST_RESET = 'sos/product/CREATE_REQUEST_RESET'

/**
 * REDUCER
 */

/** STATE SHAPE PRODUCT LIST
 * {
 *   products: [ product ],
 *   loading: boolean,
 * }
 */
const productListReducer = (
  state = {
    products: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case FETCH_LIST_REQ:
      return { loading: true, products: [] }

    case FETCH_LIST_DONE:
      return { loading: false, products: action.payload }

    case FETCH_LIST_FAIL:
      return { loading: false, error: action.payload }

    case CREATE_LIKE_DONE:
      return {
        ...state,
        products: [...state.products].map((item) =>
          item._id === action.payload._id ? action.payload.product : item
        ),
      }

    default:
      return state
  }
}

/** STATE SHAPE PRODUCT LIST
 * {
 *   products: [ product ],
 *   loading: boolean,
 * }
 */
const myProductListReducer = (
  state = {
    products: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case FETCH_MY_LIST_REQ:
      return { loading: true, products: [] }

    case FETCH_MY_LIST_DONE:
      return { loading: false, products: action.payload }

    case FETCH_MY_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

/** STATE SHAPE PRODUCT DETAILS
 * {
 *   product: object,
 *   loading: boolean,
 * }
 */
const productDetailsReducer = (
  state = {
    product: {},
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case FETCH_DETAILS_REQ:
      return { loading: true, product: {} }

    case FETCH_DETAILS_DONE:
      return { loading: false, success: true, product: action.payload }

    case FETCH_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    case CREATE_COMMENT_DONE:
      return {
        ...state,
        product: {
          ...state.product,
          comments: action.payload.comments,
          numComments: state.product.numComments + 1,
        },
      }

    case CREATE_REQUEST_DONE:
      return { ...state, product: action.payload }

    default:
      return state
  }
}

/** STATE SHAPE CREATE PRODUCT
 * {
 *   product: object,
 *   loading: boolean,
 * }
 */
const createProductReducer = (
  state = {
    product: {},
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case CREATE_NEW_REQ:
      return { loading: true, product: {} }

    case CREATE_NEW_DONE:
      return { loading: false, success: true, product: action.payload }

    case CREATE_NEW_FAIL:
      return { loading: false, error: action.payload }

    case CREATE_NEW_RESET:
      return {}

    default:
      return state
  }
}

/** STATE SHAPE UPDATE PRODUCT
 * {
 *   product: object,
 *   loading: boolean,
 * }
 */
const updateProductReducer = (
  state = {
    product: {},
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_REQ:
      return { loading: true }

    case UPDATE_DONE:
      return { loading: false, success: true }

    case UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case UPDATE_RESET:
      return {}

    default:
      return state
  }
}

/** STATE SHAPE CREATE LIKE
 * {
 * }
 */
const createLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LIKE_REQ:
      return { loading: true }

    case CREATE_LIKE_DONE:
      return { loading: false, success: true }

    case CREATE_LIKE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

/** STATE SHAPE CREATE COMMENT
 * {
 * }
 */
const createCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQ:
      return { loading: true }

    case CREATE_COMMENT_DONE:
      return { loading: false, success: true }

    case CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload }

    case CREATE_COMMENT_RESET:
      return {}

    default:
      return state
  }
}

/** STATE SHAPE CREATE REQUEST
 * {
 * }
 */
const createRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REQUEST_REQ:
      return { loading: true }

    case CREATE_REQUEST_DONE:
      return { loading: false, success: true }

    case CREATE_REQUEST_FAIL:
      return { loading: false, error: action.payload }

    case CREATE_REQUEST_RESET:
      return {}

    default:
      return state
  }
}

/** STATE SHAPE FETCH REQUESTS
 * {
 * requests: []
 * }
 */
const fetchRequestsReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case FETCH_REQUESTS_REQ:
      return { loading: true }

    case FETCH_REQUESTS_DONE:
      return { loading: false, success: true, requests: action.payload }

    case FETCH_REQUESTS_FAIL:
      return { loading: false, error: action.payload }

    case FETCH_REQUESTS_RESET:
      return {}

    default:
      return state
  }
}

export default combineReducers({
  productList: productListReducer,
  myProductList: myProductListReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  productDetails: productDetailsReducer,
  createLike: createLikeReducer,
  createComment: createCommentReducer,
  createRequest: createRequestReducer,
  fetchRequests: fetchRequestsReducer,
})

/**
 * ACTION CREATORS
 */
export function fetchList(keyword = '') {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_LIST_REQ,
      })

      const { data } = await axios.get(`/api/products?keyword=${keyword}`)

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

export function fetchMyList(userId = '', available = '') {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_MY_LIST_REQ,
      })
      const { data } = await axios.get(
        `/api/products?userId=${userId}&available=${available}`
      )

      dispatch({
        type: FETCH_MY_LIST_DONE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: FETCH_MY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export function fetchDetails(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_DETAILS_REQ })

      const { data } = await axios.get(`/api/products/${id}`)

      dispatch({
        type: FETCH_DETAILS_DONE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: FETCH_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export function createLike(_id, numLikes) {
  return async (dispatch, getState) => {
    // Get current logged in user info
    const {
      user: {
        userLogin: { user },
      },
    } = getState()

    try {
      dispatch({
        type: CREATE_LIKE_REQ,
      })

      const config = {
        method: 'post',
        url: `/api/products/${_id}/likes`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        data: JSON.stringify({ numLikes }),
      }

      const { data } = await axios(config)

      dispatch({
        type: CREATE_LIKE_DONE,
        payload: { product: data.product, _id },
      })
    } catch (error) {
      dispatch({
        type: CREATE_LIKE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export function createComment(_id, comment, numComments) {
  return async (dispatch, getState) => {
    // Get current logged in user info
    const {
      user: {
        userLogin: { user },
      },
    } = getState()

    try {
      dispatch({
        type: CREATE_COMMENT_REQ,
      })

      const config = {
        method: 'post',
        url: `/api/products/${_id}/comments`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        data: JSON.stringify({
          name: comment.name,
          text: comment.text,
          numComments,
        }),
      }

      const { data } = await axios(config)

      dispatch({
        type: CREATE_COMMENT_DONE,
        payload: data.product,
      })
    } catch (error) {
      dispatch({
        type: CREATE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export function updateProduct({
  _id,
  title,
  description,
  location,
  wishList,
  image,
}) {
  return async (dispatch, getState) => {
    // Get current logged in user info
    const {
      user: {
        userLogin: { user },
      },
    } = getState()

    try {
      dispatch({
        type: UPDATE_REQ,
      })

      const config = {
        method: 'put',
        url: `/api/products/${_id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        data: JSON.stringify({
          _id,
          title,
          description,
          location,
          wishList,
          image,
        }),
      }

      const { data } = await axios(config)

      dispatch({
        type: UPDATE_DONE,
        payload: data.product,
      })

      dispatch({
        type: UPDATE_RESET,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export function createProduct(newProduct) {
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
        url: `/api/products/`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        data: JSON.stringify(newProduct),
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

export function createRequest(
  giveAwayItemId,
  wantedProductImage,
  wantedProductTitle,
  wantedProductId
) {
  return async (dispatch, getState) => {
    // Get current logged in user info
    const {
      user: {
        userLogin: { user },
      },
    } = getState()

    try {
      dispatch({
        type: CREATE_REQUEST_REQ,
      })

      const config = {
        method: 'post',
        url: `/api/requests/`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        data: JSON.stringify({
          giveAwayItemId,
          wantedProductImage,
          wantedProductTitle,
          wantedProductId,
        }),
      }

      const { data } = await axios(config)

      dispatch({
        type: CREATE_REQUEST_DONE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CREATE_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export function fetchRequests() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_REQUESTS_REQ })
      const {
        user: {
          userLogin: { user },
        },
      } = getState()

      const config = {
        method: 'get',
        url: '/api/requests',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios(config)

      dispatch({
        type: FETCH_REQUESTS_DONE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CREATE_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? `^^err.res.data.mes:=> ${error.response.data.message}`
            : `^^err.res:=> ${error.response}`,
      })
    }
  }
}
