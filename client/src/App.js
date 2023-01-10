import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { authRoutes, homeRoutes } from './routes';
import TopNavbar from "./components/Navbar";

import './App.css';



const AppRouter = () => {

  return (
    <Router>
      <TopNavbar />
      <Routes>
        {
          homeRoutes.map(({ path, component: Component }, index) =>
            <Route exact path={path} element={<Component />} key={`homeRoute-${index}`} />)
        }
        {
          authRoutes.map(({ path, component: Component }, index) =>
            <Route exact path={path} element={<Component />} key={`authRoute-${index}`} />)
        }
      </Routes>
    </Router>
  );
};

function App() {

  return (
    <div style={{ fontFamily: 'Montserrat' }}>
      <AppRouter />
    </div>
  );
}

export default App;
