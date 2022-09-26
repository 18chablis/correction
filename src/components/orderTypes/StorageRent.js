import {
  Checkbox,
  CheckBoxContainer,
  CheckBoxContent,
  CheckBoxLabel,
  FormInput,
  FormLabel,
  InputContentSecond,
} from "../../utils/Main";
import Tooltip from "../Tooltip";

const StorageRent = (props) => {
  return (
    <>
      <InputContentSecond>
        <FormLabel>Start Date</FormLabel>
        <FormInput
          value={props.start_date}
          onChange={(e) => props.setStartDate(e.target.value)}
          type="date"
          placeholder="John Ebo"
        />
      </InputContentSecond>
      {props.user === "admin" ? (
        <InputContentSecond>
          <FormLabel>Price</FormLabel>
          <FormInput
            defaultValue={props.storageRentPrice}
            onChange={(e) => props.setStorageRentPrice(e.target.value)}
            type="text"
            placeholder="360"
          />
        </InputContentSecond>
      ) : (
        <InputContentSecond>
          <FormLabel>Price</FormLabel>
          <FormInput
            defaultValue={props.storageRentPrice}
            onChange={(e) => props.setStorageRentPrice(e.target.value)}
            type="text"
            placeholder="360"
            style={{ cursor: "not-allowed" }}
          />
          <Tooltip />
        </InputContentSecond>
      )}
      <CheckBoxContainer>
        <FormLabel>Location</FormLabel>
        <CheckBoxContent>
          <CheckBoxLabel>
            <Checkbox
              type="radio"
              value="VAUGHAN"
              name="location"
              onClick={(e) => props.setLocation(e.target.value)}
            />
            <span className="ml-231">VAUGHAN</span>
          </CheckBoxLabel>
          <CheckBoxLabel>
            <Checkbox
              value="REXDALE"
              name="location"
              onClick={(e) => props.setLocation(e.target.value)}
              type="radio"
            />
            <span className="ml-231">REXDALE</span>
          </CheckBoxLabel>
        </CheckBoxContent>
      </CheckBoxContainer>
    </>
  );
};

export default StorageRent;
