import React, { useEffect, useState } from "react";
import { Card, InputLabel, TextareaAutosize } from "@mui/material";
import axios from "axios";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import { url } from "config";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SideBarImport from "layouts/LMS/SideBarImport";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import AddGroupdDetails from "../AddGroupsDetails";
import Table from "examples/Table";
import moment from "moment";
import { toast } from "react-toastify";
import styles from "layouts/project/styles";
import NoOptionsMessage from "../selectContainer/NoOptionsMessage";
import Select from "react-select";

function AddGroup() {
  const classes = styles();
  const pwd = localStorage.getItem("pwd");
  const authorization = `Bearer ${pwd}`;
  const [autherId, setAutherId] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [userData, setUserData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupCourse, setGroupCourse] = useState([]);
  const [groupAr, setGroupAr] = useState(false);

  useEffect(() => {
    axios
      .get(`${url}`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        // console.log("auth", res.data.id);
        setAutherId(res.data.id);
      });
    loadGroupDetails();
    // eslint-disable-next-line
  }, [autherId, groupAr]);

  const loadGroupDetails = () => {
    axios.get(`${url}/api/group/details`).then((resp) => {
      // console.log(
      //   "grp",
      //   resp.data.allGroupData.map((i) => i)
      // );
      setGroupData(resp.data.allGroupData);
      setGroupAr(!groupAr);
    });

    axios.get(`${url}/api/all-users`).then((res) => {
      setUserData(res.data.map((i) => i["firstname"]));
      // console.log(
      //   "user",
      //   res.data?.map((i) => i)
      // );
    });

    axios.get(`${url}/api/list/courses`).then((res1) => {
      setCourseData(res1.data.listCoursesDetails.map((i) => i["courseTitle"]));
      // console.log(
      //   "course",
      //   res1.data.listCoursesDetails.map((i) => i.courseTitle)
      // );
    });
  };

  const columns = [
    { name: "SrNo", align: "center" },
    { name: "title", align: "center" },
    { name: "Courses", align: "center" },
    { name: "Users", align: "center" },
    { name: "author", align: "center" },
    { name: "date", align: "center" },
  ];

  const rows = [];

  const searched = (key) => (c) => c.name.toLowerCase().includes(key);

  if (groupData.length > 0) {
    groupData.filter(searched(keyword)).map((item, idx) =>
      rows.push({
        SrNo: idx + 1,
        title: item.name,
        Courses: item?.groupCourse,
        Users: item?.groupMembers,
        author: item?.autherId?.firstname,
        date: moment(item.createdAt).format("DD-MM-YYYY"),
      })
    );
  }

  const handleAddNewGroup = () => {
    const data = new FormData();
    data.append("name", groupTitle);
    data.append("decription", groupDescription);
    data.append("autherId", autherId);
    data.append("groupMembers", groupMembers);
    data.append("groupCourse", groupCourse);

    axios
      .post(`${url}/api/add-new-group`, {
        groupTitle,
        groupDescription,
        autherId,
        groupMembers,
        groupCourse,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(res.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  let createOptionGroupTeams = (label) => ({
    label,
    value: label?.toLowerCase().replace(/\W/g, ""),
  });

  let defaultOptionGroupTeam = [];

  for (let i of userData) {
    defaultOptionGroupTeam = [
      ...defaultOptionGroupTeam,
      createOptionGroupTeams(i),
    ];
  }
  const handleChangeGroupTeam = (newValue1, actionMeta) => {
    setGroupMembers(newValue1.map((i) => i.value).toString());
  };

  let createOptionCourseList = (label) => ({
    label,
    value: label?.toLowerCase().replace(/\W/g, ""),
  });

  let defaultOptionCourseLists = [];

  for (let i of courseData) {
    defaultOptionCourseLists = [
      ...defaultOptionCourseLists,
      createOptionCourseList(i),
    ];
  }
  const handleChangeGroupCouseList = (newValue1, actionMeta) => {
    setGroupCourse(newValue1.map((i) => i.value).toString());
  };

  return (
    <React.Fragment>
      <SideBarImport />
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiTypography>
            <AddGroupdDetails />
          </SuiTypography>
          <Card className="add-group">
            <SuiTypography pt={2} variant="h4">
              <form>
                <h5>Add New Group</h5>
                <div>
                  <InputLabel>Group Title</InputLabel>
                  <SuiInput
                    name="groupTitle"
                    size="medium"
                    placeholder="Enter Group Name"
                    onChange={(e) => setGroupTitle(e.target.value)}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <InputLabel>Group Members</InputLabel>
                    <Select
                      className="group-select"
                      isClearable
                      isMulti
                      placeholder="Select Your Group Member"
                      components={{ NoOptionsMessage }}
                      onChange={handleChangeGroupTeam}
                      isSearchable
                      name="color"
                      options={defaultOptionGroupTeam}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <InputLabel>Group Courses</InputLabel>
                    <Select
                      className="group-select"
                      isClearable
                      isMulti
                      placeholder="Select Your Group Courses"
                      components={{ NoOptionsMessage }}
                      onChange={handleChangeGroupCouseList}
                      isSearchable
                      name="color"
                      options={defaultOptionCourseLists}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <InputLabel>Group Description</InputLabel>
                  <TextareaAutosize
                    minRows="3"
                    style={{ width: "100%" }}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    className="form-control"
                    placeholder="Enter Group Description"
                  />
                </div>

                <div className="mt-3">
                  <SuiButton color="primary" onClick={handleAddNewGroup}>
                    Add Group
                  </SuiButton>
                </div>
              </form>
            </SuiTypography>
          </Card>
        </SuiBox>
        {/* <SuiBox customClass={classes.tables_table}>
          <Table columns={columns} rows={rows} />
        </SuiBox> */}
        <Card style={{ padding: "15px" }} mt={2}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <div></div>
            <div>
              <SuiInput
                size="medium"
                placeholder="Type here..."
                withIcon={{ icon: "search", direction: "left" }}
                customClass={classes.navbar_input}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={columns} rows={rows} />
          </SuiBox>
        </Card>
      </DashboardLayout>
    </React.Fragment>
  );
}
export default AddGroup;
