import "../../css/footer.css";
import {
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
              Simple Bookstore, nothing more than that.
            </p>
          </div>
          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li>
                <NavItem>
                  <NavLink href="http://localhost:3000/">Home</NavLink>
                </NavItem>
              </li>
              <li>
              <NavItem>
                  <NavLink href="http://localhost:3000/book/">Book</NavLink>
                </NavItem>
              </li>
              <li>
              <NavItem>
                  <NavLink href="http://localhost:3000/book/">Author</NavLink>
                </NavItem>
              </li>
            </ul>
          </div>
          <div className="col-xs-6 col-md-3">
            <h6>About me</h6>
            <ul className="footer-links">
              <li>
                <h4>Chu Thanh Do</h4>
              </li>
              <li>
              <h4>Phone number: 0354324599</h4>
              </li>
              <li>
              <h4>Email: dochu8@gmail.com</h4>
              </li>             
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright © 2017 All Rights Reserved by
              <a href="#">Scanfcode</a>.
            </p>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li>
                <a className="facebook" href="#">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a className="twitter" href="#">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a className="dribbble" href="#">
                  <i className="fa fa-dribbble" />
                </a>
              </li>
              <li>
                <a className="linkedin" href="#">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;