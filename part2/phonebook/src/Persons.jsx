export const Persons = ({ filter, persons, onClickDelete }) => {
    return (
        <>
            {filter.length
                ? filter.map((person) => {
                      return (
                          <p key={person.id}>
                              {person.name} {person.number}{" "}
                              <button
                                  data-person-id={person.id}
                                  data-person-name={person.name}
                                  onClick={onClickDelete}
                              >
                                  delete
                              </button>
                          </p>
                      );
                  })
                : persons.map((person) => (
                      <p key={person.id}>
                          {person.name} {person.number} {""}
                          <button
                              data-person-id={person.id}
                              data-person-name={person.name}
                              onClick={onClickDelete}
                          >
                              delete
                          </button>
                      </p>
                  ))}
        </>
    );
};
