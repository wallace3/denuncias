import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/expedientes',
			component: () => import('../views/About.vue')
		},
		{
			path: '/users',
			component: () => import('../views/Users.vue')
		}
	],
})

export default router