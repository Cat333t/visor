import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Notifications() {
    return (
        <div>
            <h1>Notifications</h1>
            <p><FontAwesomeIcon icon={faSpinner} spin /> It is a work in progress. Check back later.</p>
        </div>
    );
}
