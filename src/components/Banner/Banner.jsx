"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import Next.js useRouter
import styles from "./Banner.module.css"; // Import CSS Module
import main15 from "../../../public/assets/main/main15.webp";
import main13 from "../../../public/assets/main/main13.webp";
import main14 from "../../../public/assets/main/main14.webp";
import main1 from "../../../public/assets/main/main1.webp";

const bannerOptions = [
  {
    name: "Home",
    description:
      "Hundreds of choices filtered down for the best of the best. For the purest of dream, An intensity of comfort and beauty, and ultimate functionality for our customers’ luxury bathroom experience.",
    image: "/assets/main/main5.webp",
    color: "#7f4f24",
    id: 0,
  },
  {
    name: "Sofa",
    description:
      "Hundreds of choices filtered down for the best of the best. For the purest of dream, An intensity of comfort and beauty, and ultimate functionality for our customers’ luxury bathroom experience.",
    image: "/assets/main/main13.webp",
    color: "#936639",
    id: 23,
  },
  {
    name: "Chairs",
    description:
      "Hundreds of choices filtered down for the best of the best. For the purest of dream, An intensity of comfort and beauty, and ultimate functionality for our customers’ luxury bathroom experience.",
    image: "/assets/main/main15.webp",
    color: "#b6ad90",
    id: 61,
  },
  {
    name: "Tables",
    description:
      "Hundreds of choices filtered down for the best of the best. For the purest of dream, An intensity of comfort and beauty, and ultimate functionality for our customers’ luxury bathroom experience.",
    image: "/assets/main/main14.webp",
    color: "#656d4a",
    id: 17,
  },
  {
    name: "Outdoor",
    description:
      "Hundreds of choices filtered down for the best of the best. For the purest of dream, An intensity of comfort and beauty, and ultimate functionality for our customers’ luxury bathroom experience.",
    image: "/assets/main/main1.webp",
    color: "#333d29",
    id: 18,
  },
];

const Banner = () => {
  const [image, setImage] = useState("/assets/main/main5.webp");
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const router = useRouter();

  const handleMouseEnter = (index) => {
    setImage(bannerOptions[index].image);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setImage(main15);
    setHoveredIndex(-1);
  };

  const handleClick = (option) => {
    let navName = option.name;
    if (option?.name?.toLowerCase() === "outdoor") {
      navName = `${option.name}_furniture`;
    }

    localStorage.setItem("selectedOptionId", option.id);
    localStorage.setItem("selectedOptionName", navName);

    if (option?.name?.toLowerCase() === "home") {
      router.push("/home");
    } else {
      router.push(`/${navName}`);
    }
  };

  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundAttachment: "fixed",
        overflow: "hidden",
        position: "relative",
      }}
    >
            <Box display="flex" width="100%" height="100vh">
        {bannerOptions.map((option, index) => (
          <Box
            key={index}
            sx={{
              width: `${100 / bannerOptions.length}%`,
              cursor: "pointer",
              textAlign: "center",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ height: "10px", background: option.color }}
              animate={{
                height: hoveredIndex === index ? "100vh" : "10px",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "100%",
                bottom: 0,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                // Create a name for the navigation that includes "_furniture" for Outdoor
                let navName = option.name;

                // If the option name is "Outdoor", modify the name for navigation
                if (option?.name?.toLowerCase() === "outdoor") {
                  navName = `${option.name}_furniture`; // Add "_furniture" suffix for outdoor category
                }

                // Save the id and exact name used in navigation to localStorage
                localStorage.setItem("selectedOptionId", option.id);
                localStorage.setItem("selectedOptionName", navName);

                // Now navigate based on the name, use navName in the URL for Outdoor
                if (option?.name?.toLowerCase() === "home") {
                  navigate("/home");
                } else {
                  navigate(`/${navName}`, {
                    state: {
                      id: option.id,
                      name: navName, // Use navName for state, including "_furniture" for outdoor
                    },
                  });
                }
              }}
            />
            <Typography
              className="banner-options"
              sx={{
                color: "#fcfcfc",
                position: "absolute",
                bottom: hoveredIndex === index ? "150px" : "80px",
                zIndex: 99999,
                textAlign: "center",
                left: "50%",
                fontFamily: "Brooklyn-Heavy",
                letterSpacing: "0px",
                transform: "translateX(-50%)",
                transition:
                  "bottom 0.5s ease-in-out, font-size 0.5s ease-in-out",
                width: "100%",
                fontOpticalSizing: "auto",
                fontSize: hoveredIndex === index ? "36px" : "32px",
                boxShadow: "-9px -1px #60494900",
                fontWeight: "600",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {option.name}
            </Typography>
            <Typography sx={{ display: "none" }}>
              {option.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Banner;
