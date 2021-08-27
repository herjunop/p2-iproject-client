<template>
<div class="gap-3">
    <div v-for="place in searchList" :key="place.id" class="card my-1">
        <div class="card-body">
            <h5 class="card-title">{{ place.structured_formatting.main_text }}</h5>
            <p class="card-text">{{ place.structured_formatting.secondary_text }}</p>
            <a @click.prevent="addSportCentre(place.place_id)" href="" class="btn btn-primary">Add Place</a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'SearchContent',
    computed:{
        searchList(){
            return this.$store.state.searchList
        }
    },
    methods:{
        addSportCentre(place_id) {
            this.$store.dispatch('addSportCentre', {place_id})
        }
    }
}
</script>

<style>

</style>