<template>
    <section class="columns">
        <div class="column is-3"></div>
        <div class="column">
            <form action="/register" @submit.prevent="onSubmit">
                <header class="title">
                    <p><strong>Edit {{surname}} {{first_name}}'s Information</strong></p>
                </header>
                <section>
                    <div class="field">
                        <label class="label">Admission Number</label>
                        <div class="control">
                            <input class="input"
                                type="number"
                                name="admission_no"
                                v-model="admission_no"
                                placeholder="e.g. 001"
                                required>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Surname</label>
                        <div class="control">
                            <input class="input"
                                type="text"
                                name="surname"
                                v-model="surname"
                                placeholder="Student Surname"
                                required>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">First Name</label>
                        <div class="control">
                            <input class="input"
                                type="text"
                                name="first_name"
                                v-model="first_name"
                                placeholder="Student First Name"
                                required>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Middle Name</label>
                        <div class="control">
                            <input class="input"
                                type="text"
                                name="middle_name"
                                v-model="middle_name"
                                placeholder="Student Middle Name"
                                >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Class</label>
                        <div class="control">
                            <input class="input"
                                type="text"
                                name="student_class"
                                v-model="student_class"
                                placeholder="Student Class"
                                required>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Sex</label>
                        <div class="select">
                            <select
                                v-model="sex"
                                required>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Age</label>
                        <div class="control">
                            <input class="input"
                                type="number"
                                v-model="age"
                                placeholder="Enter Student age"
                                required>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control is-expanded">
                            <button class="button is-primary"  :class="{ 'is-loading': isLoading }">Update</button>
                        </div>
                    </div>
                </section>
            </form>
            <br>
        </div>
        <div class="column is-3"></div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  data () {
    return {
      surname: '',
      first_name: '',
      middle_name: '',
      student_class: '',
      admission_no: '',
      sex: '',
      age: '',
      isLoading: false
    }
  },
  mounted () {
    axios.get('http://localhost:5000/student/edit/' + this.$route.params.id)
      .then(response => {
        // JSON responses are automatically parsed.
        this.surname = response.data[0].data[0].surname
        this.first_name = response.data[0].data[0].first_name
        this.middle_name = response.data[0].data[0].middle_name
        this.student_class = response.data[0].data[0].student_class
        this.admission_no = response.data[0].data[0].admission_no
        this.sex = response.data[0].data[0].sex
        this.age = response.data[0].data[0].age
      })
  },
  methods: {
    onSubmit () {
      this.isLoading = true
      axios.post('http://localhost:5000/student/update/' + this.$route.params.id, this.$data)
        .then((data) => {
          console.log(data); this.isLoading = false
          window.location.href = '/students'
          alert('The student\'s information was updated successfully')
        })
        .catch((errors) => { console.log(errors); this.isLoading = false })
    }

  }
}
</script>
