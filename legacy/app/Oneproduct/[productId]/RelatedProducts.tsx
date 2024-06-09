"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import axios from "axios";

import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "../../ProductCard";
interface Product {
  id: number;
  name: string;
  picture: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  stock: number;
  userId: number;
  rating: GLfloat;
  numOfRating: number;
  // quantity: number;
}



const Related = ({chosen}:{chosen:string}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (chosen) {
      axios
        .get(`http://localhost:5000/Client/products/category/${chosen}`)
        .then((response) => {
          setProducts(response.data.slice(0,4));
          console.log(products);
          
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [chosen]);

  return (
    <div>
     
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        
            <Grid container spacing={3} sx={{ marginTop: 5 }}>
              {products.map((prod) => (
                <Grid key={prod.id} item xs={12} sm={6} md={4} lg={3}>
                  <ProductCard
                    product={prod}
                    onClick={() => {
                      router.push(`/Oneproduct/${prod.id}`)
                       
                    }}
                    isWishlist={false}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
       
      
    </div>
  );
};

export default Related;
