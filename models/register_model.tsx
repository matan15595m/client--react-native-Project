import register from "../api/auth_api"
export type registerUser = {
    email: String,
    password: String,
    fullname:string,
    imageURL:string
}

const registerHandler = async (user: registerUser) => {
    try {
        const res = await register.register(user);
        return res;
    } catch (err) {
        console.log("Fail to register " + err);
    }
    
}
export default {registerHandler}