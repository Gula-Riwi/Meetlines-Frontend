<template>
    <div class="min-h-screen bg-gray-950 text-white">
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Logo -->
                    <router-link to="/" class="flex items-center gap-2">
                        <span class="text-2xl font-bold tracking-normal text-white">Meet<span class="text-indigo-400">Lines</span></span>
                    </router-link>

                    <!-- Search bar -->
                    <div class="flex-1 max-w-xl mx-8">
                        <div class="relative">
                            <input
                                type="text"
                                v-model="searchQuery"
                                placeholder="Buscar negocios..."
                                class="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <!-- Auth buttons -->
                    <div class="flex items-center gap-4">
                        <template v-if="isAuthenticated">
                            <router-link to="/my-appointments" class="text-gray-300 hover:text-white transition-colors">
                                Mis Citas
                            </router-link>
                            <button @click="handleLogout" class="text-gray-400 hover:text-white transition-colors">
                                Cerrar sesión
                            </button>
                        </template>
                        <template v-else>
                            <router-link to="/customer/login" class="text-gray-300 hover:text-white transition-colors">
                                Iniciar sesión
                            </router-link>
                            <router-link to="/customer/register"
                                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-colors">
                                Registrarse
                            </router-link>
                        </template>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Hero section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-bold tracking-normal mb-4">
                    Encuentra y agenda con los
                    <span class="text-indigo-400">mejores negocios</span>
                </h1>
                <p class="text-gray-400 text-lg max-w-2xl mx-auto">
                    Descubre negocios cercanos, explora sus servicios y agenda tu cita en segundos.
                </p>
            </div>

            <!-- Loading state -->
            <div v-if="isLoading" class="flex justify-center items-center py-20">
                <svg class="animate-spin h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="text-center py-20">
                <p class="text-red-400 mb-4">{{ error }}</p>
                <button @click="loadBusinesses" class="text-indigo-400 hover:text-indigo-300 transition-colors">
                    Intentar de nuevo
                </button>
            </div>

            <!-- Business grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BusinessCard
                    v-for="business in filteredBusinesses"
                    :key="business.id"
                    :business="business"
                    @click="goToDetail(business.id)"
                />
            </div>

            <!-- Empty state -->
            <div v-if="!isLoading && !error && filteredBusinesses.length === 0" class="text-center py-20">
                <svg class="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p class="text-gray-400 text-lg">No se encontraron negocios</p>
                <p class="text-gray-500 text-sm">Intenta con otros términos de búsqueda</p>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

// Components
import BusinessCard from '@/components/customer/BusinessCard.vue';

// Services
import bookingService from '@/services/bookingService';

const router = useRouter();

// State
const businesses = ref([]);
const searchQuery = ref('');
const isLoading = ref(true);
const error = ref('');

// Computed
const isAuthenticated = computed(() => {
    return !!Cookies.get('customer_token');
});

const filteredBusinesses = computed(() => {
    if (!searchQuery.value) return businesses.value;
    
    const query = searchQuery.value.toLowerCase();
    return businesses.value.filter(b => 
        b.name?.toLowerCase().includes(query) ||
        b.description?.toLowerCase().includes(query) ||
        b.industry?.toLowerCase().includes(query)
    );
});

// Methods
const loadBusinesses = async () => {
    isLoading.value = true;
    error.value = '';
    
    try {
        // Try to get user location for geo-filtering
        let lat, lng;
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                });
                lat = position.coords.latitude;
                lng = position.coords.longitude;
            } catch (geoError) {
                console.log('Geolocation not available, loading all businesses');
            }
        }

        const response = await bookingService.getPublicProjects(lat, lng);
        console.log('API Response:', response);  // DEBUG
        console.log('Response type:', typeof response);  // DEBUG
        console.log('First item:', response?.[0] || response?.data?.[0]);  // DEBUG
        
        // Handle different response structures
        let data = [];
        if (Array.isArray(response)) {
            data = response;
        } else if (response?.data && Array.isArray(response.data)) {
            data = response.data;
        } else if (response?.value && Array.isArray(response.value)) {
            data = response.value;
        }
        
        businesses.value = data;
    } catch (err) {
        console.error('Error loading businesses:', err);
        error.value = 'Error al cargar los negocios. Por favor intenta de nuevo.';
    } finally {
        isLoading.value = false;
    }
};

const goToDetail = (projectId) => {
    router.push(`/business/${projectId}`);
};

const handleLogout = () => {
    Cookies.remove('customer_token');
    Cookies.remove('customer_refresh_token');
    localStorage.removeItem('customer');
    router.push('/explore');
};

// Lifecycle
onMounted(() => {
    loadBusinesses();
});
</script>
