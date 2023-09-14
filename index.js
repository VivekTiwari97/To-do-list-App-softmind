const entry= document.getElementById("entry")
const form= document.getElementById("form")
const ul= document.getElementById("todo-list")
const alertP= document.querySelector(".alert")

const clearBtn= document.querySelector(".clear-btn")
const submitBtn= document.querySelector(".submit-btn")
const cancelBtn= document.querySelector(".cancel-btn")

let editFlag = false
let editElement;

form.addEventListener("submit", addItem)
clearBtn.addEventListener("click", clearItem)
cancelBtn.addEventListener("click", setBackToDefault);

function addItem(e){
    e.preventDefault()
    let val= entry.value

    if (val && !editFlag){
        createLIS(val)
        displayAlert("a new item has been added"+" "+"☑️", "alert-success")
        clearBtn.classList.remove("d-none")
    }
    else if(val && editFlag){
        editElement.innerText=val
        displayAlert("value changed"+" "+"☑️", "alert-success")
        setBackToDefault()
    }
    else {
        displayAlert("Please type Somthing!"+" "+"❌", "alert-danger")
    }
    entry.value= null
}

function createLIS(val){
    const li= document.createElement("li")
    li.className= "list-item";
    li.innerHTML = `
                <p class="text">${val}</p>
                <i class='bx bx-edit bx-sm'></i>
                <i class='bx bx-check bx-sm'></i>
                <i class='bx bxs-trash bx-sm'></i>`;

                li.querySelector(".bx.bx-edit").addEventListener("click", editItem)
                li.querySelector(".bx.bx-check").addEventListener("click", checkItem)
                li.querySelector(".bx.bxs-trash").addEventListener("click", deleteItem)
                
                ul.append(li)
}

function editItem(){
    console.log("edit");
    editFlag = true;

    console.log(this);

    console.log(this.previousElementSibling);

    let pText= this.previousElementSibling;
    editElement=pText

    entry.value=this.previousElementSibling.innerText

    submitBtn.innerText= "Edit"
    cancelBtn.classList.remove("d-none")
    ul.querySelectorAll(".bx").forEach(i=>{
        i.classList.add("v-none")
    })
    
    clearBtn.classList.add("d-none")
}
function checkItem(){
    console.log(this)
    console.log(this.parentElement)
   this.parentElement.classList.toggle("liChecked")
}
function deleteItem(){
    ul.removeChild(this.parentElement)
    displayAlert("one item was removed!", "alert-danger")
    if(ul.children.length === 0){
        clearBtn.classList.add("d-none")
    }
}

function displayAlert(msg, styles){
    alertP.classList.add(styles)
    alertP.innerText = msg;

    setTimeout(()=>{
        alertP.innerText = null;
    alertP.classList.remove( styles)
    },1500)

}

function clearItem (){
    ul.innerHTML= null;
    displayAlert(" All item were removed", "alert-danger")
    clearBtn.classList.add("d-none")
}

function setBackToDefault(){
    editFlag = false;
    editElement= undefined
    entry.value=null
    submitBtn.innerText= "Submit"
    cancelBtn.classList.add("d-none")
    ul.querySelectorAll(".bx").forEach(i=>{
        i.classList.remove("v-none")
    })
     clearBtn.classList.remove("d-none")  
}

