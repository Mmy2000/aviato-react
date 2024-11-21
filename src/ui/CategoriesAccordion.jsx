import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Skeleton from "@mui/material/Skeleton";
import { styled, useTheme } from "@mui/material/styles";

// Styled components
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[0],
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[100],
  "& .MuiTypography-root": {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[50],
}));

const SubcategoryLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.secondary,
  "&:hover": { color: theme.palette.primary.main, fontWeight: 500 },
}));

export default function CategoriesAccordion({ className, onCategorySelect }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/categories/api/categories`
        );
        setCategories(response?.data?.results);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className={className}>
      {!loading ? (
        categories.map((category, idx) => (
          <StyledAccordion key={idx} TransitionProps={{ unmountOnExit: true }}>
            <StyledAccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              className="bg-white dark:bg-gray-800 dark:text-gray-200" // Background color for the summary
            >
              <Typography
                variant="subtitle1"
                component="span"
                className="capitalize" // Text color for the title
                onClick={() => onCategorySelect(category.id, "category")}
              >
                {category.name}
              </Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails className="bg-white dark:bg-gray-800">
              {" "}
              {/* Background color for the details */}
              <div className="flex flex-col gap-2">
                {category.subcategories.map((subcategory, idx2) => (
                  <SubcategoryLink
                    key={idx2}
                    onClick={(e) => {
                      e.preventDefault(); // Prevents page reload
                      onCategorySelect(subcategory.id, "subcategory");
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      className="capitalize text-gray-700 dark:text-gray-200" // Text color for subcategory
                    >
                      {subcategory.name}
                    </Typography>
                  </SubcategoryLink>
                ))}
              </div>
            </StyledAccordionDetails>
          </StyledAccordion>
        ))
      ) : (
        <div className="flex flex-col gap-4 py-4">
          {[...Array(8)].map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              width="100%"
              height={40}
              className="bg-gray-200 dark:bg-gray-700" // Skeleton background for dark mode
            />
          ))}
        </div>
      )}
    </div>
  );
}
