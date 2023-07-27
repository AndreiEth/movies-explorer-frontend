import './Preloader.css';

function Preloader () {
	return (
    <div className='loader'>
      <div className='loader__container'>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__ball'></div>
      </div>
    </div>
  );
}

export default Preloader