import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Card, CardContent, Content, Title, Subtitle } from 'bloomer';

class BreweryItem extends Component {
    render() {
        const { data, userLocation } = this.props;
        const mapsUrl = `https://maps.google.com/?daddr=${data.address},${data.zipcode},${data.city}&saddr=${userLocation.lat},${userLocation.lng}`;
        return (
            <Card>
                <CardContent>
                    <Content>
                        <Title isSize={4}>{data.name}</Title>
                        <Subtitle isSize={6}>{data.address}, {data.zipcode} {data.city}</Subtitle>
                        <span className="meta"><Icon icon="map-marked-alt"/> {data.distanceData.distance.text}</span><br/>
                        <span className="meta"><Icon icon="car"/> {data.distanceData.duration.text}</span><br/>
                        <a className="maps-link" target="_blank" rel="noopener noreferrer" href={mapsUrl}>Breng mij er heen <Icon icon="car-side"/></a>
                    </Content>
                </CardContent>
            </Card>
        );
    }
}

BreweryItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default BreweryItem;
