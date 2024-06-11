"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "../ProductCard";
import Services from "@/services/page";
import Navbar from "../Navbar";

interface Product {
  id: number;
  name: string;
  picture: string;
  price: number;
  stock: number;
  description: string;
  userId: number;
  discountedPrice?: number;
  discount?: number;
  rating: number;
  numOfRating: number;
}

const categories: string[] = [
  "All",
  "Women's fashion",
  "Men's fashion",
  "Electronics",
  "Home & lifestyle",
  "Sports & Outdoors",
  "Baby's toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const Shop = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [update, setUpdate] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [chosen, setChosen] = useState<string>(searchParams.get("category") || "All");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response =
          chosen === "All"
            ? await axios.get("http://localhost:5000/Client/products")
            : await axios.get(
                `http://localhost:5000/Client/products/category/${chosen}`
              );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [chosen, update]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    const newSearchQuery = searchParams.get("search") || "";
    const newCategory = searchParams.get("category") || "All";
    setSearchQuery(newSearchQuery);
    setChosen(newCategory);
  }, [searchParams]);

  const chooseCategory = (newCategory: string) => {
    setChosen(newCategory);
    setSearchQuery("");
    router.push(`/shop?category=${newCategory}`);
  };

  return (
    <div  style={{backgroundColor:"darkred"}}> 
      <Navbar />
      <div style={{width:'90%' , marginLeft:"80px",backgroundColor:"darkred"}} >
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Box>
          <Typography
            component="h2"
            sx={{
              marginBottom: 2,
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "left",
              marginLeft: "16px",
              color:'white'
            }}
          >
            Our Shop
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ marginTop: 5, marginBottom: 2, justifyContent: "center" }}
          >
            {categories.map((cats) => (
              <Button
                key={cats}
                variant="contained"
                style={{
                  backgroundColor: chosen === cats ? "darkred" : "red",
                  color: "white",
                }}
                onClick={() => chooseCategory(cats)}
              >
                {cats}
              </Button>
            ))}
          </Stack>
          <Box>
            <Grid container spacing={3} sx={{ marginTop: 5 }}>
              {filteredProducts.map((prod) => (
                <Grid key={prod.id} item xs={12} sm={6} md={4} lg={3}>
                  <ProductCard
                  onRemove={()=>{}}
                    update={update}
                    setUpdate={setUpdate}
                    product={prod}
                    onClick={() => {
                      router.push(`/Oneproduct/${prod.id}`);
                    }}
                    isWishlist={false}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      </div>
    </div>
  );
};

export default Shop;
