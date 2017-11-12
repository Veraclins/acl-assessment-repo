<template>
  <div>
    <div class="container has-text-centered">
      <h1 class="title">All the Students in the school</h1>
      <h1></h1>
      <div class="card" v-if="classes != ''">
        <header class="card-header">
          <p class="card-footer-item"><strong>Admission Number</strong></p>
          <p class="card-footer-item"><strong>Full Name <small>(Click on the name to view their details)</small></strong></p>
        </header>
        <div class="card-footer" v-for="unit in classes">
          <p class="card-footer-item">{{ unit.admission_no}}</p>
          <router-link :to="'/student/'+ unit.id" class="card-footer-item">{{ unit.surname}} {{ unit.first_name}} {{ unit.middle_name}}</router-link>
        </div>
      </div>
      <div class="button is-danger" v-else>No student in the database! Please register some students!</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  name: 'students',
  data () {
    return {
      classes: []
    }
  },
  created () {
    axios.get('http://localhost:5000/students')
      .then(response => {
      // JSON responses are automatically parsed.
        this.classes = response.data[0].data
      })

      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

