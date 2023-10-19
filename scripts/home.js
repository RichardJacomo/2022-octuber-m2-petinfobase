import { getLocalStorage } from "./localStorage.js";
import { getPosts } from "./requests.js";
import { searchUser } from "./requests.js";
import { deletePost } from "./requests.js";
import { createPost } from "./requests.js"
import { editPost } from "./requests.js"

const verifyPermission = () => {
    const user = getLocalStorage()

    if(user == ""){
        window.location.replace('/index.html')
    }
}
verifyPermission()


//função que adiciona usuário logado no header da home page
async function renderUser(){
    const divProfiel = document.querySelector('.div-profile')
    const user = await searchUser()
    divProfiel.insertAdjacentHTML('beforeend', 
    `
    <img class="img-profile" src="${user.avatar}" alt="">

    `
    )
    // renderiza nome de usuário no perfil
    const h2NameProfile = document.querySelector('.h2-modal-turnOff')
    h2NameProfile.innerText = `${user.username}`
}
renderUser()


// função para renderizar posts na home page:
async function renderPosts(){
    const ul = document.querySelector('.ul-posts')    
    const posts = await getPosts()

    posts.forEach((e, index) => {

        const datePure = e.createdAt
        const dateSubstring = datePure.substring(0, 10)

        let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        let now = new Date(dateSubstring)
        let date = months[now.getMonth()] + ' de ' + now.getFullYear()

        ul.insertAdjacentHTML('afterbegin', 
        `
        <li id="lis_${e.id}" class="li-post">
        <div class="head-post">
          <div class="div-profile-post">
              <img class="img-profile-post" src="${e.user.avatar}" alt="">
              <h2 class="name-profile">${e.user.username}</h2>
              <p>|</p>
              <p class="data-post">${date}</p>
          </div>
          <div id="div_${e.id}" class="div-button-edit-and-delete">
            <button id="edt_${e.id}" class="button-edit" data-edit-modal="modal-edit">Editar</button>
            <button id="but_${e.id}" data-delete-post="modal-delete" class="button-delete">Excluir</button>
          </div>
        </div>
          <h1 class="title-post">${e.title}</h1>
          <p class="text-post">${e.content}</p>
          <a id="acc_${e.id}" data-control-modal="modal-post" class="access-post" href="">Acessar publicação</a>
          
      </li>
        `
        )  
        buttonsDeleteAndEdit(e.id)
  
        const closeButton = document.querySelector('.modal-close3')
        closeButton.addEventListener('click', () =>{
            window.location.reload(true)
        })

        const buttonDelete = document.getElementById(`but_${e.id}`)
        const divCertification = document.querySelector('.div-certification')
        buttonDelete.addEventListener('click', () =>{
            let modaLDeletelId = buttonDelete.getAttribute("data-delete-post")
            document.getElementById(modaLDeletelId).classList.toggle("show-modal");  
            divCertification.insertAdjacentHTML('afterbegin', 
            ` 
            <button id="can_${e.id}" class="button-delete-cancel" data-delete-post="modal-delete">Cancelar</button>
            <button id="del_${e.id}" class="button-delete-confirm">Sim, excluir este post</button>`
            )
            const cancelButton = document.getElementById(`can_${e.id}`)
            cancelButton.addEventListener('click', () =>{
            window.location.reload(true)
        })
            deletePostModal(e.id)
            eventEdit(e.id)
        })
        
        logoutClick()
        

    }); 
        // render posts
        const imgProfile = document.querySelector('.img-profile-modal')
        const userName = document.querySelector('.user-name-modal')
        const dateModal = document.querySelector('.date-post')
        const textPost = document.querySelector('.text-content-post')
        const titlePost = document.querySelector('.title-post-modal')

        const buttonsControlModal = document.querySelectorAll("[data-control-modal]")
        buttonsControlModal.forEach((element, index) => {
        element.addEventListener('click', (e)=>{
            e.preventDefault()
                let modalId = buttonsControlModal[index].getAttribute("data-control-modal")
                document.getElementById(modalId).classList.toggle("show-modal"); 
        
                let text = element.parentElement.children[2].innerText  //texto
                let title = element.parentElement.children[1].innerText //titulo
                let img = element.parentElement.children[0].children[0].children[0].src //img
             
                let nameUser = element.parentElement.children[0].children[0].children[1].innerText //nome usuario
                let datePost = element.parentElement.children[0].children[0].children[3].innerText  //data post
        
                imgProfile.src = `${img}`
                userName.innerText = `${nameUser}`
                dateModal.innerText = `${datePost}`
                titlePost.innerText = `${title}`
                textPost.innerText = `${text}`   
               
    })
    logoutClick()
});
        // event open create post
        const buttonCreate = document.querySelectorAll("[data-create-modal]")
        buttonCreate.forEach((element, index) => {
            element.addEventListener('click', ()=>{
                let modalCreateId = buttonCreate[index].getAttribute("data-create-modal")
                document.getElementById(modalCreateId).classList.toggle("show-modal");                
            })
        })
          // event edit create post
          const titlePostEdit = document.querySelector('.title-edit-post')
          const textPostEdit = document.querySelector('.text-edit-post')
          const buttonEdit = document.querySelectorAll("[data-edit-modal]")
          
          buttonEdit.forEach((element, index) => {
              element.addEventListener('click', (e)=>{
                e.preventDefault()
                  let modalEditId = buttonEdit[index].getAttribute("data-edit-modal")
                  document.getElementById(modalEditId).classList.toggle("show-modal"); 
                  let titleEdit = element.parentElement.parentElement.parentElement.children[1].innerText
                  let textEdit = element.parentElement.parentElement.parentElement.children[2].innerText
                  let idTitle = element.parentElement.parentElement.parentElement.children[0].children[1].children[1].id
                  let id = idTitle.substring(4)
                  eventEdit(id)
                  titlePostEdit.value = `${titleEdit}`
                  textPostEdit.value = `${textEdit}`
              })
          })
}
renderPosts()


