const ravel = (state, action) => {
    switch (action.type) {
        case 'ADD_USER_CREATED_RAVEL':
            return {
                id: action.id,
                ravel_title: action.ravel_title,
                text: action.ravel_uid

            }
        default:
            return state
    }
}



const ravels = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER_CREATED_RAVEL':
            if (state.map(m => m.id).includes(action.id)) {
                console.log("I am im if statement")
                return state;
            } else {
                console.log("I am im else statement")
                return [
                ...state,
                ravel(undefined, action)
                ]
            }
       
        default:
            return state
    }
};

export default ravels;