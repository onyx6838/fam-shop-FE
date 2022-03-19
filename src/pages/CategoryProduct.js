import React, { useEffect } from 'react'
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';

import FilterBar from '../components/FilterBar/FilterBar'
import { Container, Row } from 'react-bootstrap'

import Pagination from '@material-ui/lab/Pagination'
import TopProductItem from '../components/TopProduct/TopProductItem'

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsFilter } from '../redux/store/product';
import { selectCategory, selectPage, selectProducts, selectSelectedFilters, selectSize, selectTotalPages } from '../redux/selectors/productSelector';
import { chunk } from 'lodash';

const CategoryProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProducts)
  const size = useSelector(selectSize)
  const page = useSelector(selectPage)
  const totalPages = useSelector(selectTotalPages)
  const selectedFilters = useSelector(selectSelectedFilters)
  const category = useSelector(selectCategory)
  const categories = useSelector(state => state.product.categories)
  const search = useSelector(state => state.product.search)

  useEffect(() => {
    dispatch(fetchProductsFilter(
      {
        categories: categories,
        category: category,
        selectedFilters: [],
        page: 1,
        size: size,
        search: search
      }))
  }, [categories, category, dispatch, search, size])

  const rows = product.map((item) => (
    <TopProductItem info={item} key={item.maSP} grid={4} />
  ));

  const handlePageChange = (e, value) => {
    dispatch(fetchProductsFilter(
      {
        categories: categories,
        category: category,
        selectedFilters: selectedFilters,
        page: value,
        size: size,
        search: search
      }))
  }

  return (
    <div className='ads-grid py-sm-5 py-4'>
      <Container className="py-xl-4 py-lg-2">
        <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3">
          <span className="font-weight-normal"> {categories.ten}</span>
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

export default CategoryProduct