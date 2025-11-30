import classes from './StepOverview.module.css';

function StepOverview({step}) {
    return (
        <div className={classes['step-overview']}>
            <div className={classes['step-overview-photo']}>
                <img src={step.photo} alt='Colmar' className={classes['image']} />
            </div>
            <div className={classes['overview-content']}>
                <h4 className={classes['overview-title']}>{step.name}</h4>
                <div className={classes['step-infos']}>
                    <span className={classes['step-order']}>{step.step_order}</span>
                </div>
            </div>
        </div>
    )
}

export default StepOverview;