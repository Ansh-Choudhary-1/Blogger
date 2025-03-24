import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();// /:slug yeh expected h tere route mei
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    console.log(post); 
    

    useEffect(() => {
        if (slug) { // Jb post create kri thi check kr slug tbse hi documentId h or Enforced h ki unique and also slug tujhe dataset mei nhi dikhega such is the document ID
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);



    const deletePost = async () => {
        console.log("button clicked");
        
        await appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
        console.log("Daffa ho");
    };


    const [imageUrl,setImageUrl]= useState("");
    useEffect(()=>{
        async function getUrl(){
            if(post){
            const url = await appwriteService.getFilePreview(post.featuredImage);
            setImageUrl(url)}
        }
        getUrl();
    },[post])

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={imageUrl}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button onClick={deletePost} bgColor="bg-red-500" >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
                <div>By - {post.email}</div>
            </Container>
        </div>
    ) : null;
}


// Production grade takeaway from here 
// 1. Check krne ke liye ki given post ka owner uss post ko dekh rha h ya nhi(to let him/her have update options) hm post mei userData.id ko postmei userId ke naam se save
//    krwainge uske baad idhr check krenge ki tera user ki jo userData.id ha voh given ki userId se match hoti h ya nhi agr hogyi toh options denge vrna nhi
// 2. useEffect mei async function call nhi hota directly toh tujhe useEffect ke andr ek or function bnakr usko async krna hoga jaise yha getPost pehle se async h
// 3. Jb post create kre tb documentId mei slug rkhdio or yahi slug url mei use krio(params/routes) specific post kholne ke liye aisa krne se slug/url easily readable bhi hojaiga and enforced hojaiga
//    ki unique ho(IMPORTANT)




// $collectionId :"67741bec001a340462d0"
// $createdAt : "2025-01-17T18:30:25.809+00:00"
// $databaseId : "67741bc4002ff4b9cdcd"
// $id : "chai-aur-code-1"
// $permissions : (3) ['read("user:678a9b41000b26458381")', 'update("user:678a9b41000b26458381")', 'delete("user:678a9b41000b26458381")']
// $updatedAt : "2025-01-17T18:30:25.809+00:00"
// content : "<p>heelo this is a blog&nbsp;</p>"
// featuredImage : "678aa1b7002ef1816267"
// status : "active"
// title : "chai aur code 1 "
// userId : "678a9b41000b26458381"

// Yeh upr diya hua ek sample h Properties ka jo teri post ke paas h 
// neeche ke 5 tune khud bnaye h collection and document ko setUp kr kr appwrite mei 
// Upr ke saare $ wale appwrite khud bnadeta h 