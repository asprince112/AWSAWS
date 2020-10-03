import React from "react";
import { withRouter } from "react-router-dom"
import Panel from "components/Panel";
import {formatPrice} from "commons/currency";
import EditInventory from "components/EditInventroy";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "store/actions/cart";

class Product extends React.Component {

  toEdit = () => {
    Panel.open({
      component: EditInventory,
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete
      },
      callback: data => {
        if (data) {
          this.props.update(data);
        }
      }
    })
  }

  // 異步函數 async
  addCart = async () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
      toast.info('Please Login First');
      return;
    }
    const { id } = this.props.product
    try {
      const res = addToCart(id)
      res.then(() => {
        toast.success('Item added to cart');
        this.props.updateCartNum();
      })
    } catch (error) {
      toast.error('Item add failed');
    }
  }

  render() {
    const { name, image, tags, price, status } = this.props.product;
    const _pClass = {
      available: 'product',
      unavailable: 'product out-stock'
    }
    return (
      <div className={_pClass[status]}>
        {(this.props.userIsManager) && (
          <div className="p-head has-text-right">
            <span className="icon edit-btn" onClick={this.toEdit}>
              <i className="fas fa-sliders-h"></i>
            </span>
          </div>
        )
        }
        <div className="p-content">
          <div className="img-wrapper">
            <div className="out-stock-text">Out Of Stock</div>
            <figure className="image is4by3">
              <img src={image} alt={name} />
            </figure>            
          </div>
          <p className="p-tags">{tags}</p>
          <p className="p-name">{name}</p>
        </div>
        <div className="p-footer">
          <p className="price">{formatPrice(price)}</p>
          <button className="add-cart" disabled={status === 'unavailable'} onClick={this.addCart}>
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter(connect(mapStateToProps)(Product));