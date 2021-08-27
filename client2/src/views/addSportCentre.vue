<template>
  <div class="container">
    <h1 class="my-5 text-center">Add New Sport Centre</h1>
    <form @keyup="searchPlace" >
      <div class=" form-floating">
            <input v-model="search.input" id="floatingInput" type="search" class="form-control rounded" placeholder="Search New Sport Centre Here" aria-label="Search"
            aria-describedby="search-addon" />
            <label for="floatingInput">Search Place</label>
        </div>
    </form>
    <hr>
    <SearchContent/>
  </div>
</template>

<script>
import SearchContent from '@/components/SearchContent'
export default {
    name:"addSportCentre",
    data(){
        return {
            search:{}
        }
    },
    methods:{
        searchPlace(){
            this.$store.dispatch('searchPlaceGoogle', this.search)
        }
    },
    components:{
        SearchContent
    }
}
</script>

<style>

</style>