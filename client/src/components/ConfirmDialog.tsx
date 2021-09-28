import { Button, Modal } from "react-bootstrap";

interface DialogProps {
    show: boolean;
    message?: string;
    confirm: () => void;
    dismiss: () => void;
}

export default function ConfirmationDialog({show,message,confirm,dismiss}:DialogProps) {
    return (
        <>
            <Modal show={show}>
                <Modal.Header closeButton onClick={dismiss}>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={dismiss}>
                        No
                    </Button>
                    <Button variant="primary" onClick={confirm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

