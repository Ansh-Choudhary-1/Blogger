import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite"; // components from appwrite

const client = new Client()
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectID);

const account = new Account(client);


export class AuthService{

    async createAccount({email,password,name}){
        try {
            const userAccount = await account.create(ID.unique(),email,password,name); // creates 
            if(userAccount){
                //call another method
                return await logIn({email,password});
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
            return await account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const session =  await account.getSession('current');
            if(session){
                return await account.get();
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
            const session = await account.getSession('current');
            if(session){
            return await account.deleteSession(session.$id);
        }
        
        } catch (error) {
            console.log("Appwrite serive :: logout :: error",error)
        }
    }
}

const authService =  new AuthService();

export default authService;