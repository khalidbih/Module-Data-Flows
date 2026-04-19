let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  const trimmedTitle = titleInput.value.trim();
  const trimmedAuthor = authorInput.value.trim();

  const trimmedPages = Number(pagesInput.value);

  if (!trimmedTitle || !trimmedAuthor || !trimmedPages) {
    alert("Please fill all fields!");
    return;
  }
  const book = new Book(
    trimmedTitle,
    trimmedAuthor,
    trimmedPages,
    readCheckbox.checked
  );

  myLibrary.push(book);

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readCheckbox.checked = false;

  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const table = document.getElementById("display");
  const rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = table.insertRow(1);
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    changeBut.innerHTML = myLibrary[i].check ? "yes" : "No";
    wasReadCell.appendChild(changeBut);

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    const delButton = document.createElement("button");
    deleteCell.appendChild(delButton);
    delButton.className = "btn btn-warning";
    delButton.innerHTML = "Delete";
    delButton.addEventListener("click", function () {
      const deletedBook = myLibrary[i];
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${deletedBook.title}`);
    });
  }
}
