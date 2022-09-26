import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../actions/order.action";
import { DeleteIcon, EditIcon } from "../../utils/Action";
import moment from "moment";

import { isEmpty } from "../../utils/Utils";
import {
  FlexContainer,
  IconContainer,
  IconContainerRight,
} from "../../utils/Main";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getUser } from "../../actions/user.action";
function OrderTable() {
  const user = useSelector((state) => state.userReducer);
  const { orders } = useSelector((state) => state.orderReducer);
  const [state] = useState({
    currentPage: 1,
  });
  let limit = 50;
  let dispatch = useDispatch();
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order ?")) {
      await dispatch(deleteOrder(id));
      dispatch(getOrders());
    }
  };
  useEffect(() => {
    dispatch(getOrders(state.currentPage));
    dispatch(getUser());
  }, [dispatch, state.currentPage]);
  const handlePage = async (data) => {
    let page = data.selected + 1;
    await dispatch(getOrders(page));
  };

  return (
    <div role="region" aria-labelledby="Caption01" tabIndex="0">
      <table>
        <caption id="Caption02">Client Orders table</caption>
        <thead>
          <tr>
            <th scope="col">Client Name</th>
            <th scope="col">Order Type</th>
            <th scope="col">Price</th>
            <th scope="col">Currency</th>
            <th scope="col">added by</th>
            <th scope="col">Created at</th>
            <th scope="col">Updated at</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(orders) &&
            orders.data.data.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/order/update/${order.id}`}>
                    <strong>{order.client.full_name}</strong>
                  </Link>
                </td>
                <td>
                  <Link to={`/order/update/${order.id}`}>
                    <p>{order.order_type}</p>
                  </Link>
                </td>
                <td>
                  <Link to={`/order/update/${order.id}`}>
                    <p>{order.price}</p>
                  </Link>
                </td>
                <td>
                  <Link to={`/order/update/${order.id}`}>
                    <p>{order.currency}</p>
                  </Link>
                </td>
                <td>
                  <Link to={`/order/update/${order.id}`}>
                    <p>{order.user.name}</p>
                  </Link>
                </td>
                <td>
                  <Link to={`/order/update/${order.id}`}>
                    <p>{moment(order.created_at).format("LL")}</p>
                  </Link>
                </td>
                {/* {user.user.role === "admin" && ( */}
                <td>{moment(order.updated_at).format("LL")}</td>
                {/* )}   */}
                <td>
                  <FlexContainer>
                    <IconContainer>
                      <Link to={`/order/update/${order.id}`}>
                        <EditIcon />
                      </Link>
                    </IconContainer>
                    {user.user.role === "admin" && (
                      <IconContainerRight>
                        <DeleteIcon onClick={() => handleDelete(order.id)} />
                      </IconContainerRight>
                    )}
                  </FlexContainer>
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

export default OrderTable;
