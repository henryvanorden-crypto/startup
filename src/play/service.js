

const setOne = [
  {
    question: "How many days are in a year?",
    choices: ["365", "356", "635", "31"],
    correctIndex: 0
  },
  {
    question: "What planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Venus", "Jupiter"],
    correctIndex: 1
  },
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    correctIndex: 2
  },
  {
    question: "How many continents are there?",
    choices: ["5", "6", "7", "8"],
    correctIndex: 2
  },
  {
    question: "Which ocean is the largest?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctIndex: 3
  },
  {
    question: "What gas do plants absorb?",
    choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
    correctIndex: 2
  },
  {
    question: "What is 9 × 9?",
    choices: ["81", "72", "99", "90"],
    correctIndex: 0
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    choices: ["Tiger", "Elephant", "Lion", "Bear"],
    correctIndex: 2
  },
  {
    question: "What is the boiling point of water (°C)?",
    choices: ["90", "100", "110", "120"],
    correctIndex: 1
  },
  {
    question: "Which language is primarily used for React?",
    choices: ["Python", "Java", "JavaScript", "C++"],
    correctIndex: 2
  }
];
const setTwo = [
  {
    question: "Which country has the largest population?",
    choices: ["USA", "India", "China", "Brazil"],
    correctIndex: 1
  },
  {
    question: "What is the smallest prime number?",
    choices: ["0", "1", "2", "3"],
    correctIndex: 2
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    correctIndex: 1
  },
  {
    question: "What is the chemical symbol for Gold?",
    choices: ["Au", "Ag", "Gd", "Go"],
    correctIndex: 0
  },
  {
    question: "How many sides does a hexagon have?",
    choices: ["5", "6", "7", "8"],
    correctIndex: 1
  },
  {
    question: "What year did the first man land on the moon?",
    choices: ["1965", "1969", "1972", "1959"],
    correctIndex: 1
  },
  {
    question: "Which organ pumps blood through the body?",
    choices: ["Lungs", "Brain", "Heart", "Liver"],
    correctIndex: 2
  },
  {
    question: "What is the largest mammal?",
    choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctIndex: 1
  },
  {
    question: "What is the square root of 144?",
    choices: ["10", "11", "12", "13"],
    correctIndex: 2
  },
  {
    question: "Which programming language is known for styling web pages?",
    choices: ["HTML", "CSS", "Python", "C#"],
    correctIndex: 1
  }
];

const questionSets = [setOne, setTwo]
export function triviaQuestions(){
    return questionSets[new Date().getDate() % questionSets.length]
}
