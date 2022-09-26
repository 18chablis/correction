import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { AiFillPrinter } from "react-icons/ai";

export const Main = styled.main`
  display: block;
  margin-top: 5rem;
  overflow-y: auto;
  background: #ddd;
  height: ${(props) => (props.mainHeight ? "88vh" : "100%")};
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
  font-size: 2.5rem;
  font-weight: 600;
  color: #4d6fad;
  font-family: "Amiri", serif;
`;

export const Overview = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 5%);
  width: 100%;
  margin-bottom: 2rem;
`;
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-top: ${(props) => props.marginTop};
  justify-content: ${(props) => props.justifyContent};
  flex-direction: ${(props) => props.flexDirection};
  padding: ${(props) => props.padding};
  margin-bottom: ${(props) => props.marginBottom};
  align-items: ${(props) => props.alignItems};
  flex-wrap: ${(props) => props.flexWrap};
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
`;
export const IconContainerRight = styled(IconContainer)`
  --space-x-reverse: 0;
  margin-right: calc(1rem * var(--space-x-reverse));
  margin-left: calc(1rem * (1 - var(--space-x-reverse)));
`;

export const FormContainer = styled.form`
  border-radius: 0.5rem;
  padding-top: ${(props) => (props.paddingTop ? "0" : "0.75rem")};
  padding-bottom: ${(props) => (props.paddingBottom ? "0" : "0.75rem")};
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const InputContent = styled.label`
  display: block;
  font-size: 0.875rem;
`;

export const InputContentSecond = styled(InputContent)`
  margin-top: ${(props) => (props.marginTop ? "0.2rem" : "1rem")};
`;
export const InlineInputContainer = styled(InputContent)`
  margin-top: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;

  @media (max-width: 580px) {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
`;

export const FormInput = styled.input`
  border-width: 1px;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  line-height: 1.5;
  display: block;
  font-size: 0.875rem;
  margin-top: ${(props) => (props.marginTop ? "0" : "0.25rem")};
  width: 100%;
  @media (max-width: 580px) {
    width: 100%;
  }
`;
export const Textarea = styled.textarea`
  border-width: 1px;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  line-height: 1.5;
  display: block;
  font-size: 0.875rem;
  margin-top: ${(props) => (props.marginTop ? "0" : "0.25rem")};
  width: 100%;
  @media (max-width: 580px) {
    width: 100%;
  }
`;
// export const InlineFormInput = styled(FormInput)`
//   width: 100%;
// `;

export const CheckBoxContainer = styled.div`
  font-size: 0.875rem;
  color: white;
  margin-top: ${(props) => (props.marginTop ? "0.3rem" : "1rem")};
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

export const FormLabel = styled.span`
  color: white;
  font-size: 1rem;
  margin-right: ${(props) => props.marginRight};
  font-weight: ${(props) => props.fontWeight};
  @media (max-width: 580px) {
    font-size: 0.7rem;
  }
`;

export const SelectContainer = styled.select`
  color: white;
  display: block;
  width: 100%;
  background-color: rgb(77, 111, 173, 1);
  border-color: rgb(221, 221, 221, 1);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  line-height: 1.5;
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
  border-width: 1px;
  border-radius: 0.25rem;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  background-repeat: no-repeat;
  appearance: none;
  -webkit-print-color-adjust: exact;
`;
export const Wrapper = styled.div`
  width: 400px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  background: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  @media (max-width: 768px) {
    width: 300px;
  }
`;
export const TextField = styled.input`
  height: 100%;
  width: 100%;
  padding-left: 15px;
  outline: none;
  font-size: 17px;
  border-radius: 20px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 400ms ease;
`;
export const StyledLink = styled(Link)`
  color: white;
  background-color: #ddd;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 400;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;
export const Button = styled.input`
  background-color: ${(props) => props.bgColors};
  font-size: 20px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 40px;
`;
export const Field = styled.div`
  height: ${(props) => (props.height ? "20px" : "50px")};
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? "null" : "space-between"};
  align-items: center;
`;
export const Info = styled.div`
  color: ${(props) => props.color};
  margin: 4px auto;
`;
export const StyledOption = styled.option`
  font-weight: normal;
  display: block;
  white-space: nowrap;
  min-height: 1.2em;
  padding: 0px 2px 1px;
  text-transform: capitalized;
`;
export const Title = styled.p`
  color: white;
  font-size: ${(props) => (props.pFSize ? "22px" : "14px")};
  text-align: ${(props) => props.textAlign};
  margin-top: ${(props) => props.marginTop};
`;

export const StyledUl = styled.ul`
  background: transparent;
  border: 1px solid #fff;
  border-top-width: 0;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 0;
  color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;
export const StyledLi = styled.li`
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
    font-weight: 700;
    background-color: #fff;
    color: #4d6fad;
  }
  &: not(: last-of-type);
   {
    border-bottom: 1px solid #999;
  }
`;

export const CenteredDiv = styled.div`
  width: 700px;
  margin-top: 40px;
  margin-right: auto;
  margin-left: auto;
  top: 50%;
  left: 50%;
  padding: 20px;
  border-radius: 5px;
  background: #4d6fad; ;
`;

export const Card = styled.div`
  border-radius: 6px;
  padding: 1rem;
  width: ${(props) => (props.cardWidth ? "100%" : "600px")};
  border: 1px solid black;
  margin-top: ${(props) => (props.marginTop ? "0" : "40px")};
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 40px;
  top: 50%;
  left: 50%;
  background: ${(props) => (props.bgColor ? "white" : "#4d6fad")};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding-left: 2rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.875rem;
  border-width: 0;
  border-radius: 0.375rem;
  line-height: 1.5;
`;
export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 0%;
`;
export const SearchContent = styled.div`
  width: 100%;
  position: relative;
  max-width: 36rem;
  margin-right: 1.5rem;
`;
export const SearchIcon = styled(IoIosSearch)`
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
  display: block;
`;
export const PrintIcon = styled(AiFillPrinter)`
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
  display: block;
`;
export const Text = styled.p`
  margin: 0.4rem 0rem;
  font-size: 16px;
  font-weight: 600;
`;
