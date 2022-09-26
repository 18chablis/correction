import React from "react";
import {
  Container,
  FlexContainer,
  Main,
  SelectContainer,
  StyledOption,
  TitleText,
} from "../utils/Main";
import { ActionContainer } from "../utils/Action";
import CarTable from "../components/tables/CarTable";
import { useDispatch } from "react-redux";
import {
  getStatusShipping,
  getStatusScrap,
  getCars,
} from "../actions/car.action";
import { carStatus } from "../utils/Options";

function Car() {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    e.preventDefault();
    if (e.target.value === "Shipping") {
      dispatch(getStatusShipping());
    }
    if (e.target.value === "Scrap") {
      dispatch(getStatusScrap());
    }
    if (e.target.value === "null") {
      dispatch(getCars(1));
    }
  };

  return (
    <Main>
      <Container>
        <TitleText>Car</TitleText>
        <ActionContainer justifyContent="end">
          <FlexContainer>
            <SelectContainer onChange={handleFilter}>
              {carStatus.map((option) => (
                <StyledOption key={option.value} value={option.value}>
                  {option.label}
                </StyledOption>
              ))}
            </SelectContainer>
          </FlexContainer>
        </ActionContainer>
        <CarTable />
      </Container>
    </Main>
  );
}

export default Car;
