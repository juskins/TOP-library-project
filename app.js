// Initialize all the Dom elements
const addNewBookBtn = document.querySelector('.addNewBook');
const appendBook = document.querySelector('.appendBook');
const cancel = document.querySelector('.cancel');
const form = document.querySelector('form');
let bookContainer = document.querySelector('.books');
const error = document.querySelectorAll('input + span.error')
const inputs = document.querySelectorAll('input:required');



function formValidation(){
     const array = Array.from(inputs);
     const errorList = Array.from(error);
     for(let i =0; i<inputs.length;i++){
          array[i].addEventListener('input',()=>{
               if(array[i].validity.valid){
                    errorList[i].textContent = '';
                    errorList[i].className = 'error'
               }
               else{
                    showError(array[i],errorList[i])
               }
          })
     }

     appendBook.addEventListener('click',(e)=>{
          e.preventDefault();
          if(array[0].validity.valid && array[1].validity.valid && array[2].validity.valid){
               addBookToLibrary(e)
          }
          else{
               for(let i =0; i<inputs.length;i++){
                    if(!array[i].validity.valid){
                         showError(array[i],errorList[i])
                    }
               }
          }
          
     })
   
     function showError(item,itemError){
          if(item.validity.valueMissing){
               itemError.textContent = 'This field shouldn\'t be empty';
          }
          itemError.className = 'error active'
     }


}


formValidation()


let myLibrary = []

// appendBook.addEventListener('click',addBookToLibrary)
addNewBookBtn.addEventListener('click',showForm)
cancel.addEventListener('click',hideForm)



function Book(title,author,pages,read){
     this.title = title;
     this.author = author;
     this.pages = pages;
     this.read = read ? 'READ' : 'NOT READ';
}


function addBookToLibrary(e){
     e.preventDefault();
     const title = document.querySelector('.title').value
     const author = document.querySelector('.author').value;
     const pages = document.querySelector('.pages').value;
     const read = document.querySelector('.isread').checked;
     let newBook = new Book(title,author,pages,read);
     myLibrary.push(newBook);
     renderBooks()
     hideForm(e)

}

function renderBooks(){
     bookContainer.innerHTML = ""
     myLibrary.map((item,index)=>{
          const {title, author, pages, read} = item;
          let bookDiv = document.createElement('div');
          bookDiv.innerHTML = `
          <h3>Book Title: ${title}</h3>
          <p>Author: ${author}</p>
          <p>Number of pages: ${pages}</p>
          <p>Isread ? ${read} </p>
          <button onclick = "removeBook(${index})">Remove </button>
     `
     bookDiv.classList.add('book')
     bookContainer.appendChild(bookDiv)
     })
     bookContainer.setAttribute('style','display:grid')
}

function removeBook(index){
     const bookDivs = document.querySelectorAll('.book');
    bookDivs[index].classList.add('deleted'); 
    setTimeout(() => {
      myLibrary.splice(index, 1);
      renderBooks();
    }, 500);
}

function showForm(){
     form.style.display = 'block'
     bookContainer.style.display = 'none'
}
function hideForm(e){
     e.preventDefault()
     form.style.display = 'none'
     bookContainer.style.display = 'grid'

}






