import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { authAxios } from "utils";
import { getCartAmount } from "store/actions/cart";
import { getUserInfo } from "store/actions/auth";
import ToolBox from "components/ToolBox";
import Product from "components/Product";
import Panel from "components/Panel";
import AddInventory from "components/AddInventory";
import { connect } from "react-redux";

class Products extends React.Component {
  
  state = {
    products: [],
    sourceProducts: [],
    cartNum: 0,
    userIsManager: false,
    isLogout: true
  }

  componentDidMount() {
    authAxios.get('/').then(response => {
      this.setState({
        products: response.data,
        sourceProducts: response.data
      });
    });
    this.updateCartNum()
    this.updateUserInfo()
  }

  // 搜尋功能
  search = text => {
    //copy products list
    let _products = [...this.state.sourceProducts]

    //filter list
    _products = _products.filter(p => {
      const matchArray = p.name.match(new RegExp(text, 'gi'))
      return !!matchArray
    })

    //set State
    this.setState({
      products: _products
    })
  }

  toAdd = () => {
    Panel.open({
      component: AddInventory,
      callback: data => {
        if (data) {
          this.add(data);
        }
      }
    });
  }

  add = (product_data) => {
    const _products = [...this.state.products];
    _products.push(product_data);
    const _sourceProducts = [...this.state.sourceProducts];
    _sourceProducts.push(product_data);

    this.setState({
      products: _products,
      sourceProducts: _sourceProducts
    })
  }

  update = (product_data) => {
    const _products = [...this.state.products];
    const _index = _products.findIndex(p => p.id === product_data.id);
    _products.splice( _index, 1, product_data);
    const _sourceProducts = [...this.state.sourceProducts];
    const _sourceIndex = _sourceProducts.findIndex(p => p.id === product_data.id);
    _sourceProducts.splice( _sourceIndex, 1, product_data);

    this.setState({
      products: _products,
      sourceProducts: _sourceProducts
    })
  }

  delete = (id) => {
    const _products = this.state.products.filter(p => p.id !== id);
    const _sourceProducts = this.state.sourceProducts.filter(p => p.id !== id);

    this.setState({
      products: _products,
      sourceProducts: _sourceProducts
    })
  }

  updateCartNum = async () => {
    const cartNum = await this.initCartNum();
    this.setState({
      cartNum: cartNum
    })
  }

  initCartNum = async () => {
    const res = 
      await getCartAmount()
    const data = res.amount
    return data
  }

  updateUserInfo = async () => {
    const user = await this.initUserInfo();
    const userType = user.usertype
    if (userType === 'manager') {
      this.setState({
        userIsManager: true
      })
    } else {
      this.setState({
        userIsManager: false
      })
    }
  }

  initUserInfo = async () => {
      const res = 
          await getUserInfo();
      const data = res.data
      return data
  }

  logoutRefresh = () => {
    this.updateUserInfo()
    this.updateCartNum()
    this.setState({
      isLogout: false
    })
  }


  render() {

    if (!this.props.isAuthenticated && this.state.isLogout) {
      this.logoutRefresh()
    }

    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum} updateCartNum={this.updateCartNum} />
        <div className="products">
          <div className="columns is-multiline isdesktop">
            <TransitionGroup component={null}>
              {
                this.state.products.map(p => {
                  return (
                    <CSSTransition classNames="product-fade" timeout={300} key={p.id}>
                      <div className="column is-3" key={p.id}>
                        <Product product={p} update={this.update} delete={this.delete} updateCartNum={this.updateCartNum} userIsManager={this.state.userIsManager} />
                      </div>
                    </CSSTransition>
                  )
                })
              }
            </TransitionGroup>
          </div>
          {
            ((this.state.userIsManager) && (
              <button className="button is-primary add-btn" onClick={this.toAdd}>Add</button>
            ))
          }
        </div>
      </div>
		);
	}
}

const mapStateToProps = state => {
	return {
    isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Products);