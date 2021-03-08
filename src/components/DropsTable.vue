<template>
    <div>
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

        <EditDropModal :weapons="weapons" :heroes="heroes" :activeName="activeName" ref="editDrop" @drops:updated="getDrops()"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import EditDropModal from './EditDropModal'

    export default {
        name: 'DropsTable',

        components: {
            EditDropModal
        },

        computed: {
            ...mapGetters([
                'drops',
                'attempts'
            ])
        },

        props: {
            heroes: {
                type: Array
            },

            weapons: {
                type: Array
            },

            activeName: {
                type: String
            }
        },

        data() {
            return {
                loading: false
            }
        },

        methods: {
            async getDrops(name) {
                this.loading = true
                await this.$store.dispatch('drops/getDrops', name || this.activeName)
                    .then(() => {
                        this.loading = false
                    }).finally(() => this.loading = false)
            },
        },

        mounted() {
            this.getDrops()
        }
    }
</script>

<style scoped>

</style>
