import { Images } from "./contants";
import React, { useState, useEffect } from "react";
import { fetchDataFromApi } from "./services/Api";

import { useDispatch, useSelector } from "react-redux";
import { getApiConfig } from "./Redux/Actions/HomeAction";

import { getGenres } from "./Redux/ReduxSlice/HomeSlice";

import Home from "./pages/Home/Home.jsx";
import Detail from "./pages/details/Detail";
import Explore from "./pages/explore/Explore";
import SerachResult from "./pages/serachResult/SerachResult";
import E_404 from "./pages/404/E_404";
import Headder from "./components/Headder/Headder";
import Footer from "./components/Footer/Footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getApiConfig("/configuration"));
    genresCall();
  }, []);

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };
  return (
    <>
      <BrowserRouter>
        <Headder />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Detail />} />
          <Route path="/search/:query" element={<SerachResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<E_404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
