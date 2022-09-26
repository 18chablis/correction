import styled from "styled-components";

const Wrapper = styled.div`
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

export default Wrapper;
