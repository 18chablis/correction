import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderShippingDemurrage, showOrderToEdit } from "../actions/order.action";
import {
  AddIcon,
  DefaultButton,
  DeleteIcon,
  EditIcon,
  SaveButton,
} from "../utils/Action";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  Checkbox,
  CheckBoxContent,
  CheckBoxLabel,
  Container,
  FlexContainer,
  FormContainer,
  FormInput,
  FormLabel,
  IconContainerRight,
  InputContent,
  InputContentSecond,
  Main,
  Textarea,
  Title,
} from "../utils/Main";
import { isEmpty } from "../utils/Utils";
import { clearMessage } from "../actions/error.action";
import { updateOrderCarParking } from "../actions/carParking.action";
import { updateOrderShipping } from "../actions/shipping.action";
import { updateOrderStorageRent } from "../actions/storageRent.action";
import { updateOrderCarScrap } from "../actions/carScrap.action";
import { updateOrderForklift } from "../actions/forklift.action";
import { updateOrderRamp } from "../actions/ramp.action";
import useModal from "../components/useModal";
import Modal from "../components/modals/Modal";
import { addNote, deleteNote, getNotes } from "../actions/orderNote.action";
import { getUser } from "../actions/user.action";
import { updateOrderOutsideStorage } from "../actions/outsideStorage.action";
import ToggleSwitch from "../components/ToggleSwitch";

