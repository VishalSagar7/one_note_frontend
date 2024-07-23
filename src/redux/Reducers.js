
const initialState = {
  userData: JSON.parse(localStorage.getItem('userData')) || null,
};

const userReducer = (state = initialState, action) => {
    
  switch (action.type) {
    case 'addUser':
      
      localStorage.setItem('userData', JSON.stringify(action.payload));
      return {
        userData: action.payload,
      };

    case 'removeUser':
    
      localStorage.removeItem('userData');
      return {
        userData: null,
      };

    default:
      return state;
  }
};

export default userReducer;

  

