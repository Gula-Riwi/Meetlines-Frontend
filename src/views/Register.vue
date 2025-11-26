<template>
    <div><router-link to="/">Volver</router-link></div>
    <div class="auth-container">
        <div class="auth-card">
            <h2>Crear Cuenta</h2>
            <p class="subtitle">Gestiona tus pedidos con IA hoy mismo</p>

            <form @submit.prevent="registrarse">

                <div class="form-group">
                    <label>Nombre de Empresa / Freelancer</label>
                    <input type="text" v-model="nombre" required placeholder="Mi Negocio Inc." />
                </div>

                <div class="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" v-model="email" required placeholder="ejemplo@correo.com" />
                </div>

                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" v-model="password" required />
                </div>

                <div class="form-group">
                    <label>Confirmar Contraseña</label>
                    <input type="password" v-model="confirmPassword" required />
                </div>

                <button type="submit" class="btn-submit">Registrarse</button>
            </form>

            <div class="auth-footer">
                <p>¿Ya tienes cuenta? <router-link to="/login">Inicia Sesión</router-link></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Variables reactivas
const nombre = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const registrarse = () => {
    // 1. Validación básica
    if (password.value !== confirmPassword.value) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // 2. Aquí iría la petición al backend para crear el usuario
    console.log("Registrando:", {
        nombre: nombre.value,
        email: email.value,
        pass: password.value
    });

    // 3. Simulamos éxito
    alert("Cuenta creada con éxito. Ahora ingresa a tu panel.");
    router.push('/dashboard');
};
</script>

<!-- Reutilizamos los estilos, en un proyecto real usarías un archivo CSS global -->
<style scoped>
/* Copia aquí los mismos estilos que pusimos en Login.vue 
   o impórtalos de un archivo css común. Por simplicidad, 
   puedes copiar y pegar el bloque <style> de Login aquí abajo. */
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
}

.btn-submit {
    width: 100%;
    padding: 10px;
    background-color: #2196F3;
    /* Azul para diferenciar del login */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
}

.btn-submit:hover {
    background-color: #1976D2;
}

.auth-footer {
    margin-top: 1.5rem;
    font-size: 0.9rem;
}
</style>