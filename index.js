let inputBox = document.querySelector(`.inputBox`);
let inputBtn = document.querySelector(`.inputBtn`);
let inputError = document.querySelector(`.inputError`);
let inputStore = document.querySelector(`.inputStore`);



const getItem = () =>{
    return JSON.parse(localStorage.getItem(`todoList`));
}
let listArray = getItem() || [];
console.log(listArray);

const listArrayAgain = (listArray) =>{
    return localStorage.setItem(`todoList`, JSON.stringify(listArray));
}

const finalResult = (curElem) =>{
    let listDiv = document.createElement(`div`);
    listDiv.classList.add(`listDiv`);
    listDiv.innerHTML = `<li>${curElem}</li> <button class="deleteBtn">Delete</button>`;
    inputStore.append(listDiv);
    inputBox.value = ``;
}

const listing = () =>{
    if (inputBox.value) {
        let inputValue = inputBox.value.trim();

        if (!listArray.includes(inputValue)) {
            
            listArray.push(inputValue)
        
            listArray = [...new Set(listArray)];
            // console.log(listArray);

            localStorage.setItem(`todoList`, JSON.stringify(listArray));

            finalResult(inputValue);
        } else{
            inputError.innerHTML = `*The value is existed in the list`;
            inputBox.value = ``;
        }
        

    } else{
        inputError.innerHTML = `*Please input a value first`;
    }
}


const showing = () =>{
    listArray.forEach(curElem => {
        finalResult(curElem);
    });
}
showing();


const removeItem = (e) =>{
    // console.log(e.target);
    let targetChild = e.target;
    let parentElem = targetChild.parentElement;
    let removeContent = targetChild.previousElementSibling.innerText;
    // console.log(removeContent);

    listArray = listArray.filter((curElem) =>{
        return curElem !== removeContent;
    })
    // console.log(listArray);

    listArrayAgain(listArray);
    parentElem.remove();
}

inputStore.addEventListener(`click`, (e) =>{
    e.preventDefault();

    if (e.target.classList.contains(`deleteBtn`)) {
        removeItem(e);
    }
});


inputBtn.addEventListener(`click`, () =>{
    listing();
});

inputBox.addEventListener(`keydown`, () =>{
    inputError.innerHTML = ``;
});
