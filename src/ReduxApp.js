import { configureStore, createSlice } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

const birdsSlice = createSlice({
    name: "birds",
    initialState: [],
    reducers : {
        addBird : (state, action) => {
            const newBird = {
                name: action.payload,
                likes: 0,
            };
            state.push(newBird);
        },
        increaseLikes: (state, action) => {
            const bird = state.find((bird) => bird.name === action.payload);
            // state[index].likes++;
            if(bird) {
                bird.likes++;
            }
        },
        decreaseLikes: (state, action) => {
            const bird = state.find((bird) => bird.name === action.payload);
            if(bird && bird.likes > 0) {
                bird.likes --;
            }
            
        }
    }
})
const store = configureStore({
    reducer: birdsSlice.reducer,
});

const BirdApp = () => {
    const [birdname, setBirdName] = useState("");
    const birds = useSelector((state) => state);
    const dispatch = useDispatch();

    function handleAdd() {
        if(birdname !== "") {
            dispatch(birdsSlice.actions.addBird(birdname));
            setBirdName("");
        }
    };

    return(
        <div>
            <h1>Bird List</h1>
            <h2>Add Bird</h2>
            <input type="text" placeholder="Enter bird name" value={birdname}
            onChange={(e) => setBirdName(e.target.value)}/>
            <button onClick={handleAdd}>Add</button>

            {birds.map((bird) => {
                return(
                <div key={bird.name}>
                    <h3>{bird.name}</h3>
                    <p>Likes : {bird.likes}</p>
                    <button onClick={() => dispatch(birdsSlice.actions.increaseLikes(bird.name))}>+</button>
                    <button onClick={() => dispatch(birdsSlice.actions.decreaseLikes(bird.name))}>-</button>
                </div>
                );
            })}
        </div>
    )
}

const ReduxApp = () => {
    return(
        <Provider store={store}>
            <BirdApp />
        </Provider>
    )
}
export default ReduxApp;