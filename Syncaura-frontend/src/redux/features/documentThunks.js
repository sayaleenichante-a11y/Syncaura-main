import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// 1️ Fetch all documents
export const fetchDocuments = createAsyncThunk(
  "documents/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/documents`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch documents");
    }
  }
);

// 2️ Create new document
export const createDocument = createAsyncThunk(
  "documents/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/documents`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create document");
    }
  }
);

// 3 Delete document
export const deleteDocument = createAsyncThunk(
  "documents/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/documents/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete document");
    }
  }
);
