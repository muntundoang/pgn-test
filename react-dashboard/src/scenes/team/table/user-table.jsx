import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { store } from "../../../store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const UserTable = ({ changeForm }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { deleteUser, user, valBySearch, updateValBySearch } = store((state) => state);

  const deleteHandler = (id, role) => {
    const newValBySearch = valBySearch.filter(e => e.id !== id)
    deleteUser(id, role)
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
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "left",
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
                onClick={(e) => changeForm(e, "edit user", id)}
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

  return <DataGrid checkboxSelection rows={valBySearch} columns={columns} />;
};

export default UserTable;
