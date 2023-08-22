import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FloatingLabel, Form, Button} from "react-bootstrap"
import axios from "axios";

function Write(){
    const [username, setUsername] = useState('')
    const [articleId, setArticleId] = useState('')
    const [articleContent, setArticleContent] = useState('')
    const [articleTitle, setArticleTitle] = useState('')
    const [articleImage, setArticleImage] = useState('')
    const [imageList, setImageList] = useState('')

    useEffect(() => {
        let headers = new Headers({
            "Content-Type": "application/json",
        })
        const token = localStorage.getItem("user")
        if(token && token !== null){
            headers.append("Authorization", "Barer " + token)
        }

        let option = {
            headers: headers,
            method: "POST",
            body: JSON.stringify({token: token})
        }
        
        fetch("/pageauth",option)
            .then(async (response) => {
                if(response.status === 403){
                    window.location.href = "/"
                }
                else if(response.status == 200){
                   return await response.json()
                }
                else{
                    new Error(response);
                }
            }).then((res) => {
                setUsername(res.responsedata)
                //setArticleId(res.responsedata)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

    const onChangeArticleId = (e) => {
        setArticleId(e.target.value)
        console.log("글 아이디 : " + articleId)
    }

    const onChangeArticleContent = (e) => {
        setArticleContent(e.target.value)
        console.log("글 내용 : " + articleContent)
        
    }

    const onChangeArticleTitle = (e) => {
        setArticleTitle(e.target.value)
        console.log("글 제목 : ",articleTitle)
        
    }

    const onChangeArticleImage = (e) => {
        setArticleImage(e.target.files)
        console.log("글 이미지 : ",e.target.files)
    }

    const onClickArticle = () => {

        /*var formdata = new FormData()
        var i
        var imageList = []
        for(i=0;i<articleImage.length;i++){
            console.log(articleImage[i])
            imageList.push(articleImage[i])
        }
        console.log(imageList)
        imageList.forEach((element) => 
            formdata.append('image',element)
        )
        console.log(formdata.get('image'))*/
        
        var formdata = new FormData();
        formdata.append('userId',username)
        formdata.append('contents',articleContent)
        Array.from(articleImage).map(e => formdata.append('image',e))
        //formdata.append('image',articleImage)
        formdata.append('title',articleTitle)

        axios.post('/api/article/save',formdata,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        .then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
        
        
    }

    const onClickArticleImage = () => {

        const token = localStorage.getItem("user")

        axios.post('/api/article/findimage',{
            userId:username
        })
        .then((res)=>{
            console.log(res.data)
            setImageList(res.data)
        })
    }

    return(
        <div>
            <h1>메인 페이지</h1>
            <p>{username}</p>
            
            <FloatingLabel controlId="floatingTextarea2" label="아이디">
                <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                name='userId'
                //onChange={onChangeArticleId}
                value={username}
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="제목">
                <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                onChange={onChangeArticleTitle}
                name='title'
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="내용">
                <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                onChange={onChangeArticleContent}
                name='contents'
                />
            </FloatingLabel>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control type="file" multiple name="image" onChange={onChangeArticleImage}/>
            </Form.Group>
            
            <div contentEditable="true">
            <img src={'data:image/;base64,' + imageList}></img>
            </div>

            <Button variant="secondary" size="sm" onClick={onClickArticle}>
                글 등록
            </Button>
            <Button variant="secondary" size="sm" onClick={onClickArticleImage}>
                이미지 출력
            </Button>
        </div>
    )
}

export default Write;