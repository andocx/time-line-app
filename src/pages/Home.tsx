import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import { useNavigate } from "react-router";
import IconButton from '@mui/material/IconButton';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '80%', // Adjust the width to narrow the item
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Home = () => {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(50);

  const startReveal = () => {
    navigate("/card/0");
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSliderValue(newValue);
    }
  };

  return (
    <>
      <div className="grid grid-flow-col grid-rows-3 min-h-screen">
        {/*IMAGEN*/}
        <div className='col-span-2 row-span-2 flex items-center justify-center'>
            <img src="/img/camara.svg" alt="Descripción de la imagen" width="30%" height="30%" />    
        </div>
        {/*INSTRUCCIONES*/}
        <div className='col-span-2 row-span-1'>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Divider sx={{ width: '90%', display: 'flex', justifyContent: 'center' }}>
            <Item elevation={0} sx={{ display: 'flex', justifyContent: 'center' }}>
              <span className='text-xl'>Instrucciones</span>
            </Item>
          </Divider>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Stack 
            direction="row" 
            divider={<Divider orientation="vertical" flexItem />} 
            spacing={1} 
            sx={{ justifyContent: "space-evenly", alignItems: "center", }}
            className='mt-6'
          >
            <Item>
              <p>Calcula la luz hasta que diga YES</p>
              <Slider
                size="medium"
                defaultValue={50}
                aria-label="slider"
                valueLabelDisplay="auto"
                onChange={handleSliderChange}
              />
              <p>{sliderValue >= 70 && sliderValue <= 79 ? 'YES' : 'NO'}</p>
            </Item>

            <Item>
              <p>Presiona el botón</p>
              <IconButton disabled={sliderValue < 70 || sliderValue > 79}>
                <CircleRoundedIcon 
                  color="action"
                  fontSize="large"
                  onClick={startReveal}
                />
              </IconButton>
            </Item>

            <Item>
              <p>Espera unos segundos a que se revele</p>
              <Divider sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Item elevation={0} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <span>y</span>
                </Item>   
            </Divider>
            <p>Da scroll</p>
            </Item>
          </Stack>   
        </Box>

        </div>
      </div>
    </>
  );
};

export default Home;