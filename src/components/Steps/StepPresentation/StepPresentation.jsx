import classes from './StepPresentation.module.css';

function StepPresentation({step}) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <div className={classes['step-presentation']}>
            <div className={classes['step-header']}>
                <div className={classes['step-presentation-photo']}>
                    <img src={`${baseUrl}${step.photo}`} alt={step.name} className={classes['image']} />
                </div>
                <h3 className={classes['step-title']}>{step.name}</h3>
            </div>
            <div className={classes['step-content']}>
                <div className={classes['step-infos']}>
                    <div className={classes['info']}>
                        <h4>Anecdote</h4>
                        <p>{step.anecdote}</p>
                    </div>
                    <div className={classes['info']}>
                        <h4>Conseil</h4>
                        <p>{step.advice}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepPresentation;
