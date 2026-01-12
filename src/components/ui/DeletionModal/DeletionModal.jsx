import Button from "../Button/Button.jsx";
import classes from "../CommonModal/CommonModal.module.css";

function DeletionModal({ isOpen, onClose, onConfirm, itemName }) {
    if (!isOpen) return null;

    return (
        <div className={classes['modal']}>
            <div className={classes['modal-content']}>
                <h3>Confirmation de suppression</h3>
                <p>Voulez-vous vraiment supprimer <strong>{itemName}</strong> ? Cette action est irréversible.</p>
                <div className="modal-actions">
                    <Button onClick={onClose} className={'green-btn'}>Annuler</Button>
                    <Button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={'blue-btn'}
                    >
                        Supprimer
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DeletionModal;
