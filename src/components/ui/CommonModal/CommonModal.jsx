import classes from "./CommonModal.module.css";

function CommonModal({children}) {
    return (
        <section className={classes['modal']}>
            <div className={classes['modal-content']}>
                {children}
            </div>
        </section>
    )
}

export default CommonModal;