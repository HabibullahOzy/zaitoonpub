// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';

// const TextEmarq = ({ value,onChange }) => {
//     const [editorValue, setEditorValue] = useState(value || '');

//   const handleChange = (content) => {
//     setEditorValue(content);
//     onChange?.(content);
//   };

//   const modules = {
//     toolbar: [
//       [{ font: [] }],
//       [{ size: ['small', false, 'large', 'huge'] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ color: [] }, { background: [] }],
//       [{ align: [] }],
//       ['clean'],
//     ],
//   };

//   const formats = [
//     'font', 'size',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'align',
//   ];

//   return (
//     <div className="my-4">
//       <ReactQuill
//         theme="snow"
//         value={editorValue}
//         onChange={handleChange}
//         modules={modules}
//         formats={formats}
//         className="bg-white rounded-lg"
//       />
//     </div>
//   );
// };

// export default TextEmarq;