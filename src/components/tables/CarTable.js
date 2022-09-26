import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCar, getCars } from "../../actions/car.action";
import { DeleteIcon, ImageIcon } from "../../utils/Action";
import { isEmpty } from "../../utils/Utils";
import { FlexContainer, IconContainerRight } from "../Main";
import moment from "moment";
import { getUser } from "../../actions/user.action";

function CarTable() {
  let dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carReducer);
  const user = useSelector((state) => state.userReducer);
  const [state] = useState({
    currentPage: 1,
  });
  let limit = 50;
  useEffect(() => {
    dispatch(getCars(state.currentPage));
    dispatch(getUser());
  }, [dispatch, state.currentPage]);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      await dispatch(deleteCar(id));
      dispatch(getCars(state.currentPage));
    }
  };
  const handlePage = async (data) => {
    let page = data.selected + 1;
    await dispatch(getCars(page));
  };
  return (
    <div role="region" aria-labelledby="Caption01" tabIndex="0">
      <table>
        <caption id="Caption01">Client Cars table</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Owner</th>
            <th scope="col">Year</th>
            <th scope="col">Pictures</th>
            <th scope="col">Status</th>
            <th scope="col">Created at</th>
            <th scope="col">Updated at</th>
            {user.user.role === "admin" && <th scope="col">Action</th>}
          </tr>
        </thead>
        <tbody>
          {!isEmpty(cars) &&
            cars.data.data.map((car) => (
              <tr key={car.id}>
                <td>
                  <strong>{car.car_name}</strong>
                </td>
                <td>
                  {/* <Link to={`/client/view-profile/`}> */}
                  <strong>{car.full_name}</strong>
                  {/* </Link> */}
                </td>
                <td>{car.year}</td>
                <td>
                  <FlexContainer>
                    <Link to={`/car/images/${car.id}`}>
                      <IconContainerRight>
                        <ImageIcon />
                      </IconContainerRight>
                    </Link>
                  </FlexContainer>
                </td>
                <td>{car.status}</td>
                <td>{moment(car.created_at).format("LL")}</td>
                {/* {user.user.role === "admin" && ( */}
                <td>{moment(car.updated_at).format("LL")}</td>
                {/* )} */}
                {user.user.role === "admin" && (
                  <td>
                    <FlexContainer>
                      <IconContainerRight>
                        <DeleteIcon onClick={() => handleDelete(car.id)} />
                      </IconContainerRight>
                    </FlexContainer>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={!isEmpty(cars) && Math.ceil(cars.data.total / limit)}
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
}

export default CarTable;
