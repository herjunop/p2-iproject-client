<template>
  <div id="app">
    <div id="nav">
      <Navbar/>
    </div>
    <router-view/>
    <HFooter></HFooter>
  </div>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
<script>
import Navbar from '@/components/Navbar.vue'
import HFooter from 'vue-hacktiv8-footer'

export default {
    components: {
      Navbar,
      HFooter
    },
    created(){
        this.$store.commit('CHECK_ACCESS_TOKEN')
    }
}
</script>