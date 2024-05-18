const Fraction = ({ numerator, denominator, addEquals }) => {
    return (
      <>
      {" "}
      <div className='fraction'>
        <span>{numerator}</span>
        <span>{denominator}</span>
      </div>
      {addEquals ? " = " : " "}
      </>
    );
}

export default Fraction