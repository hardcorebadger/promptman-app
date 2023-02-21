import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import {GET, useAuth} from '../contexts/AuthContext';
// pages
import Login from '../pages/PageLogin';
import Register from '../pages/PageCreateAccount';

// components
import LoadingScreen from './LoadingScreen';
import { useNavigate } from "react-router-dom";
import navigationService from "./NavigationService";
import useQueryString from "../hooks/useQueryString";
// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Login/>;
  } 
 
  return <div>{children}</div>;
  
}
