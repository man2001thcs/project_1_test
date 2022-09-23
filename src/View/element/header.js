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
import Login from "../user/log/login";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";

function Header(props) {
  const [toogleBook, settoogleBook] = useState(false);
  const [toogleAuthor, settoogleAuthor] = useState(false);
  const [toogleVoucher, settoogleVoucher] = useState(false);
  const [result, setResult] = useState("");
  const [log, setLog] = useState(false);
  const [logout, setLogOut] = useState(false);
  const [isAdmin, setAdmin] = useState(props.isAdmin);
  const [searchInput, setSearch] = useState("");
  const [urlSearch, setUrlSearch] = useState(linkn.client_link + "home");

  const [openLogin, setOpenLogin] = useState(false);
  const [isSubmitting, setSubmitting] = useState();

  const [searchFilter, setSearchFilter] = useState("book");
  const [openSearchFilter, setOpenSearch] = useState(false);

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  const SignupSchema = Yup.object().shape({
    search_book: Yup.string()
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required name!!"),
  });

  console.log(openLogin);
  //const log = !props.login;
  //const logout = props.login;
  useEffect(() => {
    setLog(!props.login);
    setLogOut(props.login);
    setAdmin(props.isAdmin);
    if (parseInt(props.isAdmin) === 1) {
      setUrlSearch(linkn.client_link + "book/list?search=" + searchInput);
    } else {
      if (searchFilter === "book") {
        setUrlSearch(linkn.client_link + "home?search=" + searchInput);
      } else if (searchFilter === "author") {
        setUrlSearch(linkn.client_link + "book/user/list?search=" + searchInput + "&filter=author");
      }
    }
  }, [props.login, props.isAdmin, searchInput, searchFilter]);

  //console.log(localStorage.getItem("codeLogin"));

  function drop_menu() {
    if (isAdmin === "1") {
      return (
        <div class="container">
          <Nav tabs>
            <NavItem>
              <NavLink href={linkn.client_link} style={{ color: "orange" }}>
                Home
              </NavLink>
            </NavItem>
            <Dropdown
              nav
              isOpen={toogleBook}
              toggle={() => settoogleBook(!toogleBook)}
            >
              <DropdownToggle nav caret style={{ color: "orange" }}>
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
              <DropdownToggle nav caret style={{ color: "orange" }}>
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
            <Dropdown
              nav
              isOpen={toogleVoucher}
              toggle={() => settoogleVoucher(!toogleVoucher)}
            >
              <DropdownToggle nav caret style={{ color: "orange" }}>
                Voucher
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Author item</DropdownItem>
                <DropdownItem href={linkn.client_link + "voucher/input"}>
                  Insert new voucher
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href={linkn.client_link + "voucher/list"}>
                  Voucher list
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink
                href={linkn.client_link + "buy_log/list"}
                style={{ color: "orange" }}
              >
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
              <NavLink
                href={linkn.client_link + "home"}
                style={{ color: "orange" }}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={linkn.client_link + "book/user/list"}
                style={{ color: "orange" }}
              >
                Book
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={linkn.client_link + "buy_log/list"}
                style={{ color: "orange" }}
              >
                Buy log
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      );
  }

  console.log(isAdmin);

  const handleSubmitM = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const form = $(e.target);
      $.ajax({
        type: "POST",
        url: linkn.server_link + "controller/user/logout.php",
        data: form.serialize(),
        success(data) {
          console.log(data);
          setResult(data);
        },
      });
      //alert("Order complete!!");
      setSubmitting(false);
      //window.location.href = link.client_link + "buy_log/list";
    }, 500);
  };

  useEffect(() => {
    if (parseInt(result) === 1) {
      alert("Logout complete!!");
      setResult("-1");
      window.location.href = linkn.client_link + "home";
    }
  }, [result]);

  return (
    <div>
      <div
        class="page-header"
        style={{
          backgroundColor: "#303134",
          marginTop: "0",
          padding: "15px 45px 15px",
        }}
      >
        <div class="container">
          <div class="row" style={{ paddingBottom: "0px" }}>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <img
                src={require("../../image/book_logo.png")}
                alt="logo"
                width={"50px"}
                style={{ margin: "3px" }}
              />
              <span
                style={{
                  color: "white",
                  fontSize: "35px",
                  fontFamily: "Brush Script MT",
                  padding: "10px",
                }}
              >
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
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <Field
                          name="search"
                          placeholder="Enter name to search"
                          className="form-control"
                          type="text"
                          onChange={(e) => setSearch(e.target.value)}
                          style={{
                            margin: "4px",
                            fontSize: "14px",
                            fontStyle: "italic",
                          }}
                        />
                      </div>

                      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <Select
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            height: "35px",
                            marginTop: "4px",
                          }}
                          name="filter"
                          open={openSearchFilter}
                          onClose={handleCloseSearch}
                          onOpen={handleOpenSearch}
                          value={searchFilter}
                          label="Filter"
                          onChange={(e) => setSearchFilter(e.target.value)}
                          defaultValue="book"
                        >
                          <MenuItem value={"book"}>Book</MenuItem>
                          <MenuItem value={"author"}>Author</MenuItem>
                        </Select>
                      </div>

                      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <Button
                          type="submit"
                          className="btn btn-primary"
                          color="primary"
                          style={{
                            margin: "4px",
                            fontSize: "14px",
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          Search
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>

            <div
              class="col-xs-2 col-sm-2 col-md-2 col-lg-2"
              style={{ marginTop: "8px" }}
            >
              <div class="row">
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                  {logout && (
                    <nav>
                      <ul id="dropmenu_account" style={{ marginTop: "1.2px" }}>
                        <li>
                          <a
                            href={linkn.client_link}
                            style={{ fontWeight: "bold" }}
                          >
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

                  {log && <Login />}
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                  <NavLink href={linkn.client_link + "signin"}>
                    {log && (
                      <button
                        type="button"
                        class="btn btn-success btn-lg"
                        style={{
                          margin: "2px",
                          fontWeight: "bold",
                          backgroundColor: "#0054D2",
                          borderColor: "#0054D2",
                          fontSize: "14px",
                        }}
                      >
                        Register
                      </button>
                    )}
                  </NavLink>
                  <form method="post" onSubmit={(e) => handleSubmitM(e)}>
                    <input
                      type="hidden"
                      name="emailS"
                      id="emailS"
                      value={localStorage.getItem("email")}
                    />
                    <input
                      type="hidden"
                      name="codeS"
                      id="codeS"
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
                          fontSize: "14px",
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
