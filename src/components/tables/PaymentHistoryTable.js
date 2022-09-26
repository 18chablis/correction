import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/order.action";
import moment from "moment";

import { isEmpty } from "../../utils/Utils";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

function PaymentHistoryTable() {
  const { orders } = useSelector((state) => state.orderReducer);
  const [state] = useState({
    currentPage: 1,
  });
  let limit = 50;
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(state.currentPage));
  }, [dispatch, state.currentPage]);
  const handlePage = async (data) => {
    let page = data.selected + 1;
    await dispatch(getOrders(page));
  };
  return (
    <div role="region" aria-labelledby="Caption01" tabIndex="0">
      <table>
        <thead>
          <tr>
            <th scope="col">Customer name</th>
            <th scope="col">Amount Paid</th>
            <th scope="col">Overdue</th>
            <th scope="col">Status</th>
            <th scope="col">added On</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(orders) &&
            orders.data.data.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/order/history/${order.id}`}>
                    {order.client.full_name}
                  </Link>
                </td>
                <td>
                  <Link to={`/order/history/${order.id}`}>
                    {order.amount_paid}
                  </Link>
                </td>
                <td>
                  <Link to={`/order/history/${order.id}`}>{order.overdue}</Link>
                </td>
                <td>
                  <Link to={`/order/history/${order.id}`}>{order.paid}</Link>
                </td>
                <td>
                  <Link to={`/order/history/${order.id}`}>
                    {moment(order.created_at).format("LLL")}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={!isEmpty(orders) && Math.ceil(orders.data.total / limit)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePage}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"page-active"}
      />
    </div>
  );
}

export default PaymentHistoryTable;
