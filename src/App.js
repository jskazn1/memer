import React, {useState} from 'react';
import './App.css';
import './media.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
  const [text, setText] = useState('');
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)
  
  async function getMemes() {
    setLoading(true)
    setMemes([])
    console.log('get memes')
    const key = '9sZfh1ZhIbjeGippIal5DdRJjrsuBEg9'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key=' + key
    url += '&q=' + text // text = whatever the user searches
    const r = await fetch(url) // r = response. Code will stop running until this code is run
    const body = await r.json()
    setMemes(body.data)
    setText('')
    setLoading(false)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField fullWidth variant="outlined" 
            label="Search for Memes" 
            value={text} 
            onChange={e=> setText(e.target.value)} //allows you to update {text} to whatever is typed inside the TextFiel
            onKeyPress={e=>{
              if(e.key==='Enter') getMemes()
            }}
          />
          <Button variant="contained" color="primary"
            onClick={getMemes}>
            Search
          </Button>
        </div>
        {loading && <LinearProgress />}
      </header>
      <div className="memes">
        {memes.map((meme, i)=> <Meme key={i} {...meme} />)}
      </div>
    </div>
  );
}

function Meme({title, images}) {
  return <div className="meme">
    <img src={images.fixed_height.url} alt={title}/>
    <div className="meme-title">{title}</div>
  </div>
}

export default App;
