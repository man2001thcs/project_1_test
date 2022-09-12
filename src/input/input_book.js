import { useState} from "react";
import "../../node_modules/bootstrap/dist/js/bootstrap";
import "../App.css";
import $ from "jquery";

function Helle(props) {
  const [inputName, setInputName] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputCreate, setInputCreate] = useState("");
  const [inputpageNum, setInputpageNum] = useState("");
  const [result, setResult] = useState([]);

  const handleSumbit = (e) => {
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
};

  const check1 = () => {
    alert(props.name);
  };

  return (
    <div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Book input</h3>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div class="form-group">
                <label for="inputBookName" class="col-sm-2 control-label">
                  Book Name:
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="BookName"
                    id="inputBookName"
                    class="form-control"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    pattern=""
                    title=""
                  />
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div class="form-group">
                <label for="inputBookName" class="col-sm-2 control-label">
                  Author:
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="Author"
                    id="inputAuthor"
                    class="form-control"
                    value={inputAuthor}
                    onChange={(e) => setInputAuthor(e.target.value)}
                    required="required"
                    pattern=""
                    title=""
                  />
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div class="form-group">
                <label for="inputCreated" class="col-sm-2 control-label">
                  Created:
                </label>
                <div class="col-sm-10">
                  <input
                    type="date"
                    name="Created"
                    id="inputCreated"
                    class="form-control"
                    value={inputCreate}
                    onChange={(e) => setInputCreate(e.target.value)}
                    required="required"
                    title=""
                  />
                </div>
              </div>
            </div>
          </div>

          <br></br>

          <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div class="form-group">
                <label for="inputCreated" class="col-sm-2 control-label">
                  Page number:
                </label>
                <div class="col-sm-10">
                  <input
                    type="number"
                    name="PageNum"
                    id="inputPageNum"
                    class="form-control"
                    value={inputpageNum}
                    onChange={(e) => setInputpageNum(e.target.value)}
                    required="required"
                    title=""
                  />
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <span class="input-group-btn">
            <button type="button" class="btn btn-success btn-lg">
              OK
            </button>
            <button type="button" class="btn btn-danger btn-lg">
              Back
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Helle;
