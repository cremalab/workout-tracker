export function updateUser(email){ 
    return {
        type: 'UPDATE_USER',
        payload: {
            email
        }
    }
}