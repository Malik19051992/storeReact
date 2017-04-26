import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import createStore from './redux';
const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <Router basename="/">
            <div>
                <App />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

