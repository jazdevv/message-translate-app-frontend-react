import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useSelector } from 'react-redux'

const UserDataApi = createApi({
    reducerPath:"UserData",
    baseQuery:fetchBaseQuery({baseUrl:'http://127.0.0.1:3001',credentials:"include"}),
    endpoints: (builder)=>({
        getLoggUserData: builder.query({
            query:()=>'/auth/me',
            providesTags:()=>['resetUser']
        })
    }),
    tagTypes:['resetUser']
})

export const {useGetLoggUserDataQuery} = UserDataApi
export {UserDataApi}