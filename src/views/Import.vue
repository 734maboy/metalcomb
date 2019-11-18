<template>
  <v-container
    fluid
  >
  <v-card
    class="mb-5"
    outlined
  >
    <v-card-title>Загрузите файл</v-card-title>
    <v-container>
      <v-file-input
        v-model="files"
        accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        label="*.xlsx файлы"
        placeholder="Excel"
        dense
        show-size
        prepend-icon="mdi-file-excel"
        outlined
        style="max-width: 600px"
      ></v-file-input>
        <v-btn
          :disabled="!files"
          small
          depressed
          color="blue lighten-2"
          @click="uploadFile"
        >Обработать файл</v-btn>
        <v-btn
          small
          depressed
          text
        >Загрузить записи</v-btn>
        <v-dialog
          v-model="loadingDialog"
          persistent
          width="300"
        >
          <v-card
            color="primary"
            dark
          >
            <v-card-text>
              Загрузка данных
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
    </v-container>
  </v-card>
    <v-card
      transition="slide-x-transition"
    >
      <v-card-title>Импорт данных заказов</v-card-title>
      <v-data-table
        no-data-text="Нет доступных данных"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import XLSX from 'xlsx'
import Axios from 'axios';

export default {
  data() {
    return {
      files: null,
      loadingDialog: false,
      headers: [
        { text: 'Заказчик', value: 'calories' },
        { text: 'Ресурс', value: 'fat' },
        { text: 'Цена за тонну', value: 'carbs' },
        { text: 'Масса', value: 'protein' },
      ]
    }
  },
  methods: {
    uploadFile() {
      this.loadingDialog = true;
      
      let reader = new FileReader();
      let workbook = null;

      reader.readAsArrayBuffer(this.files);

      reader.onloadend = () => {
        this.loadingDialog = false;
      }

      reader.onload = async () => {
        let arraybuffer = reader.result;
        let data = new Uint8Array(arraybuffer);
        let arr = [];
  
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        let bstr = arr.join("");
        
        workbook = XLSX.read(bstr, {type:"binary"});
        let jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]],{raw: true});  
        console.log(jsonData);

        let customers = await Axios.get('http://localhost:3000/customers');
        let resources = await Axios.get('http://localhost:3000/resources');
        
        let newOrders = mapOrderRecords(jsonData, customers, resources);
      };
    },

    createOrderRecords(newOrders, customers, resources) {

      let arr = [];
      
      for( let order of newOrders ) {
        let newOrderItem = {};

        let customer = customers.find( item => { item.name == order.customerId });
        let resource = resources.find( item => { item.name == order.resourceId });

        if ( customer != undefined ) {
          // ... add new to DB
        } else {
          // ... add prop customerId to newOrderItem
        }

        if ( resource != undefined ) {
          // ... add new to DB
        } else {
          // ... add prop resourceId to newOrderItem
        }
      }
    },

    findSameValue(arr, key, valueToFind) {
      return arr.find( item => { item[key] == valueToFind} );
    }
  },
}
</script>
