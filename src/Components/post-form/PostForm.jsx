// import React , {useCallback ,useEffect} from 'react';

// import { useForm } from "react-hook-form";
// import { Button, Input, Select, RTE } from "..";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//   // these props are from react hook form post me agr title ha toh wahi title wrna empty
//   const { register, handleSubmit, watch, setValue, control, getValues } =
//     useForm({
//       defaultValues: {
//         title: post?.title || "",
//         slug: post?.$id || "",
//         content: post?.content || "",
//         status: post?.status || "active",
//       },
//     });

//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userData);
//   // console.log("Current User:",userData);
  

//   const submit = async (data) => {
//     //this is scenario 1 where post is present and updating an exciting post
//     if (post) {
//       // agr post ha ur usme image ha toh appwrite me upload krdo
//       const file = data.featuredimage?.[0]
//         ? await appwriteService.uploadFile(data.featuredimages[0])
//         : null;
//       if (file) {
//         // agr file ha toh delete kar sakte ha
//         appwriteService.deleteFile(post.featuredImage);
//       }

//       //update post with slug and spreading the data
//       const dbPost = await appwriteService.updatePost(post.$id, {
//         ...data,
//         featuredImage: file ? file.$id : undefined,
//       });

//       if (dbPost) {
//         navigate(`/post/${dbPost.$id}`);
//       }
//     }

//     // this is scenario 2 creating a new post
//     else {
//       const file = await appwriteService.uploadFile(data.featuredimages[0]);

//       if(file && userData) {

//         const fileId = file.$id;//syntax 
//         data.featuredimages = fileId;
//         const dbPost = await appwriteService.createPost({
//           ...data,
//           userId: userData.$id
//         });

//         if (dbPost) {
//           navigate(`/post/${dbPost.$id}`);
//         }
//       }
//     }
//   };
//   //slug transform agr value ha and uska type string toh value jo return hogi ase operation hone ke baad
//   // we used useCallback bcoz when the site refreshed it always recreted always check value and return value and re render
//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string")
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d\s]+/g, "-")
//         .replace(/\s/g, "-");

//     return "";
//   }, []);

//   // we used useEffect in this update the slug dynamically and sets up watch subscription
//   //watch is the function in the react hook form to listens to the changes in the form
// useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(value.title), { shouldValidate: true });
//       }
//     });

//     return () => subscription.unsubscribe(); //cleanup function for useeffect hook unsubscribe the subscription of watch listener.
//   }, [watch, slugTransform, setValue]);

//   return (
//     <form
//       onSubmit={handleSubmit(submit)}
//       className="flex flex-wrap  shadow-lg rounded-lg p-6 md:p-10 "
//     >
//       <div className=" w-full md:w-2/3 px-2">
//         <Input
//           label="Title :"
//           placeholder="Title"
//           className="mb-4 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
//           {...register("title", { required: true })}
//         />
//         <Input
//           label="Slug :"
//           placeholder="Slug"
//           className="mb-4 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
//           {...register("slug", { required: true })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), {
//               shouldValidate: true,
//             });
//           }}
//         />
//         <RTE
//           label="Content :"
//           name="content"
//           control={control}
//           defaultValue={getValues("content")}
//           className="flex mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className=" w-full md:w-1/3 px-2">
//         <Input
//           label="Featured Image :"
//           type="file"
//           className="mb-4 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 "
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("featuredimages", { required: !post })}
//         />
//         {post && (
//           <div className="w-full mb-4">
//             <img
//               src={appwriteService.getFilePreview(post.featuredImage)}
//               alt={post.title}
//               className="rounded-lg shadow-md w-full object-cover"
//             />
//           </div>
//         )}
//         <Select
//           options={["active", "inactive"]}
//           label="Status"
//           className="mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           {...register("status", { required: true })}
//         />
//         <Button
//           type="submit"
//           bgColor={post ? "bg-green-500" : undefined}
//           className="w-full"
//         >
//           {post ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }

import React, { useCallback, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.featuredimages?.[0]
        ? await appwriteService.uploadFile(data.featuredimages[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.featuredimages[0]);

      if (file && userData) {
        const fileId = file.$id;
        data.featuredimages = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8"
    >
      <div className="md:flex gap-8">
        {/* Left Column (2/3 width) */}
        <div className="w-full md:w-2/3 space-y-6">
          <Input
            label="Title:"
            placeholder="Enter post title"
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            {...register("title", { required: true })}
          />

          <Input
            label="Slug:"
            placeholder="Post slug will be auto-generated"
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Content:</label>
            <RTE
              name="content"
              control={control}
              defaultValue={getValues("content")}
              className="min-h-[300px] border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="w-full md:w-1/3 space-y-6 mt-6 md:mt-0">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Featured Image:
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("featuredimages", { required: !post })}
            />
          </div>

          {post && (
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status:"
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            className={`w-full py-3 px-4 justify-center rounded-md shadow-sm text-sm font-medium text-white ${
              post ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              post ? 'focus:ring-green-500' : 'focus:ring-blue-500'
            } transition-colors duration-200`}
          >
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
