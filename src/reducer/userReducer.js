const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload, isLoaded: true };
        case 'CLEAR_USER':
            return { ...state, user: null, isLoaded: false };
        default:
            return state;
    }
};

export default userReducer;