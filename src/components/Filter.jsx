import React from 'react'
import '../css/filter.css'
import { useQuery } from '@tanstack/react-query'
import { GetMovieGenres } from '../services/ApiClient'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { useFilter } from '../states/filterstate';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { emphasize } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español para formatear
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs.locale('es');


const theme = createTheme({
    components: {
        MuiSvgIcon: {
            styleOverrides: {
              root: {
                color: 'white', // Cambia el color del icono aquí
              },
            },
          },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': {
              color: 'white', // Cambia el color del texto aquí
            },
            '& .MuiInputLabel-root': { // Cambia el color del placeholder aquí
                color: 'white', // Cambia el color del placeholder aquí
            },
            '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2 !important',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2 !important',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2 !important',
            },
          },
        },
      },
    },
})  

const Filter = () => {

    const {data, error, isLoading } = useQuery({
        queryKey :["genres"],
        queryFn : GetMovieGenres
    }) 

    const {genres, addGenre, removeGenre, changePopularity, addFilters} = useFilter();

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [popularityvalue, setPopularityvalue] = useState('desc')
    const [slidervalue, setSliderValue] = useState([1,10])
    const [date1, setDate1] = useState(dayjs().format('YY-MM-DD'))
    const [date2, setDate2] = useState(dayjs().format('YY-MM-DD'))

    const handleGenreClick = (genreId) => {
        //genres.includes(genreId) ? removeGenre(genreId) : addGenre(genreId)
        selectedGenres.includes(genreId) ? setSelectedGenres(e => e.filter(f => f!==genreId)) : setSelectedGenres(e => [...e, genreId])
    }

    const handlePopularityClick = () =>{
        setPopularityvalue(popularityvalue =='desc' ? "asc" : 'desc')
    }
    
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        //console.log(newValue) 
      };

    const setFilters = () =>{
        addFilters(popularityvalue, selectedGenres, slidervalue, date1, date2)
    }

    const handleDateChange1 = (newDate) => {
        setDate1(newDate.format('YY-MM-DD'));
        //console.log(newDate.format('DD/MM/YY')); 
    };
    const handleDateChange2 = (newDate) => {
        setDate2(newDate.format('YY-MM-DD'));
        //console.log(newDate.format('DD/MM/YY')); 
    };
    
  return (
    <>  
        <div className='filters'>
            <div className='popularity'>
                <p className='popularity-tittle'> Popularity </p>
                <div className='popularity-boxes'>
                    <div className={`popularity-box ${popularityvalue=="desc" ? 'selected' : ''}`} onClick={ () =>handlePopularityClick()}>Descendant</div>
                    <div className={`popularity-box ${popularityvalue=="asc" ? 'selected' : ''}`} onClick={() => handlePopularityClick()}>Ascendent</div>
                </div>
            </div>
            <hr/>
            <div className='genres-container'>
                <p className='genres-tittle'> Genres </p>
                <div className='genres'>
                    {data ? 
                        (data.map((genre) => (
                        <div
                        key={genre.id}
                        className={`genre-box ${selectedGenres.includes(genre.id) ? 'selected' : ''}`} // Clase condicional
                        onClick={() => handleGenreClick(genre.id)}
                        >
                        {genre.name}
                        </div>
                    )))
                    : <></>
                    }
                </div>
            </div>
            <hr/>
            <div className='valoration-container'>
                <p className='valoration-tittle'> Valoration </p>
                <Slider
                    value={slidervalue}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10}
                />
            </div>
            <hr/>
            <div className='Bydate'>
                <p className='calendar-tittle'> Dates </p>
                <div className='calendar-container'>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} className="first-calendar">
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Initial date"
                                            format="DD/MM/YY"
                                            onChange={handleDateChange1} 
                                            />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs} className="second-calendar">
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Final date" 
                                            defaultValue={dayjs()}
                                            format="DD/MM/YY"
                                            onChange={handleDateChange2}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>
            </div>
            <hr/>
            <div className='button-container'>
                <button className='confirm' onClick={ () => setFilters()}>Search</button>
            </div>
        </div>
        
    </>)
  
}

export default Filter
