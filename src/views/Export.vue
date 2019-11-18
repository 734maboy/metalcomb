<template>
  <v-container
    fluid
  >
  <v-card>
    <v-card-title>Экспорт данных заказов</v-card-title>
    <v-layout>
      <v-btn
        class="mb-5 ml-2"
        elevation="0"
        text
        color="primary"
        @click="saveTable"
      >
        Сохранить *.xlsx
      </v-btn>
    </v-layout>
    <v-data-table
      no-data-text="Нет доступных данных"
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      caption="Заказы"
      class="elevation-1"
      loading
      loading-text="Данные загружаются"
    ></v-data-table>
  </v-card>
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

      let clonedOrders = JSON.parse(JSON.stringify(this.orders));

      clonedOrders.map( (item) => {
        item.customerId = item.customer.name;        
        item.resourceId = item.resource.name;

        item.customer = undefined;        
        item.resource = undefined;
        item.id = undefined;

        return item;        
      });

      console.log(clonedOrders);
      
      let worksheet = XLSX.utils.json_to_sheet( JSON.parse( JSON.stringify( clonedOrders ) ) );

      XLSX.utils.book_append_sheet(wb, worksheet);
      XLSX.writeFile(wb, 'orders.xlsx');      
    }
  },
}
</script>
