<template>
  <div class="login-wrapper">
    <a-tabs>
      <a-tab-pane key="1" tab="登录">
        <a-card class="login-card" :hoverable="false" :bordered="false">
          <h2 class="login-title">用户登录</h2>
          <div class="subtitle">助农销售管理后台</div>
          <a-form
            ref="form"
            @finish="handleLogin"
            :model="loginForm"
            :rules="formRules"
          >
            <a-form-item
              name="username"
              :rules="[{ required: true, message: '请输入用户名' }]"
            >
              <a-input
                v-model:value="loginForm.account"
                placeholder="请输入用户名"
                prefix="账号："
              />
            </a-form-item>

            <a-form-item
              name="password"
              :rules="[{ required: true, message: '请输入密码' }]"
            >
              <a-input
                v-model:value="loginForm.password"
                type="password"
                placeholder="请输入密码"
                prefix="密码："
              />
            </a-form-item>

            <a-form-item>
              <a-button
                type="primary"
                @click="login"
                html-type="submit"
                class="submit-button"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
          <div class="footer-links">
            <a href="#" class="forgot-password">忘记密码</a>
            <a href="#" class="register-account">注册账号</a>
          </div>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="2" tab="注册">
        <a-card class="login-card" :hoverable="false" :bordered="false">
          <h2 class="login-title">用户注册</h2>
          <div class="subtitle">助农销售管理后台</div>
          <a-form
            ref="form"
            @finish="handleRegister"
            :model="formData"
            :rules="formRules"
          >
            <a-form-item
              name="username"
              :rules="[{ required: true, message: '请输入用户名' }]"
            >
              <a-input
                v-model:value="formData.account"
                placeholder="请输入用户名"
                prefix="账号："
              />
            </a-form-item>
            <a-form-item
              name="password"
              :rules="[{ required: true, message: '请输入密码' }]"
            >
              <a-input
                v-model:value="formData.password"
                type="password"
                placeholder="请输入密码"
                prefix="密码："
              />
            </a-form-item>
            <a-form-item
              name="password2"
              :rules="[{ required: true, message: '请输入与上方相同密码' }]"
            >
              <a-input
                v-model:value="formData.password2"
                type="password"
                placeholder="请再次输入密码"
                prefix="确认密码："
              />
            </a-form-item>
            <a-form-item
              name="invitecode"
              :rules="[
                { message: '管理员账号需向后台申请邀请码，请联系管理员' },
              ]"
            >
              <a-input
                v-model:value="formData.invitecode"
                type="password"
                placeholder="管理员账号需要邀请码"
                prefix="(选填)邀请码："
              />
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                @click="register"
                class="submit-button"
              >
                注册
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import url(./index.scss);
</style>
