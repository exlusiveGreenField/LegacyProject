"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from '../authContext/authContext';

interface User {
  id: string;
  userName: string;
  email: string;
  role: string;
  address: string;
  CIN:number;
}

interface ProfileContextType {
  user: User | null;
  updateUser: (id: string, updatedUser: Partial<User>) => Promise<User | undefined>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const { user: authUser, token } = useAuth();
  const [user, setUser] = useState<User | null>(authUser);

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  const updateUser = async (id: string, updatedUser: Partial<User>): Promise<User | undefined> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
          throw new Error('No token found in localStorage');
      }
      const config = {
          headers: {
              'Authorization': `${token}`
          }
      };
      const response = await axios.put(
        `http://localhost:5000/Client/up/${id}`,
        updatedUser,
       config
      );
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfileContext.Provider value={{ user, updateUser }}>
      {children}
    </ProfileContext.Provider>
  );
};
