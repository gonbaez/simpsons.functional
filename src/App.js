import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Interface from "./components/Interface";

import styles from "./styles/App.module.css";

import { Route, Routes } from "react-router-dom";
import About from "./pages/About";

const App = () => {
  return (
    <>
      <div className={styles.container}>
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<Interface />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default App;
