import { User } from "../types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User, token: string }>) => {
            const { user, token } = action.payload;
            state.token = token;
            state.user = user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        }

    }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer