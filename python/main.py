"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""

import google.generativeai as genai
import sys
genai.configure(api_key="AIzaSyBTcdxvGiyAN4tT3EJceBf3JMdnzt6gnbc")

# Set up the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_NONE"
  },
]

system_instruction = "You are a chat bot that produces an unbiased up to date latest news article on any given topic provided."

model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              system_instruction=system_instruction,
                              safety_settings=safety_settings)

convo = model.start_chat(history=[
])

# topic = input('Give a topic to receive a an unbiased news article: ')

# convo.send_message(f"{topic}")
# print(convo.last.text)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide a topic as a command-line argument.")
        sys.exit(1)

    topic = sys.argv[1]

    convo.send_message(f"{topic}")
    print(convo.last.text)