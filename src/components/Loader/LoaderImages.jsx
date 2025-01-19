import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Paths updated for the public folder
const loaderImages = [
  { image: "/assets/loader/loader13.webp", top: "40%", left: "80%", height: "480px", width: "450px" },
  { image: "/assets/loader/loader10.webp", top: "32%", left: "0%", height: "450px", width: "350px" },
  { image: "/assets/loader/loader5.webp", top: "0%", left: "38%", height: "400px", width: "350px" },
  { image: "/assets/loader/loader15.webp", top: "22%", left: "28%", height: "500px", width: "450px" },
  { image: "/assets/loader/loader17.webp", top: "60%", left: "40%", height: "500px", width: "450px" },
  { image: "/assets/loader/loader3.webp", top: "70%", left: "80%", height: "450px", width: "450px" },
  { image: "/assets/loader/loader6.webp", top: "30%", left: "14%", height: "450px", width: "350px" },
  { image: "/assets/loader/loader19.webp", top: "0%", left: "50%", height: "450px", width: "400px" },
  { image: "/assets/loader/loader1.webp", top: "65%", left: "0%", height: "450px", width: "350px" },
  { image: "/assets/loader/loader12.webp", top: "0%", left: "80%", height: "500px", width: "450px" },
  { image: "/assets/loader/loader9.webp", top: "62%", left: "25%", height: "500px", width: "350px" },
  { image: "/assets/loader/loader2.webp", top: "60%", left: "60%", height: "500px", width: "450px" },
  { image: "/assets/loader/loader4.webp", top: "30%", left: "40%", height: "500px", width: "450px" },
  { image: "/assets/loader/loader11.webp", top: "0%", left: "18%", height: "450px", width: "450px" },
  { image: "/assets/loader/loader7.webp", top: "0%", left: "0%", height: "400px", width: "400px" },
  { image: "/assets/loader/loader14.webp", top: "67%", left: "15%", height: "420px", width: "350px" },
  { image: "/assets/loader/loader8.webp", top: "30%", left: "60%", height: "450px", width: "450px" },
  { image: "/assets/loader/loader16.webp", top: "0%", left: "60%", height: "450px", width: "450px" },
];

const LoaderImages = () => {
  const [images, setImages] = useState(loaderImages.map((image) => ({ ...image, isVisible: false })));

  useEffect(() => {
    const timer = setInterval(() => {
      setImages((prevImages) => {
        const nextIndex = prevImages.findIndex((img) => !img.isVisible);
        if (nextIndex !== -1) {
          const updatedImages = [...prevImages];
          updatedImages[nextIndex].isVisible = true;
          return updatedImages;
        }
        clearInterval(timer);
        return prevImages;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {images.map(
        (pos, index) =>
          pos.isVisible && (
            <motion.img
              key={index}
              src={pos.image}
              alt={`Loader Image ${index}`}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                height: pos.height,
                width: pos.width,
              }}
              className={`image-${index + 1}`} // Adding a class for styling
              initial={{ scale: 0.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: "easeInOut" }}
            />
          )
      )}
    </>
  );
};

export default LoaderImages;
