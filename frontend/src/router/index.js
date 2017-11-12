import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Students from '@/pages/Students'
import Student from '@/pages/Student'
import AddStudent from '@/pages/AddStudent'
import EditStudent from '@/pages/EditStudent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/students',
      name: 'Students',
      component: Students
    },
    {
      path: '/student/add',
      name: 'AddStudent',
      component: AddStudent
    },
    {
      path: '/student/edit/:id',
      name: 'EditStudent',
      component: EditStudent,
      props: true
    },
    {
      path: '/student/:id',
      name: 'Student',
      component: Student,
      props: true
    }

  ]
})
