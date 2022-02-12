import "./App.css";
import NavBar from "./Components/NavBar";
import Categories from "./Components/Categories";
import Home from "./Pages/Home";
import AppRouter from "./router";
import AdminDashBoard from "./Admin/Components/AdminDashboard";

function App() {
  return (
    <div className="App">
      {/* <AppRouter /> */}
      <AdminDashBoard />
    </div>
  );
}

export default App;
