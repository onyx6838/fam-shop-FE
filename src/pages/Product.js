import React, { useCallback, useEffect, useState } from 'react'
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';

import FilterBar from '../components/FilterBar/FilterBar'
import { Container, Row } from 'react-bootstrap'

import Pagination from '@material-ui/lab/Pagination'
import TopProductItem from '../components/TopProduct/TopProductItem'

import SanPhamApi from '../api/SanPhamApi'

import chunk from 'lodash/chunk'
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/store/cart';

const Product = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const retrieveProducts = useCallback(() => {
    const params = getRequestParams(page, pageSize);
    SanPhamApi.getAllPaging(params)
      .then((response) => {
        const { content, totalPages } = response;
        setProduct(content);
        setCount(totalPages);
        setPageSize(6);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page, pageSize])

  useEffect(() => {
    retrieveProducts()
    dispatch(fetchProducts())
  }, [dispatch, retrieveProducts])

  const getRequestParams = (page, pageSize) => ({
    page: page,
    size: pageSize
  })

  const handlePageChange = (e, value) => {
    setPage(value)
    retrieveProducts();
  }

  const rows = product.map((item) => (
    <TopProductItem info={item} key={item.maSP} grid={4}/>
  ));


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
                  count={count}
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