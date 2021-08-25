<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-9 mt-5 ">
            <div class="card">
            <img
                class="card-img-top"
            />
            <div class="card-body">
                <h5 class="card-title">{{ placeData.name }}</h5>
                <p class="card-text">Location: {{ placeData.location }}</p>
                <p class="card-text">
                Phone Number: {{ placeData.phoneNumber }}
                </p>
                <form @submit.prevent="addBooking">

                <label for="meeting-time">Choose a time for your reservation:</label>

                <input type="datetime-local" id="meeting-time"
                    name="meeting-time" v-model="reservation"
                    :min="today">
                <button class="btn btn-outline-warning mx-2" type="submit">Book</button><br>
                </form>
                <button type="button" class="btn btn-outline-primary my-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Check weather forecast for the next 7 days
                </button>
                <!-- Vertically centered scrollable modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered ">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Weather Forecast</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div v-for="weather in weatherData" :key="weather.dt" class="modal-body">
                            {{ toString(weather.dt) }} : {{ weather.weather[0].description }}
                            <hr>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
export default {
    name:"BookPage",
    data(){
        return {
            reservation:''
        }
    },
    computed:{
        placeData() {
          return this.$store.state.placeData
        },
        today() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
            var yyyy = today.getFullYear();
            if(dd<10){
            dd='0'+dd
            } 
            if(mm<10){
            mm='0'+mm
            } 

            today = yyyy+'-'+mm+'-'+dd+'T00:00';
            return today
        },
        weatherData() {
            return this.$store.state.weatherData
        }
    },
    methods:{
        addBooking() {
            this.$store.dispatch('addBooking', {
                reservationTime: this.reservation,
                PlaceId: this.$route.params.id
            })
        },
        toString(unix) {
            const milliseconds = unix * 1000
            const dateObject = new Date(milliseconds)
            return dateObject.toLocaleString()
        },
    },
    created(){
        this.$store.dispatch('fetchById', {id:this.$route.params.id})
    }
}
</script>

<style scoped>
    label {
        display: block;
        font: 1rem 'Fira Sans', sans-serif;
    }

    input,
    label {
        margin: .4rem 0;
    }
</style>