import { useSelector } from "react-redux";
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite"; // components from appwrite

export class AuthService{
    client = new Client(); //Client is created (this connects our application to appwrite server)
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
            this.account = new Account(this.client);//Account is created (this provide authentication services for users it is like a user management and will be initialised only for once)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name); // creates 
            if(userAccount){
                //call another method
                return await this.logIn({email,password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async logIn({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const session =  await this.account.getSession('current');
            if(session){
                return await this.account.get();
            }
        } catch (error) {
            if(error.code===401){
                console.log('No active session. Guest user.');
                
            }else{
            console.log("Appwrite serive :: getCurrentUser :: error",error);
        }}
        return null;
    }

    async logout(){
        try {
            const session = await this.account.getSession('current');
            if(session){
            return await this.account.deleteSession(session.$id);
        }
        
        } catch (error) {
            console.log("Appwrite serive :: logout :: error",error)
        }
    }
}

const authService =  new AuthService();

export default authService;