import './App.css'
import MainLayout from "./layouts/MainLayout/MainLayout.jsx";
import {useState} from "react";

function App() {
    const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
        <MainLayout
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
        />
    </>
  )
}

export default App
