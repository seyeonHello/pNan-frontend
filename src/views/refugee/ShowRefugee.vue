<template>
  <v-app style="background: #FFFF;">
    <v-row justify="center">
      <div id="show">
        <v-form id="showRefugee">
          <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs" :class="$vuetify.breakpoint.xs ? 'pa-0' : ''">
            <div class="card" style="height:auto;">
              <div class="card card--flat">
                <paginated-list :refugee-list="refugeeList"/>
              </div>
            </div>
          </v-container>
        </v-form>
      </div>
    </v-row>
  </v-app>
</template>

<script>

import axios from 'axios';
import PaginatedList from '@/components/PaginatedList';

export default {
  name: 'showRefugee',
  components: {
    PaginatedList
  },
  data () {
    return {
      refugeeList: []
    };
  },
  methods: {
    getAllRefugee () {
      axios.get('http://pNan-backend-dev.ap-northeast-2.elasticbeanstalk.com/api/v1/refugee')
        .then((res) => {
          console.log(res);
          this.refugeeList = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted () {
    this.getAllRefugee();
  }
};

</script>

<style scoped>
  *{
    text-align: center;
  }
  #show{
    position: absolute;
    text-align: center;
    vertical-align: center;
    horiz-align: center;
    width:1000px;
    margin:auto;
  }
</style>
