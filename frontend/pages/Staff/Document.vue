<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title><h1 class="text-center text-h5">เอกสารหรือคู่มือสำหรับการประเมิน</h1></v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="saveMember">
                            <br>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ชื่อเอกสาร" v-model="name_doc" :error-messages="error.name_doc" prepend-inner-icon="mdi-file"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-file-input label="ไฟล์เอกสาร" v-model="file" :error-messages="error.file" accept=".pdf" hint="รองรับเฉพาะไฟล์ PDF ขนาดไม่เกิน 10MB" persistent-hint></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-2" type="submit" color="primary">บันทึก</v-btn>
                                        <v-btn class="text-center ma-2" type="reset" color="error">ยกเลิก</v-btn>
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
                                <th class="border text-center">ชื่อเอกสาร</th>
                                <th class="border text-center">วันที่ออกเอกสาร</th>
                                <th class="border text-center">ไฟล์เอกสาร</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_doc">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ items.name_doc }}</td>
                                <td class="border text-center">{{ formatDate(items.day_doc)  }}</td>
                                <td class="border text-center">
                                    <center>
                                        <v-btn class="text-center ma-1" color="info" prepend-icon="mdi-eye" size="small" @click="view(items.file)">เปิดดู</v-btn>
                                    </center>
                                </td>
                                <td class="border text-center">
                                    <center>
                                        <v-btn class="text-center ma-1" color="error" size="small" @click="del(items.id_doc)">ลบ</v-btn>
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
import { A } from 'vue-router/dist/index-BN0B0y8a.js';
import { api, staff } from '~/API/base';

const error = ref<Record<string,string>>({})
const file = ref<File | null>(null)
const name_doc = ref('')
const search = ref('')
const dataResult = ref([])

const token = import.meta.client ? localStorage.getItem('token'):null

const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

const saveMember = async()=>{
    if(!name_doc.value || !file.value)return alert('กรอกข้อมูลให้ครบถ้วน')
    const maxSize = 10 * 1024 *1024

    if(file.value.size > maxSize){
        return alert('ไฟล์มีขนาดใหญ่เกิน 10MB')
    }
    const formData = new FormData
    formData.append('name_doc',JSON.stringify(name_doc.value))
    formData.append('file',file.value!)
    try {
        
        await axios.post(`${staff}/doc/save`,formData,{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await fetch()
        name_doc.value = ''
        file.value = null

    } catch (error) {
        console.error("Error doc",error)
    }
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/doc/show`,{headers:{Authorization:`Bearer ${token}`}})
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
            item.name_doc?.toLowerCase().includes(s)
        )
    })
})

const del = async(id_doc:number)=>{
    if(!confirm("ต้องการลบข้อมูลชุดนี้ใช่หรือไม่"))return
    try {
        
        await axios.delete(`${staff}/doc/delete/${id_doc}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        name_doc.value = ''
        file.value = null

    } catch (error) {
        console.error("Error del doc",error)
    }
}

const view =(filename:string)=>{
    const url = new URL(`http://localhost:3001/uploads/document/${filename}`,api).href
    window.open(url,'_blank')
}

onMounted(fetch)

</script>

<style scoped>

</style>