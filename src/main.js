import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import './styles.css'

//Google Login
import vue3GoogleLogin from 'vue3-google-login'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faMeta, faWhatsapp, faInstagram, faFacebook, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faRobot, faUser, faUsers, faTrash, faPen, faCog, faImages, faTowerBroadcast, faChartSimple, faClipboardList, faExchangeAlt, faSignOutAlt, faBars, faTowerCell } from '@fortawesome/free-solid-svg-icons'

library.add(faMeta, faWhatsapp, faInstagram, faCheck, faRobot, faFacebook, faUser, faUsers, faTrash, faPen, faCog, faImages, faTelegram, faTowerBroadcast,faChartSimple,faClipboardList,faExchangeAlt,faSignOutAlt,faBars,faTowerCell)

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
})

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(MotionPlugin)

app.mount('#app')
