import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantityToCart, decreaseQuantity, fetchCart, increaseQuantity, removeCart, removeFromCart } from '../../redux/store/cart';

const CartItem = ({ info, i }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);

    const decreaseQuantityWithCheck = () => {
        if (userInfo.email) {
            dispatch(changeQuantityToCart(
                {
                    email: userInfo.email,
                    maSP: info.maSP,
                    qty: -1
                }
            ));
            dispatch(fetchCart({ tenTK: userInfo.tenTK }));
        }
        else dispatch(decreaseQuantity(info))
    }

    const increaseQuantityWithCheck = () => {
        if (userInfo.email) {
            dispatch(changeQuantityToCart(
                {
                    email: userInfo.email,
                    maSP: info.maSP,
                    qty: 1
                }
            ));
            dispatch(fetchCart({ tenTK: userInfo.tenTK }));
        }
        else dispatch(increaseQuantity(info))
    }

    const removeCartWithCheck = () => {
        if (userInfo.email) {
            dispatch(removeCart(
                {
                    email: userInfo.email,
                    maSP: info.maSP
                }
            ));
            dispatch(fetchCart({ tenTK: userInfo.tenTK }));
        }
        else dispatch(removeFromCart(info))
    }

    return (
        <tr className={`rem` + i} key={info.maSP}>
            <td className="invert">{i}</td>
            <td className="invert-image">
                <a href="single.html">
                    {/* <img src={info && `http://127.0.0.1:8887/${info.hinhAnh}`} alt=" " className="img-responsive" /> */}
                    <img src={info && info.hinhAnh} alt=" " className="img-responsive" style={{ 'width': '100px' }} />
                </a>
            </td>
            <td className="invert">
                <div className="quantity">
                    <div className="quantity-select">
                        <div className="entry value-minus" onClick={decreaseQuantityWithCheck}>&nbsp;</div>
                        <div className="entry value">
                            <span>{info.qty}</span>
                        </div>
                        <div className="entry value-plus" onClick={increaseQuantityWithCheck}>&nbsp;</div>
                    </div>
                </div>
            </td>
            <td className="invert">{info.ten}</td>
            <td className="invert">{info.qty * info.donGiaBan}đ</td>
            <td className="invert">
                <div className="rem">
                    <div className="close1" onClick={removeCartWithCheck}></div>
                </div>
            </td>
        </tr>
    )
}

export default CartItem