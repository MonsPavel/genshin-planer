<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="username">
                <!--                <span class="svg-container">-->
                <!--                  <svg-icon icon-class="user" />-->
                <!--                </span>-->
                <el-input
                        ref="username"
                        v-model="loginForm.email"
                        placeholder="Email"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                />
            </el-form-item>
            <el-form-item prop="password">
                <!--                <span class="svg-container">-->
                <!--                  <svg-icon icon-class="password" />-->
                <!--                </span>-->
                <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter.native="handleLogin"
                />
                <!--                <span class="show-pwd" @click="showPwd">-->
                <!--                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
                <!--                </span>-->
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="registerNewUser">Register</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Register.vue",

        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                loginRules: {
                    login: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
                },
                loading: false,
                passwordType: 'password',
                redirect: undefined
            }
        },

        methods: {
            async registerNewUser() {
                this.$store.dispatch('auth/register', this.loginForm)
                    .then(repsonse => {

                    }).catch(err => {

                    })
            }
        }
    }
</script>

<style scoped>

</style>