import React, { useEffect, useState } from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import LoaiSanPhamApi from '../../api/LoaiSanPhamApi'

import Dropdown from 'react-multilevel-dropdown'
import NavLinkEle from './NavLinkEle'
import { Link, useNavigate } from 'react-router-dom'
import { Container, NavItem } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { changeCategory, changeCategoryName, changeTypeOfGetProduct } from '../../redux/store/product'

const Navigation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loaisanphams, setLoaiSanPhams] = useState([]);

	useEffect(() => {
		const response = LoaiSanPhamApi.getAll();
		response.then(res => setLoaiSanPhams(res));
	}, [])

	const handleOnClickItem = (item) => {
		dispatch(changeCategory(item))
		dispatch(changeCategoryName(item.ten))
		//dispatch(changeSearch(''))
		dispatch(changeTypeOfGetProduct('CATEGORY'))
		navigate("/category")
	}

	const handleOnClickSubItem = (e, sub) => {
		e.stopPropagation();
		dispatch(changeCategory(sub))
		dispatch(changeCategoryName(sub.ten))
		//dispatch(changeSearch(''))
		dispatch(changeTypeOfGetProduct('CATEGORY'))
		navigate("/category")
	}

	return (
		<div className="navbar-inner">
			<Container>
				<nav className="navbar navbar-expand-lg navbar-light">
					<Dropdown position='right' title={<NavLinkEle content="Thể Loại" />} buttonClassName="navbar-nav">
						{
							loaisanphams.map((item) => {
								return (
									item.loaiSPConList.length > 0 && (
										<Dropdown.Item key={item.maLoai} onClick={() => handleOnClickItem(item)}>
											{/* <Link to={`/category`} state={{ categories: item }}>
												{item.ten} &raquo;
											</Link> */}
											{item.ten} &raquo;
											<Dropdown.Submenu position='right' style={{ 'width': '250px' }}>
												{
													item.loaiSPConList.map((sub, i) => (
														<Dropdown.Item key={i} onClick={(e) => handleOnClickSubItem(e, sub)}>{sub.ten}
															{/* <Link to="/category" state={{ categories: sub }}>{sub.ten}</Link> */}
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
								<Link className="nav-link" to="/posts/list">Bài Viết</Link>
							</NavItem>
						</ul>
					</div>
				</nav>
			</Container>
		</div>
	)
}

export default Navigation