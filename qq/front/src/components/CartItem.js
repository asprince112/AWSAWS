import React, { useState, useMemo } from "react";
import { formatPrice } from "commons/currency";
import { deleteFromCart, updateCartQuantity } from "store/actions/cart";

const CartItem = (props) => {
	const { id, name, image, price } = props.cart || {};
	const [ quantity, setQuantity ] = useState(props.cart.quantity);

	const sumPrice = useMemo(() => {
		return formatPrice(quantity * parseInt(price))
	}, [quantity, price])
	

	const handleChange = (e) => {
		const _quantity = parseInt(e.target.value);
		setQuantity(_quantity);
		const newCart = {
			...props.cart,
			quantity: _quantity
		}
		const res = updateCartQuantity(id, _quantity)
		res.then(() => {
			props.updateCart(newCart);
		})
	}

	const deleteCart = () => {
		const res = deleteFromCart(id)
		res.then(() => {
			props.deleteCart(props.cart)
		})
	}

	return (
		<div className="columns is-vcentered">
			<div className="column is-narrow">
				<span className="close" onClick={deleteCart}>x</span>
			</div>
			<div className="column is-narrow">
				<img src={image} alt={name} width="100" />
			</div>
			<div className="column cart-name is-narrow">{name}</div>
			<div className="column">
				<span className="price">{formatPrice(price)}</span>
			</div>
			<div className="column">
				<input type="number" className="input num-input" min="1" value={quantity} onChange={handleChange} />
			</div>
			<div className="column">
				<span className="sum-price">{sumPrice}</span>
			</div>
		</div>
	);
};

export default CartItem;