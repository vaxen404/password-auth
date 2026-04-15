<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const username = ref<string>('')
const password = ref<string>('')

const handleSignup = async () => {
    try{
        const response = await fetch('http://localhost:3000/signup', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ username: username.value, password: password.value })
        })
    
        const data: { message: string } = await response.json()
    
    
        if(response.ok){
            alert(data.message)
            router.push('/')
        }else{
            alert(data.message || "Kayıt sırasında bir hata oluştu.")
        }
    }catch(err){
        console.error("Bağlantı hatası: ", err)
        alert("Sunucuya ulaşılamıyor!")
    }
}
</script>

<template>
    <div class="login-page">
        <div class="login-card">
            <h1>Kayıt ol!</h1>
            <div class="input-group">
                <input 
                    v-model="username" 
                    type="text" 
                    placeholder="Adınızı giriniz?" 
                    @keyup.enter="handleSignup"
                >
                <input 
                    v-model="password" 
                    type="text" 
                    placeholder="Şifrenizi giriniz?" 
                    @keyup.enter="handleSignup"
                >
                <button @click="handleSignup">Kayıt Ol</button>
                <button @click="router.push('/')">Geri Dön</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
}
.login-card {
    background-color: #252525;
    padding: 40px;
    border-radius: 12px;
    width: 100%;
    max-width: 350px;
    text-align: center;
}
h1 { color: #42b883; margin-bottom: 20px; }
.input-group { display: flex; flex-direction: column; gap: 15px; }
input {
    padding: 12px;
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-radius: 6px;
    color: white;
    outline: none;
}
button {
    padding: 12px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
}
</style>