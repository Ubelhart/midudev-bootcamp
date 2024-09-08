export const Persons = ({ filter, persons, onClickDelete }) => {
    return (
        <ul>
            {filter.length
                ? filter.map((person) => {
                      return (
                          <li className="person" key={person.id}>
                              {person.name} {person.number}{" "}
                              <button
                                  data-person-id={person.id}
                                  data-person-name={person.name}
                                  onClick={onClickDelete}
                              >
                                  delete
                              </button>
                          </li>
                      );
                  })
                : persons.map((person) => (
                      <li className="person" key={person.id}>
                          {person.name} {person.number} {""}
                          <button
                              data-person-id={person.id}
                              data-person-name={person.name}
                              onClick={onClickDelete}
                          >
                              delete
                          </button>
                      </li>
                  ))}
        </ul>
    );
};
