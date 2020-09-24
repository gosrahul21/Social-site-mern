import axios from 'axios'
import React from 'react'

const InputAvatar = () => {
    const fileSelectedHandler =async event =>{
        const fd = new FormData();
        fd.append('avatar',event.target.files[0],event.target.files[0].name)
        axios.put('/api/profile/avatar',fd,{
            onUploadProgress: (ProgressEvent)=>{
                console.log("upload Progress ", Math.round(100*ProgressEvent.loaded/ProgressEvent.total));
            }
        }
        
        
        ).then(()=>console.log('image uploader')).catch((err)=>console.log(err));

    }
    return (
        <div>
            <div className="App">
                <input type="file"
                onChange={fileSelectedHandler}>

                </input>
            </div>
        </div>
    )
}

export default InputAvatar;