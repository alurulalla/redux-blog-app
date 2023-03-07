import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
  reset,
} from './counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [amountValue, setAmountValue] = useState(0);

  const updateAmountValue = (e) => {
    setAmountValue(+e.target.value);
  };

  return (
    <section>
      <p>{count}</p>
      <div>
        <p>Enter amount to increment or decrement</p>
        <input type='number' onChange={updateAmountValue} />
      </div>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementByAmount(amountValue))}>
          {amountValue}+
        </button>
        <button onClick={() => dispatch(decrementByAmount(amountValue))}>
          {amountValue}-
        </button>
      </div>
      <div>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </section>
  );
};

export default Counter;
