
import { useState } from 'react';
const FormRange = ({ label, name, size, price }) => {
  const step = 0.2;
  const maxPrice = 40;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <div className='form-control'>
      <label htmlFor={name} className='label cursor-pointer'>
        <span className='label-text capitalize'>{label}</span>
        <span>{selectedPrice} €</span>
      </label>
      <input
        type='range'
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`w-full h-2 bg-red-400 rounded-lg appearance-none cursor-pointer`}
        step={step}
      />
      <div className='w-full flex justify-between text-xs px-2 mt-2'>
        <span className='font-bold text-md'>0 €</span>
        <span className='font-bold text-md'>Max : {maxPrice} €</span>
      </div>
    </div>
  );
};
export default FormRange;
