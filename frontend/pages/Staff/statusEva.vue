<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title><h1 class="text-center text-h5">สถานะการประเมินของผู้รับการประเมินผล</h1></v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ผู้รับการประเมินผล</th>
                                    <th class="border text-center">รอบการประเมิน</th>
                                    <th class="border text-center">วันที่ออกแบบประเมิน</th>
                                    <th class="border text-center">สถานะการประเมิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_eva">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.first_name }} {{ items.last_name }}</td>
                                    <td class="border text-center">รอบการประเมินที่:{{ items.round_sys }} ปี:{{ items.year_sys }}</td>
                                    <td class="border text-center">{{ items.day_eva }}</td>
                                    <td class="border text-center">
                                        <center>
                                            <v-btn class="text-center ms-1" :color="bg(items.status_eva)" size="small">{{ items.status_eva === 1 ? 'รอการประเมินตนเอง' : items.status_eva === 2 ? 'รอกรรมการประเมิน' : 'ประเมินสำเร็จ' }}</v-btn>
                                        </center>
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
import { api, staff } from '~/API/base';


const error = ref<Record<string,string>>({})
const pic_user = ref<File | null>(null)
const typeR = ['ผู้รับการประเมินผล']
const show = ref(false)
const showPw = ref(false)
const result = ref([])
const search = ref('')
const token = import.meta.client ? localStorage.getItem('token'):null
const eva = ref([])
const round = ref([])

const form = ref(
    {
        id_eva:null,
        id_member:'',
        id_sys:'',
        day_eva:''
    }
)

const reset = ()=>{
    form.value = {
        id_eva:null,
        id_member:'',
        id_sys:'',
        day_eva:''
    }
}

const emailRegex = /^[^\s]+@[^\s]+\.+[^\s]{2,}$/i

function validateForm(){
    error.value = {}
    const f = form.value

    if(!f.id_member)error.value.id_member = 'กรุณาเลือกผู้รับการประเมินผล'

    if(!f.id_sys)error.value.id_sys = 'กรุณาเลือกรอบการประเมิน'
    if(!f.day_eva)error.value.day_eva = 'กรุณากรอกวันที่ออกแบบประเมิน'

    return Object.keys(error.value).length === 0
}

const saveMember = async()=>{
    if(!validateForm())return
    const f = form.value
    try {
        

        f.id_eva
        ? await axios.put(`${staff}/eva/update/${f.id_eva}`,form.value,{headers:{Authorization:`Bearer ${token}`}})
        : await axios.post(`${staff}/eva/save`,form.value,{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await reset()
        await fetch()

    } catch (error) {
        console.error("Error save eva",error)
    }
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        
    } catch (error) {
        console.error("Error get show",error)
    }
}



const edit = (items:any) =>{

    form.value = {...items}

}

const del = async(id_eva:number)=>{
    if(!confirm("ต้องการลบข้อมูลชุดนี้ใช่หรือไม่"))return
    try {
        
        await axios.delete(`${staff}/eva/delete/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        await reset()

    } catch (error) {
        console.error("Error del eva",error)
    }
}

const go =(id_eva:number)=>{

    navigateTo({path:`/Staff/score_commit-${id_eva}`})

}

const bg =(status_eva:number)=>{
    if(status_eva===1)return 'error'
    else if(status_eva===2)return 'warning'
    else if(status_eva===3)return 'success'
}

onMounted(fetch)

</script>

<style scoped>

</style>