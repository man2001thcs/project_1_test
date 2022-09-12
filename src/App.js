import "./css/App.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main_page from "./View/main_page";
import Header from "./View/element/header";
import Footer from "./View/element/footer";

import InputBook from "./View/book/admin/input/input_book";
import InputAuthor from "./View/author/input/input_author";

import BookList from "./View/book/admin/list/book_list";
import AuthorList from "./View/author/list/author_list";
import EditBook from "./View/book/admin/list/edit_book";
import EditAuthor from "./View/author/list/edit_author";

import Login from "./View/user/log/login";
import SignIn from "./View/user/log/signIn";
import BuyLogList from "./View/buy_log/user/list/buylog_list";
import BuyLogList_Admin from "./View/buy_log/admin/list/buylog_list";

import EditUser from "./View/user/edit/edit_info";
import EditPassword from "./View/user/edit/edit_pass";
import BookListU from "./View/book/user/home/book_list";
import CartView from "./View/book/user/bill/cart_view";

import BookListUs from "./View/book/user/list/book_list";
import BookDes from "./View/book/user/list/book_detail";

import GenerateRandomCode from "react-random-code-generator";

function App() {
  const [loginState, setLoginState] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [logined, setLogined] = useState(false);
  const [isAdmin, setAdmin] = useState();
  const urlAccount =
    "http://localhost/php_server/controller/user/log_session/" +
    localStorage.getItem("codeLogin") +
    ".json?timeStamp=" + GenerateRandomCode.NumCode(4);
  console.log(urlAccount);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(urlAccount);
        setLoginState(response.data);
        console.log(response.data);
        if (
          response.data?.length !== 0 &&
          typeof response.data !== "undefined"
        ) {
          setLogined(true);
        } else {
          setLogined(false);
        }
      } catch (err) {
        setError(err.message);
        setLoginState(null);
      } finally {
        setLoading(false);
      }
    };
    console.log(localStorage.getItem("codeLogin"));

    if (localStorage.getItem("codeLogin") !== null) {
      fetch(urlAccount, {
        method: "HEAD",
      }).then((res) => {
        if (res.status === 200) {
          getData();
        }
      });
    } else {
      setLogined(false);
    }
  }, []);
  console.log(loginState?.length !== 0);
  console.log(loginState?.is_admin);
  console.log(loginState?.id);
  return (
    <div>
      <Header login={logined} isAdmin={loginState?.is_admin} />

      <div class="container" style={{ minHeight: "400px", marginTop: "40px", marginBottom: "40px" }} >
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Main_page />} />

              {loginState?.is_admin > 0 && (
                <Route>
                  <Route path="book/input" element={<InputBook />} />
                  <Route path="book/edit" element={<EditBook />} /> 
                  <Route path="book/list" element={<BookList />} />            
                  <Route path="author/input" element={<InputAuthor />} />
                  <Route path="author/edit" element={<EditAuthor />} />
                  <Route path="author/list" element={<AuthorList />} />
                  <Route path="buy_log/list" element={<BuyLogList_Admin />} /> 
                  
                </Route>
              )}

              {loginState?.is_admin !==1 && (
                <Route>
                  <Route path="home" element={<BookListU />} />
                  <Route path="book/user/list" element={<BookListUs />} />
                  <Route path="book/user/detail" element={<BookDes />} />
                  <Route path="author/user/list" element={<AuthorList />} />       
                  <Route path="buy_log/list" element={<BuyLogList />} />       
                  <Route path="user/cart" element={<CartView id={loginState?.id} address={loginState?.address}/>} />     
                </Route>
              )}


              <Route path="login" element={<Login />} />
              <Route path="signin" element={<SignIn />} />

              {loginState?.length !== 0 && typeof loginState !== "undefined" && (
                <Route>
                  <Route path="user/info" element={<EditUser />} />
                  <Route path="user/password" element={<EditPassword />} />
                </Route>
              )}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
