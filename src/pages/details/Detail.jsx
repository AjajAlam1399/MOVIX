import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import "./style.scss";
import DetailBanner from "./detailBanner/DetailBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosection/VideosSection";
import Recommendation from "./carousels/Recommendation";
import { useFetch } from "../../hooks/UseFectch";
import Similar from "./carousels/Similar";

function Detail() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <DetailBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar  mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
}

export default Detail;
