import {
  Box,
  Autocomplete,
  useTheme,
  Button,
  ButtonGroup,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { store } from "../../store";
import UserTable from "./table/user-table";
import EditUser from "./form/edit";
import UserRegister from "./form/register";
import { useState } from "react";
import Header from "../../components/Header";

const Team = () => {
  const [form, setForm] = useState("table");
  const [valueName, setValueName] = useState("");
  const [valueDepartment, setValueDepartment] = useState("");
  const [valToEdit, setValToEdit] = useState(null);
  const { allUsers, allDepartments, setValBySearch } = store((state) => state);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const changeForm = (e, form, id) => {
    if (e) {
      e.preventDefault();
    }
    switch (form) {
      case "edit user":
        if (id) {
          allUsers.forEach((e) => {
            if (e.id === id) {
              let obj = e;
              delete obj.spending;
              setValToEdit(obj);
            }
          });
          setForm(form);
        }
        break;

      default:
        setForm(form);
        break;
    }
  };

  return (
    <Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Box margin={"20px"} marginLeft={"0px"}>
            <ButtonGroup
              variant="outlined"
              color="secondary"
              aria-label="outlined button group"
            >
              <Button onClick={(e) => changeForm(e, "table")}>User List</Button>
              <Button onClick={(e) => changeForm(e, "register")}>
                Create User
              </Button>
            </ButtonGroup>
          </Box>
          {form === "table" && (
            <Box display="flex" justifyContent="space-between">
              <Autocomplete
                value={valueName}
                onChange={(event, newValue) => {
                  setValueName(newValue);
                  setValBySearch("name", newValue);
                }}
                id="controllable-states-demo"
                options={allUsers}
                getOptionLabel={(e) => e.name ?? e}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search by name" />
                )}
              />
              <Box marginLeft={"20px"}>
                <Autocomplete
                  value={valueDepartment}
                  onChange={(event, newValue) => {
                    event.preventDefault();
                    setValueDepartment(newValue);
                    setValBySearch("department", newValue);
                  }}
                  id="controllable-states-demo"
                  options={allDepartments}
                  getOptionLabel={(e) => e.name ?? e}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Search by Department" />
                  )}
                />
              </Box>
            </Box>
          )}
        </Box>
        {form === "table" && <UserTable changeForm={changeForm} />}
        {form === "edit user" && (
          <EditUser data={valToEdit} changeForm={changeForm} />
        )}
        {form === "register" && <UserRegister />}
      </Box>
    </Box>
  );
};

export default Team;
