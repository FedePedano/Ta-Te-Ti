import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'

const Turns={
  X: '❌',
  O: '⚪'
}


const combinaciones=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


export default function App(){
  const [tablero,setTablero]=useState(()=>{
    const tableroStorage=window.localStorage.getItem('tablero')
    if(tableroStorage) return JSON.parse(tableroStorage)
    return Array(9).fill(null)
  })
  const [turn,setTurn]=useState(()=>{
    const turnStorage=window.localStorage.getItem('turn')
    return turnStorage ?? Turns.X
  })
  const[winner,setWinner]=useState(null)

  const checkWinner=(tableroCheck)=>{
    for(const combo of combinaciones){
      const [a,b,c]=combo
      //verificar si hay algunas de las combinaciones
      if(tableroCheck[a]&&
        tableroCheck[a]===tableroCheck[b]&&
        tableroCheck[a]===tableroCheck[c]
        
        ){//returnamos al ganador si hay combianciones existentes
          return tableroCheck[a]
        }

    }//si no hay ganador returna false
    return null

  }
  const checkEndGame=(nuevoTablero)=>{
    return nuevoTablero.every((Square)=>Square!==null)
  }

  const updateTablero=(index)=>{
    //no actualizamos esta posicion si ya tiene algo
    if(tablero[index]||winner)return
    //actualizamos el tablero
    const nuevoTablero=[...tablero]
    nuevoTablero[index]=turn
    setTablero(nuevoTablero)
    //actualizamos el turno
    const nuevoTurno=turn===Turns.X ? Turns.O : Turns.X
    setTurn(nuevoTurno)
    //guardamos el localstorage para q se guarde la partida q estamos jugando
    window.localStorage.setItem('tablero',JSON.stringify(nuevoTablero))
    window.localStorage.setItem('turn',nuevoTurno)
    //revisamos si hay un ganador
    const newWinner=checkWinner(nuevoTablero)
    if(newWinner){
      confetti()
      setWinner(newWinner)

    }else if(checkEndGame(nuevoTablero)){
      setWinner(false)
    }
  }

  //resetear el juego
  const resetearJuego=()=>{
    setTablero(Array(9).fill(null))
    setTurn(Turns.X)
    setWinner(null)
    window.localStorage.removeItem('tablero')
    window.localStorage.removeItem('turn')
  }
  

  return(
    <main>
      <button onClick={resetearJuego} className='resetear-header'>
        Empezar de nuevo
      </button>
    <section className="container">
      {tablero.map((square,index)=>{
        return(
          <Square key={index} index={index} updateTablero={updateTablero}
          >
            {square}
          </Square>
  
        )

      })
      }
    
    </section>
    <section className='turnos' >
    <Square isSelected={turn===Turns.X}> 
      {Turns.X}
    </Square>
    <Square isSelected={turn===Turns.O}>
      {Turns.O}
    </Square>
  </section>
        {winner!==null&&(
          <section>
            <div className='contenedor_resultado'>
              <h2 className='resultado'>
                {winner===false ?
                'Empate':'Gano:'}
              </h2>
              <footer>
                {
                winner && <Square>{winner}</Square>
                }
                <button className='bt-resetear' onClick={resetearJuego}>
                  Empezar de nuevo
                </button>
              </footer>
            </div>
          </section>

        )}
  </main>
  
  )
}
