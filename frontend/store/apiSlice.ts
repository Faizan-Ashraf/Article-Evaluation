import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

import { RegisterData, loginCredentials, AuthResponse, Competition, Submission, User } from "@/types";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User', 'Competitions', 'Submissions'],
    endpoints: (builder) => ({
        register: builder.mutation<any, RegisterData>({ //register
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            })
        }),

        login: builder.mutation<AuthResponse, loginCredentials>({ //login
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    email: credentials.email,
                    password: credentials.password,
                },
                headers: { 'Content-Type': 'application/json' },
            })
        }),

        createCompetition: builder.mutation <Competition, Partial<Competition>>({
            query: (data)=> ({
                url: '/admin/competition',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Competitions']
        }),
    }),
})


export const { useRegisterMutation, useLoginMutation, useCreateCompetitionMutation } = apiSlice