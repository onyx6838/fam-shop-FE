import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'

import FilterBarItem from './FilterBarItem'

import DacTrungApi from '../../api/DacTrungApi'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsFilter } from '../../redux/store/product'
import { selectCategory, selectSelectedFilters, selectSize } from '../../redux/selectors/productSelector'

const FilterBar = () => {
    const dispatch = useDispatch();
    const [dactrung, setDacTrungs] = useState({});
    const size = useSelector(selectSize);
    const category = useSelector(selectCategory);
    const selectedFilters = useSelector(selectSelectedFilters);

    useEffect(() => {
        const response = DacTrungApi.getAll();
        response.then(res => setDacTrungs(res));
    }, [])

    var keys = Object.keys(dactrung);

    const handleToggle = (e) => {
        const currentIndex = selectedFilters.indexOf(e.target.id);
        const newChecked = [...selectedFilters];

        if (currentIndex === -1) {
            newChecked.push(e.target.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        dispatch(fetchProductsFilter({ category: category, selectedFilters: newChecked, page: 1, size: size }))
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