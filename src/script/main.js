let Category = document.querySelector("#CateogroySelection");
let inputText = document.querySelector("#inputText");
let textArea = document.querySelector("#textArea");
let countElement = document.querySelector("#count");
let countValue;
let messageContainer = document.querySelector("#messageContainer");
let inputTextValue;
let PrioritySelection = document.querySelector("#PrioritySelection");
let CalendarValue;
let select_checkBox = [];
let textAreaValue;
let searchBarInput = document.querySelector("#searchBarInput");
let searchBtn = document.querySelector("#searchBtn");
let CalendarSelection = document.querySelector("#CalendarSelection");
let collection_item = []
let searchResults = document.querySelector("#searchResults");




// submit here 
let submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    inputTextValue = inputText.value.trim();
    textAreaValue = textArea.value.trim();
    let categoryValue = Category.value.trim();
    CalendarValue = CalendarSelection.value;

    if (inputTextValue == "" || textAreaValue == "" || categoryValue == "SelectOption" || PrioritySelection.value == "SelectProrites" || CalendarValue == "") {
        alert("some error try again later");
        return;
    }
    else {
        collection_item.push({ "cate": categoryValue, "inputTextValue": inputTextValue, "textAreaValue": textAreaValue, "PrioritySelection": PrioritySelection.value, "CalendarValue": CalendarValue })
        localStorage.setItem("collection_item", JSON.stringify(collection_item));
        inputText.value = "";
        textArea.value = "";
        CalendarSelection.value = "";
        PrioritySelection.value = "SelectProrites";
        Category.value = "SelectOption";
        render();
    }



})
// Edit Note logic

function Edit_Note(e) {


    let element1 = e.target.parentNode.parentNode.children[0];
    let element2 = e.target.parentNode.parentNode.children[1];
    element1.removeAttribute("readonly");
    element2.removeAttribute("readonly");
    element1.style.border = "2px solid black";
    element2.style.border = "2px solid black";
    element1.focus();
    element2.focus();
    ;
}
// Update Note logic

function Update_Note(e, index) {

    let element1 = e.target.parentNode.parentNode.children[0];
    let element2 = e.target.parentNode.parentNode.children[1];
    element1.setAttribute("readonly", "true");
    element2.setAttribute("readonly", "true");
    element1.style.border = "none";
    element2.style.border = "none";
    let inputTextValue = element1.value.trim();
    let textAreaValue = element2.value.trim();
    collection_item[index].inputTextValue = inputTextValue;
    collection_item[index].textAreaValue = textAreaValue;
    localStorage.setItem("collection_item", JSON.stringify(collection_item));
    render();


}


// checkbox logic 

function CheckBox(e) {
    if (e.target.checked == true) {
        select_checkBox.push(e.target.parentNode.parentNode.children[1].innerText);
        e.target.parentNode.parentNode.style.textDecoration = "line-through";
    }
    else {
        e.target.parentNode.parentNode.style.textDecoration = "none";
        select_checkBox.pop(e.target.parentNode.parentNode.children[1].innerText);

    }

}

// deleteAll item logic
function deleteAll() {

    select_checkBox.forEach((item) => {
        deleteItem(item - 1);
    })
    select_checkBox = [];
}

// delete item
function deleteItem(index) {
    collection_item = localStorage.getItem("collection_item");
    collection_item = JSON.parse(collection_item) || [];
    collection_item.splice(index, 1);
    localStorage.setItem("collection_item", JSON.stringify(collection_item));
    render();
}


// first time render
if (localStorage.getItem("collection_item") != null) {
    render();
}


// searching  Bar logic
searchBtn.addEventListener("click", () => {
    Data_collection = localStorage.getItem('collection_item');
    Data_collection = JSON.parse(Data_collection);
    let searchValue = searchBarInput.value.trim().toLowerCase();

    let filterData = Data_collection.filter((item) => {
        return item.inputTextValue.toLowerCase().includes(searchValue) || item.textAreaValue.toLowerCase().includes(searchValue)
    })
    searchResults.innerHTML ="";
    // if(filterData.length == 0) {
    //     // searchResults.innerHTML = `
    //     // <div class="containerList">
    //     // <li class="container-Navigation-bar-right-search-bar-results-item">No results found</li>
    //     // </div>`
    //     return
    // }
    console.log(filterData)
    if(filterData.length==0){
        searchResults.innerHTML= ` 
     
        <li class="container-Navigation-bar-right-search-bar-results-item">No found</li>
        
        `
    }
    filterData.forEach((item)=>{
        console.log(item.inputTextValue);
        console.log(item)
        console.log()
        // document.writeln(item.inputTextValue);

        searchResults.innerHTML+= `<li class="container-Navigation-bar-right-search-bar-results-item">${item.inputTextValue}</li>`
    })

    // console.log(searchBarInput.value);
})

// render function

function render() {
    messageContainer.innerHTML = "";
    collection_item = localStorage.getItem("collection_item");
    collection_item = JSON.parse(collection_item);
    countElement.style.color = "blue";
    countElement.style.fontWeight = "bold";
    countElement.innerHTML = collection_item.length
    collection_item.forEach((item, index) => {
        let bgcolor = "white";
        if (item.PrioritySelection == "red") bgcolor = "linear-gradient(to right, #ff6b6b, #ff4e50)";
        else if (item.PrioritySelection == "yellow") bgcolor = " linear-gradient(to right, #FFF89A, #FFD93D)";
        else bgcolor = " linear-gradient(to right, #b8f1b0, #70e000)"

        messageContainer.innerHTML += ` <div class="container-todo-list-message-container-message" style="background: ${bgcolor};">
                    <div class="container-todo-list-message-container-message-checkBox" >
                        <input class="container-todo-list-message-container-message-checkBox-value" onchange="CheckBox(event)" type="checkbox" name="" id="">
                    </div>
                    <p> ${index + 1}</p>
                    <div class="container-todo-list-message-container-message-heading">
                        <textArea  class="container-todo-list-message-container-message-heading-value" minlength="2" maxlength="20" readonly>${item.inputTextValue}</textArea>
                       <textArea  class="container-todo-list-message-container-message-heading-para-value" minlength="2" maxlength="300"  readonly>${item.textAreaValue}</textArea>
                       <p>${item.cate}</p>
                        <p>${item.CalendarValue}</p>
                        <div class="container-todo-list-search-btn">
                        <button  type="submit"  onclick="Edit_Note(event)" id="editBtn" class="container-todo-list-search-btn-value">Edit Note</button>
                    </div>
                        <div class="container-todo-list-search-btn">
                        <button  type="submit"onclick="Update_Note(event,${index})"  id="updateBtn"   class="container-todo-list-search-btn-value">Update Note</button>
                    </div>
                     </div>
                    
                    <div class="container-todo-list-search-btn">
                        <button onclick="deleteItem(${index})" class="container-todo-list-search-btn-value"><i class="ri-delete-bin-line"></i></button>
                </div>
            </div>
            `
    })


}

