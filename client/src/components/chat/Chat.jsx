import React, {useRef, useState, useEffect} from 'react'


export default function Join({socket}) {

  const messageRef = useRef()
  const [messageList, setMessageList] = useState([])

  useEffect(()=>{
    socket.on('receive_message', data => {
      setMessageList((current) => [...current, data])
    })

    return () => socket.off('receive_message')
  }, [socket])


  const handleSubmit = () => {
    const message = messageRef.current.value
    if(!message.trim()) return

    socket.emit('message', message)
    clearInput()
  }

  const clearInput = () => {
    messageRef.current.value = ''
  }


  return (
    <div>
      <div className='mensagem'>
          {
              messageList.map((message,index) => (
                <p key={index}>{message.author}: {message.text}</p>
              ))
            }
      </div>
      <div className='container2'>
          <div className='image2'>
              <div className='img'>
                <img src='src\imagens\undraw_before_dawn_re_hp4m.svg'/>
              </div>
          </div>
          <h2>MENSAGEM</h2>
          <div className='input2'>
              <h5>Digite sua mensagem:</h5>
              <input type='text' ref={messageRef} placeholder='Mensagem' /> 
          </div>
          <div className='button2'>
            <button onClick={()=>handleSubmit()}>Entrar</button>
          </div>
      </div>
    </div>
  )
}