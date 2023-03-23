import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./Views/Home";
import ProductScreen from "./Views/Product";
function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">Amazona</Link>
          {/* use Link instead of a to avoid refresh pages */}
        </header>
        <main>
          <Routes>
            <Route
              path="/product/:slug"
              // :slug means we pass the value after : use as the parameter => useParams() will return the object
              //  containing it
              element={<ProductScreen></ProductScreen>}
            ></Route>
            <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
