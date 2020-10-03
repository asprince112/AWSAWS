import React from 'react'
import { Route } from 'react-router-dom';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Cart from 'pages/Cart';
import Register from 'pages/Register';
import Products from 'components/Products';
import Hoc from './hoc/hoc';

class Router extends React.Component {

    render() {
        return (
            <Hoc>
                <Route exact path="/" component={Products} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/cart" component={Cart} />
                <Route path="/not-found" component={NotFound} />
            </Hoc>
        )
    }
}

export default Router;