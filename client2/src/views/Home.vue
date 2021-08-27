<template>
  <div class="container ">
      <h1 class="my-5 text-center">Home</h1>
      <div>
          <ContentCard/>
      </div>
  </div>
</template>

<script>
import ContentCard from '@/components/ContentCard'
export default {
    name:"Home",
    components:{
        ContentCard
    }
}
</script>

<style>

</style>