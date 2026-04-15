<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const username = ref<string>('')
const password = ref<string>('')

const handleLogin = async () => {
    try{
        const response = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ username: username.value, password: password.value})
        })

        const data = await response.json()

        
        if(response.ok){
            alert("giriş başarılı!")
            localStorage.setItem('isLogged', 'true')
            localStorage.setItem('username', data.username)
            router.push('/main')
        }else{
            alert(data.message || "Giriş başarısız!")
        }
    }catch(err: any){
        console.log("Hata: ", err.message);
        alert("Sunucuya bağlanılamadı!");
    }
}
</script>

<template>
    <div class="login-page">
        <div class="login-card">
            <h1>Giriş yap!</h1>
            <div class="input-group">
                <input 
                    v-model="username" 
                    type="text" 
                    placeholder="Adınız nedir?" 
                    @keyup.enter="handleLogin"
                >
                <input 
                    v-model="password" 
                    type="text" 
                    placeholder="Şifreniz nedir?" 
                    @keyup.enter="handleLogin"
                >
                <button @click="handleLogin">Giriş Yap</button>
                <button @click="router.push('/signup')">Kayıt Ol</button>
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