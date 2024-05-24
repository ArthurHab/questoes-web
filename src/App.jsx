import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

const App = () => {

  const [ data, setData] = useState([]);
  const [ loading, setLoading] = useState(true);
  const [ error, setError] = useState(null);

  const fetchData = async () => {
    await axios.get('/api/questoes').then((response) => {
      setData(response.data)
      setLoading(false)
    }).catch((error) => {
      setError(error)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Error</div>
  }

  return (
    <>
    { data.map((questao, index) => (
      <div key={index}>
          <div className='m-10'>
            <div className='flex flex-wrap gap-5'>
              <p>Ano: {questao.ano}</p>
              <p>Banca: {questao.banca}</p>
              <p>Orgão: {questao.orgao}</p>
              <p>Prova: {questao.prova}</p>
          </div>
          <div className='w-full h-0.5 bg-slate-500 mt-1'>
          </div>
          <div className='m-5 flex flex-col gap-4'>
            <p>{questao.questao.primeiroTexto}</p>
            <div>Imagens</div>
            <p>{questao.questao.segundoTexto}</p>
            <div className='flex flex-col gap-4 p-5'>
            <ol className='list-decimal'>
              { questao.questao.alternativas.map((alternativa, index) => (
                <li key={index}>{alternativa}</li>
              ))}
            </ol>
            </div>
          </div>
        </div>
      </div>
    ))}
    </>
  )
}

export default App
