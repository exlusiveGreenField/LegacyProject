
"use client"

import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import SquareIcon from '@mui/icons-material/Square';
import axios from "axios";
import Link from "next/link";
import ProductCard from "../ProductCard";
import { useRouter } from "next/navigation";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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
  
}

const Todays = () => {
  const router = useRouter();

  const getNextMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    );
    return nextMidnight;
  };

  const calculateTimeLeft = () => {
    const difference = +getNextMidnight() - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:5000/Client/products/FS');
        const productsWithDiscounts = response.data.map(product => {
          const discount = Math.floor(Math.random() * 21) + 10; 
          const discountedPrice = product.price - (product.price * (discount / 100));
          return {
            ...product,
            discount,
            discountedPrice: Number(discountedPrice.toFixed(2)) 
          };
        });
        setProducts(productsWithDiscounts.sort(() => 0.5 - Math.random()).slice(0, 8)); 
      } catch (error) {
        console.error('There was an error fetching the products!', error);
      }
    };

    fetchProducts();
  }, []); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextMidnight = getNextMidnight();
      if (+new Date() >= +nextMidnight) {
       
        axios.get<Product[]>('http://localhost:5000/Client/products/FS')
          .then(response => {
            const productsWithDiscounts = response.data.map(product => {
              const discount = Math.floor(Math.random() * 21) + 10; 
              const discountedPrice = product.price - (product.price * (discount / 100));
              return {
                ...product,
                discount,
                discountedPrice: Number(discountedPrice.toFixed(2)) 
              };
            });
            setProducts(productsWithDiscounts.sort(() => 0.5 - Math.random()).slice(0, 8)); 
          })
          .catch(error => {
            console.error('There was an error fetching the products!', error);
          });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const renderTimer = (timeLeft: TimeLeft): JSX.Element => {
    return (
      <span>
        {timeLeft.days}d :{timeLeft.hours}h :{timeLeft.minutes}m :{timeLeft.seconds}s
      </span>
    );
  };

  return (
    <Box sx={{ padding: 3, marginTop: "50px" }}>
      <Typography variant="h5" component="h5" sx={{ color: "red", marginRight: 2, display: "flex", alignItems: "center" }}>
        <SquareIcon /> Today's
      </Typography>

      <Typography variant="h4" component="div">
        {renderTimer(timeLeft)}
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
           <ProductCard
              product={product}
               onClick={() =>{ router.push(`/Oneproduct/${product.id}`)}  }
              isWishlist={false}
              onRemove={()=>{}}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Link href={{
          pathname: '/shop',
          query: { productId: products.map(product => product.id) }
        }}>
          <Button variant="contained" style={{ color: "white", backgroundColor: "red" }}>
            View all products
          </Button>
        </Link>
      </Box>
      <hr />
    </Box>
  );
};

export default Todays;
