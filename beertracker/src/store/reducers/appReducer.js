// Action types
import {
    SET_LOADING,
    SHOW_ERROR,
    STORE_BREWERIES,
    STORE_SEARCH_RESULTS,
    GET_USER_LOCATION,
    STORE_USER_LOCATION,
    STORE_SEARCH_QUERY,
    STORE_SEARCH_QUERY_LOCATION_DATA, REMOVE_ERROR
} from '../actions/actionTypes';

// Initial State
const initialState = {
    error: {
        show: false,
        message: ''
    },
    isLoading: false,
    breweries: [],
    searchQuery: '',
    searchQueryLocationData: {},
    searchResults: [],
    userLocationData: {},
};

// App Reducer
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, isLoading: action.value };
        case SHOW_ERROR:
            return {
                ...state, error: {
                    show: true,
                    message: action.error
                }
            };
        case REMOVE_ERROR:
            return {
                ...state, error: {
                    show: false,
                    message: ''
                }
            };
        case STORE_BREWERIES:
            return { ...state, breweries: action.breweries };
        case STORE_SEARCH_RESULTS:
            return { ...state, searchResults: action.results };
        case STORE_USER_LOCATION:
            return { ...state, userLocationData: action.locationData };
        case STORE_SEARCH_QUERY:
            return { ...state, searchQuery: action.query };
        case STORE_SEARCH_QUERY_LOCATION_DATA:
            return { ...state, searchQueryLocationData: action.locationData };
        case GET_USER_LOCATION:
            return { ...state, userLocationData: action.locationData };
        default:
            return state;
    }
};

export default appReducer;
