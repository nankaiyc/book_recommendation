<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>Chat with ChatGPT</h2>
    </div>
    <div class="chat-messages">
      <el-timeline>
        <el-timeline-item v-for="(message, index) in messages" :key="index" :timestamp="message.timestamp">
          <el-card class="message-card">
            <p>{{ message.text }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="chat-input">
      <el-form :model="form" @submit.native.prevent="handleSubmit">
        <el-form-item>
          <el-input v-model="form.message" placeholder="Type your message here"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Send</el-button>
        </el-form-item>
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
        message: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      const message = {
        text: this.form.message,
        timestamp: new Date(),
      };
      this.messages.push(message);
      this.form.message = '';
    },
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  background-color: #007bff;
  color: #fff;
  padding: 20px;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message-card {
  width: 60%;
}

.chat-input {
  padding: 20px;
}
</style>