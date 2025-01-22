class User{
    username;
    #email="";
    #password="";

    constructor(username,email,password){
        this.username = username;
        this.#email = email;
        this.#password = password;
    }

    get username(){
        return this.username;
    }
}

export default User;