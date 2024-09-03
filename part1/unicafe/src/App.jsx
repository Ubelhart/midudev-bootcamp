import { useState } from "react";
import PropTypes from "prop-types";

const Button = ({ text, handle }) => <button onClick={handle}>{text}</button>;

Button.propTypes = {
    text: PropTypes.string.isRequired,
    handle: PropTypes.any.isRequired
};

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

StatisticLine.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

const Statistics = ({
    ratingOne,
    ratingTwo,
    ratingThree,
    all,
    average,
    positive
}) => {
    return (
        <>
            <h1>statistics</h1>
            {all !== 0 ? (
                <table>
                    <tbody>
                        <StatisticLine text="good" value={ratingOne} />
                        <StatisticLine text="neutral" value={ratingTwo} />
                        <StatisticLine text="bad" value={ratingThree} />
                        <StatisticLine text="all" value={all} />
                        <StatisticLine
                            text="average"
                            value={isNaN(average) ? 0 : average}
                        />
                        <StatisticLine
                            text="positive"
                            value={isNaN(positive) ? 0 : positive}
                        />
                    </tbody>
                </table>
            ) : (
                <p>No feedback given</p>
            )}
        </>
    );
};

Statistics.propTypes = {
    ratingOne: PropTypes.number.isRequired,
    ratingTwo: PropTypes.number.isRequired,
    ratingThree: PropTypes.number.isRequired,
    all: PropTypes.number.isRequired,
    average: PropTypes.number.isRequired,
    positive: PropTypes.number.isRequired
};

const App = () => {
    // guarda los clics de cada botón en su propio estado
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleClickGood = () => setGood(good + 1);

    const handleClickNeutral = () => setNeutral(neutral + 1);

    const handleClickBad = () => setBad(bad + 1);

    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = (good / all) * 100;
    return (
        <>
            <div>
                <h1>give feedback</h1>
                <Button text="good" handle={handleClickGood} />
                <Button text="neutral" handle={handleClickNeutral} />
                <Button text="bad" handle={handleClickBad} />
            </div>
            <Statistics
                ratingOne={good}
                ratingTwo={neutral}
                ratingThree={bad}
                all={all}
                average={average}
                positive={positive}
            />
        </>
    );
};

export default App;
