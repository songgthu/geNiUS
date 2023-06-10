let countdownInterval;

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
          */
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
        document.getElementById("secs").innerHTML = ("0" + secs);*/
        
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

    