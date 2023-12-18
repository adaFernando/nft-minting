import { Modal, Button } from 'react-bootstrap';

function CustomModal(props) {
  return (
    <Modal
      {...props}
      style={{ maxWidth: '300px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <div className="modal-content" style={{ backgroundColor: '#1e1e1e'}}>
      <Modal.Header  style={{color: "yellow", border: 'none'}} closeButton>
        <Modal.Title style={{color: "yellow", border: 'none'}}>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}
      </Modal.Body>
      <Modal.Footer style={{color: "yellow", border: 'none'}}>
        <Button variant="warning" style={{color: "white"}} onClick={props.onClickConnectButton}>
          Connect
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
      </div>
    </Modal>
  );
}

export default CustomModal;