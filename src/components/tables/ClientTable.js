import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../../utils/Action";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { FlexContainer, IconContainer, IconContainerRight } from "../Main";
import { deleteClient, getClients } from "../../actions/client.action";
import { isEmpty } from "../../utils/Utils";
import moment from "moment";
import { getUser } from "../../actions/user.action";

const ClientTable = (props) => {
  const [dashboardView, setDashboardView] = useState(props.dashboardView);
  const [clientView, setClientView] = useState(props.clientView);
  let dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const { clients } = useSelector((state) => state.clientReducer);
  const [state] = useState({
    currentPage: 1,
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the client?")) {
      await dispatch(deleteClient(id));
      dispatch(getClients());
    }
  };

  let limit = 50;
  useEffect(() => {
    setDashboardView(dashboardView);
    setClientView(clientView);
    dispatch(getClients(state.currentPage));
    dispatch(getUser());
  }, [dispatch, dashboardView, clientView, state.currentPage]);
  const handlePage = async (data) => {
    let page = data.selected + 1;
    await dispatch(getClients(page));
  };

  return (
    <div role="region" aria-labelledby="Caption01" tabIndex="0">
      <table>
        {dashboardView && (
          <>
            <thead>
              <tr>
                <th scope="col">name</th>
                <th scope="col">Email</th>
                <th scope="col">Location</th>
                <th scope="col">address</th>
                <th scope="col">Created at</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(clients) &&
                clients.data.data.map((client) => (
                  <tr id="row-full-width" key={client.id}>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {client.full_name}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {client.email}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {client.location}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {client.address}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {moment(client.created_at).format("LL")}
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        )}

        {clientView && (
          <>
            <caption id="Caption01">The Client table</caption>
            <thead>
              <tr>
                <th scope="col">name</th>
                <th scope="col">Email</th>
                <th scope="col">Telephone</th>
                <th scope="col">DOB</th>
                <th scope="col">location</th>
                <th scope="col">address</th>
                <th scope="col">Created at</th>
                <th scope="col">Updated at</th>
                {/* {user.user.role === "admin" && <th scope="col">Action</th>} */}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(clients) &&
                clients.data.data.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        <strong>{client.full_name}</strong>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {client.email}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {client.phone}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {client.dob}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {client.location}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {client.address}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/client/view-profile/${client.id}`}>
                        {moment(client.created_at).format("LL")}
                      </Link>
                    </td>
                    {/* {user.user.role === "admin" && ( */}
                    <td>
                      {moment(client.updated_at).format("LLL")} <br /> By{" "}
                      {client.user.name}
                    </td>
                    {/* )} */}
                    <td>
                      <FlexContainer>
                        <IconContainer>
                          <Link to={"/client/update/" + client.id}>
                            <EditIcon />
                          </Link>
                        </IconContainer>
                        {user.user.role === "admin" && (
                          <IconContainerRight>
                            <DeleteIcon
                              onClick={() => handleDelete(client.id)}
                            />
                          </IconContainerRight>
                        )}
                      </FlexContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        )}
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={!isEmpty(clients) && Math.ceil(clients.data.total / limit)}
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
    </div>
  );
};

export default ClientTable;
