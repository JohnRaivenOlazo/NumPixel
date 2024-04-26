const Fraction = ({ numerator, denominator }) => {
    return (
      <>
      <div className='fraction'>

      <span>
            {numerator}
        </span>
        <span>
            {denominator}
            </span>
      </div>
    </>
    );
}

export default Fraction