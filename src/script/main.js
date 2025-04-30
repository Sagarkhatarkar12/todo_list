let Category = document.querySelector("#CateogroySelection");
let inputText = document.querySelector("#inputText");
let textArea = document.querySelector("#textArea");
let messageContainer = document.querySelector("#messageContainer");
let inputTextValue;
let textAreaValue;
let collection_item = []
let submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    inputTextValue = inputText.value.trim();
    textAreaValue = textArea.value.trim();
    let categoryValue = Category.value.trim();
    collection_item.push({ "inputTextValue": inputTextValue, "textAreaValue": textAreaValue })
    localStorage.setItem("collection_item", JSON.stringify(collection_item));
    // localStorage.setItem("category",categoryValue);
    // localStorage.setItem("inputText",inputTextValue);
    // localStorage.setItem("textArea",textAreaValue);


    console.log(inputTextValue, textAreaValue)

    if (inputTextValue == "" || textAreaValue == "") {
        alert("some error try again later");
        return;
    }
    else {


        inputText.value = "";
        textArea.value = "";
        Category.value = "";
        render();
    }



})
function deleteItem(index) {

    collection_item = localStorage.getItem("collection_item");

    collection_item = JSON.parse(collection_item) || [];
    collection_item.splice(index, 1);
    localStorage.setItem("collection_item", JSON.stringify(collection_item));

    render();
}
render();
function render() {
    messageContainer.innerHTML = "";
    collection_item = localStorage.getItem("collection_item");
    collection_item = JSON.parse(collection_item);
    // console.log(collection_item);

    collection_item.forEach((item, index) => {
        console.log(index);

        messageContainer.innerHTML += ` <div class="container-todo-list-message">
                    <div class="container-todo-list-message-checkBox">
                        <input class="container-todo-list-message-heading-checkBox-value" type="checkbox" name="" id="">

                    </div>
                    <div class="container-todo-list-message-heading">
                        <h1>${item.inputTextValue}</h1>
                        <p>${item.textAreaValue}</p>
                    </div>
                    <div class="container-todo-list-message-delete">
                        <button onclick=(deleteItem(${index})) class="container-todo-list-message-delete-value"><i class="ri-delete-bin-line"></i></button>
                </div>
            </div>

            `
    })
}
