import styled from "styled-components";

export const Main = styled.main`
  display: block;
  overflow-y: auto;
  background: #ddd;
  height: 100%;
`;
export const Container = styled.div`
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  @media (min-width: 640px) {
    max-width: 640px;
  }
  @media (min-width: 768px) {
    max-width: 768px;
  }
  @media (min-width: 1024px) {
    max-width: 1024px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
  }
`;
export const TitleText = styled.h2`
margin-top: 1.5rem;
margin-bottom: 1.5rem;
font-size: 1.5rem
font-weight:600;
color: #4D6FAD;
`;

export const Overview = styled.div`
  border-radius: 0.5rem;
  // overflow: hidden;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 5%);
  width: 100%;
  margin-bottom: 2rem;
  overflow-x: auto;
`;
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
`;

export const IconContainer = styled.div`
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  line-height: 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  justify-content: space-between;
  align-items: center;
  display: flex;
  border-radius: 0.5rem;
  color: white;
`;
export const IconContainerRight = styled(IconContainer)`
  --space-x-reverse: 0;
  margin-right: calc(1rem * var(--space-x-reverse));
  margin-left: calc(1rem * (1 - var(--space-x-reverse)));
`;

export const FormContainer = styled.div`
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
`;

export const InputContent = styled.label`
  display: block;
  font-size: 0.875rem;
`;

export const InputContentSecond = styled(InputContent)`
  margin-top: 1rem;
`;

export const FormInput = styled.input`
  border-width: 1px;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  line-height: 1.5;
  display: block;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  width: 100%;
`;

export const CheckBoxContainer = styled.div`
  font-size: 0.875rem;
`;
export const CheckBoxContent = styled.div`
  margin-top: 0.5rem;
`;
export const CheckBoxLabel = styled.label`
  display: inline-flex;
  align-items: center;
`;

export const Checkbox = styled.input`
  user-select: none;
  flex-shrink: 0;
  border-radius: 100%;
  height: 1em;
  width: 1em;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  background-color: #fff;
  border-color: #e2e8f0;
  border-width: 1px;
  overflow: visible;
`;
