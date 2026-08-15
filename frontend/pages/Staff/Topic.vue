<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title><h1 class="text-center text-h5">จัดการหัวข้อการประเมิน</h1></v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="saveMember">
                            <br>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field label="ชื่อหัวข้อการประเมิน" v-model="form.name_topic" :error-messages="error.name_topic" prepend-inner-icon="mdi-information"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-2" type="submit" color="primary">{{ form.id_topic ? 'อัปเดต':'บันทึก' }}</v-btn>
                                        <v-btn class="text-center ma-2" @click="reset()" color="error">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <br>
                    <v-text-field v-model="search" prepend-inner-icon="mdi-magnify"></v-text-field>
                    <br>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">ชื่อหัวข้อการประเมิน</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_topic">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ items.name_topic }}</td>
                                <td class="border text-center">
                                    <center>
                                        <v-btn class="text-center ms-1" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>
                                        <v-btn class="text-center ms-1" color="error" size="small" @click="del(items.id_topic)">ลบ</v-btn>
                                    </center>
                                </td>
                            </tr>
                            <tr v-if="result.length === 0">
                                <td class="text-center text-red" colspan="10">ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff } from '~/API/base';


const error = ref<Record<string,string>>({})
const pic_user = ref<File | null>(null)
const typeR = ['ผู้รับการประเมินผล']
const show = ref(false)
const showPw = ref(false)
const dataResult = ref([])
const search = ref('')
const token = import.meta.client ? localStorage.getItem('token'):null

const form = ref(
    {
        id_topic:null,
        name_topic:'',
    }
)

const reset = ()=>{
    form.value = {
        id_topic:null,
        name_topic:'',
    }
}

const emailRegex = /^[^\s]+@[^\s]+\.+[^\s]{2,}$/i

function validateForm(){
    error.value = {}
    const f = form.value

    if(!f.name_topic.trim())error.value.name_topic = 'กรุณากรอกชื่อหัวข้อการประเมิน'

    return Object.keys(error.value).length === 0
}

const saveMember = async()=>{
    if(!validateForm())return
    const f = form.value
    try {
        

        f.id_topic
        ? await axios.put(`${staff}/topic/update/${f.id_topic}`,form.value,{headers:{Authorization:`Bearer ${token}`}})
        : await axios.post(`${staff}/topic/save`,form.value,{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await reset()
        await fetch()

    } catch (error) {
        console.error("Error save topic",error)
    }
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/topic/show`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data
        
    } catch (error) {
        console.error("Error get show",error)
    }
}

const result = computed(()=>{

    if(!search.value)return dataResult.value

    const s = search.value.toLowerCase()

    return dataResult.value.filter((item:any)=>{
        return(
            item.name_topic?.toLowerCase().includes(s)
        )
    })
})


const edit = (items:any) =>{

    form.value = {...items}

}

const del = async(id_topic:number)=>{
    if(!confirm("ต้องการลบข้อมูลชุดนี้ใช่หรือไม่"))return
    try {
        
        await axios.delete(`${staff}/topic/delete/${id_topic}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        await reset()

    } catch (error) {
        console.error("Error del topic",error)
    }
}

onMounted(fetch)

</script>

<style scoped>

</style>