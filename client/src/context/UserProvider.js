import React, { useState } from "react";
import axios from 'axios' // 10

// lets us use the provider component from this context variable (UserContext) in the return statement
export const UserContext = React.createContext();

// 14. interceptor for token; To be used whenever it is needed
const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


// props to accress props.children
export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {}, // 11. or statement to make sure localstorage in the function signup is being used
        token: localStorage.getItem('token') || "", // 11. checks localStorage for item first or itll return empty string
        todos: []
    } // gets info from authRouter.js signup/login 
    const [userState, setUserState] = useState(initState) // updates initState


    // 10
    function signup(credentials) {
        axios.post("/auth/signup", credentials)
            .then(res => { // 11. The hook is tell initState to pass all the info - user,token, todo - BUT only updates user and token and telling the todo to remain the same 
                const { user, token } = res.data
                localStorage.setItem("token", token) // So when refreshed the user doesnot have to log back in bc it is saved
                localStorage.setItem("user", JSON.stringify(user)) // when its a complex object/array we need to convert them into JSON strings
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token,
                    errMsg: ""// 18.
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg)) // 18. handleAuthErr
    };
    //10
    function login(credentials) {
        axios.post("/auth/login", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token) // 11. So when refreshed the user doesnot have to log back in bc it is saved
                localStorage.setItem("user", JSON.stringify(user)) // 11. when its a complex object/array we need to convert them into JSON strings
                getUserTodo() // 14.2
                setUserState(prevState => ({
                    ...prevState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg)) // 18. handleAuthErr
    };

    // 13. logout
    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            todos: []
        })
    };

    //18. 
    function handleAuthErr(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    };
    // 18.2
    function resetAuthErr() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    // 14.2 getUserTodo
    function getUserTodo() {
        userAxios.get("/api/todo/user") // user is from todoRouter.js
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    todos: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }// gets called in login function

    // 14.
    function addTodo(newTodo) {
        userAxios.post("/api/todo", newTodo)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    todos: [...prevState.todos, res.data] // 14. update the previous todos/adds
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }
    return (
        // UserContext.Provider => wrapped around App.js component; UserContext variable needs to be exported as a whole thats why its wrapped down here
        <UserContext.Provider
            value={{
                ...userState, // allows user/token to be provided as props from this provider
                signup,// 10
                login,// 10
                logout, // 13
                addTodo, // 14
                resetAuthErr// 18.2 
            }}>
            {props.children}
        </UserContext.Provider>
    )
};