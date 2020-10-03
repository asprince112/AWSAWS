import React, { useState, useEffect, useMemo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CartItem from "components/CartItem";
import { formatPrice } from "commons/currency";
import { connect } from "react-redux";
import { getCartInfo } from "store/actions/cart";

const Cart = (props) => {

	const [carts, setCarts] = useState([]);

	useEffect(() => {
		if (props.isAuthenticated) {
			getCartInfo()
			.then(res => {
				setCarts(res.data)
			})
		}	
	}, [props.isAuthenticated]);

	const totalPrice = useMemo(() => {
		const totalPrice = carts.map(cart => cart.quantity * parseInt(cart.price)).reduce((a, value) => a + value, 0);
		return formatPrice(totalPrice)
	}, [carts])

	const updateCart = (cart) => {
		const newCarts = [...carts];
		const _index = newCarts.findIndex(c => c.id === cart.id);
		newCarts.splice(_index, 1, cart);
		setCarts(newCarts);
	}

	const deleteCart = (cart) => {
		const _carts = carts.filter(c => c.id !== cart.id);
		setCarts(_carts);
	}
	

	return(
			<div className="cart-page">
				<span className="cart-title">Shopping Cart</span>
				<div className="cart-list">
					<div className="columns is-vcentered cart-info">
						<div className="column cart-info-name is-narrow">
							<span>Name</span>
						</div>
						<div className="column cart-info-other">
							<span>Price</span>
						</div>
						<div className="column cart-info-other">
							<span>Quantity</span>
						</div>
						<div className="column cart-info-other">
							<span>Total Price</span>
						</div>
					</div>
					<TransitionGroup component={null}>
						{carts.map(cart => (
							<CSSTransition className="cart-item" timeout={300} key={cart.id}>
								<CartItem key={cart.id} cart={cart} updateCart={updateCart} deleteCart={deleteCart} />
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				{
					carts.length === 0 ? <p className="no-cart">NO GOODS</p> : ''
				}
				<div className="cart-total">
					Total:
					<span className="total-price">{totalPrice}</span>
				</div>
			</div>
	)
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Cart);