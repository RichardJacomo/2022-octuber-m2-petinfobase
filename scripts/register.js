import { register } from "./requests.js"

function clickEventsRegister(){
const buttonBackToLoginOne = document.querySelector('.button-back-to-login')
const buttonBackToLoginTwo = document.querySelector('.button-back-to-login-2')
    buttonBackToLoginOne.addEventListener('click', ()=>{
        window.location.href = '/index.html'
    })
    buttonBackToLoginTwo.addEventListener('click', ()=>{
        window.location.href = '/index.html'
    })
}
clickEventsRegister()

const eventRegister = () => {
    const form = document.querySelector('.form-register')
    const elements = [...form.elements] //buscando elements de form e transformando em array
    const inputUser = document.querySelector('#username')
    const inputEmail = document.querySelector('#email')
    const inputAvatar = document.querySelector('#avatar')
    const inputPass = document.querySelector('#password')
    const button = document.querySelector('.button-register')
  
    form.addEventListener('input', () =>{
        if(inputUser.value.length > 0 && inputEmail.value.length > 0 && inputAvatar.value.length > 0 && inputPass.value.length > 0){
            button.removeAttribute('disabled')
        }else{
            button.setAttribute('disabled', 'disabled')
        }
    })

    form.addEventListener('submit', async (e) => { //pegando evento submit do botão do formulário
        e.preventDefault()

        const value = {}

        elements.forEach(element => {
             if(element.tagName == "INPUT" && element.value !== ""){ //filtrando inputs para adicionar ao value
                value[element.id] = element.value //capturando value dos inputs
             } 
        });

         const username = value.username
         const email = value.email
         const password = value.password
         const avatar = value.avatar

         const body = {
         username: username,
         email: email,
         password: password,
         avatar: avatar
         }


        await register(body)
    })
}   

eventRegister()