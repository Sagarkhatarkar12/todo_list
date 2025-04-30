let Category = document.querySelector("#CateogroySelection");
let inputText = document.querySelector("#inputText");
 let textArea = document.querySelector("#textArea");
 let messageContainer = document.querySelector("#messageContainer");
 let inputTextValue;
 let collection_item = [];
 let textAreaValue;
 let submitButton = document.querySelector("#submit");
 submitButton.addEventListener("click",(e)=>{
    e.preventDefault();

    inputTextValue = inputText.value;
    textAreaValue = textArea.value;
    let categoryValue = Category.value;
   let object = {
    "categoryValue"  : categoryValue,
    "inputTextValue" :   inputTextValue,
      "textAreaValue":  textAreaValue
    
    }
    collection_item.push(object);
    console.log(inputTextValue,textAreaValue)

    if(  inputTextValue == "" || textAreaValue == ""){
        alert("some error try again later");
        return;
    }
    else{

  
    inputText.value = "";
    textArea.value = "";
    Category.value = "";
    render();
}

        

 })
 function render(){
     messageContainer.innerHTML="";
    collection_item.forEach((item,index)=>{
      console.log(index);
      
      messageContainer.innerHTML+=` <div class="container-todo-list-message">
                    <div class="container-todo-list-message-checkBox">
                        <input class="container-todo-list-message-heading-checkBox-value" type="checkbox" name="" id="">

                    </div>
                    <div class="container-todo-list-message-heading">
                        <h1>${item.inputTextValue}</h1>
                        <p>${item.textAreaValue}</p>
                    </div>
                    <div class="container-todo-list-message-delete">
                        <button class="container-todo-list-message-delete-value"><i class="ri-delete-bin-line"></i></button>
                </div>
            </div>

            `
    })
 }
