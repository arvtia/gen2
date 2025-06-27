import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all nav links
export const fetchNavlinks = createAsyncThunk(
  'navLinks/fetch',
  async () => {
    const response = await fetch('http://localhost:3002/navLinks');
    if (!response.ok) {
      throw new Error('Failed to fetch nav links');
    }
    const data = await response.json();
    return data;
  }
);

// Delete a nav link
export const deleteNavlinks = createAsyncThunk(
  'navLinks/delete',
  async (id) => {
    await fetch(`http://localhost:3002/navLinks/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

// Add a new nav link
export const addNavLinks = createAsyncThunk(
  'navLinks/add',
  async (link) => {
    const response = await fetch('http://localhost:3002/navLinks/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(link),
    });
    if (!response.ok) {
      throw new Error("Failed to add link");
    }
    const data = await response.json();
    return data;
  }
);

const navLinksSlice = createSlice({
  name: 'navLinks',
  initialState: {
    items: [],  // stores the list of nav links
    error: null, // stores any error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching nav links
      .addCase(fetchNavlinks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchNavlinks.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Adding a new nav link
      .addCase(addNavLinks.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addNavLinks.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Deleting a nav link
      .addCase(deleteNavlinks.fulfilled, (state, action) => {
        state.items = state.items.filter(link => link.id !== action.payload);
        state.error = null;
      });
  },
});

export default navLinksSlice.reducer;
