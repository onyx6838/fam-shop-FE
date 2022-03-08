import React from 'react'
import { useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/store/cart';

const CartItem = ({ info, i }) => {
    const dispatch = useDispatch();

    return (
        <tr className={`rem` + i} key={info.maSP}>
            <td className="invert">{i}</td>
            <td className="invert-image">
                <a href="single.html">
                    <img src={info && `http://127.0.0.1:8887/${info.hinhAnh}`} alt=" " className="img-responsive" />
                </a>
            </td>
            <td className="invert">
                <div className="quantity">
                    <div className="quantity-select">
                        <div className="entry value-minus" onClick={() => dispatch(decreaseQuantity(info))}>&nbsp;</div>
                        <div className="entry value">
                            <span>{info.qty}</span>
                        </div>
                        <div className="entry value-plus" onClick={() => dispatch(increaseQuantity(info))}>&nbsp;</div>
                    </div>
                </div>
            </td>
            <td className="invert">{info.ten}</td>
            <td className="invert">{info.qty * info.donGiaBan}đ</td>
            <td className="invert">
                <div className="rem">
                    <div className="close1" onClick={() => dispatch(removeFromCart(info))}> </div>
                </div>
            </td>
        </tr>
    )
}

export default CartItem