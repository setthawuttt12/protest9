<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 1" @submit.passive="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="mt-2 pa-2">
                        <p>ผู้ใช้งาน : {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบที่การประเมิน : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row class="mt-2" v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="text-h5 font-weight-bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                            <v-card class="pa-2">
                                <v-row v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate">
                                    <v-col cols="12">
                                        {{ t+1 }}.{{ i+1 }} {{ indicate.name_indicate }} รายละเอียดตัวชี้วัด {{ indicate.detail_indicate }} น้ำหนักคะแนน {{ indicate.point_indicate }} คะแนนเต็ม {{ indicate.point_indicate*4 }}
                                        <v-textarea label="คำอธิบายเพิ่มเติม(ถ้ามี)" v-model="indicate.detail_eva" rows="2" ></v-textarea>
                                        <v-file-input label="*** รองรับเฉพาะนามสกุลไฟล์ .png .jpg .pdf" @change="onFileChange($event,topic.id_topic,indicate.id_indicate)" accept=".png,.jpg,.pdf"></v-file-input>
                                        <v-select v-if="indicate.check_indicate === 'y'" label="ใส่คะแนนประเมิน 1-4" :items="[1,2,3,4]" v-model="indicate.score"></v-select>
                                        <v-text-field v-else label="ใส่คะแนนประเมิน 1-4" @input="indicate.score > 4 ? indicate.score = 4 :null" type="number" v-model="indicate.score"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                    <div class="text-center mt-4">
                        <v-btn color="blue" tpye="submit">บันทึกคะแนน</v-btn>
                    </div>
                </v-form>
                <v-alert type="success" v-else-if="user.status_eva === 2 || user.status_eva === 3">ประเมินสำเร็จ</v-alert>
                <v-alert type="error" v-else>ไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { eva } from '~/API/base';


const user = ref<any>({})
const topics = ref<any>([])

const fetch = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value =res.data
    } catch (error) {
        console.error('Error get User',error)        
    }
}
const fetchtopic = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/topic`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value =res.data
    } catch (error) {
        console.error('Error get topic',error)        
    }
}

onMounted(async()=>{
    await Promise.all([fetch(),fetchtopic()])
})

const fileMap = ref<Record<string,File>>({})
const onFileChange = (event:Event,id_topic:number,id_indicate:number) =>{
    const file = (event.target as HTMLInputElement)?.files?.[0]
    if(!file)return
    fileMap.value[`${id_topic}-${id_indicate}`] = file
}
const saveScore = async()=>{
    const token = localStorage.getItem('token')
    const formData = new FormData()
    const allScore = topics.value.flatMap((t:any)=>
        t.indicates.map((i:any)=>{
            const key = `${t.id_topic}-${i.id_indicate}`
            const file = fileMap.value[key]
            if(file)formData.append(`file_${key}`,file)
            return{
                id_topic:t.id_topic,
                id_indicate:i.id_indicate,
                score:i.score,
                detail_eva:i.detail_eva,
                file_key:file ? `file_${key}` : null
            }
        })
    )
    if(allScore.some((s:any)=> !.score)){
        alert('กรุณากรอกคะแนนให้สมบูร')
        return
    }
    formData.append('scores',JSON.stringify(allScore))
    try {
        await axios.post(`${eva}/selfeva/save`,formData,{headers:{Authorization:`Bearer ${token}`}})
        alert('ประเมินสำเร็จ')
        await Promise.all([fetch(),fetchtopic()])
        window.location.reload()
    } catch (error) {
        console.error('error post scoer')
    }
}
</script>

<style scoped>

</style>