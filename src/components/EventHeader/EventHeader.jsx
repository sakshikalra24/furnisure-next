import * as React from "react";
import { useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import "./EventHeader.scss";

const upperItems = [
  "Seating",
  "Tables",
  "Arabic Furniture",
  "Outdoor Furniture",
  "Exhibition Furniture",
  "About Us",
  "Contact Us",
];

function getCategoriesByNameAndParent(categories, name, id) {
  const category = categories?.find(
    (cat) =>
      cat.name.toLowerCase() === name.toLowerCase() &&
      cat?.display !== "subcategories"
  );

  if (!category) {
    return [];
  }

  if (category && id === "id") {
    return category?.id;
  }

  return categories?.filter((cat) => cat.parent === category.id);
}

function EventHeader({ categories }) {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const popoverRef = React.useRef(null);
  const router = useRouter();

  const popoverContents = {
    Seating: getCategoriesByNameAndParent(categories, "seating"),
    Tables: getCategoriesByNameAndParent(categories, "tables"),
    "Arabic Furniture": getCategoriesByNameAndParent(
      categories,
      "Arabic Furniture"
    ),
    "Outdoor Furniture": getCategoriesByNameAndParent(
      categories,
      "Outdoor Furniture"
    ),
    "Exhibition Furniture": getCategoriesByNameAndParent(
      categories,
      "Exhibition Furniture"
    ),
  };

  const popOverIds = {
    Seating: getCategoriesByNameAndParent(categories, "seating", "id"),
    Tables: getCategoriesByNameAndParent(categories, "tables", "id"),
    "Arabic Furniture": getCategoriesByNameAndParent(
      categories,
      "Arabic Furniture",
      "id"
    ),
    "Outdoor Furniture": getCategoriesByNameAndParent(
      categories,
      "Outdoor Furniture",
      "id"
    ),
    "Exhibition Furniture": getCategoriesByNameAndParent(
      categories,
      "Exhibition Furniture",
      "id"
    ),
  };

  const handleMouseEnter = (item) => {
    setSelectedItem(item);
  };

  const handleMouseLeave = (event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.relatedTarget)
    ) {
      setSelectedItem(null);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setSelectedItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      className="event-header"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        color: "black",
        background: "none !important",
      }}
    >
      {/* Upper Layer */}
      <Toolbar
        sx={{
          justifyContent: "center",
          padding: "10px 0px",
          background: "#ffffffc7",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <a href="/">
            <Image
              src="/assets/logo/FS Logo.png"
              alt="Logo"
              width={250}
              height={80}
            />
          </a>
        </Box>
      </Toolbar>
      <Toolbar
        disableGutters
        className="lower-toolbar"
        sx={{
          justifyContent: "space-between",
          width: "100%",
          background: "#795548b3",
          height: "50px !important",
          minHeight: "50px !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              padding: "0px 80px",
              height: "100%",
              justifyContent: "space-around",
            }}
          >
            {upperItems.map((item) => (
              <Button
                key={item}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
                sx={{
                  color: selectedItem === item ? "black" : "white",
                  backgroundColor:
                    selectedItem === item ? "white" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  marginRight: 2,
                  zIndex: 1,
                  height: "100%",
                  "&:hover": {
                    backgroundColor:
                      selectedItem === item
                        ? "white"
                        : "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => {
                  if (item === "About Us") {
                    router.push("/about");
                  } else if (item === "Contact Us") {
                    router.push("/contact");
                  } else {
                    const formattedName = encodeURIComponent(item)
                      .toLowerCase()
                      .replace(/%20/g, "_");
                    router.push(`/${formattedName}/${popOverIds[item]}`);
                    setSelectedItem(null);
                  }
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Box>
      </Toolbar>
      {selectedItem && popoverContents[selectedItem]?.length > 0 && (
        <Box
          ref={popoverRef}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            width: "100vw",
            height: "300px",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            padding: 2,
          }}
        >
          <Grid container spacing={2}>
            {popoverContents[selectedItem]?.map((content) => (
              <Grid sx={{ padding: "20px" }} item xs={3} key={content?.name}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    const subcategoryName = encodeURIComponent(content?.name)
                      .toLowerCase()
                      .replace(/%20/g, "_");
                    const formattedName = encodeURIComponent(selectedItem)
                      .toLowerCase()
                      .replace(/%20/g, "_");
                    router.push(
                      `/${formattedName}/${subcategoryName}/${content?.id}`
                    );
                    setSelectedItem(null);
                  }}
                >
                  <img
                    src={content?.image?.src}
                    alt={content?.name}
                    width={60}
                    height={60}
                  />
                  <Typography
                    sx={{
                      marginLeft: 1,
                      color: "black",
                      cursor: "pointer",
                      fontFamily: "Brooklyn-Normal",
                      fontSize: "16px !important",
                    }}
                  >
                    {content?.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </AppBar>
  );
}

export default EventHeader;
