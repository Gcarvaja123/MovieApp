import React, { useEffect } from 'react'
import { GetMovies, SearchMovie } from '../services/ApiClient'
import { useQuery} from '@tanstack/react-query'
import { useRef, useState } from 'react'
import Header from '../components/Header'
import Carousela from '../components/Carousela'
import Popular from '../components/Popular'
import Toprated from '../components/Toprated'
import UpcomingMovies from '../components/UpcomingMovies'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import '../css/home.css'

const Home = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

    

  return (
    <>
        <Header/>
        <div className='content'>
          <Carousela/>
          <div className='tab-container'>
              <Box sx={{ width: '100%', fontFamily: 'sans-serif' }}>
                <TabContext value={value}>
                  <Box className="box-container">
                    <TabList className="table-container" onChange={handleChange} >
                      <Tab label="Popular" value="1" />
                      <Tab label="Top Rated" value="2" />
                      <Tab label="Upcoming" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <Popular/>
                  </TabPanel>
                  <TabPanel value="2">
                    <Toprated/>
                  </TabPanel>
                  <TabPanel value="3">
                    <UpcomingMovies/>
                  </TabPanel>
                </TabContext>
              </Box>
          </div>
        </div>      
    </>
  )
}

export default Home
