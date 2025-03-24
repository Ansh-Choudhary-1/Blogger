import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

const client = new Client()
                        .setEndpoint(conf.appwriteUrl)
                        .setProject(conf.appwriteProjectID);

const databases = new Databases(client);
const bucket = new Storage(client);

export class Service{

    async createPost({title, slug, featuredImage, status, userId,content,email}){
        try {
            
            const response =  await databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug, // Slug ko hm documentId bna rhe h idhr toh yeh enforced h ki unique ho
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    email
                }
            )
            console.log("Document created successfully:", response);
            return response;
            
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error",error)
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){//userId not needed cuz hm ussi ko update krna allow krenge jisski id hogi 
        
        try {
            return await databases.updateDocument(
                conf.appwriteDatabaseID, // databaseId
                conf.appwriteCollectionID, // collectionId
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status
                }, // data (optional)
                // permissions (optional)
            );
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
            
        }
    }

    async deletePost(slug){
        
        try {
                await databases.deleteDocument(
                conf.appwriteDatabaseID, // databaseId
                conf.appwriteCollectionID, // collectionId
                slug // queries (optional)
            );
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){ // this give a specific post/document by it's id
        try {
            return await databases.getDocument(
                conf.appwriteDatabaseID, // databaseId
                conf.appwriteCollectionID, // collectionId
                slug, // documentId
            );
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false;
            
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){//Query use krne ke lie Appwrite mei index zaroor bnaio
        try {// this gives all the post/document present in collections
            return await databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
            console.log("Posts retrieved: ", posts);
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false;
        }
    }

    //file upload/delete service

    async uploadFile(file){
        try {
            return await bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file   // Jb laut kr aye isko smjh lio or msg delete krdio
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false;   
        }
    }

    async deleteFile(fileId){
        try {
            await bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false;
        }

    }

    async getFilePreview(fileId){
        console.log(fileId);
        
        try {
            const response = await bucket.getFilePreview(
                conf.appwriteBucketID,
                fileId
            )
            console.log(response);
            return response;
            
            
        } catch (error) {
            console.log(error);
            
        }                
    }
}

const service = new Service()
export default service;



// Appwrite mei 3 cheeze hoti h Databases>collections>documents && Storage>Files && Account for authentication purposes
// Tera data store hota h documents(Like posts) mei or files(like Photos) store hoti h Storage mei