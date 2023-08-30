import React from 'react'
import{ useState, useEffect} from 'react'


const App = () =>{//can return without needing return keyword
  
  const [ value, setValue] = useState(null)
  const [ message, setMessage] = useState(null)
  const [ previousChats, setPreviousChats] = useState([])
  const [ currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) =>{
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }

  const getMessages = async () =>{
  const options = {
    method: "POST",
    body: JSON.stringify({
      message: value
    }),

    headers:{
      "Content-Type": "application/json"
    }
}  
  
  try{
    const response = await fetch('http://localhost:8000/completions', options)
    const data = await response.json()
   // console.log(data)
    setMessage(data.choices[0].message)
   // setMessage(data.choices[0].message)

     } 
  catch(error){
       console.error(error)
     }
  
}

useEffect(() => {
  console.log(currentTitle, value, message)
  if(!currentTitle && value && message){
    setCurrentTitle(value)
  }
  if(currentTitle && value && message){
    setPreviousChats(prevChats => (
      [...prevChats, 
        {
          title: currentTitle,
          role: "user",
          content: value
        }, 
        {//reponse of AI
          title: currentTitle,
          role: message.role,
          content: message.content
        }
      ]
    ))
  }
}, [message, currentTitle])

console.log(previousChats)

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(uniqueTitles)

  return (
    <div className="app">
     <section className = "sideBar">
        <button onClick = {createNewChat} >+ New Chat</button>
          <ul className = "history">
            {uniqueTitles.map((uniqueTitle, index) => <li key ={index} onClick={handleClick}>{uniqueTitle}</li>)}
          </ul>
          <nav>
            <p>Made by Stephanie</p>
          </nav>
      </section>
     <section className = "main">
       {!currentTitle && <h1>StephGPT</h1>}
       <ul className = "feed">
          {currentChat.map((chatMessage, index) => <li key ={index}>
            <p className = "role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
       </ul>

       <div className = "bottomSection">
         <div className = "inputContainer">
           <input value = {value} onChange={(e) => setValue(e.target.value)}/>
           <div id = "submit" onClick = {getMessages}>➢</div>
         </div>

         <p className = "info">ChatGPT Mar 14 Version. Free Research Preview. Our goal is to make Al systems more natural and safe to interact with.
          Your feedback will help us improve.</p>
       </div>
     </section>
    </div>
  )
}
export default App;

