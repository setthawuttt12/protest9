<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="pa-2">
                    <v-card-title><h1 class="text-center text-h5">รายชื่อผู้รับการประเมิน</h1></v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">รายชื่อผู้รับการประเมิน</th>
                                    <th class="border text-center">รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border text-center">1</td>
                                    <td class="border text-center">รายงานผู้รับการประเมิน</td>
                                    <td class="border text-center">
                                        <center>
                                            <nuxt-link to="/Staff/Re_eva"><v-btn class="text-center ms-1" color="info" size="small">รายละเอียด</v-btn></nuxt-link>
                                        </center>
                                    </td>
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


</script>

<style scoped>

</style>