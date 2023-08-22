import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "./Pagination";
//import styled from "styled-components";
import {FloatingLabel, Form, Button} from "react-bootstrap"
import axios from "axios";

function List(){
    const [username, setUsername] = useState('')
    const [articleId, setArticleId] = useState('')
    const [articleList, setArticleList] = useState('')

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

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
                setArticleId(res.responsedata)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

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
            method: "POST"
        }

        fetch("/articleList",option)
            .then(async (res) => {
                return await res.json()
            })
            .then((res) => {
                setArticleList(res)
                console.log(res)
                //res.map(({userId, title, contents}) => {console.log(userId)})
                /*res.forEach(element => {
                   console.log(element) */
                   /*const contentList = document.getElementsByClassName('contentList')
                   const article = document.createElement("t")
                });*/
            })
    },[])

    const onClickButton = (e) => {
        //console.log(e.target.className)
        const classname = e.target.className
        console.log(classname.split(" ")[0])
        window.location.href = '/article?id=' + classname.split(" ")[0] + "&time=" + classname.split(" ")[1]
    }

    return(
        <div>
            <h1>글목록 페이지</h1>
            <p>{username}</p>
            <div className="contentList">
                <table>
                    <thead>
                        <tr>
                            <th key={"userId"}>
                                작성자
                            </th>
                            <th kety={"title"}>
                                제목
                            </th>
                            <th key={"content"}>
                                내용
                            </th>
                            <th key={"time"}>
                                시간
                            </th>
                            <th>
                                버튼
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {articleList && articleList.slice(offset,offset + limit).map(({num,userId, title, contents, time}) => {
                            return <tr key={num}>
                                <td>{userId}</td>
                                <td>{title}</td>
                                <td>{contents}</td>
                                <td>{time}</td>
                                <td><Button className={userId + " " + time} onClick={onClickButton}>글</Button></td>
                            </tr>
                        })}
                    </tbody>
                </table>

            </div>
            <Pagination
                total={articleList.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />

        </div>
    )
}

export default List;