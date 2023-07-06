const boxes = document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');
let currentPlayer;
let gameGrid;
const winningPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// initialize game karo

function initGame(){
    currentPlayer ='X';
    gameGrid = ["","","","","","","","",""];
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
    newGameBtn.classList.remove('active');
    // UI pe bhi Empty karna padega
    for(let i=0;i<boxes.length;i++)
    {
        boxes[i].innerText = "";
        boxes[i].style.pointerEvents ="all";
        boxes[i].classList.remove("win");

    }
}
function swapTurn(){
    if(currentPlayer === 'X')
    {
        currentPlayer = '0';
        
    }
    else {
        currentPlayer = 'X';
    }
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
    

}

function checkGameOver(){
    
    let answer ="";
    for(let i=0;i<winningPosition.length;i++)
    {
        if(gameGrid[winningPosition[i][0]] !== "" && gameGrid[winningPosition[i][0]] === gameGrid[winningPosition[i][1]] && gameGrid[winningPosition[i][1]] === gameGrid[winningPosition[i][2]] && gameGrid[winningPosition[i][0]] === gameGrid[winningPosition[i][2]])
        {
            boxes[winningPosition[i][0]].classList.add("win");
            boxes[winningPosition[i][1]].classList.add("win");
            boxes[winningPosition[i][2]].classList.add("win");

            if(gameGrid[winningPosition[i][0]] === "X")
            {
                answer="X";
            }
            else{
                answer="0";
            }
            //winner mila hai toh stop pointer events //
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            });
        }

        
    }
    if(answer !== "")
    {
        newGameBtn.classList.add("active");
        gameInfo.innerText =`Winner Player - ${answer}`;
        return;

    }
    for(let i=0;i<gameGrid.length;i++)
    {
        if(gameGrid[i] === "")
        {
            return;
        }
    }
    newGameBtn.classList.add("active");
    gameInfo.innerText =`Game Tied!`;
}
function handleClick(index){
    // console.log(`box - ${index} click hua hai`);
    if(gameGrid[index] == "")
    {
        boxes[index].innerText = currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents ="none";
        //swap turn
        swapTurn();
        // check koi jeeta kya //
        checkGameOver();
    }

}
initGame();

for(let i=0 ; i < boxes.length ;i++){
    boxes[i].addEventListener("click" , ()=>{
        handleClick(i);
    })
};

newGameBtn.addEventListener("click", ()=>
{
    initGame();
    
})


