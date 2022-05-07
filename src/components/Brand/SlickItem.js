import React from 'react'
import styled from 'styled-components';

import tb1 from '../../assets/images/tb5.png'

const ImgItem = styled.div`
        border : ${({ choose }) => choose ? `2px solid #292560` : `2px solid white`}
`;

const SlickItem = ({ info, changeBrandClick, choose }) => {
    const style = {
        width: '100%',
        height: '85px',
        cursor: 'pointer'
    }

    return (
        <ImgItem className='card' choose={choose} style={{ width : "250px"}}>
            <img style={style}
                className="card-img-top"
                // src={info.hinhAnh ? `http://127.0.0.1:8887/${info.hinhAnh}` : tb1}
                src={info.hinhAnh}
                alt=""
                onClick={changeBrandClick} />
        </ImgItem>
    )
}

export default SlickItem