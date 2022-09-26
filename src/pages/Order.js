import React, { lazy, Suspense, useState } from "react";
import useModal from "../components/useModal";
import {
  Container,
  FormContainer,
  FormLabel,
  InputContent,
  InputContentSecond,
  Main,
  SearchContent,
  SearchIcon,
  SearchInput,
  SelectContainer,
  StyledOption,
  Textarea,
  TitleText,
} from "../utils/Main";
import Modal from "../components/modals/Modal";
import {
  ActionContainer,
  AddIcon,
  DefaultButton,
  SaveButton,
} from "../utils/Action";
import { addDays, addMonths, isEmpty } from "../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getCarParkingOverdue,
  getOrders,
  getStorageRentOverdue,
  getUnPaidOrder,
  searchClientName,
  searchOrder,
} from "../actions/order.action";
import { clearMessage } from "../actions/error.action";
import { Link } from "react-router-dom";
import { addOrderShipping } from "../actions/shipping.action";
import { addOrderForklift } from "../actions/forklift.action";
import { addOrderRamp } from "../actions/ramp.action";
import { addOrderCarScrap } from "../actions/carScrap.action";
import { addOrderCarParking } from "../actions/carParking.action";
import { addOrderStorageRent } from "../actions/storageRent.action";
import { orderTypeOptions } from "../utils/Options";
import Ramp from "../components/orderTypes/Ramp";
import Forklift from "../components/orderTypes/Forklift";
import CarScrap from "../components/orderTypes/CarScrap";
import CarParking from "../components/orderTypes/CarParking";
import StorageRent from "../components/orderTypes/StorageRent";
import Shipping from "../components/orderTypes/Shipping";
import Autocomplete from "../components/Autocomplete";
import OutsideStorage from "../components/orderTypes/OutsideStorage";
import { addOrderOutsideStorage } from "../actions/outsideStorage.action";
import { getUser } from "../actions/user.action";
import { useEffect } from "react";
import OrderFilter from "../components/OrderFilter";
import {
  getDailyOrderOnCurrency,
  getMonthlyOrderOnCurrency,
  getWeeklyOrderOnCurrency,
} from "../actions/orderTotal.action";
const OrderTable = lazy(() => import("../components/tables/OrderTable"));
const PaymentHistoryTable = lazy(() =>
  import("../components/tables/PaymentHistoryTable")
);
function Order() {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.orderReducer);
  const user = useSelector((state) => state.userReducer);
  const { message } = useSelector((state) => state.message);
  const [disable, setDisable] = useState(false);
  const [client_name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { isShowing, toggle } = useModal();
  const [price, setPrice] = useState("");
  const [rampPrice, setRampPrice] = useState("");
  const [forkliftPrice, setForkliftPrice] = useState("");
  const [outsideStoragePrice, setOutsideStoragePrice] = useState("");
  const [storageRentPrice, setStorageRentPrice] = useState("");
  const [scrapPrice, setScrapPrice] = useState("");
  const [location, setLocation] = useState("");
  const [start_date, setStartDate] = useState("");
  const [arrive_date, setArriveDate] = useState("");
  const [client_cut_off_date, setClientCutOffDate] = useState("");
  const [departure_date, setDepartureDate] = useState("");
  const [normal_cut_off_date, setNormalCutOffDate] = useState("");
  const [status, setStatus] = useState("");
  const [booking_number, setBookingNumber] = useState("");
  const [port_of_destination, setPortDestination] = useState("");
  const [container_number, setContainerNumber] = useState("");
  const [deposit, setDeposit] = useState("");
  const [doc_file, setDocFile] = useState(null);
  const [doc_file_1, setDocFile_1] = useState(null);
  const [doc_file_2, setDocFile_2] = useState(null);
  const [doc_file_3, setDocFile_3] = useState(null);
  const [orderType, setOrderType] = useState("");
  const [shippingLine, setShippingLine] = useState(null);
  const [car_name, setCarName] = useState("");
  const [year, setYear] = useState("");
  const [picture, setPicture] = useState(null);
  const [picture_1, setPicture_1] = useState(null);
  const [picture_2, setPicture_2] = useState(null);
  const [number_day_of_rent, setNumberDayOfRent] = useState("");
  const [submit, setSubmit] = useState(false);
  const [currency, setCurrency] = useState("");
  const [paid, setPaid] = useState("");
  const [rules, setRules] = useState("");
  const [show, setShow] = useState(false);
  const [str, setStr] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setOrderType(e.target.value);
  };
  useEffect(() => {
    dispatch(getUser());
    setStr(localStorage.getItem("message-response"));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    let overdue = -1 * (0 - price);
    setDisable(true);
    if (orderType === "container_shipping") {
      if (shippingLine === null) {
        setDisable(false);
        window.alert("you should select a shipping line");
      } else {
        setDisable(true);
        let order_type = "Shipping";
        let currency = "USD";
        const shippingData = new FormData();
        shippingData.append("currency", currency);
        shippingData.append("order_type", order_type);
        shippingData.append("price", price);
        shippingData.append("arrive_date", arrive_date);
        shippingData.append("normal_cut_off_date", normal_cut_off_date);
        shippingData.append("client_cut_off_date", client_cut_off_date);
        shippingData.append("departure_date", departure_date);
        shippingData.append("deposit", deposit);
        shippingData.append("client_name", client_name);
        shippingData.append("port_of_destination", port_of_destination);
        shippingData.append("booking_number", booking_number);
        shippingData.append("container_number", container_number);
        shippingData.append("description", description);
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
        if (deposit !== null) {
          let overdue = price - deposit;
          shippingData.append("overdue", overdue);
        } else {
          shippingData.append("overdue", overdue);
        }
        shippingData.append("shipping_line", shippingLine);
        dispatch(addOrderShipping(shippingData));
        dispatch(getUnPaidOrder());
        dispatch(getOrders(1));
        reset();
      }
    }
    if (orderType === "forklift") {
      let order_type = "Forklift";
      let currency = "CAD";
      let price = forkliftPrice;
      let overdue = -1 * (0 - price);
      await dispatch(
        addOrderForklift({
          currency,
          overdue,
          order_type,
          price,
          start_date,
          client_name,
          description,
        })
      );
      dispatch(getUnPaidOrder());
      dispatch(getOrders(1));
      reset();
    }
    if (orderType === "ramp") {
      let order_type = "Ramp";
      let currency = "CAD";
      let price = rampPrice;
      let overdue = -1 * (0 - price);
      await dispatch(
        addOrderRamp({
          currency,
          overdue,
          order_type,
          price,
          start_date,
          client_name,
          description,
        })
      );
      dispatch(getUnPaidOrder());
      dispatch(getOrders(1));
      reset();
    }
    if (orderType === "outside_storage") {
      let order_type = "Outside Storage";
      let currency = "CAD";
      let price = outsideStoragePrice;
      let overdue = -1 * (0 - price);
      await dispatch(
        addOrderOutsideStorage({
          currency,
          overdue,
          order_type,
          price,
          start_date,
          number_day_of_rent,
          client_name,
          description,
        })
      );
      dispatch(getUnPaidOrder());
      dispatch(getOrders(1));
      reset();
    }
    if (orderType === "car_scrap") {
      let order_type = "Car Scrap";
      let currency = "CAD";
      let price = scrapPrice;
      let overdue = -1 * (0 - price);
      await dispatch(
        addOrderCarScrap({
          currency,
          overdue,
          order_type,
          price,
          start_date,
          client_name,
          description,
        })
      );
      dispatch(getUnPaidOrder());
      dispatch(getOrders(1));
      reset();
    }
    if (orderType === "car_parking") {
      let order_type = "Car Parking";
      let currency = "CAD";
      let end_of_free_charge = addDays(start_date, 7);
      let overdue = -1 * (0 - price);
      const carParkingData = new FormData();
      carParkingData.append("status", status);
      carParkingData.append("order_type", order_type);
      carParkingData.append("price", price);
      carParkingData.append("currency", currency);
      carParkingData.append("start_date", start_date);
      carParkingData.append("end_of_free_charge", end_of_free_charge);
      carParkingData.append("client_name", client_name);
      carParkingData.append("overdue", overdue);
      carParkingData.append("car_name", car_name);
      carParkingData.append("description", description);
      carParkingData.append("year", year);
      if (picture) {
        carParkingData.append("picture", picture);
      }
      if (picture_2) {
        carParkingData.append("picture_2", picture_2);
      }
      if (picture_1) {
        carParkingData.append("picture_1", picture_1);
      }
      await dispatch(addOrderCarParking(carParkingData));
      dispatch(getUnPaidOrder());
      dispatch(getCarParkingOverdue());
      dispatch(getOrders(1));
      reset();
    }
    if (orderType === "storage_rent") {
      let order_type = "Storage rent";
      let price = storageRentPrice;
      let overdue = -1 * (0 - price);
      if (location === "VAUGHAN") {
        let amount = "250";
        let end_of_free_charge = addMonths(start_date, 1);
        let currency = "CAD";
        await dispatch(
          addOrderStorageRent({
            price,
            amount,
            order_type,
            currency,
            location,
            start_date,
            end_of_free_charge,
            client_name,
            overdue,
            description,
          })
        );
        // console.log(start_date);
        dispatch(getUnPaidOrder());
        dispatch(getStorageRentOverdue());
        dispatch(getOrders(1));
        reset();
      }
      if (location === "REXDALE") {
        let amount = "275";
        let currency = "CAD";
        let end_of_free_charge = addMonths(start_date, 1);
        await dispatch(
          addOrderStorageRent({
            price,
            amount,
            currency,
            order_type,
            location,
            start_date,
            end_of_free_charge,
            client_name,
            overdue,
            description,
          })
        );
        dispatch(getUnPaidOrder());
        dispatch(getOrders(1));
        reset();
      }
    }

    setTimeout(function () {
      setDisable(false);
      setSubmit(false);
      dispatch(clearMessage());
      if (str.includes("Successfully created")) {
        // console.log(str);
        // toggle();
        // localStorage.setItem("message-response", null);
      }
    }, 3000);
  };

  const reset = () => {
    setCarName("");
    setPrice("");
    setStartDate("");
    setArriveDate("");
    setDeposit("");
    setDepartureDate("");
    setNormalCutOffDate("");
    setClientCutOffDate("");
    setPortDestination("");
    setContainerNumber("");
    setBookingNumber("");
    setDescription("");
    setDocFile(null);
    setLocation(null);
    setUserKey("");
    setName("");
    setYear("");
    setPicture(null);
    setPicture_1(null);
    setPicture_2(null);
    setRampPrice("");
    setForkliftPrice("");
    setStorageRentPrice("");
    setOutsideStoragePrice("");
    setScrapPrice("");
  };

  const handleShippingLine = (e) => {
    e.preventDefault();
    setShippingLine(e.target.value);
  };

  // autocomplete start here
  // search autocomplete
  const [suggestions, setSuggestions] = useState([]);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [userKey, setUserKey] = useState("");
  const { searchedOrder } = useSelector((state) => state.orderReducer);

  const handleSearch = (e) => {
    const userInput = e.target.value.toLowerCase();
    if (userInput === "") {
      // console.log("");
    } else {
      dispatch(searchOrder(userInput));
    }

    if (!isEmpty(searchedOrder)) {
      // Filter our suggestions that don't contain the user's input
      const unLinked = searchedOrder.map(
        (order) =>
          order.full_name
            .toString()
            .toLowerCase()
            .indexOf(userInput.toLowerCase()) > -1
      );
      setUserKey(e.target.value.toLowerCase());
      setSuggestions(unLinked);
      setDisplaySuggestions(true);
    } else {
      const unLinked = "";
      setUserKey(e.target.value.toLowerCase());
      setSuggestions(unLinked);
      setDisplaySuggestions(true);
    }
  };
  const SearchListComponent = () => {
    return suggestions.length ? (
      <ul className="suggestions">
        {!isEmpty(searchedOrder) &&
          searchedOrder.map((order, index) => {
            return (
              <Link key={index} to={`/order/update/${order.order_id}`}>
                {order.port_of_destination && (
                  <li className="suggestion-active">
                    {order.full_name} - {order.port_of_destination} -{" "}
                    {order.order_type}
                  </li>
                )}
                {order.start_date && (
                  <li className="suggestion-active">
                    {order.full_name} - {order.start_date} - {order.order_type}
                  </li>
                )}
                {order.price && (
                  <li className="suggestion-active">
                    {order.full_name} - {order.price} - {order.order_type}
                  </li>
                )}
              </Link>
            );
          })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };

  const handleFilterBox = () => {
    setShow(!show);
  };
  const handleFilterSearch = (e) => {
    e.preventDefault();
    setDisable(true);
    if (rules === "day") {
      dispatch(getDailyOrderOnCurrency(currency, paid));
    }
    if (rules === "week") {
      dispatch(getWeeklyOrderOnCurrency(currency, paid));
    }
    if (rules === "month") {
      dispatch(getMonthlyOrderOnCurrency(currency, paid));
    }
    setTimeout(function () {
      setDisable(false);
    }, 2000);
  };

  return (
    <Main>
      <Container>
        {message && (
          <div style={{ zIndex: "999999" }} className="success">
            {message}
          </div>
        )}
        <TitleText>Order</TitleText>
        <ActionContainer>
          <DefaultButton onClick={toggle} type="button">
            <span>Add Order</span>
            <AddIcon />
          </DefaultButton>
          <div>
            <SearchContent>
              <div className="search-content">
                <SearchIcon />
              </div>
              <SearchInput
                type="text"
                placeholder="Search for orders"
                autoComplete="off"
                onChange={handleSearch}
              />
            </SearchContent>
            {displaySuggestions && userKey && <SearchListComponent />}
          </div>
          <DefaultButton onClick={handleFilterBox} type="button">
            <span>Filter</span>
            <AddIcon />
          </DefaultButton>
          <OrderFilter
            show={show}
            handleFilterBox={handleFilterBox}
            setCurrency={setCurrency}
            setRules={setRules}
            disable={disable}
            handleSearch={handleFilterSearch}
            setPaid={setPaid}
          />
        </ActionContainer>
        <Suspense fallback={<div>Loading Table</div>}>
          <OrderTable />
        </Suspense>
        <TitleText>Payment history</TitleText>
        <Suspense fallback={<div>Loading Table</div>}>
          <PaymentHistoryTable />
        </Suspense>
      </Container>
      <Modal isShowing={isShowing} hide={toggle}>
        <FormContainer onSubmit={handleSubmit} id="order-form">
          <InputContent style={{ marginTop: "-40px" }}>
            <FormLabel>Order Type</FormLabel>
            <SelectContainer onChange={handleChange}>
              {orderTypeOptions.map((option) => (
                <StyledOption key={option.value} value={option.value}>
                  {option.label}
                </StyledOption>
              ))}
            </SelectContainer>
          </InputContent>
          <InputContentSecond style={{ marginBottom: "-8px" }}>
            <FormLabel>Client Name</FormLabel>
            <Autocomplete
              dispatch={dispatch}
              method={searchClientName}
              Data={clients}
              setName={setName}
              submit={submit}
              setRampPrice={setRampPrice}
              setScrapPrice={setScrapPrice}
              setOutsideStoragePrice={setOutsideStoragePrice}
              setForkliftPrice={setForkliftPrice}
              setStorageRentPrice={setStorageRentPrice}
            />
          </InputContentSecond>
          {orderType === "container_shipping" && (
            <Shipping
              booking_number={booking_number}
              container_number={container_number}
              deposit={deposit}
              port_of_destination={port_of_destination}
              setPortDestination={setPortDestination}
              setBookingNumber={setBookingNumber}
              setContainerNumber={setContainerNumber}
              setDeposit={setDeposit}
              setDocFile={setDocFile}
              setDocFile_1={setDocFile_1}
              setDocFile_2={setDocFile_2}
              setDocFile_3={setDocFile_3}
              price={price}
              setArriveDate={setArriveDate}
              setDepartureDate={setDepartureDate}
              setClientCutOffDate={setClientCutOffDate}
              setNormalCutOffDate={setNormalCutOffDate}
              setPrice={setPrice}
              handleShippingLine={handleShippingLine}
            />
          )}
          {orderType === "storage_rent" && (
            <StorageRent
              start_date={start_date}
              storageRentPrice={storageRentPrice}
              setStartDate={setStartDate}
              setStorageRentPrice={setStorageRentPrice}
              setLocation={setLocation}
              user={user.user.role}
            />
          )}
          {orderType === "car_parking" && (
            <CarParking
              start_date={start_date}
              price={price}
              car_name={car_name}
              year={year}
              picture={picture}
              picture_1={picture_1}
              picture_2={picture_2}
              setStartDate={setStartDate}
              setCarName={setCarName}
              setYear={setYear}
              setPicture={setPicture}
              setPicture_1={setPicture_1}
              setPicture_2={setPicture_2}
              setPrice={setPrice}
              setStatus={setStatus}
            />
          )}
          {orderType === "car_scrap" && (
            <CarScrap
              start_date={start_date}
              scrapPrice={scrapPrice}
              setStartDate={setStartDate}
              setScrapPrice={setScrapPrice}
              user={user.user.role}
            />
          )}
          {orderType === "forklift" && (
            <Forklift
              start_date={start_date}
              forkliftPrice={forkliftPrice}
              setStartDate={setStartDate}
              setForkliftPrice={setForkliftPrice}
              user={user.user.role}
            />
          )}
          {orderType === "ramp" && (
            <Ramp
              start_date={start_date}
              rampPrice={rampPrice}
              setStartDate={setStartDate}
              setRampPrice={setRampPrice}
              user={user.user.role}
            />
          )}
          {orderType === "outside_storage" && (
            <OutsideStorage
              start_date={start_date}
              outsideStoragePrice={outsideStoragePrice}
              number_day_of_rent={number_day_of_rent}
              setStartDate={setStartDate}
              setOutsideStoragePrice={setOutsideStoragePrice}
              setNumberDayOfRent={setNumberDayOfRent}
              user={user.user.role}
            />
          )}

          <InputContentSecond style={{ marginBottom: "-8px" }}>
            <FormLabel>Note</FormLabel>
            <Textarea
              type="text"
              autocomplete="off"
              placeholder="Add a note here ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputContentSecond>
          <InputContentSecond style={{ marginBottom: "-30px" }}>
            <SaveButton
              disabled={disable}
              type="submit"
              value={disable ? "Saving ... " : "Save"}
            />
          </InputContentSecond>
        </FormContainer>
      </Modal>
    </Main>
  );
}

export default Order;
