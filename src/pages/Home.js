import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner/Banner'
import TopProduct from '../components/TopProduct/TopProduct'

import LoaiSanPhamApi from '../api/LoaiSanPhamApi'
import Ads from '../components/Ads/Ads'
import { Col, Row } from 'react-bootstrap'
import NewProduct from '../components/NewProduct/NewProduct'

const Home = () => {
  const [categoryParent, setCategoryParent] = useState([]);

  useEffect(() => {
    const res = LoaiSanPhamApi.getParentCategory();
    res.then(rs => setCategoryParent(rs))
  }, [])

  const TopProductRows = categoryParent.map((item) => (
    <TopProduct categoryList={item.loaiSPConList} key={item.maLoai} name={item.ten} />
  ))

  return (
    <>
      <Banner />
      <div className="ads-grid">
        <div className="container py-md-5 py-4">
          <Row>
            <Col lg={12}>
              <div className="wrapper">
                <NewProduct />
                {TopProductRows}
              </div>
            </Col>
            <Col lg={12}>
              <Ads />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Home