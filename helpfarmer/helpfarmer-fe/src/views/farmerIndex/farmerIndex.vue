<template>
  <div class="homepage">
    <!-- Statistics Section -->
    <a-row gutter="{16}" style="margin-bottom: 20px">
      <a-col :span="8">
        <a-card title="总用户数" bordered>
          <a-statistic :value="userCount" :precision="0" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="总销售额 (元)" bordered>
          <a-statistic :value="totalSales" :precision="2" prefix="¥" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="活跃用户数" bordered>
          <a-statistic :value="activeUsers" :precision="0" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script src="./index.js"></script>

<style scoped>
.homepage {
  padding: 20px;
  background-color: #f0f2f5;
}

a-row {
  margin-bottom: 20px;
}

a-card {
  margin: 10px 0;
}
</style>
