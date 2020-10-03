import React from "react";
import { toast } from "react-toastify";
import { updateProduct, deleteProduct } from "store/actions/product";

class EditInventory extends React.Component {

	state = {
		id: '',
		name: '',
		price: '',
		tags: '',
		image: '',
		status: 'available'
	}

	componentDidMount() {
		const { id, name, image, tags, price, status } = this.props.product;
		this.setState({
			id: id,
			name: name,
			image: image,
			tags: tags,
			price: price,
			status: status
		})
	}

	handleChange = e => {
		const value = e.target.value;
		const name = e.target.name;
		this.setState({
			[name]: value
		})
	}

	submit = (e) => {
		e.preventDefault();
		const product = {...this.state};
		if (product.name !== "" && product.price !== "" && product.tags !== "" && product.image !== "") {
			const res = updateProduct(this.state.id, product)
			res.then(res => {
				this.props.close(res.data);
				toast.success('Successful edit item');
			})
		} else {
			toast.warning('Please fill all data');
		}
	}

	onDelete = () => {
		const res = deleteProduct(this.state.id)
		res.then(res => {
			this.props.deleteProduct(this.state.id);
			this.props.close();
			toast.success('Item deleted');
		})
	}

	render() {
		return (
			<div className="inventory">
				<p className="title has-text-centered">Inventory</p>
				<form onSubmit={this.submit}>
					<div className="field">
						<label className="label">Message</label>
						<div className="control">
							<textarea className="textarea" name="name" value={this.state.name} onChange={this.handleChange}></textarea>
						</div>
					</div>
					<div className="field">
						<label className="label">Price</label>
						<div className="control">
							<input className="input" type="number" name="price" value={this.state.price} onChange={this.handleChange} />
						</div>
					</div>
					<div className="field">
						<label className="label">Tags</label>
						<div className="control">
							<input className="input" type="text" name="tags" value={this.state.tags} onChange={this.handleChange} />
						</div>
					</div>
					<div className="field">
						<label className="label">Image</label>
						<div className="control">
							<input className="input" type="text" name="image" value={this.state.image} onChange={this.handleChange} />
						</div>
					</div>
					<div className="field">
						<div className="control">
							<label className="label">Status</label>
							<div className="select is-fullwidth">
								<select name="status" value={this.state.status} onChange={this.handleChange}>
									<option>available</option>
									<option>unavailable</option>
								</select>
							</div>
						</div>
					</div>
					<br/>
					<div className="field is-grouped is-grouped-centered">
						<div className="control">
							<button className="button is-link">Submit</button>
						</div>
						<div className="control">
							<button className="button is-danger" type="button" onClick={this.onDelete}>Delete</button>
						</div>
						<div className="control">
							<button className="button" type="button" onClick={() => {this.props.close()}}>Cancel</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default EditInventory
