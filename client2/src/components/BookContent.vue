<template>
<div class="row justify-content-center gap-3">
 <div v-for="place in bookingList" :key="place.id" class="card mb-3 col-5" >
    <div class="row d-flex flex-wrap align-items-center g-0">
      <div class="col-md-4">
        <img src="" class="img-fluid rounded-start" alt=""><img 
        width="500" height="600"
        :src="`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${place.photo_reference}&maxheight=400&key=AIzaSyC9sKbiKwVsFSayazCc3ULK0JioZT1P9dE`" 
        class="img-fluid mx-auto text-center" alt="">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ place.name }}</h5>
          <p class="card-text">Reservation at: {{ toString(place.Booking.reservationTime) }}</p>
          <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name:'BookContent',
    created(){
        this.$store.dispatch('fetchBookings')
    },
    computed:{
        bookingList() {
            return this.$store.state.bookingList
        },
        weatherData() {
            return this.$store.state.weatherData
        }
    },
    methods:{
        toString(ISOString) {
            var d = new Date(ISOString);
            return d.toLocaleDateString() + ' ' + d.toTimeString().substring(0, d.toTimeString().indexOf("GMT")); 
        }
    }
}
</script>

<style>

</style>