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
      <template #image="{ row }">
        <img
          v-if="row.imageUrl"
          :src="row.imageUrl"
          alt="商品图片"
          style="width: 50px; height: 50px"
        />
        <vxe-button
          mode="text"
          status="primary"
          icon="vxe-icon-upload"
          @click="uploadImage(row)"
          >上传图片</vxe-button
        >
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { VxeUI } from 'vxe-pc-ui'
import { goods } from '@/service'
const gridRef = ref()
const selectRowSize = ref(10)
//表格
const dataOptions = ref([
  { label: '加载 3 行', value: 3 },
  { label: '加载 10 行', value: 10 },
  { label: '加载 20 行', value: 20 },
  { label: '加载 100 行', value: 100 },
])
const flag1CellRender = reactive({
  name: 'VxeSwitch',
  props: { value: true },
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
      title: '商品名称',
      minWidth: 150,
      dragSort: true,
      editRender: { name: 'VxeInput' },
    },
    {
      title: '基本信息',
      field: 'info',
      children: [
        {
          field: 'image',
          title: '商品图片',
          width: 150,
          slots: { default: 'image' }, // 使用插槽显示图片和上传按钮
        },
        {
          field: 'description',
          title: '描述',
          width: 140,
          editRender: { name: 'VxeInput' },
        },
        {
          field: 'city',
          title: '生产地',
          width: 140,
          editRender: cityEditRender,
        },
        {
          field: 'count',
          title: '数量',
          width: 140,
          editRender: { name: 'VxeNumberInput', props: { type: 'number' } },
        },
        {
          field: 'price',
          title: '价格',
          width: 120,
          editRender: { name: 'VxeNumberInput', props: { type: 'float' } },
        },
        {
          field: 'production',
          title: '厂商',
          width: 150,
          editRender: { name: 'VxeInput' },
        },
      ],
    },
    {
      field: 'flag',
      title: '是否上架',
      width: 140,
      cellRender: flag1CellRender,
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
//上传图片
const uploadImage = async row => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async event => {
    const file = event.target.files[0]
    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await goods.uploadImage(formData)
        row.imageUrl = response.data.url // 更新图片 URL
        console.log(row.imageUrl);
        console.log('-000000000000000000');
        VxeUI.modal.message({ content: '图片上传成功', status: 'success' })
      } catch (error) {
        console.error('图片上传失败:', error)
        VxeUI.modal.message({ content: '图片上传失败', status: 'error' })
      }
    }
  }
  input.click()
}
//查找
// const loadDataForm = async rSize => {
//   gridOptions.loading = true
//   try {
//     const response = await goods.list({ pageNo: 1, pageSize: rSize })
//     const data = response.data.data || []
//     if (Array.isArray(data)) {
//       const $grid = gridRef.value
//       if ($grid) {
//         $grid.reloadData(data)
//       }
//     } else {
//       console.error('返回的数据格式错误，应为一个数组', response)
//       VxeUI.modal.message({
//         content: '数据格式错误，无法加载',
//         status: 'error',
//       })
//     }
//   } catch (error) {
//     console.error('数据加载失败:', error)
//     VxeUI.modal.message({
//       content: '加载数据失败',
//       status: 'error',
//     })
//   } finally {
//     gridOptions.loading = false
//   }
// }
const loadDataForm = async rSize => {
  gridOptions.loading = true
  try {
    const response = await goods.list({ pageNo: 1, pageSize: rSize })
    const data = response.data.data || []
    if (Array.isArray(data)) {
      const $grid = gridRef.value
      if ($grid) {
        // 确保每个商品记录的图片 URL 都加载并显示
        data.forEach(item => {
          if (item.image) {
            item.imageUrl = item.image // 如果商品数据中有图片字段，更新图片 URL
          }
        })
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

//更改加载行数
const changeRowSizeEvent = () => {
  loadDataForm(selectRowSize.value)
}
//增加空白行
// const addEvent = async () => {
//   const $grid = gridRef.value
//   if ($grid) {
//     const record = {
//       name: '',
//       description: '',
//       price: '',
//       city: '',
//       flag: false,
//       count: '',
//     }
//     const { row: newRow } = await $grid.insertAt(record, null)
//     $grid.setPendingRow(newRow)
//   }
// }
const addEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const record = {
      name: '',
      description: '',
      price: '',
      city: '',
      farmer: '',
      flag: false,
      count: '',
      image: '', // 初始化图片 URL
    }
    const { row: newRow } = await $grid.insertAt(record, null)
    $grid.setPendingRow(newRow)
  }
}
//选中数据
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
//移出一行
const removeRow = async row => {
  try {
    const { _id } = row
    await goods.deletes(_id)
    gridRef.value.remove(row)
    VxeUI.modal.message({ content: '删除成功', status: 'success' })
    loadDataForm(selectRowSize.value)
  } catch (error) {
    console.error('删除失败:', error)
    VxeUI.modal.message({ content: '删除失败', status: 'error' })
  }
}
//保存，(修改，添加)
// const saveEvent = async () => {
//   const $grid = gridRef.value
//   if ($grid) {
//     const errMap = await $grid.validate(true)
//     if (errMap) {
//       return
//     }
//     const { insertRecords, updateRecords, removeRecords } = $grid.getRecordset()
//     const pendingRecords = $grid.getPendingRecords()
//     try {
//       await Promise.all([
//         ...insertRecords.map(record => goods.add(record)),
//         ...updateRecords.map(record => goods.update(record)),
//       ])
//       VxeUI.modal.alert({
//         title: '商品管理器',
//         content: `新增：${insertRecords.length} 行，已删除：${removeRecords.length} 行，待删除：${pendingRecords.length} 行，修改：${updateRecords.length} 行`,
//       })
//       loadDataForm(selectRowSize.value)
//     } catch (error) {
//       console.error('保存失败', error)
//       VxeUI.modal.message({
//         content: '保存失败',
//         status: 'error',
//       })
//     }
//   }
// }
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
        ...insertRecords.map(record => {
          const formData = new FormData()
          for (const key in record) {
            if (key === 'image' && record[key]) {
              formData.append('images', record[key])
            } else {
              formData.append(key, record[key])
            }
          }
          return goods.add(formData)
        }),
        ...updateRecords.map(record => {
          const formData = new FormData()
          for (const key in record) {
            if (key === 'image' && record[key]) {
              formData.append('images', record[key])
            } else {
              formData.append(key, record[key])
            }
          }
          return goods.update(formData)
        }),
      ])
      VxeUI.modal.alert({
        title: '商品管理器',
        content: `新增：${insertRecords.length} 行，已删除：${removeRecords.length} 行，待删除：${pendingRecords.length} 行，修改：${updateRecords.length} 行`,
      })
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
nextTick(() => {
  loadDataForm(selectRowSize.value)
})
</script>
<style lang="scss" scoped>
@import url(./index.scss);
</style>
