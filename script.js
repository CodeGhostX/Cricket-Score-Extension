async function getScore() {
//   return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=b33c3ed9-7bc3-479a-b4fd-f17891907e16&offset=0")
  return await fetch(
    "https://api.cricapi.com/v1/currentMatches?apikey=fd1de8f4-2395-474c-8c7a-47428667111a&offset=0"
  )
    .then((data) => data.json())
    .then((data) => {
      const status = document.querySelector(".status");
      if (data.status != "success") {
        status.innerHTML = "Today Limit has been Reached.";
        status.style.color = "red"
        status.style.fontSize = "25px"
        return;
      }
      const matchList = data.data;
      if (!matchList) return;
      matchList.map((match) => {
        if (match.teams.includes("India")) {
          status.innerHTML = match.status;
          const scoreArr = match.score;
          const firstInnings = document.querySelector(".first-innings");
          const Matchtype = document.querySelector(".Matchtype");
          const isEnded = document.querySelector(".isEnded");
          const Matchtitle = document.querySelector(".title");
          const secondInnings = document.querySelector(".second-innings");
          const thirdInnings = document.querySelector(".third-innings");
          const fourthInnings = document.querySelector(".fourth-innings");
          const firstInningsScore = scoreArr[0];
          Matchtype.innerHTML = `${match.matchType.toLocaleUpperCase()}`;
          if (match.matchEnded) {
            isEnded.innerHTML = "Ended";
            isEnded.style.color = "#B80000";
          } else {
            isEnded.innerHTML = "Running";
            isEnded.style.color = "#87A922";
          }
          Matchtitle.innerHTML = `${match.name}`;
          firstInnings.innerHTML = `${firstInningsScore.inning} : ${firstInningsScore.r}-${firstInningsScore.w} (${firstInningsScore.o})`;
          const secondInningsScore = scoreArr[1];
          secondInnings.innerHTML = `${secondInningsScore.inning} : ${secondInningsScore.r}-${secondInningsScore.w} (${secondInningsScore.o})`;
          const thirdInningsScore = scoreArr[2];
          thirdInnings.innerHTML = `${thirdInningsScore.inning} : ${thirdInningsScore.r}-${thirdInningsScore.w} (${thirdInningsScore.o})`;
          const fourthInningsScore = scoreArr[3];
          fourthInnings.innerHTML = `${fourthInningsScore.inning} : ${fourthInningsScore.r}-${fourthInningsScore.w} (${fourthInningsScore.o})`;
        }
      });
      console.log(matchList);
    });
}
getScore();
