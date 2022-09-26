import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoImages, IoTrashOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const ActionContainer = styled.div`
  display: flex;
  border-radius: 0.5rem;
  background-color: #4d6fad;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  padding: 1rem;
`;
export const DefaultButton = styled.button`
  background-color: ${(props) => (props.bgColor ? "#4d6fad" : "white")};
  border-color: transparent;
  border-radius: 0.5rem;
  color: ${(props) => (props.Color ? "white" : "black")};
  border-width: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: 400ms all ease;
  transition-duration: 0.15s;
  cursor: pointer;
  &:hover {
    background-color: #1244a0;
    color: white;
  }
`;
export const Button = styled(Link)`
  background-color: ${(props) => (props.bgColor ? "#4d6fad" : "white")};
  border-color: transparent;
  border-radius: 0.5rem;
  color: ${(props) => (props.Color ? "white" : "black")};
  border-width: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: 400ms all ease;
  transition-duration: 0.15s;
  cursor: pointer;
  &:hover {
    background-color: #1244a0;
    color: white;
  }
`;
export const AddIcon = styled(AiOutlinePlus)`
  display: block;
  vertical-align: middle;
  height: 1rem;
  margin-left: 0.5rem;
  margin-right: -0.25rem;
  width: 1rem;
`;

export const PaginationContainer = styled.div`
  letter-spacing: 0.025em;
  text-transform: uppercase;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: grid;
  border-top-width: 1px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(9, minmax(0, 1fr));
  }
  background: #4d6fad;
`;
export const FirstSpan = styled.span`
  grid-column: span 3 / span 3;
  align-items: center;
  display: flex;
  color: white;
`;
export const SecondSpan = styled.span`
  grid-column: span 2 / span 2;
`;
export const ThirdSpan = styled.span`
  display: flex;
  margin-top: 0.5rem;
  grid-column: span 4 / span 4;
  background: #4d6fad;
  @media (min-width: 640px) {
    justify-content: flex-end;
    margin-top: auto;
  }
`;
export const NumberListing = styled.ul`
  display: inline-flex;
  align-items: center;
`;
export const ArrowListContainer = styled.button`
  border-radius: 0.375rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background: transparent;
`;
export const ArrowIcon = styled(IoIosArrowBack)`
  display: block;
  vertical-align: middle;
  height: 1rem;
  width: 1rem;
`;
export const NumberList = styled.button`
  border-radius: 0.375rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  cursor: pointer;
`;

export const EditIcon = styled(MdEdit)`
  display: block;
  vertical-align: middle;
  height: 1.25rem;
  width: 1.25rem;
  color: #bcea31;
`;
export const DeleteIcon = styled(IoTrashOutline)`
  display: block;
  vertical-align: middle;
  height: 1.25rem;
  width: 1.25rem;
  color: #d60e0e;
`;
export const ImageIcon = styled(IoImages)`
  display: block;
  vertical-align: middle;
  height: 1.25rem;
  width: 1.25rem;
  color: white;
`;

export const SaveButton = styled.input`
  width: 100%;
  justify-content: center;
  background-color: white;
  border-color: transparent;
  border-radius: 0.5rem;
  border-width: 1px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: 400ms all ease;
  transition-duration: 0.15s;
  cursor: pointer;
  &:hover {
    background-color: #1244a0;
    color: white;
  }
  &:disabled {
    background: #e8e8e8 !important;
    cursor: wait;
  }
`;
