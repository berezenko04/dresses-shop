import { Routes, Route } from "react-router-dom"

import "./scss/main.scss";

import Home from "./pages/Home"
import PrimaryLayout from "./layout/PrimaryLayout";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<PrimaryLayout />}>
          <Route path={'Sandrela'} element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
