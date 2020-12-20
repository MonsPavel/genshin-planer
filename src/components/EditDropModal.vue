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
            <el-select v-model="item.dropIndex" v-if="item.dropType === 'Герои'" placeholder="Выберете героя" filterable>
                <el-option
                        v-for="item in heroes"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-input placeholder="Введите название оружия" class="weapon-input" v-if="item.dropType !== 'Герои'" v-model="item.name"></el-input>
            <el-select v-model="item.stars" v-if="item.dropType !== 'Герои'" placeholder="Количество звезд">
                <el-option
                        v-for="item in [3,4,5]"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-button @click="saveDrop()">Сохранить</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {type, heroes} from '../utils/constants'
    export default {
        name: 'EditDropModal',
        data() {
            return {
                centerDialogVisible: false,
                item: {},
                type,
                heroes
            }
        },

        methods: {
            openModal(drop) {
                this.centerDialogVisible = true
                this.item = drop
                this.item.type === 'weapon'
                    ? this.item.dropType = 'Оружие'
                    : this.item.dropType = 'Герои'
                if(this.item.dropType === 'Герои') {
                    this.item.dropIndex = this.heroes.findIndex(hero => hero.name === this.item.name) + 1
                }
            },

            saveDrop() {

            }
        }
    }
</script>

<style scoped>

</style>
