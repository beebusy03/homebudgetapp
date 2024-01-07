const budgetReducer = (state = { entries: [] }, action) => {
  switch (action.type) {
    case 'ADD_BUDGET_ENTRY':
      return { ...state, entries: [...state.entries, action.payload] };
    default:
      return state;
  }
};

export default budgetReducer;
