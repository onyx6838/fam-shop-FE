import React from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import { Carousel, Container } from 'react-bootstrap'

const carouselCaptionBannerStyle = {
    maxWidth: '500px'
};

const Banner = () => {
    return (
        <Carousel>
            <Carousel.Item className='item1'>
                <div className="banner-style d-flex align-items-center">
                    <Container>
                        <div className="carousel-caption-banner" style={carouselCaptionBannerStyle}>
                            <p>
                                Giảm giá
                                <span>10%</span> giá gốc
                            </p>
                            <h3 className="mt-2">Bánh Ngon Bán Tại Cửa Hàng</h3>
                        </div>
                    </Container>
                </div>
            </Carousel.Item>
            <Carousel.Item className='item2'>
                <div className="banner-style d-flex align-items-center">
                    <Container>
                        <div className="carousel-caption-banner" style={carouselCaptionBannerStyle}>
                            <p>
                                <span>Cà Phê</span>
                            </p>
                            <h3 className="mt-2">G7 vừa nhập về</h3>
                        </div>
                    </Container>
                </div>
            </Carousel.Item>
            <Carousel.Item className='item3'>
                <div className="banner-style d-flex align-items-center">
                    <Container>
                        <div className="carousel-caption-banner" style={carouselCaptionBannerStyle}>
                            <p>
                                Nhiều kẹo hơn
                                <span>Gói thêm 25% số lượng</span>
                            </p>
                            <h3 className="mt-2">Kẹo Sữa Nay Thêm Kẹo Sữa</h3>
                        </div>
                    </Container>
                </div>
            </Carousel.Item>
            <Carousel.Item className='item4'>
                <div className="banner-style d-flex align-items-center">
                    <Container>
                        <div className="carousel-caption-banner" style={carouselCaptionBannerStyle}>
                            <p>
                                Nước Giải Khát
                                <span>Bán Chạy</span>
                            </p>
                            <h3 className="mt-2">Nước Giải Khát Ngon, Tuyệt Vời</h3>
                        </div>
                    </Container>
                </div>
            </Carousel.Item>
        </Carousel>
    )
}

export default Banner