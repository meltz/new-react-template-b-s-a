// https://www.youtube.com/watch?v=nshyjApIovo

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const App = () => {
  const categoryRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [joke, setJoke] = useState('');

  useEffect(() => {
    jokeCategories();
    randomJoke();
  }, []);

  const jokeCategories = () => {
    const url = 'https://api.chucknorris.io/jokes/categories';

    axios.get(url).then((res) => setCategories([...categories, ...res.data]));
  };

  const randomJoke = (category = '') => {
    const url = 'https://api.chucknorris.io/jokes/random';
    const api = !!!category ? url : `${url}?category=${category}`;

    axios.get(api).then((res) => setJoke(res.data.value));
  };

  const generateJoke = (e) => {
    e.preventDefault();

    randomJoke(categoryRef.current.value);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='joke-section' align='center'>
            <form onSubmit={(e) => generateJoke(e)}>
              <h1>Chuck Noris Joke</h1>
              <h3>{joke}</h3>
              <br />
              <label htmlFor='category'>Joke Category:</label>
              {/* <input type='text' name='category' ref={categoryRef} /> */}

              <select name='category' id='category' ref={categoryRef}>
                <option value=''>ALL</option>
                {categories.map((cat, index) => (
                  <option value={cat} key={index}>
                    {cat}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <button>Generate New Joke</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
