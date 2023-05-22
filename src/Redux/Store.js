import { configureStore } from "@reduxjs/toolkit";

import  HomeSlice  from "./ReduxSlice/HomeSlice";



const  Store = configureStore({
  reducer:{
    home:HomeSlice
  }
});




export default Store;
