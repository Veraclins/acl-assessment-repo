<template>
  <div>
    <div class="hero-head has-text-centered">
       <h1 class="title">Welcome to Andela Secondary School Information Portal</h1>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
          <h2 class="subtitle">
              <strong>Essential Links</strong>
          </h2>
          <p></p>
        <ul>
          <li><router-link to="/students">VIEW ALL STUDENTS</router-link></li>
          <li><router-link to="/student/add">REGISTER A NEW STUDENT</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
