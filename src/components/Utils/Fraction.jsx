const Fraction = ({ numerator, denominator, addEquals, addPlus }) => {
    return (
      <div>

      {" "}
      <div className='fraction'>
        <span>{numerator}</span>
        <span>{denominator}</span>
      </div>
      {addEquals ? " = " : " "}
      {addPlus ? " + " : " "}
      </div>
    );
}

export default Fraction