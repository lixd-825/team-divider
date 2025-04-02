import React, { useState } from "react";
import './style.css';

const allPlayers = [
  { name: "石立国", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 5.9667 },
  { name: "高玉虎", main_attacker: 0, secondary_attacker: 1, setter: 0, skill: 7.2833 },
  { name: "谢崇楷", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 5.3333 },
  { name: "戴锦程", main_attacker: 1, secondary_attacker: 1, setter: 1, skill: 8.9167 },
  { name: "陈亦毅", main_attacker: 0, secondary_attacker: 0, setter: 1, skill: 7.3333 },
  { name: "蓝嘉铄", main_attacker: 1, secondary_attacker: 0, setter: 1, skill: 9.1167 },
  { name: "徐康镇", main_attacker: 1, secondary_attacker: 1, setter: 0, skill: 7.5 },
  { name: "古颖滢", main_attacker: 1, secondary_attacker: 1, setter: 1, skill: 6.8333 },
  { name: "黄俊雄", main_attacker: 1, secondary_attacker: 0, setter: 0, skill: 6.3333 },
  { name: "黄珮特", main_attacker: 1, secondary_attacker: 0, setter: 1, skill: 9.2167 },
  { name: "陈焕然", main_attacker: 1, secondary_attacker: 1, setter: 0, skill: 5.4167 },
  { name: "陈朗", main_attacker: 1, secondary_attacker: 1, setter: 0, skill: 6.5 },
  { name: "李炯", main_attacker: 1, secondary_attacker: 0, setter: 0, skill: 7.9167 },
  { name: "董沐晨", main_attacker: 0, secondary_attacker: 1, setter: 1, skill: 6.75 },
  { name: "唐瑞檀", main_attacker: 1, secondary_attacker: 0, setter: 0, skill: 8.9167 },
  { name: "李宣达", main_attacker: 0, secondary_attacker: 1, setter: 0, skill: 7.25 },
  { name: "陈俊升", main_attacker: 1, secondary_attacker: 0, setter: 1, skill: 9.1167 },
  { name: "梁恒升", main_attacker: 1, secondary_attacker: 1, setter: 1, skill: 6.3333 },
  { name: "陈俊桦", main_attacker: 1, secondary_attacker: 0, setter: 1, skill: 6.5333 },
  { name: "刘家贤", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 6.7 },
  { name: "梁欣桐", main_attacker: 1, secondary_attacker: 1, setter: 1, skill: 4.8333 },
  { name: "刘远辉", main_attacker: 0, secondary_attacker: 1, setter: 1, skill: 7.2167 },
  { name: "陈子俊", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 6.0833 },
  { name: "邱国轩", main_attacker: 1, secondary_attacker: 0, setter: 0, skill: 6.6667 },
  { name: "刘春宏", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 4.5 },
  { name: "李瑾晖", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 5.4167 },
  { name: "王咏", main_attacker: 0, secondary_attacker: 1, setter: 0, skill: 4.8 },
  { name: "沈丽鹃", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 5.8833 },
  { name: "王安志", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 6.8333 },
  { name: "黄泽妍", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 5.2167 },
  { name: "陈宗耀", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 6.3 },
  { name: "罗淳阳", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 4.3667 },
  { name: "郭珈", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 6.85 },
  { name: "杨增圣", main_attacker: 1, secondary_attacker: 0, setter: 1, skill: 6.3333 },
  { name: "莫雨彤", main_attacker: 0, secondary_attacker: 0, setter: 0, skill: 5.7 }
];

function App() {
  const [playersInput, setPlayersInput] = useState("");
  const [teamPlans, setTeamPlans] = useState([]);

  const shufflePlayers = (players) => {
    const shuffledPlayers = [...players];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }
    return shuffledPlayers;
  };

  const generateTeams = () => {
    const playerNames = playersInput.split(" ").map(name => name.trim()).filter(name => name);
    const selectedPlayers = allPlayers.filter(player => playerNames.includes(player.name));

    const plans = [];
    for (let i = 0; i < 5; i++) {
      const shuffledPlayers = shufflePlayers(selectedPlayers);
      const teamA = shuffledPlayers.slice(0, shuffledPlayers.length / 2);
      const teamB = shuffledPlayers.slice(shuffledPlayers.length / 2);

      const teamASkill = teamA.reduce((acc, player) => acc + player.skill, 0);
      const teamBSkill = teamB.reduce((acc, player) => acc + player.skill, 0);

      plans.push({
        teamA,
        teamB,
        teamASkill,
        teamBSkill,
        skillDifference: Math.abs(teamASkill - teamBSkill),
      });
    }

    setTeamPlans(plans);
  };

  return (
    <div className="app-container">
      <h1>球员分队</h1>
      <div>
        <label>请输入球员名称（用空格隔开）:</label>
        <input
          type="text"
          value={playersInput}
          onChange={(e) => setPlayersInput(e.target.value)}
          placeholder="例如: 石立国 高玉虎"
        />
      </div>
      <button onClick={generateTeams}>生成分队</button>

      {teamPlans.length > 0 && (
        <div>
          {teamPlans.map((plan, index) => (
            <div key={index} className="team-plan">
              <h2>方案 {index + 1}</h2>
              <div className="team">
                <h3>A队</h3>
                <p>{plan.teamA.map(player => player.name).join(", ")}</p>
                <p>总实力: {plan.teamASkill}</p>
              </div>
              <div className="team">
                <h3>B队</h3>
                <p>{plan.teamB.map(player => player.name).join(", ")}</p>
                <p>总实力: {plan.teamBSkill}</p>
              </div>
              <p>实力差: {plan.skillDifference}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
