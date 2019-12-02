<template>
    <div>
        <div class="component-parameters data-iterator" v-for="refugee in paginatedData" v-bind:key="refugee.createdAt">
            <div>
                <div class="ma-2">
                    <div class="pa-2 grey lighten-3 d-flex align-top">
                        <div class="flex xs2 text-xs-left">
                            <div class="header grey--text text--darken-1">이름</div>
                            <div class="mono default">{{refugee.name}}</div>
                        </div>
                        <div class="flex xs3 text-xs-left">
                            <div class="header grey--text text--darken-1">국적</div>
                            <div class="mono name">{{refugee.nationality}}</div>
                        </div>
                        <div class="flex xs4 text-xs-right">
                            <div class="header grey--text text--darken-1">등록일자</div>
                            <div class="mono type">{{refugee.createdAt}}</div>
                        </div>
                        <div class="flex xs2 text-xs-right">
                            <v-btn v-on:click="onClickDeleteBtn(refugee.id)">삭제</v-btn>
                        </div>
                        <div class="flex xs1 text-xs-right">
                            <v-btn v-on:click="onClickUpdateBtn(refugee)">수정</v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-cover">
            <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
                이전
            </button>f
            <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
            <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
                다음
            </button>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'paginated-list',
  data () {
    return {
      pageNum: 0
    };
  },
  props: {
    refugeeList: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: false,
      default: 6
    }
  },
  methods: {
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },
    onClickDeleteBtn (id) {
      axios.delete('/api/v1/refugee/' + id)
        .then((res) => {
          this.$router.push('/showRefugee');
          alert('해당 정보가 삭제되었습니다.');
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickUpdateBtn (refugeeInfo) {
      this.$router.push({ name: 'UpdateRefugee', params: { refugee: refugeeInfo, type: 'update' } });
    }
  },
  computed: {
    pageCount () {
      const listLeng = this.refugeeList.length;
      const listSize = this.pageSize;
      const page = Math.floor((listLeng - 1) / listSize) + 1;
      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.refugeeList.slice(start, end);
    }
  }
};
</script>

<style>
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
#updateBtn {
  text-decoration-color: black;
}
</style>
