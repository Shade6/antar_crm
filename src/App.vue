<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { Button } from "frappe-ui";
import axios from "axios";
const chatbox = ref(null);
const chatContainer = ref(null);
const userInput = ref(null);
const sendButton = ref(null);
const openChatButton = ref(null);
const closeChatButton = ref(null);

let isChatboxOpen = ref(false); // Set initial state to closed

// Function to toggle the chatbox visibility
function toggleChatbox() {
  chatContainer.value.classList.toggle("hidden");
  isChatboxOpen.value = !isChatboxOpen.value; // Toggle the state
}

onMounted(() => {
  chatbox.value = document.getElementById("chatbox");
  chatContainer.value = document.getElementById("chat-container");
  userInput.value = document.getElementById("user-input");
  sendButton.value = document.getElementById("send-button");
  openChatButton.value = document.getElementById("open-chat");
  closeChatButton.value = document.getElementById("close-chat");

  // Add initial welcome message
  addBotMessage("Welcome! Try our bot to learn more about us. Just type your question and hit enter!");

  // Add an event listener to the open chat button
  openChatButton.value.addEventListener("click", toggleChatbox);

  // Add an event listener to the close chat button
  closeChatButton.value.addEventListener("click", toggleChatbox);

  // Add an event listener to the send button
  sendButton.value.addEventListener("click", function () {
    const message = userInput.value.value;
    if (message.trim() !== "") {
      addUserMessage(message);
      respondToUser(message);
      userInput.value.value = "";
    }
  });

  userInput.value.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      const message = userInput.value.value;
      addUserMessage(message);
      respondToUser(message);
      userInput.value.value = "";
    }
  });

  // Removed auto-open on page load since we want it closed initially
});

function addUserMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("mb-2", "text-right");
  messageElement.innerHTML = `<p class="bg-black text-white rounded-lg py-2 px-4 inline-block">${message}</p>`;
  chatbox.value.appendChild(messageElement);
  chatbox.value.scrollTop = chatbox.value.scrollHeight;
}

function addBotMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("mb-2");

  let formattedMessage = '';
  if (typeof message === 'string') {
    formattedMessage = `<p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">${message}</p>`;
  } else if (Array.isArray(message)) {
    formattedMessage = `<div class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
      <ul class="list-disc pl-4">
        ${message.map(item => `<li>${typeof item === 'object' ? JSON.stringify(item, null, 2) : item}</li>`).join('')}
      </ul>
    </div>`;
  } else if (typeof message === 'object') {
    formattedMessage = `<div class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
      <pre class="whitespace-pre-wrap">
        ${JSON.stringify(message, null, 2)}
      </pre>
    </div>`;
  }

  messageElement.innerHTML = formattedMessage;
  chatbox.value.appendChild(messageElement);
  chatbox.value.scrollTop = chatbox.value.scrollHeight;
}

async function respondToUser(userMessage) {
  try {
    const response = await axios.post(
      "https://bot.shade6.com/api/query",
      { query: userMessage },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data);
    if(response.data.status == "error"){
      addBotMessage(response.data.error)
    }else{
      addBotMessage(response.data.data.results)
    }
     // Access the message property from response.data
  } catch (error) {
    addBotMessage("Sorry, there was an error processing your request.")
    console.error("Error:", error.response ? error.response.data : error.message);
  }
}
</script>

<template>
  <RouterView />
  <div class="fixed bottom-0 right-0 mb-4 mr-4">
    <div class="p-1">
      <button id="open-chat" >
        <svg
          class="svg_icon"
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          width="80px"
          height="80px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 100 100"
          xml:space="preserve"
        >
          <path
            d="M49.6,25.8c7.2,0,13,5.8,13,13v3.3c-4.3-0.5-8.7-0.7-13-0.7c-4.3,0-8.7,0.2-13,0.7v-3.3
	          C36.6,31.7,42.4,25.8,49.6,25.8z"
          />
          <path
            d="M73.2,63.8l1.3-11.4c2.9,0.5,5.1,2.9,5.1,5.6C79.6,61.2,76.7,63.8,73.2,63.8z"
          />
          <path
            d="M25.9,63.8c-3.5,0-6.4-2.6-6.4-5.8c0-2.8,2.2-5.1,5.1-5.6L25.9,63.8z"
          />
          <path
            d="M68.7,44.9c-6.6-0.7-12.9-1-19-1c-6.1,0-12.5,0.3-19,1h0c-2.2,0.2-3.8,2.2-3.5,4.3l2,19.4
	c0.2,1.8,1.6,3.3,3.5,3.5c5.6,0.7,11.3,1,17.1,1s11.5-0.3,17.1-1c1.8-0.2,3.3-1.7,3.5-3.5l2-19.4v0C72.4,47,70.9,45.1,68.7,44.9z
	 M38.6,62.5c-1.6,0-2.8-1.6-2.8-3.7s1.3-3.7,2.8-3.7s2.8,1.6,2.8,3.7S40.2,62.5,38.6,62.5z M55.3,66.6c0,0.2-0.1,0.4-0.2,0.5
	c-0.1,0.1-0.3,0.2-0.5,0.2h-9.9c-0.2,0-0.4-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.2-0.5v-1.8c0-0.4,0.3-0.7,0.7-0.7h0.2
	c0.4,0,0.7,0.3,0.7,0.7v0.9h8.1v-0.9c0-0.4,0.3-0.7,0.7-0.7h0.2c0.4,0,0.7,0.3,0.7,0.7V66.6z M60.6,62.5c-1.6,0-2.8-1.6-2.8-3.7
	s1.3-3.7,2.8-3.7s2.8,1.6,2.8,3.7S62.2,62.5,60.6,62.5z"
          />
        </svg>
      </button>
    </div>
  </div>
  <div id="chat-container" class="hidden fixed bottom-16 right-4 w-96">
    <div class="bg-white shadow-md rounded-lg max-w-lg w-full">
      <div
        class="p-4 border-b bg-black text-white rounded-t-lg flex justify-between items-center"
      >
        <p class="text-lg font-semibold">Admin Bot</p>
        <button
          id="close-chat"
          class="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div id="chatbox" class="p-4 h-80 overflow-y-auto">

      </div>
      <div class="p-4 border-t flex">
        <input
          id="user-input"
          type="text"
          placeholder="Type a message"
          class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          id="send-button"
          class="bg-black text-white px-4 py-2 rounded-r-md  transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

#open-chat {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      background: rgb(179, 177, 177);
      position: relative;
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      border-radius: 31px;
      transform: rotate(-30deg);
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    #open-chat:before {
      content: "";
      position: absolute;
      right: 100%;
      top: 23px;
      right: 50px;
      width: 0;
      height: 0;
      border-top: 13px solid transparent;
      border-right: 26px solid rgb(179, 177, 177);
      border-bottom: 13px solid transparent;
    }
  .svg_icon{
    transform: rotate(30deg);
  }
</style>
