import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Slider from 'react-slick/lib/slider'
import SlickItem from './SlickItem'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, selectSelectedFilters, selectSize } from '../../redux/selectors/productSelector';
import { fetchProductBrands, fetchProductsFilter, changeTypeOfGetProduct, changeBrand } from '../../redux/store/product';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "lightgrey" }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "lightgrey" }}
            onClick={onClick}
        />
    );
}

const BrandSlick = () => {
    const dispatch = useDispatch();
    const size = useSelector(selectSize);
    const category = useSelector(selectCategory);
    const categoryList = useSelector(state => state.product.categories)
    const search = useSelector(state => state.product.search)
    const brands = useSelector(state => state.product.brands)
    const brand = useSelector(state => state.product.brand)
    const selectedFilters = useSelector(selectSelectedFilters);
    const typeOfGetProduct = useSelector(state => state.product.typeOfGetProduct)

    useEffect(() => {
        dispatch(fetchProductBrands({
            categories: categoryList,
            category: category,
            search: search,
            typeOfGetProduct: typeOfGetProduct
        }))
    }, [category, categoryList, dispatch, search, typeOfGetProduct])

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const handleToggle = (info) => {
        if (info.maThuongHieu !== brand) { // case này 1 là # 0 tức là lần đầu 2 là thay đổi brand
            dispatch(changeBrand(info.maThuongHieu))
            if (typeOfGetProduct === 'SEARCH') dispatch(changeTypeOfGetProduct('BRAND_SEARCH'))
            else dispatch(changeTypeOfGetProduct('BRAND_CATEGORY'))
        } else {
            dispatch(changeBrand(0))
            if (typeOfGetProduct === 'BRAND_SEARCH') dispatch(changeTypeOfGetProduct('SEARCH'))
            else dispatch(changeTypeOfGetProduct('CATEGORY'))
        }
        dispatch(fetchProductsFilter(
            {
                categories: categoryList,
                category: category,
                selectedFilters: selectedFilters,
                page: 1,
                size: size,
                search: search,
                brand: brand,
                typeOfGetProduct: typeOfGetProduct
            }))
    }

    return (
        <Row>
            <Col lg={12}>
                <div className="px-lg-4 my-5">
                    <Slider {...settings}>
                        {
                            brands.map((item, _) => {
                                return <SlickItem key={item.maThuongHieu} info={item} changeBrandClick={() => handleToggle(item)}
                                    choose={brand === item.maThuongHieu ? true : false} />
                            })
                        }
                    </Slider>
                </div>
            </Col>
        </Row>
    )
}

export default BrandSlick