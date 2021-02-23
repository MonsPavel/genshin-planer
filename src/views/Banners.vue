<template>
    <div class="banners">
        <el-tabs type="card" @tab-click="handleClick">
            <el-tab-pane label="Standard">
                <div class="banners-wrap">
                    <div class="banners-left">
                        <draggable v-model="weapons" @start="drag=true" @end="drag=false">
                            <div v-for="(weapon, index) in weapons" class="banners-card">{{weapon.name}}<button @click="addToBanner('weapons', index)">Добавить</button></div>
                        </draggable>
                        <draggable v-model="heroes" @start="drag=true" @end="drag=false">
                            <div v-for="(hero, index) in heroes"class="banners-card">{{hero.name}}<button @click="addToBanner('heroes', index)">Добавить</button></div>
                        </draggable>
                    </div>
                    <div class="banners-right">
                        <draggable class="list-group" v-model="standart">
                            <div v-for="item in standart" class="banners-card">{{item.name}}</div>
                        </draggable>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Limit">Limit</el-tab-pane>
            <el-tab-pane label="Weapon">Weapon</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: 'Banners',

        components: {
            draggable,
        },

        data() {
            return {
                standart: [],
                weapons: [],
                heroes: []
            }
        },

        methods: {
            handleClick() {

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
            },

            addToBanner(type, index) {
                this.standart.push(this[type][index])
                this[type].splice(index, 1)
            }
        },

        mounted() {
            this.getData()
        }
    }
</script>

<style lang="sass">
    .banners
        &-wrap
            display: flex
            flex-direction: row
        &-left,
        &-right
            width: 45%
            margin: 0 auto
            min-width: 300px
        &-card
            border: 1px solid black
            padding: 10px 5px
            margin-bottom: 10px

</style>
