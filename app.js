let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msg=document.querySelector("#msg");
let msgContainer=document.querySelector(".msg-container");
let count=0;
let turnO=true;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    count=0;
    msgContainer.classList.add("hide");
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){ //playerO
            box.innerText="O";
            turnO=false;
        }
        else{ //playerX
            box.innerText="X";
            turnO=true;
        }
        count++;
        box.disabled=true;
        checkWinner(count);  
    });
});
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
let check=false;
const checkWinner=(count)=>{
    for(let pattern of winPatterns){
            let pos1Val=boxes[pattern[0]].innerText;
            let pos2Val=boxes[pattern[1]].innerText;
            let pos3Val=boxes[pattern[2]].innerText;
            if(pos1Val!=="" && pos2Val!=="" && pos3Val!==""){
                if(pos1Val===pos2Val && pos2Val===pos3Val){
                    showWinner(pos1Val);
                    check=true;
                    disableBoxes();
                }
            }

    }
    if(count>=9 && !check) drawCase();
};
const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    count=0;
};
const drawCase=()=>{
    msg.innerText=`No was the Winner`;
    msgContainer.classList.remove("hide");
    count=0;
}
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);