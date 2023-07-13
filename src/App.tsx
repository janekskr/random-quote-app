/* eslint-disable @typescript-eslint/no-misused-promises */
import { useCallback, useEffect, useState } from "react";

type FetchResultProps = {
  content: string;
  author: string;
  _id: string;
  tags: string[];
  authorSlug: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  date: string;
};

function App() {
  const [quote, setQuote] = useState<FetchResultProps | undefined>();
  const [bg, setBg] = useState<string | undefined>();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://api.quotable.io/quotes/random");

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = (await response.json()) as FetchResultProps[];

      setQuote(data[0]);
      randomColor()
           
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }, []);

  const randomColor = () => {
    const colors = ["rgb(68, 43, 47)", "rgb(83, 178, 180)", "rgb(28, 113, 86)", "rgb(211, 83, 85)", "rgb(138, 168, 169)"]
    const random = Math.floor(Math.random() * 5)
    setBg(colors[random])
  }

  useEffect(() => {
    void fetchData()
  }, [fetchData]);


  return (
    <div className="wrapper" style={{backgroundColor: bg}}>
      <div id="quote-box">
      <p id="text" style={{color: bg}}>{quote ? quote.content : "loading..."}</p>
      <p id="author" style={{color: bg}}>- {quote ? quote.author: "loading..."}</p>
      
      <div> 
        <a href={`https://twitter.com/intent/tweet?text="${quote ? quote.content + '" - ' + quote.author: ""}`} id="tweet-quote" target="_top" style={{backgroundColor: bg}}>
        Tweet quote
      </a>
      <button id="new-quote" onClick={fetchData} style={{backgroundColor: bg}}>
        New quote
      </button> 
      </div>
      <a href="https://github.com/janekskr/" style={{color: bg}} id="repo-link">Link to github repo</a>
    </div>
    </div>
  );

}

export default App;
