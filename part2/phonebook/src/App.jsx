import { useState, useEffect } from "react";
import { Notification } from "./Notification";
import { Filter } from "./Filter";
import { PersonForm } from "./PersonForm";
import { Persons } from "./Persons";
import {
    getPersons,
    postPerson,
    deletePerson,
    putPerson
} from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newPerson, setNewPerson] = useState({ name: "", number: "" });
    const [newFilter, setNewFilter] = useState([]);
    const [message, setMessage] = useState({
        success: null,
        error: null,
        type: ""
    });
    const personsUrl = "/api/persons/";

    useEffect(() => {
        getPersons(personsUrl).then((data) => {
            setPersons(data);
        });
    }, []);

    const handleNewName = (event) => {
        setNewPerson({ ...newPerson, name: event.target.value });
    };

    const handleNewNumber = (event) => {
        setNewPerson({ ...newPerson, number: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const verificationNewName = persons.some(
            (person) => person.name === newPerson.name
        );

        if (verificationNewName) {
            if (
                confirm(
                    `${newPerson.name} is already added to phone book replace the old number with a new one?`
                )
            ) {
                const personToUpdate = persons.find(
                    (person) => person.name === newPerson.name
                );
                return putPerson(personsUrl, personToUpdate.id, newPerson)
                    .then((data) => {
                        setPersons(
                            persons.map((person) =>
                                person.id === data.id ? data : person
                            )
                        );
                        setNewFilter(
                            newFilter.map((person) =>
                                person.id === data.id ? data : person
                            )
                        );
                        setNewPerson({ name: "", number: "" });
                        return data;
                    })
                    .catch((error) => {
                        setMessage({
                            ...message,
                            error: `Information of ${newPerson.name} has already been removed from server`,
                            type: "common error"
                        });
                        setNewPerson({ name: "", number: "" });
                        setTimeout(() => {
                            setMessage({ ...message, error: null });
                        }, 5000);
                        return error;
                    });
            }
            return setNewPerson({ name: "", number: "" });
        }

        return postPerson(personsUrl, newPerson).then((data) => {
            if (newPerson.name && newPerson.number) {
                setPersons(persons.concat(data));
                setNewFilter(persons.concat(data));
                setMessage({
                    ...message,
                    success: `Added ${data.name}`,
                    type: "common success"
                });
                setNewPerson({ name: "", number: "" });
                setTimeout(() => {
                    setMessage({ ...message, success: null });
                }, 5000);
                return data;
            }
            return data;
        });
    };

    const handleFilter = (event) => {
        setNewFilter(
            persons.filter((person) =>
                person.name
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
            )
        );
    };

    const handleDelete = (event) => {
        if (confirm(`Delete ${event.target.dataset.personName} ?`)) {
            return deletePerson(personsUrl, event.target.dataset.personId).then(
                (data) => {
                    setPersons((prevPersons) => {
                        return prevPersons.filter(
                            (person) => person.id !== data.id
                        );
                    });
                    setNewFilter((prevPersons) => {
                        return prevPersons.filter(
                            (person) => person.id !== data.id
                        );
                    });
                    return data;
                }
            );
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification type={message.type} message={message} />
            <Filter handler={handleFilter} />
            <h2>add a new</h2>
            <PersonForm
                onSubmit={handleSubmit}
                onChangeName={handleNewName}
                onChangeNumber={handleNewNumber}
                value={newPerson}
            />
            <h2>Numbers</h2>
            <Persons
                filter={newFilter}
                persons={persons}
                onClickDelete={handleDelete}
            />
        </div>
    );
};

export default App;
