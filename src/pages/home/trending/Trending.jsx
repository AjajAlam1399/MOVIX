import React, { useEffect, useState } from "react";

import ContentWrapper from "../../../components/contentWraper/contentWraper";

import SwitchTab from "../../../components/switchTab/SwitchTab";
import { useFetch } from "../../../hooks/UseFectch";

import Carousel from '../../../components/carousel/Carousel'

function Trending() {
  const [endpoint, setEndPoint] = useState("day");

  const { loading, data } = useFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
}

export default Trending;
