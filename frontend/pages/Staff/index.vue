<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-sheet class="pa-2" elevation="5">
                    <h1 class="text-center">DashBoard-Staff</h1>
                    <v-row>
                        <v-col cols="12" md="4" v-for="b in box" :key="b">
                            <v-card class="pa-2">
                                <h4 class="text-center text-h5 ma-1">{{ b.title }}</h4>
                                <h4 class="text-center text-h5 ma-1">{{ b.value }}</h4>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4" v-for="b in box2" :key="b">
                            <v-card class="pa-2">
                                <h4 class="text-center text-h5 ma-1">{{ b.title }}</h4>
                                <h4 class="text-center text-h5 ma-1">{{ b.value }}</h4>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api } from '~/API/base';

const token = import.meta.client ? localStorage.getItem('token'):null
const box = ref([])
const box2 = ref([])

const fetch = async()=>{

    try {
        const res = await axios.get(`${api}/dash/staff`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res.data.box
        box2.value = res.data.box2
    } catch (error) {
        console.error("Error get Box",error)
    }

}

onMounted(fetch)

</script>

<style scoped>

</style>