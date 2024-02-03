import { Avatar, Badge, Input } from 'antd';
import React from 'react'
import Resizer from "react-image-file-resizer";
import axios from 'axios';
import { useSelector } from 'react-redux'

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const FileUploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = values.images;

        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    axios.post(`${process.env.REACT_APP_API}/uploadImages`, { image: uri }, {
                        headers: {
                            authToken: user ? user.token : "",
                        }
                    })
                        .then((res) => {
                            console.log('image upload res data', res);
                            setLoading(false)
                            allUploadedFiles.push(res.data);
                            setValues({ ...values, images: allUploadedFiles });
                        })
                        .catch((err) => {
                            setLoading(false)
                            console.log('cloudinary upload error', err);
                        })
                }, "base64"
                );

            }
        }
    };

    const handleImageRemove = (public_id) => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API}/removeImage`, { public_id },
            {
                headers: {
                    authToken: user ? user.token : "",
                }
            })
            .then((res) => {
                setLoading(false)
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                })
                setValues({ ...values, images: filteredImages });
            }).catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }
    return (
        <>
            <div className='container'>
                {values.images && values.images.map((image) => (
                    <Badge count="X"
                        key={image.public_id}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleImageRemove(image.public_id)}>
                        <Avatar
                            src={image.url}
                            shape='square' size={100}
                            className='m-3' />
                    </Badge>
                ))}
            </div>
            <div className='row'>
                <label>Choose File
                    <Input type='file' multiple accept='images/*' onChange={FileUploadAndResize} />
                </label>
            </div>
        </>
    )
}

export default FileUpload;