
export const addUser=(user)=>{
    return {
        type : 'addUser',
        payload : user
    }
}

export const removeUser=()=>{
    return {
        type : 'removeUser',
    }
}