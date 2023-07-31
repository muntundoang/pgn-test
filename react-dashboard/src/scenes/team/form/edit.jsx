import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import { store } from "../../../store";
import useMediaQuery from "@mui/material/useMediaQuery";

const EditUser = (props) => {
  const { data, changeForm } = props
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user, updateUser } = store((state) => state);
  const handleFormSubmit = async (values) => {
    const obj = {
      ...values
    };
    delete obj.department
    try {
      await updateUser(obj, user.role)
      changeForm(null, 'table')
      
    } catch (error) {
      console.log("error di createProduct ==>", error);
    }
  };

  const initialValues = data;

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              id="name"
              variant="filled"
              type="text"
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helpertext={touched.name && errors.name}
              sx={{ gridColumn: "span 4", alignItems: "center" }}
            />

            <TextField
              fullWidth
              id="departmentId"
              variant="filled"
              type="number"
              label="Department Id"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.departmentId}
              name="departmentId"
              error={!!touched.departmentId && !!errors.departmentId}
              helpertext={touched.departmentId && errors.departmentId}
              sx={{ gridColumn: "span 4", alignItems: "center" }}
            />

            <Select
              id="role"
              defaultValue={""}
              value={values.role}
              label="Role"
              name="role"
              placeholder="Role"
              variant="filled"
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.categoryId && !!errors.categoryId}
              helpertext={touched.categoryId && errors.categoryId}
            >
              <MenuItem value='admin'>
                Admin
              </MenuItem>
              <MenuItem value='employee'>
                Employee
              </MenuItem>
            </Select>

            <Box
              id="button"
              name="button"
              display="block"
              justifyContent="left"
              sx={{ gridColumn: "span 2" }}
            >
              <Button type="submit" color="secondary" variant="contained">
                Edit Category
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditUser;
