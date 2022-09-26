import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getClients,
  showClientToEdit,
  updateClient,
} from "../actions/client.action";
import { clearMessage } from "../actions/error.action";
import ClientForm from "../components/ClientForm";
import { DefaultButton, SaveButton } from "../utils/Action";
import {
  Container,
  FormContainer,
  InputContentSecond,
  CenteredDiv,
  FlexContainer,
  Main,
} from "../utils/Main";
import { isEmpty } from "../utils/Utils";

const ClientEdit = () => {
  const history = useHistory();
  const { message } = useSelector((state) => state.message);
  const { id } = useParams();
  // // const inputRef = useRef(null);

  const [disable, setDisable] = useState(false);
  const [editedFullName, setEditedFullName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedDob, setEditedDob] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedOutsideStoragePrice, setEditedOutsideStoragePrice] =
    useState("");
  const [editedStorageRentPrice, setEditedStorageRentPrice] = useState("");
  const [editedRampPrice, setEditedRampPrice] = useState("");
  const [editedForkliftPrice, setEditedForkliftPrice] = useState("");
  const [editedScrapPrice, setEditedScrapPrice] = useState("");
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.clientReducer);

  useEffect(() => {
    const fetchEditData = () => {
      dispatch(showClientToEdit(id));
      if (!isEmpty(client)) {
        setEditedFullName(client.full_name);
        setEditedPhone(client.phone);
        if (client.address !== null) {
          setEditedAddress(client.address);
        }
        setEditedDob(client.dob);
        setEditedEmail(client.email);
        setEditedLocation(client.location);
        setEditedDescription(client.description);
        setEditedOutsideStoragePrice(client.outsideStoragePrice);
        setEditedStorageRentPrice(client.storageRentPrice);
        setEditedForkliftPrice(client.forkliftPrice);
        setEditedRampPrice(client.rampPrice);
        setEditedScrapPrice(client.scrapPrice);
      }
    };
    fetchEditData();
  }, [id, dispatch, !isEmpty(client) && client.full_name]);

  const handleChecked = (e) => {
    setChecked(e.target.checked);
    if (!isEmpty(client) && client.location === "VAUGHAN") {
      if (checked) {
        setEditedLocation("VAUGHAN");
      } else {
        setEditedLocation("REXDALE");
      }
    }
    if (!isEmpty(client) && client.location === "REXDALE") {
      setEditedLocation("VAUGHAN");
      if (checked) {
        setEditedLocation("REXDALE");
      } else {
        setEditedLocation("VAUGHAN");
      }
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const clientData = {
      full_name: editedFullName,
      email: editedEmail,
      phone: editedPhone,
      dob: editedDob,
      address: editedAddress,
      location: editedLocation,
      description: editedDescription,
      storageRentPrice: editedStorageRentPrice,
      scrapPrice: editedScrapPrice,
      rampPrice: editedRampPrice,
      forkliftPrice: editedForkliftPrice,
      outsideStoragePrice: editedOutsideStoragePrice,
    };
    setDisable(true);
    await dispatch(updateClient(clientData, id));
    dispatch(showClientToEdit(id));
    dispatch(getClients(1));
    setTimeout(function () {
      setDisable(false);
      dispatch(clearMessage());
    }, 5000);
  };
  const GoBack = () => {
    history.goBack();
  };

  return (
    <Main>
      <Container>
        {message ? (
          <div style={{ zIndex: "999999" }} className="success">
            {message}
          </div>
        ) : null}
        <FlexContainer justifyContent="end" marginTop="1rem">
          <DefaultButton onClick={() => GoBack()} type="button" bgColor Color>
            <span>Go back</span>
          </DefaultButton>
        </FlexContainer>
        <CenteredDiv>
          <FormContainer
            key={!isEmpty(client) && client.id}
            onSubmit={(e) => handleUpdate(e)}
          >
            <ClientForm
              editClient="true"
              full_name={!isEmpty(client) && client.full_name}
              email={!isEmpty(client) && client.email}
              setEditedFullName={setEditedFullName}
              setEditedEmail={setEditedEmail}
              phone={!isEmpty(client) && client.phone}
              setEditedPhone={setEditedPhone}
              setEditedAddress={setEditedAddress}
              address={!isEmpty(client) && client.address}
              dob={!isEmpty(client) && client.dob}
              setEditedDob={setEditedDob}
              storageRentPrice={!isEmpty(client) && client.storageRentPrice}
              setEditedStorageRentPrice={setEditedStorageRentPrice}
              rampPrice={!isEmpty(client) && client.rampPrice}
              forkliftPrice={!isEmpty(client) && client.forkliftPrice}
              setEditedRampPrice={setEditedRampPrice}
              scrapPrice={!isEmpty(client) && client.scrapPrice}
              setEditedForkliftPrice={setEditedForkliftPrice}
              setEditedScrapPrice={setEditedScrapPrice}
              setEditedLocation={setEditedLocation}
              location={editedLocation}
              handleChecked={handleChecked}
              checked={checked}
              outsideStoragePrice={
                !isEmpty(client) && client.outsideStoragePrice
              }
              setEditedOutsideStoragePrice={setEditedOutsideStoragePrice}
              description={!isEmpty(client) && client.description}
              setEditedDescription={setEditedDescription}
            />

            <InputContentSecond>
              <SaveButton
                disabled={disable}
                type="submit"
                value={disable ? "Updating ... " : "Update"}
              />
            </InputContentSecond>
          </FormContainer>
        </CenteredDiv>
      </Container>
    </Main>
  );
};

export default ClientEdit;
