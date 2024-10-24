import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { GetMovieDetail } from '../services/ApiClient'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import '../css/moviedetails.css'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
};

const stylereview ={
  position: 'absolute',
  top: '50%',
  left: '50%',
  height :'500px',
  transform: 'translate(-50%, -50%)',
  backgroundColor : 'white',
  overflowY :'scroll',
  padding : '10px 20px'
  
}



const Moviedetail = () => {


    const {movieid} = useParams();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [opencomments, setOpenComments] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenComments = () =>setOpenComments(true);
    const handleCloseComments = () => setOpenComments(false)

    const {data, error, isLoading} = useQuery({
        queryKey : ['detail', movieid],
        queryFn : () => GetMovieDetail(movieid)
    }) 

    const backtomovies = () =>{
      navigate("/movies")
    }

    console.log(data)
    
  return (
    <div>
      <Header/>
      
      {data ? 
      
        <div className='movie-details-container' 
          style={{
            '--bg-image': `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`
          }}
        >
          <button className='backButton' onClick={backtomovies}> Back </button>
          <div className='movie-details-content' >
            <div className='image-movie-container'>
              <img src={"https://image.tmdb.org/t/p/w500"+data.poster_path}/>
              
            </div>
            <div className='movie-information-container'>
              <div className='movie-title'>
                {data.title}
              </div>
              <hr/>
              <div className='movie-valoration'>
                <Rating name="read-only" value={data.vote_average} precision={0.1} max={10} readOnly />
                <p>Rating : {data.vote_average} from {data.vote_count} users</p>
                <p>Duration : {data.runtime} min.</p>
                <p>Genres : {data.genres.map(genre => genre.name).join(', ')}</p>
                <p>{data.overview}</p>
                {data.trailer ? 
                <div>
                  <button onClick={handleOpen}>Trailer</button>
                  <button onClick={handleOpenComments}> Comments </button> 
                </div>
                
                
                :<></> }
                
              </div>
            </div>
            
          </div>
            <Modal
              keepMounted
              open={open}
              onClose={handleClose}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <Box sx={style}>
              <div className='trailer'>
                    <iframe 
                      width="560" 
                      height="315" 
                      src={data.trailer ? `https://www.youtube.com/embed/${data.trailer.key}` :""} 
                      title="YouTube video player" 
                      allowFullScreen>
                    </iframe>

                  </div>
              </Box>
            </Modal>
            <Modal
              keepMounted
              open={opencomments}
              onClose={handleCloseComments}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <Box sx={stylereview}>
                  <div className='reviews-container'>
                    {data.reviews.results.map( e => (
                      <div className='review'>
                        <h2> {e.author} </h2>
                        <p> {e.content}</p>
                        <hr/>
                      </div>

                    ))}
                  </div>
              </Box>
            </Modal>
        </div> 
        :
        <></>
      }
       
    </div>
  )
}

export default Moviedetail
