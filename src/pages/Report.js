import React, { useState } from "react";
import useModal from "../components/useModal";
import moment from "moment";
import {
  Container,
  FormContainer,
  FormInput,
  FormLabel,
  InputContentSecond,
  Main,
  Overview,
  SelectContainer,
  StyledOption,
  TitleText,
} from "../utils/Main";
import Modal from "../components/modals/Modal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  ActionContainer,
  AddIcon,
  DefaultButton,
  SaveButton,
} from "../utils/Action";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils/Utils";
import ReactPaginate from "react-paginate";
import { clearMessage } from "../actions/error.action";
import {
  getDailyOrderOnCurrency,
  getDailyTotalOnCurrency,
  getMonthlyOrderOnCurrency,
  getMonthlyTotalOnCurrency,
  getWeeklyOrderOnCurrency,
  getWeeklyTotalOnCurrency,
} from "../actions/orderTotal.action";
import { sendReport } from "../actions/report.action";
import { reportRulesOptions } from "../utils/Options";
import OrderFilter from "../components/OrderFilter";
function Report() {
  const { message } = useSelector((state) => state.message);
  const { isShowing, toggle } = useModal();
  const [currency, setCurrency] = useState("");
  const [paid, setPaid] = useState("");
  const [rules, setRules] = useState("");
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);
  const [subject, setSubject] = useState("");
  const [receiver_mail, setReceiverMail] = useState("");
  const [content, setContent] = useState(null);
  const [state] = useState({
    currentPage: 1,
  });
  let limit = 50;
  const { orders } = useSelector((state) => state.orderReducer);
  const { dailyTotalOnCurrency } = useSelector((state) => state.orderReducer);
  const { weeklyTotalOnCurrency } = useSelector((state) => state.orderReducer);
  const { monthlyTotalOnCurrency } = useSelector((state) => state.orderReducer);
  let dispatch = useDispatch();
  const handleSubject = (e) => {
    e.preventDefault();
    setSubject(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    const reset = () => {
      setSubject("");
      setReceiverMail("");
      setContent(null);
    };
    const report = new FormData();
    report.append("subject", subject);
    report.append("receiver_mail", receiver_mail);
    report.append("content", content);
    dispatch(sendReport(report));
    reset();
    setTimeout(function () {
      setDisable(false);
      dispatch(clearMessage());
    }, 5000);
  };

  const handlePage = async (e, data) => {
    let page = data.selected + 1;
    if (e.target.value === "day") {
      await dispatch(getDailyOrderOnCurrency(currency, page));
    }
    if (e.target.value === "week") {
      await dispatch(getWeeklyOrderOnCurrency(currency, page));
    }
    if (e.target.value === "monthly") {
      await dispatch(getMonthlyOrderOnCurrency(currency, page));
    }
  };
  const printDocument = () => {
    document.getElementById("tbody-style").style.display = "unset";
    const input = document.getElementById("pdf-div");
    html2canvas(input, {
      scale: 1.3,
      dpi: 1200,
    }).then((canvas) => {
      var imgWidth = 190;
      var imgHeight = canvas.height / 6;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight, "FAST");
      pdf.save("orderReport.pdf");
      document.getElementById("tbody-style").style.display = "block";
    });
  };

  const handleFilterBox = () => {
    setShow(!show);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setDisable(true);
    if (rules === "day") {
      dispatch(getDailyTotalOnCurrency(currency, paid));
      dispatch(getDailyOrderOnCurrency(currency, paid, state.currentPage));
    }
    if (rules === "week") {
      dispatch(getWeeklyTotalOnCurrency(currency, paid));
      dispatch(getWeeklyOrderOnCurrency(currency, paid, state.currentPage));
    }
    if (rules === "month") {
      dispatch(getMonthlyTotalOnCurrency(currency, paid));
      dispatch(getMonthlyOrderOnCurrency(currency, paid, state.currentPage));
    }
    setTimeout(function () {
      setDisable(false);
    }, 2000);
  };
  return (
    <Main>
      <Container>
        {message ? (
          <div style={{ zIndex: "999999" }} className="success">
            {message}
          </div>
        ) : null}
        <TitleText>Report</TitleText>
        <ActionContainer>
          <DefaultButton onClick={toggle} type="button">
            <span>Create Report</span>
            <AddIcon />
          </DefaultButton>
          <DefaultButton onClick={handleFilterBox} type="button">
            <span>Filter</span>
            <AddIcon />
          </DefaultButton>
          <OrderFilter
            show={show}
            handleFilterBox={handleFilterBox}
            setCurrency={setCurrency}
            setRules={setRules}
            disable={disable}
            handleSearch={handleSearch}
            setPaid={setPaid}
          />
        </ActionContainer>
        <button onClick={printDocument} className="btn-pdf">
          Generate pdf
        </button>
        <Overview id="pdf-div">
          <table>
            <thead>
              <tr>
                <th className="px-py" scope="col">
                  Order Type
                </th>
                <th className="px-py" scope="col">
                  Overdue
                </th>
                <th className="px-py" scope="col">
                  Amount paid
                </th>
                <th className="px-py" scope="col">
                  Client name
                </th>
                <th className="px-py" scope="col">
                  Status
                </th>
                <th className="px-py" scope="col">
                  created by
                </th>
                <th className="px-py" scope="col">
                  created on
                </th>
              </tr>
            </thead>
            <tbody className="w-full-overflow" id="tbody-style">
              {!isEmpty(orders) &&
                orders.data.data.map((order) => (
                  <tr  key={order.id}>
                    <td className="px-py">
                      <a href="#d">{order.order_type}</a>
                    </td>
                    <td className="px-py">
                      <a href="#d">{order.overdue}</a>
                    </td>
                    <td className="px-py">
                      <a href="#e">{order.amount_paid}</a>
                    </td>
                    <td className="px-py">
                      <a href="#d">{order.client.full_name}</a>
                    </td>
                    <td className="px-py">
                      <a href="#d">{order.paid}</a>
                    </td>
                    <td className="px-py">
                      <a href="#e">{order.user.name}</a>
                    </td>
                    <td className="px-py">
                      <a href="#d">{moment(order.created_at).format("LL")}</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={!isEmpty(orders) && Math.ceil(orders.data.total / limit)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePage}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"page-active"}
          />
          {rules === "day" && (
            <>
              <span className="totalSpan">
                Total:{" "}
                {!isEmpty(dailyTotalOnCurrency) && dailyTotalOnCurrency.data}
                {currency === "USD" ? (
                  <p style={{ marginLeft: "10px" }}>USD</p>
                ) : (
                  <p style={{ marginLeft: "10px" }}>CAD</p>
                )}
              </span>
            </>
          )}
          {rules === "week" && (
            <span className="totalSpan">
              Total:{" "}
              {!isEmpty(weeklyTotalOnCurrency) && weeklyTotalOnCurrency.data}
              {currency === "USD" ? (
                <p style={{ marginLeft: "10px" }}>USD</p>
              ) : (
                <p style={{ marginLeft: "10px" }}>CAD</p>
              )}
            </span>
          )}
          {rules === "month" && (
            <span className="totalSpan">
              Total:{" "}
              {!isEmpty(monthlyTotalOnCurrency) && monthlyTotalOnCurrency.data}
              {currency === "USD" ? (
                <p style={{ marginLeft: "10px" }}>USD</p>
              ) : (
                <p style={{ marginLeft: "10px" }}>CAD</p>
              )}
            </span>
          )}
        </Overview>
      </Container>
      <Modal isShowing={isShowing} hide={toggle}>
        <FormContainer onSubmit={handleSubmit}>
          <InputContentSecond>
            <FormLabel>Receiver of report</FormLabel>
            <FormInput
              type="email"
              placeholder="something@anything.something"
              onChange={(e) => setReceiverMail(e.target.value)}
            />
          </InputContentSecond>
          <InputContentSecond>
            <FormLabel>Subject</FormLabel>
            <SelectContainer onChange={handleSubject}>
              {reportRulesOptions.map((option) => (
                <StyledOption key={option.value} value={option.value}>
                  {option.label}
                </StyledOption>
              ))}
            </SelectContainer>
          </InputContentSecond>
          <InputContentSecond>
            <FormLabel>Attached file</FormLabel>
            <FormInput
              type="file"
              accept=".pdf"
              onChange={(e) => setContent(e.target.files[0])}
              placeholder="pdf file"
            />
          </InputContentSecond>
          <InputContentSecond>
            <SaveButton
              disabled={disable}
              type="submit"
              value={disable ? "Sending ... " : "Send"}
            />
          </InputContentSecond>
        </FormContainer>
      </Modal>
    </Main>
  );
}

export default Report;
