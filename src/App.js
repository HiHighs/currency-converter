import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [text, setText] = useState('');
  const [value, setValue] = useState(0);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('USD');

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `https://api.frankfurter.app/latest?amount=${value}&from=${from}&to=${to}`
      );

      const data = await request.json();

      let convertedValue;

      if (data.rates) {
        if (data.rates[to]) {
          convertedValue = data.rates[to];
        } else {
          console.log(`Rate for currency ${to} not found in response data`);
          convertedValue = 'N/A';
        }
      } else {
        console.log('Rates data not found in response');
        convertedValue = 'N/A';
      }

      setText(`${convertedValue} ${to}`);
    }

    if (from === to) setText(`${value} ${to}`);
    else fetchData();
  }, [value, from, to]);

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  return (
    <div className='App'>
      <input type='text' onChange={handleValueChange} />
      <select value={from} onChange={handleFromChange}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select value={to} onChange={handleToChange}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>OUTPUT: {text}</p>
    </div>
  );
}
