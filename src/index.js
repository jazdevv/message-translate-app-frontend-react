import React from 'react'
import { createRoot } from'react-dom/client'
import './index.css'
import { RouterProvider} from "react-router-dom";
import router from './router';
import { Provider } from 'react-redux';
import {store} from './store/index'

const el = document.getElementById('root');
const root = createRoot(el)



root.render(
    <Provider store={store}>
        <RouterProvider router={router}/> 
    </Provider>
)