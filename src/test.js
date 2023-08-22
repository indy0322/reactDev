import { useEffect, useRef, useState } from "react";

function Test(){

    const [files, setFiles] = useState('')

    const inputRef = useRef()

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        console.log(e.dataTransfer.files)
        setFiles(e.dataTransfer.files)
    }

    if(files)
        return(<div>
            <ul>
                {Array.from(files).map((file,idx) => {
                    return <li key={idx}>{file.name}</li>
                })}
            </ul>
        </div>)
    return(
        <div>
            <div className="dropzone" style={{ border: "1px solid"}}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h1>Drage & Drop Files</h1>
                <h1>or</h1>
                <input type="file" multiple onChange={(e) => {setFiles(e.target.files)}} hidden ref={inputRef}/>
                <button onClick={() => {inputRef.current.click()}}>select files</button> 
            </div>
        </div>
    )
}

export default Test;