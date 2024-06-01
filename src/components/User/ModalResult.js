import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult, setIsShowAnswer } = props;

  const handleClose = () => setShow(false);

  const handleShowAnswers = () => {
    setIsShowAnswer(true);
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            Total Questions: <b>{dataModalResult.countTotal}</b>{" "}
          </div>
          <div className="">
            Total Correct Answers: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowAnswers}>
            Show Answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
