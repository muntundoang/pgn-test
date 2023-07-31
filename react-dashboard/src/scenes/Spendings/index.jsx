import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { store } from "../../store";
import currencyConvert from "../../middleware/currency-convert";
import dateConvert from "../../middleware/date-converter";
// import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Spendings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { allSpendings } = store((state) => state);
  const columns = [
    {
      field: "nameEmployee",
      headerName: "Employee Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "nameDepartement",
      headerName: "Department Name",
      flex: 1,
    },
    {
      field: "date",
      type: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        const newDate = new Date(params.value)
        console.log("param value in date => \n", params.value)
        return `${dateConvert(newDate)}`;
      },
    },
    {
      field: "value",
      type: "number",
      align: "left",
      headerAlign: "left",
      headerName: "Value",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        return `${currencyConvert(params.value)}`;
      },
    },
  ];

  return (
    <Box>
      <Header title="SPENDINGS" subtitle="List of Spendings" />
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
          "& .MuiButtonBase-root": {
            color: `${colors.greenAccent[600]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={allSpendings} columns={columns} slots={{ toolbar: GridToolbar }}/>
      </Box>
    </Box>
  );
};

export default Spendings;