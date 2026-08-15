<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card color="#7d0c14">
                    <center><v-img src="/img/logo2.png" class="ma-3" width="20%"></v-img></center>
                    <v-card-title><h1 class="text-center text-h5">สมัครสมาชิก</h1></v-card-title>
                    <v-card-text class="bg-white">
                        <v-form @submit.prevent="saveMember">
                            <br>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ชื่อ" v-model="form.first_name" :error-messages="error.first_name" prepend-inner-icon="mdi-alpha-f"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="นามสกุล" v-model="form.last_name" :error-messages="error.last_name" prepend-inner-icon="mdi-alpha-"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="อีเมล" v-model="form.email" :error-messages="error.email" prepend-inner-icon="mdi-email"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ชื่อผู้ใช้" v-model="form.username" :error-messages="error.username" prepend-inner-icon="mdi-account"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="รหัสผ่าน" v-model="form.password" :error-messages="error.password" :prepend-inner-icon="show ? 'mdi-eye':'mdi-eye-off'" :type="showPw ? 'text':'password'" @click:prepend-inner="show = !show , showPw = !showPw"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="ยืนยันรหัสผ่าน" v-model="conP" :error-messages="error.conP" :prepend-inner-icon="show2 ? 'mdi-eye':'mdi-eye-off'" :type="showPw2 ? 'text':'password'" @click:prepend-inner="show2 = !show2 , showPw2 = !showPw2"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select label="ประเภทสมาชิก" v-model="form.role" :error-messages="error.role" prepend-inner-icon="mdi-account-group" :items="typeR"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-file-input label="รูปภาพสมาชิก" v-model="pic_user" :error-messages="error.pic_user" accept=".png , .jpg" hint="รองรับเฉพาะไฟล์ PNG และ JPG" persistent-hint></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-2" type="submit" color="primary">สมัครสมาชิก</v-btn>
                                        <v-btn class="text-center ma-2" type="reset" color="error">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                        <nuxt-link class="text-blue text-decoration-none" to="/"><p>หากมีบัญชีอยู่แล้ว? เข้าสู่ระบบ</p></nuxt-link>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api } from '~/API/base';

definePageMeta(
    {
        layout:false
    }
)

const error = ref<Record<string,string>>({})
const pic_user = ref<File | null>(null)
const typeR = ['ฝ่ายบุคลากร','ผู้รับการประเมินผล','กรรมการประเมิน']
const show = ref(false)
const show2 = ref(false)
const showPw = ref(false)
const showPw2 = ref(false)
const conP = ref('')

const form = ref(
    {
        first_name:'',
        last_name:'',
        email:'',
        username:'',
        password:'',
        role:'',
    }
)

const emailRegex = /^[^\s]+@[^\s]+\.+[^\s]{2,}$/i

function validateForm(){
    error.value = {}
    const f = form.value

    if(!f.first_name.trim())error.value.first_name = 'กรุณากรอกชื่อ'
    if(!f.last_name.trim())error.value.last_name = 'กรุณากรอกนามสกุล'
    if(!f.email.trim())error.value.email = 'กรุณากรอกอีเมล'
    else if(!emailRegex.test(f.email.trim()))error.value.email = 'กรุณากรอกอีเมลให้ถูกต้อง'
    if(!f.username.trim())error.value.username = 'กรุณากรอกชื่อผู้ใช้'
    else if(f.last_name.trim().length < 4)error.value.username = 'ชื่อผู้ใช้ต้องยาวอย่างน้อย 4 ตัวอักษร'
    if(!f.password.trim())error.value.password = 'กรุณากรอกรหัสผ่าน'
    else if(f.password.trim().length < 6)error.value.password = 'รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร'
    else if(f.password.trim() != conP.value.trim())error.value.conP = 'รหัสผ่านไม่ตรงกัน'

    if(!f.role)error.value.role = 'กรุณาเลือกประเภทสมาชิก'

    return Object.keys(error.value).length === 0
}

const saveMember = async()=>{
    if(!validateForm())return
    const formData = new FormData
    formData.append('form',JSON.stringify(form.value))
    formData.append('pic_user',pic_user.value!)
    try {
        
        await axios.post(`${api}/auth/regis`,formData)
        alert('ทำรายการสำเร็จ')
        navigateTo('/',{replace:true})

    } catch (error) {
        console.error("Error regis",error)
    }
}


</script>

<style scoped>

</style>