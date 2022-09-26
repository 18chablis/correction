import { FormInput, FormLabel, InputContentSecond } from "../../utils/Main";
import Tooltip from "../Tooltip";
const Ramp = (props) => {
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
            id="ramp-price"
            defaultValue={props.rampPrice}
            onChange={(e) => props.setRampPrice(e.target.value)}
            type="text"
            placeholder="360"
          />
        </InputContentSecond>
      ) : (
        <InputContentSecond>
          <FormLabel>Price</FormLabel>
          <FormInput
            defaultValue={props.rampPrice}
            onChange={(e) => props.setRampPrice(e.target.value)}
            type="text"
            placeholder="360"
            style={{ cursor: "not-allowed" }}
          />
          <Tooltip />
        </InputContentSecond>
      )}
    </>
  );
};

export default Ramp;
