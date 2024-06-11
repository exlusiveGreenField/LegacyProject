"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
  Rating,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import UndoIcon from "@mui/icons-material/Undo";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";
import{ jwtDecode} from "jwt-decode";
import Swal from "sweetalert2";
import Navbar from "@/app/Navbar";
import RelatedProducts from './RelatedProducts'
import SquareIcon from '@mui/icons-material/Square';
import Services from "@/app/Services";
import ScrollToTop from "@/app/ScorllToTop";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  picture: string;
  userId: number;
  description: string;
  rating:number;
  numOfRating:number;
}

interface DecodedToken {
  id: number;
}

const One: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  useEffect(() => {

    const pathname = window.location.pathname;
    console.log(pathname);
    
    const productId = pathname.split("/").pop();

    if (productId) {
      axios
        .get<Product>(`http://localhost:5000/Client/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the product!", error);
        });
    }
  }, []);

  const PlusMinus = (increment: number) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + increment, 1));
  };

  const addToCart = () => {
    let cartItems: (Product & { quantity: number })[] = JSON.parse(
      localStorage.getItem("Items") || "[]"
    );
    const existingItem = cartItems.find((item) => item.id === product?.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ ...product!, quantity });
    }
    localStorage.setItem("Items", JSON.stringify(cartItems));
    router.push("/cart");
  };

  const addToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (userId) {
      try {
        await axios.post("http://localhost:5000/Client/wishlist/add", {
          userId: userId,
          productId: product?.id,
        });

        Swal.fire({
          icon: "success",
          title: "Added to wishlist",
          text: `${product?.name} has been added to your wishlist!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error:any) {
        console.error("Error adding to wishlist:", error);
        let errorMessage =
          "There was an error adding the item to your wishlist.";
        if (
          error.response &&
          error.response.data === "Item is already in the wishlist"
        ) {
          errorMessage = "Item is already in your wishlist.";
        }
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      router.push("/signup");
    }
  };

  if (!product) return null;

  return (
    <div className="App">
      <Navbar />
      <Box sx={{ width: "90%", margin: "0 auto", mt: 4, mr: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={product.picture}
              alt={product.name}
              style={{ width: "70%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              {product.name}
            </Typography>
            <Typography variant="body1" sx={{ mr: 2, color: "green" }}>
              {product.stock ? "In Stock" : "Out of Stock"}</Typography>
              <Rating
          name="simple-controlled"
          precision={0.5}
          defaultValue={product.rating}
          max={5}
         readOnly
        ></Rating>
        
            
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              ${product.price}
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <IconButton onClick={() => PlusMinus(-1)} disabled={quantity === 1}>
                <RemoveIcon />
              </IconButton>
              <TextField
                value={quantity}
                inputProps={{ style: { textAlign: "center" } }}
                sx={{ width: 50, mx: 1, p: 0.5 }}
              />
              <IconButton onClick={() => PlusMinus(1)}>
                <AddIcon />
              </IconButton>
            
            <Button
              variant="contained"
              color="primary"
              sx={{
                ml: 2,
                p: 2,
                backgroundColor: "red",
                width: "200px",
                "&:hover": {
                  backgroundColor: "darkred",
                },
              }}
              onClick={addToCart}
            >
              Buy Now
            </Button>
            <IconButton onClick={addToWishlist}>
              <FavoriteBorderIcon />
            </IconButton>
            </Box>
          <Box
          sx={{
            maxWidth: 400,
            border: "1px solid #ccc",
            borderRadius: 2,
            padding: 2,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocalShippingIcon sx={{ mr: 1 }} />
            <Typography>Free Delivery</Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter your postal code for Delivery Availability
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
            <UndoIcon sx={{ mr: 1 }} />
            <Typography>Return Delivery</Typography>
          </Box>
          <Typography variant="body2">
            Free 30 Days Delivery Returns. Details
          </Typography>
        </Box> 
        </Grid>
        </Grid>
        <hr />
        <Typography variant="h5" component="h5" sx={{ color: "red", marginRight: 2, display: "flex", alignItems: "center",marginTop:"50px" }}>
        <SquareIcon /> Related Products
      </Typography>
      <RelatedProducts chosen={product.category} />
      <Services />
      <ScrollToTop />
      </Box>
      
    </div>
  );
};

export default One;
