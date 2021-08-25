<template>
<div class="container">
  <h1>Booking</h1>
  <div class="row gap-3">
    <BookContent/>

  </div>
</div>
</template>

<script>
import BookContent from '@/components/BookContent.vue'
export default {
    name:"Booking",
    components: {
      BookContent
    }
}
</script>

<style>

</style>