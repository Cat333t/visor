import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../context/Auth"

export default function Profile() {
    const { isAuthenticated, user, sign_out } = useAuth();

    const handleUpdate = (e) => {
        e.preventDefault();

        // TODO
    }

    return (
        <>
            <h1>Profile</h1>
            <div>
                <form onSubmit={handleUpdate}>
                    <div className="input">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" defaultValue={user.username} />
                        <p>Your name may appear around Visor where you contribute. You can change it at any time.</p>
                    </div>
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" defaultValue={user.email} />
                        <p>Your email is used to verify your account. Email is not public and not visible to others. You can change it at any time.</p>
                    </div>

                    <div className="avatar">
                        {isAuthenticated === null ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                            isAuthenticated && (
                                <>
                                    <img src={user.picture} />
                                    <button><FontAwesomeIcon icon={faPencil} /> Edit</button>
                                </>
                            )
                        )}
                    </div>

                    <button type="submit">Update</button>
                </form>
            </div>

            <button type="button" onClick={sign_out}>Sign Out</button>
        </>
    );
}
