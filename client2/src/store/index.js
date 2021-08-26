import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../apis/server'
import router from '../router'
import weather from '../../apis/openweatherAPI'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token:'',
    placesList:[],
    searchList:[],
    placeData:{},
    weatherData:[],
    bookingList:[]
  },
  mutations: {
    CHECK_ACCESS_TOKEN(state){
      state.access_token = localStorage.getItem('access_token')
    },
    COMMIT_ACCESS_TOKEN(state, payload) {
      state.access_token = payload
      localStorage.setItem('access_token', payload);
    },
    COMMIT_PLACES_LIST(state, payload) {
      state.placesList = payload.placesList
    },
    COMMIT_PLACE_DATA(state, payload) {
      state.placeData = payload.data
    },
    CLEAR_ACCESS_TOKEN(state){
      state.access_token = ''
      localStorage.removeItem('access_token');
      Vue.swal({
        position: 'center',
        icon: 'success',
        title: 'Logged Out ',
        showConfirmButton: false,
        timer: 1500
      })
      router.push('/login')
    },
    COMMIT_SEARCH_LIST(state, payload) {
      state.searchList = payload.searchList
    },
    COMMIT_BOOKING_LIST(state, payload) {
      state.bookingList = payload.bookingList
    },
    CLEAR_SEARCH_LIST(state) {
      state.searchList = []
    },
    COMMIT_WEATHER_DATA(state, payload) {
      console.log(payload);
      state.weatherData = payload.daily
    }
  },
  actions: {
    async login(context,payload){
      try {
        const result = await axios.post("/login", {
          username: payload.username, 
          password: payload.password
        })
        context.commit("COMMIT_ACCESS_TOKEN",result.data.access_token)
        Vue.swal({
            position: 'center',
            icon: 'success',
            title: 'Login Success! ',
            showConfirmButton: false,
            timer: 1500
        })
        router.push('/')
      } catch (error) {
          if (error.response) {
              // Request made and server responded
              Vue.swal({
                  position: 'center',
                  icon: 'error',
                  title: `${error.response.status}`,
                  text: `${error.response.data.message}`,
                  showConfirmButton: false,
                  timer: 2000
              })
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
          }   
      }
    },

    async register(context,payload){
      try {
        await axios.post("/register", payload)
        router.push({name:'Login'})
        Vue.swal({
          position: 'center',
          icon: 'success',
          title: 'Signup Success! ',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        if (error.response) {
            // Request made and server responded
            Vue.swal({
                position: 'center',
                icon: 'error',
                title: `${error.response.status}`,
                text: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 2000
            })
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }   
      }
    },

    async googleLogin(context, googleUser){
      var id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token);

      axios.post('/auth/google',{
        idToken: id_token
      })
      .then(response => {
          context.commit("COMMIT_ACCESS_TOKEN",response.data.access_token)
          localStorage.setItem('access_token', response.data.access_token);
          Vue.swal({
              position: 'center',
              icon: 'success',
              title: 'Login Success! ',
              showConfirmButton: false,
              timer: 1500
          })
          router.push('/')
      })
      .catch(error => {
        if (error.response) {
            // Request made and server responded
            Vue.swal({
                position: 'center',
                icon: 'error',
                title: `${error.response.status}`,
                text: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 2000
            })
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("No response",error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
      })

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },

    async fetchPlaces(context) {
      try {
        const result = await axios.get('/',{
          headers: {
            access_token: context.state.access_token
          }
        })
        context.commit('COMMIT_PLACES_LIST', {placesList:result.data})
      } catch (error) {
        if (error.response) {
            // Request made and server responded
            Vue.swal({
                position: 'center',
                icon: 'error',
                title: `${error.response.status}`,
                text: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 2000
            })
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("No response",error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
      }
    },

    async searchPlaceGoogle(context, payload){
      try {
        console.log(payload, context.state.access_token);
        const result = await axios.post('/google/place',{
          payload
        },{
          headers:{
            access_token:context.state.access_token
          }
        })
        context.commit('COMMIT_SEARCH_LIST',{searchList: result.data})
      } catch (error) {
        if (error.response) {
            // Request made and server responded
            Vue.swal({
                position: 'center',
                icon: 'error',
                title: `${error.response.status}`,
                text: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 2000
            })
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("No response",error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
      }
    },

    async addSportCentre(context, payload) {
      try {
        await axios.post('/',{
          place_id: payload.place_id
        },{
          headers:{
            access_token:context.state.access_token
          }
        })
        Vue.swal({
          position: 'center',
          icon: 'success',
          title: 'Sport Centre Added! ',
          showConfirmButton: false,
          timer: 1500
         })
        context.commit('CLEAR_SEARCH_LIST')
        router.push('/')
      } catch (error) {
        if (error.response) {
            // Request made and server responded
            Vue.swal({
                position: 'center',
                icon: 'error',
                title: `${error.response.status}`,
                text: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 2000
            })
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("No response",error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        
      }
    },

    async fetchById(context, payload) {
      try {
        const result = await axios.get(`/${payload.id}`, {
          headers:{
            access_token:context.state.access_token
          }
        })
        context.commit('COMMIT_PLACE_DATA', {data:result.data})
        context.dispatch('weatherForecast')
      } catch (error) {
          if (error.response) {
              // Request made and server responded
              Vue.swal({
                  position: 'center',
                  icon: 'error',
                  title: `${error.response.status}`,
                  text: `${error.response.data.message}`,
                  showConfirmButton: false,
                  timer: 2000
              })
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              console.log("No response",error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
          }
      }
    },

    async addBooking(context, payload) {
      try {
        const { reservationTime, PlaceId } = payload
        await axios.post('/bookings',{
          reservationTime, PlaceId
        },{
          headers: {access_token:context.state.access_token}
        })
        Vue.swal({
            position: 'center',
            icon: 'success',
            title: 'Booking Success! ',
            showConfirmButton: false,
            timer: 1500
        })
        router.push('booking')
      } catch (error) {
          if (error.response) {
              // Request made and server responded
              Vue.swal({
                  position: 'center',
                  icon: 'error',
                  title: `${error.response.status}`,
                  text: `${error.response.data.message}`,
                  showConfirmButton: false,
                  timer: 2000
              })
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              console.log("No response",error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.name);
          }
      }
    },

    async weatherForecast(context) {
      try {
        const result = await weather.get('',{
          params:{
            lat: context.state.placeData.lat,
            lon: context.state.placeData.lon,
            exclude:'hourly,current,minutely,alerts',
            appid: "b2d245bced4267713a0ef66934fdc40a",
            units: 'metric'
          }
        })
        context.commit('COMMIT_WEATHER_DATA', result.data)

      } catch (error) {
          if (error.response) {
              // Request made and server responded
              Vue.swal({
                  position: 'center',
                  icon: 'error',
                  title: `${error.response.status}`,
                  text: `${error.response.data.message}`,
                  showConfirmButton: false,
                  timer: 2000
              })
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
          }  
      }
    },
    
    async fetchBookings(context) {
      try {
        const result = await axios.get('/bookings',{
          headers:{
            access_token:context.state.access_token
          }
        })
        context.commit('COMMIT_BOOKING_LIST',{bookingList:result.data})
      } catch (error) {
        if (error.response) {
            // Request made and server responded
            Vue.swal({
                position: 'center',
                icon: 'error',
                title: `${error.response.status}`,
                text: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 2000
            })
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        } 
      }
    }
  },
  modules: {
  }
})
