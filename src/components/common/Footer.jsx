import React from "react";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import "./Footer.css";
import { FaLinkedin, FaTwitter, FaGoogle, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

export const Footer = () => {
    const navigate = useNavigate()
  
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>About</h4>
              <ul>
                <li>
                  <a href="/about"  >about us</a>
                </li>
                <li>
                  <a href="/about">our services</a>
                </li>
                
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Help</h4>
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Payments</a>
                </li>
                <li>
                  <a href="#">Courses</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact us</h4>
              <ul>
                <li>
                  <a href="/contact">
                    Gmail
                  </a>
                </li>
                <li>
                  <a href="/contact">Helpline No</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <a
                  // href="https://www.linkedin.com/in/parth-vaghela-7a9b1c/"
                  target="blank"
                >
                  <FaLinkedin className=" mx-auto mt-3 scale-125" />
                </a>
                <a 
                // href="https://twitter.com/ankitmalik84" 
                target="blank">
                  <FaTwitter className=" mx-auto mt-3 scale-125" />
                </a>

                <a 
                // href="https://www.instagram.com/parthus__48/" 
                target="blank">
                  <FaInstagram className=" mx-auto mt-3 scale-125" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 flex flex-col sm:flex-row justify-center items-center gap-4 ">
        <p className="text-white text-2xl my-2  ">© 2025 Study Craft</p>
       
      </div>
      
      </footer>
    </div>
  );
};

export default Footer;
