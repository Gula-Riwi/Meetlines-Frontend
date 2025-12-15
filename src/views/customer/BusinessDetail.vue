<template>
    <div class="min-h-screen bg-gray-950 text-white">
        <!-- Header -->
        <header class="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center h-16">
                    <router-link to="/explore" class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        <span>Volver</span>
                    </router-link>
                </div>
            </div>
        </header>

        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <svg class="animate-spin h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
        </div>

        <!-- Main content -->
        <main v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Business header -->
            <div class="bg-gray-900/50 rounded-2xl p-6 mb-8 border border-white/10">
                <div class="flex items-start gap-6">
                    <!-- Business image/logo -->
                    <div class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl font-bold">
                        {{ business?.name?.charAt(0) || 'B' }}
                    </div>
                    
                    <div class="flex-1">
                        <h1 class="text-3xl font-bold tracking-normal mb-2">{{ business?.name || 'Cargando...' }}</h1>
                        <p class="text-gray-400 mb-4">{{ business?.description || '' }}</p>
                        
                        <div class="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span v-if="business?.industry" class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {{ business.industry }}
                            </span>
                            <span v-if="business?.address" class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {{ business.address }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Services section -->
            <section class="mb-8">
                <h2 class="text-xl font-bold mb-4">Servicios disponibles</h2>
                
                <div v-if="servicesLoading" class="text-gray-400">Cargando servicios...</div>
                
                <div v-else-if="services.length === 0" class="text-gray-400">
                    No hay servicios disponibles en este momento.
                </div>
                
                <div v-else class="grid gap-4">
                    <ServiceCard
                        v-for="service in services"
                        :key="service.id"
                        :service="service"
                        @book="startBooking(service)"
                    />
                </div>
            </section>

            <!-- Employees section -->
            <section v-if="employees.length > 0" class="mb-8">
                <h2 class="text-xl font-bold mb-4">Nuestro equipo</h2>
                <div class="flex flex-wrap gap-4">
                    <div v-for="employee in employees" :key="employee.id"
                        class="flex items-center gap-3 bg-gray-900/50 rounded-xl p-3 border border-white/10">
                        <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {{ employee.name?.charAt(0) || 'E' }}
                        </div>
                        <span class="text-gray-300">{{ employee.name }}</span>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Cookies from 'js-cookie';

// Components
import ServiceCard from '@/components/customer/ServiceCard.vue';

// Services
import bookingService from '@/services/bookingService';

const route = useRoute();
const router = useRouter();

// State
const business = ref(null);
const services = ref([]);
const employees = ref([]);
const isLoading = ref(true);
const servicesLoading = ref(true);

// Methods
const loadBusiness = async () => {
    const projectId = route.params.projectId;
    
    try {
        const response = await bookingService.getProjectPublic(projectId);
        business.value = response.data || response;
    } catch (err) {
        console.error('Error loading business:', err);
    } finally {
        isLoading.value = false;
    }
};

const loadServices = async () => {
    const projectId = route.params.projectId;
    
    try {
        const response = await bookingService.getProjectServices(projectId);
        services.value = response.data || response || [];
    } catch (err) {
        console.error('Error loading services:', err);
    } finally {
        servicesLoading.value = false;
    }
};

const loadEmployees = async () => {
    const projectId = route.params.projectId;
    
    try {
        const response = await bookingService.getProjectEmployees(projectId);
        employees.value = response.data || response || [];
    } catch (err) {
        console.error('Error loading employees:', err);
    }
};

const startBooking = (service) => {
    const isAuthenticated = !!Cookies.get('customer_token');
    
    if (!isAuthenticated) {
        // Store intended booking in session storage
        sessionStorage.setItem('pendingBooking', JSON.stringify({
            projectId: route.params.projectId,
            serviceId: service.id
        }));
        router.push('/customer/login');
        return;
    }
    
    router.push({
        path: `/book/${route.params.projectId}`,
        query: { serviceId: service.id }
    });
};

// Lifecycle
onMounted(() => {
    loadBusiness();
    loadServices();
    loadEmployees();
});
</script>
