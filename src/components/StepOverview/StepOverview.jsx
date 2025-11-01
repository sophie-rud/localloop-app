import photo from '../../assets/images/image-colmar.jpg';
import classes from './StepOverview.module.css';
import {Camera} from "lucide-react";

function StepOverview() {
    return (
        <div className={classes['step-overview']}>
            <div className={classes['step-overview-photo']}>
                <img src={photo} alt='Colmar' className={classes['image']} />
            </div>
            <div className={classes['overview-content']}>
                <h4 className={classes['overview-title']}>Quai des poissonniers</h4>
                <div className={classes['step-infos']}>
                    <div className={classes['icons']}>
                        <div className={classes['icon']}> <Camera /> </div>
                    </div>
                    <span className={classes['step-order']}>1</span>
                </div>
            </div>
        </div>
    )
}

export default StepOverview;