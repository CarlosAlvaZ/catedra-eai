import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import toast from 'react-hot-toast'

dayjs.extend(relativeTime)

function App() {
  
  const [temperature, setTemperature] = useState(0.0)
  const [refTemperatura, setRefTemperatura] = useState(25)
  const [lastChange, setLastChange] = useState(0)
  
  const aumentar = () => {
    const aux = refTemperatura + 1

    if(aux > 32){
      toast.error("No se puede superar el limite máximo.")
      return
    }
    setRefTemperatura(aux)
  }
  
  const disminuir = () => {
    const aux = refTemperatura - 1

    if(aux < 25){
      toast.error("No se puede superar el limite mínimo.")
      return
    }
    setRefTemperatura(prev => --prev)
  }
  
  useEffect(() => {
    
    const token = "e00fce6891f63b43783c654e"
    const deviceId = "e05a889055feac61da190db299fc243306acd5f6"
    const eventSource = new EventSource(`https://api.particle.io/v1/devices/${deviceId}/events?acces_token=${token}`)
    
  }, [])

  return (
    <div className="h-screen w-screen bg-slate-600 flex items-center justify-center">
      <div className='bg-opacity-40 backdrop-blur-lg p-4 shadow rounded-md bg-slate-100 grid grid-cols-2 p-8'>

        <div className='col-span-1 p-3'>
          <h1 className='text-2xl text-white font-bold'>Temperatura del censor:</h1>
          <div className='h-44 w-full bg-slate-100 border-2 border-slate-800 rounded-md my-4 flex items-center p-6'>
            <span className='text-[96px] text-slate-800 italic font-bold'>{temperature}</span>
          </div>
        </div>

        <div className='col-span-1 p-3'>
          <h1 className='text-2xl text-white font-bold'>Referencia Temperatura:</h1>
          <div className='h-28 w-full bg-slate-100 border-2 border-slate-800 rounded-md my-4 flex items-center p-6'>
            <span className='text-[60px] text-slate-800 italic font-bold'>{refTemperatura}</span>
          </div>
          <div className='w-full grid grid-cols-2 gap-2'>
            <button className='bg-red-500 p-4 rounded text-white' onClick={disminuir}>Disminuir</button>
            <button className='bg-green-700 p-4 rounded text-white' onClick={aumentar}>Aumentar</button>
          </div>
        </div>

        <div className='col-span-2'>
          <h2 className='text-slate-800 font-medium'>Último registro de cambio de temperatura:</h2>
          <p className='text-slate-700 italic'>{dayjs(lastChange).toDate().toLocaleDateString()} {dayjs(lastChange).fromNow()}</p>
        </div>

      </div>
    </div>
  )
}

export default App
