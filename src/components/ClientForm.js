import React, { useState } from "react";
import {
  InputContent,
  FlexContainer,
  FormInput,
  FormLabel,
  InlineInputContainer,
  InputContentSecond,
  Textarea,
} from "../utils/Main";
import ToggleSwitch from "./ToggleSwitch";

const ClientForm = (props) => {
  const [edit] = useState(props.editClient);
  return (
    <>
      <InputContent>
        <FormLabel>Full name</FormLabel>
        {edit ? (
          <FormInput
            type="text"
            autocomplete="off"
            placeholder="jack strong"
            defaultValue={props.full_name}
            onChange={(e) => props.setEditedFullName(e.target.value)}
          />
        ) : (
          <FormInput
            type="text"
            autocomplete="off"
            placeholder="Tony Stack"
            value={props.full_name}
            onChange={(e) => props.setFullName(e.target.value)}
          />
        )}
      </InputContent>
      <InputContentSecond>
        <FormLabel>Email</FormLabel>
        {edit ? (
          <FormInput
            type="email"
            autocomplete="off"
            placeholder="tonystack@gmail.com"
            defaultValue={props.email}
            onChange={(e) => props.setEditedEmail(e.target.value)}
          />
        ) : (
          <FormInput
            type="email"
            autocomplete="off"
            placeholder="tonystack@gmail.com"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
          />
        )}
      </InputContentSecond>
      <FlexContainer justifyContent="space-around">
        <InlineInputContainer>
          <FormLabel>Telephone</FormLabel>
          {edit ? (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="+2132487654"
              defaultValue={props.phone}
              onChange={(e) => props.setEditedPhone(e.target.value)}
            />
          ) : (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="+56 92 183 213"
              value={props.phone}
              onChange={(e) => props.setPhone(e.target.value)}
            />
          )}
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Address</FormLabel>
          {edit ? (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="Rue 87, Beribot, Montpelier, Paris France "
              defaultValue={props.address}
              onChange={(e) => props.setEditedAddress(e.target.value)}
            />
          ) : (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="Rue 87, Beribot, Montpelier, Paris France "
              value={props.address}
              onChange={(e) => props.setAddress(e.target.value)}
            />
          )}
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Date of birth</FormLabel>
          {edit ? (
            <FormInput
              type="date"
              autocomplete="off"
              placeholder="2002-10-20"
              defaultValue={props.dob}
              onChange={(e) => props.setEditedDob(e.target.value)}
            />
          ) : (
            <FormInput
              type="date"
              autocomplete="off"
              placeholder="1980-01-21"
              value={props.dob}
              onChange={(e) => props.setDob(e.target.value)}
            />
          )}
        </InlineInputContainer>
      </FlexContainer>
      <FlexContainer justifyContent="space-around">
        <InlineInputContainer>
          <FormLabel>Rent Price</FormLabel>
          {edit ? (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="275"
              defaultValue={props.storageRentPrice}
              onChange={(e) => props.setEditedStorageRentPrice(e.target.value)}
            />
          ) : (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="250.00"
              value={props.storageRentPrice}
              onChange={(e) => props.setStorageRentPrice(e.target.value)}
            />
          )}
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Ramp Price</FormLabel>
          {edit ? (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="900"
              defaultValue={props.rampPrice}
              onChange={(e) => props.setEditedRampPrice(e.target.value)}
            />
          ) : (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="658.80 "
              value={props.rampPrice}
              onChange={(e) => props.setRampPrice(e.target.value)}
            />
          )}
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Scrap Price</FormLabel>
          {edit ? (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="840"
              defaultValue={props.scrapPrice}
              onChange={(e) => props.setEditedScrapPrice(e.target.value)}
            />
          ) : (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="900"
              value={props.scrapPrice}
              onChange={(e) => props.setScrapPrice(e.target.value)}
            />
          )}
        </InlineInputContainer>
      </FlexContainer>
      <FlexContainer justifyContent="space-between">
        {edit ? (
          <>
            <FormLabel>Location</FormLabel>
            <ToggleSwitch
              handleChecked={props.handleChecked}
              checked={props.checked}
              Name="location"
              location={props.location}
            />
          </>
        ) : (
          <>
            <FormLabel>Location</FormLabel>
            <ToggleSwitch
              handleChecked={props.handleChecked}
              checked={props.checked}
              Name="location"
              location={props.location}
            />
          </>
        )}
        <InlineInputContainer>
          <FormLabel>OutsideStorage Price</FormLabel>
          {edit ? (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="200.50"
              defaultValue={props.outsideStoragePrice}
              onChange={(e) =>
                props.setEditedOutsideStoragePrice(e.target.value)
              }
            />
          ) : (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="900"
              value={props.outsideStoragePrice}
              onChange={(e) => props.setOutsideStoragePrice(e.target.value)}
            />
          )}
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Forklift Price</FormLabel>
          {edit ? (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="800.50"
              defaultValue={props.forkliftPrice}
              onChange={(e) => props.setEditedForkliftPrice(e.target.value)}
            />
          ) : (
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="2170.0"
              value={props.forkliftPrice}
              onChange={(e) => props.setForkliftPrice(e.target.value)}
            />
          )}
        </InlineInputContainer>
      </FlexContainer>
      <InputContentSecond>
        <FormLabel>Note</FormLabel>
        {edit ? (
          <Textarea
            type="text"
            autocomplete="off"
            placeholder="A note here ..."
            defaultValue={props.description}
            onChange={(e) => props.setEditedDescription(e.target.value)}
          />
        ) : (
          <Textarea
            type="text"
            autocomplete="off"
            placeholder="Add a note here ..."
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
          />
        )}
      </InputContentSecond>
    </>
  );
};

export default ClientForm;
