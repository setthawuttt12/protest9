<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title><h1 class="text-center text-h5">จัดการกรรมการประเมิน</h1></v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="saveMember">
                            <br>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ชื่อ" v-model="form.first_name" :error-messages="error.first_name" prepend-inner-icon="mdi-alpha-f"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="นามสกุล" v-model="form.last_name" :error-messages="error.last_name" prepend-inner-icon="mdi-alpha-l"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field label="อีเมล" v-model="form.email" :error-messages="error.email" prepend-inner-icon="mdi-email"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ชื่อผู้ใช้" v-model="form.username" :error-messages="error.username" prepend-inner-icon="mdi-account"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="รหัสผ่าน" v-model="form.password" :error-messages="error.password" :prepend-inner-icon="show ? 'mdi-eye':'mdi-eye-off'" :type="showPw ? 'text':'password'" @click:prepend-inner="show = !show , showPw = !showPw"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-select label="ประเภทสมาชิก" v-model="form.role" :error-messages="error.role" prepend-inner-icon="mdi-account-group" :items="typeR"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-2" type="submit" color="primary">{{ form.id_member ? 'อัปเดต':'บันทึก' }}</v-btn>
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
                                <th class="border text-center">ชื่อ-นามสกุล</th>
                                <th class="border text-center">อีเมล</th>
                                <th class="border text-center">ชื่อผู้ใช้</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_member">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="border text-center">{{ items.email }}</td>
                                <td class="border text-center">{{ items.username }}</td>
                                <td class="border text-center">
                                    <center>
                                        <v-btn class="text-center ma-1" color="warning" size="small" @click="edit(items)">แก้ไข</v-btn>
                                        <v-btn class="text-center ma-1" color="error" size="small" @click="del(items.id_member)">ลบ</v-btn>
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
const typeR = ['กรรมการประเมิน']
const show = ref(false)
const showPw = ref(false)
const dataResult = ref([])
const search = ref('')
const token = import.meta.client ? localStorage.getItem('token'):null

const form = ref(
    {
        id_member:null,
        first_name:'',
        last_name:'',
        email:'',
        username:'',
        password:'',
        role:'',
    }
)

const reset = ()=>{
    form.value = {
        id_member:null,
        first_name:'',
        last_name:'',
        email:'',
        username:'',
        password:'',
        role:'',
    }
}

const emailRegex = /^[^\s]+@[^\s]+\.+[^\s]{2,}$/i

function validateForm(){
    error.value = {}
    const f = form.value

    if(!f.first_name.trim())error.value.first_name = 'กรุณากรอกชื่อ'
    if(!f.last_name.trim())error.value.last_name = 'กรุณากรอกนามสกุล'
    if(!f.email.trim())error.value.email = 'กรุณากรอกอีเมล'
    else if(!emailRegex.test(f.email.trim()))error.value.email = 'กรุณากรอกอีเมลให้ถูกต้อง'
    if(!f.username.trim())error.value.username = 'กรุณากรอกชื่อผู้ใช้'
    else if(f.username.trim().length < 4)error.value.username = 'ชื่อผู้ใช้ต้องยาวอย่างน้อย 4 ตัวอักษร'
    if(!f.password.trim())error.value.password = 'กรุณากรอกรหัสผ่าน'
    else if(f.password.trim().length < 6)error.value.password = 'รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร'

    if(!f.role)error.value.role = 'กรุณาเลือกประเภทสมาชิก'

    return Object.keys(error.value).length === 0
}

const saveMember = async()=>{
    if(!validateForm())return
    const f = form.value
    const payload = {
        first_name:f.first_name,
        last_name:f.last_name,
        email:f.email,
        username:f.username,
        password:f.password,
        role:f.role,
        ...(f.password ? {password:f.password}:null)
    }
    try {
        

        f.id_member
        ? await axios.put(`${staff}/member/update/${f.id_member}`,payload,{headers:{Authorization:`Bearer ${token}`}})
        : await axios.post(`${staff}/member/save`,{...payload,password:f.password},{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await reset()
        await fetch()

    } catch (error) {
        console.error("Error save Member",error)
    }
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/member/showC`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data
        
    } catch (error) {
        console.error("Error get MemberE",error)
    }
}

const result = computed(()=>{

    if(!search.value)return dataResult.value

    const s = search.value.toLowerCase()

    return dataResult.value.filter((item:any)=>{
        return(
            item.username?.toLowerCase().includes(s) ||
            item.first_name?.toLowerCase().includes(s) ||
            item.last_name?.toLowerCase().includes(s)
        )
    })
})


const edit = (items:any) =>{

    form.value = {...items}

}

const del = async(id_member:number)=>{
    if(!confirm("ต้องการลบข้อมูลชุดนี้ใช่หรือไม่"))return
    try {
        
        await axios.delete(`${staff}/member/delete/${id_member}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        await reset()

    } catch (error) {
        console.error("Error del MemberE",error)
    }
}

onMounted(fetch)

</script>

<style scoped>

</style>