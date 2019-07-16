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
            </footer>
        </>
    );
}

export default Footer;