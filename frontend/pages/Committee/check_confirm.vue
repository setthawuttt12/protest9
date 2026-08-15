<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title><h1 class="text-center text-h5">ตรวจสอบและยืนยันผล</h1></v-card-title>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">ชื่อ</th>
                                <th class="border text-center">นามสกุล</th>
                                <th class="border text-center">วันที่ออกแบบประเมิน</th>
                                <th class="border text-center">รอบการประเมิน</th>
                                <th class="border text-center">ผลการประเมิน</th>
                                <th class="border text-center">ยืนยันผลประเมิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ items.first_name }}</td>
                                <td class="border text-center"> {{ items.last_name }}</td>
                                <td class="border text-center">{{ items.day_eva }}</td>
                                <td class="border text-center">รอบการประเมินที่:{{ items.round_sys }} ปี:{{ items.year_sys }}</td>
                                <td class="border text-center"><v-btn color="blue" class="text-white" size="small" @click="check(items.id_eva)">ตรวจสอบ</v-btn></td>
                                <td class="border text-center">
                                    <center>
                                        <v-btn v-if="items.signature" class="text-center ms-1" color="success" size="small" @click="go(items.id_eva)">ยืนยันผลแล้ว</v-btn>
                                        <v-btn v-else class="text-center ms-1" color="blue" size="small" @click="go(items.id_eva)">ยืนยันผล</v-btn>
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
import { api, staff, commit } from '~/API/base';


const error = ref<Record<string,string>>({})

const result = ref([])

const token = import.meta.client ? localStorage.getItem('token') : null

const fetch = async()=>{
    try {
        const res = await axios.get(`${commit}/check_confirm`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        
    } catch (error) {
        console.error('Error get show', error)
    }
}

const go =(id_eva:number)=>{

    navigateTo({path:`/Committee/signature${id_eva}`})

}
const check =(id_eva:number)=>{

    navigateTo({path:`/Committee/score_commit${id_eva}`})

}

onMounted(fetch)

</script>

<style scoped>

</style>