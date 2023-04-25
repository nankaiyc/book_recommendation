<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>智能推荐助手</h2>
    </div>
    <div class="chatAppBody">
      <div class="chatBox">
        <div v-for="(message, index) in messages" :key="index">
          <div class="chatRow" v-if="message.isUser == false">
            <el-avatar
              class="chatAvatar"
              :size="30"
              src="https://goflychat.oss-cn-hangzhou.aliyuncs.com/static/upload/avator/2022June/32a988a3c2f8700119fa1f5da1b6a4bd.png"
            ></el-avatar>
            <div class="chatMsgContent">
              <div class="chatUsername">推荐助手</div>
              <div class="chatContent">{{ message.text }}</div>
            </div>
          </div>
          <div class="chatRow chatRowMe" v-if="message.isUser == true">
            <div class="chatContent">{{ message.text }}</div>
          </div>
        </div>
      </div>
    </div>
      <div class="chat-input">
        <el-form :model="form" @submit.native.prevent="handleSubmit">
          <el-row>
            <el-col span="21">
              <el-form-item>
                <el-input
                  v-model="form.message"
                  placeholder="Type your message here"
                  class="input-message"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="3">
              <el-form-item>
                <el-button type="primary" native-type="submit">Send</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      form: {
        message: "",
      },
      currentTime: "",
    };
  },
  created: function () {
    setInterval(() => {
      this.currentTime = this.updateTime;
    }, 1000);
  },
  computed: {
    updateTime: function () {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      return hours + ":" + minutes + ":" + seconds;
    },
  },
  methods: {
    handleSubmit() {
      const userMessage = {
        text: this.form.message,
        timestamp: new Date(),
        isUser: true,
      };
      this.messages.push(userMessage);

      const aiMessage = {
        text: "Received: " + this.form.message,
        timestamp: new Date(),
        isUser: false,
      };
      this.messages.push(aiMessage);

      this.form.message = "";
    },
  },
};
</script>

<style scoped>
.chat-header {
  background-color: #007bff;
  color: #fff;
  padding: 20px;
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.currentTime {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
}
.input-message {
  margin-left: 5%;
  width: 95%;
}
.user-message-right {
  align-self: flex-end;
}
.chatAppBody {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 75vh;
  background-color: #f1f5f8;
}
.chatTitle {
  background: #fff;
}
.chatBox {
  flex: 80%;
  padding: 0 5px;
}
.chatBottom {
  background: #fff;
}
.chatRow {
  display: flex;
  align-items: flex-end;
  margin: 5px 0px;
}
.chatAvatar {
  margin-right: 5px;
  flex-shrink: 0;
}
.chatUsername {
  font-size: 12px;
  white-space: nowrap;
  color: #999;
  margin-bottom: 2px;
}
.chatContent {
  border-radius: 10px 10px 10px 0px;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 5px 30px rgb(50 50 93 / 8%), 0 1px 3px rgb(0 0 0 / 5%);
  font-size: 14px;
  word-break: break-all;
  line-height: 21px;
}
.chatRowMe {
  justify-content: flex-end;
}
.chatRowMe .chatContent {
  border-radius: 10px 10px 0px 10px;
}
</style>