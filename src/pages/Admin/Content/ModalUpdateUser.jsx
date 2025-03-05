import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./ModalCreateUser.scss";
import { toast } from "react-toastify";
import { PostCreateNewUser } from "../../../services/api/UserService";
import _ from "lodash";

function ModalCreateUser(props) {
  const { show, handleClose, fetchUserList, dataUpdate } = props;

  const handleClickClose = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setRole("USER");
    setImage(null);
    setImagePreview(null);
    handleClose();
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      if (dataUpdate.image) {
        setImagePreview(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitUser = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("role", role);
    formData.append("userImage", image);

    try {
      const data = await PostCreateNewUser(
        email,
        password,
        username,
        role,
        image
      );
      if (data && data.EC === 0) toast.success(data.EM);
      console.log(data);
      if (data && data.EC !== 0) toast.error(data.EM);
      fetchUserList();
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitUser}>
            Save User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;
