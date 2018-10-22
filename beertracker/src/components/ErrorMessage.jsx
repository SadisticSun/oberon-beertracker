import React from 'react';
import PropTypes from 'prop-types';
import { Message, MessageBody } from 'bloomer';

function ErrorMessage(props) {
    const { message } = props;
    return (
        <Message isColor="danger">
            <MessageBody>
                <p>{message}</p>
            </MessageBody>
        </Message>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorMessage;
