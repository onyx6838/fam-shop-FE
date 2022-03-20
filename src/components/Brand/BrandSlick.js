import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Slider from 'react-slick/lib/slider'
import SlickItem from './SlickItem'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, selectSelectedFilters, selectSize } from '../../redux/selectors/productSelector';
import { fetchProductBrands, fetchProductsFilter } from '../../redux/store/product';

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

    useEffect(() => {
        dispatch(fetchProductBrands({
            categories: categoryList,
            category: category,
            listDacTrung: [],
            search: search
        }))
    }, [category, categoryList, dispatch, search])

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const handleToggle = (info) => {   
        dispatch(fetchProductsFilter(
            {
                categories: categoryList,
                category: category,
                selectedFilters: selectedFilters,
                page: 1,
                size: size,
                search : search,
                brand: info.maThuongHieu === brand ? 0 : info.maThuongHieu
            }))
    }

    return (
        <Row>
            <Col lg={12}>
                <div className="px-lg-4 my-5">
                    <Slider {...settings}>
                        {
                            brands.map((item, _) => {
                                return <SlickItem key={item.maThuongHieu} info={item} changeBrandClick={handleToggle}
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