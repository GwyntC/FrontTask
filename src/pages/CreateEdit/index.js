import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "../Initial/reducers/reducer";
import thunkMiddleware from "redux-thunk";
import withAuthorities from "../../decorators/withAuthorities";
import {Provider} from "react-redux";
import React from "react";
import CreateEdit from "./containers/CreateEdit";

const rootReducer = combineReducers({
    reducer,
});
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

export default withAuthorities(props => (
    <Provider store={store}>
        <CreateEdit {...props} />
    </Provider>
));