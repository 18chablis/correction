import {
  Checkbox,
  CheckBoxContainer,
  CheckBoxContent,
  CheckBoxLabel,
  FlexContainer,
  FormInput,
  FormLabel,
  InlineInputContainer,
} from "../../utils/Main";

const CarParking = (props) => {
  return (
    <>
      <FlexContainer justifyContent="space-around">
        <InlineInputContainer>
          <FormLabel>Start Date</FormLabel>
          <FormInput
            value={props.start_date}
            onChange={(e) => props.setStartDate(e.target.value)}
            type="date"
            placeholder="John Ebo"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Price</FormLabel>
          <FormInput
            value={props.price}
            onChange={(e) => props.setPrice(e.target.value)}
            type="text"
            placeholder="360"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Car Name</FormLabel>
          <FormInput
            type="text"
            placeholder="Audi Q5"
            onChange={(e) => props.setCarName(e.target.value)}
            value={props.name}
          />
        </InlineInputContainer>
      </FlexContainer>
      <FlexContainer justifyContent="space-around">
        <InlineInputContainer>
          <FormLabel>Year</FormLabel>
          <FormInput
            type="text"
            placeholder="2017"
            value={props.year}
            onChange={(e) => props.setYear(e.target.value)}
          />
        </InlineInputContainer>
        <CheckBoxContainer>
          <FormLabel>Car Status</FormLabel>
          <CheckBoxContent>
            <CheckBoxLabel>
              <Checkbox
                type="radio"
                value="Shipping"
                name="car-status"
                onClick={(e) => props.setStatus(e.target.value)}
              />
              <span className="ml-231">Shipping</span>
            </CheckBoxLabel>
            <CheckBoxLabel>
              <Checkbox
                value="Scrap"
                name="car-status"
                onClick={(e) => props.setStatus(e.target.value)}
                type="radio"
              />
              <span className="ml-231">Scrap</span>
            </CheckBoxLabel>
          </CheckBoxContent>
        </CheckBoxContainer>
      </FlexContainer>
      <InlineInputContainer>
        <FormLabel>Picture</FormLabel>
        <FlexContainer justifyContent="space-around">
          <FormInput
            marginTop
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => props.setPicture(e.target.files[0])}
          />
          <FormInput
            marginTop
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => props.setPicture_1(e.target.files[0])}
          />
          <FormInput
            marginTop
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => props.setPicture_2(e.target.files[0])}
          />
        </FlexContainer>
      </InlineInputContainer>
    </>
  );
};

export default CarParking;
