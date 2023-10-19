import React from "react";
import axios from 'axios';

export const IssueProvider = React.createContext();


const userAxios = axios.create()
// I have to use userAxious so I can add an issue. still need to figure out how to comment on a different users post
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
});


export default function IssueProvider(props){
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {}, // 11. or statement to make sure localstorage in the function signup is being used
        token: localStorage.getItem('token') || "", // 11. checks localStorage for item first or itll return empty string
        issues: [],
        // not sure if I need these bottom 2
        upVotes: 0,
        downVotes: 0

    }

    const [issueState, setIssueState] = useState(initState) 


    // get all issues
function getAllIssues(){
    userAxios.get("/")
}
return (

)
};

// DOING PART 1 first
