<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter()
const username = ref<string | null>('')

onMounted(() => {
    username.value = localStorage.getItem('username')
})

const handleLogout = () => {
    localStorage.removeItem('isLogged')
    localStorage.removeItem('username')

    router.push('/')
}
</script>

<template>
    <div class="main-container">
        <header>
            <h1>Hoş Geldin, <span class="user">{{ username || 'Misafir' }}</span>!</h1>
            <button @click="handleLogout" class="logout-btn">Çıkış Yap</button>
        </header>

        <main class="content">
            <p>Başarıyla giriş yaptın.</p>
        </main>
    </div>
</template>

<style scoped>
.main-container {
    padding: 20px;
    color: white;
    background-color: #1a1a1a;
    height: 100vh;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    padding-bottom: 20px;
}

.user { color: #42b883; }

.logout-btn {
    padding: 8px 16px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
}

.logout-btn:hover { background-color: #ff3333; }

.content { margin-top: 40px; text-align: center; }

.placeholder-card {
    margin-top: 20px;
    padding: 40px;
    border: 2px dashed #444;
    border-radius: 12px;
    color: #888;
}
</style>