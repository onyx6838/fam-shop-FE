import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const cartSelector = (state) => state.cart;

const selectProductSelector =
    createSelector(cartSelector, state => state.products);

const selectCartSelector =
    createSelector(cartSelector, state => state.cart);

const selectNumberCartSelector =
    createSelector(cartSelector, state => state.numberCart);

/** function **/
export const selectProduct = (state) => {
    return selectProductSelector(state);
}

export const selectCart = (state) => {
    return selectCartSelector(state);
}

export const selectNumberCart = (state) => {
    return selectNumberCartSelector(state);
}