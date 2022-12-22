const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

export const Course = ({ course }) => {
  return (
    <div>
      {course.parts.map((onecourse) => (
        <p key={onecourse.id}>
          {onecourse.name} {onecourse.exercises}
        </p>
      ))}
    </div>
  );
};

export const Adder = ({ course }) => {
  //let total = 0;
  //for (let element of course.parts) total += element.exercises;

  const initial = 0;
  const sumWithInitial = course.parts.reduce(
    (accumulator, curent) => accumulator + curent.exercises,
    initial
  );

  return (
    <div>
      <strong>total of exercises: {sumWithInitial}</strong>
    </div>
  );
};

export default Header;
