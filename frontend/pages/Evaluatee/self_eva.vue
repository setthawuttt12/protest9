<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form @submit.passive="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { eva } from '~/API/base';


const saveScore = async()=>{

}
</script>

<style scoped>

</style>