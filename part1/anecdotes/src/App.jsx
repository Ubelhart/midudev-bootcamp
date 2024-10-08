import { useState } from "react";

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well."
    ];
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [selected, setSelected] = useState(0);
    const copy = [...points];

    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const handleClick = () => setSelected(getRandomInt(anecdotes.length));
    const handleVote = () => {
        copy[selected] += 1;
        setPoints(copy);
    };

    let max = copy[0];
    let maxPosition = 0;

    for (let i = 1; i < copy.length; i++) {
        if (copy[i] > max) {
            max = copy[i];
            maxPosition = i;
        }
    }

    return (
        <>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]} </div>
            <div>has {points[selected]} votes</div>
            <button onClick={handleVote}>Vote</button>
            <button onClick={handleClick}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <div>{anecdotes[maxPosition]}</div>
        </>
    );
};

export default App;