const eventCreate = () => {
    const form = document.querySelector('.modal-body2')
    const modalCreate = document.getElementById('modal-create')
    const main = document.querySelector('.main-profile')
    const postCreator = document.querySelector('.post-create')
    const elements = [...form.elements] //buscando elements de form e transformando em array
    
    form.addEventListener('submit', async (e) => { //pegando evento submit do botão do formulário
        e.preventDefault()
        const value = {}
        modalCreate.classList.toggle('show-modal')
        setTimeout(()=>{
            window.location.reload(true)
        },200)

        elements.forEach(element => {
             if(element.tagName == "INPUT" || element.tagName == "TEXTAREA"  && element.value !== ""){ //filtrando inputs para adicionar ao value
                value[element.id] = element.value //capturando value dos inputs
             } 
        });

         const titleInput = value.tit
         const textInput = value.tex
         const body = {
         title: titleInput,
         content: textInput,
         }

        await createPost(body)
    })
}   

eventCreate()

   
function buttonsDeleteAndEdit(id){
const div = document.querySelector('.div-button-edit-and-delete')
const divButtons = document.getElementById(`div_${id}`)
const h2 = document.querySelector('.h2-modal-turnOff').innerText
    let name = div.previousElementSibling.children[1].innerText
    if(name == h2){
        console.log(name, h2)
        div.classList.remove('none')

        // divButtons.insertAdjacentHTML('beforeend', 
        // `
        // <button id="edt_${id}" class="button-edit" data-edit-modal="modal-edit">Editar</button>
        // <button id="but_${id}" data-delete-post="modal-delete" class="button-delete">Excluir</button>
        // `
        // )
        
    }else{
        div.classList.add('none')
        div.style.color = 'red';
    }  
}

async function deletePostModal(id){
const li = document.getElementById(`lis_${id}`)
const buttonDelete = document.getElementById(`del_${id}`)
const modal = document.getElementById('modal-delete')
const imgMessageDelete = document.querySelector('.img-message-delete')
buttonDelete.addEventListener('click', () =>{
            li.remove()
            deletePost(id)
            modal.classList.toggle('show-modal')
            imgMessageDelete.classList.toggle('none')
            setTimeout(()=>{
                imgMessageDelete.classList.toggle('none')
                window.location.reload(true)
            },4000)

})
}


const eventEdit = (id) => {
    const form = document.querySelector('.modal-body4')
    const modalEdit = document.getElementById('modal-edit')
    const main = document.querySelector('.main-profile')
    const postEdit = document.querySelector('.post-edit')
    const elements = [...form.elements] //buscando elements de form e transformando em array
    
    form.addEventListener('submit', async (e) => { //pegando evento submit do botão do formulário
        e.preventDefault()
        const value = {}
        modalEdit.classList.toggle('show-modal')
        setTimeout(()=>{
            window.location.reload(true)
        },200)

        elements.forEach(element => {
             if(element.tagName == "INPUT" || element.tagName == "TEXTAREA"  && element.value !== ""){ //filtrando inputs para adicionar ao value
                value[element.id] = element.value //capturando value dos inputs
             } 
        });

         const titleInput = value.tite
         const textInput = value.tex

         const body = {
         title: titleInput,
         content: textInput,
         }

        await editPost(body, id)
    })
}   

function logoutClick(){
const iconImage = document.querySelector('.img-profile')
const modalLogout = document.querySelector('.modal-turnOff')
iconImage.addEventListener('click', () =>{
    modalLogout.classList.toggle('none')
})
const buttonTurnOff = document.querySelector('.button-modal-turnOff')
buttonTurnOff.addEventListener('click', () =>{
    localStorage.clear();
    window.location.replace('/index.html')
})
}