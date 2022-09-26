import React, { useEffect, useState } from "react";
import { DefaultButton, DeleteIcon } from "../utils/Action";
import {
  Card,
  Container,
  FlexContainer,
  IconContainerRight,
  Main,
  Title,
  TitleText,
} from "../utils/Main";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils/Utils";
import {
  deleteOrderHistory,
  getOrderHistory,
} from "../actions/orderHistory.action";
import { getOrders } from "../actions/order.action";

const OrderHistory = () => {
  const { id } = useParams();
  const { orderHistory } = useSelector((state) => state.orderReducer);
  const [order_id, setOrderId] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const GoBack = () => {
    history.goBack();
  };
  useEffect(() => {
    dispatch(getOrderHistory(id));
    dispatch(getOrders(1));
    setOrderId(id);
  }, [dispatch, id]);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order history?")) {
      await dispatch(deleteOrderHistory(id));
      dispatch(getOrderHistory(order_id));
    }
  };
  return (
    <Main>
      <Container>
        <FlexContainer justifyContent="end" marginTop="1rem">
          <DefaultButton onClick={() => GoBack()} type="button" bgColor Color>
            <span>Go back</span>
          </DefaultButton>
        </FlexContainer>
        <TitleText>Order History</TitleText>
        <Card marginTop cardWidth>
          <Title pFSize textAlign="center" marginTop="10px">
            Order
          </Title>
          <hr />
          <FlexContainer justifyContent="space-between" alignItems="flex-start">
            <table>
              <thead>
                <tr id="history-row">
                  <th className="px-py" scope="col">
                    Order Type
                  </th>
                  <th className="px-py" scope="col">
                    Order Price
                  </th>
                  <th className="px-py" scope="col">
                    Amount paid
                  </th>
                  <th className="px-py" scope="col">
                    Overdue
                  </th>
                  <th className="px-py" scope="col">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(orderHistory) &&
                  orderHistory.data.order.map((order) => (
                    <tr id="history-row" key={order.id}>
                      <td className="px-py">
                        <Link to={`/order/update/${order.id}`}>
                          {order.order_type}
                        </Link>
                      </td>
                      <td className="px-py">
                        <Link to={`/order/update/${order.id}`}>
                          {order.price}
                        </Link>
                      </td>
                      <td className="px-py">
                        <Link to={`/order/update/${order.id}`}>
                          {order.amount_paid}
                        </Link>
                      </td>
                      <td className="px-py">
                        <Link to={`/order/update/${order.id}`}>
                          {order.overdue}
                        </Link>
                      </td>
                      <td className="px-py">
                        <Link to={`/order/update/${order.id}`}>
                          {order.paid}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </FlexContainer>
          <hr />
          <Title pFSize textAlign="center" marginTop="10px">
            History
          </Title>
          <hr />
          <FlexContainer justifyContent="space-between" alignItems="flex-start">
            <table>
              <thead>
                <tr id="history-row">
                  <th className="px-py" scope="col">
                    Old Amount paid
                  </th>
                  <th className="px-py" scope="col">
                    New amount paid
                  </th>
                  <th className="px-py" scope="col">
                    old overdue
                  </th>
                  <th className="px-py" scope="col">
                    new overdue
                  </th>
                  <th className="px-py" scope="col">
                    new paid status
                  </th>
                  <th className="px-py" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(orderHistory) &&
                  orderHistory.data.history.map((order) => (
                    <tr id="history-row" key={order.id}>
                      <td className="px-py">
                        <Link to={`/order/receipt/${order.id}`}>
                          {order.old_amount_paid}
                        </Link>
                      </td>
                      <td className="px-py">
                        <Link to={`/order/receipt/${order.id}`}>
                          {order.new_amount_paid}
                        </Link>
                      </td>
                      <td className="px-py">
                        <Link to={`/order/receipt/${order.id}`}>
                          {order.old_overdue}
                        </Link>
                      </td>
                      <td className="px-py">
                        <Link to={`/order/receipt/${order.id}`}>
                          {order.new_overdue}
                        </Link>
                      </td>
                      <td className="px-py">
                        <Link to={`/order/receipt/${order.id}`}>
                          {order.new_paid}
                        </Link>
                      </td>
                      <td className="px-py">
                        <FlexContainer>
                          <IconContainerRight>
                            <DeleteIcon
                              onClick={() => handleDelete(order.id)}
                            />
                          </IconContainerRight>
                        </FlexContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </FlexContainer>
        </Card>
      </Container>
    </Main>
  );
};

export default OrderHistory;
