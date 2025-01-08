// pages/index.js or src/app/page.js (if you're using App directory in Next.js 13+)

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import About from "../../components/About/About";
import Selection from "../../components/Selection/Selection";
import ProductSlider from "../../components/ProductSlider/ProductSlider" // Import your ProductSlider here
import "./index.css"; // Your global styles

const Home = () => {
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [pathname, setPathname] = useState("");
  const [products, setProducts] = useState();

  const router = useRouter();

  const fetchCategories = async () => {
    const productsRes = await fetch(
      "http://localhost:3000/api/woocommerce?type=categories"
    );
    const productsList = await productsRes.json();
    setProducts(productsList);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      setPathname(router.pathname);
    }
    fetchCategories()
  }, [router.pathname]);

  useEffect(() => {
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
      if (isClient && pathname === "/") {
        // Only run on client-side
        const homeElement = document.querySelector(`.Home`);
        const rootElement = document.querySelector("#root");
        const viewportHeight = window.innerHeight;
        if (homeElement && rootElement) {
          const homeHeight = homeElement.offsetHeight;
          rootElement.style.maxHeight = `${homeHeight}px`;
          rootElement.style.overflow = "hidden"; // Prevent scrolling
        }
      }
    }

    return () => {
      const rootElement = document.querySelector("#root");
      if (rootElement) {
        rootElement.style.maxHeight = "";
        rootElement.style.overflow = "";
      }
    };
  }, [loader, pathname, isClient]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default Home;
