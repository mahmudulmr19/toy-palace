import React from "react";
import Container from "../../components/global/Container";
import { useScrollTop } from "../../hooks";
import { useLoaderData } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { Helmet } from "react-helmet-async";
const ViewToyDetails = () => {
  useScrollTop();
  const data = useLoaderData();

  return (
    <Container className="my-20">
      <Helmet>
        <title>{data.toyName} - Toy Palace</title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src={data.toyImage}
            alt={data.toyName}
            className="w-full lg:h-96 object-contain"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{data.toyName}</h1>
          <p className="text-lg font-medium">
            Seller: <span className="font-normal">{data.sellerName}</span>
          </p>
          <p className="text-lg font-medium">
            Email: <span className="font-normal">{data.sellerEmail}</span>
          </p>
          <p className="text-lg font-medium">
            Price: <span className="font-normal">${data.price}</span>
          </p>
          <p className="text-lg font-medium flex items-center gap-1">
            Rating:
            <Rating readOnly value={data.rating} style={{ maxWidth: 100 }} />
          </p>
          <p className="text-lg font-medium">
            Available Quantity:{" "}
            <span className="font-normal">{data.availableQuantity}</span>
          </p>
          <p className="text-lg font-medium">
            Description: <span className="font-normal">{data.description}</span>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ViewToyDetails;
