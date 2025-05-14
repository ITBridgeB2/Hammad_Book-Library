import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./homepage";
import Dashboard from "./bookdisplay";
import AddBook from "./addbook";
import Adventure from "./adventurepage";
import SciFi from "./sciencefictionpage";
import Horror from "./horrorpage";
import Mystery from "./mysterypage";
import Romance from "./romancepage";
import Fantasy from "./fantasypage";
import Biography from "./biographypage";
import History from "./historypage";
import BookDetails from "./bookdetails";

 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dash" element={<Dashboard/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/addbook" element={<AddBook/>} />
        

        <Route path="/sci-fi" element={<SciFi/>} />
        <Route path="/horror" element={<Horror/>} />
        <Route path="/mystery" element={<Mystery/>} />
        <Route path="/adventure" element={<Adventure/>} />
        <Route path="/romance" element={<Romance/>} />
        <Route path="/fantasy" element={<Fantasy/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/biography" element={<Biography/>} />
        <Route path="//book/:title" element={<BookDetails/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
