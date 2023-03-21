import { Divider, Button, TextField } from "@mui/material";
import axios from "axios";
import { url } from "config";
import React, { useState } from "react";

function ProjectFilter() {
  const [searchinput, setSearchInput] = useState("");
  const [categoriesData, setCategoriesData] = useState("");

  const handlesearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [email1, setEmail1] = React.useState({
    email: "",
  });

  React.useEffect(() => {
    axios
      .get(`${url}`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        setEmail1({ email: res.data.email });
      });
  }, []);

  React.useEffect(() => {
    axios.get(`${url}/api/categories`).then((res) => {
      console.log("location", res.data.categoryData);
      setCategoriesData(res.data.categoryData);
    });
  }, []);

  return (
    <div>
      <div>
        <p>Filter Project By </p>
        <hr />
        <div className="mb-3">
          <p className="text-14 mb-1">Start Your Search</p>
          <TextField
            fullWidth
            placeholder="Type Keyword"
            onChange={(e) => handlesearchInput(e)}
          />
        </div>
        <hr className="mt-3" />
        <div>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            name="category"
            // onChange={(e) => setLocationData(e.target.value)}
          >
            <option disabled selected>
              Select Category{" "}
            </option>
            {categoriesData && categoriesData.length > 0
              ? categoriesData.map((i, index) => {
                  return (
                    <option key={`key${index}`} value={i.name}>
                      {i.name}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>
      <hr />
      <div style={{ textAlign: "center" }}>
        <p className="text-14 mt-3">
          Click “Apply Filter” to apply latest changes made by you.
        </p>
        <Button className="btn btn-blue w-100">Apply Filters</Button>
      </div>
    </div>
  );
}
export default ProjectFilter;
