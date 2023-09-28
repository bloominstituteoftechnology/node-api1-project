

const userSchema = {
    users : [],
    usersAreVisible : true,
    
    userDeleteMode : false,
    userIdToDelete : "",
    
    userAddMode : false,
    userObjectToAdd : {},
    
    userEditMode : false,
    userEditedOutput : "",
    userEditedId : "",

    userIdToSearch : "",
    

    spinnerOn : false,
}

const formSchema = {
    name : "",
    bio : "",
}

export const initialData = {
    userManager : userSchema,
    formManager : formSchema,
    initialVisibility : false,
    message : "",
}
