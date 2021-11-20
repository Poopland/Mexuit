let SiteData = document.querySelector("body > div").__vue__.$store
let Data = SiteData._vm._data.$$state.game
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}

["double-jeopardy", "50-50", "eraser", "immunity", "time-freeze", "power-play", "streak-saver", "glitch"].forEach((power) => {
  postData('https://game.quizizz.com/play-api/awardPowerup', {
    roomHash : Data.data.roomHash,
    playerId : Data.player.playerId,
    powerup : {
      name : power,//prompt("double-jeopardy , X2, 50-50, eraser, immunity, time-freeze, power-play, streak-saver, glitch").toLowerCase(),
      meta : {
        questionId : Data.questions.currentId,
        attempt : 0
      }
    },
    gameType : Data.data.gameType
  }).then(data => {
    console.log(`ADD ${power} Power SUCCESS`);
  });
})
