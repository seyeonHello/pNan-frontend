<template>
  <data-table
    :refugeeList="refugeeList"
    :tableHeaders="tableHeaders"
    :tableValues="tableValues">
  </data-table>
</template>

<script>

import axios from 'axios';
// import PaginatedList from '@/components/PaginatedList';
import DataTable from '@/components/DataTable';
export default {
  name: 'showRefugee',
  components: {
    'data-table': DataTable
  },
  data () {
    return {
      refugeeList: [],
      tableHeaders: [],
      tableValues: []
    };
  },
  methods: {
    getDateFormat (date) {
      function formating (num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
      }
      return date.getFullYear() + '-' + formating(date.getMonth() + 1) + '-' + formating(date.getDate());
    },
    getAllRefugee () {
      axios.get('/api/v1/refugee')
        .then((res) => {
          this.refugeeList = res.data;
          for (let i = 0; i < this.refugeeList.length; i++) {
            this.refugeeList[i].birth = this.getDateFormat(new Date(this.refugeeList[i].birth));
            this.refugeeList[i].createdAt = this.getDateFormat(new Date(this.refugeeList[i].createdAt));
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted () {
    this.getAllRefugee();
    this.tableHeaders = ['이름', '생년월일', '국적', '등록일자', '상태'];
    this.tableValues = ['name', 'birth', 'nationality', 'createdAt', 'status'];
  }
};

</script>

<style scoped>
  *{
    text-align: center;
  }
</style>
