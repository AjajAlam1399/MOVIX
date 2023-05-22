import React, { useEffect, useState } from "react";

import "./style.scss";
import { useNavigate } from "react-router-dom";

import { useFetch } from "../../../hooks/UseFectch";

import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWraper/contentWraper";

function HeroBanner() {
  const { url } = useSelector((state) => state.home);

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    if (data) {
      const bg =
        url.backdrop +
        data.results[Math.floor(Math.random() * 20)]?.backdrop_path;
      setBackground(bg);
    }
  }, [data]);

  const navigate = useNavigate();

  const serchQueryHanddler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      // console.log(query);
    }
  };

  return (
    <>
      <div className="heroBanner">
        {!loading && (
          <div className="backdrop-img">
            <Img src={background} />
          </div>
        )}
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
              Million of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onKeyUp={serchQueryHanddler}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <button onClick={()=>{
                if(query.length>0){
                  navigate(`/search/${query}`,{state:{name:"Ajaj"}})
                }
              }} >Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
}

export default HeroBanner;
