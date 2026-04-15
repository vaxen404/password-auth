import fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
import cors from '@fastify/cors'
import bcrypt from "bcrypt"
import { fileURLToPath } from "url"
import fs from "fs"
import path from "path";

interface User {
    username: string;
    password: string;
}

const app: FastifyInstance = fastify({ logger: false })

await app.register(cors, { origin: "*" })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const jsonPath = path.join(__dirname, 'private', 'users.json')

async function getUsers(): Promise<User[]> {
    try {
        if(!fs.existsSync(jsonPath)) return []
        const data = fs.readFileSync(jsonPath, "utf-8")
        return JSON.parse(data || '[]')
    } catch (error) {
        return []
    }
}

async function saveUsers(user: User[]): Promise<void> {
    fs.writeFileSync(jsonPath, JSON.stringify(user, null, 2))
}

interface AuthRequest {
    username?: string;
    password?: string;
}

app.post('/login', async (req: FastifyRequest<{ Body: AuthRequest }>, rep: FastifyReply) => {
    const { username, password } = req.body

    if(!username || !password){
        return rep.code(400).send({ message: "Eksik bilgi!" });
    }

    const users = await getUsers()

    const user = users.find(u => u.username === username)
    if(!user){
        return rep.code(404).send({ message: "kullanıcı bulunamadı!" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
        return rep.code(200).send({ message: "Giriş başarılı!", username: user.username })
    }else {
        return rep.code(401).send({ message: "Şifre hatalı!" })
    }
})

app.post('/signup', async (req: FastifyRequest<{ Body: AuthRequest }>, rep: FastifyReply) => {
    try{
        const { username, password } = req.body
        
        if(!username || !password){
            return rep.code(400).send({ message: "Eksik bilgi!"})
        }

        const users = await getUsers()
        
        const userExists = users.find(u => u.username === username)
        if(userExists){
            return rep.code(409).send({ message: "bu kullanıcı zaten var"})
        }
    
        const hash = await bcrypt.hash(password, 10)

        users.push({ username, password: hash })

        await saveUsers(users)

        return rep.code(201).send({ message: "kayıt başarılı!" }) 

    }catch(err){
        return rep.code(500).send({ message: "Sunucu hatası oluştu!" })
    }
})

app.listen({ port: 3000 }, (err) => {
    if(err) console.error(err);
    console.log("server çalıştı");
})