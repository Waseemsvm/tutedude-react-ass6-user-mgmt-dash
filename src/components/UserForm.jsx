import { useState } from "react";
import { addUser, updateUser } from "../reducers/usersReducer";
import { connect, useDispatch, useSelector } from "react-redux";
import UserFormStyles from "../styles/UserFormStyles.module.css";
import { useModal } from "./ModalContext";

function UserForm() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { setShowModal, setIsEditMode, isEditMode } = useModal();
  const [formData, setFormData] = useState({
    name: isEditMode ? JSON.parse(localStorage.getItem("user")).name : "",
    email: isEditMode ? JSON.parse(localStorage.getItem("user")).email : "",
    username: isEditMode
      ? JSON.parse(localStorage.getItem("user")).username
      : "",
    id: isEditMode ? JSON.parse(localStorage.getItem("user")).id : "",
  });

  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    setIsEmailValid(isValidEmail());
  };

  const isValidEmail = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(formData.email);
  };

  return (
    <div className={UserFormStyles["form-cont"]}>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        {isEditMode ? "Update User" : "Add User"}
      </h2>
      <form
        className={UserFormStyles.form}
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (!isValidEmail()) return setIsEmailValid(false);
          else setIsEmailValid(true);

          if (!formData.username) return;
          if (!formData.name) return;

          if (isEditMode) {
            setIsEditMode(false);
            dispatch(updateUser({ ...formData }));
          } else dispatch(addUser({ ...formData }));
          setShowModal(false);
        }}
      >
        <div className={UserFormStyles["form-content"]}>
          <label htmlFor="name">Name :</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleFormData}
            required
          />
        </div>
        <div className={UserFormStyles["form-content"]}>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleFormData}
            onBlur={handleFormData}
            required
          />
        </div>
        <div className={UserFormStyles["form-content"]}>
          <label htmlFor="username">Username :</label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleFormData}
            required
          />
        </div>
        {!(formData.email && isEmailValid) && (
          <div className={UserFormStyles.error}>Please Enter a Valid Email</div>
        )}
        {!formData.username && (
          <div className={UserFormStyles.error}>
            Please Enter a Valid Username
          </div>
        )}
        {!formData.name && (
          <div className={UserFormStyles.error}>Please Enter a Valid Name</div>
        )}
        <div
          className={`${UserFormStyles["form-content"]} ${UserFormStyles.submit}`}
        >
          <button type="submit">
            {isEditMode ? "Update User" : "Add User"}
          </button>
          <button
            type="cancel"
            onClick={(e) => {
              setIsEditMode(false);
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (state) => {
  return {
    addUser: addUser,
    updateUser: updateUser,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
