import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReminderForm from "./pages/ReminderForm";
import ReminderList from "./pages/ReminderList";

const routes = [
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/reminder-form",
    element: <ReminderForm></ReminderForm>,
  },
  {
    path: "/reminder-list",
    element: <ReminderList></ReminderList>,
  },
];
const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element}></Route>
        ))}
      </Routes>
    </Router>
  );
};

export default App;
