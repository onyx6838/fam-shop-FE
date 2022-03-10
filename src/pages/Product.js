import React, { useEffect } from 'react'
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';

import FilterBar from '../components/FilterBar/FilterBar'
import { Container, Row } from 'react-bootstrap'

import Pagination from '@material-ui/lab/Pagination'
import TopProductItem from '../components/TopProduct/TopProductItem'

import chunk from 'lodash/chunk'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsFilter } from '../redux/store/product';
import { selectCategory, selectPage, selectProducts, selectSelectedFilters, selectSize, selectTotalPages } from '../redux/selectors/productSelector';

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProducts)
  const size = useSelector(selectSize)
  const page = useSelector(selectPage)
  const totalPages = useSelector(selectTotalPages)
  const category = useSelector(selectCategory)
  const selectedFilters = useSelector(selectSelectedFilters)

  useEffect(() => {
    dispatch(fetchProductsFilter({ category: 0, selectedFilters: [], page: 1, size: size }))
  }, [dispatch, size])

  const rows = product.map((item) => (
    <TopProductItem info={item} key={item.maSP} grid={4} />
  ));

  const handlePageChange = (e, value) => {
    dispatch(fetchProductsFilter({ category: category, selectedFilters: selectedFilters, page: value, size: size }))
  }

  return (
    <div className='ads-grid py-sm-5 py-4'>
      <Container className="py-xl-4 py-lg-2">
        <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3">
          Sản Phẩm<span className="font-weight-normal"> Của Chúng Tôi</span>
        </h3>
        <Row>
          <FilterBar />
          <div className="agileinfo-ads-display col-lg-9 order-lg-last order-first">
            <div className="wrapper">
              {
                product && chunk(rows, 3).map((item, i) => (
                  <div className="product-sec1 px-lg-4 mb-5" key={i}>
                    <Row>
                      {item}
                    </Row>
                  </div>
                ))
              }

              <div className="product-sec1 px-lg-4 mt-5">
                <br />
                <Pagination
                  count={totalPages}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Product