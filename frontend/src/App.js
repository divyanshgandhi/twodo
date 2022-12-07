import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import Background from "./components/background.component";
import Weather from "./components/weather.component";
import List from "./components/list.component";
import Summary from "./components/summary.component";
import { Footer } from "./components/footer.component";

function App() {
  return (
    <Background >

      <div className="navbar navbar-expand mb-4">
        <a href="/" className=" text-white text-3xl italic no-underline font-bold ml-10 mt-2">
          TwoDo
        </a>
      </div>

      <div className="relative md:flex lg:flex xl:flex h-4/5">
        <div className="basis-1/2 p-10 ml-8 mt-8">
          <Weather />
          <br />
          <Summary />
        </div>
        <div id="#slider" className="basis-1/2 h-80vh w-5/6 ml-8">
          <List />
        </div>
      </div>

      <Footer />

    </Background>
  );
}

export default App;
