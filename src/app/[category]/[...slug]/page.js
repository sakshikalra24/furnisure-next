"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Grid,
  Card,
  CardContent,
  Pagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./index.css";
import { PropagateLoader } from "react-spinners";
import { useParams, useRouter } from "next/navigation";
import Footer from "../../../components/Footer/Footer";
import EventHeader from "../../../components/EventHeader/EventHeader";

const ProductList = () => {
  const [productsList, setProductsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const { category, slug } = useParams();
  const router = useRouter();

  // Loading States
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  // Category and Subcategory States
  const [subId, setSubId] = useState(slug?.[slug?.length - 1]);
  const [subName, setSubName] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [expandedAccordions, setExpandedAccordions] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch Products
  const fetchProducts = async (page) => {
    setCategoryLoading(true);
    const response = await fetch(
      `https://furnisure.me/api/woocommerce?type=categories&id=${subId}&page=${page}&size=${productsPerPage}`
    );
    const data = await response.json();
    setTotalProducts(data?.total);
    setProductsList(data?.data);
    setCategoryLoading(false);
  };

  // Fetch Categories
  const fetchCategories = async () => {
    setCategoryLoading(true);
    const response = await fetch(
      "https://furnisure.me/api/woocommerce?type=categories"
    );
    const res = await response.json();
    setCategories(res);

    const mainCats = res.filter((cat) => cat.display !== "subcategories");
    setMainCategories(mainCats);

    const allSubCats = res.filter((cat) => cat.parent);
    setSubCategories(allSubCats);

    setCategoryLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(currentPage);
  }, [slug?.length, currentPage]);

  // Navigate to main category
  const handleMainCategoryClick = (categoryId, categoryName) => {
    setSubId(categoryId);
    setSubName("");
    setCurrentPage(1);
    const categoryEncoded = encodeURIComponent(categoryName)
      .toLowerCase()
      .replace(/%20/g, "_");
    router.replace(`/${categoryEncoded}/${categoryId}`);
  };

  // Handle Accordion Toggle for Subcategories
  const handleAccordionToggle = (categoryId) => {
    setExpandedAccordions((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId); // Remove if already expanded
      } else {
        return [...prev, categoryId]; // Add to expanded
      }
    });
  };

  // Handle Subcategory Selection
  const handleSubcategoryClick = (category, subcategory) => {
    setSubId(subcategory.id);
    setSubName(subcategory.name);
    setCurrentPage(1);
    const subcategoryName = encodeURIComponent(subcategory.name)
      .toLowerCase()
      .replace(/%20/g, "_");
    const categoryName = encodeURIComponent(category.name)
      .toLowerCase()
      .replace(/%20/g, "_");
    router.replace(`/${categoryName}/${subcategoryName}/${subcategory.id}`);
  };

  const handleProductClick = (name, id) => {
    const productName = encodeURIComponent(name)
      .toLowerCase()
      .replace(/%20/g, "_");
    router.replace(`/prod/${productName}/${id}`);
  };

  // Pagination Logic
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Head>
        <title>
          {subName ? `${subName} Products` : `${category} Products`}
        </title>
        <meta
          name="description"
          content={`Explore ${subName || category} products in our store!`}
        />
      </Head>

      <EventHeader categories={categories} />

      {/* Background Category Section */}
      <div className="background-category mb-10">
        <div className="category-heading">
          <h1>{category || ""}</h1>
        </div>
      </div>

      {/* Products List Heading */}
      <h2 className="products-heading">Products List</h2>

      {categoryLoading ? (
        <div className="loading flex justify-center align-items m-50 h-[50vh]">
          <PropagateLoader
            color={"#795548"}
            loading={categoryLoading}
            size={20}
          />
        </div>
      ) : (
        <>
          {/* Main Categories Section */}
          <div className="product-page">
            <div className="main-categories">
              {mainCategories?.map((category) => {
                const isExpanded = expandedAccordions.includes(category.id);
                const hasSubcategories = subcategories.some(
                  (sub) => sub.parent === category.id
                );

                return (
                  <Accordion key={category.id} expanded={isExpanded}>
                    <AccordionSummary
                      expandIcon={
                        hasSubcategories ? (
                          <ExpandMoreIcon
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents the summary click from triggering navigation
                              handleAccordionToggle(category.id);
                            }}
                          />
                        ) : (
                          <div style={{ visibility: "hidden" }} />
                        )
                      }
                    >
                      <Typography
                        onClick={() =>
                          handleMainCategoryClick(category.id, category.name)
                        }
                        style={{
                          cursor: "pointer",
                          fontWeight: category.id === subId ? "bold" : "normal", // Highlight active category
                          color: category.id === subId ? "#795548" : "inherit", // Change color for active category
                        }}
                      >
                        {category.name}
                      </Typography>
                    </AccordionSummary>

                    {/* Subcategories */}
                    {hasSubcategories && (
                      <AccordionDetails>
                        <div>
                          {subcategories
                            .filter((sub) => sub.parent === category.id)
                            .map((subcategory) => (
                              <div
                                key={subcategory.id}
                                onClick={() =>
                                  handleSubcategoryClick(category, subcategory)
                                }
                              >
                                <Typography>{subcategory.name}</Typography>
                              </div>
                            ))}
                        </div>
                      </AccordionDetails>
                    )}
                  </Accordion>
                );
              })}
            </div>

            {/* Product List */}
            {productsList.length > 0 && (
              <div className="product-list">
                <Grid container spacing={2}>
                  {productsList?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Card
                        className="card"
                        onClick={() => handleProductClick(item?.name, item?.id)}
                      >
                        <img
                          src={item.images?.[1]?.src || item.images?.[0]?.src}
                          alt={item.name}
                        />
                        <CardContent>
                          <h6 className="card-title">{item.name}</h6>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              siblingCount={1}
              boundaryCount={1}
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#000",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#795548",
                  color: "#ffffff",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "#795548",
                  color: "#ffffff",
                },
              }}
            />
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default ProductList;