const OrderDetails = () => {
  const { message } = useSelector((state) => state.message);

  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const { order } = useSelector((state) => state.orderReducer);
  const { notes } = useSelector((state) => state.orderNoteReducer);

  const [disable, setDisable] = useState(false);
  const [disableNote, setDisableNote] = useState(false);
  const [order_id, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [port_of_destination, setPortOfDestination] = useState("");
  const [booking_number, setBookingNumber] = useState("");
  const [doc_file, setDocFile] = useState("");
  const [doc_file_1, setDocFile_1] = useState("");
  const [doc_file_2, setDocFile_2] = useState("");
  const [doc_file_3, setDocFile_3] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [container_number, setContainerNumber] = useState("");
  const [arrive_date, setArriveDate] = useState("");
  const [client_cut_off_date, setClientCutOffDate] = useState("");
  const [normal_cut_off_date, setNormalCutOffDate] = useState("");
  const [departure_date, setDepartureDate] = useState("");
  const [removed_date, setRemovedDate] = useState("");
  const [amountPaidRecorded, setAmountPaidRecorded] = useState("");
  const [number_day_of_rent, setNumberDayOfRent] = useState("");
  const [shippingLine, setShippingLine] = useState("");
  const [shippingStatus, setShippingStatus] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [checked, setChecked] = useState(false);
  const { isShowing, toggle } = useModal();
  useEffect(() => {
    const fetchEditData = async () => {
      await dispatch(getUser());
      await dispatch(showOrderToEdit(id));
      await dispatch(getNotes(id));

      if (!isEmpty(order)) {
        setPrice(order[0].price);
        if (!isEmpty(order[0].shippings)) {
          setPortOfDestination(order[0].shippings[0].port_of_destination);
          setBookingNumber(order[0].shippings[0].booking_number);
          setContainerNumber(order[0].shippings[0].container_number);
          setShippingLine(order[0].shippings[0].shipping_line);
          setShippingStatus(order[0].shippings[0].shipping_status);
          if (order[0].shippings[0].arrive_date !== null)
            setArriveDate(order[0].shippings[0].arrive_date);
          if (order[0].shippings[0].client_cut_off_date !== null)
            setClientCutOffDate(order[0].shippings[0].client_cut_off_date);
          if (order[0].shippings[0].normal_cut_off_date !== null)
            setNormalCutOffDate(order[0].shippings[0].normal_cut_off_date);
          if (order[0].shippings[0].departure_date !== null)
            setDepartureDate(order[0].shippings[0].departure_date);
        }
        if (!isEmpty(order[0].car_parkings)) {
          setStatus(order[0].car_parkings[0].status);
        }
        if (!isEmpty(order[0].outside_storages)) {
          setNumberDayOfRent(order[0].outside_storages[0].number_day_of_rent);
        }
      }
      setOrderId(id);
    };
    fetchEditData();
  }, [dispatch, id, !isEmpty(order) && order[0].price]);
  const history = useHistory();
  const GoBack = () => {
    history.goBack();
  };

  const handleChecked = (e) => {
    setChecked(e.target.checked);
    if (
      !isEmpty(order) &&
      order[0].shippings[0].shipping_status === "Pending to ship"
    ) {
      if (checked) {
        setShippingStatus("Pending to ship");
      } else {
        setShippingStatus("Shipped");
      }
    }
    if (
      !isEmpty(order) &&
      order[0].shippings[0].shipping_status === "Shipped"
    ) {
      setShippingStatus("Pending to ship");
      if (checked) {
        setShippingStatus("Shipped");
      } else {
        setShippingStatus("Pending to ship");
      }
    }
  };

  const handleNote = async (e) => {
    e.preventDefault();
    setDisableNote(true);
    await dispatch(addNote({ description, order_id }));
    setDescription("");
    dispatch(getNotes(order_id));
    setTimeout(function () {
      setDisableNote(false);
    }, 2000);
    setTimeout(function () {
      dispatch(clearMessage());
    }, 5000);
  };
  const handleNoteDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await dispatch(deleteNote(id));
      dispatch(getNotes(order_id));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    const reset = () => {
      setAmountPaidRecorded("");
      setRemovedDate("");
      setArriveDate("");
      setDepartureDate("");
      setClientCutOffDate("");
      setNormalCutOffDate("");
      setPortOfDestination("");
      setContainerNumber("");
      setBookingNumber("");
    };
    let paid;
    if (!isEmpty(order) && order[0].order_type === "Car Parking") {
      let amount_paid =
        parseInt(order[0].amount_paid) + parseInt(amountPaidRecorded);
      let overdue = parseInt(order[0].price) - amount_paid;
      let currency = "CAD";
      if (parseInt(amountPaidRecorded) === parseInt(order[0].overdue)) {
        paid = "Paid";
      } else {
        paid = "Partially Paid";
      }
      await dispatch(
        updateOrderCarParking(
          {
            amount_paid,
            overdue,
            status,
            removed_date,
            paid,
            price,
            currency,
          },
          id
        )
      );
      dispatch(showOrderToEdit(id));
      reset();
    }
    if (!isEmpty(order) && order[0].order_type === "Ramp") {
      let amount_paid =
        parseInt(order[0].amount_paid) + parseInt(amountPaidRecorded);
      let overdue = parseInt(order[0].price) - amount_paid;
      let currency = "CAD";
      if (parseInt(amountPaidRecorded) === parseInt(order[0].overdue)) {
        paid = "Paid";
      } else {
        paid = "Partially Paid";
      }
      await dispatch(
        updateOrderRamp({ overdue, amount_paid, paid, price, currency }, id)
      );
      dispatch(showOrderToEdit(id));

      reset();
    }
    if (!isEmpty(order) && order[0].order_type === "Forklift") {
      let amount_paid =
        parseInt(order[0].amount_paid) + parseInt(amountPaidRecorded);
      let overdue = parseInt(order[0].price) - amount_paid;
      let currency = "CAD";
      if (parseInt(amountPaidRecorded) === parseInt(order[0].overdue)) {
        paid = "Paid";
      } else {
        paid = "Partially Paid";
      }
      await dispatch(
        updateOrderForklift({ overdue, amount_paid, paid, price, currency }, id)
      );
      dispatch(showOrderToEdit(id));
      reset();
    }
    if (!isEmpty(order) && order[0].order_type === "Outside Storage") {
      let amount_paid =
        parseInt(order[0].amount_paid) + parseInt(amountPaidRecorded);
      let overdue = parseInt(order[0].price) - amount_paid;
      let currency = "CAD";
      if (parseInt(amountPaidRecorded) === parseInt(order[0].overdue)) {
        paid = "Paid";
      } else {
        paid = "Partially Paid";
      }
      await dispatch(
        updateOrderOutsideStorage(
          { overdue, amount_paid, paid, price, currency, number_day_of_rent },
          id
        )
      );
      dispatch(showOrderToEdit(id));
      reset();
    }
    if (!isEmpty(order) && order[0].order_type === "Car Scrap") {
      let amount_paid =
        parseInt(order[0].amount_paid) + parseInt(amountPaidRecorded);
      let overdue = parseInt(order[0].price) - amount_paid;
      let currency = "CAD";
      if (parseInt(amountPaidRecorded) === parseInt(order[0].overdue)) {
        paid = "Paid";
      } else {
        paid = "Partially Paid";
      }
      await dispatch(
        updateOrderCarScrap({ overdue, amount_paid, paid, price, currency }, id)
      );
      dispatch(showOrderToEdit(id));
      reset();
    }
    if (!isEmpty(order) && order[0].order_type === "Shipping") {
      let amount_paid =
        parseInt(order[0].amount_paid) + parseInt(amountPaidRecorded);
      let overdue = parseInt(order[0].price) - amount_paid;
      let currency = "USD";
      if (parseInt(amountPaidRecorded) === parseInt(order[0].overdue)) {
        paid = "Paid";
      } else {
        paid = "Partially Paid";
      }
      const shippingData = new FormData();
      shippingData.append("price", price);
      shippingData.append("currency", currency);
      shippingData.append("port_of_destination", port_of_destination);
      shippingData.append("booking_number", booking_number);
      shippingData.append("container_number", container_number);
      shippingData.append("arrive_date", arrive_date);
      shippingData.append("client_cut_off_date", client_cut_off_date);
      shippingData.append("normal_cut_off_date", normal_cut_off_date);
      shippingData.append("departure_date", departure_date);
      shippingData.append("paid", paid);
      shippingData.append("amount_paid", amount_paid);
      shippingData.append("shipping_line", shippingLine.toUpperCase());
      shippingData.append("shipping_status", shippingStatus);
      if (doc_file) {
        shippingData.append("doc_file", doc_file);
      }
      if (doc_file_1) {
        shippingData.append("doc_file_1", doc_file_1);
      }
      if (doc_file_2) {
        shippingData.append("doc_file_2", doc_file_2);
      }
      if (doc_file_3) {
        shippingData.append("doc_file_3", doc_file_3);
      }
      shippingData.append("overdue", overdue);
      // for (var p of shippingData) {
      //   console.log(p);
      // }
      await dispatch(updateOrderShipping(shippingData, id));
      dispatch(showOrderToEdit(id));
      dispatch(getOrderShippingDemurrage());
      reset();
    }
    if (!isEmpty(order) && order[0].order_type === "Storage rent") {
      let amount_paid =
        parseInt(order[0].amount_paid) + parseInt(amountPaidRecorded);
      let overdue = parseInt(order[0].price) - amount_paid;
      let currency = "CAD";
      if (parseInt(amountPaidRecorded) === parseInt(order[0].overdue)) {
        paid = "Paid";
      } else {
        paid = "Partially Paid";
      }
      await dispatch(
        updateOrderStorageRent(
          {
            overdue,
            amount_paid,
            paid,
            price,
            currency,
          },
          id
        )
      );
      dispatch(showOrderToEdit(id));
      reset();
    }
    setTimeout(function () {
      setDisable(false);
    }, 2000);
    setTimeout(function () {
      dispatch(clearMessage());
    }, 5000);
  };

  return (
    <Main>
      <Container>
        {message && (
          <div style={{ zIndex: "999999" }} className="success">
            {message}
          </div>
        )}
        <FlexContainer justifyContent="space-between" marginTop="1rem">
          <DefaultButton onClick={toggle} type="button" bgColor Color>
            <span>Add Note</span>
            <AddIcon />
          </DefaultButton>
          <DefaultButton onClick={() => GoBack()} type="button" bgColor Color>
            <span>Go back</span>
          </DefaultButton>
        </FlexContainer>
        <FlexContainer alignItems="flex-start">
          <Card>
            <form onSubmit={handleSubmit}>
              <FlexContainer justifyContent="end" padding=".5rem 1rem">
                <EditIcon onClick={() => setEditToggle(!editToggle)} />
              </FlexContainer>
              <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                <FormLabel fontWeight="700" marginRight="2rem">
                  Order Type :
                </FormLabel>
                <Title>{!isEmpty(order) && order[0].order_type}</Title>
              </FlexContainer>
              {!isEmpty(order) && order[0].order_type === "Car Parking" && (
                <>
                  <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                    <FormLabel fontWeight="700" marginRight="2rem">
                      Start Date :
                    </FormLabel>
                    <Title>
                      {!isEmpty(order) && order[0].car_parkings[0].start_date}
                    </Title>
                  </FlexContainer>
                  <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                    <FormLabel fontWeight="700" marginRight="2rem">
                      End Of Free Charge :
                    </FormLabel>
                    <Title>
                      {!isEmpty(order) &&
                        order[0].car_parkings[0].end_of_free_charge}
                    </Title>
                  </FlexContainer>
                  {editToggle ? (
                    <>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Car Status:
                        </FormLabel>
                        <CheckBoxContent>
                          <CheckBoxLabel>
                            <Checkbox
                              type="radio"
                              value="Not In Yard"
                              name="status"
                              onClick={(e) => setStatus(e.target.value)}
                            />
                            <span className="ml-231">Not In Yard</span>
                          </CheckBoxLabel>
                          <CheckBoxLabel>
                            <Checkbox
                              value="In Yard"
                              name="status"
                              onClick={(e) => setStatus(e.target.value)}
                              type="radio"
                            />
                            <span className="ml-231">In Yard</span>
                          </CheckBoxLabel>
                        </CheckBoxContent>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Removed Date:
                        </FormLabel>
                        <InputContent>
                          <FormInput
                            type="date"
                            placeholder="2020/09/28"
                            value={removed_date}
                            onChange={(e) => setRemovedDate(e.target.value)}
                          />
                        </InputContent>
                      </FlexContainer>
                    </>
                  ) : (
                    <>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Car Status:
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) && order[0].car_parkings[0].status}
                        </Title>
                      </FlexContainer>
                      <FlexContainer>
                        {!isEmpty(order) &&
                          order[0].car_parkings[0].removed_date !== null && (
                            <>
                              <FormLabel fontWeight="700" marginRight="2rem">
                                Removed Date:
                              </FormLabel>
                              <Title>
                                {!isEmpty(order) &&
                                  order[0].car_parkings[0].removed_date}
                              </Title>
                            </>
                          )}
                      </FlexContainer>
                    </>
                  )}
                </>
              )}
              {!isEmpty(order) && order[0].order_type === "Storage rent" && (
                <>
                  <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                    <FormLabel fontWeight="700" marginRight="2rem">
                      Start Date :
                    </FormLabel>
                    <Title>
                      {!isEmpty(order) && order[0].storage_rents[0].start_date}
                    </Title>
                  </FlexContainer>
                  <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                    <FormLabel fontWeight="700" marginRight="2rem">
                      End Of Free Charge :
                    </FormLabel>
                    <Title>
                      {!isEmpty(order) &&
                        order[0].storage_rents[0].end_of_free_charge}
                    </Title>
                  </FlexContainer>
                  <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                    <FormLabel fontWeight="700" marginRight="2rem">
                      Location :
                    </FormLabel>
                    <Title>
                      {!isEmpty(order) && order[0].storage_rents[0].location}
                    </Title>
                  </FlexContainer>
                </>
              )}
              {!isEmpty(order) && order[0].order_type === "Shipping" && (
                <>
                  {editToggle ? (
                    <>
                      <FlexContainer>
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Port of Destination :
                        </FormLabel>
                        <InputContent>
                          <FormInput
                            type="text"
                            autocomplete="off"
                            placeholder="Bearout Island Port"
                            onChange={(e) =>
                              setPortOfDestination(e.target.value)
                            }
                            defaultValue={
                              !isEmpty(order) &&
                              order[0].shippings[0].port_of_destination
                            }
                          />
                        </InputContent>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Booking Number :
                        </FormLabel>
                        <InputContent>
                          <FormInput
                            type="text"
                            autocomplete="off"
                            placeholder="B97g65t"
                            onChange={(e) => setBookingNumber(e.target.value)}
                            defaultValue={
                              !isEmpty(order) &&
                              order[0].shippings[0].booking_number
                            }
                          />
                        </InputContent>
                      </FlexContainer>
                      <FlexContainer>
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Container Number :
                        </FormLabel>
                        <InputContent>
                          <FormInput
                            type="text"
                            autocomplete="off"
                            placeholder="765r545"
                            onChange={(e) => setContainerNumber(e.target.value)}
                            defaultValue={
                              !isEmpty(order) &&
                              order[0].shippings[0].container_number
                            }
                          />
                        </InputContent>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Deposit :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) && order[0].shippings[0].deposit}
                        </Title>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Shipping line :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) &&
                            order[0].shippings[0].shipping_line}
                        </Title>
                      </FlexContainer>
                      <FlexContainer>
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Arrive Date :
                        </FormLabel>
                        <InputContent>
                          <FormInput
                            type="date"
                            autocomplete="off"
                            placeholder="2020-10-19"
                            onChange={(e) => setArriveDate(e.target.value)}
                            defaultValue={
                              !isEmpty(order) &&
                              order[0].shippings[0].arrive_date
                            }
                          />
                        </InputContent>
                      </FlexContainer>
                      <FlexContainer>
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Client Cut-off Date :
                        </FormLabel>
                        <InputContent>
                          <FormInput
                            type="date"
                            autocomplete="off"
                            placeholder="2020-10-19"
                            onChange={(e) =>
                              setClientCutOffDate(e.target.value)
                            }
                            defaultValue={
                              !isEmpty(order) &&
                              order[0].shippings[0].client_cut_off_date
                            }
                          />
                        </InputContent>
                      </FlexContainer>
                      <FlexContainer>
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Normal Cut-off Date :
                        </FormLabel>
                        <InputContent>
                          <FormInput
                            type="date"
                            autocomplete="off"
                            placeholder="2020-10-19"
                            onChange={(e) =>
                              setNormalCutOffDate(e.target.value)
                            }
                            defaultValue={
                              !isEmpty(order) &&
                              order[0].shippings[0].normal_cut_off_date
                            }
                          />
                        </InputContent>
                      </FlexContainer>
                      <FlexContainer>
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Shipping status :
                        </FormLabel>
                        <div style={{ margin: "10px 0" }}>
                          <ToggleSwitch
                            handleChecked={handleChecked}
                            checked={checked}
                            Name="shipping-status"
                            location={shippingStatus}
                          />
                        </div>
                      </FlexContainer>
                      <FlexContainer>
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Departure Date :
                        </FormLabel>
                        <InputContent>
                          <FormInput
                            type="date"
                            autocomplete="off"
                            placeholder="2020-10-19"
                            onChange={(e) => setDepartureDate(e.target.value)}
                            defaultValue={
                              !isEmpty(order) &&
                              order[0].shippings[0].departure_date
                            }
                          />
                        </InputContent>
                      </FlexContainer>
                    </>
                  ) : (
                    <>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Port of Destination :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) &&
                            order[0].shippings[0].port_of_destination}
                        </Title>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Booking Number :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) &&
                            order[0].shippings[0].booking_number}
                        </Title>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Container Number :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) &&
                            order[0].shippings[0].container_number}
                        </Title>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Deposit :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) && order[0].shippings[0].deposit}
                        </Title>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Shipping line :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) &&
                            order[0].shippings[0].shipping_line}
                        </Title>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Arrive Date :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) && order[0].shippings[0].arrive_date}
                        </Title>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Departure Date :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) &&
                            order[0].shippings[0].departure_date}
                        </Title>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Client Cut-off Date :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) &&
                            order[0].shippings[0].client_cut_off_date}
                        </Title>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Normal Cut-off Date :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) &&
                            order[0].shippings[0].normal_cut_off_date}
                        </Title>
                      </FlexContainer>
                      <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                        <FormLabel fontWeight="700" marginRight="2rem">
                          Shipping Status :
                        </FormLabel>
                        <Title>
                          {!isEmpty(order) &&
                            order[0].shippings[0].shipping_status}
                        </Title>
                      </FlexContainer>
                    </>
                  )}
                </>
              )}
              {!isEmpty(order) &&
                order[0].order_type === "Outside Storage" &&
                (editToggle ? (
                  <>
                    <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                      <FormLabel fontWeight="700" marginRight="2rem">
                        Start Date :
                      </FormLabel>
                      <Title>
                        {!isEmpty(order) &&
                          order[0].outside_storages[0].start_date}
                      </Title>
                    </FlexContainer>
                    <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                      <FormLabel fontWeight="700" marginRight="2rem">
                        Number Day Of Rent :
                      </FormLabel>
                      <InputContent>
                        <FormInput
                          type="number"
                          autocomplete="off"
                          placeholder="12"
                          onChange={(e) => setNumberDayOfRent(e.target.value)}
                          defaultValue={
                            !isEmpty(order) &&
                            order[0].outside_storages[0].number_day_of_rent
                          }
                        />
                      </InputContent>
                    </FlexContainer>
                  </>
                ) : (
                  <>
                    <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                      <FormLabel fontWeight="700" marginRight="2rem">
                        Start Date :
                      </FormLabel>
                      <Title>
                        {!isEmpty(order) &&
                          order[0].outside_storages[0].start_date}
                      </Title>
                    </FlexContainer>
                    <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                      <FormLabel fontWeight="700" marginRight="2rem">
                        Number Day Of Rent :
                      </FormLabel>
                      <Title>
                        {!isEmpty(order) &&
                          order[0].outside_storages[0].number_day_of_rent}
                      </Title>
                    </FlexContainer>
                  </>
                ))}
              <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                <FormLabel fontWeight="700" marginRight="2rem">
                  Price :
                </FormLabel>
                {user.user.role === "admin" && editToggle ? (
                  <InputContent>
                    <FormInput
                      type="text"
                      autocomplete="off"
                      placeholder="8910.50"
                      onChange={(e) => setPrice(e.target.value)}
                      defaultValue={!isEmpty(order) && order[0].price}
                    />
                  </InputContent>
                ) : (
                  <Title>{!isEmpty(order) && order[0].price}</Title>
                )}
              </FlexContainer>
              <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                <FormLabel fontWeight="700" marginRight="2rem">
                  Currency :
                </FormLabel>
                <Title>{!isEmpty(order) && order[0].currency}</Title>
              </FlexContainer>
              <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                <FormLabel fontWeight="700" marginRight="2rem">
                  Status :
                </FormLabel>
                <Title>{!isEmpty(order) && order[0].paid}</Title>
              </FlexContainer>
              <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                <FormLabel fontWeight="700" marginRight="2rem">
                  Amount paid:
                </FormLabel>
                {editToggle ? (
                  <InputContent>
                    <FormInput
                      type="number"
                      step="0.01"
                      placeholder="230.40"
                      onChange={(e) => setAmountPaidRecorded(e.target.value)}
                      value={amountPaidRecorded}
                    />
                  </InputContent>
                ) : (
                  <Title>{!isEmpty(order) && order[0].amount_paid}</Title>
                )}
              </FlexContainer>
              <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                <FormLabel fontWeight="700" marginRight="2rem">
                  Overdue :
                </FormLabel>
                <Title>{!isEmpty(order) && order[0].overdue}</Title>
              </FlexContainer>
              <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                <FormLabel fontWeight="700" marginRight="2rem">
                  Client Name :
                </FormLabel>
                <Title>{!isEmpty(order) && order[0].client.full_name}</Title>
              </FlexContainer>
              {!isEmpty(order) && order[0].shippings[0] && (
                <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                  <FormLabel fontWeight="700" marginRight="2rem">
                    Document :
                  </FormLabel>
                  {order[0].shippings[0].doc_file === null && editToggle ? (
                    <InputContent>
                      <FormInput
                        type="file"
                        placeholder="Input a document"
                        onChange={(e) =>
                          setDocFile(e.target.files[0], e.target.files[0].name)
                        }
                        accept=".pdf, .jpg, .jpeg, .png .txt, .doc, .docx"
                      />
                    </InputContent>
                  ) : !order[0].shippings[0].doc_file ? (
                    <p>No document uploaded</p>
                  ) : (
                    <a
                      href={
                        `${process.env.REACT_APP_API_URL}/uploads/document/` +
                        (!isEmpty(order) && order[0].shippings[0].doc_file)
                      }
                      target="_blank"
                      rel="noreferrer"
                      download={
                        (!isEmpty(order) && order[0].client.full_name) +
                        `shipping document`
                      }
                    >
                      {!isEmpty(order) && order[0].client.full_name} Shipping
                      Document
                    </a>
                  )}
                </FlexContainer>
              )}
              {!isEmpty(order) && order[0].shippings[0] && (
                <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                  <FormLabel fontWeight="700" marginRight="2rem">
                    Document number 2 :
                  </FormLabel>
                  {order[0].shippings[0].doc_file_1 === null && editToggle ? (
                    <InputContent>
                      <FormInput
                        type="file"
                        placeholder="Input a document"
                        onChange={(e) =>
                          setDocFile_1(
                            e.target.files[0],
                            e.target.files[0].name
                          )
                        }
                        accept=".pdf, .jpg, .jpeg, .png .txt, .doc, .docx"
                      />
                    </InputContent>
                  ) : !order[0].shippings[0].doc_file_1 ? (
                    <p>No document number 2 uploaded</p>
                  ) : (
                    <a
                      href={
                        `${process.env.REACT_APP_API_URL}/uploads/document/` +
                        (!isEmpty(order) && order[0].shippings[0].doc_file_1)
                      }
                      target="_blank"
                      rel="noreferrer"
                      download={
                        (!isEmpty(order) && order[0].client.full_name) +
                        `shipping document`
                      }
                    >
                      {!isEmpty(order) && order[0].client.full_name} Shipping
                      Document number 2
                    </a>
                  )}
                </FlexContainer>
              )}
              {!isEmpty(order) && order[0].shippings[0] && (
                <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                  <FormLabel fontWeight="700" marginRight="2rem">
                    Document number 3 :
                  </FormLabel>
                  {order[0].shippings[0].doc_file_2 === null && editToggle ? (
                    <InputContent>
                      <FormInput
                        type="file"
                        placeholder="Input a document"
                        onChange={(e) =>
                          setDocFile_2(
                            e.target.files[0],
                            e.target.files[0].name
                          )
                        }
                        accept=".pdf, .jpg, .jpeg, .png .txt, .doc, .docx"
                      />
                    </InputContent>
                  ) : !order[0].shippings[0].doc_file_2 ? (
                    <p>No document number 3 uploaded</p>
                  ) : (
                    <a
                      href={
                        `${process.env.REACT_APP_API_URL}/uploads/document/` +
                        (!isEmpty(order) && order[0].shippings[0].doc_file_2)
                      }
                      target="_blank"
                      rel="noreferrer"
                      download={
                        (!isEmpty(order) && order[0].client.full_name) +
                        `shipping document`
                      }
                    >
                      {!isEmpty(order) && order[0].client.full_name} Shipping
                      Document number 3
                    </a>
                  )}
                </FlexContainer>
              )}
              {!isEmpty(order) && order[0].shippings[0] && (
                <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                  <FormLabel fontWeight="700" marginRight="2rem">
                    Document number 4 :
                  </FormLabel>
                  {order[0].shippings[0].doc_file_3 === null && editToggle ? (
                    <InputContent>
                      <FormInput
                        type="file"
                        placeholder="Input a document"
                        onChange={(e) =>
                          setDocFile_3(
                            e.target.files[0],
                            e.target.files[0].name
                          )
                        }
                        accept=".pdf, .jpg, .jpeg, .png .txt, .doc, .docx"
                      />
                    </InputContent>
                  ) : !order[0].shippings[0].doc_file_3 ? (
                    <p>No document number 4 uploaded</p>
                  ) : (
                    <a
                      href={
                        `${process.env.REACT_APP_API_URL}/uploads/document/` +
                        (!isEmpty(order) && order[0].shippings[0].doc_file_3)
                      }
                      target="_blank"
                      rel="noreferrer"
                      download={
                        (!isEmpty(order) && order[0].client.full_name) +
                        `shipping document`
                      }
                    >
                      {!isEmpty(order) && order[0].client.full_name} Shipping
                      Document number 4
                    </a>
                  )}
                </FlexContainer>
              )}

              <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                <FormLabel fontWeight="700" marginRight="2rem">
                  Added On :
                </FormLabel>
                <Title>
                  {!isEmpty(order) &&
                    moment(order[0].created_at).format("LLLL")}
                </Title>
              </FlexContainer>
              <FlexContainer padding=".5rem 1rem" marginBottom=".4rem">
                <FormLabel fontWeight="700" marginRight="2rem">
                  Added by :
                </FormLabel>
                <Title>{!isEmpty(order) && order[0].user.name}</Title>
              </FlexContainer>
              {editToggle && (
                <InputContentSecond>
                  <SaveButton
                    disabled={disable}
                    type="submit"
                    value={disable ? "Updating ... " : "Update"}
                  />
                </InputContentSecond>
              )}
            </form>
          </Card>
          <Card>
            <Title pFSize textAlign="center" marginTop="10px">
              Notes
            </Title>
            <hr />
            <FlexContainer
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <table className="table-break">
                <thead>
                  <tr className="tr-note">
                    <th className="px-py" scope="col">
                      Date
                    </th>
                    <th className="px-py" scope="col">
                      Note
                    </th>
                    <th className="px-py" scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(notes) &&
                    notes.data.map((note) => (
                      <tr className="tr-note" key={note.id}>
                        <td className="px-py td-break">
                          <strong className="text-white">
                            {moment(note.created_at).format("MM DD YYYY")}
                          </strong>
                        </td>
                        <td className="px-py td-break">
                          <strong className="text-white">
                            {note.description}
                          </strong>
                        </td>
                        <td className="px-py">
                          <FlexContainer>
                            <IconContainerRight>
                              {user.user.role === "admin" && editToggle && (
                                <DeleteIcon
                                  onClick={() => handleNoteDelete(note.id)}
                                />
                              )}
                            </IconContainerRight>
                          </FlexContainer>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </FlexContainer>
          </Card>
        </FlexContainer>
      </Container>
      <Modal isShowing={isShowing} hide={toggle}>
        <FormContainer onSubmit={handleNote}>
          <InputContent>
            <FormLabel>Note</FormLabel>
            <Textarea
              type="text"
              autocomplete="off"
              placeholder="Add a note here ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputContent>
          <InputContentSecond>
            <SaveButton
              disabled={disableNote}
              type="submit"
              value={disableNote ? "Saving ... " : "Save"}
            />
          </InputContentSecond>
        </FormContainer>
      </Modal>
    </Main>
  );
};

export default OrderDetails;
