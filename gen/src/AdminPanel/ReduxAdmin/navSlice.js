import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { json } from "express";


export const fetchNavlinks = createAsyncThunk ( 'navLink/fetch', 
    async () =>{
        const response  = await fetch('http://localhost:3002/navLinks')
        if(!response.ok) {
            throw new Error('Failed to fetch images');
        } 
        const data = await response.json();
        // console.log(data);
        return data;
    }
)

export const deleteNavlinks = createAsyncThunk( 'navLinks/delete', 
    async (id) =>{
        const response = await fetch(`http://localhost:3002/navLinks/${id}`, {
            method: 'DELETE'
        })
        return id;
    }
)


export const addNavLinks = createAsyncThunk( 'navLinks/Add', 
    async (link) =>{
        const response = fetch(`http://localhost:3002/navLinks/`, {
            method: 'POST',
            headers: { 'content-type': 'appliction/json'},
            body: JSON.stringify(link)
        })
        if(!response.ok){
            throw new Error("can't perform this action")
        }
        const data = await response.json();
        return data;
    }
)


const createSlice = createSlice({
    name:'navLinks',
    initialState: {
        items:[],
        error: null,
    }
})