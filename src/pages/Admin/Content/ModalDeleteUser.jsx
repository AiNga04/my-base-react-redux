import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUserById } from "../../../services/api/UserService";
import { toast } from "react-toastify";

function ModalDeleteUser(props) {
  const {
    show,
    handleClose,
    fetchUserListWithPaginate,
    dataDelete,
    resetDeleteUser,
    setCurrentPage,
    LIMIT_USER_LIST,
  } = props;

  const handleClickClose = () => {
    handleClose();
    resetDeleteUser();
  };

  const handleDeleteUser = async () => {
    console.log(dataDelete.id);
    try {
      const data = await deleteUserById(dataDelete.id);
      if (data && data.EC === 0) toast.success(data.EM);
      if (data && data.EC !== 0) toast.error(data.EM);
      setCurrentPage(1);
      fetchUserListWithPaginate(1, LIMIT_USER_LIST);
      handleClickClose();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user. Email ={" "}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;
