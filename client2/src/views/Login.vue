<template>
<section class="vh-100" style="background-color: #508bfc;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center ">

            <h3 class="mb-5">Sign in</h3>
            <form action="#" @submit.prevent="loginHandler">
            <div class="form-outline mb-4">
              <label class="form-label" for="typeUsernameX">Username</label>
              <input v-model="loginFormData.username" type="username" id="typeUsernameX" class="form-control form-control-lg" required/>
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="typePasswordX">Password</label>
              <input v-model="loginFormData.password" type="password" id="typePasswordX" class="form-control form-control-lg" required/>
            </div>

            <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>

            </form>

            <hr class="my-4">
            <div style="margin: auto;">
              <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
            </div>
            <!-- <button class="btn btn-lg btn-block btn-primary" style="background-color: #dd4b39;" type="submit"><i class="fab fa-google me-2"></i> Sign in with google</button> -->
            <router-link class="nav-link" to="/register">Not Registered? Sign Up Here!</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
    name:"Login",
    data(){
      return {
        loginFormData:{},

        // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
        params: {
            client_id: "1077225706696-jja1badlbppcdgrmhj38e80dhvl6jo28.apps.googleusercontent.com"
        },
        // only needed if you want to render the button with the google ui
        renderParams: {
            width: 428,
            height: 50,
            longtitle: true
        }
      }
    },
    methods:{
      loginHandler(){
        this.$store.dispatch("login",this.loginFormData)
      },

      onSuccess(googleUser) {
        this.$store.dispatch("googleLogin",googleUser)
      },

      onFailure(err){
        console.log(err);
      }
    },
    components:{
        GoogleLogin
    }
}
</script>

<style>

</style>