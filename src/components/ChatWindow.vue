<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
         @click.self="$emit('close')">
        
        <div class="bg-gray-900 rounded-2xl w-full max-w-2xl h-[600px] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
            <!-- Header -->
            <div class="p-4 border-b border-white/10 flex justify-between items-center bg-gray-900/95">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                        {{ contactInitials }}
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-white">{{ contactName }}</h3>
                        <p class="text-xs text-gray-400">{{ contactPhone }}</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-2">
                    <button @click="returnToBot" 
                            :disabled="isLoading"
                            class="px-3 py-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Devolver al Bot
                    </button>
                    
                    <button @click="$emit('close')" class="text-gray-400 hover:text-white p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Chat Area -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50 scroll-smooth" ref="messagesContainer">
                <div v-if="isLoadingHistory" class="flex justify-center py-8">
                     <span class="animate-spin h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full"></span>
                </div>
                
                <div v-else-if="messages.length === 0" class="text-center py-12 text-gray-500">
                    <p>No hay historial de mensajes disponible.</p>
                </div>

                <div v-for="msg in messages" :key="msg.id" class="space-y-2">
                    <!-- Customer Message -->
                    <div v-if="msg.customerMessage && msg.customerMessage !== '(Human Reply)' && msg.customerMessage !== '(System Trigger)'" 
                         class="flex justify-start">
                        <div class="max-w-[80%] bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-200 shadow-md">
                            <p>{{ msg.customerMessage }}</p>
                            <span class="text-[10px] text-gray-500 mt-1 block">{{ formatDate(msg.createdAt) }}</span>
                        </div>
                    </div>

                    <!-- Bot/Agent Response -->
                    <div v-if="msg.botResponse" class="flex justify-end">
                        <div class="max-w-[80%] bg-indigo-600 rounded-2xl rounded-tr-none px-4 py-3 text-sm text-white shadow-md">
                             <div v-if="msg.botType === 'human_agent' || msg.handledByHuman" class="mb-1 flex items-center gap-1 text-[10px] text-indigo-200/80 font-bold uppercase tracking-wider">
                                <span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                Agente
                             </div>
                            <p>{{ msg.botResponse }}</p>
                            <span class="text-[10px] text-indigo-300 mt-1 block text-right">{{ formatDate(msg.createdAt) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Input Area -->
            <div class="p-4 bg-gray-900 border-t border-white/10">
                <form @submit.prevent="sendMessage" class="flex gap-2">
                    <input type="text" 
                           v-model="newMessage" 
                           placeholder="Escribe un mensaje..." 
                           class="flex-1 bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                           :disabled="isSending">
                    
                    <button type="submit" 
                            :disabled="!newMessage.trim() || isSending"
                            class="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 rounded-xl transition-colors flex items-center justify-center">
                        <svg v-if="isSending" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                           <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                           <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch, onUnmounted } from 'vue';
import api from '@/services/api'; // Direct API usage for new endpoints or create service method
import { confirmAction, showError, showSuccess } from '@/utils/alert';

const props = defineProps({
    projectId: { type: String, required: true },
    phone: { type: String, required: true },
    contactName: { type: String, default: 'Cliente' }
});

const emit = defineEmits(['close', 'returned-to-bot']);

const messages = ref([]);
const newMessage = ref('');
const isLoadingHistory = ref(false);
const isSending = ref(false);
const isLoading = ref(false);
const messagesContainer = ref(null);

const contactPhone = computed(() => props.phone);
const contactInitials = computed(() => (props.contactName || 'Client').substring(0, 2).toUpperCase());

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        day: '2-digit',
        month: 'short'
    });
};

const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
};

const fetchHistory = async (isBackground = false) => {
    if (!isBackground) isLoadingHistory.value = true;
    try {
        const response = await api.get(`/api/projects/${props.projectId}/chat/${props.phone}/history`);
        // Only scroll to bottom if new message added or first load
        const prevLength = messages.value.length;
        messages.value = response.data;
        
        if (!isBackground || messages.value.length > prevLength) {
             scrollToBottom();
        }
    } catch (error) {
        console.error("Error fetching chat history", error);
    } finally {
        if (!isBackground) isLoadingHistory.value = false;
    }
};

let pollingInterval = null;

const startPolling = () => {
    stopPolling();
    pollingInterval = setInterval(() => {
        fetchHistory(true);
    }, 3000);
};

const stopPolling = () => {
    if (pollingInterval) clearInterval(pollingInterval);
};

onUnmounted(() => {
    stopPolling();
});

const sendMessage = async () => {
    if (!newMessage.value.trim()) return;
    
    isSending.value = true;
    try {
        const payload = { message: newMessage.value };
        const response = await api.post(`/api/projects/${props.projectId}/chat/${props.phone}/send`, payload);
        
        if (response.data.success) {
            // Optimistic update
            messages.value.push({
                id: response.data.conversationId || Date.now(),
                customerMessage: '(Human Reply)',
                botResponse: newMessage.value,
                botType: 'human_agent',
                createdAt: new Date().toISOString()
            });
            newMessage.value = '';
            scrollToBottom();
        }
    } catch (error) {
        console.error("Error sending message", error);
        showError('Error', 'No se pudo enviar el mensaje. Verifica la conexión.');
    } finally {
        isSending.value = false;
    }
};

const returnToBot = async () => {
    const confirmed = await confirmAction('¿Devolver al Bot?', 'El bot retomará la conversación y se marcará como atendido.');
    if (!confirmed) return;
    
    isLoading.value = true;
    try {
        await api.post(`/api/projects/${props.projectId}/conversations/phone/${props.phone}/return-to-bot`);
        showSuccess('Éxito', 'Conversación devuelta al bot.');
        emit('returned-to-bot');
        emit('close');
    } catch (error) {
        console.error("Error returning to bot", error);
        showError('Error', 'No se pudo devolver al bot.');
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchHistory();
    startPolling();
});

// Watch for prop changes if valid to reload (though v-if in parent usually handles this)
watch(() => props.phone, () => {
    fetchHistory();
    startPolling();
});
</script>
