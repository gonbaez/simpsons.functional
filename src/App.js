import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Interface from "./components/Interface";

import styles from "./styles/App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <header>
        <Header />
      </header>
      <main>
        <Interface />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
