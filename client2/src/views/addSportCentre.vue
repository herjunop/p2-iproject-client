<template>
  <div class="container">
    <form @submit.prevent="searchPlace">
      <div class="my-5 input-group">
            <input v-model="search.input" type="search" class="form-control rounded" placeholder="Search New Sport Centre Here" aria-label="Search"
            aria-describedby="search-addon" />
        <button type="submit" class="btn btn-outline-primary">search</button>
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