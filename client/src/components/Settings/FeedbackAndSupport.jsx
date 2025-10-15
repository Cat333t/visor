import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function FeedbackAndSupport() { // TODO
    return (
        <div>
            <h1>Feedback and Support</h1>
            <p><FontAwesomeIcon icon={faSpinner} spin /> It is a work in progress. Check back later.</p>
        </div>
    );
}
