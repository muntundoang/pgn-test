import {
  Box,
  useTheme,
  Button,
  ButtonGroup,
} from "@mui/material";
import { tokens } from "../../theme";
import { store } from "../../store";
import DepartmentTable from "./table/department-table";
import EditDepartment from "./form/edit";
import DeptCreate from "./form/createDept";
import { useState } from "react";

const Department = () => {
  const [form, setForm] = useState("table");
  const [valToEdit, setValToEdit] = useState(null);
  const { allDepartments } = store((state) => state);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const changeForm = (e, form, id) => {
    if (e) {
      e.preventDefault();
    }
    switch (form) {
      case "edit":
        if (id) {
          allDepartments.forEach((e) => {
            if (e.id === id) {
              setValToEdit(e);
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
              <Button onClick={(e) => changeForm(e, "table")}>Department List</Button>
              <Button onClick={(e) => changeForm(e, "create")}>
                Create Department
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        {form === "table" && <DepartmentTable changeForm={changeForm} />}
        {form === "edit" && (
          <EditDepartment data={valToEdit} changeForm={changeForm} />
        )}
        {form === "create" && <DeptCreate />}
      </Box>
    </Box>
  );
};

export default Department;
