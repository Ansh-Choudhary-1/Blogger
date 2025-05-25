// import React from "react";
// import { Editor } from "@tinymce/tinymce-react";

// import { Controller } from "react-hook-form";

// export default function RTE({ name, control, label, defaultValue = "" }) {
//   return (
//     <div className="w-full">
//       {label && <label className="inline-block mb-1 pl-1">{label}</label>}

//       <Controller
//         name={name || "content"}
//         control={control}
//         render={({ field: { onChange } }) => (
//           <Editor
//             initialValue={defaultValue}
//             apiKey='qao5sgbszpb9mp752c40eyocl8w3jkime0fndo083rlziqze'
//             init={{
//               // initialValue: defaultValue,
//               height: 500,
//               menubar: true,
//               plugins: [
//                 "image",
//                 "advlist",
//                 "autolink",
//                 "lists",
//                 "link",

//                 "charmap",
//                 "preview",
//                 "anchor",
//                 "searchreplace",
//                 "visualblocks",
//                 "code",
//                 "fullscreen",
//                 "insertdatetime",
//                 "media",
//                 "table",

//                 "help",
//                 "wordcount",
//                 "anchor",
//               ],
//               toolbar:
//                 "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
//               content_style:
//                 "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//             }}
//             onEditorChange={onChange}
//           />
//         )}
//       />
//     </div>
//   );
// }

import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full mb-6">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="rounded-lg border border-gray-300 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              initialValue={defaultValue}
              apiKey="qao5sgbszpb9mp752c40eyocl8w3jkime0fndo083rlziqze"
              init={{
                height: 500,
                menubar: false, // Cleaner UI without menubar
                skin: "oxide",
                content_css: "default",
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table help wordcount"
                ],
                toolbar: `
                  undo redo | blocks | 
                  bold italic forecolor | 
                  alignleft aligncenter alignright alignjustify | 
                  bullist numlist outdent indent | 
                  link image media table |
                  code preview | help
                `,
                content_style: `
                  body { 
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
                    font-size: 15px; 
                    line-height: 1.6; 
                    color: #374151;
                  }
                  h1 { font-size: 2em; color: #111827; }
                  h2 { font-size: 1.5em; color: #111827; }
                  h3 { font-size: 1.17em; color: #111827; }
                  img { max-width: 100%; height: auto; }
                  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
                  table td, table th { border: 1px solid #e5e7eb; padding: 0.75em; }
                  blockquote { 
                    border-left: 4px solid #3b82f6; 
                    padding-left: 1em; 
                    margin: 1em 0; 
                    color: #4b5563;
                  }
                `,
                branding: false, // Remove TinyMCE branding
                statusbar: false, // Cleaner UI without statusbar
                toolbar_mode: 'sliding', // Modern toolbar behavior
                icons: 'thin', // Cleaner icons
                placeholder: "Start writing your content here...",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}