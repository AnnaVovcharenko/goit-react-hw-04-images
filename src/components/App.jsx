import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import * as API from '../api/Api';

import {useState , useEffect } from 'react';
import {Loader} from './Loader/Loader';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () =>  {

const [query, setQuery] = useState('');
const [images, setImages] = useState([]);
// const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [totalImges, setTotalImges] = useState(0);

useEffect(() => {
  if (query === '') {
    return;
  }
  async function addImg () {
    try{ 
      setLoading(true);
    const data = await API.fetchImg(query, page);

    if (data.hits.length === 0) {
      
      return toast.info('Sorry image not found...', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } 
    const normalizedImg = API.normalizedImg(data.hits);

    setImages(prevImages => [...prevImages, ...normalizedImg], // Додаємо нові зображення до існуючих
    setLoading(false), // Прибираємо індикатор завантаження зображень
    // setError(''), // Очищаємо повідомлення про помилку
    setTotalImges(Math.ceil(data.totalHits / 12)), //Вираховуємо  загальну кількість сторінок
    );
  } catch (error) {
    toast.error('Something went wrong!'); // якщо виникла помилка
  } finally {
    setLoading(false); //Прибираємо індикатор завантаження зображень в будь-якому випадку
  }
}
addImg ();
}, [query, page]);
  
  
  
  //Оброблення та відправлення форми
  const handledSubmit = value => {
    
    setQuery(value); //Встановлюємо введений запит до стану
    setImages([]); //Очищаємо масив із зображеннями
    setPage(1); //Скидаємо номер поточної сторінки на першу
    
  };
  //Завантаження додаткових зображень шляхом збільшення номера поточної сторінки
 const  nextPortionImg = () => {
    
      setPage( prevPage => prevPage + 1,)
    
  };

  
    return (
      <div>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={handledSubmit} />
        <ImageGallery 
        images={images} />

        {loading && <Loader />}
        {totalImges > 1 && page < totalImges && (
          <Button onClick={nextPortionImg} /> // Кнопка для завантаження додаткових зображень
        )}
               
       
      </div>
    );
  
}
