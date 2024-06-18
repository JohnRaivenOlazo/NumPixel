export const Fraction = ({ numerator, denominator, addEquals, addPlus }) => {
    return (
      <>
      {" "}
      <div className='fraction'>
        <span>{numerator}</span>
        <span>{denominator}</span>
      </div>
      {addEquals ? " = " : " "}
      {addPlus ? " + " : " "}
      </>
    );
}