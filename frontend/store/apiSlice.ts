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

        getCompetitions: builder.query<Competition[], void>({
            query: () => `/home/all-competitions`,

            providesTags: (result, error) => result ? [{ type: 'Competitions' }] : []
        }),




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

        createCompetition: builder.mutation<Competition, Partial<Competition>>({
            query: (data) => ({
                url: '/admin/competition',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Competitions']
        }),


        getSubmissions: builder.query<Submission[], number>({
            query: (competitionId) => `/admin/competitions/${competitionId}/submissions`,

            providesTags: (result, error, id) => result ? [{ type: 'Submissions', id }] : []
        }),

        evaluateCompetition: builder.mutation<Submission[], number>({
            query: (competitionId) => ({
                url: `/admin/evaluate/${competitionId}/competition`,
                method: 'GET'
            }),
            invalidatesTags: (result, error, id) => result ? [{ type: 'Submissions', id }] : []
        })


    }),
})


export const { useRegisterMutation, useLoginMutation, useCreateCompetitionMutation, useGetSubmissionsQuery, useEvaluateCompetitionMutation, useGetCompetitionsQuery } = apiSlice