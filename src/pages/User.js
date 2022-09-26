import React, { useState } from "react";
import {
  Container,
  Main,
  TitleText,
  Checkbox,
  CheckBoxContainer,
  CheckBoxContent,
  CheckBoxLabel,
  FormContainer,
  FormInput,
  FormLabel,
  InputContent,
  InputContentSecond,
} from "../utils/Main";
import {
  ActionContainer,
  AddIcon,
  DefaultButton,
  SaveButton,
} from "../utils/Action";
import UserTable from "../components/tables/UserTable";

import Modal from "../components/modals/Modal";
import useModal from "../components/useModal";
import { register } from "../actions/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/user.action";
import { clearMessage } from "../actions/error.action";

const User = () => {
  const { isShowing, toggle } = useModal();
  const { message } = useSelector((state) => state.message);
  const [disable, setDisable] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    let passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    e.preventDefault();
    setDisable(true);
    const passwordMatch = checkPasswordMatch(password, password_confirmation);
    if (passwordMatch === true) {
      passwordConfirmError.innerHTML = "The password doesn't match";
      return;
    } else if (email === "") {
      window.alert("please provide an email address");
    } else {
      await dispatch(
        register({ name, email, password, password_confirmation, role })
      );
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    }

    dispatch(getUsers());
    setDisable(false);
    setTimeout(function () {
      setDisable(false);
      dispatch(clearMessage());
    }, 5000);
  };
  const checkPasswordMatch = (password, confirmPassword) => {
    return password !== confirmPassword ? true : false;
  };
  return (
    <Main>
      <Container>
        {message ? (
          <div style={{ zIndex: "999999" }} className="success">
            {message}
          </div>
        ) : null}
        <TitleText>Users</TitleText>
        <ActionContainer justifyContent="end">
          <DefaultButton onClick={toggle} type="button">
            <span>Add user</span>
            <AddIcon />
          </DefaultButton>
        </ActionContainer>
        <UserTable />
      </Container>
      <Modal isShowing={isShowing} hide={toggle}>
        <FormContainer onSubmit={handleSubmit}>
          <InputContent>
            <FormLabel>Username</FormLabel>
            <FormInput
              type="text"
              autocomplete="off"
              placeholder="Tony Stack"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputContent>
          <InputContentSecond>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              autocomplete="off"
              placeholder="tonystack@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContentSecond>
          <InputContentSecond>
            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              autocomplete="off"
              placeholder="*************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContentSecond>
          <InputContentSecond>
            <FormLabel>Password confirmation</FormLabel>
            <FormInput
              type="password"
              autocomplete="off"
              placeholder="************"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </InputContentSecond>
          <CheckBoxContainer>
            <FormLabel>Role</FormLabel>
            <CheckBoxContent>
              <CheckBoxLabel>
                <Checkbox
                  type="radio"
                  value="user"
                  name="role"
                  onClick={(e) => setRole(e.target.value)}
                />
                <span className="ml-231">User</span>
              </CheckBoxLabel>
              <CheckBoxLabel>
                <Checkbox
                  type="radio"
                  value="admin"
                  name="role"
                  onClick={(e) => setRole(e.target.value)}
                />
                <span className="ml-231">Admin</span>
              </CheckBoxLabel>
              <CheckBoxLabel>
                <Checkbox
                  type="radio"
                  value="manager"
                  name="role"
                  onClick={(e) => setRole(e.target.value)}
                />
                <span className="ml-231">Manager</span>
              </CheckBoxLabel>
            </CheckBoxContent>
          </CheckBoxContainer>
          <InputContentSecond>
            <SaveButton
              disabled={disable}
              type="submit"
              value={disable ? "Saving ..." : "Save"}
            />
          </InputContentSecond>
        </FormContainer>
      </Modal>
    </Main>
  );
};

export default User;
