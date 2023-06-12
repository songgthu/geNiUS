/*let countdownInterval;

    function startCountdown() {
      const inputDate = new Date(document.getElementById("countdownDate").value).getTime(); //getTime gets the millisecs of time starting from midnight

      localStorage.setItem('countdownDate', JSON.stringify(inputDate)); //stringfy input date,then store in local storage

      countdownInterval = setInterval( function() {
        const now = new Date().getTime(); //time now in millisec
        const storedDate = parseInt(localStorage.getItem('countdownDate'));//get input date in millisec, retrieve from local storage
        const remTime = storedDate - now; //get the time difference

        if (remTime <= 0) { 
          clearInterval(countdownInterval);
          localStorage.removeItem("countdownDate");
          /*document.getElementById("days").innerHTML = 00; 
          document.getElementById("hours").innerHTML = 00;
          document.getElementById("mins").innerHTML = 00;
          document.getElementById("secs").innerHTML = 00;
          localStorage.removeItem("countdownDate");
          
          document.getElementById("timerDisplay").textContent = "All the best!"
          return;
        }

        //displaying the time rem to date
        const days = Math.floor(remTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((remTime % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((remTime % (1000 * 60)) / 1000);

        /*document.getElementById("days").innerHTML = days; 
        document.getElementById("hours").innerHTML = ("0" + hours);
        document.getElementById("mins").innerHTML = ("0" + mins);
        document.getElementById("secs").innerHTML = ("0" + secs);
        
        document.getElementById("timerDisplay").innerHTML = days + "d " + hours + "h " + mins + "m " + secs + "s ";
      }, 1000);    
    }
    window.onload = function() {
      if (localStorage.getItem("countdownDate")) { //check if there is a countdown date stored
        
        const newNow = new Date().getTime();
        const newDate = Date(parseInt(localStorage.getItem("countdownDate")));
        
        countdownInterval = setInterval( function() {
          const now = new Date().getTime(); //time now in millisec
          const storedDate = parseInt(localStorage.getItem('countdownDate'));//get input date in millisec, retrieve from local storage
          const remTime = storedDate - now; //get the time difference

          if (remTime <= 0) { 
            clearInterval(countdownInterval);
            document.getElementById("timerDisplay").innerHTML = "All the best!"
            return;
          }

          //displaying the time rem to date
          const days = Math.floor(remTime / (1000 * 60 * 60 * 24));
          const hours = Math.floor((remTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((remTime % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((remTime % (1000 * 60)) / 1000);

          document.getElementById("timerDisplay").innerHTML = days + "d " + hours + "h " + mins + "m " + secs + "s ";
        }, 1000);
        
      } else { //when there is no local storage
        startCountdown();
      }
    }
    
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".openModal");
    const closeModalBtn = document.querySelector(".closeModal");

    const openModal = function () {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden"); //remove hidden class, so it will show the display
    };

    const closeModal = function () {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }

    document.addEventListener("keydown", function(e) {
      if (e.key ==="Enter" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    })

    openModalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal)
    overlay.addEventListener("click", closeModal)

    
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

    let countdownInterval;

    function startCountdown() {
      const inputDate = new Date(document.getElementById("examDate").value).getTime(); //getTime gets the millisecs of time starting from midnight

      localStorage.setItem('examDate', JSON.stringify(inputDate)); //stringfy input date,then store in local storage

      countdownInterval = setInterval( function() {
        const now = new Date().getTime(); //time now in millisec
        const storedDate = JSON.parse(localStorage.getItem('examDate'));//get input date in millisec, retrieve from local storage
        const remTime = storedDate - now; //get the time difference

        if (remTime <= 0) { 
          clearInterval(countdownInterval);
          localStorage.removeItem("examDate");
          /*document.getElementById("days").innerHTML = 00; 
          document.getElementById("hours").innerHTML = 00;
          document.getElementById("mins").innerHTML = 00;
          document.getElementById("secs").innerHTML = 00;
          localStorage.removeItem("countdownDate");
          */
          document.getElementById("timerDisplay").innerHTML = "All the best!"
          return;
        }

        //displaying the time rem to date
        const days = Math.floor(remTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((remTime % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((remTime % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days; 
        document.getElementById("hours").innerHTML = ("0" + hours);
        document.getElementById("mins").innerHTML = ("0" + mins);
        document.getElementById("secs").innerHTML = ("0" + secs);
        
        document.getElementById("timerDisplay").innerHTML = days + "d " + hours + "h " + mins + "m " + secs + "s ";
      }, 1000);   
    }

        
    //the pop-up modal box
    window.onload = function() {
      if (localStorage.getItem("examDate")) { //check if there is a countdown date stored
        
        //const newNow = new Date().getTime();
        //const newDate = JSON.parse(localStorage.getItem("examDate")));
        
        countdownInterval = setInterval( function() {
          const now = new Date().getTime(); //time now in millisec
          const storedDate = parseInt(localStorage.getItem('examDate'));//get input date in millisec, retrieve from local storage
          const remTime = storedDate - now; //get the time difference

          if (remTime <= 0) { 
            clearInterval(countdownInterval);
            document.getElementById("timerDisplay").innerHTML = "All the best!"
            return;
          }

          //displaying the time rem to date
          const days = Math.floor(remTime / (1000 * 60 * 60 * 24));
          const hours = Math.floor((remTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((remTime % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((remTime % (1000 * 60)) / 1000);

          document.getElementById("days").innerHTML = days; 
          document.getElementById("hours").innerHTML = ("0" + hours);
          document.getElementById("mins").innerHTML = ("0" + mins);
          document.getElementById("secs").innerHTML = ("0" + secs);
        
         // document.getElementById("timerDisplay").innerHTML = days + "d " + hours + "h " + mins + "m " + secs + "s ";
        }, 1000);
        
      } else { //when there is no local storage
        startCountdown();
      }
    }
   
  //opening and closing the modal box
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".openModal");
    const closeModalBtn = document.querySelector(".closeModal");

    const openModal = function () {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden"); //remove hidden class, so it will show the display
    };

    const closeModal = function () {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }

    document.addEventListener("keydown", function(e) {
      if (e.key ==="Enter" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    })

    openModalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal)
    overlay.addEventListener("click", closeModal)

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

  if(submit.value != "Submit") {
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

  let taskDescription = document.createElement("span");
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


    
    