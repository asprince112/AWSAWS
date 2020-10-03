import { PRODUCT_START, PRODUCT_SUCCESS, PRODUCT_FAIL } from "store/actions/actionTypes";
import { updateObject } from "store/utility";

const initialState = {
    product: null,
    error: null,
    loading: false
  };
  
  const productStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
  
  const productSuccess = (state, action) => {
    return updateObject(state, {
      product: action.data,
      error: null,
      loading: false
    });
  };
  
  const productFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case PRODUCT_START:
        return productStart(state, action);
      case PRODUCT_SUCCESS:
        return productSuccess(state, action);
      case PRODUCT_FAIL:
        return productFail(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;
  