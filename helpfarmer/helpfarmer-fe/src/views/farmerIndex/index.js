import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'farmerIndex',
  setup() {
    const userCount = ref(1200)
    const totalSales = ref(35000.25)
    const activeUsers = ref(850)
    return { userCount, totalSales, activeUsers }
  },
})
