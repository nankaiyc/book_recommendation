<template>
  <div class="dashboard-container">
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入书名" v-model="searchText" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="loadBook"></el-button>
      </el-input>
    </div>

    <el-row :gutter="20">
      <el-col v-for="(book,index) in booksList" :key="index" :span="12">
        <br>
        <el-card class="box-card" style="height: 250px;">
          <div class="book-container">
            <img :src="require(`@/assets/${book.pic}`)" class="book-image"/>
            <div class="book-info">
              <p>书名：{{book.title}}</p>
              <p>作者：{{book.author}}</p>
              <p>简介：{{book.intro.substring(0,80)}}……</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination 
    :total="total" 
    :page-size="pageSize" 
    :current-page.sync="currentPage"
    @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getAllBook} from '@/api/book'
export default {
  data() {
    return {
      booksList: null,
      total: 0,
      currentPage: 1,
      pageSize: 14,
      searchText: ''
    }
  },
  created() {
    this.loadBook()
  },
  methods: {
    loadBook(){
      this.listloading = true
      getAllBook(this.currentPage,this.pageSize,this.searchText).then(response=>{
        this.booksList = response.books
        this.total = response.total
        this.listloading = false
        console.log(this.booksList)
      })
    },
    handleCurrentChange(currentPage) {
      this.currentPage=currentPage
      this.loadBook()
    }
    
  }
}
</script>

<style lang="scss" scoped>
.book-container {
  display: flex;
  align-items: center;
}
.book-image {
  width: 150px;
  height: 200px;
  margin-right: 20px;
}
.book-info {
  flex-grow: 1;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
