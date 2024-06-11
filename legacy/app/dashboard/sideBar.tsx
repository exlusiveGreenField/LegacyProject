'use client';

import React from 'react';
import { AppBar, Toolbar, Button, Box, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
interface SideBarProps {
  onClientsClick: () => void;
  onSellersClick: () => void;
  onProductsClick: () => void;
  onOrdersClick: () => void;
  onChartsClick: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  onClientsClick,
  onSellersClick,
  onProductsClick,
  onOrdersClick,
  onChartsClick,
}) => {
  const router=useRouter()
  const Logout = () => {
      localStorage.clear()
    router.push('/auth/login');
  };
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black', width: '100%' }}>
      
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>
      <Button color="inherit"sx={{ display: 'flex', justifyContent: 'flex-start',mr:25 }}>
            <b> Exclusive Dashboard </b>
          </Button>
       
      </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={onClientsClick}>
            Clients
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button color="inherit" onClick={onSellersClick}>
            Sellers
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button color="inherit" onClick={onProductsClick}>
            Products
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button color="inherit" onClick={onOrdersClick}>
            Orders
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button color="inherit" onClick={onChartsClick}>
            Statistics
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button color="inherit" onClick={Logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SideBar;