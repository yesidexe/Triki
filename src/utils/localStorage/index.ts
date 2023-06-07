export const saveLocalStorage = (board:(string | null)[],turn:string)=>{
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)    
}

