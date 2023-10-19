import { getLocalStorage } from "./localStorage.js"

const baseUrl = "http://localhost:3333/"

async function login(body){
    const inputPass = document.getElementById('password')
    const errorMessage = document.querySelector('.error-message')
    const loading = document.querySelector('.button-loading')
    const buttonLogin = document.querySelector('.button-login')
    try{
        const request = await fetch(baseUrl + "login", {
            method: "Post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)    
        })
        const response = await request.json()
        if(request.ok == false){
            inputPass.classList.add('input-error')
            errorMessage.classList.remove('none')

        }else{
            inputPass.classList.remove('input-error')
            errorMessage.classList.add('none')
            loading.classList.remove('none')
            buttonLogin.classList.add('none')

            localStorage.setItem("user", JSON.stringify(response))

            setTimeout(()=>{
                window.location.replace('./pages/home/home.html')
            }, 3000)
        }

    }catch(err){
        console.log(err)
    }
}

async function register(body){
    const loadingTwo = document.querySelector('.button-loading-2')
    const buttonRegister = document.querySelector('.button-register')
    const imgMessage = document.querySelector('.img-message-registered')
    try{
        const request = await fetch(baseUrl + "users/create", {
            method: "Post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)    
        })

        if(request.ok){
            buttonRegister.classList.add('none')
            loadingTwo.classList.remove('none')
            imgMessage.classList.remove('none')
            
            setTimeout(()=>{
                imgMessage.classList.add('none')
                window.location.replace('/index.html')
            }, 3000)

        }

    }catch(err){
        console.log(err)
    }
}

async function getPosts(){

    const localStorage = getLocalStorage()

    try{
        const request = await fetch(baseUrl + "posts", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        const response = await request.json()
        return response   
    }catch(err){
        console.log(err)
    }
}

async function searchUser(){

    const localStorage = getLocalStorage()

    try{
        const request = await fetch(baseUrl + "users/profile", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        const response = await request.json()
        return response   
    }catch(err){
        console.log(err)
    }
}

async function deletePost(id){

    const localStorage = getLocalStorage()

    try{
        const request = await fetch(baseUrl + `posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        const response = await request.json()
        return response   
    }catch(err){
        console.log(err)
    }
}

async function createPost(body){
    const localStorage = getLocalStorage()
    try{
        const request = await fetch(baseUrl + 'posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
        // if(request.ok){
        //     console.log(request)
        // }
    }catch(err){
        console.log(err)
    }
}


async function editPost(body, id){
    const localStorage = getLocalStorage()
    try{
        const request = await fetch(baseUrl + `posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
    
            console.log(request)

    }catch(err){
        console.log(err)
    }  
}

export{
    login,
    register,
    getPosts,
    searchUser,
    deletePost,
    createPost,
    editPost
}