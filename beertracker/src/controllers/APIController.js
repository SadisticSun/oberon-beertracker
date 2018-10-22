import axios from 'axios';

class APIController {
    constructor() {
        this._distanceMatrixApiBaseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?";
        this._geolocationApiBaseUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
        this._geolocationApiKey = process.env.REACT_APP_GEOLOCATION_API_KEY;
    }

    /**
     * Check if API key is not undefined
     * @returns {boolean}
     */
    checkApiKey(){
        return this._geolocationApiKey !== undefined;
    }

    /**
     * Returns Geolocationn url with address parameters
     * @param params
     * @returns {string}
     */
    getCombinedGeolocationUrlWithAddressParams(params) {
        const formattedParamString = Object.entries(params).map(([ key, val ]) => `${key}=${val}`).join('+');
        return `${this._geolocationApiBaseUrl}${formattedParamString}&region=nl&key=${this._geolocationApiKey}`;
    }

    /**
     * Returns Geolocation data for address
     * @param address
     * @returns {AxiosPromise<any>}
     */
    getGeolocationData(address) {
        const parsedAddress = address.split(' ').join('+');
        const url = this.getCombinedGeolocationUrlWithAddressParams({ address: parsedAddress });
        return axios.get(url);
    }

    /**
     * Returns address data for coords
     * @param coords
     * @returns {AxiosPromise<any>}
     */
    getAddressByCoords(coords) {
        const { lat, lng } = coords;
        const url = `${this._geolocationApiBaseUrl}latlng=${lat},${lng}&key=${this._geolocationApiKey}`;
        return axios.get(url);
    }

    /**
     * Returns distance data
     * @param origin
     * @param destination
     * @returns {AxiosPromise<any>}
     */
    getDistanceData(origin, destination) {
        const parsedOrigin = origin.split(' ').join('+');
        const url = `${this._distanceMatrixApiBaseUrl}origins=${parsedOrigin}&destinations=${destination}&key=${this._geolocationApiKey}`;
        return axios.get(url);
    }
}

export default new APIController();
