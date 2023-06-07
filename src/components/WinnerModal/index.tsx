import React from "react";
import { IconCircle, IconXMark } from "../Icons";

interface WinnerModalProps {
    winner: string | boolean | null;
    resetGame: () => void;
}

const WinnerModal: React.FunctionComponent<WinnerModalProps> = ({ winner, resetGame }) => {
    if (winner === null) return null

    return (
        <section className="bg-neutral-950/50 absolute top-0 w-full h-full grid place-content-center">
            <div className="gap-5 flex flex-col bg-neutral-900 items-center py-5 px-8 rounded-xl">
                <span className="text-2xl font-semibold text-neutral-300">
                    {
                        winner === false ? 'Empate' : 'Ganó'
                    }
                </span>
                {
                    winner &&
                    <span className={`grid bg-neutral-950 place-content-center w-14 h-14 md:w-20 md:h-20 winnerder-2 rounded-lg winnerder-neutral-900`}>
                        {winner==='<IconCircle />'?<IconCircle />:(winner==='<IconXMark />'?<IconXMark />:null)}
                    </span>
                }
                <button
                    onClick={resetGame}
                    className="bg-neutral-950 text-neutral-300 md:text-xl px-5 py-3 rounded-lg font-medium">Empezar de nuevo</button>
            </div>
        </section>
    );
};

export default WinnerModal;
