import React, { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table'

import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'

import DonDatHangApi from '../../api/DonDatHangApi'

const OMTable = ({ columns, data, manualPagination = false }) => {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => data, [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: columnData,
    data: rowData,
    manualPagination
  });
  return (
    <table {...getTableProps()} className="table table-striped">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const Pagination = ({ pageChangeHandler, totalPages }) => {
  const pagesArr = [...new Array(totalPages)];

  const [currentPage, setCurrentPage] = useState(1);

  const onNextPage = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  };
  const onPrevPage = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  };

  const onPageSelect = (e, pageNo) => {
    e.preventDefault();
    setCurrentPage(pageNo);
  }

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  useEffect(() => {
    if (totalPages === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (currentPage === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    pageChangeHandler(currentPage);
  }, [currentPage, pageChangeHandler]);

  return (
    <div className='pagination-style'>
      <ul>
        <li>
          <Link to='/user/order-management'
            style={{
              pointerEvents: !canGoBack && 'none'
            }}
            onClick={(e) => onPrevPage(e)} className={`${!canGoBack ? "not-allowed" : ""}`}
          >
            <span className="fa fa-angle-double-left" aria-hidden="true"></span>
          </Link>
        </li>
        {
          pagesArr.map((num, index) => (
            <li key={index}>
              <Link to='/user/order-management' onClick={(e) => onPageSelect(e, index + 1)}
                className={`${index + 1 === currentPage ? "active" : ""}`}>{index + 1}</Link>
            </li>
          ))
        }
        <li>
          <Link to='/user/order-management'
            style={{
              pointerEvents: !canGoNext && 'none'
            }}
            onClick={(e) => onNextPage(e)} className={`${!canGoNext ? "not-allowed" : ""}`}>
            <span className="fa fa-angle-double-right" aria-hidden="true"></span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const OrderManagement = () => {
  const userInfo = useSelector(state => state.user.userInfo)

  const columns = [
    {
      Header: "Địa Chỉ",
      accessor: "diaChi",
    },
    {
      Header: "Thời gian đặt",
      accessor: "thoiGianDat"
    },
    {
      Header: "Tình trạng",
      accessor: "trangThai"
    }
  ];

  const [pageData, setPageData] = useState({
    rowData: [],
    totalPages: 0,
    totalOrders: 0
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async (pageNo = 1) => {
      const response = await DonDatHangApi.getDonDatHangByKhachHang(userInfo.tenTK, pageNo, 3);
      return response;
    }

    const statusOrderFormatter = [
      {
        name: "HOA_DON",
        value: "Đã Giao"
      },
      {
        name: "DON_DAT",
        value: "Đơn Đặt"
      },
      {
        name: "VAN_DON",
        value: "Đang Giao"
      },
      {
        name: "HUY_DON",
        value: "Đã Hủy"
      }
    ];

    const formatRowData = (rawData) =>
      rawData.map((info) => ({
        diaChi: info.diaChi,
        thoiGianDat: info.thoiGianDat,
        trangThai: statusOrderFormatter.filter((item) => item.name === info.trangThai).map((obj) => obj.value),
      }));

    getData(currentPage).then((info) => {
      const { totalPages, totalElements, content } = info;
      setPageData({
        rowData: formatRowData(content),
        totalPages: totalPages,
        totalOrders: totalElements
      });
    });
  }, [currentPage, userInfo.tenTK]);

  return (
    <div className="input-grids">
      <h3 className="aside-title">Quản lý đơn đặt hàng ({pageData.totalOrders} đơn)</h3>
      <OMTable columns={columns} data={pageData.rowData} />
      <Pagination
        totalPages={pageData.totalPages}
        pageChangeHandler={setCurrentPage}
      />
    </div>
  )
}

export default OrderManagement