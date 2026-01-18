import classes from './LegalNoticesPage.module.css';
import {NavLink} from "react-router-dom";
function MentionsLegales() {
    return (
        <main className={classes['legal-page']} >
            <h1>Mentions légales</h1>

            <section>
                <h2>Éditeur du site</h2>
                <p>
                    Nom : Sophie Rudio<br />
                    Pays : France<br />
                    Email : contact.localloop@yopmail.com
                </p>
            </section>

            <section>
                <h2>Objet du site</h2>
                <p>
                    Le site permet aux utilisateurs de consulter et de publier des parcours
                    de découverte. Les contenus publiés sont placés sous la responsabilité
                    de leurs auteurs.
                </p>
            </section>

            <section>
                <h2>Propriété intellectuelle</h2>
                <p>
                    L’ensemble des contenus présents sur ce site (textes, images, code,
                    structure) est protégé par le droit de la propriété intellectuelle.
                    Toute reproduction ou représentation, totale ou partielle, sans
                    autorisation préalable est interdite.
                </p>
                <p>
                    Tout site public ou privé est autorisé à établir, sans autorisation préalable, un lien vers les
                    informations diffusées par https://rudsop.cda-alt.ovh
                    .
                    En revanche, les pages de https://rudsop.cda-alt.ovh ne doivent pas être imbriquées à l'intérieur
                    des pages d'un autre site.

                    Conformément aux articles 26 et 27 de la Loi N°78-17 " Informatiques et Libertés " du 6 janvier 1978,
                    vous pouvez vous opposer (partiellement ou totalement) à la diffusion d'informations vous
                    concernant sur ce site. Pour exercer votre droit d'accès, de modification, de rectification et de
                    suppression de données diffusées qui vous sont attachées (article 34 de la Loi Informatiques et
                    Libertés), adressez-vous à contact.localloop@yopmail.com.
                </p>
            </section>

            <section>
                <h2>Données personnelles</h2>
                <p>
                    Les données collectées lors de la création d’un compte sont :
                    l’adresse email, le nom d’utilisateur, le mot de passe (stocké de
                    manière chiffrée) et l’avatar.
                </p>
                <p>
                    Ces données sont utilisées uniquement pour la gestion des comptes
                    utilisateurs et ne sont jamais transmises à des tiers.
                </p>
                <p>
                    Conformément à la réglementation en vigueur, les utilisateurs disposent
                    d’un droit d’accès, de rectification et de suppression de leurs données.
                    Toute demande peut être adressée à : contact.localloop@yopmail.com.
                </p>
            </section>

            <section>
                <h2>Hébergement</h2>
                <p>
                    Hébergeur : OVH SAS<br />
                    Adresse : 2 rue Kellermann, 59100 Roubaix, France<br />
                    Adresse web: <a> https://www.ovhcloud.com/fr/</a>
                </p>
            </section>

            <NavLink to="/" className={classes['home-link']}>
                Retourner à l’accueil
            </NavLink>
        </main>
    );
}

export default MentionsLegales;
