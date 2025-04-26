import { useEffect, useState } from 'react'
import './App.css'
import { UserProvider } from './components/UserContext'
import Header from './components/Header'
import UserForm from './components/UserForm'
import Question from './components/Question'
import Results from './components/Results'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "Which environment do you prefer?",
      options: ["Desert", "Ocean", "Forest", "Sky"],
    },
    {
      question: "Choose a trait that defines you:",
      options: ["Passionate", "Calm", "Grounded", "Free-spirited"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Desert": "Fire",
    "Passionate": "Fire",
    "Blue 🔵": "Water",
    "Ocean": "Water",
    "Calm": "Water",
    "Green 🟢": "Earth",
    "Forest": "Earth",
    "Grounded": "Earth",
    "Yellow 🟡": "Air",
    "Sky": "Air",
    "Free-spirited": "Air",
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function (answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b;
    });
  }

  async function fetchArtwork(keyword) {
    try {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&hasImages=true`);
      const data = await response.json();
      if (data.total > 0) {
        const objectID = data.objectIDs[0];  // grab the first artwork
        const artworkResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
        const artworkData = await artworkResponse.json();
        setArtwork(artworkData);
      } else {
        setArtwork(null);
      }
    } catch (error) {
      console.error("Failed to fetch artwork:", error);
      setArtwork(null);
    }
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex]);

  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
      <Header />
      {userName === "" ? (
        <UserForm onUserFormSubmit={handleUserFormSubmit} />
      ) : currentQuestionIndex < questions.length ? (
        <Question
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onAnswer={handleAnswer}
        />
      ) : (
        <Results element={element} artwork={artwork} />
      )}
    </UserProvider>
  );
  
}

export default App;

