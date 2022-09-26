import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../actions/user.action";
import moment from "moment";
import { FlexContainer, IconContainerRight } from "../../utils/Main";
import { DeleteIcon } from "../../utils/Action";
import { isEmpty } from "../../utils/Utils";

const UserTable = () => {
  let dispatch = useDispatch();
  const { users } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      await dispatch(deleteUser(id));
      dispatch(getUsers());
    }
  };
  return (
    <div role="region" aria-labelledby="Caption01" tabIndex="0">
      <table>
        <thead>
          <tr id="row-full">
            <th className="px-py" scope="col">
              Username
            </th>
            <th className="px-py" scope="col">
              Email
            </th>
            <th className="px-py" scope="col">
              Role
            </th>
            <th className="px-py" scope="col">
              Created at
            </th>
            <th className="px-py" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(users) &&
            users.map((user) => (
              <tr id="row-full" key={user.id}>
                <td className="px-py">
                  <strong>{user.name}</strong>
                </td>
                <td className="px-py">{user.email}</td>
                <td className="px-py">{user.role}</td>
                <td className="px-py">
                  {moment(user.created_at).format("LL")}
                </td>
                <td className="px-py">
                  <FlexContainer>
                    <IconContainerRight>
                      <DeleteIcon onClick={() => handleDelete(user.id)} />
                    </IconContainerRight>
                  </FlexContainer>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
