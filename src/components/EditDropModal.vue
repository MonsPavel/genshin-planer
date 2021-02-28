<template>
    <el-dialog
            title="Редактирование"
            :visible.sync="centerDialogVisible"
            width="50%"
            center>
        <div class="add-drop">
            <el-select v-model="item.dropType">
                <el-option
                        v-for="item in type"
                        :key="item.type"
                        :label="item.type"
                        :value="item.type">
                </el-option>
            </el-select>
            <el-select v-model="item.name" v-if="item.dropType === 'heroes'" placeholder="Выберете героя" filterable>
                <el-option
                        v-for="(item, index) in heroes"
                        :key="item.name"
                        :label="item.name"
                        :value="index">
                </el-option>
            </el-select>
            <el-select v-model="item.name" v-else placeholder="Выберете оружие" filterable>
                <el-option
                        v-for="(item, index) in weapons"
                        :key="item.name"
                        :label="item.name"
                        :value="index">
                </el-option>
            </el-select>
            <el-button @click="saveDrop()">Сохранить</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {type} from '../utils/constants'
    export default {
        name: 'EditDropModal',

        props: {
            heroes: {
              type: Array,
              required: false
            },
            weapons: {
                type: Array,
                required: false
            },
            activeName: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                centerDialogVisible: false,
                item: {},
                type
            }
        },

        methods: {
            openModal(drop) {
                this.centerDialogVisible = true
                this.item = drop
                if(this.item.dropType === 'Герои') {
                    this.item.dropIndex = this.heroes.findIndex(hero => hero.name === this.item.name) + 1
                } else {
                    this.item.dropIndex = this.weapons.findIndex(hero => hero.name === this.item.name) + 1
                }
            },

            saveDrop() {
                let drop
                let type = this.activeName
                const id = this.item.key
                if(this.item.dropType === 'Герои') {
                    drop = {
                        type: this.item.type,
                        name: this.heroes[this.item.dropIndex - 1].name,
                        stars: this.heroes[this.item.dropIndex - 1].stars,
                        date: this.item.date,
                        id: id
                    }
                } else {
                    drop = {
                        type: this.item.type,
                        name: this.weapons[this.item.dropIndex - 1].name,
                        stars: this.weapons[this.item.dropIndex - 1].stars,
                        date: this.item.date,
                        id: id
                    }
                }

                this.$store.dispatch('drops/updateDrop', {drop, type: this.activeName})
                    .then(resp => {
                        this.$emit('drops:updated')
                        this.centerDialogVisible = false
                    })
            }
        }
    }
</script>

<style scoped>

</style>
