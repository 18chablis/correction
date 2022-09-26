import html2canvas from "html2canvas";
import moment from "moment";
import jsPDF from "jspdf";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { showHistoryToPrint } from "../actions/orderHistory.action";
import { DefaultButton } from "../utils/Action";
import {
  Card,
  Container,
  FlexContainer,
  Main,
  PrintIcon,
  Text,
} from "../utils/Main";
import { isEmpty } from "../utils/Utils";

const OrderReceipt = () => {
  const { id } = useParams();
  const { orderReceipt } = useSelector((state) => state.orderReducer);

  const dispatch = useDispatch();
  const history = useHistory();
  const GoBack = () => {
    history.goBack();
  };
  useEffect(() => {
    dispatch(showHistoryToPrint(id));
  }, [dispatch, id]);
  const handlePrint = () => {
    const input = document.getElementById("receipt-div");
    html2canvas(input, {
      scale: 1.3,
      dpi: 1200,
    }).then((canvas) => {
      var imgWidth = 150;
      var imgHeight = canvas.height / 4;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "JPEG", 30, 10, imgWidth, imgHeight, "FAST");
      pdf.save("receipt.pdf");
    });
    //Get the HTML of div
    var divElements = document.getElementById("receipt-div").innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;
    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
      "<html><head><title></title></head><body>" + divElements + "</body>";
    //Print Page
    window.print();
    //Restore orignal HTML
    document.body.innerHTML = oldPage;
  };
  return (
    <Main>
      <Container>
        <FlexContainer justifyContent="space-between" marginTop="1rem">
          <DefaultButton
            id="print-icon"
            onClick={handlePrint}
            type="button"
            bgColor
            Color
          >
            <PrintIcon />
          </DefaultButton>
          <DefaultButton onClick={() => GoBack()} type="button" bgColor Color>
            <span>Go back</span>
          </DefaultButton>
        </FlexContainer>
        <Card id="receipt-div" bgColor>
          <FlexContainer alignItems="center" justifyContent="center">
            <img
              src={`${process.env.PUBLIC_URL}/hermann-logo-with-no-background.png`}
              alt="logo"
              className="logo"
            />
          </FlexContainer>
          <br />
          {/* <FlexContainer justifyContent="space-between">
            <div>
              <h4>Bill To : </h4>
              <Text>
                <strong>Name: </strong>
                {!isEmpty(orderReceipt) && (orderReceipt.data.order.[0].client.full_name).toUpperCase()}
              </Text>
              <Text>
                <strong>Order Type: </strong>
                {!isEmpty(orderReceipt) && orderReceipt.data.order.[0].order_type}
              </Text>
              <Text>
                <strong>Payment Date: </strong>
                {!isEmpty(orderReceipt) && moment(orderReceipt.data.order.[0].updated_at).format("MMM Do YY")}
              </Text>
            </div>
            <div>
              <h4>Order: </h4>
              <Text>
                <strong>Initial Price: </strong>
                {!isEmpty(orderReceipt) && orderReceipt.data.order.[0].price}
              </Text>
              <Text>
                <strong>Amount paid: </strong>
                {!isEmpty(orderReceipt) && orderReceipt.data.history.[0].new_amount_paid}
              </Text>
              {!isEmpty(orderReceipt) && orderReceipt.data.order.[0].shippings.[0] ? (
                <Text>
                <strong>Container number </strong>
                {!isEmpty(orderReceipt) && orderReceipt.data.order.[0].shippings.[0].container_number}
              </Text>
              ): (
                <br />
              )}              
              <br />
            </div>
            <div>
              <h4>Payment status :</h4>
              <Text>
                <strong>Status: </strong>
                {!isEmpty(orderReceipt) && orderReceipt.data.order.[0].paid}
              </Text>

              <Text>
                <strong>Overdue: </strong>
                {!isEmpty(orderReceipt) && orderReceipt.data.order.[0].overdue}
              </Text>
              <br />
              <br />
            </div>
          </FlexContainer> */}
        </Card>
      </Container>
    </Main>
  );
};

export default OrderReceipt;
