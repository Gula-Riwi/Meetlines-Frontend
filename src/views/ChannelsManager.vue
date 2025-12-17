<template>
    <div class="flex h-screen bg-gray-950 text-white font-sans overflow-hidden">

        <Sidebar />

        <div class="flex-1 flex flex-col relative bg-gray-950 min-w-0">
            
            <!-- Header -->
            <header class="border-b border-white/10 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
                <div class="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div>
                        <h1 class="text-5xl tracking-wide font-league">Mis Canales</h1>
                        <p class="text-gray-400 mt-1">Gestiona tus redes sociales y puntos de contacto públicos</p>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="flex-1 overflow-y-auto p-6 relative">
                <InteractiveGridPattern :width="60" :height="60" :squares="[50, 50]"
                    squares-class-name="hover:fill-indigo-500/50"
                    :class="'[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-40'" />

                <div class="max-w-6xl mx-auto relative z-20">
                    
                    <!-- Loading State -->
                    <div v-if="loading" class="flex justify-center py-12 z-10">
                        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>

                    <div v-else>
                        <!-- Empty State -->
                        <div v-if="channels.length === 0" class="text-center py-16 bg-gray-900 rounded-2xl border border-white/10 border-dashed">
                            <font-awesome-icon :icon="['fas', 'tower-cell']" class="text-6xl mb-4" />
                            <h3 class="text-xl font-bold mb-2">No tienes canales configurados</h3>
                            <p class="text-gray-400 mb-6">Agrega tus redes sociales o teléfonos para que tus clientes te encuentren.</p>
                            <button @click="openModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                </svg>
                                Agrega tu primer canal
                            </button>
                        </div>

                        <!-- Channels Grid -->
                        <div v-else>
                            <div class="flex justify-end mb-6">
                                <button @click="openModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                    </svg>
                                    Agregar Canal
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div v-for="channel in channels" :key="channel.id" class="bg-gray-900 rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-colors group relative">
                                    <div class="flex items-start justify-between">
                                        <div class="flex items-center gap-4">
                                            <div class="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-2xl">
                                                {{ getChannelIcon(channel.type) }}
                                            </div>
                                            <div class="overflow-hidden">
                                                <h3 class="font-bold capitalize">{{ channel.type }}</h3>
                                                <p class="text-sm text-gray-400 truncate max-w-[150px]" :title="getChannelValue(channel)">{{ getChannelValue(channel) }}</p>
                                            </div>
                                        </div>
                                        
                                        <!-- Actions -->
                                        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button @click="openModal(channel)" class="p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg text-gray-300 hover:text-white transition-colors" title="Editar">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </button>
                                            <button @click="deleteChannel(channel.id)" class="p-2 bg-gray-800 hover:bg-red-600 rounded-lg text-gray-300 hover:text-white transition-colors" title="Eliminar">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <!-- Modal (Lo dejamos igual, fuera del wrapper si quieres o dentro) -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click.self="showModal = false">
            <div class="bg-gray-900 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
                <!-- ... contenido del modal igual ... -->
                <div class="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 class="text-xl font-bold">{{ isEditing ? 'Editar Canal' : 'Nuevo Canal' }}</h2>
                    <button @click="showModal = false" class="text-gray-400 hover:text-white">✕</button>
                </div>
                
                <div class="p-6 space-y-4">
                    <!-- Type Selection -->
                    <div>
                        <label class="block text-sm font-medium mb-2">Tipo de Canal</label>
                        <select v-model="form.type" :disabled="isEditing" class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
                            <option value="" disabled>Selecciona un tipo</option>
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                            <option value="tiktok">TikTok</option>
                            <option value="x">X (Twitter)</option>
                            <option value="threads">Threads</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="telegram">Telegram</option>
                            <option value="discord">Discord</option>
                            <option value="website">Sitio Web</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>

                    <!-- Custom Type if Other -->
                    <div v-if="form.type === 'other'">
                        <label class="block text-sm font-medium mb-2">Nombre del Canal</label>
                        <input v-model="form.customType" type="text" class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Ej: TikTok">
                    </div>

                    <!-- Value Input (URL or Phone) -->
                    <div>
                        <label class="block text-sm font-medium mb-2">{{ getValueLabel() }}</label>
                        <input v-model="form.value" type="text" class="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors" :placeholder="getValuePlaceholder()">
                        <p class="text-xs text-gray-500 mt-1">Este es el valor que verán tus clientes.</p>
                    </div>
                </div>

                <div class="p-6 border-t border-white/10 bg-gray-900/50 flex justify-end gap-3">
                    <button @click="showModal = false" class="px-4 py-2 text-gray-300 hover:text-white font-medium">Cancelar</button>
                    <button @click="saveChannel" :disabled="saving" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                        <span v-if="saving" class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                        {{ saving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'; 
import { channelService } from '../services/channelService';
import InteractiveGridPattern from '@/components/InteractiveGridPattern.vue';
import Sidebar from '@/components/Sidebar.vue';
import { showToast, confirmAction } from '@/utils/alert';


const route = useRoute();
const projectId = route.params.projectId || 'CURRENT_PROJECT_ID'; 

// State
const channels = ref([]);
const loading = ref(true);
const showModal = ref(false);
const saving = ref(false);
const isEditing = ref(false);
const currentId = ref(null);

const form = ref({
    type: '',
    customType: '',
    value: ''
});

// Load Channels
const loadChannels = async () => {
    loading.value = true;
    try {
        const response = await channelService.getProjectChannels(projectId);
        if(response.success){
             channels.value = response.data;
        }
    } catch (error) {
        console.error('Error loading channels:', error);
    } finally {
        loading.value = false;
    }
};

// Helpers
const getChannelIcon = (type) => {
    const map = {
        'instagram': '📸',
        'facebook': '👍',
        'tiktok': '🎵',
        'x': '✖️',
        'twitter': '🐦',
        'threads': '🧵',
        'whatsapp': '💬',
        'telegram': '✈️',
        'discord': '🎮',
        'website': '🌐',
        'other': '🔗'
    };
    return map[type.toLowerCase()] || '🔗';
};

const getChannelValue = (channel) => {
    try {
        const creds = JSON.parse(channel.credentials || '{}');
        return creds.value || creds.url || 'Sin valor';
    } catch {
        return 'Error formato';
    }
};

const getValueLabel = () => {
    const t = form.value.type;
    if (['whatsapp', 'telegram'].includes(t)) return 'Número / Usuario';
    return 'Enlace (URL)';
};

const getValuePlaceholder = () => {
    const t = form.value.type;
    if (t === 'instagram') return 'Ej: https://instagram.com/mi_negocio';
    if (t === 'tiktok') return 'Ej: https://tiktok.com/@mi_negocio';
    if (t === 'x') return 'Ej: https://x.com/mi_negocio';
    if (t === 'threads') return 'Ej: https://threads.net/@mi_negocio';
    if (t === 'whatsapp') return 'Ej: https://wa.me/573001234567';
    return 'Ej: https://...';
};

// Actions
const openModal = (channel = null) => {
    if (channel) {
        isEditing.value = true;
        currentId.value = channel.id;
        form.value.type = channel.type; 
        
        try {
            const creds = JSON.parse(channel.credentials || '{}');
            form.value.value = creds.value || creds.url || '';
        } catch {
            form.value.value = '';
        }
        
    } else {
        isEditing.value = false;
        currentId.value = null;
        form.value = { type: '', customType: '', value: '' };
    }
    showModal.value = true;
};

const saveChannel = async () => {
    if (!form.value.type || ((form.value.type === 'other' && !form.value.customType)) || !form.value.value) return;
    
    saving.value = true;
    try {
        const type = form.value.type === 'other' ? form.value.customType : form.value.type;
        const credentials = JSON.stringify({ value: form.value.value });

        if (isEditing.value) {
            await channelService.updateChannel(currentId.value, { credentials });
        } else {
            await channelService.createChannel(projectId, { type, credentials });
        }
        await loadChannels();
        showModal.value = false;
    } catch (error) {
        console.error('Error saving channel:', error);
    } finally {
        saving.value = false;
    }
};

const deleteChannel = async (id) => {
    const isConfirmed = await confirmAction(
        '¿Eliminar Canal?', 
        '¿Estás seguro de eliminar este canal?'
    );
    if (!isConfirmed) return;
    try {
        await channelService.deleteChannel(id);
        await loadChannels();
    } catch (error) {
        console.error('Error deleting:', error);
    }
};

onMounted(() => {
    if(projectId && projectId !== 'CURRENT_PROJECT_ID') loadChannels();
});
</script>

<style scoped>
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-fade-in-up {
    animation: fadeInUp 0.2s ease-out;
}
</style>