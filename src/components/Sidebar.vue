<!-- src/components/Sidebar.vue -->
<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <h3>🤖 Panel IA</h3>
        </div>

        <ul class="menu">
            <li class="active">📊 Resumen</li>
            <li>💬 Mis Chatbots</li>
            <li>📦 Pedidos</li>
            <li>⚙️ Configuración</li>
        </ul>

        <div class="sidebar-footer">
            <button @click="Logout" class="btn-logout">Cerrar Sesión</button>
        </div>
    </aside>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const router = useRouter();

const Logout = () => {
    if (confirm('¿Seguro que deseas salir?')) {
        Cookies.remove('auth_token');
        localStorage.removeItem('user');
        router.push('/');
    }
}
</script>

<style scoped>
/* Aquí traemos SOLO los estilos que tienen que ver con la barra lateral */
.sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    display: flex;
    flex-direction: column;
    height: 100%;
    /* Importante para que ocupe el alto del padre */
}

.sidebar-header {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #34495e;
}

.sidebar-footer {
    padding: 20px;
    margin-top: auto;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 20px 0;
}

.menu li {
    padding: 15px 20px;
    cursor: pointer;
    transition: 0.3s;
}

.menu li:hover,
.menu li.active {
    background-color: #34495e;
    border-left: 4px solid #42b983;
}

.btn-logout {
    width: 100%;
    padding: 10px;
    background: #e74c3c;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
</style>