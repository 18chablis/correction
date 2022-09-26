import styled from "styled-components";
const Button = styled.input`
  background-color: ${(props) => props.bgColors};
  font-size: 20px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 40px;
`;

export default Button;