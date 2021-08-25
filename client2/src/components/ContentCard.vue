<template>
<div class="row  gap-3">
  <div v-for="place in placesList" :key="place.id" class="card mb-3 col-5 " >
    <div class="row g-0">
      <div class="col-md-4 ">
        <img 
        src="" 
        class="img-fluid mx-auto" alt="">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ place.name }}</h5>
          <p class="">Location: {{ place.location }}</p>
          <p class="card-text">Phone Number: {{ place.phoneNumber }}</p>
          <div class="d-flex justify-content-center gap-3">
            <button type="button" class="btn btn-outline-info"><a :href="place.url">Info</a></button>
            <button type="button" class="btn btn-outline-warning"><router-link :to="{name:'BookPage',params:{id:place.id}}">Book</router-link></button>
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
    created(){
        this.$store.dispatch('fetchPlaces')
    },
    computed:{
        placesList(){
            return this.$store.state.placesList
        }
    }
}
</script>

<style>

</style>