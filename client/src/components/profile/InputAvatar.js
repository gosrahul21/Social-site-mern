import axios from 'axios'
import React,{useState} from 'react'

const InputAvatar = () => {

    const [uploadProgress,setUploadProgress] = useState(null);

    const fileSelectedHandler =async event =>{
        const fd = new FormData();
        fd.append('avatar',event.target.files[0],event.target.files[0].name)
        axios.put('/api/profile/avatar',fd,{
            onUploadProgress: (ProgressEvent)=>{
                setUploadProgress(Math.round((ProgressEvent.loaded/ProgressEvent.total)*100));
            }
        }).then(()=>console.log('image uploaded')).catch((err)=>console.log(err));

    }


    const onFileSubmit =(event) =>{
        event.preventDefault();
        const file= event.target.avatar.files[0]
        const fd = new FormData();
        fd.append('avatar',file,file.name)
        axios.put('/api/profile/avatar',fd,{
            onUploadProgress: (ProgressEvent)=>{
                setUploadProgress(Math.round((ProgressEvent.loaded/ProgressEvent.total)*100));
            }
        }).then(()=>console.log('image uploaded')).catch((err)=>console.log(err));

    }
    return (
        <div>
            <form className="App" onSubmit={onFileSubmit}>
                <input type="file"
                name="avatar"></input>
                <input type="submit" value="upload" className="btn btn-primary" ></input>
                {uploadProgress?`${uploadProgress}% uploaded`:null}
            </form>
        </div>
    )
}

export default InputAvatar;