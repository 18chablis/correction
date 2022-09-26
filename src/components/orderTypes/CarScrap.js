import { FormInput, FormLabel, InputContentSecond } from "../../utils/Main";
import Tooltip from "../Tooltip";

const CarScrap = (props) => {
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
            defaultValue={props.scrapPrice}
            onChange={(e) => props.setScrapPrice(e.target.value)}
            type="text"
            placeholder="360"
          />
        </InputContentSecond>
      ) : (
        <InputContentSecond>
          <FormLabel>Price</FormLabel>
          <FormInput
            defaultValue={props.scrapPrice}
            onChange={(e) => props.setScrapPrice(e.target.value)}
            type="text"
            placeholder="360"
            disabled
            style={{ cursor: "not-allowed" }}
            className="disable"
          />
          <Tooltip />
        </InputContentSecond>
      )}
    </>
  );
};

export default CarScrap;
