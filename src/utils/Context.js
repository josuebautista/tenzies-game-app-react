import React, { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const randomNum = () => {
        const min = 1;
        const max = 9;
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const [numbers, setNumbers] = useState(generateArray());
    const [finishDice, setFinishDice] = useState(false);
    const [count, setCount] = useState(0);
    const [stop, setStop] = useState(false);


    function generateArray() {
        const arrayNumbers = [];
        for (var i = 0; i < 10; i++) {
            const number = randomNum();
            const objectNumber = {
                value: number,
                isHeald: false,
                id: nanoid()
            };
            arrayNumbers.push(objectNumber);
        }
        //console.log(arrayNumbers);
        return arrayNumbers;
    }

    function holdDice(id) {
        setNumbers(numbers => numbers.map(number => {
            return number.id === id ? { ...number, isHeald: true } : number
        }));
        checkOtherDice(id);
        //checkFinishedDice();
    }

    const checkOtherDice = (id) => {
        const number = numbers.find((n) => n.id === id);
        //console.log(number);
        setNumbers(numbers => numbers.map(num => {
            return num.value === number.value ? { ...num, isHeald: true } : num
        }));
    }

    //const checkFinishedDice = () => {
        //}
        
    function rollArrayNumbers() {
        if (numbers.some(number => number.isHeald === true)) {
            setNumbers(numbers => numbers.map(number => {
                return number.isHeald === false ? { ...number, value: randomNum() } : number
            }));
        } else {
            setNumbers(generateArray());
        }
    }

    function resetGame() {
        setNumbers(generateArray());
    }

    const handleStop = () => {
        setStop(true);
    };

    useEffect(() => {
        setFinishDice(!numbers.some(number => number.isHeald === false))
        //console.log('finish dice value: ', !numbers.some(number => number.isHeald === false));
        if (finishDice){
            handleStop()
        }
    }, [numbers, finishDice])
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (!stop) {
                setCount((prevCount) => prevCount + 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [stop]);


    return <AppContext.Provider value={{
        numbers,
        rollArrayNumbers,
        holdDice,
        finishDice,
        resetGame,
        count
    }}
    >
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };