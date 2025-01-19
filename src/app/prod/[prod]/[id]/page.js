"use client";

import React, { useState } from "react";
import Head from "next/head";

import { PropagateLoader } from "react-spinners";
import { Grid, Typography, Button, Box } from "@mui/material";
import EventHeader from "../../../../components/EventHeader/EventHeader";
import Footer from "../../../../components/Footer/Footer";
import { useParams } from "next/navigation";
import useProduct from "../../../../hooks/useProduct";
import useCategories from "../../../../hooks/useCategories";
import "./index.css";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [image, setImage] = useState();
  const { product, crossscale, upscale, loading } = useProduct(id, setImage);
  const { categories } = useCategories();

  if (loading) {
    return (
      <div className="loading">
        <PropagateLoader color={"#795548"} loading={loading} size={20} />
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      <Head>
        <title>{product?.name} - FurniSure Rentals</title>
        <meta
          name="description"
          content={product?.short_description || "Product details"}
        />
      </Head>
      <EventHeader categories={categories} />
      <div className="product-detail">
        <Grid container spacing={2}>
          <Grid sx={{ marginTop: "20px" }} container xs={12} md={6}>
            <Grid item xs={2}>
              <Box className="thumbnail-section">
                <Grid container direction="column">
                  {product?.images?.map((img, index) => (
                    <Grid key={index} item className="thumbnail">
                      <img
                        src={img?.src}
                        alt="Thumbnail"
                        className="thumbnail"
                        onClick={() => setImage(img?.src)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={10}>
              <Box className="image-section">
                <img src={image} alt="Main" className="main-image" />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="detail-section">
              <h3 className="product-title">{product?.name}</h3>
              <Typography variant="body2" className="product-description">
                <p
                  dangerouslySetInnerHTML={{
                    __html: product?.short_description || "",
                  }}
                />
              </Typography>
              <Button className="shop-button">Add to Cart</Button>
            </Box>
          </Grid>
        </Grid>

        <h1 className="dimension">Dimensions</h1>
        <div className="product-dimension">
          <img src={product?.images?.[0]?.src} alt="Dimension" />
          <div>
            <div className="dimension-grid">
              <strong>Categories:</strong>&nbsp;
              {product?.categories?.map((category, index) => (
                <span key={index}>
                  <a href="/" className="category-link">
                    {category?.name}
                  </a>
                  {index !== product?.categories?.length - 1 ? ", " : null}
                </span>
              ))}
            </div>
            <div className="dimension-grid">
              <p>Height</p>
              <p>{product?.dimensions?.height}</p>
            </div>
            <div className="dimension-grid">
              <p>Length</p>
              <p>{product?.dimensions?.length}</p>
            </div>
            <div className="dimension-grid">
              <p>Width</p>
              <p>{product?.dimensions?.width}</p>
            </div>
            <div className="dimension-grid seat">
              <p>Seat Height</p>
              <p>{product?.weight}</p>
            </div>
          </div>
        </div>

        <div className="description">{product?.description}</div>

        <div className="relatable_product">
          {/* {crossscale?.length > 0 && (
            <ProductSlider
              sell={true}
              products={crossscale}
              name="Related Products"
            />
          )} */}
          {/* {upscale?.length > 0 && (
            <ProductSlider
              sell={true}
              products={upscale}
              name="Products you might like!"
            />
          )} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
