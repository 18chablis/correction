import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
const Close = styled(AiOutlineClose)`
  position: absolute;
  right: 1em;
  top: 0.5em;
  cursor: pointer;
`;
const OrderFilter = (props) => {
  return (
    <div style={{ display: props.show ? " block" : "none" }} className="filter">
      <div className="filter_wrapper">
        <div className="filter_body">
          <Close onClick={props.handleFilterBox} />
          <div className="currency">
            <p>Currency: </p>
            <div className="box">
              <label>USD</label>
              <input
                onChange={(e) => props.setCurrency(e.target.value)}
                type="radio"
                name="currency"
                value="USD"
              />
              <label>CAD</label>
              <input
                onChange={(e) => props.setCurrency(e.target.value)}
                type="radio"
                name="currency"
                value="CAD"
              />
            </div>
          </div>
          <div className="dmy_box">
            <p>D|W|M: </p>
            <div className="box">
              <label>Day</label>
              <input
                onChange={(e) => props.setRules(e.target.value)}
                type="radio"
                name="rules"
                value="day"
              />
              <label>Week</label>
              <input
                onChange={(e) => props.setRules(e.target.value)}
                type="radio"
                name="rules"
                value="week"
              />
              <label>Month</label>
              <input
                onChange={(e) => props.setRules(e.target.value)}
                type="radio"
                name="rules"
                value="month"
              />
            </div>
          </div>
          <div className="payment">
            <p>Payment Status: </p>
            <div className="box">
              <label>Not Paid</label>
              <input
                onChange={(e) => props.setPaid(e.target.value)}
                type="radio"
                name="paid"
                value="Not Paid"
              />
              <label>Partially Paid</label>
              <input
                onChange={(e) => props.setPaid(e.target.value)}
                type="radio"
                name="paid"
                value="Partially Paid"
              />
              <label>Paid</label>
              <input
                onChange={(e) => props.setPaid(e.target.value)}
                type="radio"
                name="paid"
                value="Paid"
              />
            </div>
          </div>
        </div>
        <input
          onClick={props.handleSearch}
          className="filter_button"
          type="submit"
          value={props.disable ? "Searching" : "Search"}
          style={{
            background: props.disable && "#fff",
            color: props.disable && "#000",
          }}
        />
      </div>
    </div>
  );
};

export default OrderFilter;
