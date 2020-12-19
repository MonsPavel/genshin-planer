<template>
    <div class="app-container">
        <div>
            <el-select v-model="item.dropType">
                <el-option
                        v-for="item in type"
                        :key="item.type"
                        :label="item.type"
                        :value="item.type">
                </el-option>
            </el-select>
            <el-select v-model="item.drop" v-if="item.dropType === 'Герои'" placeholder="Выберете героя">
                <el-option
                        v-for="item in heroes"
                        :key="item.name"
                        :label="item.name"
                        :value="item">
                </el-option>
            </el-select>
<!--            <el-select v-model="item.drop.stars" disabled v-if="item.dropType === 'Герои'"placeholder="Количество звезд">-->
<!--                <el-option-->
<!--                        v-for="stars in [4,5]"-->
<!--                        :key="item.name"-->
<!--                        :label="item.name"-->
<!--                        :value="item">-->
<!--                </el-option>-->
<!--            </el-select>-->
            <el-input placeholder="Please input" v-if="item.dropType !== 'Герои'" v-model="item.drop.name"></el-input>
            <el-button @click="addDrop()">Сохранить</el-button>
        </div>
<!--        <el-table-->
<!--                :data="tableData"-->
<!--                border-->
<!--                style="width: 100%">-->
<!--            <el-table-column-->
<!--                    prop="date"-->
<!--                    label="Date"-->
<!--                    width="180">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="name"-->
<!--                    label="Name"-->
<!--                    width="180">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="address"-->
<!--                    label="Address">-->
<!--            </el-table-column>-->
<!--        </el-table>-->
    </div>
</template>

<script>
    import {type, heroes} from '../utils/constants'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Drops',
        data() {
            return {
                item: {
                    dropType: 'Герои',
                    drop: {}
                },
                type,
                heroes
            }
        },

        computed: {
            ...mapGetters([
                'drops'
            ])
        },

        mounted() {
            this.$store.dispatch('drops/getDrops')
        },
        methods: {
            addDrop() {
                const drop = {
                    name: this.item.drop.name,
                    stars: this.item.drop.stars
                }

                this.$store.dispatch('drops/addDrop', drop)
            },
        }
    }
</script>

<style scoped>

</style>
