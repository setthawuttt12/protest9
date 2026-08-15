<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2 mb-3">
                    <v-card-title><h1 class="text-center text-h5 mb-1">ผู้รับการประเมินผล</h1></v-card-title>
                    <p>ชื่อ-สกุล:{{ header.first_name }} {{ header.last_name }}</p>
                    <p>รอบการประเมินที่:{{ header.round_sys }} ปี:{{ header.year_sys }}</p>
                </v-card>
                <v-card class="pa-2">
                    <v-card-title><h1 class="text-center text-h5">เพิ่มกรรมการ</h1></v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="saveMember">
                            <br>
                            <v-row v-for="(c,index) in List" :keys="index">
                                <v-col cols="12" md="6">
                                    <v-select :label="`กรรมการประเมินคนที่ ${index+1}`" v-model="c.id_member" :items="MEMBER(index).map((t)=>({title:`${t.fullname_commit}`,value:t.id_member}))"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select :label="`ตำแหน่งกรรมการคนที่ ${index+1}`" v-model="c.role" :error-messages="error.id_sys" :items="ROLE(index)"></v-select>
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
                    <v-table>
                        <thead>
                            <tr>
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">กรรมการประเมิน</th>
                                <th class="border text-center">ตำแหน่ง</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in List" :key="items.id_commit">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ nameOf(items.id_member) }}</td>
                                <td class="border text-center">{{ items.role }}</td>
                                <td class="border text-center">
                                    <center>
                                        <v-btn class="text-center ma-1" color="error" size="small" @click="del(items.id_commit)">ลบ</v-btn>
                                    </center>
                                </td>
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
const role = ['ประธาน','กรรมการ','เลขา']
const header = ref([])
const token = import.meta.client ? localStorage.getItem('token'):null
const people = ref([])
const id_eva = useRoute().params.id_eva

const List = ref(
    [
        {id_commit:null,id_member:'',role:''},
        {id_commit:null,id_member:'',role:''},
        {id_commit:null,id_member:'',role:''}
    ]
)

const nameMap = computed(()=> Object.fromEntries(people.value.map((p)=>[p.id_member,p.fullname_commit])))
const nameOf = (id:number) => nameMap.value[id]

const MEMBER = (idx:number)=>{

    const picked = List.value.map((c,i)=>(i !== idx ? c.id_member : null))
    return people.value.filter((p)=> !picked.includes(p.id_member))

}

const ROLE = (idx:number)=>{

    const picked = List.value.map((c,i)=>(i !== idx ? c.role : null))
    return role.filter((p)=> !picked.includes(p))

}



const saveMember = async()=>{
    try {
        

        await axios.post(`${staff}/commit/save/${id_eva}`,List.value,{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await fetch()

    } catch (error) {
        console.error("Error save commit",error)
    }
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/commit/header/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        header.value = res.data
        const res2 = await axios.get(`${staff}/commit/member/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        people.value = res2.data.pick
        const useData = res2.data.picked
        if(useData.length === 0){
            List.value = [
                {id_commit:null,id_member:'',role:''},
                {id_commit:null,id_member:'',role:''},
                {id_commit:null,id_member:'',role:''}
            ]
        }else{

            List.value = useData.map((c)=>(
                {id_commit:c.id_commit,id_member:c.id_member,role:c.role}
            ))

            while(List.value.length < 3){
                List.value.push({id_commit:null,id_member:'',role:''})
            }

        }
        
    } catch (error) {
        console.error("Error get show",error)
    }
}




const del = async(id_commit:number)=>{
    if(!confirm("ต้องการลบข้อมูลชุดนี้ใช่หรือไม่"))return
    try {
        
        await axios.delete(`${staff}/commit/delete/${id_commit}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()

    } catch (error) {
        console.error("Error del commit",error)
    }
}

const go =(id_eva:number)=>{

    navigateTo({path:`/Staff/Commit-eva-${id_eva}`})

}

onMounted(fetch)

</script>

<style scoped>

</style>