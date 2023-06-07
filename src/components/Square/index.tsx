import React from "react";

interface SquareProps {
    children: React.ReactNode;
    index: number;
    updateBoard: (index: number) => void;
}

function Square({ children, index, updateBoard }: SquareProps) {

    const handleClick = (index:number) => {
        updateBoard(index)
    }

    return (
        <div
            onClick={() => handleClick(index)}
            className="cursor-pointer grid place-content-center rounded-lg w-16 h-16 md:w-24 md:h-24 border-2 border-neutral-800">
            {children}
        </div>
    );
}

export default Square;