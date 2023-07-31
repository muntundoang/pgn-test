import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { store } from "../../../store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const DepartmentTable = ({ changeForm }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { deleteDept, user, valBySearch, updateValBySearch, allDepartments } = store((state) => state);

  const deleteHandler = (id, role) => {
    const newValBySearch = valBySearch.filter(e => e.id !== id)
    deleteDept(id, role)
    updateValBySearch(newValBySearch)
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      justifyContent: "center",
      headerAlign: "center",
      cellClassName: "action-column--cell",
      renderCell: ({ row: { id } }) => {
        if (user.role !== "admin") {
          return (
            <Box
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                user.role === "admin"
                  ? colors.greenAccent[600]
                  : user.role === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
              }
              borderRadius="4px"
            >
              {user.role === "employee" && <LockOpenOutlinedIcon />}
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                Admin Only
              </Typography>
            </Box>
          );
        }
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="left"
            gap="50px"
            borderRadius="4px"
          >
            <Box
              backgroundColor="yellow"
              borderRadius="4px"
              width={"80px"}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={(e) => changeForm(e, "edit", id)}
                sx={{ width: "100%" }}
              >
                <EditIcon sx={{ marginRight: "5px" }} />
                Edit
              </Button>
            </Box>
            <Box
              backgroundColor="red"
              borderRadius="4px"
              width={"80px"}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button onClick={(e) => {
                deleteHandler(id, user.role)
              }}>
                <DeleteIcon sx={{ marginRight: "5px" }} />
                Delete
              </Button>
            </Box>
          </Box>
        );
      },
    },
  ];

  return <DataGrid checkboxSelection rows={allDepartments} columns={columns} />;
};

export default DepartmentTable;
