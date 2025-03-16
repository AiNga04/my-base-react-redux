import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./ModalCreateUser.scss";
import { toast } from "react-toastify";
import { getUpdateUser } from "../../../../services/api/UserService";
import _ from "lodash";

function ModalUpdateUser(props) {
  const {
    show,
    handleClose,
    fetchUserListWithPaginate,
    dataUpdate,
    reserUpdateUser,
    currentPage,
    LIMIT_USER_LIST,
  } = props;

  const handleClickClose = () => {
    setEmail("");
    setUsername("");
    setRole("USER");
    setImage(null);
    setImagePreview(null);
    handleClose();
    setErrors({});
    reserUpdateUser();
  };

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value) {
          error = "Username is required";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setId(dataUpdate.id);
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      if (dataUpdate.image) {
        setImagePreview(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitUser = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("username", username);
    formData.append("role", role);
    formData.append("userImage", image);

    try {
      const data = await getUpdateUser(id, username, role, image);
      if (data && data.EC === 0) toast.success(data.EM);
      console.log(data);
      if (data && data.EC !== 0) toast.error(data.EM);
      fetchUserListWithPaginate(currentPage, LIMIT_USER_LIST);
      handleClickClose();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClickClose}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="abc@example.com"
                  disabled
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Username"
                  value={username}
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={handleBlur}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom05">
                <Form.Label>Role</Form.Label>
                <br />
                <select
                  name="role"
                  id="role"
                  className="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom06">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  required
                  type="file"
                  onChange={handleChangeImage}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div
                as={Col}
                md="12"
                controlId="validationCustom07"
                className="image-preview"
              >
                <div className="preview-desc">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    "Preview Image"
                  )}
                </div>
              </div>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitUser}>
            Save User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUser;
