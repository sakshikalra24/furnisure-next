import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image"; // Import Image from next/image
import styles from "./Header.module.css"; // Import the CSS Module

const Header = () => {
  return (
    <AppBar position="sticky" className={styles.headerWrapper}> {/* Apply scoped style */}
      <Toolbar className={styles.header}> {/* Apply scoped style */}
        <Typography variant="h6" component="div" className={styles.logo} sx={{ flexGrow: 1 }}>
          <Image
            src="/assets/logo/FS Logo.png" 
            alt="FS Logo"
            width={350}
            height={50}
          />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
