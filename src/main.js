import { Form, Button, InputGroup, Card, Modal,  } from "react-bootstrap"
import { useState, useEffect} from "react"

function Main(){

    const [username, setUsername] = useState('')

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

    const onClickListButton = () => {
        window.location.href = '/list'
    }

    const onClickWriteButton = () => {
        window.location.href = '/write'
    }

    return(
        <div>
            <h2>
                {username}
            </h2>
            <Button onClick={onClickWriteButton}>
                글 작성
            </Button>
            <Button onClick={onClickListButton}>
                글 목록
            </Button>
        </div>
    )
}

export default Main;