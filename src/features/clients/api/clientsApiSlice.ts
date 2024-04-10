import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TClient, TReport, TReportData } from "../../../types";

export const clientsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  reducerPath: "clientsApi",
  tagTypes: ["Clients", "Reports", "ReportData"],
  endpoints: build => ({
    getClients: build.query<TClient[], void>({
      query: () => "clients",
      providesTags: ["Clients"]
    }),
    addClient: build.mutation<TClient, Partial<TClient>>({
      query: (body) => ({
        url: "clients",
        method: "POST",
        body
      }),
      invalidatesTags: ["Clients"]
    }),
    removeClient: build.mutation<TClient, string>({
      query: (id) => ({
        url: `clients/${id}`,
        method: "DELETE",
        id
      }),
      invalidatesTags: ["Clients"]
    }),
    getReportsByClient: build.query<TReport[], string>({
      query: (id) => `reports?clientId=${id}`,
      providesTags: ["Reports"]
    }),
    addReport: build.mutation<TReport, any>({
      query: (params) => ({
        url: `reports`,
        method: "POST",
        body: params
      }),
      invalidatesTags: ["Reports"]
    }),
    removeReport: build.mutation<TReport, string>({
      query: (id) => ({
        url: `reports/${id}`,
        method: "DELETE",
        id
      }),
      invalidatesTags: ["Reports"]
    }),
    addReportData: build.mutation<TReportData, any>({
      query: (params) => ({
        url: `reportData`,
        method: "POST",
        body: params
      }),
      invalidatesTags: ["ReportData"]
    }),
    removeReportData: build.mutation<TReportData, string>({
      query: (id) => ({
        url: `reportData/${id}`,
        method: "DELETE",
        id
      }),
      invalidatesTags: ["ReportData"]
    }),
    getReportDataByReportId: build.query<TReportData[], string>({
      query: (reportId) => `reportData?reportId=${reportId}`,
      providesTags: ["ReportData"]
    })
  })
});

export const {
  useGetClientsQuery,
  useAddClientMutation,
  useRemoveClientMutation,
  useGetReportsByClientQuery,
  useAddReportMutation,
  useRemoveReportMutation,
  useAddReportDataMutation,
  useRemoveReportDataMutation,
  useGetReportDataByReportIdQuery
} = clientsApiSlice;
