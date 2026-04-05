import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Token } from "../.env";
import axios from "axios";

export const fetchWeather = createAsyncThunk("weatherApi/fetchWeather", async () => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=24.470901&lon=39.612236&units=metric&appid=${Token}`,
        //   {
        //     cancelToken: new axios.CancelToken((c) => {
        //       cancelAxios = c
        //     })
        //   }
        )
          console.log(response)
          const responseTemp = Math.round(response.data.main.temp)  
          const responseMin = Math.round(response.data.main.temp_min)
          const responseMax = Math.round(response.data.main.temp_max)
          const responseDescription = response.data.weather[0].description
          const responseIcon = response.data.weather[0].icon
          const responseName = response.data.name
          console.log("name", responseName)

          return {number: responseTemp, min: responseMin, max: responseMax, description: responseDescription, icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`, name: responseName}
        //   setTemp({number: responseTemp, max: responseMax, min: responseMin, description: responseDescription, icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`, name: responseName})
        })

const weatherApiSlice = createSlice({
    name: "weatherApi",

    initialState: {
        result: "empty",
        weather: {},
        isLoading: false,
    },

    reducers: {
        changeResult: (state, action) => {
            state.result = "changed"
        }
    },

    extraReducers(builder) {
        builder.addCase(fetchWeather.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchWeather.fulfilled, (state, action) => {
            state.isLoading = false
            state.weather = action.payload
        })
        .addCase(fetchWeather.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

export const { changeResult } = weatherApiSlice.actions
export default weatherApiSlice.reducer
