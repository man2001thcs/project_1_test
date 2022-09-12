import { useState } from "react";
import "../../css/account_drop_menu.css";
import $ from "jquery";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import linkn from "../../config/const";

function Header(props) {
  const [toogleBook, settoogleBook] = useState(false);
  const [toogleAuthor, settoogleAuthor] = useState(false);
  const [result, setResult] = useState("");
  const [log, setLog] = useState(false);
  const [logout, setLogOut] = useState(false);
  const [isAdmin, setAdmin] = useState(props.isAdmin);
  const [searchInput, setSearch] = useState("");

  const SignupSchema = Yup.object().shape({
    search_book: Yup.string()
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
  });

  const [urlSearch, setUrlSearch] = useState(linkn.client_link + "home");

  //const log = !props.login;
  //const logout = props.login;
  useEffect(() => {
    setLog(!props.login);
    setLogOut(props.login);
    setAdmin(props.isAdmin);
    setUrlSearch(linkn.client_link + "home?search=" + searchInput);
  }, [props.login, props.isAdmin, searchInput]);

  console.log(localStorage.getItem("codeLogin"));

  const handleSumbitLogout = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data) {
        setResult(data);
      },
    });
    localStorage.removeItem("codeLogin");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("cart");
    setLog(true);
    setLogOut(false);
    window.location.href("http://localhost:3000/");
  };

  function drop_menu() {
    if (isAdmin === "1") {
      return (
        <div class="container">
          <Nav tabs>
            <NavItem>
              <NavLink href={linkn.client_link}>Home</NavLink>
            </NavItem>
            <Dropdown
              nav
              isOpen={toogleBook}
              toggle={() => settoogleBook(!toogleBook)}
            >
              <DropdownToggle nav caret>
                Book
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Book item</DropdownItem>
                <DropdownItem href={linkn.client_link + "book/input"}>
                  Insert new book
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href={linkn.client_link + "book/list"}>
                  Book list
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown
              nav
              isOpen={toogleAuthor}
              toggle={() => settoogleAuthor(!toogleAuthor)}
            >
              <DropdownToggle nav caret>
                Author
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Author item</DropdownItem>
                <DropdownItem href={linkn.client_link + "author/input"}>
                  Insert new author
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href={linkn.client_link + "author/list"}>
                  Author list
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink href={linkn.client_link + "buy_log/list"}>
                Buy log
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      );
    } else
      return (
        <div class="container">
          <Nav tabs>
            <NavItem>
              <NavLink href={linkn.client_link + "home"}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={linkn.client_link + "book/user/list"}>
                Book
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={linkn.client_link + "author/user/list"}>
                Author
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={linkn.client_link + "buy_log/list"}>
                Buy log
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      );
  }

  console.log(isAdmin);

  return (
    <div>
      <div
        class="page-header"
        style={{ backgroundColor: "#303134", marginTop: "0", padding: "10px" }}
      >
        <div class="container">
          <div class="row">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <img
                src={require("../../image/book_logo.png")}
                alt="logo"
                width={"50px"}
                style={{ margin: "3px" }}
              />
              <span style={{ color: "white", fontSize: "20px" }}>
                Book store
              </span>
            </div>

            <div
              class="col-xs-7 col-sm-7 col-md-7 col-lg-7"
              style={{ marginTop: "4px" }}
            >
              <div class="row">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={SignupSchema}
                >
                  {({ errors, touched }) => (
                    <form action={urlSearch.replace(/\s+/g, "+")} method="get">
                      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <Field
                          name="search"
                          placeholder="Enter name of the book"
                          className="form-control"
                          type="text"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <button
                          type="submit"
                          class="btn btn-success btn-lg"
                          style={{ margin: "4px" }}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>

            <div
              class="col-xs-2 col-sm-2 col-md-2 col-lg-2"
              style={{ marginTop: "5px" }}
            >
              <div class="row">
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                  {logout && (
                    <nav>
                      <ul id="dropmenu_account">
                        <li>
                          <a href={linkn.client_link}>
                            Account <i class="fa fa-user"></i>
                          </a>
                          <ul>
                            <li>
                              <a href={linkn.client_link + "user/cart"}>
                                Cart <i class="	fa fa-shopping-cart"></i>
                              </a>
                            </li>
                            <li>
                              <a href={linkn.client_link + "user/info"}>
                                Information <i class="fa fa-info"></i>
                              </a>
                            </li>
                            <li>
                              <a href={linkn.client_link + "user/password"}>
                                Password <i class="fa fa-key"></i>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  )}
                  <NavLink href={linkn.client_link + "login"}>
                    {log && (
                      <button
                        type="button"
                        class="btn btn-success btn-lg"
                        style={{
                          margin: "2px",
                          fontweight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        Login <i class="fa fa-sign-in"></i>
                      </button>
                    )}
                  </NavLink>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                  <NavLink href={linkn.client_link + "signin"}>
                    {log && (
                      <button
                        type="button"
                        class="btn btn-success btn-lg"
                        style={{
                          margin: "2px",
                          fontweight: "bold",
                          backgroundColor: "#0054D2",
                          borderColor: "#0054D2",
                          fontSize: "14px",
                        }}
                      >
                        Register
                      </button>
                    )}
                  </NavLink>
                  <form
                    action={linkn.server_link + "controller/user/logout.php"}
                    method="post"
                  >
                    <input
                      type="hidden"
                      name="loginCode"
                      id="loginCode"
                      value={localStorage.getItem("codeLogin")}
                    />
                    {logout && (
                      <button
                        type="submit"
                        class="btn btn-danger btn-lg"
                        style={{
                          margin: "1px",
                          padding: "7.5px",
                          fontWeight: "bold",
                          fontSize: "14px"
                        }}
                      >
                        Log out <i class="fa fa-sign-out"></i>
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          {drop_menu()}
        </div>
      </div>
    </div>
  );
}

export default Header;
