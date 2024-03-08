// Initialize all the Dom elements
const addNewBookBtn = document.querySelector('.addNewBook');
const appendBook = document.querySelector('.appendBook');
const cancel = document.querySelector('.cancel');
const form = document.querySelector('form');
let bookContainer = document.querySelector('.books');


let myLibrary = []

appendBook.addEventListener('click',addBookToLibrary)
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






