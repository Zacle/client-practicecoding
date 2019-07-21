import React from 'react';
import { Container } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Footer Component
 */
const Footer = () => {
    return (
        <>
        <br /><br />
            <footer id="footer">
                <Container>
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <a className="btn btn-social-icon btn-facebook" target="_blank" href="http://www.facebook.com/zacle07"><FontAwesomeIcon icon={['fab', 'facebook']} /></a>
                            <a className="btn btn-social-icon btn-github" target="_blank" href="http://www.github.com/zacle"><FontAwesomeIcon icon={['fab', 'github']} /></a>
                            <a className="btn btn-social-icon btn-linkedin" target="_blank" href="https://www.linkedin.com/in/zacharie-nziuki-a5999a91/"><FontAwesomeIcon icon={['fab', 'linkedin']} /></a>
                        </div>
                    </div>
                    <div className="row justify-content-center">             
                        <div className="col-auto">
                            <p className="text-center">Practice Coding OJ © Copyright <b>Zacharie Nziuki. </b>All Rights Reserved</p>
                        </div>
                    </div>
                </Container>
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
            </footer>
        </>
    );
}

export default Footer;