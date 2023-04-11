import Image from 'next/image'
import { characters } from '../characters'
import { useContext, useEffect, useState } from 'react'
import { TChampion } from '~/types'





export default function ChampionPool() {

  


  const [imagePaths, setImagePaths] = useState<string[]>([])
  const [championName, setChampionName] = useState<{ titles: string[], images: string, tags: string[]}[]>()
  
 

  useEffect(() => {
    async function fetchChampions() {
      await fetch("https://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion.json")
        .then(res => res.json())
        .then(data => {  
        const championNames = Object.keys(data.data)
        const champions = championNames.map((name) => {
        const championData = data.data[name]
        return {
          names: name,
          titles: championData.title,
          images: `./champions/${championData.image.full}`,
          tags: championData.tags,
        }
      })
      
      setImagePaths(champions.map(champion => champion.images))
      setChampionName(champions.map(champion => champion))
    });
  }
      

  fetchChampions();
  }, [])

   
    function ChampionsImages() {
      if (!championName) {
        return null
      }
      return (
        <div className='grid grid-cols-6 text-xs overflow-y-auto
         h-64  p-6 '>{imagePaths.map((imagesUrl, index) => {
          const imagePath = imagesUrl.slice(1)
          const [imageLoaded, setImageLoaded] = useState(true)

          const champion: TChampion | undefined = championName[index]
          
          function handleImageError() {
            setImageLoaded(false)
          }

          if (!imagePath || !imageLoaded) {
            return null
          }

          if (!champion) {
            return null
          }
          
        
          return (
                <div className='flex flex-col items-center'>
                  { champion ?
                    <>
                      
                      <Image className='cursor-grab rounded-full overflow-hidden' src={imagePath} onError={handleImageError}   height={50} width={50} alt={""}
                        
                        /> 
                      
                      <div className=''>{champion.names.replace(/([A-Z])/g, ' $1').trim()}</div> 
                    </> : null
                  }
                    
                    
                </div>
          )
        })}</div>
      )
    }
    const characterImgs = []


    for (const character of characters) {
      for (const role of Object.values(character)) {
        for (const image of Object.values(role)) {
          /* if (image.endsWith(".png")) { */
            characterImgs.push(image)
          /* } */
        }
      }
    }

    return (
      <div className="">
          <div className='grid'>
            {/* {characterImgs.map((characterImg, idx) => (
              <div key={idx} draggable={true} className='cursor-grab'>
                {characterImg ? <Image src={characterImg} alt="character img" width={100} height={100} /> : <></>}
              </div>
              ))} */}
              {/* <Image src={"/champions/yasuo.png"} width={150} height={150} /> */}
              <ChampionsImages />
          
          </div>
      </div>
    )
}
