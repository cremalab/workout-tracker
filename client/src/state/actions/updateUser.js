export function updateUser(email, profilePicId){ 
    return {
        type: 'UPDATE_USER',
        payload: {
            email,
            profilePicId
        }
    }
}