import { FormInput, FormLabel, InputContentSecond } from "../../utils/Main";
import Tooltip from "../Tooltip";

const OutsideStorage = (props) => {
  return (
    <>
      <InputContentSecond>
        <FormLabel>Start Date</FormLabel>
        <FormInput
          value={props.start_date}
          onChange={(e) => props.setStartDate(e.target.value)}
          type="date"
          placeholder="2020-09-20"
        />
      </InputContentSecond>
      {props.user === "admin" ? (
        <InputContentSecond>
          <FormLabel>Price</FormLabel>
          <FormInput
            defaultValue={props.outsideStoragePrice}
            onChange={(e) => props.setOutsideStoragePrice(e.target.value)}
            type="text"
            placeholder="360"
          />
        </InputContentSecond>
      ) : (
        <InputContentSecond>
          <FormLabel>Price</FormLabel>
          <FormInput
            defaultValue={props.outsideStoragePrice}
            onChange={(e) => props.setOutsideStoragePrice(e.target.value)}
            type="text"
            placeholder="360"
            style={{ cursor: "not-allowed" }}
          />
          <Tooltip />
        </InputContentSecond>
      )}
      <InputContentSecond>
        <FormLabel>Number Day of Rent</FormLabel>
        <FormInput
          value={props.number_day_of_rent}
          onChange={(e) => props.setNumberDayOfRent(e.target.value)}
          type="number"
          placeholder="7"
        />
      </InputContentSecond>
    </>
  );
};

export default OutsideStorage;
