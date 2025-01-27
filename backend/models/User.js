class User{
    username;
    #email="";
    #password="";
    myBooks = [];

    constructor(username,email,password){
        this.username = username;
        this.#email = email;
        this.#password = password;
    }

    get username(){
        return this.username;
    }

    get myBooks(){
        return this.myBooks;
    }
}

export default User;