"use client"

import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate loading process with setTimeout
    const loadingTimeout = setTimeout(() => {
      document.querySelector(".App").classList.add("translated");
      setLoader(false);
    }, 7000);

    // Clear timeout on component unmount to avoid memory leaks
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

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
      {/* <div className="Home">
        <Header />
        <div className="content">
          <Banner />
          <Selection />
          <About />
          <ProductSlider product={categories} />
          <Footer />
        </div>
      </div> */}
    </div>
  );
};


export default Home;
