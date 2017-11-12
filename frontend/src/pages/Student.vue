<template>
  <div>
    <div class="container">
      <h1 class="title">{{ student.surname}} {{ student.first_name}}'s Information</h1>
      <h1></h1>
      <div class="columns has-text-justified">
        <div class="column"></div>
        <div class="column">
          <div class="box">
            <nav class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-5"><span class="tag is-success is-4">Class </span></p>
                  </div>
                </div>
                <div class="level-right">
                  <p class="level-item"><strong>{{ student.student_class}}</strong></p>
                </div>
              </nav>
              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-5"><span class="tag is-success is-4">Admission No</span></p>
                  </div>
                </div>
                <div class="level-right">
                  <p class="level-item"><strong>{{ student.admission_no}}</strong></p>
                </div>
              </nav>
              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-5"><span class="tag is-success is-4">Surname </span></p>
                  </div>
                </div>
                <div class="level-right">
                  <p class="level-item"><strong>{{ student.surname}}</strong></p>
                </div>
              </nav>
              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-5"><span class="tag is-success is-4">First Name </span></p>
                  </div>
                </div>
                <div class="level-right">
                  <p class="level-item"><strong>{{ student.first_name}}</strong></p>
                </div>
              </nav>
              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-5"><span class="tag is-success is-4">Middle Name </span></p>
                  </div>
                </div>
                <div class="level-right">
                  <p class="level-item"><strong>{{ student.middle_name}}</strong></p>
                </div>
              </nav>
              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-5"><span class="tag is-success is-4">Sex </span></p>
                  </div>
                </div>
                <div class="level-right">
                  <p class="level-item"><strong>{{ student.sex}}</strong></p>
                </div>
              </nav>
              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-5"><span class="tag is-success is-4">Age </span></p>
                  </div>
                </div>
                <div class="level-right">
                  <p class="level-item"><strong>{{ student.age}}</strong></p>
                </div>
              </nav>
          </div>
          <router-link :to="'/student/edit/' + id" class="button is-success">Edit</router-link>
          <button class="button is-danger" :class="{ 'is-loading': isLoading }" @click="onDelete">Delete</button>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  name: 'student',
  data () {
    return {
      student: [],
      isLoading: false
    }
  },
  created () {
    axios.get('http://localhost:5000/student/' + this.$route.params.id)
      .then(response => {
      // JSON responses are automatically parsed.
        this.student = response.data[0].data[0]
      })
  },
  methods: {
    onDelete () {
      this.isLoading = true
      axios.delete('http://localhost:5000/student/delete/' + this.$route.params.id, this.$data)
        .then((data) => {
          console.log(data); this.isLoading = false
          window.location.href = '/students'
          alert('The student has been deleted!')
        })
        .catch((errors) => { console.log(errors); this.isLoading = false })
    }

  }
}
</script>

