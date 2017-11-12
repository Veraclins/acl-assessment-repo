<template>
    <section class="columns">
        <div class="column is-3"></div>
        <div class="column">
            <form @submit.prevent="onSubmit">
                <header class="title">
                    <p><strong>Add a New Student to the Portal</strong></p>
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
                                >
                        </div>
                    </div>
                    <div class="field">
                        <div class="control is-expanded">
                            <button class="button is-primary"  :class="{ 'is-loading': isLoading }">Add Student</button>
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
  methods: {
    onSubmit () {
      this.isLoading = true
      axios.post('http://localhost:5000/student/add', this.$data)
        .then((data) => {
          console.log(data); this.isLoading = false
          window.location.href = '/students'
          alert('New student added successfully')
        })
        .catch((errors) => {
          console.log(errors); this.isLoading = false
          alert('There was a problem with the data you provided. Please try again')
        })
    }

  }
}
</script>
