export const Square=({children,index,isSelected,updateTablero})=>{
    const className=`celda ${isSelected ? ' is-selected':''}`
    const handlerClick=()=>{
      updateTablero(index)
    }
    return(
      <div onClick={handlerClick} className={className}>
        {children}
      </div>
    )
  
  }
  