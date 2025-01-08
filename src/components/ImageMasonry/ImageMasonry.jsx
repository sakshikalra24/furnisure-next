`use client`

import React from "react";
import { Masonry } from "@mui/lab";
import { Box } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

import "./ImageMasonry.scss";

import main1 from "../../../public/assets/main/main1.webp";
import main2 from "../../../public/assets/main/main2.webp";
import main3 from "../../../public/assets/main/main3.webp";
import main4 from "../../../public/assets/main/main4.webp";
import main5 from "../../../public/assets/main/main5.webp";
import main6 from "../../../public/assets/main/main6.webp";

const items = [
  { id: 1, height: 300, img: main1 },
  { id: 2, height: 350, img: main2 },
  { id: 3, height: 400, img: main3 },
  { id: 4, height: 400, img: main4 },
  { id: 5, height: 350, img: main5 },
  { id: 6, height: 300, img: main6 },
];

const MasonryLayout = () => {
  return (
    <div className="socail">
      <h1>Follow our Socials</h1>
      <Box sx={{ width: "100%", height: "90vh", overflowY: "auto" }}>
        <Masonry columns={3}>
          {items.map((item) => (
            <Box
              className="masonary-box"
              key={item.id}
              sx={{
                height: item.height,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.5rem",
                borderRadius: 1,
              }}
            >
              <div className="social-div">
                <InstagramIcon fontSize="large" />
              </div>
              <img style={{ height: "100%", width: "100%" }} src={item.img?.src} />
            </Box>
          ))}
        </Masonry>
      </Box>
    </div>
  );
};

export default MasonryLayout;
