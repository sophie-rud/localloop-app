import classes from './Footer.module.css';

function Footer() {
    return (
        <footer className={classes.footer}>
            <ul>
                <li>Contact</li>
                <li>Mentions légales</li>
            </ul>
        </footer>
    )
}

export default Footer;
