import {
    SET_LOADING,
    SHOW_ERROR,
    REMOVE_ERROR,
    STORE_BREWERIES,
    STORE_SEARCH_QUERY,
    STORE_SEARCH_QUERY_LOCATION_DATA,
    STORE_SEARCH_RESULTS,
    STORE_USER_LOCATION
} from './actionTypes';
import DataController from "../../controllers/DataController";
import APIController from "../../controllers/APIController";

// Private Actions
// =============================================

/**
 * Set loading state
 * @param bool
 * @returns {{type: string, value: *}}
 */
function toggleLoadingState(bool) {
    return {
        type: SET_LOADING,
        value: bool
    }
}

/**
 * Set error state with error message
 * @param error
 * @returns {{type: string, error: string}}
 */
function showError(error = 'Er ging iets mis...') {
    console.log("ERROR: ", error)
    return {
        type: SHOW_ERROR,
        error
    }
}

/**
 * Remove error
 * @returns {{type: string}}
 */
function removeError() {
    return {
        type: REMOVE_ERROR
    }
}

/**
 * Stores location breweryData of search query
 * @param results
 * @returns {{type: string, results: *}}
 */
function storeSearchQueryLocationData(data) {
    return {
        type: STORE_SEARCH_QUERY_LOCATION_DATA,
        locationData: data
    }
}

/**
 * Stores search query string
 * @param query
 * @returns {{type: string, query: *}}
 */
function storeSearchQuery(query) {
    return {
        type: STORE_SEARCH_QUERY,
        query
    }
}

/**
 * Store the user location
 * @param locationData
 * @returns {{type: string, locationData: *}}
 */
function storeUserLocation(locationData) {
    return {
        type: STORE_USER_LOCATION,
        locationData
    }
}

/**
 * Store the search results
 * @param results
 * @returns {{type: string, results: *}}
 */
function storeSearchResults(results) {
    return {
        type: STORE_SEARCH_RESULTS,
        results
    }
}

/**
 * Store breweries
 * @param breweries
 * @returns {{type: string, breweries: *}}
 */
function storeBreweries(breweries) {
    return {
        type: STORE_BREWERIES,
        breweries
    }
}

/**
 * Sorts locations by distance, ascending
 * @param locations
 * @returns {*|void}
 */
function sortLocationsByDistance(locations) {
    return locations.sort((a, b) => {
        const distance1 = a.distanceData.distance.value;
        const distance2 = b.distanceData.distance.value;
        return distance1 > distance2 ? 1 : -1;
    });
}

/**
 * Get GPS position
 * @param options
 * @returns {Promise<any>}
 */
function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}


// Exportable Actions
// ==============================================

/**
 * Get location data per brewery and store brewery data with new location info
 * Called on application start
 * @returns {Function}
 */
export const appendLocationDataToBreweries = () => async dispatch => {
    const hasApiKey = APIController.checkApiKey();
    console.log(hasApiKey)
    if (hasApiKey) {
        try {
            dispatch(toggleLoadingState(true));
            const data = DataController.getAllBreweries();
            const locationData = data.map(async brewery => {
                return APIController.getGeolocationData(brewery.address)
                    .then(geodata => {
                        brewery.coords = geodata.data.results[0].geometry.location;
                        return brewery;
                    })
            });
            Promise.all(locationData)
                .then(results => {
                    dispatch(toggleLoadingState(false));
                    dispatch(storeBreweries(results));
                })
        } catch (error) {
            dispatch(showError())
        }
    } else {
        dispatch(showError('Geen API key aanwezig in .env'))
    }

};

/**
 * Main search function
 * @param query
 * @returns {Function}
 */
export const searchBreweriesByQuery = query => (dispatch, getState) => {
    dispatch(removeError());
    dispatch(toggleLoadingState(true));
    dispatch(storeSearchQuery(query));
    try {
        const getGeodataForQuery = APIController.getGeolocationData(query);
        getGeodataForQuery.then(response => {
            console.log(response.data.results)
            if (response.data.results[0] && response.data.results.length > 0) {
                const breweryData = getState().breweries;
                const queryLocation = response.data.results[0];
                dispatch(storeSearchQueryLocationData(queryLocation));

                const appendDistanceData = breweryData.map(async brewery => {
                    const locationString = `${brewery.coords.lat}, ${brewery.coords.lng}`;
                    return APIController.getDistanceData(queryLocation.formatted_address, locationString)
                        .then(distanceData => {
                            brewery.distanceData = distanceData.data.rows[0].elements[0];
                            return brewery;
                        })
                });

                Promise.all(appendDistanceData)
                    .then(results => {
                        const sortedResults = sortLocationsByDistance(results);
                        dispatch(storeSearchResults(sortedResults));
                        dispatch(toggleLoadingState(false))
                    })
            } else {
                dispatch(toggleLoadingState(false));
                dispatch(showError('Geen locatiegegevens gevonden voor het opgegeven adres.'))
            }
        });
    } catch (error) {
        dispatch(showError());
    }
};

/**
 * Search breweries by user geolocation
 * @returns {Function}
 */
export const searchBreweriesByUserLocation = () => async (dispatch, getState) => {
    dispatch(toggleLoadingState(true));
    try {
        const getUserLocation = await getCurrentPosition();
        const { latitude, longitude } = getUserLocation.coords;
        const getUserAddress = await APIController.getAddressByCoords({
            lat: latitude,
            lng: longitude
        });
        const address = getUserAddress.data.results[0].formatted_address;
        dispatch(storeUserLocation({
            lat: latitude,
            lng: longitude,
            address: address
        }));
        const breweryData = getState().breweries;
        const appendDistanceData = breweryData.map(async brewery => {
            const locationString = `${brewery.coords.lat}, ${brewery.coords.lng}`;
            return APIController.getDistanceData(`${latitude},${longitude}`, locationString)
                .then(distanceData => {
                    brewery.distanceData = distanceData.data.rows[0].elements[0];
                    return brewery;
                })
        });

        Promise.all(appendDistanceData)
            .then(results => {
                const sortedResults = sortLocationsByDistance(results);
                dispatch(storeSearchResults(sortedResults));
                dispatch(toggleLoadingState(false))
            })
    } catch (error) {
        dispatch(toggleLoadingState(false));
        dispatch(showError())
    }
};


