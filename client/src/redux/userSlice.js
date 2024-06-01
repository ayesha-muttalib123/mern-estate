// const { createSlice } = require('@reduxjs/toolkit');



// // Initial state for the user slice
// const initialState = {
//     currentUser: null,
//     error: null,
//     loading: false
// };

// // Creating the user slice
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         signInStart: (state) => {
//             state.loading = true;
//         },
//         signInSuccess: (state, action) => {
//             state.currentUser = action.payload;
//             state.loading = false;
//             state.error = null;
//         },
//         signInFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         }
//     }
// });

// // Exporting actions and reducer
// const { signInStart, signInFailure, signInSuccess } = userSlice.actions;
// module.exports = {
//     signInStart,
//     signInFailure,
//     signInSuccess,
//     userReducer: userSlice.reducer
// };


// import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user slice
// const initialState = { value: 0 };

// const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         increment: (state) => {
//             state.value += 1;
//         },
//         decrement: (state) => {
//             state.value -= 1;
//         }
//     }
// });

// export const { increment, decrement } = counterSlice.actions;
// export default counterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user slice
const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

// Creating the user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Exporting actions and reducer
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
