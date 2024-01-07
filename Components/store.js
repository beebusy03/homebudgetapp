import { createStore } from 'redux';
import budgetReducer from './reducers';

const store = createStore(budgetReducer);

export default store;