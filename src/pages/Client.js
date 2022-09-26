import React, { lazy, Suspense, useState } from "react";
import {
  ActionContainer,
  AddIcon,
  DefaultButton,
  SaveButton,
} from "../utils/Action";
import Modal from "../components/modals/Modal";
import useModal from "../components/useModal";
import {
  Container,
  FormContainer,
  InputContentSecond,
  Main,
  SearchContent,
  SearchIcon,
  SearchInput,
  TitleText,
} from "../utils/Main";
import { useDispatch, useSelector } from "react-redux";
import {
  addClient,
  getClientByName,
  getClients,
  getIncompleteField,
} from "../actions/client.action";
import { clearMessage } from "../actions/error.action";
import { isEmpty } from "../utils/Utils";
import { Link } from "react-router-dom";
import ClientForm from "../components/ClientForm";
const ClientTable = lazy(() => import("../components/tables/ClientTable"));
function Client() {
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
  const [forkliftPrice, setForkliftPrice] = useState("");
  const [storageRentPrice, setStorageRentPrice] = useState("");
  const [rampPrice, setRampPrice] = useState("");
  const [scrapPrice, setScrapPrice] = useState("");
  const [checked, setChecked] = useState(false);
  let item = {
    full_name,
    email,
    phone,
    address,
    dob,
    location,
    description,
    forkliftPrice,
    storageRentPrice,
    rampPrice,
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!full_name || !phone || !location) {
    } else {
      setDisable(true);
      await dispatch(addClient(item));
      dispatch(getIncompleteField());
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setDescription("");
      setDob("");
      setRampPrice("");
      setForkliftPrice("");
      setStorageRentPrice("");
      setOutsideStoragePrice("");
      setScrapPrice("");
      dispatch(getClients(1));
    }
    setTimeout(function () {
      setDisable(false);
      dispatch(clearMessage());
    }, 5000);
  };

  const { message } = useSelector((state) => state.message);

  // search autocomplete
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [key, setKey] = useState("");
  const { searchedClient } = useSelector((state) => state.clientReducer);

  const onChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    if (userInput === "") {
      // console.log("");
    } else {
      dispatch(getClientByName(userInput));
    }

    if (!isEmpty(searchedClient)) {
      // Filter our suggestions that don't contain the user's input
      const unLinked = searchedClient.map(
        (client) =>
          client.full_name
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
  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {!isEmpty(searchedClient) &&
          searchedClient.map((client, index) => {
            return (
              <Link key={client.id} to={`/client/view-profile/${client.id}`}>
                <li className="suggestion-active">{client.full_name}</li>
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

  return (
    <Main>
      <Container>
        {message ? (
          <div style={{ zIndex: "999999" }} className="success">
            {message}
          </div>
        ) : null}
        <TitleText>Client</TitleText>
        <ActionContainer>
          <DefaultButton onClick={toggle} type="button">
            <span>Add Client</span>
            <AddIcon />
          </DefaultButton>
          <div>
            <SearchContent>
              <div className="search-content">
                <SearchIcon />
              </div>
              <SearchInput
                type="text"
                placeholder="Search for clients"
                autoComplete="off"
                onChange={onChange}
              />
            </SearchContent>
            {showSuggestions && key && <SuggestionsListComponent />}
          </div>
        </ActionContainer>
        <Suspense fallback={<div>Loading Table</div>}>
          <ClientTable dashboardView={false} clientView={true} />
        </Suspense>
      </Container>
      <Modal isShowing={isShowing} hide={toggle}>
        <FormContainer onSubmit={handleSubmit}>
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
            description={description}
            setDescription={setDescription}
            forkliftPrice={forkliftPrice}
            setForkliftPrice={setForkliftPrice}
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
    </Main>
  );
}

export default Client;
