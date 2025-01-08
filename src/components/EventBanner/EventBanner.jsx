'use client'

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

import main10 from "../../../public/assets/main/main10.webp";
import main7 from "../../../public/assets/main/main7.webp";
import main8 from "../../../public/assets/main/main8.webp";
import main14 from "../../../public/assets/main/main14.webp";
import main9 from "../../../public/assets/main/main9.webp";

import "./EventBanner.scss"

const imgs = [main10, main7, main8, main14, main9];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const EventBanner = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <GradientEdges />
    </div>
  );
};

const Images = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc?.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100vh",
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video w-screen shrink-0 rounded-xl bg-neutral-800 object-cover"
          >
            {/* Using next/image for optimized image rendering */}
            {/* <Image
              src={imgSrc}
              alt={`banner-img-${idx}`}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            /> */}
          </motion.div>
        );
      })}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex }) => {
  return (
    <div
      style={{ bottom: 0, padding: "20px", background: "#5851233d" }}
      className="mt-4 dots absolute flex w-full justify-center gap-2"
    >
      {imgs.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};

export default EventBanner;
