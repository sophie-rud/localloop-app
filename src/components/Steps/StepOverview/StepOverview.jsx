import classes from './StepOverview.module.css';

function StepOverview({step}) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <div className={classes['step-overview']}>
            <div className={classes['step-overview-photo']}>
                <img src={`${baseUrl}${step.photo}`} alt={step.name} className={classes['image']} />
            </div>
            <div className={classes['overview-content']}>
                <h4 className={classes['overview-title']}>{step.name}</h4>
                <div className={classes['step-infos']}>
                    <span className={classes['step-order']}>{step.stepOrder}</span>
                </div>
            </div>
        </div>
    )
}

export default StepOverview;