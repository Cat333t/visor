import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ErrorProvider } from './context/Error';
import { AuthProvider } from './context/Auth';
import { LoadingProvider } from './context/Loading';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <ErrorProvider>
//         <LoadingProvider>
//         <AuthProvider>
//             <BrowserRouter>
//                 <App />
//             </BrowserRouter>
//         </AuthProvider>
//         </LoadingProvider>
//         </ErrorProvider>
//     </React.StrictMode>
// );

if (typeof window !== 'undefined') {
    ReactDOM.hydrateRoot(
        document.getElementById('root'),
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default App;