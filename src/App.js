import logo from './logo.svg';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// MATERAIL UI (MUI.COM)
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// react
import { useEffect, useState } from 'react';

// EXTERNAL LIBRARIS 
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import moment from 'moment/moment';
import "moment/min/locales";

// REDUX IMPORT
import { useSelector, useDispatch } from 'react-redux';
import { changeResult } from './weatherApiSlice';
import { fetchWeather } from './weatherApiSlice';

moment.locale("ar")

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"]
  }
})

let cancelAxios = null

function App() {
  // REDUX CODE
  const dispatch = useDispatch()

  const isLoading = useSelector((state) => {
    return state.weather.isLoading
  })

  const temp = useSelector((state) => {
    return state.weather.weather
  })

  console.log("rendring the componenting (mounting)")
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("ar")
  const direction = language == "ar" ? "rtl" : "ltr"
  const [dateAndTime, setDateAndTime] = useState("")

  function handleLanguageClick(){
    if(language == "ar"){
      setLanguage("en")
      i18n.changeLanguage("en")
      moment.locale("en")
      console.log("lang", language)
    }else{
      setLanguage("ar")
      i18n.changeLanguage("ar")
      moment.locale("ar")
      console.log("lang", language)
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"))
  }

  useEffect(() => {
    // dispatch(changeResult())
    dispatch(fetchWeather())
    i18n.changeLanguage("ar")

    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"))
  }, [])


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            {/* CARD */}
            <div style={{ direction: direction, width: "100%", background: "rgb(28 52 91 / 36%)", color: "white", padding: "10px", borderRadius: "15px", boxShadow: "0px 11px 1px rgba(0,0,0,0.05)" }}>
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div style={{ display: "flex", alignItems: "end", justifyContent: "start", direction: direction }}>
                  <Typography variant="h3" style={{marginRight: "20px", fontWeight: "600"}}>
                    {t(temp.name)}
                  </Typography>
                  <Typography variant="h5" style={{marginRight: "20px"}}>
                    {dateAndTime}
                  </Typography>
                </div>
                {/* === CITY & TIME === */}
                <hr/>

                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div style={{display: "flex", justifyContent: "space-around"}}>
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      {isLoading? <CircularProgress style={{color: "white"}} />: ""}
                      
                      <Typography variant="h1" style={{textAlign: "right"}}>
                        {temp.number}
                      </Typography>
                      <img src={temp.icon} alt='img-icon'/>
                    </div>
                    {/* === TEMP === */}

                    <Typography variant="h6">
                      {t(temp. )}
                    </Typography>

                    {/* MIN & MAX DEGREE */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h5>{language == "ar" ? "الصغرى" : "Min"}: {temp.min}</h5>
                      <h5 style={{margin: "0px 10px"}}>|</h5>
                      <h5>{language == "ar" ? "الكبرى" : "Max"}:  {temp.max}</h5>
                    </div>
                    {/* === MIN & MAX DEGREE === */}

                  </div>
                  {/* === DEGREE & DESCRIPTION === */}

                  <CloudIcon style={{ fontSize: "200px", color: "white" }}/>
                </div>
                {/* === CONTAINER OF DEGREE + CLOUD ICON === */}

              </div>
              {/* === CONTENT === */}
            </div>
            {/* === CARD === */}

            {/* TRANSLAION CONTAINER */}

            <div style={{display: "flex", justifyContent: "start", width: "100%", marginTop: "20px"}}>
              <Button variant="text" style={{color: "white"}} onClick={handleLanguageClick}>{language == "ar" ? "English" : "عربي"}</Button>
            </div>

            {/* === TRANSLAION CONTAINER === */}

          </div>
          {/* === CONTENT CONTAINER === */}
          
        </Container>
      </ThemeProvider>  
    </div>
  );
}

export default App;