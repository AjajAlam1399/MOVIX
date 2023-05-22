import React from "react";

import { useParams } from "react-router-dom";

import { Carousel } from "../../../components";
import { useFetch } from "../../../hooks/UseFectch";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  console.log(data);

  return (
   <>
   {
    data?.results?.length>=1 && (
      <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
    )
   }
   </>
  );
};

export default Recommendation;
