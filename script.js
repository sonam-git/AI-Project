// dependencies
const { OpenAI } = require('langchain/llms/openai');
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");
const inquirer = require('inquirer');
require('dotenv').config();

// Creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({ 
// to check if a project is authorized to use the API and for collecting usage information.
    openAIApiKey: process.env.OPENAI_API_KEY, 
    temperature: 0,  //variability in the words selected in a response.
    model: 'gpt-3.5-turbo'  //represents which language model will be used
  });
  
  // console.log({ model });


// With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  code: "Javascript code that answers the user's question",
  explanation: "detailed explanation of the example code provided",
});

// The .getFormatInstructions() method is how we'll pass instructions to our template for how we want the final response to be structured.
const formatInstructions = parser.getFormatInstructions();

// Uses the instantiated OpenAI wrapper, model, and makes a call based on input from inquirer
  const promptFunc = async (input) => {
    try {
      const res = await model.call(input);
      console.log(await parser.parse(res));
// Instantiation of a new object called "prompt" using the "PromptTemplate" class
        const prompt = new PromptTemplate({
      // where we inject the user input using \n immediately followed by curly braces surrounding a variable name. 
          template: "You are a javascript expert and will answer the user’s coding questions thoroughly as possible.\n{format_instructions}\n{question}",
          inputVariables: ["question"],
          partialVariables: { format_instructions: formatInstructions }
        });
        

// .format() method on our instantiated prompt object to pass in user input to our template. 
const promptInput = await prompt.format({
  question: input
});
    }
    catch (err) {
      console.error(err);
    }
  };
  
 
  // Initialization function that uses inquirer to prompt the user and returns a promise. 
  //It takes the user input and passes it through the call method
  const init = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Ask a coding question:',
      },
    ]).then((inquirerResponse) => {
      promptFunc(inquirerResponse.name)
    });
  };
 

  // Calls the initialization function and starts the script
  init();