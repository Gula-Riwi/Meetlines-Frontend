import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import './styles.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faMeta, faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faRobot } from '@fortawesome/free-solid-svg-icons'

library.add(faMeta, faWhatsapp, faInstagram, faCheck, faRobot, faFacebook)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(MotionPlugin)

app.mount('#app')
