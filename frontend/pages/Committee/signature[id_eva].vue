<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title><h1 class="text-center text-h5">ยันยันผลการประเมิน</h1></v-card-title>
                    <v-card-text>
                        <v-form v-if="!result.signature" @submit.prevent="saveMember">
                            <br>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-file-input label="ไฟล์" v-model="file" accept=".png,.jpg"/>
                                    <p class="text-error font-weight-bold">file *** รองรับเฉพาะนามสกุลไฟล์ .png .jpg  ***</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-2" block type="submit" color="primary">บันทึก</v-btn>
                                        <v-btn class="text-center ma-2" block  color="error">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                    <v-table v-else>
                        <thead>
                            <tr>
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">ไฟล์</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border text-center">{{ 1 }}</td>
                                <td class="border text-center">{{ result.signature }}</td>
                                <td class="border text-center">
                                    
                                        <v-btn class="text-center ms-1" color="warning" size="small" @click="viwes(result.signature)">เปิดดู</v-btn>
                                        <v-btn class="text-center ms-1" color="error" size="small" @click="del(id_eva)">ลบ</v-btn>
                                    
                                </td>
                            </tr>
                            <tr v-if="result.length === 0">
                                <td class="text-center text-red" colspan="10">ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff ,commit } from '~/API/base';


const error = ref<Record<string,string>>({})
const result = ref([])
const token = import.meta.client ? localStorage.getItem('token'):null
const eva = ref([])
const round = ref([])
const file = ref<File | null>(null)
const id_eva = useRoute().params.id_eva



const fetch = async()=>{
    try {
        
        const res = await axios.get(`${commit}/signature/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        
    } catch (error) {
        console.error("Error get show",error)
    }
}

const saveMember = async()=>{
    if(!file.value) return alert('กรุณาแบไฟล์ก่อนบันทึก')
    try {
        const formData = new FormData()
        formData.append('file',file.value)
        await axios.get(`${commit}/signature/${id_eva}`,formData,{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        File.value = null
        await fetch()
    } catch (error) {
        console.error("Error get show",error)
    }
}






const del = async(id_eva:number)=>{
    
    try {
        if(!confirm("ต้องการลบข้อมูลชุดนี้ใช่หรือไม่"))return
        await axios.delete(`${commit}/signature/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        alert('สำเร็จ')
        await fetch()

    } catch (error) {
        console.error("Error del eva",error)
    }
}

const viwes =(id_eva:number)=>{

    const url = new URL(`/uploads/signature/${filename}`,api).href
    window.open(url,'_blank')

}

onMounted(fetch)

</script>

<style scoped>

</style>