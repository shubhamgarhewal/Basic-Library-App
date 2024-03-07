console.log("this is shubham script")
// 1 store 
// 2 retrieve 
add();

function Book(bookName, author, type) {
    this.bookName = bookName;
    this.author = author;
    this.type = type;
}

// Display constructor -->
function Display() {
  
}

// STORE TO LOCAL STORAGE-->
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    // console.log("library form submitted.")
    e.preventDefault();
   
    let book = new Book(bookName, author, type);
    // console.log(book);

    let lib = localStorage.getItem("lib");
    if(lib === null){
        libArr = [];
    }
    else{
        libArr = JSON.parse(lib);
    }
    let myArr = {
        bookName : document.getElementById("bookName").value,
        author : document.getElementById("author").value,
        type : document.getElementById("type").value,
    }
    
    let display = new Display();
    
    if(display.validate(myArr) === true){
        libArr.push(myArr);
        localStorage.setItem("lib", JSON.stringify(libArr));
        display.clear(); 
        display.show(" Your book have been successfully added.", "Alright");
        add();
        // counter ++;
    }
    else{
        display.show(" The book and author name must be 3 characters long.", "Oops") 
    }
}

// Method to validate -->
Display.prototype.validate = function(myArr){
    if(myArr.bookName.length >=3 && myArr.author.length >=3){
        // console.log("validated")
        return true;
    }
    else{
        return false;
    }
}
// Method to show alert message -->
Display.prototype.show = function (message, warning) {
    let alert = document.getElementById("alert");
    alert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>${warning}! </strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`

  setTimeout(function(){
    alert.innerHTML = "";
  }, 3000);
}

//  Method to reset the form after submit button -->
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}


// RETREIVE FROM LOCAL STORAGE AND SHOW THE DATA -->

// let counter = 0;
function add () {
let lib = localStorage.getItem("lib");
if(lib == null){
    libArr = [];
}
else{
    libArr = JSON.parse(lib);
}
if(lib !=null){
    libArr = JSON.parse(lib)
}
let showBook = "";
// if(JSON.stringify(lib) != null){
    // console.log("Adding to UI.")

        libArr.forEach(function(element, index){
            showBook += `<tr>
                            <th scope="row">${index +1}</th>
                            <td>${element.bookName}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                            <td><button type="submit" id="${index}"  class="btn btn-primary" onclick="deleteBook(this.id)">Delete</button></td>
                        </tr>`
                        
    });
// }
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = showBook;

}
// for deleting the book.
function deleteBook(index){
let lib = localStorage.getItem("lib");
if(lib == null){
    libArr = [];
}
else{
    libArr = JSON.parse(lib);
}
libArr.splice(index, 1);
localStorage.setItem("lib", JSON.stringify(libArr));
add();
}


