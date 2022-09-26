import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addClient } from "../actions/client.action";
import { clearMessage } from "../actions/error.action";
import { searchClientName } from "../actions/order.action";
import { AddIcon, DefaultButton, SaveButton } from "../utils/Action";
import {
  FormContainer,
  FormInput,
  InputContentSecond,
  StyledLi,
  StyledUl,
} from "../utils/Main";
import ClientForm from "./ClientForm";
import Modal from "./modals/Modal";
import useModal from "./useModal";

const Autocomplete = (props) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { isShowing, toggle } = useModal();
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [outsideStoragePrice, setOutsideStoragePrice] = useState("");
  const [storageRentPrice, setStorageRentPrice] = useState("");
  const [forkliftPrice, setForkliftPrice] = useState("");
  const [rampPrice, setRampPrice] = useState("");
  const [scrapPrice, setScrapPrice] = useState("");
  const [key, setKey] = useState("");
  const [checked, setChecked] = useState(false);

  let item = {
    full_name,
    email,
    phone,
    address,
    dob,
    location,
    description,
    storageRentPrice,
    rampPrice,
    forkliftPrice,
    scrapPrice,
    outsideStoragePrice,
  };
  const handleChecked = (e) => {
    setChecked(e.target.checked);
    if (checked) {
      setLocation("VAUGHAN");
    } else {
      setLocation("REXDALE");
    }
  };
  const handleClient = async (e) => {
    e.preventDefault();
    if (!full_name || !phone || !location) {
    } else {
      setDisable(true);
      await dispatch(addClient(item));
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setDescription("");
      setDob("");
      setLocation("");
      setRampPrice("");
      setForkliftPrice("");
      setStorageRentPrice("");
      setOutsideStoragePrice("");
      setScrapPrice("");
      dispatch(searchClientName(key));
    }
    setTimeout(function () {
      setDisable(false);
      dispatch(clearMessage());
    }, 5000);
  };

  useEffect(() => {
    function onSubmit() {
      if (props.submit === true) {
        props.setName("");
        setKey("");
      }
    }
    onSubmit();
  });

  const onChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    if (userInput === "") {
      // console.log("");
    } else {
      props.dispatch(props.method(userInput));
      props.setName(e.target.value);
    }

    if (props.Data) {
      // Filter our suggestions that don't contain the user's input
      const unLinked = props.Data.map(
        (data) =>
          data.full_name
            .toString()
            .toLowerCase()
            .indexOf(userInput.toLowerCase()) > -1
      );
      setKey(e.target.value.toLowerCase());
      setFilteredSuggestions(unLinked);
      setShowSuggestions(true);
    } else {
      const unLinked = "";
      setKey(e.target.value.toLowerCase());
      setFilteredSuggestions(unLinked);
      setShowSuggestions(true);
    }
  };
  const onClick = (e) => {
    setFilteredSuggestions([]);
    setKey(e.target.innerText);
    setShowSuggestions(false);
    var c_name = e.target.getAttribute("data-client-name");
    var ramp_price = e.target.getAttribute("data-ramp-price");
    var forklift_price = e.target.getAttribute("data-forklift-price");
    var scrap_price = e.target.getAttribute("data-scrap-price");
    var rent_price = e.target.getAttribute("data-storage-rent-price");
    var outside_rent_price = e.target.getAttribute(
      "data-outside-storage-price"
    );
    props.setName(c_name);
    props.setRampPrice(ramp_price);
    props.setForkliftPrice(forklift_price);
    props.setScrapPrice(scrap_price);
    props.setOutsideStoragePrice(outside_rent_price);
    props.setStorageRentPrice(rent_price);
  };
  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <StyledUl>
        {props.Data &&
          props.Data.map((data, index) => {
            // Flag the active suggestion with a class
            return (
              <StyledLi
                data-client-name={data.full_name}
                data-forklift-price={data.forkliftPrice}
                data-ramp-price={data.rampPrice}
                data-outside-storage-price={data.outsideStoragePrice}
                data-storage-rent-price={data.storageRentPrice}
                data-scrap-price={data.scrapPrice}
                key={index}
                onClick={onClick}
              >
                {data.full_name}
              </StyledLi>
            );
          })}
      </StyledUl>
    ) : (
      <>
        <div className="no-suggestions">
          <em>
            No suggestions, but you can
            <br />
            <DefaultButton onClick={toggle} type="button">
              <span>Create</span>
              <AddIcon />
            </DefaultButton>{" "}
          </em>
        </div>
      </>
    );
  };
  return (
    <>
      <FormInput
        id="client_name"
        type="text"
        onChange={onChange}
        value={key}
        autoComplete="off"
      />
      {showSuggestions && key && <SuggestionsListComponent />}
      <Modal style={{ zIndex: "12" }} isShowing={isShowing} hide={toggle}>
        <FormContainer onSubmit={handleClient}>
          <ClientForm
            full_name={full_name}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            setAddress={setAddress}
            address={address}
            dob={dob}
            setDob={setDob}
            storageRentPrice={storageRentPrice}
            setStorageRentPrice={setStorageRentPrice}
            rampPrice={rampPrice}
            setRampPrice={setRampPrice}
            scrapPrice={scrapPrice}
            setScrapPrice={setScrapPrice}
            setLocation={setLocation}
            location={location}
            checked={checked}
            outsideStoragePrice={outsideStoragePrice}
            setOutsideStoragePrice={setOutsideStoragePrice}
            forkliftPrice={forkliftPrice}
            setForkliftPrice={setForkliftPrice}
            description={description}
            setDescription={setDescription}
            handleChecked={handleChecked}
          />
          <InputContentSecond>
            <SaveButton
              disabled={disable}
              type="submit"
              value={disable ? "Saving ..." : "Save"}
            />
          </InputContentSecond>
        </FormContainer>
      </Modal>
    </>
  );
};

export default Autocomplete;
