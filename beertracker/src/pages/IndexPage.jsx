import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    appendLocationDataToBreweries,
    searchBreweriesByQuery,
    searchBreweriesByUserLocation
} from "../store/actions/appActions";
import SearchResults from "../components/SearchResults";
import {Container, Section} from 'bloomer';
import ErrorMessage from "../components/ErrorMessage";
import {HeroBlock} from "./HeroBlock";

class IndexPage extends Component {
    componentDidMount() {
        this.props.appendLocationDataToBreweries();
    }

    onSearchInputChange = queryData => {
        this.props.searchBreweriesByQuery(queryData);
    };

    onLocationButtonClick = () => {
        this.props.searchBreweriesByUserLocation();
    };

    render() {
        const {searchResults, isLoading, error, userLocation} = this.props.store;
        const hasResults = searchResults && searchResults.length > 0;
        const hasError = error.show;
        const hasLocation = window.navigator.geolocation;
        return (
            <main>
                <HeroBlock
                    loading={isLoading}
                    onChange={this.onSearchInputChange}
                    hasLocation={hasLocation}
                    onClick={this.onLocationButtonClick}/>
                <Section>
                    <Container>
                        {isLoading && !hasError &&
                            <Section>
                                <h3 className="pre-results-msg">Momentje...</h3>
                            </Section>}
                        {!hasResults && !isLoading && !hasError &&
                            <Section>
                                <h3 className="pre-results-msg">Vul een postcode in om resultaten te tonen.</h3>
                            </Section>}
                        {!isLoading && !hasError && hasResults &&
                            <SearchResults userLocation={userLocation} results={searchResults}/>}
                        {hasError &&
                            <ErrorMessage title={error.title} message={error.message}/>}
                    </Container>
                </Section>
            </main>
        );
    };
}

const mapStateToProps = state => {
    return {
        store: {
            isLoading: state.isLoading,
            error: state.error,
            searchResults: state.searchResults,
            userLocation: state.userLocationData
        }
    };
};

const actions = {
    appendLocationDataToBreweries,
    searchBreweriesByQuery,
    searchBreweriesByUserLocation,
};

export default connect(
    mapStateToProps,
    actions
)(IndexPage);

