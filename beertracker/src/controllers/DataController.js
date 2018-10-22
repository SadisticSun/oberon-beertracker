import breweryData from '../data/breweries'

class DataController {
    constructor() {
        this.breweryData = breweryData.breweries;
    };

    /**
     * Return all brewery data
     * @returns Array
     */
    getAllBreweries = () => {
      return this.breweryData;
    };
}

export default new DataController();
