import React, { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoIosPeople, IoMdCar } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";
import styled from "styled-components";
import { Container, Main, TitleText } from "../utils/Main";
import ClientTable from "../components/tables/ClientTable";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils/Utils";
import { getClients } from "../actions/client.action";
import { getCars } from "../actions/car.action";
import { getOrders, getUnPaidOrder } from "../actions/order.action";

const GridElement = styled.div`
  display: grid;
  margin-bottom: 2rem;
  grid-gap: 1.5rem;
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
const Card = styled.div`
  display: flex;
  border-radius: 0.5rem;
  align-items: center;
  padding: 1rem;
  background-color: rgb(77, 111, 173, 1);
`;
const IconContainer = styled.div`
  border-radius: 9999px;
  margin-right: 1rem;
  padding: 0.7rem;
  background-color: ${(props) => props.bgColor};
`;
const People = styled(IoIosPeople)`
  width: 1.25rem;
  height: 1.25rem;
  color: white;
`;
const Orders = styled(FaCartPlus)`
  width: 1.25rem;
  height: 1.25rem;
  color: white;
`;
const Car = styled(IoMdCar)`
  width: 1.25rem;
  height: 1.25rem;
  color: white;
`;
const Shipping = styled(MdLocalShipping)`
  width: 1.25rem;
  height: 1.25rem;
  color: white;
`;
const TextTitle = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.275rem;
  font-weight: 500;
  color: white;
  font-family: "Cormorant Garamond", serif;
`;
const TextValue = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  font-family: "Saira Condensed", sans-serif;
`;

const OrdersOverview = styled.div``;
function Dashboard() {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.clientReducer);
  const { cars } = useSelector((state) => state.carReducer);
  const { orders } = useSelector((state) => state.orderReducer);
  const { unpaidOrders } = useSelector((state) => state.orderReducer);
  useEffect(() => {
    dispatch(getClients(1));
    dispatch(getCars(1));
    dispatch(getOrders(1));
    dispatch(getUnPaidOrder());
  }, [dispatch]);

  return (
    <Main>
      <Container>
        <TitleText>Dashboard</TitleText>
        <GridElement>
          <Card>
            <IconContainer bgColor="#FF5A1F">
              <People />
            </IconContainer>
            <div>
              <TextTitle>Total Clients</TextTitle>
              <TextValue>
                {!isEmpty(clients) && clients.data.data.length}
              </TextValue>
            </div>
          </Card>
          <Card>
            <IconContainer bgColor="#0E9F6E">
              <Orders />
            </IconContainer>
            <div>
              <TextTitle>Total Orders</TextTitle>
              <TextValue>
                {!isEmpty(orders) && orders.data.data.length}
              </TextValue>
            </div>
          </Card>
          <Card>
            <IconContainer bgColor="#3F83F8">
              <Car />
            </IconContainer>
            <div>
              <TextTitle>Cars</TextTitle>
              <TextValue>{!isEmpty(cars) && cars.data.data.length}</TextValue>
            </div>
          </Card>
          <Card>
            <IconContainer bgColor="#0694A2">
              <Shipping />
            </IconContainer>
            <div>
              <TextTitle>UnPaid Orders</TextTitle>
              <TextValue>
                {!isEmpty(unpaidOrders) && unpaidOrders.length}
              </TextValue>
            </div>
          </Card>
        </GridElement>
        <ClientTable dashboardView={true} clientView={false} />
        <OrdersOverview></OrdersOverview>
      </Container>
    </Main>
  );
}

export default Dashboard;
