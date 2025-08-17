import React from 'react'
type TextAreaProp={
  id:string,
  className:string,
  placeholder:string,
  setValue:(val:string)=>void,
  value:string
}

export const TextArea:React.FC<TextAreaProp>= ({id,className,placeholder,value,setValue}) => {
  return (
     
    <textarea id={id}
    className={`p-4 text-sm bg-gray-800 border-2 border-gray-700 text-gray-100 rounded-lg focus:ring-cyan-400 focus:border-cyan-400 transition duration-200 resize-none shadow-inner ${className}`}
     value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
    />  )
}
