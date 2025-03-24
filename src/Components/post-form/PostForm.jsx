import React,{useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select,RTE} from '../index'
import appwriteService from "../../appwrite/config"
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function PostForm({post}) {
    console.log(post);
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title||'',
            slug: post?.$id||'',
            content: post?.content||'',
            status: post?.status||'active',
        }
    });

    const navigate = useNavigate()
    const userData = useSelector((state) =>state.auth.userData)
    

    const submit = async(data)=>{
        try {
            console.log("Submit function called with data:", data);
            
            if (post !=null){
                console.log("Updating an existing post.");
                const file = data.image[0]?await appwriteService.uploadFile(data.image[0]):null;
                console.log("File uploaded:", file);
                if(file){
                    await appwriteService.deleteFile(post.featuredImage);
                    console.log("Old featured image deleted.");
                }
                const dbPost = await appwriteService.updatePost(post.$id,{
                    ...data,
                    featuredImage: file ? file.$id: undefined
                })
                
                console.log("Post updated:", dbPost);
                    if(dbPost){
                        navigate(`/post/${dbPost.$id}`)
                        return;
                    } 
                   
            }else{
                console.log("Creating a new post.");
                
                const file = await appwriteService.uploadFile(data.image[0]);
                console.log("File uploaded for new post:", file);

                if(file){
                    const fileId = file.$id //$id ek reserved field h jo appwrite deta h hr resource ko
                    data.featuredImage = fileId; // featuredImage is directly added to data
                    const dbPost =  await appwriteService.createPost({
                        ...data,
                        userId: userData.$id,// userData authentication ke time bn kr store mei daaldiya tha
                        email: userData.email,
                    })

                    console.log("Post created:", dbPost);
                    if(dbPost){
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.log("Error in form submit", error);
            
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value ==='string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-") // d== digits, s==spaces
            .replace(/\s/g,'-')
        }
    },[])

    
    useEffect(()=>{
        const subscription = watch(((value,{name})=>{ //Value of all the input in the form and name is the input which has changed
            if(name === 'title'){
                setValue('slug',slugTransform(value.title),
                    {shouldValidate: true}
                )
            }
        }))

        return ()=>{
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])

    const[imageUrl,setImageUrl] = useState("")

if(post){
    useEffect(()=>{
        async function getUrl(){
        const url = await appwriteService.getFilePreview(post.featuredImage);
        setImageUrl(url);
        }
        getUrl()
    },[post.featuredImage])
}

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} {...register("content", { required: true })} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm

// Production grade things from here
// 1. 
//      Watch : reactively access the current state of the form inputs  so when a user interacts with the form, you can respond to changes dynamically
//      setValue : programatically sets the value of an input(Mostly jb prefilling krni hoti h kisi input ki tb kaam ata h) yeh value set hone ke baad register hoti h
//      getValue : used to fetch the current form data at a specific point in time without subscribing to changes
// 2. Kis tareeke se watch ko use kr kr setValue krte h kisi or input ki
// 3. Image upload krne ke liye accept mei types daaldio
// 4. bs ek baar class Import krni h fir tu uske andr ke function directly use kr skta h
// 5. pehle upload file kradio or agr uske baad if(file) kr kr post bnaio ya creata document
// 6. To prefill a form useForm({ defaultValues:{title:,etc.etc.}})
