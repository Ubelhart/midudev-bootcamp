import PropTypes from "prop-types";

// components
const Part = ({ name, number }) => <p>{name + " " + number}</p>;

const Content = ({ parts }) => {
    const total = parts.reduce((acc, o) => acc + o.exercises, 0);
    return (
        <>
            {parts.map((part) => (
                <Part key={part.id} name={part.name} number={part.exercises} />
            ))}
            <p>total of {total} exercises</p>
        </>
    );
};

const Header = ({ name }) => (
    <>
        <h1>Web development curriculum</h1>
        <h2>{name}</h2>
    </>
);

export const Course = ({ course }) => (
    <>
        <Header name={course.name} />
        <Content parts={course.parts} />
    </>
);

// propTypes
Course.propTypes = {
    course: PropTypes.any.isRequired
};

Part.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
};

Content.propTypes = {
    parts: PropTypes.array.isRequired
};

Header.propTypes = {
    name: PropTypes.string.isRequired // Valida que 'course' sea una cadena y es requerida
};
