import React, { useEffect, useState } from "react"

function App() {

  const [getUser, setUser] = useState()

  const [getTable, setTable] = useState([])

  const [getButtonClicked, setButtonClicked] = useState(false)

  function updateUser(e) {
    e = e.target.value
    setUser(e)
  }


  function fetchNews() {

    let url = `https://newsapi.org/v2/everything?q=${getUser}&from=2021-04-05&sortBy=publishedAt&apiKey=f0c3b14a99484b8f868bdd6813c9cc88`

    fetch(url).then(res => {
      return res.json()
    }).then(data => {

      setTable(data.articles)
    })
  }


  useEffect(fetchNews, [getButtonClicked])


  const Image = ({ article }) =>
    <td><img src={article.urlToImage} width="64"></img></td>


  const Title = ({ article }) =>
    <td><a href={article.url}>{article.title}</a></td>

  function Row({ article }) {
    return (
      <tr>
        <Image article={article} />
        <Title article={article} />
      </tr>
    )
  }

  function DisplayTable() {

    if (getTable.length > 0) {
      return (
        <React.Fragment>
          {getTable.map(article => <Row article={article} />)}
        </React.Fragment>
      )
    }
    else {
      return (
        <h1>Waiting</h1>
      )
    }
  }

  function Button() {

    return (
      <button onClick={() => setButtonClicked(!getButtonClicked)}>
        Submit
      </button>
    )
  }

  return (
    <React.Fragment>

      <input onChange={updateUser} />
      <Button />

      <DisplayTable />


    </React.Fragment>
  );
}

export default App;
