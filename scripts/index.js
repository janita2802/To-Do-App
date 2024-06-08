var form = document.querySelector("form");
form.addEventListener("submit", function(event){
  getData(event);
});

var todos = JSON.parse(localStorage.getItem("todos")) || [];
displayData(todos);

function getData(event) {
  event.preventDefault();
  var input1 = document.getElementById("task").value;
  var priority_type = document.getElementById("priority").value;

  if (input1 === "" || priority_type === "") {
    alert("To Do Cannot Be Empty!!");
    return;
  }

  var isDuplicate = todos.some(function(todo) {
    return todo.taskname === input1 && todo.rank === priority_type;
  });

  if (isDuplicate) {
    alert("Task already exists!");
    return;
  }

  let obj = {
    taskname: input1,
    rank: priority_type,
    status: "Pending"
  };

  todos.push(obj);

  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);
  displayData(todos);
}

function displayData(todos) {
  var tbody = document.querySelector("tbody");
  tbody.innerHTML = null;

  todos.forEach(function(ele, i) {
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

    btnstatus.addEventListener("click", function() {
      toggleStatus(this, i);
    });

    btnstatus.style = "display:flex; align-items:center;border:none; border-radius:3px; padding:5px;font-weight:600px;";

    let delbtn = document.createElement("td");
    let archivebutton = document.createElement("button");
    archivebutton.textContent = "Archive";
    archivebutton.addEventListener("click", function() {
      deletedata(i);
    });

    archivebutton.style = "border:none; border-radius:3px; padding:5px;background-color:#ffab00e6;font-weight:600px; color:white;";

    tdstatus.appendChild(btnstatus);
    delbtn.appendChild(archivebutton);
    tr1.append(tdname, tdrank, tdstatus, delbtn);
    tbody.append(tr1);
  });
}

function toggleStatus(button, index) {
  let currentStatus = button.innerHTML;

  if (currentStatus.includes("Pending")) {
    button.innerHTML = "Completed<span class='material-symbols-outlined green'>check_small</span>";
    todos[index].status = "Completed";
  } else {
    button.innerHTML = "Pending<span class='material-symbols-outlined blue'>sync</span>";
    todos[index].status = "Pending";
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}

let archive = JSON.parse(localStorage.getItem("archive")) || [];
function deletedata(index) {
  let archived = todos.splice(index, 1)[0];
  localStorage.setItem("todos", JSON.stringify(todos));
  displayData(todos);

  archive.push(archived);
  console.log(archive);
  localStorage.setItem("archive", JSON.stringify(archive));
}


