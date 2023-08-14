import { useState } from 'react'

// function Card({title, children}) {
//   return (
//     <div style={{
//       background: 'black',
//       color: 'white'
//     }}>
//       <h1>{title}</h1>
//       {children}
//       </div>
//   )
// }

const memeSound = new Audio('meme.mp3')
function App() {
  const [img, setImg] = useState()
  const [demoText, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleGenerate = async (text) => {
    if (isLoading) return

    setIsLoading(true)
    const response = await fetch(`${import.meta.env.DEV ? 'http://localhost:8080' : ''}/dream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: text
      }),
    });
    const { image } = await response.json();
    setIsLoading(false)
    setImg(image)
    setText(text)
    memeSound.play()
  }
  return (
    <>
     <main id="main">
      {img ? (
        <Demo img={img}>
          {demoText}
        </Demo>
        ) : (
          <ShitpostForm onGenerate={handleGenerate} loading={isLoading}/>
        )
      }
    </main>
    </>
  ) 
}
function Demo(props) { 
  return (

    <div className="demo-container">
      <div className="img-container">
        <img className="demo-img" src={props.img}/>
      </div>
      <div className="demo-text-container"> 
        <p className="demo-text" >{props.children}</p>
      </div>
    </div>
  )
}

function ShitpostForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const text = data.get('prompt')
    props.onGenerate(text)
  }
  return (
    <>
    <h1>Shitpost Generator</h1>
    <form onSubmit={handleSubmit}>
        <label for="prompt">Prompt</label>
        <textarea name="prompt" maxlength="160"></textarea>

        <button type="submit" 
        // disabled={props.loading}
        >
          {props.loading ? (
        <>Generating... <span className="spinner">💩</span></>
        ): (
          <>Generate</>
        )}
        </button>
    </form>
    </>
  )
}

export default App
