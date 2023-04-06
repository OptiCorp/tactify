async function fetchChampions() {
  await fetch("https://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion.json")
    .then(res => res.json())
    .then(data => {  
      const championNames = Object.keys(data.data)
      const champions = championNames.map((name) => {
        const championData = data.data[name]
        return {
          name: name,
          title: championData.title,
          image: `./champions/${championData.image.full}`,
          tags: championData.tags
        }
      })

    });
}

fetchChampions();