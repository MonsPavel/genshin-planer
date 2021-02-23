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
        <div class="drop-attempts" >
            <span>Количество молитв после легендарного дропа: {{ attempts || 'нет' }}</span>
        </div>
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
                    label="Type"
            >
                <template slot-scope="scope">
                    {{ scope.row.type === 'heroes' ? 'Герой' : 'Оружие' }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="Name"
                    >
            </el-table-column>
            <el-table-column
                    prop="stars"
                    label="stars"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="Дата"
                    width="180">
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="Управление" width="200">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" circle @click="editDrop(scope.row)"></el-button>
                    <el-popconfirm
                            confirm-button-text='OK'
                            cancel-button-text='No, Thanks'
                            icon="el-icon-info"
                            icon-color="red"
                            title="Are you sure to delete this?"
                            @confirm="deleteDrop(scope.row.key)"
                    >
                        <el-button icon="el-icon-delete" slot="reference" circle></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <EditDropModal ref="editDrop" @drops:updated="getDrops()"/>
    </div>
</template>

<script>
    import {type, heroes} from '../utils/constants'
    import {mapGetters} from 'vuex'
    import EditDropModal from '../components/EditDropModal'
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
                type
            }
        },

        components: {
            EditDropModal
        },

        computed: {
            ...mapGetters([
                'drops',
                'attempts'
            ])
        },

        mounted() {
            this.getDrops()
            this.getData()
        },
        methods: {
            async getDrops() {
                await this.$store.dispatch('drops/getDrops')
                    .then(() => {
                        this.loading = false
                    }).finally(() => this.loading = false)
            },

            getFilteredDrops() {
                this.$store.dispatch('drops/getFilteredDrops')
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

                this.$store.dispatch('drops/addDrop', drop)
                    .then((resp) => {
                        this.getDrops()

                    })
            },

            editDrop(drop) {
                this.$refs.editDrop.openModal(drop)
            },

            deleteDrop(key) {
                this.$store.dispatch('drops/deleteDrop', key)
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
            max-height: calc(100vh - 150px);
            overflow: auto;
        }
    }
</style>
