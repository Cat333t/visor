import React from "react";

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Login.css';

export default function Login() {
    return (
        <div className="App-Login">
            <Header />

            <div className="container">
                <h1>Login</h1>

                <form action="/api/login" method="POST">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>

            <Footer />
        </div>
    );
}
