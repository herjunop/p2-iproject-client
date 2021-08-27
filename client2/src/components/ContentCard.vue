<template>
<div class="row justify-content-center gap-3">
  <div v-for="place in placesList" :key="place.id" class="card mb-3 col-5 " >
    <div class="row d-flex flex-wrap align-items-center g-0">
      <div class="col-md-4">
        <img 
        width="500" height="600"
        :src="`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${place.photo_reference}&maxheight=400&key=AIzaSyC9sKbiKwVsFSayazCc3ULK0JioZT1P9dE`" 
        class="img-fluid mx-auto text-center" alt="">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ place.name }}</h5>
          <p class="">Location: {{ place.location }}</p>
          <p class="card-text">Phone Number: {{ place.phoneNumber }}</p>
          <div class="d-flex justify-content-center gap-3">
            <button @click="getPlace_id(place.place_id)" type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                See Location
            </button>
            
            <!-- Vertically centered scrollable modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Location</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div >
                    <iframe
                      height="600"
                      style="border:0"
                      loading="lazy"
                      allowfullscreen
                      :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyC9sKbiKwVsFSayazCc3ULK0JioZT1P9dE&q=place_id:${place_id}`">
                  </iframe>
                    </div>
                </div>
            </div>
            <router-link class="btn btn-outline-warning" :to="{name:'BookPage',params:{id:place.id}}">Book</router-link>
            <a @click.prevent="destroy(place.id)" href="" class="btn btn-outline-danger">Delete</a>
          </div>
          <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "ContentCard",
    data(){
      return {
        place_id:''
      }
    },
    created(){
        this.$store.dispatch('fetchPlaces')
    },
    computed:{
        placesList(){
            return this.$store.state.placesList
        }
    },
    methods: {
      destroy(id) {
        this.$store.dispatch('destroyPlace', id)
      },
      getPlace_id(place_id) {
        this.place_id = place_id
      }
    }
}
</script>

<style>

</style>