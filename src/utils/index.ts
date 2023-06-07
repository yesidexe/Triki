export const winner_combos:number[][] = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],   
    [6,4,2],  
]

export const checkWinner = (array:(string | null)[])=>{
    for(const combo of winner_combos){
        const [a,b,c] = combo
        if(
            array[a]&&
            array[a] === array[b] &&
            array[a] === array[c]
        ){
            return array[a];
        }
    }
    return null
}

export const checkEndGame = (array:(string | null)[])=>{
    return array.every((square)=>square!==null)
}