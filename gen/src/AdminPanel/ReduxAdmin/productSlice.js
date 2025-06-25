import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchProducts = createAsyncThunk('products/fetchAll', async()=>{
    const response  = await fetch('http://localhost:3002/products');
    return await response.json();
});

export const addProduct = createAsyncThunk('products/add', async(product)=>{
    const response = await fetch("http://localhost:3002/products",{
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(product)
    });
    return await response.json();
});

export const updateProduct = createAsyncThunk('product/update', async(product)=>{
    await fetch(`http://localhost:3002/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-type':'application/json'},
        body: JSON.stringify(product)
    });
    return product;
});

export const deleteProduct = createAsyncThunk('product/delete', async (id) =>{
    await fetch(`http://localhost:3002/products/${id}`, {
        method: 'DELETE'
    });
    return id;
});


const productSlice = createSlice({
    name: 'product',
    initialState:{
        items: [],
        status: 'idle',
        error: null
    },
    // reducers:
    reducers: { },
    extraReducers: (builder) => {
    builder
        .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
        });
    }
});

export default productSlice.reducer;
