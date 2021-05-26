/**
 * The Initial React Setup file
 * ...
 *
 * === CSS
 * The stylesheets are handled seperately using the gulp sass rather than importing them directly into React.
 * You can find these in the ./app/sass/ folder
 *
 * == JS
 * All files in here start from this init point for the React Components.
 *
 *
 * Firstly we need to import the React JS Library
 */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// components
import Menu from './components/menu';
import Home from './components/home';

// constants
import { API_ENDPOINT, PRODUCTS_ROUTE } from './contants';

/**
 * We can start our initial App here in the main.js file
 */
const App = () => {
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // I would normally extract this logic to a service or utility function
        axios
            .get(`${API_ENDPOINT}${PRODUCTS_ROUTE}?name=${searchValue}`)
            .then(function ({ data, status }) {
                if (status === 200) {
                    setProducts(data);
                } else {
                    console.warn('Error fetching products.');
                }
            })
            .catch(function (error) {
                // handle error
                console.error(error);
            });
    }, [searchValue]);

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     *
     * @returns JSX
     * @memberof App
     */
    return (
        <div className="App">
            <Menu onSearchUpdate={setSearchValue} />
            <Home products={products} />
        </div>
    );
};

// Render this out
ReactDOM.render(<App />, document.getElementById('root'));
