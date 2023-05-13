import React, { createContext, useReducer, useContext } from 'react';
import userReducer from '../reducer/userReducer';
import { useAuthContext } from './auth_context';
import { useEffect } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
    user: null,
    isLoaded: false,
};

// Create context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const { username } = useAuthContext();

    const setUser = (user) => {
        dispatch({ type: 'SET_USER', payload: user });
    };

    // Fetch user data from API
    useEffect(() => {
        if (username) {
            axios.get(`http://localhost:8080/api/user/${username}`)
                .then((res) => {
                    // Update user in state with response data
                    setUser(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        else {
            clearUser();
        }
    }, [username]);

    const clearUser = () => {
        dispatch({ type: 'CLEAR_USER' });
    };

    // Fetch user by username
    const fetchUserByUsername = async (username) => {
        try {
        const response = await axios.get(`http://localhost:8080/api/user/${username}`);
        const user = response.data;
        return user;
        } catch (error) {
        console.error('Error fetching user by username:', error);
        }
    };

    return (
        <UserContext.Provider value={{ ...state, setUser, clearUser, fetchUserByUsername }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};