<template>
  <div class="demo-page-wrapper">
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #toolbarButtons>
        <vxe-select
          v-model="selectRowSize"
          :options="dataOptions"
          @change="changeRowSizeEvent"
        ></vxe-select>
        <vxe-button status="primary" icon="vxe-icon-add" @click="addEvent"
          >新增</vxe-button
        >
        <vxe-button
          status="error"
          icon="vxe-icon-no-drop"
          @click="pendingSelect(true)"
          >标记删除</vxe-button
        >
        <vxe-button
          status="error"
          icon="vxe-icon-no-drop"
          @click="pendingSelect(false)"
          >取消标记</vxe-button
        >
        <vxe-button
          status="warning"
          icon="vxe-icon-lock"
          @click="changePassword"
        >
          修改用户密码
        </vxe-button>

        <vxe-button status="success" icon="vxe-icon-save" @click="saveEvent"
          >保存</vxe-button
        >
      </template>

      <template #active="{ row }">
        <vxe-button
          mode="text"
          status="error"
          icon="vxe-icon-delete"
          @click="removeRow(row)"
        ></vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { users } from '@/service'
import { ref, reactive, nextTick } from 'vue'
import VxeUI from 'vxe-pc-ui'

const gridRef = ref()
const selectRowSize = ref(10)
const dataOptions = ref([
  { label: '加载 3 行', value: 3 },
  { label: '加载 10 行', value: 10 },
  { label: '加载 20 行', value: 20 },
  { label: '加载 100 行', value: 100 },
])

const sexEditRender = reactive({
  name: 'VxeSelect',
  options: [
    { label: '女', value: '0' },
    { label: '男', value: '1' },
  ],
})
const characterEditRender = reactive({
  name: 'VxeSelect',
  options: [
    { label: '超级管理员', value: '超级管理员' },
    { label: '管理员', value: '管理员' },
    { label: '普通用户', value: '普通用户' },
  ],
})
const cityEditRender = reactive({
  name: 'VxeSelect',
  options: [
    { label: '深圳市', value: 'sz' },
    { label: '广州市', value: 'gz' },
    { label: '北京市', value: 'bj' },
    { label: '上海市', value: 'sh' },
    { label: '杭州市', value: 'hz' },
    { label: '石家庄市', value: 'sjz' },
    { label: '唐山市', value: 'ts' },
    { label: '天津市', value: 'tj' },
  ],
})
const gridOptions = reactive({
  border: true,
  loading: false,
  stripe: true,
  showOverflow: true,
  keepSource: true,
  height: '100%',
  columnConfig: {
    resizable: true,
  },
  rowConfig: {
    useKey: true,
    isHover: true,
  },
  toolbarConfig: {
    custom: true,
    slots: {
      buttons: 'toolbarButtons',
    },
  },
  checkboxConfig: {
    range: true,
  },
  editConfig: {
    mode: 'cell',
    trigger: 'dblclick',
    showStatus: true,
  },
  mouseConfig: {
    selected: true,
  },
  keyboardConfig: {
    isEdit: true,
    isArrow: true,
    isEnter: true,
    isBack: true,
    isDel: true,
    isEsc: true,
  },
  scrollX: {
    gt: 0,
    enabled: true,
  },
  scrollY: {
    gt: 0,
    mode: 'wheel',
    enabled: true,
  },
  editRules: {
    name: [{ required: true, content: '请输入名字' }],
  },
  columns: [
    { field: 'seq', type: 'seq', fixed: 'left', width: 60 },
    { field: 'checkbox', type: 'checkbox', fixed: 'left', width: 60 },
    {
      field: 'name',
      title: '名字',
      minWidth: 100,
      dragSort: true,
      editRender: { name: 'VxeInput' },
    },
    {
      field: 'account',
      title: '账号',
      minWidth: 120,
      dragSort: true,
      editRender: { name: 'VxeInput' },
    },
    {
      field: 'character',
      title: '身份',
      width: 120,
      editRender: characterEditRender,
    },
    {
      title: '基本信息',
      field: 'info',
      children: [
        {
          field: 'city',
          title: '所在地',
          width: 140,
          editRender: cityEditRender,
        },
        {
          field: 'age',
          title: '年龄',
          width: 120,
          editRender: { name: 'VxeNumberInput', props: { type: 'integer' } },
        },
        { field: 'sex', title: '性别', width: 120, editRender: sexEditRender },
        {
          field: 'email',
          title: '邮箱',
          width: 220,
          editRender: { name: 'VxeInput' },
        },
      ],
    },
    {
      field: 'active',
      title: '操作',
      fixed: 'right',
      width: 80,
      slots: { default: 'active' },
    },
  ],
})
const loadDataForm = async rSize => {
  gridOptions.loading = true
  try {
    const response = await users.list({ pageNo: 1, pageSize: rSize })
    const data = response.data.data || []
    if (Array.isArray(data)) {
      const $grid = gridRef.value
      if ($grid) {
        $grid.reloadData(data)
      }
    } else {
      console.error('返回的数据格式错误，应为一个数组', response)
      VxeUI.modal.message({
        content: '数据格式错误，无法加载',
        status: 'error',
      })
    }
  } catch (error) {
    console.error('数据加载失败:', error)
    VxeUI.modal.message({
      content: '加载数据失败',
      status: 'error',
    })
  } finally {
    gridOptions.loading = false
  }
}
const changeRowSizeEvent = () => {
  loadDataForm(selectRowSize.value)
}
const addEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const record = {
      name: '',
      character: '',
      account: '',
      password: '123456',
      city: '',
      age: '',
      sex: '',
      email: '',
    }
    const { row: newRow } = await $grid.insertAt(record, null)
    $grid.setEditRow(newRow)
  }
}
const pendingSelect = async checked => {
  const $grid = gridRef.value
  if ($grid) {
    const selectRecords = $grid.getCheckboxRecords()
    if (selectRecords.length) {
      $grid.setPendingRow(selectRecords, checked)
      $grid.clearCheckboxRow()
    } else {
      VxeUI.modal.message({
        content: '未选中数据',
        status: 'info',
      })
    }
  }
}
const removeRow = async row => {
  try {
    const { _id } = row
    await users.deletes(_id)
    gridRef.value.remove(row)
    VxeUI.modal.message({ content: '删除成功', status: 'success' })
    loadDataForm(selectRowSize.value)
  } catch (error) {
    console.error('删除失败:', error)
    VxeUI.modal.message({ content: '删除失败', status: 'error' })
  }
}

const saveEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const errMap = await $grid.validate(true)
    if (errMap) {
      return
    }
    const { insertRecords, updateRecords, removeRecords } = $grid.getRecordset()
    const pendingRecords = $grid.getPendingRecords()
    try {
      await Promise.all([
        ...insertRecords.map(record => users.add(record)),
        ...updateRecords.map(record => users.update(record)),
      ])
      if (insertRecords.length > 0) {
        VxeUI.modal.alert({
          title: '用户管理器',
          content: `新增：${insertRecords.length} 行，用户密码为后台测试专用密码:123456,请尽快修改！！！`,
        })
      } else {
        VxeUI.modal.alert({
          title: '用户管理器',
          content: `新增：${insertRecords.length} 行，已删除：${removeRecords.length} 行，待删除：${pendingRecords.length} 行，修改：${updateRecords.length} 行`,
        })
      }
      loadDataForm(selectRowSize.value)
    } catch (error) {
      console.error('保存失败', error)
      VxeUI.modal.message({
        content: '保存失败',
        status: 'error',
      })
    }
  }
}

const changePassword = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const selectedRecords = $grid.getCheckboxRecords() // 获取选中的行
    if (selectedRecords.length !== 1) {
      VxeUI.modal.message({
        content: '请选中单个用户进行密码修改',
        status: 'warning',
      })
      return
    }
    const user = selectedRecords[0]

    const newPassword = window.prompt(
      `请输入新密码（用户：${user.name || '未知'})`,
      ''
    )
    if (newPassword) {
      user.password = newPassword
      await users.update(user)
      VxeUI.modal.message({
        content: '密码修改成功！',
        status: 'success',
      })
    }
  } else {
    VxeUI.modal.message({
      content: '表格未加载完成，请稍后重试',
      status: 'error',
    })
  }
}
nextTick(() => {
  loadDataForm(selectRowSize.value)
})
</script>
<style lang="scss" scoped>
@import url(./index.scss);
</style>
