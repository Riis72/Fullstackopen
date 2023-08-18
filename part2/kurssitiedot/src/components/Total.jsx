const Total = ({ course }) => {
    const sum = course.parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      0,
    );
    return <p>Number of exercises {sum}</p>
  }
export default Total