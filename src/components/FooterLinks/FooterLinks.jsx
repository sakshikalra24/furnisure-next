"use client"

import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import "./FooterLinks.scss";

export const FooterLinks = () => {
  return (
    <section className="footer-links p-8 md:p-4">
      <div className="mx-auto max-w-5xl">
        <Link
          heading="About"
          subheading="Learn what we do here"
          imgSrc="/assets/loader/loader12.webp"
          href="/about"
        />
        <Link 
          heading="Clients"
          subheading="We work with great people"
          imgSrc="/assets/loader/loader14.webp"
          href="#"
        />
        <Link
          heading="Portfolio"
          subheading="Our work speaks for itself"
          imgSrc="/assets/loader/loader13.webp"
          href="#"
        />
        <Link
          heading="Catalogue"
          subheading="Keep a copy handy for yourselves"
          imgSrc="/assets/loader/loader15.webp"
          href="/assets/FurniSure Event Rentals Catalogue.pdf"
          download={true}
        >         
        </Link>
      </div>
    </section>
  );
};

const Link = ({ heading, imgSrc, subheading, href, download }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      download={download}
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          style={{ color: "#8c568f", fontSize: "24px", marginBottom: "5px" }}
          className="relative z-10 block text-4xl font-bold  transition-colors duration-500 group-hover:text-neutral-100"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-700">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
          height:"200px",
          width:"200px"
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-24 rounded-lg object-cover md:h-32 md:w-32"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      ></motion.div>
    </motion.a>
  );
};
