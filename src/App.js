import { useState, useEffect, useRef } from "react";
import questions from "./question";
import "./App.scss";

function App() {
  const questionAnswer = [...questions];

  const [questionIndex, setQuestionIndex] = useState(0);
  const currentquestion = questionAnswer[questionIndex];
  const [score, setScore] = useState(0);
  const [showmarks, setShowmarks] = useState(false);
  const [count, setCount] = useState(1);
  const [timer, setTimer] = useState(60);
  const progress = useRef();
  const progre = `${(score / questionAnswer.length) * 100}%`;

  const nextquestion = (index) => {
    // START SCORE
    if (index === currentquestion.answer) {
      setScore(score + 1);
    }
    // END START SCORE
    // START NEXT QUESTION AND SHOWMARKS
    if (questionIndex + 1 < questionAnswer.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setShowmarks(true);
    }
    // END NEXT QUESTION AND SHOWMARKS

    // setCount(count + 1);
    // OR OTHER METHOD
    if (count + 1 <= questionAnswer.length) {
      setCount(count + 1);
    }
    setTimer(60);
  };

  const reset = () => {
    setShowmarks(false);
    setQuestionIndex(0);
    setScore(0);
    setCount(1);
    setTimer(60);
  };

  // timer try
  useEffect(() => {
    if (showmarks == false) {
      const interval = setInterval(() => {
        setTimer((time) => time - 1);
      }, 1000);

      if (timer == 50) {
        nextquestion();
        console.log(timer);
      }

      return () => clearInterval(interval);
    } else if (showmarks == true) {
      console.log("true");
      if (progre > "30%") {
        progress.current.style.width = progre;
        progress.current.innerHTML = "SUPER";
        progress.current.style.backgroundColor = "red";
      }
    }
  });

  // COMPLETED BACKEND WORK
  // NEXT PRACTICES

  const [spa, setspa] = useState(true);
  const firstspan = useRef();
  const secondspan = useRef();
  console.log(firstspan);
  console.log(secondspan);
  useEffect(() => {
    if (spa == true) {
      firstspan.current.style.color = "blue";
    } else if (spa == false) {
      secondspan.current.style.color = "red";
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        {spa ? (
          <span ref={firstspan}>first</span>
        ) : (
          <span ref={secondspan}>second</span>
        )}
        <button onClick={() => setspa((pre) => !pre)}>spa</button>

        {showmarks ? (
          <div>
            <h1 className="scr">
              {score}/{questionAnswer.length}
            </h1>
            <button onClick={reset}>Reset</button>
            <div className="background">
              <div
                id="progress"
                className="progress"
                ref={progress}
                style={{
                  // width: progre,
                  animationName: "progress",
                }}
              >
                hello
              </div>
            </div>
            <span>{progre}</span>
          </div>
        ) : (
          <div>
            <h1>{currentquestion.question}</h1>
            <span>
              {count}/{questionAnswer.length}
            </span>
            <div className="timer">{timer}</div>
            <span>timerrest</span>
            <ul>
              {currentquestion.options.map((curques, i) => {
                return (
                  <li key={i} onClick={() => nextquestion(i)}>
                    {curques}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
