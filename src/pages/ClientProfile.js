import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteCar } from "../actions/car.action";
import {
  deleteNote,
  getCarByClientId,
  getNotes,
  getOrderByClientId,
  getRentStatus,
  showClientToEdit,
} from "../actions/client.action";
import { IconContainerRight } from "../components/Main";
import { DefaultButton, DeleteIcon, ImageIcon } from "../utils/Action";
import {
  Card,
  Container,
  FlexContainer,
  FormLabel,
  Main,
  Title,
  TitleText,
} from "../utils/Main";
import { isEmpty } from "../utils/Utils";

const ClientProfile = () => {
  const { id } = useParams();
  const history = useHistory();
  const GoBack = () => {
    history.goBack();
  };
  let dispatch = useDispatch();
  const { client, clientNotes } = useSelector((state) => state.clientReducer);
  const { rentStatus } = useSelector((state) => state.clientReducer);
  const { clientOrders } = useSelector((state) => state.clientReducer);
  const { clientCars } = useSelector((state) => state.clientReducer);
  const [clientId, setClientId] = useState("");
  useEffect(() => {
    dispatch(showClientToEdit(id));
    dispatch(getOrderByClientId(id));
    dispatch(getCarByClientId(id));
    dispatch(getRentStatus(id));
    dispatch(getNotes(id));
    setClientId(id);
  }, [id, dispatch]);

  const handleCarDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      dispatch(deleteCar(id));
      dispatch(getCarByClientId(clientId));
    }
  };
  const handleNoteDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(id));
      dispatch(getNotes());
    }
  };
  return (
    <>
      <Main mainHeight>
        <Container>
          <FlexContainer justifyContent="end" marginTop="1rem">
            <DefaultButton onClick={() => GoBack()} type="button" bgColor Color>
              <span>Go back</span>
            </DefaultButton>
          </FlexContainer>
          <TitleText>Client Profile</TitleText>
          <Card marginTop cardWidth>
            <FlexContainer
              justifyContent="space-around"
              padding=".5rem 1rem"
              marginBottom=".4rem"
            >
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    Name :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(client) && client.full_name}
                  </Title>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    Email :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(client) && client.email}
                  </Title>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    Telephone :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(client) && client.phone}
                  </Title>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    Address :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(client) && client.address}
                  </Title>
                </FlexContainer>
              </div>
            </FlexContainer>
            <FlexContainer
              justifyContent="space-around"
              padding=".5rem 1rem"
              marginBottom=".4rem"
            >
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    DOB :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(client) && client.dob}
                  </Title>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    Total Order :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(clientOrders) && clientOrders.data.length}
                  </Title>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    Location :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(client) && client.location}
                  </Title>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    Default Rent Price :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(client) && client.storageRentPrice}
                  </Title>
                </FlexContainer>
              </div>
            </FlexContainer>
            <FlexContainer
              justifyContent="space-around"
              padding=".5rem 1rem"
              marginBottom=".4rem"
            >
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    Default Ramp Price :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(client) && client.rampPrice}
                  </Title>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    Default Scrap Price :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(client) && client.scrapPrice}
                  </Title>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer>
                  <FormLabel fontWeight="700" marginRight=".5rem">
                    Default Outside Storage Price :
                  </FormLabel>
                  <Title marginTop="1px">
                    {!isEmpty(client) && client.outsideStoragePrice}
                  </Title>
                </FlexContainer>
              </div>
            </FlexContainer>

            <hr />
            <Title pFSize textAlign="center" marginTop="10px">
              Client Note
            </Title>
            <hr />
            <FlexContainer
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <table>
                <thead>
                  <tr id="row-full">
                    <th className="px-py" scope="col">
                      Description
                    </th>
                    <th className="px-py" scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(clientNotes) &&
                    clientNotes.data.map((note) => (
                      <tr id="row-full" key={note.id}>
                        <td className="px-py">
                          <Link to={`/client/update/${note.id}`}>
                            {note.description}
                          </Link>
                        </td>
                        <td className="px-py">
                          <FlexContainer>
                            <IconContainerRight>
                              <DeleteIcon
                                onClick={() => handleNoteDelete(note.id)}
                              />
                            </IconContainerRight>
                          </FlexContainer>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </FlexContainer>
            <Title pFSize textAlign="center" marginTop="10px">
              Orders
            </Title>
            <hr />
            <FlexContainer
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <table>
                <thead>
                  <tr className="trHead">
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
                  {!isEmpty(clientOrders) &&
                    clientOrders.data.map((order) => (
                      <tr className="trHead" key={order.id}>
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
              Cars
            </Title>
            <hr />
            <FlexContainer>
              <table>
                <thead>
                  <tr id="row-full-width">
                    <th className="px-py" scope="col">
                      Car Name
                    </th>
                    <th className="px-py" scope="col">
                      Status
                    </th>
                    <th className="px-py" scope="col">
                      Pictures
                    </th>
                    <th className="px-py" scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full-overflow">
                  {!isEmpty(clientCars) &&
                    clientCars.data.map((car) => (
                      <tr id="row-full-width" key={car.id}>
                        <td className="px-py">
                          <Link to={`/car`}>{car.name}</Link>
                        </td>
                        <td className="px-py">
                          <Link to={`/car`}>{car.status}</Link>
                        </td>
                        <td className="px-py">
                          <FlexContainer>
                            <Link to={`/car/images/${car.id}`}>
                              <IconContainerRight>
                                <ImageIcon />
                              </IconContainerRight>
                            </Link>
                          </FlexContainer>
                        </td>
                        <td className="px-py">
                          <FlexContainer>
                            <IconContainerRight>
                              <DeleteIcon
                                onClick={() => handleCarDelete(car.id)}
                              />
                            </IconContainerRight>
                          </FlexContainer>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </FlexContainer>
            {!isEmpty(rentStatus) && (
              <>
                <hr />
                <Title pFSize textAlign="center" marginTop="10px">
                  Rent Status
                </Title>
                <FlexContainer>
                  <table>
                    <thead>
                      <tr id="row-full-width">
                        <th className="px-py" scope="col">
                          Start Date
                        </th>
                        <th className="px-py" scope="col">
                          End Of free charge
                        </th>
                        <th className="px-py" scope="col">
                          Location
                        </th>
                        <th className="px-py" scope="col">
                          Amount
                        </th>
                        <th className="px-py" scope="col">
                          Created at
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isEmpty(rentStatus) &&
                        rentStatus.data.map((status) => (
                          <tr id="row-full-width" key={status.id}>
                            <td className="px-py">{status.start_date}</td>
                            <td className="px-py">
                              {status.end_of_free_charge}
                            </td>
                            <td className="px-py">{status.location}</td>
                            <td className="px-py">{status.amount}</td>
                            <td className="px-py">{status.created_at}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </FlexContainer>
              </>
            )}
          </Card>
        </Container>
      </Main>
    </>
  );
};

export default ClientProfile;
