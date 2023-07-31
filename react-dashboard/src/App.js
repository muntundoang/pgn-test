import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./scenes/main";
// import Dashboard from "./scenes/dashboard";
import SigninPage from "./scenes/login/SigninPage";
import Team from "./scenes/team";
import Department from "./scenes/department";
import Spendings from "./scenes/Spendings";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="" element={<Main />}>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/" element={<Team />} />
            <Route path="/department" element={<Department />} />
            <Route path="/spendings" element={<Spendings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="login" element={<SigninPage />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
