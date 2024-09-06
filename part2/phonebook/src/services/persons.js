export const getPersons = (url) => {
    return fetch(url).then((res) => {
        return res.json();
    });
};

export const postPerson = (url, newPerson) => {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(newPerson),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json());
};

export const deletePerson = (url, id) => {
    return fetch(url + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json());
};

export const putPerson = (url, id, updatedPerson) => {
    return fetch(url + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPerson)
    }).then((res) => res.json());
};
