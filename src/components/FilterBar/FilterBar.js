import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'

import FilterBarItem from './FilterBarItem'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProductFeatures, fetchProductsFilter } from '../../redux/store/product'
import { selectCategory, selectSelectedFilters, selectSize } from '../../redux/selectors/productSelector'

const FilterBar = () => {
    const dispatch = useDispatch();
    const dactrung = useSelector(state => state.product.filters)
    const size = useSelector(selectSize);
    const category = useSelector(selectCategory);
    const selectedFilters = useSelector(selectSelectedFilters);
    const categoryList = useSelector(state => state.product.categories)
    const search = useSelector(state => state.product.search)
    const brand = useSelector(state => state.product.brand)

    useEffect(() => {
        dispatch(fetchProductFeatures({
            categories: categoryList,
            category: category,
            listDacTrung: [],
            search : search
        }))
    }, [category, categoryList, dispatch, search])

    var keys = Object.keys(dactrung);

    const handleToggle = (e) => {
        const currentIndex = selectedFilters.indexOf(e.target.id);
        const newChecked = [...selectedFilters];

        if (currentIndex === -1) {
            newChecked.push(e.target.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        dispatch(fetchProductsFilter(
            {
                categories: categoryList,
                category: category,
                selectedFilters: newChecked,
                page: 1,
                size: size,
                search : search,
                brand: brand
            }))
    }

    const filterItems = keys.map((item) => (
        <FilterBarItem info={item} childFilter={dactrung[item]} key={item} onChangeId={handleToggle} />
    ))

    return (
        <Col lg={3} className="mt-lg-0 mt-4 p-lg-0 order-lg-first order-last">
            <div className="side-bar p-sm-4 p-3">
                {filterItems}
            </div>
        </Col>
    )
}

export default FilterBar