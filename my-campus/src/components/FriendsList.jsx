import { useNavigate } from "react-router-dom"
import axios from "axios"

const FriendsList = ({ token,list,func }) => {
    return (<div>
        {list.map(
            student => <FriendItem student={student} func={func} token={token}></FriendItem>
        )}
    </div>)
}

const FriendItem = ({ token, student, func }) => {

    const change = async (type) => {
        axios.post('http://127.0.0.1:5000/edit/'+type+'/', { 'studentId': token, 'friendId':student.id })
            .then(({ data }) => {
                console.log(data);
                func()
            }
          )
          .catch((err) => {
            alert(err.message);
            navigate(-1);
          });
    }

    const navigate = useNavigate();
    return (<div className="friendItem">
        <span className="nameField" 
            onClick={() => navigate('/timetable/'+student.id)}
        >{student.name}</span>
        <div className="butts">
            <button className="watch"
                onClick={() => {
                    change('watch')
                }}
            >{student.watch ? 'unfollow' : 'follow'}</button>
            <button className="share"
                onClick={() => {
                    change('share')
                }}
            >{student.share ? 'unshare' : 'share'}</button>
        </div>
    </div>)
}

export default FriendsList