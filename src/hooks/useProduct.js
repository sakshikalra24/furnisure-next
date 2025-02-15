import { useState, useEffect } from "react";

const useProduct = (id, setImage) => {
  const [product, setProduct] = useState(null);
  const [crossscale, setCrossscale] = useState([]);
  const [upscale, setUpscale] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      setLoadingRelated(true);
      setError(null);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        // Fetch product details
        const response = await fetch(`${baseUrl}?type=products&id=${id}`);
        const data = await response.json();

        if (!data) {
          setError("Product data not found");
          setLoading(false);
          return;
        }

        setImage(
          data?.images?.[1]?.src
            ? data?.images?.[1]?.src
            : data?.images?.[0]?.src
        ); // Set the image
        setProduct(data);

        const cross = data?.cross_sell_ids || [];
        const up = data?.upsell_ids || [];

        // Fetch cross-sell products
        const fetchCrossSell = async () => {
          if (cross.length === 0) return; // Avoid making unnecessary API calls

          const crossResults = await Promise.all(
            cross.map((prodId) =>
              fetch(`${baseUrl}?type=products&id=${prodId}`).then((res) =>
                res.json()
              )
            )
          );
          const uniqueCrossSellProducts = crossResults
            .map((res) => res?.data)
            .filter(Boolean);
          setCrossscale(uniqueCrossSellProducts);
        };

        // Fetch upsell products
        const fetchUpsell = async () => {
          if (up.length === 0) return; // Avoid making unnecessary API calls

          const upsellResults = await Promise.all(
            up.map((prodId) =>
              fetch(`${baseUrl}?type=products&id=${prodId}`).then((res) =>
                res.json()
              )
            )
          );
          const uniqueUpsellProducts = upsellResults
            .map((res) => res?.data)
            .filter(Boolean);
          setUpscale(uniqueUpsellProducts);
        };

        // Fetch both cross-sell and upsell products in parallel
        await Promise.all([fetchCrossSell(), fetchUpsell()]);

        setLoadingRelated(false);
      } catch (err) {
        setError("Error fetching product");
        console.error(err);
        setLoading(false);
        setLoadingRelated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, crossscale, upscale, loading, loadingRelated, error };
};

export default useProduct;
