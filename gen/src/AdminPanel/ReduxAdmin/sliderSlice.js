import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all slider images
export const fetchImagesSlider = createAsyncThunk(
    'sliderImage/fetchAll',
    async () => {
        const response = await fetch('http://localhost:3002/sliderImage');
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        console.log('Fetched images:', data); // Log response for debugging
        return data;
    }
);

// Add a new slider image
export const addSliderImage = createAsyncThunk(
    'sliderImage/add',
    async (image) => {
        console.log('Adding image:', image);  // Log image to add for debugging
        const response = await fetch('http://localhost:3002/sliderImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(image)
        });
        if (!response.ok) {
            throw new Error('Failed to add image');
        }
        const data = await response.json();
        console.log('Added image:', data); // Log added image for debugging
        return data;
    }
);

// Delete a slider image
export const deleteSliderImage = createAsyncThunk(
    'sliderImage/delete',
    async (id) => {
        await fetch(`http://localhost:3002/sliderImage/${id}`, {
            method: 'DELETE'
        });
        console.log('Deleted image with ID:', id); // Log deletion for debugging
        return id;
    }
);

// Update a slider image
export const updateSliderImage = createAsyncThunk(
    'sliderImage/update',
    async (image) => {
        console.log('Updating image:', image);  // Log image to update for debugging
        const response = await fetch(`http://localhost:3002/sliderImage/${image.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(image)
        });
        if (!response.ok) {
            throw new Error('Failed to update image');
        }
        const data = await response.json();
        console.log('Updated image:', data); // Log updated image for debugging
        return data;
    }
);

const sliderImage = createSlice({
  name: 'sliderImage',
  initialState: {
    items: [], // This initializes 'items' as an empty array
    error: null, // This will store error messages, if any
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesSlider.fulfilled, (state, action) => {
        state.items = action.payload; // Populate items with fetched data
        state.error = null; // Clear error when fetching is successful
      })
      .addCase(fetchImagesSlider.rejected, (state, action) => {
        state.error = action.error.message; // Store error message on failure
      })
      .addCase(addSliderImage.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add the new image to the items array
        state.error = null;
      })
      .addCase(addSliderImage.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateSliderImage.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(deleteSliderImage.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
        state.error = null;
      });
  },
});

export default sliderImage.reducer;
