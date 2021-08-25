<template>
  <section class="" style="background-color: #508bfc;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;">
          <div class="card-body p-5 ">

            <h3 class="mb-5">Register</h3>
            <form action="#" @submit.prevent="registerSubmitHandler">
              <div class="form-outline mb-4">
                <label class="form-label" for="typeFullnameX">Full Name</label>
                <input v-model="registerFormData.fullname" type="text" id="typeFullnameX" class="form-control " required/>
              </div>
              
              <div class="form-outline mb-4">
                <label class="form-label" for="typeUsernameX">Username</label>
                <input v-model="registerFormData.username" type="text" id="typeUsernameX" class="form-control " required/>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="typeEmailX">Email</label>
                <input v-model="registerFormData.email" type="email" id="typeEmailX" class="form-control  " required/>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="typePasswordX">Password</label>
                <input v-model="registerFormData.password" type="password" id="typePasswordX" class="form-control " required/>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="typePhoneNumberX">Phone Number</label>
                <input v-model="registerFormData.phoneNumber" type="text" id="typePhoneNumberX" class="form-control " required/>
              </div>


              <button class="btn btn-primary btn-lg btn-block" type="submit">Sign Up</button>

            </form>
            <router-link class="nav-link" to="/customer/login">Back to Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
    name:"Register",
    data(){
      return{
        registerFormData : {}
      }
    },
    methods:{
      registerSubmitHandler() {
        this.$store.dispatch("register",this.registerFormData)
      }
    }
}
</script>

<style>

</style>