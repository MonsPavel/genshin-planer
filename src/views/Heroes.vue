<template>
    <div>
        <div class="add-hero">
            <el-input placeholder="Введите имя героя" class="weapon-input" v-model="hero.name"></el-input>
            <el-select v-model="hero.stars" placeholder="Количество звезд">
                <el-option
                        v-for="item in [4,5]"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-button @click="addHero()">Сохранить</el-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Heroes',

        data() {
            return {
                hero: {
                    stars: null,
                    name: null
                }
            }
        },

        computed: {
            ...mapGetters([
                'heroes'
            ])
        },

        methods: {
            async getHeroes() {
                await this.$store.dispatch('heroes/getHeroes')
                    .then(() => {
                        this.loading = false
                    }).finally(() => this.loading = false)
            },

            addHero() {
                this.$store.dispatch('heroes/addHero', this.hero)
                    .then((resp) => {
                        this.hero = {
                            stars: null,
                            name: null
                        }

                        this.getHeroes()
                    })
            },
        },

        mounted() {
            this.getHeroes()
        }
    }
</script>

<style scoped>

</style>
