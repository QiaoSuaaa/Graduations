<template>
  <div class="usage-documentation">
    <a-page-header title="说明文档" sub-title="如何使用系统"> </a-page-header>

    <a-divider />

    <section class="description">
      <h2>首先是用户管理</h2>
      <p>在这里你可以对用户进行修改，如果是管理员的话</p>
    </section>

    <a-divider />

    <section class="usage">
      <h2>商品管理</h2>
      <p>进入商品管理页面</p>
      <ul>
        <li>增加商品</li>
        <li>修改商品</li>
        <li>删除商品</li>
      </ul>
    </section>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.usage-documentation {
  margin: 20px;
  font-family: Arial, sans-serif;
}

.description,
.usage,
.example {
  margin-bottom: 20px;
  ul {
    font-size: 16px;
    text-align: center;
    list-style: none;
    padding-left: 0;
  }
}

code {
  display: block;
  white-space: pre-wrap;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}

a-page-header {
  background-color: #f0f2f5;
  padding: 16px;
}

h2 {
  color: #333;
}

a-button {
  margin-top: 10px;
}
</style>
