const myLibrary = [];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("check");

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  const trimmedTitle = titleInput.value.trim();
  const trimmedAuthor = authorInput.value.trim();

  const trimmedPages = Number(pagesInput.value);

  if (
    !trimmedTitle ||
    !trimmedAuthor ||
    !Number.isInteger(trimmedPages) ||
    trimmedPages < 1 ||
    trimmedPages > 10000
  ) {
    alert("Please enter valid book data!");
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
  const tbody = document.querySelector("#display tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    const authorCell = document.createElement("td");
    const pagesCell = document.createElement("td");
    const wasReadCell = document.createElement("td");
    const deleteCell = document.createElement("td");

    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    changeBut.textContent = myLibrary[i].check ? "yes" : "No";
    wasReadCell.appendChild(changeBut);

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    const delButton = document.createElement("button");
    deleteCell.appendChild(delButton);
    delButton.className = "btn btn-warning";
    delButton.textContent = "Delete";
    delButton.addEventListener("click", function () {
      const deletedBook = myLibrary[i];
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${deletedBook.title}`);
    });
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(wasReadCell);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  }
}
