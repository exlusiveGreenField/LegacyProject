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
  price: GLfloat;
  stock: GLfloat;
  description: string;
  userId: number;
  discountedPrice?: number;
  discount?: number;
  rating: number;
  numOfRating:number
}

const categories: string[] = [
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
  const search = useSearchParams();
  const router = useRouter();
  const [update,setUpdate]= useState<Boolean>(false)

  const [products, setProducts] = useState<Product[]>([]);
  const [chosen, setChosen] = useState<string>(
    search.get('category') || "Women's fashion"
  );

  useEffect(() => {
    if (chosen) {
      axios
        .get(`http://localhost:5000/Client/products/category/${chosen}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [chosen,update]);

  const chooseCategory = (newCategory: string) => {
    setChosen(newCategory);
  };

  return (
    <div>
      <Navbar />
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
              {products.map((prod) => {
               return <Grid key={prod.id} item xs={12} sm={6} md={4} lg={3}>
                  <ProductCard
                  update={update}
                  setUpdate={setUpdate}
                    product={prod}
                    onClick={() => {
                      router.push(`/Oneproduct/${prod.id}`);
                    }}
                    isWishlist={false}
                  />

                </Grid>
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Services />
    </div>
  );
};

export default Shop;
