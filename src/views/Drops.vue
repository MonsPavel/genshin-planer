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
            <el-select v-model="item.dropIndex" v-if="item.dropType === 'Герои'" placeholder="Выберете героя" filterable>
                <el-option
                        v-for="item in heroes"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
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
        <button @click="$store.dispatch('auth/logout')">
            Выйти
        </button>
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
                    dropIndex: null
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
