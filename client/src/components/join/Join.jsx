import React, {useRef} from 'react'
import io from 'socket.io-client'


export default function Join({setChatVisibility, setSocket}) {

  const usernameRef = useRef()

  const handleSubmit = async () => { 
    const username = usernameRef.current.value
    if(!username.trim()) return
    const socket = await io.connect('http://localhost:3001')
    socket.emit('set_username', username)
    setSocket(socket)
    setChatVisibility(true)
  }

  return (
    <div>
      <div className='container'>
        <div className='image'>
            <div className='img'>
              <img src='src\imagens\undraw_nature_on_screen_xkli.svg'/>
            </div>
          </div>
        <h2>WORKCHAT</h2>
          <div className='input'>
             <h4>Digite seu nome de usuário:</h4>
             <input type="text" ref={usernameRef} placeholder='Nome de usuário' />
          </div>
          <div className='button'>
             <button onClick={()=>handleSubmit()}>Entrar</button>
          </div>
      </div>
    </div>
  )
}