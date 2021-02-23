<template>
    <div>
        <div class="add-weapon">
            <el-input placeholder="Введите название оружия" class="weapon-input" v-model="weapon.name"></el-input>
            <el-select v-model="weapon.stars" placeholder="Количество звезд">
                <el-option
                        v-for="item in [3,4,5]"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-button @click="addWeapon()">Сохранить</el-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Weapons',

        data() {
            return {
                weapon: {
                    stars: null,
                    name: null
                }
            }
        },

        computed: {
            ...mapGetters([
                'weapons'
            ])
        },

        methods: {
            async getWeapons() {
                await this.$store.dispatch('weapons/getWeapons')
                    .then(() => {
                        this.loading = false
                    }).finally(() => this.loading = false)
            },

            addWeapon() {
                this.$store.dispatch('weapons/addWeapon', this.weapon)
                    .then((resp) => {
                        this.weapon.name = null
                    })
            }
        },

        mounted() {
            this.getWeapons()
        }
    }
</script>

<style scoped>

</style>
