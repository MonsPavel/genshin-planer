<template>
    <div class="app-container">
        <div>
            <button @click="getFilteredDrops()">Показать 5</button>
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
            <el-input placeholder="Please input" v-if="item.dropType !== 'Герои'" v-model="item.name"></el-input>
            <el-select v-model="item.stars" v-if="item.dropType !== 'Герои'" placeholder="Количество звезд">
                <el-option
                        v-for="item in [3,4,5]"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-button @click="addDrop()">Сохранить</el-button>
        </div>
        <span>{{ attempts }}</span>
        <el-table
                v-loading="loading"
                :data="drops"
                element-loading-text="Loading"
                border
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="Name"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="stars"
                    label="stars">
            </el-table-column>
        </el-table>
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
                loading: true,
                type,
                heroes
            }
        },

        computed: {
            ...mapGetters([
                'drops',
                'attempts'
            ])
        },

        mounted() {
            this.getDrops()
        },
        methods: {
            async getDrops() {
                await this.$store.dispatch('drops/getDrops')
                    .then(() => {
                        this.loading = false
                    })
            },

            getFilteredDrops() {
                this.$store.dispatch('drops/getFilteredDrops')
            },

            addDrop() {
                this.loading = true
                let drop
                if(this.item.dropType === 'Герои') {
                    drop = {
                        name: this.heroes[this.item.dropIndex - 1].name,
                        stars: this.heroes[this.item.dropIndex - 1].stars
                    }
                } else {
                    drop = {
                        name: this.item.name,
                        stars: this.item.stars
                    }
                }

                this.$store.dispatch('drops/addDrop', drop)
                    .then((resp) => {
                        this.getDrops()
                    })
            },
        }
    }
</script>

<style scoped>

</style>
