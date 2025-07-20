import { useEffect, useState } from "react";
import UsersList from "./components/UsersList";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./reducers/usersReducer";
import UserForm from "./components/UserForm";
import Modal from "./components/Modal";

function App() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect((e) => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="app">
      <UsersList users={users} />
      <Modal>
        <UserForm />
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (state) => {
  return {
    fetchUsers: fetchUsers,
  };
};

export default connect(mapDispatchToProps)(App);
