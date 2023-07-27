import './FilterCheckbox.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function FilterCheckbox({ handleCheckbox }) {
  const { pathname } = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    handleCheckbox(!isChecked);
  };

  useEffect(() => {
    if (pathname === '/movies') {
      const storageIsShort = JSON.parse(localStorage.getItem('storageIsShort'));
      storageIsShort && setIsChecked(storageIsShort);
    } else {
      setIsChecked(false);
    }
  }, []);
  return (
    <div className='switch'>
      <div className='switch__content'>
        <label className='switch__wrapper'>
          <input
            type='checkbox'
            className='switch__input'
            checked={isChecked}
            onChange={handleChange}
          />
          <span className='slider'></span>
          <span className='switch__name'>Короткометражки</span>
        </label>
      </div>
    </div>
  );
}

export default FilterCheckbox;
