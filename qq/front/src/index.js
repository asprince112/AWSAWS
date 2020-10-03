import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'css/app.scss';
import 'css/style.scss';

import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from 'App';
import thunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import cartReducer from "./store/reducers/cart";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
	<div >
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
		<Provider store={store}>
			<App />
		</Provider>
	</div>
)
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();