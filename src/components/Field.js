import styled from "styled-components";
const Field = styled.div`
  height: ${(props) => props.height ? "20px" : "50px"};
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: ${(props) => props.justifyContent ? "null" : "space-between"};
  align-items: center;
`;
export default Field;
