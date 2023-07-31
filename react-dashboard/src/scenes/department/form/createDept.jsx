import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { store } from "../../../store";
import useMediaQuery from "@mui/material/useMediaQuery";

const UserRegister = () => {
  const { createDept } = store((state) => state);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    const obj = {
      ...values,
    };
    try {
      const data = await createDept(obj);
      console.log("data dari handleFormSubmit ==>", data);
    } catch (error) {
      console.log("error di handleFormSubmit ==>", error);
    }
  };

  const initialValues = {
    name: null,
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
              label="Department Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helpertext={touched.name && errors.name}
              sx={{ gridColumn: "span 4" }}
            />
            <Box
              display="block"
              justifyContent="left"
              alignContent="center"
              alignItems="center"
              sx={{ gridColumn: "span 2" }}
            >
              <Button type="submit" color="secondary" variant="contained">
                Create New Department
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
