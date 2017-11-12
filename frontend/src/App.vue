<template>
  <div id="app">
      <div class="hero">
        <div class="container">
          <div class="hero-head">
            <header class="navbar">
              <div class="navbar-brand">
                <router-link to="/" exact class="navbar-item">
                    <img src="./assets/logo.png" alt="Andela">
                </router-link>
              </div>

              <div class="navbar-menu">
                <div class="navbar-start">
                  <div class="navbar-item">
                    <router-link to="/" exact class="button is-outlined is-info">
                    Home
                  </router-link>
                  </div>
                </div>
                <div class="navbar-end">
                  <div class="navbar-item">
                    <router-link to="/students" exact class="button is-outlined is-info">
                      View all Students
                    </router-link>
                  </div>
                  <div class="navbar-item">
                    <router-link to="/student/add" exact class="button is-outlined is-info">
                      Add New Student
                    </router-link>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>
      <main>
        <div class="container">
            <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="css">
/* unvisited link */
a:link {
    color: #00FF00;
}

/* visited link */
a:visited {
    color: #00FF00;
}

/* mouse over link */
a:hover {
    color: #FF00FF;
}

/* selected link */
a:active {
    color: #0000FF;
}
@import "~bulma/css/bulma.css";
</style>
