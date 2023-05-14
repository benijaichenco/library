// declare global variables
const form = document.querySelector(".book-form");
const overlay = document.querySelector(".overlay");
const submit = document.querySelector(".book-form button");

// form submitting event listener
submit.addEventListener("click", addBookToLibrary);

// create library array
let myLibrary = [];

// the constructor...
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// create function to add books
function addBookToLibrary(event) {
  // prevent form submitting from reloading page
  event.preventDefault();

  // get references to form values
  const titleInput = document.querySelector(".book-form .title");
  const authorInput = document.querySelector(".book-form .author");
  const pagesInput = document.querySelector(".book-form .pages");
  const readInput = document.querySelector(".book-form .read");
  const titleValue = titleInput.value;
  const authorValue = authorInput.value;
  const pagesValue = pagesInput.value;
  const title = titleValue;
  const author = authorValue;
  const pages = pagesValue;

  // alert if any of the input fields are invalid
  if (title == "" || author == "" || pages == "") {
    alert("Please fill empty fields");
    return;
  }

  if (pages < 1) {
    alert("Must be at least 1 page long");
    return;
  }

  // set the read value
  let read;
  if (readInput.checked) {
    read = "read";
  } else {
    console.log("not checked");
    read = "not read";
  }

  // create a new book object with form value
  const newBook = new Book(title, author, pages, read);

  // push new book to array
  myLibrary.push(newBook);

  // toggle form and overlay
  form.classList.remove("active");
  overlay.classList.remove("active");

  // show books
  displayBooks();
}

// toggle book form & overlay when book form pops up
const addBtn = document.querySelector(".new-book");

addBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  form.classList.add("active");

  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    form.classList.remove("active");
  });

  // reset form input values
  const title = document.querySelector(".book-form .title");
  const author = document.querySelector(".book-form .author");
  const pages = document.querySelector(".book-form .pages");
  const read = document.querySelector(".book-form .read");
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
});

// create a function to display books in array
function displayBooks() {
  const books = document.querySelector(".book-list");

  // reset HTML so display won't duplicate books
  books.innerHTML = "";

  // loop through library
  for (let newBook of myLibrary) {
    const book = document.createElement("div");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const btns = document.createElement("div");
    const readBtn = document.createElement("button");
    const rmBtn = document.createElement("button");

    book.classList.add("book");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    btns.classList.add("btns");
    readBtn.classList.add("read-btn");
    rmBtn.classList.add("rm-btn");

    title.textContent = `"${newBook.title}"`;
    author.textContent = newBook.author;
    pages.textContent = newBook.pages + " Pages";
    if (newBook.read == "not read") {
      readBtn.textContent = "Mark read";
    } else if (newBook.read == "read") {
      readBtn.textContent = "Mark unread";
      readBtn.classList.add("active");
    }
    rmBtn.textContent = "Remove";

    books.appendChild(book);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(btns);
    btns.appendChild(readBtn);
    btns.appendChild(rmBtn);

    // change state of book's 'read'
    readBtn.addEventListener("click", (e) => {
      if (e.target.classList.contains("active")) {
        newBook.read = "not read";
        readBtn.textContent = "Mark read";
        readBtn.classList.remove("active");
      } else {
        newBook.read = "read";
        readBtn.textContent = "Mark unread";
        readBtn.classList.add("active");
      }
    });

    // add event to remove book
    rmBtn.addEventListener("click", () => {
      myLibrary.splice(myLibrary.indexOf(newBook), 1);
      books.removeChild(book);
    });
  }
}
