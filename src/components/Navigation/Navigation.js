import React, { useEffect, useState } from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import LoaiSanPhamApi from '../../api/LoaiSanPhamApi'

import Dropdown from 'react-multilevel-dropdown'
import NavLink from './NavLink'
import { Link } from 'react-router-dom'
import { Container, NavItem } from 'react-bootstrap'

const Navigation = () => {

	const [loaisanphams, setLoaiSanPhams] = useState([]);

	useEffect(() => {
		const response = LoaiSanPhamApi.getAll();
		response.then(res => setLoaiSanPhams(res));
	}, [])

	return (
		<div className="navbar-inner">
			<Container>
				<nav className="navbar navbar-expand-lg navbar-light">
					<Dropdown position='right' title={<NavLink content="Thể Loại" />} buttonClassName="navbar-nav">
						{
							loaisanphams.map((item) => {
								return (
									item.loaiSPConList.length > 0 && (
										<Dropdown.Item key={item.maLoai}>
											<a href="index.html">{item.ten} &raquo;</a>
											<Dropdown.Submenu position='right'>
												{
													item.loaiSPConList.map((sub, i) => (
														<Dropdown.Item key={i}>
															<a href="index.html">{sub.ten}</a>
														</Dropdown.Item>
													))
												}
											</Dropdown.Submenu>
										</Dropdown.Item>
									)
								)
							})
						}
					</Dropdown>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav text-center ml-auto">
							<NavItem className="mr-lg-2 mb-lg-0 mb-2">
								<Link className="nav-link" to="/home">Trang Chủ</Link>
							</NavItem>
							<NavItem className="mr-lg-2 mb-lg-0 mb-2">
								<Link className="nav-link" to="/product">Sản Phẩm</Link>
							</NavItem>
							<NavItem className="mr-lg-2 mb-lg-0 mb-2">
								<Link className="nav-link" to="/">Liên hệ</Link>
							</NavItem>
						</ul>
					</div>
				</nav>
			</Container>
		</div>
	)
}

export default Navigation