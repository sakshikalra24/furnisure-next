"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import Header from "@/components/Header/Header";
import Banner from "@/components/Banner/Banner";
import About from "@/components/About/About";
import Selection from "@/components/Selection/Selection";
import "./index.css";

const Home = () => {
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [pathname, setPathname] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      setPathname(router.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      document.querySelector(`.App`).classList.add("translated");
      setLoader(false);
    }, 6000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    if (!loader) {
      if (isClient && pathname === "/home") {
        // Only run on client-side
        const homeElement = document.querySelector(`.Home`); // Use scoped class names
        const rootElement = document.querySelector("#root"); // Target the root container
        const viewportHeight = window.innerHeight; // Get the viewport height
        if (homeElement && rootElement) {
          const homeHeight = homeElement.offsetHeight;
          rootElement.style.maxHeight = `${homeHeight}px`; // Set max-height of root container
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
    // setLoading(true);
    // Category.get().then((res) => {
    //   setCategories(res?.data?.filter((cate) => cate?.display !== "subcategories"));
    //   Product.get().then((res) => setProducts(res?.data));
    //   setLoading(false);
    // });
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
          {/* <ProductSlider />
          <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
