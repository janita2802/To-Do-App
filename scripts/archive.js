let archive = JSON.parse(localStorage.getItem("archive")) || [];
displayData(archive);

let filterPriority = document.getElementById("selectpriority");
let filterStatus = document.getElementById("selectstatus");
let resetButton = document.getElementById("resetButton");

filterPriority.addEventListener("change", function() {
  filterData(archive);
});

filterStatus.addEventListener("change", function() {
  filterData(archive);
});

resetButton.addEventListener("click", function() {
  filterPriority.value = "title";
  filterStatus.value = "title";
  filterData(archive);
});

function filterData(archive) {
  let priorityValue = filterPriority.value;
  let statusValue = filterStatus.value;

  let filteredArray = archive.filter(function(ele) {
    let priorityMatch = (priorityValue === "all") || (priorityValue === "title") || (ele.rank === priorityValue);
    let statusMatch = (statusValue === "all") || (statusValue === "title") || (ele.status === statusValue);
    return priorityMatch && statusMatch;
  });

  displayData(filteredArray);
}
function displayData(archive) {
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = null;
  
    archive.forEach(function(ele, i) {
      let tr1 = document.createElement("tr");
  
      let tdname = document.createElement("td");
      tdname.innerText = ele.taskname;
  
      let tdrank = document.createElement("td");
      tdrank.innerText = ele.rank;
  
      if (ele.rank === "high") {
        tdrank.style = "background-color:red";
      } else if (ele.rank === "medium") {
        tdrank.style = "background-color:yellow";
      } else {
        tdrank.style = "background-color:#08ff08";
      }
  
      let tdstatus = document.createElement("td");
      let btnstatus = document.createElement("button");
      btnstatus.innerHTML = ele.status === "Pending" 
        ? "Pending<span class='material-symbols-outlined blue'>sync</span>" 
        : "Completed<span class='material-symbols-outlined green'>check_small</span>";
      btnstatus.style = "display:flex; align-items:center;border:none; border-radius:3px; padding:5px;font-weight:600px;";
  

      let restore = document.createElement("td");
      let restorebtn = document.createElement("button");
      restorebtn.textContent = "Restore";
      restorebtn.addEventListener("click", function() {
        restoredata(i);
      });

      restorebtn.style = "border:none; border-radius:3px; padding:5px;background-color:#ffab00e6;font-weight:600px; color:white;";

      let delbtn = document.createElement("td");
      let archivebutton = document.createElement("button");
      archivebutton.textContent = "Delete";
      archivebutton.addEventListener("click", function() {
        deletedata(i);
      });
  
      archivebutton.style = "border:none; border-radius:3px; padding:5px;background-color:red;font-weight:600px; color:white;";
  
      tdstatus.appendChild(btnstatus);
      restore.appendChild(restorebtn);
      delbtn.appendChild(archivebutton);
      tr1.append(tdname, tdrank, tdstatus, restore, delbtn);
      tbody.append(tr1);
    });
  }

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  function restoredata(index) {
    let restored = archive.splice(index, 1)[0];
    localStorage.setItem("archive", JSON.stringify(archive));
    displayData(archive);

    todos.push(restored);
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function deletedata(index) {
    archive.splice(index, 1);
    localStorage.setItem("archive", JSON.stringify(archive));
    displayData(archive);
  }
  
  