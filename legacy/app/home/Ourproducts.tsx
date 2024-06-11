import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import SquareIcon from '@mui/icons-material/Square';
import axios from 'axios';
import Link from "next/link"
import ProductCard from "../ProductCard";
import { useRouter } from "next/navigation";
interface Product{
   id:number,
   name:string,
   price:number,
   category:string,
   stock:number,
   picture:string,
   userId:number,
   rating:number,
   numOfRating:number,
}
const Ourproducts:React.FC = () => {
const [products, setProducts] = useState<Product[]>([]);
const router=useRouter()

  useEffect(() => {
    
    axios.get<Product[]>('http://localhost:5000/Client/products')
      .then(response => {
        setProducts(response.data.slice(0, 8));
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <Box sx={{ padding: 3, marginTop: "50px" }}>
      
      <Typography variant="h5" component="h5" sx={{ color: "red", marginRight: 2, display: "flex", alignItems: "center" }}>
        <SquareIcon /> Our Products
      </Typography>

      <Typography variant="h4" component="div">
        Explore Our Products
      </Typography>
      
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard
              product={product}
               onClick={() =>{ router.push(`/Oneproduct/${product.id}`)}  }
              isWishlist={false}
              update={false}
              onRemove={()=>{}}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Link href={{ pathname: '/shop', query: { productId: products .map(product=>product.id)} }} >
        <Button variant="contained" style={{ color: "white", backgroundColor: "red" }} >
          View all products
        </Button>
        </Link>
      </Box>
      <hr />
    </Box>
  );
};

export default Ourproducts;
                      