import { useState, useEffect } from 'react';
import { GameBanner } from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog'

import { CreateAdBanner } from './components/CreateAdBanner';
import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdModal } from './components/CreatAdModal';
import axios from 'axios';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data[0])
    })
  }, [])

  return (
  <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
    <img src={logoImg}/>

    <h1 className='font-black text-white text-6xl mt-20'>
      Seu  <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
    </h1>

    <div className='grid grid-cols-6 gap-6 mt-6'>
      {games.map(game => {
        return (
          <GameBanner
            key={game.id} 
            bannerUrl={game.bannerUrl} 
            title={game.title} 
            adsCount={game._count.ads} 
          />
        )
      })}

    </div>

    <Dialog.Root> 
      <CreateAdBanner/>

      <CreateAdModal />
    </Dialog.Root>

   
  </div>
  )
}

export default App
