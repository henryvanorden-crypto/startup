function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

function convertTrivia(apiResponse) {
  return apiResponse.results.map(q => {
    // Combine answers
    const choices = [...q.incorrect_answers, q.correct_answer];

    // Shuffle choices
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    // Find correct index
    const correctIndex = choices.indexOf(q.correct_answer);

    return {
      question: decodeHTML(q.question),
      choices: choices,
      correctIndex: correctIndex
    };
  });
}
export async function getTrivia() {
  const response = await fetch('/api/trivia');
  const data = await response.json();
  console.log("TRIVIA FROM BACKEND:", data);
  return {
    results: convertTrivia(data),
    date: data.date
  };
}

