import PropTypes from "prop-types";
// constants
const course = {
    name: "Half Stack application development",
    parts: [
        {
            name: "Fundamentals of React",
            exercises: 10
        },

        {
            name: "Using props to pass data",
            exercises: 7
        },

        {
            name: "State of a component",
            exercises: 14
        }
    ]
};

// components
const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, number }) => <p>{name + " " + number}</p>;

const Content = ({ parts }) =>
    parts.map((part, i) => (
        <Part key={i} name={part.name} number={part.exercises} />
    ));

const Total = ({ parts }) => {
    const sum = parts.reduce((acc, o) => acc + o.exercises, 0);
    return <p>Number of exercises {sum}</p>;
};

// propTypes
Part.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
};

Content.propTypes = {
    parts: PropTypes.array.isRequired
};

Header.propTypes = {
    course: PropTypes.string.isRequired // Valida que 'course' sea una cadena y es requerida
};

Total.propTypes = {
    parts: PropTypes.array.isRequired
};

const App = () => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default App;
