<template>
    <div class="app-container drops">
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
                        v-for="(item, index) in heroes"
                        :key="item.name"
                        :label="item.name"
                        :value="index">
                </el-option>
            </el-select>
            <el-select v-model="item.dropIndex" v-else placeholder="Выберете оружие" filterable>
                <el-option
                        v-for="(item, index) in weapons"
                        :key="item.name"
                        :label="item.name"
                        :value="index">
                </el-option>
            </el-select>
            <el-button @click="addDrop()">Сохранить</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="Standard" name="Standard">
                <DropsTable ref="Standard" :weapons="weapons" :heroes="heroes" :activeName="activeName"/>
            </el-tab-pane>
            <el-tab-pane label="Limit" name="Limit">
                <DropsTable ref="Limit" :weapons="weapons" :heroes="heroes" :activeName="activeName"/>
            </el-tab-pane>
            <el-tab-pane label="Weapon" name="Weapon">
                <DropsTable ref="Weapon"  :weapons="weapons" :heroes="heroes" :activeName="activeName"/>
            </el-tab-pane>
        </el-tabs>

        <EditDropModal :weapons="weapons" :heroes="heroes" :activeName="activeName" ref="editDrop" @drops:updated="getDrops()"/>
    </div>
</template>

<script>
    import {type} from '../utils/constants'
    import {mapGetters} from 'vuex'
    import EditDropModal from '../components/EditDropModal'
    import DropsTable from '../components/DropsTable'
    export default {
        name: 'Drops',
        data() {
            return {
                item: {
                    dropType: 'Герои',
                    dropIndex: null
                },
                loading: true,
                weapons: [],
                heroes: [],
                activeName: 'Standard',
                type
            }
        },

        components: {
            EditDropModal,
            DropsTable
        },

        mounted() {
            this.getData()
        },
        methods: {
            getFilteredDrops() {
                this.$store.dispatch('drops/getFilteredDrops')
            },

            changeTab() {
                this.$refs[this.activeName].getDrops(this.activeName)
            },

            validateDrop() {
                if(!this.item.dropIndex) {
                    this.loading = false
                    return this.$notify({
                        message: 'Заполнены не все поля',
                        type: 'warning'
                    })
                }
            },

            addDrop() {
                this.loading = true
                this.validateDrop()
                let drop
                if(this.item.dropType === 'Герои') {
                    drop = {
                        type: 'heroes',
                        name: this.heroes[this.item.dropIndex].name,
                        stars: this.heroes[this.item.dropIndex].stars,
                        date: this.$moment().format('DD-MM-YYYY')
                    }
                } else {
                    drop = {
                        type: 'weapon',
                        name: this.weapons[this.item.dropIndex].name,
                        stars: this.weapons[this.item.dropIndex].stars,
                        date: this.$moment().format('DD-MM-YYYY')
                    }
                }

                this.$store.dispatch('drops/addDrop', {drop, type: this.activeName})
                    .then((resp) => {
                        this.$refs[this.activeName].getDrops(this.activeName)
                    })
            },

            editDrop(drop) {
                console.log(drop)
                this.$refs.editDrop.openModal(drop)
            },

            async deleteDrop(key) {
                await this.$store.dispatch('drops/deleteDrop', {key, type: this.activeName})
                    .then(() => {
                        this.$refs[this.activeName].getDrops(this.activeName)
                    })
            },

            async getData() {
                await this.$store.dispatch('weapons/getWeapons')
                    .then(() => {
                        this.weapons = this.$store.state.weapons.weapons
                        this.loading = false
                    }).finally(() => this.loading = false)

                await this.$store.dispatch('heroes/getHeroes')
                    .then(() => {
                        this.heroes = this.$store.state.heroes.heroes
                        this.loading = false
                    }).finally(() => this.loading = false)
            }
        }
    }
</script>

<style lang="scss">
    .drops {
        .add-drop {
            display: flex;

            & .el-select, .el-button, .el-input{
                margin-right: 20px;
            }

            &> .el-input{
                width: 300px;
            }
        }

        .drop-attempts {
            display: flex;
            justify-content: right;
            padding: 10px 0;
            & > span {
                width: 100%;
                text-align: end;
            }
        }

        .el-table {
            max-height: calc(100vh - 175px);
            overflow: auto;
        }
    }
</style>
