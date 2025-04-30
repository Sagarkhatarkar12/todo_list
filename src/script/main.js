let Category = document.querySelector("#CateogroySelection");
let inputText = document.querySelector("#inputText");
let textArea = document.querySelector("#textArea");
let countElement = document.querySelector("#count");
let countValue;
let messageContainer = document.querySelector("#messageContainer");
let inputTextValue;
let PrioritySelection = document.querySelector("#PrioritySelection");


let textAreaValue;
let collection_item = []
let submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    inputTextValue = inputText.value.trim();
    textAreaValue = textArea.value.trim();
    let categoryValue = Category.value.trim();
    collection_item.push({ "inputTextValue": inputTextValue, "textAreaValue": textAreaValue ,"PrioritySelection":PrioritySelection.value})
    localStorage.setItem("collection_item", JSON.stringify(collection_item));


    console.log(inputTextValue, textAreaValue)

    if (inputTextValue == "" || textAreaValue == "" || categoryValue == "SelectOption") {
        alert("some error try again later");
        return;
    }
    else {


        inputText.value = "";
        textArea.value = "";
        Category.value = "SelectOption";
        render();
    }



})


function CheckBox(e) {
    console.log(e.target.checked);
    if (e.target.checked == true) {
        console.log(e.target.parentNode)
        e.target.parentNode.parentNode.style.textDecoration = "line-through";

    }
    else {
        e.target.parentNode.parentNode.style.textDecoration = "none";

    }


}
function deleteItem(index) {

    collection_item = localStorage.getItem("collection_item");

    collection_item = JSON.parse(collection_item) || [];
    collection_item.splice(index, 1);
    localStorage.setItem("collection_item", JSON.stringify(collection_item));

    render();
}



if (localStorage.getItem("collection_item") != null) {


    render();
}


function render() {
    messageContainer.innerHTML = "";
    collection_item = localStorage.getItem("collection_item");
    collection_item = JSON.parse(collection_item);
    countElement.style.color = "blue";
    countElement.style.fontWeight = "bold";
    countElement.innerHTML = collection_item.length


    collection_item.forEach((item, index) => {
        console.log(index);let bgcolor  = "white";
        if(item.PrioritySelection == "red")bgcolor ="red";
        else if(item.PrioritySelection == "yellow")bgcolor = "yellow";
        else bgcolor="green"

        messageContainer.innerHTML += ` <div class="container-todo-list-message bgcolor" style="background-color: ${bgcolor};">
                    <div class="container-todo-list-message-checkBox" >
                        <input class="container-todo-list-message-heading-checkBox-value" onchange="CheckBox(event)" type="checkbox" name="" id="">

                    </div>
                    <div class="container-todo-list-message-heading">
                        <h1>${item.inputTextValue}</h1>
                        <p>${item.textAreaValue}</p>
                   
                        <div class="container-todo-list-search-btn">
                        <button  type="submit" class="container-todo-list-search-btn-value">Edit Note</button>
                    </div>
                        <div class="container-todo-list-search-btn">
                        <button  type="submit" class="container-todo-list-search-btn-value">Update Note</button>
                    </div>
                     </div>
                    
                    <div class="container-todo-list-message-delete">
                        <button onclick="deleteItem(${index})" class="container-todo-list-message-delete-value"><i class="ri-delete-bin-line"></i></button>
                </div>
            </div>

            `
    })
}
