import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  total: 0,
  count: 0,
  loading: false,
  error: null
};

// Action types
const CART_ACTIONS = {
  LOAD_CART_START: 'LOAD_CART_START',
  LOAD_CART_SUCCESS: 'LOAD_CART_SUCCESS',
  LOAD_CART_FAILURE: 'LOAD_CART_FAILURE',
  ADD_TO_CART_START: 'ADD_TO_CART_START',
  ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAILURE: 'ADD_TO_CART_FAILURE',
  UPDATE_CART_ITEM_START: 'UPDATE_CART_ITEM_START',
  UPDATE_CART_ITEM_SUCCESS: 'UPDATE_CART_ITEM_SUCCESS',
  UPDATE_CART_ITEM_FAILURE: 'UPDATE_CART_ITEM_FAILURE',
  REMOVE_FROM_CART_START: 'REMOVE_FROM_CART_START',
  REMOVE_FROM_CART_SUCCESS: 'REMOVE_FROM_CART_SUCCESS',
  REMOVE_FROM_CART_FAILURE: 'REMOVE_FROM_CART_FAILURE',
  CLEAR_CART_START: 'CLEAR_CART_START',
  CLEAR_CART_SUCCESS: 'CLEAR_CART_SUCCESS',
  CLEAR_CART_FAILURE: 'CLEAR_CART_FAILURE',
  CALCULATE_TOTAL: 'CALCULATE_TOTAL',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART_START:
    case CART_ACTIONS.ADD_TO_CART_START:
    case CART_ACTIONS.UPDATE_CART_ITEM_START:
    case CART_ACTIONS.REMOVE_FROM_CART_START:
    case CART_ACTIONS.CLEAR_CART_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case CART_ACTIONS.LOAD_CART_SUCCESS:
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        count: action.payload.count || 0,
        loading: false,
        error: null
      };
    
    case CART_ACTIONS.ADD_TO_CART_SUCCESS:
    case CART_ACTIONS.UPDATE_CART_ITEM_SUCCESS:
    case CART_ACTIONS.REMOVE_FROM_CART_SUCCESS:
    case CART_ACTIONS.CLEAR_CART_SUCCESS:
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        count: action.payload.count || 0,
        loading: false,
        error: null
      };
    
    case CART_ACTIONS.LOAD_CART_FAILURE:
    case CART_ACTIONS.ADD_TO_CART_FAILURE:
    case CART_ACTIONS.UPDATE_CART_ITEM_FAILURE:
    case CART_ACTIONS.REMOVE_FROM_CART_FAILURE:
    case CART_ACTIONS.CLEAR_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case CART_ACTIONS.CALCULATE_TOTAL:
      const total = state.items.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
      }, 0);
      const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
      return {
        ...state,
        total,
        count
      };
    
    case CART_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      dispatch({ type: CART_ACTIONS.CLEAR_CART_SUCCESS, payload: { items: [], total: 0, count: 0 } });
    }
  }, [isAuthenticated]);

  // Load cart function
  const loadCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.LOAD_CART_START });
      
      const response = await axios.get(`${API_BASE_URL}/cart`);
      
      dispatch({
        type: CART_ACTIONS.LOAD_CART_SUCCESS,
        payload: response.data.data.cart
      });
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.LOAD_CART_FAILURE,
        payload: error.response?.data?.error || 'Failed to load cart'
      });
    }
  };

  // Add to cart function
  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.ADD_TO_CART_START });
      
      const response = await axios.post(`${API_BASE_URL}/cart/items`, {
        productId,
        quantity
      });
      
      dispatch({
        type: CART_ACTIONS.ADD_TO_CART_SUCCESS,
        payload: response.data.data.cart
      });
      
      toast.success('Item added to cart!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add item to cart';
      dispatch({
        type: CART_ACTIONS.ADD_TO_CART_FAILURE,
        payload: errorMessage
      });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update cart item function
  const updateCartItem = async (productId, quantity) => {
    try {
      dispatch({ type: CART_ACTIONS.UPDATE_CART_ITEM_START });
      
      const response = await axios.put(`${API_BASE_URL}/cart/items/${productId}`, {
        quantity
      });
      
      dispatch({
        type: CART_ACTIONS.UPDATE_CART_ITEM_SUCCESS,
        payload: response.data.data.cart
      });
      
      toast.success('Cart updated!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to update cart item';
      dispatch({
        type: CART_ACTIONS.UPDATE_CART_ITEM_FAILURE,
        payload: errorMessage
      });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Remove from cart function
  const removeFromCart = async (productId) => {
    try {
      dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART_START });
      
      const response = await axios.delete(`${API_BASE_URL}/cart/items/${productId}`);
      
      dispatch({
        type: CART_ACTIONS.REMOVE_FROM_CART_SUCCESS,
        payload: response.data.data.cart
      });
      
      toast.success('Item removed from cart!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to remove item from cart';
      dispatch({
        type: CART_ACTIONS.REMOVE_FROM_CART_FAILURE,
        payload: errorMessage
      });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Clear cart function
  const clearCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.CLEAR_CART_START });
      
      const response = await axios.delete(`${API_BASE_URL}/cart`);
      
      dispatch({
        type: CART_ACTIONS.CLEAR_CART_SUCCESS,
        payload: response.data.data.cart
      });
      
      toast.success('Cart cleared!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to clear cart';
      dispatch({
        type: CART_ACTIONS.CLEAR_CART_FAILURE,
        payload: errorMessage
      });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Get cart count function
  const getCartCount = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart/count`);
      return response.data.data.count;
    } catch (error) {
      console.error('Failed to get cart count:', error);
      return 0;
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartCount,
    clearError,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
