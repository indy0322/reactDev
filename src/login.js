import { useState, useEffect} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Form, Button, InputGroup, Card, Modal,  } from "react-bootstrap"

function MyVerticallyCenteredModal1(props) {
    const [userId, setUserid] = useState('')
    const [userPasswd, setUserpasswd] = useState('')

    const onChangeId = (e) => {
        console.log(e.target.value)
        setUserid(e.target.value)
    }

    const onChangePasswd = (e) => {
        console.log(e.target.value)
        setUserpasswd(e.target.value)
    }

    const onClickRegister = () => {
        console.log("ID: ",userId)
        console.log("PW: ",userPasswd)
        axios.post("/api/register",{
            userId:userId,
            userPasswd:userPasswd
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data == "존재하는 아이디 입니다"){
                alert("존재하는 아이디 입니다")
            }
            else if(res.data == "아이디, 비밀번호를 제대로 입력해주세요"){
                alert("아이디, 비밀번호를 제대로 입력해주세요")
            }
            else{
                alert(res.data + " 님 회원가입이 완료되었습니다.")
            }
        })
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            회원가입
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <input id="userId" name="userId" placeholder="아이디" onChange={onChangeId}></input>
                <input id="userPasswd" name="userPasswd" placeholder="비밀번호" onChange={onChangePasswd}></input>
                <button id="submit" onClick={onClickRegister}>회원 등록</button>    
            </div>
        </Modal.Body>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal2(props) {
    const [userId2, setUserid2] = useState('')

    const onChangeId2 = (e) => {
        console.log(e.target.value)
        setUserid2(e.target.value)
    }

    const onClickSearch = () => {
        console.log("검색 ID: ",userId2)
        axios.post("/api/searchUser",{
            userId:userId2
        })
        .then((res)=>{
            console.log(res.data.userId)
            console.log(res.data.userPasswd)
        })
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            회원가입
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <input id="userId2" name="userId2" placeholder="아이디" onChange={onChangeId2}></input>
                <button id="search" onClick={onClickSearch}>아이디 찾기</button>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

function Login() {

    const [userId3, setUserid3] = useState('')
    const [userPasswd3, setUserpasswd3] = useState('')

    const [searchId, setSearchId] = useState('')

    const [deleteId, setDeleteId] = useState('')

    const [loginId, setLoginId] = useState('')
    const [loginPasswd, setLoginPasswd] = useState('')

    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);

    

    const onChangeId3 = (e) => {
        console.log(e.target.value)
        setUserid3(e.target.value)
    }

    const onChangePasswd3 = (e) => {
        console.log(e.target.value)
        setUserpasswd3(e.target.value)
    }

    const onChangeSearchId = (e) => {
        console.log(e.target.value)
        setSearchId(e.target.value)
    }

    const onClickUpdate = () => {
        console.log("갱신 ID: ",userId3)
        console.log("갱신 PW: ",userPasswd3)
        axios.post("/api/updateUser",{
            userId:userId3,
            userPasswd:userPasswd3,
            searchId:searchId
        })
        .then((res)=>{
            console.log(res.data)
        })
    }

    const onChangeId4 = (e) => {
        console.log(e.target.value)
        setDeleteId(e.target.value)
    }

    const onClickDelete = () => {
        axios.post("/api/deleteUser",{
            userId:deleteId
        })
        .then((res)=>{
            console.log(res.data)
        })
    }

    const onChangeLoginId = (e) =>{
        setLoginId(e.target.value)
    }

    const onChangeLoginPasswd = (e) =>{
        setLoginPasswd(e.target.value)
    }


    const onClickLogin = () => {
        axios.post("/api/login",{
            userId:loginId,
            userPasswd:loginPasswd
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data == "존재하지 않는 사용자 입니다."){
                alert("존재하지 않는 사용자 입니다.")
            }
            else if(res.data == "비빌번호가 다릅니다."){
                alert("비빌번호가 다릅니다.")
            }
            else if(res.data == "로그인에 실패했습니다."){
                alert("로그인에 실패했습니다.")
            }
            else{
                let token = localStorage.getItem("user")
                if(token && token !== null){
                    localStorage.removeItem("user")
                    localStorage.setItem("user",res.data)
                }
                window.location.href = '/main'
            }
        })
    }

    return(
        <div>
            <div>
                <Card style={{width:"50%", marginLeft:"25%", marginTop:"15%", background:"skyblue"}}>
                    <Card.Body style={{}}>
                    <InputGroup className="mb-3" style={{}}>
                        <InputGroup.Text id="inputGroup-sizing-default">
                        ID
                        </InputGroup.Text>
                        <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={onChangeLoginId}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                        PW
                        </InputGroup.Text>
                        <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={onChangeLoginPasswd}
                        />
                    </InputGroup>
                    <Button variant="secondary" size="sm" onClick={onClickLogin}>
                        로그인
                    </Button>{' '}
                    <Button variant="primary" size="sm" onClick={() => setModalShow1(true)}>회원가입</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => setModalShow2(true)}>아이디 찾기</Button>
                    </Card.Body>
                </Card>
                
                <MyVerticallyCenteredModal1
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                />
                <MyVerticallyCenteredModal2
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                />
            </div>

            {/*<div>
            <input id="userId" name="userId" placeholder="아이디" onChange={onChangeId}></input>
            <input id="userPasswd" name="userPasswd" placeholder="비밀번호" onChange={onChangePasswd}></input>
            <button id="submit" onClick={onClickRegister}>등록</button>    
            </div>
            
            <div>
            <input id="userId2" name="userId2" placeholder="아이디" onChange={onChangeId2}></input>
            <input id="userPasswd2" name="userPasswd2" placeholder="비밀번호"></input>
            <button id="search" onClick={onClickSearch}>검색</button>
            </div>
            
            <div>
            <input id="searchId" name="searchId" placeholder="갱신 아이디" onChange={onChangeSearchId}></input>
            <input id="userId3" name="userId3" placeholder="아이디" onChange={onChangeId3}></input>
            <input id="userPasswd3" name="userPasswd3" placeholder="비밀번호" onChange={onChangePasswd3}></input>
            <button id="search" onClick={onClickUpdate}>갱신</button>
            </div>

            <div>
                <input id="deleteId" name="deleteId" placeholder="삭제 아이디" onChange={onChangeId4}></input>
                <button id="delete" onClick={onClickDelete}>삭제</button>
            </div>*/}
        </div>
    )
}

export default Login;