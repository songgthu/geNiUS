
const modal = document.querySelector(".exam-modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".create-exam-button");
const closeModalBtn = document.querySelector(".close-exam-modal");

function openModal() {
  modal.style.display ='block';
}

function closeModal() {
  modal.style.display ='none';
}

document.addEventListener("keydown", function(e) {
  if (e.key ==="Enter" && !modal.classList.contains("hidden")) {
    closeModal();
  }
})

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

/*

const addcontentBtn = document.getElementById("addContent");

let textboxCount = 1;

addcontentBtn.addEventListener("click", function(){
  const textBoxContainer = document.getElementById("textBoxContainer");
  const newtextboxContainer = document.createElement("div");
  newtextboxContainer.classList.add("textBox-container");

  const textbox = document.createElement("input");
  textbox.setAttribute("type",  "text");
  textbox.setAttribute("id", "textbox", (textboxCount + 1));
  textbox.classList.add("textbox");
  textbox.placeholder = "More exam content...";
  
  
  newtextboxContainer.appendChild(textbox);
  textBoxContainer.appendChild(newtextboxContainer);
  textboxCount++;
});

*/
//the popup modal box
//things 

//adding the check list feature


window.onload = () => {
const form1 = document.querySelector("#addForm");
const nestedForm = document.querySelector("#nestedForm");
let items = document.getElementById("items");
let submit = document.getElementById("submit");

let editItem = null;
form1.addEventListener("submit", addItem); //to add tasks
nestedForm.addEventListener("click", removeItem); //to remove tasks
};

function addItem(e) {
e.preventDefault();

if(submit.value != "Add") {
console.log("Hello");
if(editItem) {
  let taskDescription = editItem.parentNode.previousElementSibling; //access the task description that is before the buttons
  taskDescription.textContent = document.getElementById("item").value;
  editItem = null;
}


submit.value = "Submit";
document.getElementById("label-success").innerHTML = "Text edited successfully";
document.getElementById("label-success").style.display = "block" //make it visible

setTimeout(function() {
  document.getElementById("label-success").style.display = "none";
}, 1500); //hiding the text edited successfully after 1.5 seconds
return false;
}

let newItem = document.getElementById("item").value;
if (newItem.trim() == "" || newItem.trim() == null) {
return false; //prevent any default handling if the input is empty
} else {
document.getElementById("item").value = "";
}

let li = document.createElement("li");
li.className = "list-group-item" //defining a class for the lists

let buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons";

let taskDescription = document.createElement("p");
taskDescription.className = "task-description";
taskDescription.appendChild(document.createTextNode(newItem));


let deleteBtn = document.createElement("button"); //creating delete btn
deleteBtn.className = "delete"; //EDIT THIS LATER
deleteBtn.appendChild(document.createTextNode("Delete")); //the text inside btn is called delete

let editBtn = document.createElement("button");
editBtn.className = "edit"//EDIT THIS LATER
editBtn.appendChild(document.createTextNode("Edit"));

buttonsContainer.appendChild(deleteBtn);
buttonsContainer.appendChild(editBtn);

li.appendChild(taskDescription); //create a list with the new input
li.appendChild(buttonsContainer);
// li.appendChild(editBtn);

items.appendChild(li); 
}

function removeItem(e) {
e.preventDefault();
if(e.target.classList.contains("delete")) {
if (confirm("Are you sure?")) {
  let li = e.target.parentNode.parentNode;
  li.parentNode.removeChild(li);
  document.getElementById("label-success").innerHTML = "Task deleted successfully";
  document.getElementById("label-success").style.display = "block";
  
  setTimeout(function(){
    document.getElementById("label-success").style.display = "none";
  }, 1500);
}
}

if(e.target.classList.contains("edit")) {
let li = e.target.parentNode.parentNode;
let taskDescription = li.querySelector(".task-description");
document.getElementById("items").value = taskDescription.textContent;
submit.value = "edit";
editItem = e.target;
}
}

function toggleButton(ref, btnID) {
document.getElementById(btnID).disabled = false;
}


const addDisplay = document.querySelector(".addDisplay");

addDisplay.addEventListener("click", function() {
  const examName = document.querySelector("#examName").value;
  const content = examName;
  const container = document.getElementById("transfer");

  const newContainer = document.createElement("div");
  newContainer.className = "displayContainer"; //class for the containers
  newContainer.textContent = content;

  container.appendChild(newContainer);
});
