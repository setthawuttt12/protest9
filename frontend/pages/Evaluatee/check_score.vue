<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card-title><h1 class="text-h5 font-weight-bold">ตวรจสอบผลการประเมิน</h1></v-card-title>
                <div class="mt-2">
                    <nuxt-link to="/Evaluatee/Score_member"><v-btn color="blue">ตรวจสอบคะแนนประเมินตนเอง</v-btn></nuxt-link>&nbsp;&nbsp;
                    <nuxt-link to="/Evaluatee/Score_commit"><v-btn color="blue">ตรวจสอบคะแนนประเมินกรรมการประเมิน</v-btn></nuxt-link>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>