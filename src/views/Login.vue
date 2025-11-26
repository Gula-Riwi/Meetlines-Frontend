<template>
    <div><router-link to="/">Volver</router-link></div>
    <div class="auth-container">
        <div class="auth-card">
            <h2>Iniciar Sesión</h2>
            <p class="subtitle">Bienvenido de nuevo al panel de control</p>

            <!-- @submit.prevent evita que la página se recargue al enviar el form -->
            <form @submit.prevent="Login">

                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <!-- v-model conecta el input con la variable 'email' -->
                    <input type="email" id="email" v-model="email" placeholder="ejemplo@empresa.com" required />
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" v-model="password" placeholder="********" required />
                </div>

                <button type="submit" class="btn-submit">Entrar</button>
            </form>

            <div class="auth-footer">
                <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 1. Instanciamos el router para poder redirigir al usuario
const router = useRouter();

// 2. Definimos las variables reactivas
const email = ref('');
const password = ref('');

// 3. Función que se ejecuta al enviar el formulario
const Login = () => {
    // Aquí iría la llamada a tu API (Backend)
    console.log("Logueando con:", email.value, password.value);

    // Simulamos una validación simple
    if (password.value.length < 6) {
        alert("La contraseña es muy corta");
        return;
    }

    localStorage.setItem('isLoggedIn', 'true');

    // Simulamos éxito y redirigimos al Dashboard
    alert("¡Login exitoso! Redirigiendo...");
    router.push('/dashboard');
};
</script>

<style scoped>
/* Estilos compartidos para formularios */
.auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
}

.auth-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
}

.form-group {
    margin-bottom: 1rem;
    text-align: left;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #333;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    /* Importante para que el padding no rompa el ancho */
}

.btn-submit {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
}

.btn-submit:hover {
    background-color: #45a049;
}

.auth-footer {
    margin-top: 1.5rem;
    font-size: 0.9rem;
}
</style>