import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

export default function RTE({name, control, label, defaultvalue=""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block pl-1 mb-1'>{label}</label>}
        <Controller
        name={name|| "content"} // form field name
        control={control} // Connects this field to React Hook Form
        render={({field: {onChange}})=>(
            <Editor
             apiKey="9ls9yqz5wf1bngbvg1wdbtrqr512d72sy2gqu9e9hw8wsuwm"
             initialValue={defaultvalue}
             init={
                {initialValue: defaultvalue,
                 height: 500,
                 menubar: true,
                 plugins: [
                    "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
                ],
                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }
            }
            onEditorChange={onChange} // Updates form state when the editor's content changes
            />
        )}
        />
     </div>
    
  )
}


// Production grade things from here 
//    RTE(rich text editor) does not directly support react forms hence We use Controller
//    which acts as a link  between react forms and RTE control comes from useForm and is then passed into
//    controller as a ref render prop in controller defines how to render the controlled component
//    Like in this case it is Editor and we can pass input as field: properties which has properties like
//    onChange value ref and name