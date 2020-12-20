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
                </template>
            </el-table-column>
        </el-table>

        <EditDropModal ref="editDrop"/>
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
                type,
                heroes
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
                if(this.item.dropType === 'Герои') {
                    if(!this.item.dropIndex) {
                        this.loading = false
                        return this.$notify({
                            message: 'Заполнены не все поля',
                            type: 'warning'
                        })
                    }
                } else {
                    if(!this.item.name || !this.item.stars) {
                        this.loading = false
                        return this.$notify({
                            message: 'Заполнены не все поля',
                            type: 'warning'
                        })
                    }
                }
            },

            addDrop() {
                this.loading = true
                this.validateDrop()
                let drop
                if(this.item.dropType === 'Герои') {
                    drop = {
                        type: 'heroes',
                        name: this.heroes[this.item.dropIndex - 1].name,
                        stars: this.heroes[this.item.dropIndex - 1].stars,
                        date: this.$moment().format('DD-MM-YYYY')
                    }
                } else {
                    drop = {
                        type: 'weapon',
                        name: this.item.name,
                        stars: this.item.stars,
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
