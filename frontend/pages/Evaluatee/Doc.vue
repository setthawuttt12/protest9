<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title><h1 class="text-center text-h5">เอกสารหรือคู่มือสำหรับการประเมิน</h1></v-card-title>
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
                                <td class="border text-center">{{ items.day_doc }}</td>
                                <td class="border text-center">
                                    <center>
                                        <v-btn class="text-center ms-1" color="info" prepend-icon="mdi-eye" size="small" @click="view(items.file)">เปิดดู</v-btn>
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
const result = ref([])

const token = import.meta.client ? localStorage.getItem('token'):null



const fetch = async()=>{
    try {
        
        const res = await axios.get(`${api}/docnoe`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        
    } catch (error) {
        console.error("Error get show",error)
    }
}





const view =(filename:string)=>{
    const url = new URL(`/uploads/document/${filename}`,api).href
    window.open(url,'_blank')
}

onMounted(fetch)

</script>

<style scoped>

</style>