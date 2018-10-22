import React from 'react';
import PropTypes from 'prop-types';
import BreweryItem from "./BreweryItem";
import { Section, Title, Subtitle } from 'bloomer';

function SearchResults(props) {
    const { results, userLocation } = props;
    const closestResult = <BreweryItem key={results[0].name} userLocation={userLocation} data={results[0]}/>;
    const otherResults = results.map((result, index) => {
        return index !== 0 && <BreweryItem key={result.name} userLocation={userLocation} data={result}/>
    });
    return (
        <div className='search-results'>
            <Section>
                <Subtitle>
                    <strong>Jouw (geschatte) locatie:</strong> {userLocation.address};
                </Subtitle>
                <Title isSize={3}>Dichtstbijzijnde Brouwerij:</Title>
                {closestResult}
            </Section>
            <Section>
                <Title isSize={5}>Andere locaties:</Title>
                {otherResults}
            </Section>

        </div>
    );
}

SearchResults.defaultProps = {
    results: [],
};

SearchResults.propTypes = {
    results: PropTypes.array.isRequired,
};

export default SearchResults;
