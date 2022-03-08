import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'

import FilterBarItem from './FilterBarItem'

import DacTrungApi from '../../api/DacTrungApi'
import SanPhamApi from '../../api/SanPhamApi'

const FilterBar = () => {
    const [dactrung, setDacTrungs] = useState({});

    const [checked, setChecked] = useState([]);

    useEffect(() => {
        const response = DacTrungApi.getAll();
        response.then(res => setDacTrungs(res));
    }, [])

    var keys = Object.keys(dactrung);

    const handleToggle = (e) => {
        const currentIndex = checked.indexOf(e.target.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(e.target.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

        const response = SanPhamApi.getSanPhamByDacTrungs(checked)
        response.then(result => console.log(result))
    }

    const filterItems = keys.map((item) => (
        <FilterBarItem info={item} childFilter={dactrung[item]} key={item} onChangeId={handleToggle} />
    ))

    console.log(checked);

    return (
        <Col lg={3} className="mt-lg-0 mt-4 p-lg-0 order-lg-first order-last">
            <div className="side-bar p-sm-4 p-3">
                {filterItems}
            </div>
        </Col>
    )
}

export default FilterBar