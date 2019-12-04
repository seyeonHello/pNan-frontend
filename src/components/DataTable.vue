<template>
  <div id="data-table-card">
    <v-card-title id="data-table-title">
      {{title}}
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn color="primary" id="btn-new" v-on:click="onClickNewButton">New</v-btn>
      <v-text-field
        v-model="search"
        label="Search"
        outlined=""
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      id="data-table"
      height="'100%'"
      :headers="tableHeaders"
      :items="tableData"
      :search="search"
      :items-per-page="10"
      :href="link">
      <template v-slot:item.action="{ item }">
        <v-btn text icon color="gray" v-on:click="detailRefugee(item)">
          <v-icon small>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn text icon color="gray" v-on:click="editItem(item)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn text icon color="gray" v-on:click="deleteItem(item)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-overlay
      :absolute="absolute"
      :value="overlay"
    >
      <Overlay v-on:close="onClickNewButton"
      >
        <slot/>
      </Overlay>
    </v-overlay>
    <v-overlay
      :absolute="absolute"
      :value="overlayTest"
    >
      <Overlay v-on:close="detailRefugee"
      >
        <h4>"{{refugeeName}}"님의 기록사항 입니다.</h4>
        <v-textarea
          background-color="grey lighten-2"
          color="black"
          v-model="refugeeDetail"
        ></v-textarea>
        <v-btn color="blue darken-1" dark @click="save">save</v-btn>
      </Overlay>
    </v-overlay>
  </div>
</template>

<script>
import Overlay from './Overlay';
import axios from 'axios';
export default {
  name: 'data-table',
  components: { Overlay },
  props: {
    title: String,
    tableData: Array,
    tableHeaders: Array
  },
  data () {
    return {
      absolute: false,
      overlay: false,
      overlayTest: false,
      refugeeName: '',
      refugeeDetail: '',
      link: '<button>링크</button>',
      search: '',
      headers: [
      ]
    };
  },
  methods: {
    save () {
      this.overlayTest = false;
    },
    detailRefugee (item) {
      this.overlayTest = !this.overlayTest;
      this.refugeeName = item.name;
      this.refugeeDetail = item.memo;
    },
    deleteItem (item) {
      if (this.title === '방문 일지') {
        axios.delete(`/api/v1/visitlog/${item.id}`)
          .then((res) => {
            alert('해당 정보가 삭제 되었습니다.');
          })
          .catch(() => {
            alert('삭제가 실패 되었습니다.');
          });
      }
      if (this.title === '난민 리스트') {
        axios.delete(`/api/v1/refugee/${item.id}`)
          .then((res) => {
            alert('해당 정보가 삭제 되었습니다.');
          })
          .catch(() => {
            alert('삭제가 실패 되었습니다.');
          });
      }
    },
    editItem (item) {
      this.overlay = !this.overlay;
    },
    onClickNewButton () {
      this.overlay = !this.overlay;
    }
  },
  mounted () {
    const table = [
      { text: '이름', align: 'left', value: 'name' },
      { text: '생년월일', align: 'left', value: 'birth' },
      { text: '국적', align: 'left', value: 'nationality' },
      { text: '등록일자', align: 'left', value: 'createdAt' },
      { text: '상태', align: 'left', value: 'status' },
      { text: 'Actions', align: 'left', value: 'action', sortable: false }
    ];
    this.headers = table;
  }
};
</script>

<style>
  #data-table-card {
    padding: 30px;
    max-height: 900px;
    box-sizing: border-box;
  }
  #data-table-title {
    font-size: 2rem;
    font-weight: bold;
    color: #333333;
  }
  #data-table {
    overflow: scroll;
    max-height: 600px;
  }
  #btn-new {
    margin-right: 1%;
  }

  #main-data-table {
    overflow: scroll;
    max-height: 347px;
  }

  ::-webkit-scrollbar {
    display:none;
  }
</style>
