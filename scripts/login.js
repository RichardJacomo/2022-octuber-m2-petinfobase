import { login } from "./requests.js";

//função para pegar dados do input
const eventLogin = () => {
    const form = document.querySelector('.form-login')
    const inputUser = document.querySelector('#username')
    const inputPass = document.querySelector('#password')
    const button = document.querySelector('.button-login')
    const elements = [...form.elements] //buscando elements de form e transformando em array
    form.addEventListener('input', () =>{
        if(inputUser.value.length > 0 && inputPass.value.length > 0){
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

         const username = ""
         const email = value.username
         const password = value.password
         const avatar = ""

         const body = {
         username: username,
         email: email,
         password: password,
         avatar: avatar
         }
        
        await login(body)
    })
}
eventLogin()

function clickEventLogin(){
    const buttonRegister = document.querySelector('.button-back-to-register')
    buttonRegister.addEventListener('click', (e)=>{
        window.location.href = './pages/cadastro/register.html'
    })
}
clickEventLogin()




