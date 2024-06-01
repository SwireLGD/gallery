import { Container, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Arts from "./features/arts/Arts";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import NewArt from "./features/arts/NewArt";
import ArtsByAuthor from "./features/arts/AuthorArt";

const App = () => {
  return (
      <>
        <header>
            <AppToolbar />
        </header>
          <main>
              <Container maxWidth="xl">
                  <Routes>
                      <Route path='/' element={<Arts />} />
                      <Route path='/register' element={<Register/>} />
                      <Route path='/login' element={<Login />} />
                      <Route path="/new-art" element={<NewArt />} />
                      <Route path="/author/:userId" element={<ArtsByAuthor />} />
                      <Route path="*" element={<Typography variant="h2">Not Found</Typography>} />
                  </Routes>
              </Container>
          </main>
      </>
  );
};

export default App;