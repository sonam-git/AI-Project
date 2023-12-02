// dependencies
const { OpenAI } = require('langchain/llms/openai');
require('dotenv').config();
console.log(process.env.OPENAI_API_KEY);

// Creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({ 
// used to pass in our OpenAI API key to check if a project is authorized to use the API 
// and for collecting usage information.
    openAIApiKey: process.env.OPENAI_API_KEY, 
    temperature: 0,  //variability in the words selected in a response.
    model: 'gpt-3.5-turbo'  //represents which language model will be used
  });
  
  console.log({ model });
  