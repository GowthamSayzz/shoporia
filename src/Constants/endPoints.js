export const API_END_POINTS = {

    /**
     * USER AUTHENTICATIONS API END POINTS
     */
    SIGNUP: '/api/std/create-acount',
    SIGNIN: '/auth/login',
    FORGOT_PASSWORD: '/api/std/reset-password',

    /**
     * ADDRESS API END POINTS
     */

    GET_ADDRESS_BY_USER: '/user',
    ADDRESS_ADD: 'api/std/address/add',
    ADDRESS_VIEW: '/user',
    ADDRESS_DELETE: 'api/std/address/delete',
    SEARCH_SUGGESTIONS: '/products/search',

    /**
     * PRODUCTS API END POINTS
     */
    
    ALL_PRODUCTS: '/products?limit=0',
    ALL_PRODUCTS_CATEGORIES: '/products/categories',
    ALL_PRODUCTS_BY_CATEGORY: '/products/category',
    PRODUCTS_BY_ID: '/products',
    OTHER_PRODUCTS: '/products?limit=60&skip=30',

    /**
     * CART API END POINTS
     */

    GET_SINGLE_CART: '/carts/user',
    ADD_TO_CART: '/carts/add',
    UPDATE_CART: '/carts',
    DELETE_CART: '/carts'

}
