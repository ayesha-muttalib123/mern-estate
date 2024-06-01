// const { configureStore } = require('@reduxjs/toolkit');
// const userReducer = require('../redux/userSlice');  // Ensure the path is correct

// const store = configureStore({
//     reducer: {
//         user: userReducer
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false
//         })
// });

// module.exports = { store };
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';

export const store = configureStore({
    reducer: {
        counter: userReducer
    },
});


