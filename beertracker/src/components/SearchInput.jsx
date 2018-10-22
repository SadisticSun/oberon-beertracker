import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Field, Label, Control } from 'bloomer';

class SearchInput extends Component {
    onInputChange = (event) => {
        const { value } = event.currentTarget;
        // Check if a valid Dutch zipcode has been entered, based on input pattern attribute
        const isValid = event.currentTarget.checkValidity()
        value.length > 4 && isValid && this.props.onChange(value);
    };

    render() {
        return (
            <Field>
                <Label>Zoek op postcode</Label>
                <Control isLoading={this.props.isLoading}>
                    <input autoFocus
                           required
                           pattern="[1-9][0-9]{3}\s?[a-zA-Z]{2}"
                           className="search-input"
                           type="search"
                           placeholder='bijv. 1234 AB'
                           onChange={this.onInputChange}/>
                </Control>
            </Field>
        );
    };
}

SearchInput.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SearchInput
