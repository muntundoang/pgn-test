import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import { store } from "../../../store";
import useMediaQuery from "@mui/material/useMediaQuery";

const UserRegister = () => {
  const { register, user } = store((state) => state);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    const obj = {
      ...values,
    };
    try {
      const data = await register(obj);
      console.log("data dari handleFormSubmit ==>", data);
    } catch (error) {
      console.log("error di handleFormSubmit ==>", error);
    }
  };

  const initialValues = {
    name: null,
    role: null,
    departmentId: null,
    username: null,
    password: null,
  };

  return (
    <>
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
              variant="filled"
              type="text"
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helpertext={touched.name && errors.name}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={!!touched.username && !!errors.username}
              helpertext={touched.username && errors.username}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="password"
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={!!touched.password && !!errors.password}
              helpertext={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Department ID"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.departmentId}
              name="departmentId"
              error={!!touched.departmentId && !!errors.departmentId}
              helpertext={touched.departmentId && errors.departmentId}
              sx={{ gridColumn: "span 1" }}
            />
            {user.role === "admin" && (
              <Select
                id="role"
                value={values.role}
                label="Role"
                name="role"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.role && !!errors.role}
                helpertext={touched.role && errors.role}
                sx={{ gridColumn: "span 1" }}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"employee"}>Employee</MenuItem>
              </Select>
            )}
            <Box
              display="block"
              justifyContent="left"
              mt="30px"
              sx={{ gridColumn: "span 2" }}
            >
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
    </>
  );
};

export default UserRegister;
