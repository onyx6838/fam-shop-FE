import React from 'react'

const FilterBarItem = ({ info, childFilter, onChangeId }) => {

    return (
        <div className="left-side py-2">
            <h3 className="agileits-sear-head mb-3">{info}</h3>
            <ul>
                {
                    childFilter.map((item) => (
                        <li key={item.maDacTrung}>
                            <input type="checkbox" className="checked" id={item.maDacTrung} onChange={onChangeId}/>
                            <span className="span">{item.ten}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FilterBarItem