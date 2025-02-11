<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="left-container">
        <div class="logo">
          <img src="@/assets/header-logo.png" alt="Logo" />
        </div>
        <h2 class="system-title">助农销售管理系统</h2>
      </div>
      <div class="right-container">
        <a-dropdown>
          <span class="role-dropdown" @click.prevent>
            角色：<span class="role-name">{{ userCharacters }}</span>
            <down-outlined />
          </span>
          <template #overlay>
            <a-menu>
              <a-menu-item key="admin">超级管理员</a-menu-item>
              <a-menu-item key="user">管理员</a-menu-item>
              <a-menu-item key="guest">普通用户</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <!-- 点击头像的下拉菜单 -->
        <a-dropdown placement="bottomRight" :trigger="['click']">
          <a class="avatar-link ant-dropdown-link" @click.prevent>
            <span class="role-name" style="margin-right: 8px" @click.prevent
              >用户:&nbsp;{{ userName }}</span
            >
            <a-avatar :size="40">
              <template #icon>
                <img src="@/assets/fruit-icon.png" alt="avatar" />
              </template>
            </a-avatar>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="profile">
                <router-link to="/profile">个人中心</router-link>
              </a-menu-item>
              <a-menu-item key="settings">
                <router-link to="/settings">系统设置</router-link>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout">
                <a @click="handleLogout">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          class="allNav"
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item key="1">
            <span>
              <desktop-outlined />
              <router-link to="/home">&nbsp; 回到首页</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="2">
            <span>
              <user-outlined />
              &nbsp;<router-link to="/document">使用文档</router-link>
            </span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                <span>用户管理</span>
              </span>
            </template>
            <a-menu-item key="3">
              <router-link to="/users">用户管理</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <team-outlined />
                <span>商品管理 </span>
              </span>
            </template>
            <a-menu-item key="6"
              ><router-link to="/goods">商品修改</router-link></a-menu-item
            >
          </a-sub-menu>
          <a-menu-item key="9">
            <file-outlined />
            <span @click="logout">&nbsp;退出</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '580px' }"
          >
            <router-view />
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          助农销售管理系统 ©22105010291 李博雨
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import url(./index.scss);
</style>
