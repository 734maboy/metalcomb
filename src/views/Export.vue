<template>
  <v-container
    fluid
  >
  <h1>Экспорт данных заказов</h1>
  <v-layout>
    <v-btn
      class="mb-5"
      color="primary"
      @click="saveTable"
    >
      Сохранить *.xlsx
    </v-btn>
  </v-layout>
  <v-data-table
    :headers="headers"
    :items="orders"
    :items-per-page="5"
    caption="Заказы"
    class="elevation-1"
    loading
    loading-text="Данные загружаются"
  ></v-data-table>
  </v-container>
</template>


<script>
  import { saveAs } from 'file-saver'
  import XLSX from 'xlsx'

export default {
  data() {
    return {
      headers: [
        {
            text: 'ID',
            align: 'left',
            value: 'id',
          },
        { text: 'Заказчик', value: 'customer.name' },
        { text: 'Ресурс', value: 'resource.name' },
        { text: 'Цена за тонну', value: 'pricePerTon' },
        { text: 'Масса (т)', value: 'tons' },
      ]
    }
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  },
  methods: {
    saveTable() {
      let wb = XLSX.utils.book_new();
      let worksheet = XLSX.utils.json_to_sheet(this.orders);
      XLSX.utils.book_append_sheet(wb, worksheet);
      XLSX.writeFile(wb, 'orders.xlsx');      
    }
  },
}
</script>
