class Normalizer {
    constructor() {
      this.cards = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: []
          }
        }
      };
      this.image = {
        attachment: {
          type: "image",
          payload: {
            url: "https://i.imgur.com/fE2R9ES.jpg",
            is_reusable: true
          }
        }
      };
  
      this.audio = {
        attachment: {
          type: "audio",
          payload: {
            url: "https://i.imgur.com/fE2R9ES.jpg",
            is_reusable: true
          }
        }
      };
  
      this.video = {
        attachment: {
          type: "video",
          payload: {
            url: "https://youtu.be/bPJSsAr2iu0",
            is_reusable: true
          }
        }
      };
      this.quick_replies = {
        text: "",
        quick_replies: []
      };
    }
  
    async normalizeOutput(input, context) {
      let self = this;
      let components = input.components.sort(function(a, b) {
        if (a.priority < b.priority) {
          return 1;
        }
        if (a.priority < b.priority) {
          return -1;
        }
        return 0;
      });
  
      input.components = components;
      let output = {};
      switch (input.source) {
        case "facebook":
          output = await self.facebookComponent(input);
          output.senderId = input.senderId;
          break;
        case "web":
          output = await self.webComponent(input, context);
          break;
      }
      return output;
    }
  
    async normalizeInput(data) {
      let normalized = {
        input: {
          text: ""
        },
        postback: false,
        sender: null,
        source: ""
      };
      switch (data.source) {
        case "facebook":
          if (data.postback) {
            normalized.postback = true;
            normalized.input.text = data.postback.payload;
            normalized.sender = data.sender.id;
            normalized.source = data.source;
            return normalized;
          }
          normalized.input.text = data.message.text;
          normalized.source = data.source;
          normalized.sender = data.sender.id;
          return normalized;
        case "web":
          if (data.postback) {
            normalized.postback = true;
            normalized.input.text = data.postback.payload;
            normalized.sender = data.input.sender;
            return normalized;
          }
          normalized.input.text = data.input.text;
          normalized.source = data.source;
          normalized.sender = data.input.sender;
          return normalized;
        case "slack":
          return normalized;
        case "whatsapp":
          return normalized;
      }
    }
  
    async facebookComponent(input) {
      let self = this;
      let messages = [];
      input.components.forEach((item, index) => {
        switch (item.type) {
          case "card":
            item.itens.forEach(function(value, index) {
              self.cards.attachment.payload.elements.push(value);
            });
            messages.push(this.cards);
            break;
          case "quick_replies":
            item.itens.forEach(function(value, index) {
              self.quick_replies.quick_replies = value.quick_replies;
              self.quick_replies.text = value.text;
            });
            messages.push(quick_replies);
            break;
          case "text":
            if (item.orientation === "sequential") {
              item.itens.forEach(function(value, index) {
                messages.push({ text: value.text });
              });
              return;
            }
            messages.push({
              text: item.itens[Math.floor(Math.random() * item.itens.length)].text
            });
            break;
          case "image":
            item.itens.forEach(function(value, index) {
              image.attachment.payload.url = value.url;
              messages.push(this.image);
            });
            break;
          case "video":
            item.itens.forEach(function(value, index) {
              video.attachment.payload.url = value.url;
              messages.push(this.video);
            });
            break;
          case "audio":
            item.itens.forEach(function(value, index) {
              audio.attachment.payload.url = value.url;
              messages.push(this.audio);
            });
            break;
        }
      });
      let output = {};
      output.messages = messages;
      return output;
    }
  
    async webComponent(input) {
      let messages = [];
      let actions = [];
      let output = {};
      input.components.forEach((item, index) => {
        switch (item.type) {
          case "card":
            item.itens.forEach(function(value, index) {
              cards.attachment.payload.elements.push(value);
            });
            messages.push(cards);
            break;
          case "quick_replies":
            item.itens.forEach(function(value, index) {
              quick_replies = value;
            });
            messages.push(quick_replies);
  
            break;
          case "text":
            if (item.orientation === "sequential") {
              item.itens.forEach(function(value, index) {
                messages.push({ text: value.text });
              });
              return;
            }
            messages.push({
              text: item.itens[Math.floor(Math.random() * item.itens.length)].text
            });
            break;
          case "image":
            item.itens.forEach(function(value, index) {
              image.attachment.payload.url = value.url;
              messages.push(image);
            });
            break;
          case "video":
            item.itens.forEach(function(value, index) {
              video.attachment.payload.url = value.url;
              messages.push(video);
            });
            break;
          case "audio":
            item.itens.forEach(function(value, index) {
              audio.attachment.payload.url = value.url;
              messages.push(audio);
            });
            break;
          case "action":
            item.itens.forEach(function(value, index) {
              actions.push({
                name: value.name,
                value: value.value,
                interval: value.interval || 0
              });
              output.actions = actions;
            });
            break;
        }
  
        output.messages = messages;
        return output;
      });
    }
  }
  
  module.exports = Normalizer;
  