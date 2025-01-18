"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import About from "../components/About/About";
import Selection from "../components/Selection/Selection";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import Footer from "../components/Footer/Footer";
import "./index.css";

export const sendPageView = (url, title) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: url
    });
  }
};

const Home = () => {
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState();
  const pathname = usePathname(); // Access current pathname

  const fetchCategories = async () => {
    const productsRes = await fetch("https://furnisure.me/api/woocommerce?type=categories");
    const productsList = await productsRes.json();
    setProducts(productsList);
  };

  useEffect(() => {
    fetchCategories();
    const loadingTimeout = setTimeout(() => {
      document.querySelector(`.App`).classList.add("translated");
      setLoader(false);
    }, 4000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    if (!loader) {
      if (pathname === "/") {
        const homeElement = document.querySelector(`.Home`);
        const rootElement = document.querySelector("#root");
        const viewportHeight = window.innerHeight;
        if (homeElement && rootElement) {
          rootElement.style.height = `200vh`;
        }
      }
    }

    return () => {
      const rootElement = document.querySelector("#root");
      if (rootElement) {
        rootElement.style.height = "";
        rootElement.style.overflow = "";
      }
    };
  }, [loader, pathname, isClient]);

  // Update page title and send page view when pathname changes
  useEffect(() => {
    const fullUrl = window.location.href;
    const urlParts = fullUrl.split("/");
    let pagePath = urlParts[urlParts.length - 1];

    if (!isNaN(pagePath)) {
      pagePath = urlParts[urlParts.length - 2];
    }

    pagePath = pagePath.replace(/_/g, " ");
    pagePath = pagePath.replace(/\b\w/g, (char) => char.toUpperCase());

    const pageTitle = pagePath === '/' ? 'FurniSure Rentals' : pagePath;
    document.title = pageTitle; // Ensure this is set first

    // Push data to the Google Analytics dataLayer
    if (window.dataLayer) {
      console.log('Pushing to dataLayer:', {
        event: "page_view",
        page_title: pageTitle,
        page_path: fullUrl,
      });
      window.dataLayer.push({
        event: "page_view",
        page_title: pageTitle,
        page_path: fullUrl,
      });
    }

    // Send page view to Google Analytics with updated title
    sendPageView({
      url: fullUrl,
      title: pageTitle,
    });

    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Loader />
      <div className="Home">
        <Header />
        <div className="content">
          <Banner />
          <Selection />
          <About />
          <ProductSlider product={products} name="Featured Products" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
