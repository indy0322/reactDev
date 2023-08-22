import { useEffect, useState} from "react";
import { json, useParams, useSearchParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FloatingLabel, Form, Button} from "react-bootstrap"
import axios from "axios";

function Article(){
    const [username, setUsername] = useState('')
    const [query,setQuery] = useSearchParams();
    const [articleId, setArticleId] = useState('');
    const [articleTitle, setArticleTitle] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const [articleImage, setArticleImage] = useState('');
    const [visible, setVisible] = useState(false);

    //const param = useParams("id")

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

    useEffect(() => {
        axios.post('/api/article/findimage',{
            userId:query.get('id'),
            time:query.get('time')
        })
        .then((res)=>{
            console.log(res.data.image.split(', ')[3])
            setArticleId(res.data.userId)
            setArticleTitle(res.data.title)
            setArticleContent(res.data.contents)
            setArticleImage(res.data.image.split(', ')[3])
            if(query.get('id') == username){
                setVisible(true)
            }
        })
    })

    const onChangeArticleContent = (e) => {
        setArticleContent(e.target.value)
    }

    const onChangeArticleTitle = (e) => {
        setArticleTitle(e.target.value)
    }

    

    return(
        <div>
            <h1>메인 페이지</h1>
            <p>{username}</p>
            
            <FloatingLabel controlId="floatingTextarea2" label="아이디" id="articleid">
                <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                name='userId'
                value={articleId}
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="제목" id="articletitle">
                {visible ? (<Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                name='title'
                defaultValue={articleTitle}
                onChange={onChangeArticleTitle}
                />):
                (<Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                name='title'
                value={articleTitle}
                />)}
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="내용">
                {visible ? (<Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    name='contents'
                    defaultValue={articleContent}
                    onChange={onChangeArticleContent}
                    />):
                    (<Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    name='contents'
                    value={articleContent}
                    />)}
            </FloatingLabel>
            <div className="imageDiv">

            </div>
            <img src={'data:image/;base64,' + articleImage}></img>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control type="file" name="image"/>
            </Form.Group>

            {visible && <Button variant="secondary" size="sm">
                글 수정
            </Button>}
            
            
        </div>
    )
}

export default Article;