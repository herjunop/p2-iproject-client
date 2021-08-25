<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Active8</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li v-if="!access_token" class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/login">Login</router-link>
        </li>
        <li v-if="access_token" class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
        </li>
        <li v-if="access_token" class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/booking">Booking List</router-link>
        </li>
        <li v-if="access_token" class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/addSportCentre">Add Sport Centre</router-link>
        </li>
        <li v-if="access_token"  class="nav-item">
          <a @click.prevent="logout" class="nav-link" href=""><GoogleLogin
                        style="width:100%; text-align: left; background-color: grey;"
                        :params="params" 
                        :logoutButton=true
                        >Logout</GoogleLogin></a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li> -->
      </ul>
      <!-- <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> -->
    </div>
  </div>
</nav>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
    name: 'Navbar',
    methods:{
        logout(){
            this.$store.commit('CLEAR_ACCESS_TOKEN')
        }
    },
    computed:{
        access_token(){
            return this.$store.state.access_token
        }
    },
    components:{
        GoogleLogin
    },
    data: function () {
        return {
            params: {
                client_id: "1077225706696-jja1badlbppcdgrmhj38e80dhvl6jo28.apps.googleusercontent.com"
            }
        }
    }
}
</script>

<style>

</style>