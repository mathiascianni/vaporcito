//Styles
import "./App.css";

//Router
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <div className="bg-dark text-light min-h-screen">
      <MainRoutes />
    </div>
  );
}

export default App;
