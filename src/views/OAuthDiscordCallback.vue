<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-blue-950">
    <div class="text-center">
      <div class="mb-4">
        <svg class="animate-spin h-12 w-12 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h2 class="text-white text-2xl font-bold">Autenticando con Discord...</h2>
      <p class="text-gray-400 mt-2">Por favor espera</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import authService from '@/services/authService';
import Cookies from 'js-cookie';
import { isInProjectSubdomain } from '@/services/tenantService';

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  try {
    const code = route.query.code;
    const error = route.query.error;

    if (error) {
      console.error('Discord OAuth error:', error);
      router.push('/login?error=discord_auth_failed');
      return;
    }

    if (!code) {
      console.error('No code provided');
      router.push('/login?error=no_code');
      return;
    }

    // Enviar el code al backend para exchange
    const response = await authService.discordOAuthExchange({ code, redirectUri: `${window.location.origin}/auth/discord/callback` });

    if (response.success && response.data) {
      const { accessToken, refreshToken, name, email, userId } = response.data;
      
      Cookies.set('auth_token', accessToken, { expires: 1, secure: false, sameSite: 'Lax' });
      Cookies.set('refresh_token', refreshToken, { expires: 7, secure: false, sameSite: 'Lax' });
      localStorage.setItem('user', JSON.stringify({ name, email, id: userId }));
      
      if (isInProjectSubdomain()) {
        router.push('/dashboard');
      } else {
        router.push('/projects');
      }
    } else {
      console.error('OAuth login failed:', response.message);
      router.push('/login?error=oauth_failed');
    }
  } catch (err) {
    console.error('Error in Discord OAuth callback:', err);
    router.push('/login?error=callback_error');
  }
});
</script>
