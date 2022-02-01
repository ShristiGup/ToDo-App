showTasks();
showCompleted();

// Show completed tasks
function showCompleted(){
    let tasks = localStorage.getItem('tasks');
    if(tasks!=null){
    taskObj = JSON.parse(tasks);
    for(let i=0;i<taskObj.length;i++){
        let completeTaskBtn = document.getElementById(`completeTaskBtn-${i}`);
        let data = document.getElementById(`td-${i}`);
        if(taskObj[i].completed == true){
            data.classList.add("txt-decoration");
            completeTaskBtn.style.visibility = "hidden";
            completeTaskBtn.style.cursor = "none";
        }
    }
    }
}

let addText = document.getElementById('addTxt');
let addTaskBtn = document.getElementById('addTaskBtn');

// Adding a task
addTaskBtn.addEventListener("click",function(){
    if(addText.value.trim()!=""){
        let tasks = localStorage.getItem('tasks');
        if(tasks==null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(tasks);
        }
        let obj = {
            txt: addText.value,
            completed: false
        }
        taskObj.push(obj);
        localStorage.setItem("tasks",JSON.stringify(taskObj));
        addText.value="";
    }
    showTasks();
    showCompleted();
})

// Function to show all the tasks
function showTasks(){
    let displayTasks = document.getElementById('displayTasks');
    let tasks = localStorage.getItem('tasks');
    if(tasks==null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(tasks);
    }
    let html = "";
    taskObj.forEach((task,index) => {
    html+=`<tr>
                <td class="font-wt txt-center">Task ${index+1}</td>
                <td id="td-${index}">${task.txt}</td>
                <td><button id="completeTaskBtn-${index}" class="btn bg-green txt-white txt-right font-wt" onclick="taskCompleted(${index})">Completed</button></td>
                <td><button id="${index}" class="btn bg-red txt-white txt-right font-wt" onclick="deleteTask(this.id)">Delete</button></td>
            </tr> `;
    
    });
    if(taskObj.length!=0){
        displayTasks.innerHTML = html;
    }
    else{
        displayTasks.innerHTML = "";
    }
}

// Deleting a task
function deleteTask(index){
    let tasks = localStorage.getItem('tasks');
    taskObj = JSON.parse(tasks);
    taskObj.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(taskObj));
    showTasks();
    showCompleted();
}

// Task is completed
function taskCompleted(index){
    let completeTaskBtn = document.getElementById(`completeTaskBtn-${index}`);
    let data = document.getElementById(`td-${index}`);
    let tasks = localStorage.getItem('tasks');
    taskObj = JSON.parse(tasks);
    taskObj[index].completed = true;
    for(let i of taskObj){
        if(i.completed == true){
            data.classList.add("txt-decoration");
            completeTaskBtn.style.visibility = "hidden";
            completeTaskBtn.style.cursor = "none";
        }
    }
    localStorage.setItem("tasks",JSON.stringify(taskObj));
}

// Deleting all the tasks
let deleteAllBtn = document.getElementById("deleteAllBtn");
deleteAllBtn.addEventListener("click",function(){
    let tasks = localStorage.getItem('tasks');
    if(tasks!=null){
        taskObj = JSON.parse(tasks);
        taskObj = [];
        localStorage.setItem("tasks",JSON.stringify(taskObj));
    }
    showTasks();
    showCompleted();
})