import { connect, useDispatch, useSelector } from "react-redux";
import UsersListStyle from "../styles/UsersList.module.css";
import { removeUser } from "../reducers/usersReducer";
import { useModal } from "./ModalContext";

function UsersList({ users }) {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const { setShowModal, setIsEditMode } = useModal();
  return (
    <div className={UsersListStyle.tableCont}>
      <div className={UsersListStyle.toolbar}>
        <p>Users</p>
        <button
          className={UsersListStyle.btn}
          onClick={(e) => {
            setShowModal(true);
          }}
        >
          Add User
        </button>
      </div>
      <div className={UsersListStyle.tabCont}>
        <table className={UsersListStyle.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className={UsersListStyle.tbody}>
            {isLoading ? (
              <tr>
                <td colSpan={3}>Loading...</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    <button
                      className={UsersListStyle.btn}
                      onClick={(e) => {
                        console.log(`Editing ${user.name}`);
                        setIsEditMode(true);
                        localStorage.setItem("user", JSON.stringify(user));
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className={UsersListStyle.btn}
                      onClick={(e) => {
                        console.log(`Deleting ${user.name}`);
                        dispatch(removeUser(user.id));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (state) => {
  return {
    removeUser: removeUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
