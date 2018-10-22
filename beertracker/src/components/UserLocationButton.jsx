import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'bloomer';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const UserLocationButton = props => {
    return (
        <Button isColor="primary" isLoading={props.isLoading} onClick={props.onClick} className="location-btn">
            <span className="btn-label">Gebruik GPS</span>
            <Icon icon="location-arrow"/>
        </Button>
    );
};

UserLocationButton.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default UserLocationButton;
