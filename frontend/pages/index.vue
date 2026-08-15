<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card color="#7d0c14">
                    <center><v-img src="/img/logo.png" class="ma-3" width="20%"></v-img></center>
                    <v-card-title><h1 class="text-center text-h5">NTC EVALUATION SYSTEM</h1><h2>ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</h2></v-card-title>
                    <v-card-text class="bg-white">
                        <v-alert type="error" variant="tonal" v-if="error">{{ error }}</v-alert>
                        <v-form @submit.prevent="login">
                            <br>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field label="ชื่อผู้ใช้" v-model="username" :error-messages="error.username" prepend-inner-icon="mdi-account"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field label="รหัสผ่าน" v-model="password" :error-messages="error.password" :prepend-inner-icon="show ? 'mdi-eye':'mdi-eye-off'" :type="showPw ? 'text':'password'" @click:prepend-inner="show = !show , showPw = !showPw"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-select label="ประเภทสมาชิก" v-model="role" :error-messages="error.role" prepend-inner-icon="mdi-account-group" :items="typeR"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-2" type="submit" color="primary">เข้าสู่ระบบ</v-btn>
                                        <v-btn class="text-center ma-2" type="reset" color="error">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                        <nuxt-link class="text-blue text-center text-decoration-none" to="/regis"><p>หากไม่มีบัญชีอยู่? เข้าสู่ระบบ</p></nuxt-link>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import auth from '~/API/auth';
import { api } from '~/API/base';

definePageMeta(
    {
        layout:false
    }
)

const error = ref('')
const pic_user = ref<File | null>(null)
const typeR = ['ฝ่ายบุคลากร','ผู้รับการประเมินผล','กรรมการประเมิน']
const show = ref(false)
const show2 = ref(false)
const showPw = ref(false)
const showPw2 = ref(false)
const username = ref('')
const password = ref('')
const role = ref('')

const login = async()=>{

    try {
        
        const res =  await auth.login(
            {
                username:username.value,
                password:password.value,
                role:role.value
            }
        )
        console.log("Login success",res.data)
        localStorage.setItem('token',res.data.token)
        const useRole = res.data.role
        if(useRole === 'ฝ่ายบุคลากร')useRouter().push('/Staff')
        else if(useRole === 'ผู้รับการประเมินผล')useRouter().push('/Evaluatee')
        else if(useRole === 'กรรมการประเมิน')useRouter().push('/Committee')
        alert('ทำรายการสำเร็จ')

    } catch (err:any) {
        console.error("Error login",err)
        error.value = err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ'
    }
}


</script>

<style scoped>

</style>