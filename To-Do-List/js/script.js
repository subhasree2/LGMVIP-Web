const inputBox = document.querySelector(".inputField input");
const addbtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAll = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
	let userData = inputBox.value;
	if(userData.trim()==0 || userData.trim()=='') {
		addbtn.classList.remove("active");
	}
	else {
		addbtn.classList.add("active");
	}
}
showTasks();
addbtn.onclick = ()=>{
	let userData = inputBox.value;

	let getLocalStorage = localStorage.getItem("New Todo");
	if(getLocalStorage == null){
		listArr = [];
	}
	else {
		listArr = JSON.parse(getLocalStorage); // json to object
	}
	let flag=0;
	listArr.forEach((element,index)=>{
		if(element==userData) {
			flag = 1;
		}
	});
	if(flag==0) listArr.push(userData); // adding user data
	else alert("Task already present!");
	localStorage.setItem("New Todo",JSON.stringify(listArr)); // object to json
	showTasks();
	addbtn.classList.remove("active");
}

function showTasks(){
	let getLocalStorage = localStorage.getItem("New Todo");
	if(getLocalStorage == null){
		listArr = [];
	}
	else {
		listArr = JSON.parse(getLocalStorage); // json to object
	}
	const pending = document.querySelector(".pending");
	pending.textContent = listArr.length;
	if(listArr.length>0){
		deleteAll.classList.add("active");
	}
	else {
		deleteAll.classList.remove("active");
	}
	let newLiTag = ' ';
	listArr.forEach((element,index) => {
		newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
	});
	todoList.innerHTML = newLiTag;
	inputBox.value = "";
}

function deleteTask(index){
	let getLocalStorage = localStorage.getItem("New Todo");
	listArr = JSON.parse(getLocalStorage);
	listArr.splice(index,1);
	localStorage.setItem("New Todo",JSON.stringify(listArr)); // object to json
	showTasks();
}

deleteAll.onclick = ()=> {
	listArr = [];
	localStorage.setItem("New Todo",JSON.stringify(listArr)); // object to json // Replace by empty list
	showTasks();
}