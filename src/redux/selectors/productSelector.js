import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const productSelector = (state) => state.product;

const selectProductSelector =
    createSelector(productSelector, state => state.products);

const selectSizeSelector =
    createSelector(productSelector, state => state.size);

const selectPageSelector =
    createSelector(productSelector, state => state.page);

const selectTotalPagesSelector =
    createSelector(productSelector, state => state.totalPages);

const selectTotalElementsSelector =
    createSelector(productSelector, state => state.totalElements);

const selectCategorySelector =
    createSelector(productSelector, state => state.category);

const selectSelectedFiltersSelector =
    createSelector(productSelector, state => state.selectedFilters);

/** function **/
export const selectProducts = (state) => {
    return selectProductSelector(state);
}

export const selectSize = (state) => {
    return selectSizeSelector(state);
}

export const selectPage = (state) => {
    return selectPageSelector(state);
}

export const selectTotalPages = (state) => {
    return selectTotalPagesSelector(state);
}

export const selectTotalElements = (state) => {
    return selectTotalElementsSelector(state);
}

export const selectCategory = (state) => {
    return selectCategorySelector(state);
}

export const selectSelectedFilters = (state) => {
    return selectSelectedFiltersSelector(state);
}