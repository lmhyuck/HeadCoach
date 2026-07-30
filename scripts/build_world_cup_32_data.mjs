import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const sourceRoot = new URL("../data/source/wc2026/", import.meta.url);
const templateFile = new URL("../data/formation-library.json", import.meta.url);
const outputFile = new URL("../data/world-cup-2026.json", import.meta.url);
const SELECTED_TEAM_COUNT = 32;

function parseCsv(text) {
  const rows = [];
  let row = [], value = "", quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"' && quoted && text[index + 1] === '"') { value += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(value); value = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(value); value = "";
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = [];
    } else value += char;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  const [headers, ...records] = rows;
  return records.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""])));
}

function readCsv(name) {
  return parseCsv(readFileSync(new URL(name, sourceRoot), "utf8"));
}

const toNumber = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const average = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const slug = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const koreanNames = {
  Argentina: "아르헨티나", Spain: "스페인", France: "프랑스", England: "잉글랜드", Portugal: "포르투갈", Brazil: "브라질", Morocco: "모로코", Netherlands: "네덜란드", Belgium: "벨기에", Germany: "독일", Croatia: "크로아티아", Colombia: "콜롬비아", Mexico: "멕시코", Senegal: "세네갈", Uruguay: "우루과이", USA: "미국", Japan: "일본", Switzerland: "스위스", "IR Iran": "이란", "South Korea": "대한민국", Ecuador: "에콰도르", Austria: "오스트리아", Sweden: "스웨덴", "Türkiye": "튀르키예", Australia: "호주", Algeria: "알제리", Canada: "캐나다", Panama: "파나마", Egypt: "이집트", "Côte d'Ivoire": "코트디부아르", Scotland: "스코틀랜드", Czechia: "체코"
};

const teamColors = {
  ARG: ["#71c9ef", "#ffffff"], ESP: ["#d84a4a", "#efc438"], FRA: ["#294d9a", "#ffffff"], ENG: ["#ffffff", "#d23c4b"], POR: ["#d43c4f", "#1d7a4f"], BRA: ["#f2ca2b", "#14754b"], MAR: ["#c93c45", "#178a5a"], NED: ["#e96a39", "#1c3f79"], BEL: ["#d8b226", "#d13c44"], GER: ["#f4f4f2", "#262626"], CRO: ["#d44850", "#ffffff"], COL: ["#f5d12c", "#2c61aa"], MEX: ["#17744e", "#ce3f47"], SEN: ["#2f9c64", "#f0c734"], URU: ["#73c4e6", "#ffffff"], USA: ["#2d559d", "#d34252"], JPN: ["#ffffff", "#c92f43"], SUI: ["#d43d45", "#ffffff"], IRN: ["#f1f1ee", "#1e8c55"], KOR: ["#d33a4e", "#174b91"], ECU: ["#f1d037", "#274d98"], AUT: ["#d33b47", "#ffffff"], SWE: ["#e1bf2f", "#2b5b9a"], TUR: ["#d6434d", "#ffffff"], AUS: ["#efc62e", "#197451"], ALG: ["#1c8b59", "#ffffff"], CAN: ["#d83f4b", "#ffffff"], PAN: ["#2d579e", "#d23f4a"], EGY: ["#d63c48", "#ffffff"], CIV: ["#ef8b31", "#2d9a5a"], SCO: ["#2d5ba4", "#ffffff"], CZE: ["#d3424c", "#2d5da6"]
};

const roleAssignments = {
  GK: ["GK", "GK", "GK"],
  DEF: ["RB", "CB", "CB", "LB", "CB", "RB", "LB", "CB", "RB", "LB"],
  MID: ["DM", "CM", "CM", "AM", "CM", "RW", "LW", "DM", "AM", "CM"],
  FWD: ["ST", "LW", "RW", "ST", "LW", "RW", "ST", "LW", "RW"]
};

// The source data provides broad squad labels (GK / DEF / MID / FWD). Refine
// well-known Korean attacking roles so a FWD's list order never changes the
// position presented in the tactics board.
const tacticalRoleOverrides = {
  KOR: {
    "Heung Min Son": { primaryPosition: "ST", secondaryPositions: ["LW", "RW"] },
    "Guesung Cho": { primaryPosition: "ST", secondaryPositions: [] },
    "Hyeongyu Oh": { primaryPosition: "ST", secondaryPositions: [] },
    "Hee Chan Hwang": { primaryPosition: "LW", secondaryPositions: ["ST", "RW"] },
    "Kangin Lee": { primaryPosition: "RW", secondaryPositions: ["AM", "LW"] },
    "Junho Bae": { primaryPosition: "AM", secondaryPositions: ["LW", "RW"] },
    "Jae Sung Lee": { primaryPosition: "AM", secondaryPositions: ["CM", "RW"] },
    "Hyunjun Yang": { primaryPosition: "RW", secondaryPositions: ["LW", "AM"] },
    "Jisung Eom": { primaryPosition: "LW", secondaryPositions: ["RW", "AM"] },
    "Jingyu Kim": { primaryPosition: "AM", secondaryPositions: ["CM", "RW"] },
    "Donggyeong Lee": { primaryPosition: "AM", secondaryPositions: ["CM", "RW"] }
  }
};
const positionBases = {
  GK: [50, 18, 67, 42, 84, 75, 86], CB: [67, 37, 68, 62, 82, 79, 80], RB: [76, 48, 74, 72, 76, 73, 75], LB: [76, 48, 74, 72, 76, 73, 75],
  DM: [67, 55, 77, 73, 79, 76, 80], CM: [70, 63, 80, 78, 66, 71, 78], AM: [75, 72, 83, 83, 47, 65, 81], RW: [83, 76, 74, 83, 43, 66, 79], LW: [83, 76, 74, 83, 43, 66, 79], ST: [79, 83, 66, 76, 38, 75, 85]
};
const attributeKeys = ["pace", "shooting", "passing", "dribbling", "defense", "physical", "positioning"];
const roleTags = { GK: ["sweeper-keeper"], CB: ["ball-winner"], RB: ["overlapping-fullback"], LB: ["overlapping-fullback"], DM: ["anchor"], CM: ["playmaker"], AM: ["playmaker"], RW: ["direct-winger"], LW: ["direct-winger"], ST: ["pressing-forward"] };
const secondaryRoles = { GK: [], CB: ["DM"], RB: ["RW"], LB: ["LW"], DM: ["CM"], CM: ["DM", "AM"], AM: ["CM", "RW"], RW: ["LW", "AM"], LW: ["RW", "AM"], ST: ["AM"] };
const roleWeights = { GK: ["defense", "positioning", "passing", "physical"], CB: ["defense", "physical", "pace", "positioning"], RB: ["pace", "defense", "passing", "positioning"], LB: ["pace", "defense", "passing", "positioning"], DM: ["defense", "passing", "physical", "positioning"], CM: ["passing", "dribbling", "positioning", "defense"], AM: ["passing", "dribbling", "shooting", "positioning"], RW: ["pace", "dribbling", "shooting", "positioning"], LW: ["pace", "dribbling", "shooting", "positioning"], ST: ["shooting", "pace", "positioning", "physical"] };

const teamsSource = readCsv("teams.csv");
const squadSource = readCsv("squads_and_players.csv");
const playerStatsSource = readCsv("player_stats.csv");
const matchStatsSource = readCsv("match_team_stats.csv");
const lineupSource = readCsv("match_lineups.csv");
const matchesSource = readCsv("matches.csv");
const template = JSON.parse(readFileSync(templateFile, "utf8"));

const selectedTeams = teamsSource
  .sort((a, b) => toNumber(a.fifa_ranking_pre_tournament, 999) - toNumber(b.fifa_ranking_pre_tournament, 999))
  .slice(0, SELECTED_TEAM_COUNT);
const selectedIds = new Set(selectedTeams.map((item) => item.team_id));
const playerStatsById = new Map(playerStatsSource.map((item) => [item.player_id, item]));
const completedMatches = new Set(matchesSource.filter((item) => item.status === "Completed").map((item) => item.match_id));

function primaryRole(rawPosition, order) {
  const options = roleAssignments[rawPosition] || roleAssignments.MID;
  return options[Math.min(order, options.length - 1)];
}

function tacticalRole(teamCode, source, order) {
  const override = tacticalRoleOverrides[teamCode]?.[source.player_name];
  if (override) return override;
  const primaryPosition = primaryRole(source.position, order);
  return { primaryPosition, secondaryPositions: secondaryRoles[primaryPosition] };
}

function playerAttributes(role, source, tournament) {
  const base = positionBases[role];
  const caps = Math.min(7, Math.round(Math.sqrt(toNumber(source.caps)) / 1.7));
  const goals = Math.min(8, Math.round(Math.sqrt(toNumber(source.goals))));
  const tournamentGoal = Math.min(5, toNumber(tournament?.goals));
  const tournamentAssist = Math.min(4, toNumber(tournament?.assists));
  const minutes = Math.min(4, Math.round(toNumber(tournament?.minutes_played) / 240));
  const value = Math.min(6, Math.round(Math.log10(Math.max(1, toNumber(source.market_value_eur))) - 5));
  const height = clamp(Math.round((toNumber(source.height_cm) - 180) / 4), -2, 4);
  const attacker = ["ST", "RW", "LW", "AM"].includes(role), midfield = ["DM", "CM", "AM"].includes(role), defender = ["GK", "CB", "RB", "LB", "DM"].includes(role);
  const additions = [Math.round(value / 2) + minutes, (attacker ? goals + tournamentGoal : Math.round(goals / 3)) + Math.round(value / 2), (midfield ? caps : Math.round(caps / 2)) + tournamentAssist, (attacker || midfield ? Math.round(caps / 2) + tournamentAssist : 0), defender ? caps + minutes : 0, height + Math.round(caps / 3), caps + (attacker ? goals + tournamentGoal : 0)];
  return Object.fromEntries(attributeKeys.map((key, index) => [key, clamp(base[index] + additions[index], 15, 97)]));
}

function teamMatchSnapshot(teamId) {
  const rows = matchStatsSource.filter((item) => item.team_id === teamId);
  return {
    matches: rows.length,
    possession: Math.round(average(rows.map((item) => toNumber(item.possession_pct))) || 50),
    shots: Math.round(average(rows.map((item) => toNumber(item.total_shots))) || 0),
    shotsOnTarget: Math.round(average(rows.map((item) => toNumber(item.shots_on_target))) || 0),
    corners: Math.round(average(rows.map((item) => toNumber(item.corners))) || 0),
    fouls: Math.round(average(rows.map((item) => toNumber(item.fouls))) || 0),
    saves: Math.round(average(rows.map((item) => toNumber(item.saves))) || 0),
    lastUpdated: rows.map((item) => item.last_updated).sort().at(-1) || "2026-07-19"
  };
}

const players = [];
for (const teamSource of selectedTeams) {
  const roster = squadSource.filter((item) => item.team_id === teamSource.team_id);
  const groupCounts = new Map();
  for (const source of roster) {
    const sourceName = source.player_name.trim();
    // The source snapshot abbreviates a small number of surnames to "Mc".
    // Keep the source value while adding its club only when needed to make the
    // tactical board, timeline and substitution list distinguishable.
    const displayName = sourceName === "Mc" ? `Mc · ${source.club_team}` : sourceName;
    const groupIndex = groupCounts.get(source.position) || 0;
    groupCounts.set(source.position, groupIndex + 1);
    const role = tacticalRole(teamSource.fifa_code, source, groupIndex);
    const primaryPosition = role.primaryPosition;
    const tournament = playerStatsById.get(source.player_id) || {};
    const attributes = playerAttributes(primaryPosition, source, tournament);
    const weights = roleWeights[primaryPosition];
    players.push({
      // Player names in an upstream CSV can be abbreviated or repeated (for example
      // several "Mc" rows). Keep the source player ID in the public key so every
      // roster card, XI reference and drag target is unambiguous.
      id: `wc26-${teamSource.fifa_code.toLowerCase()}-${slug(sourceName) || "player"}-${source.player_id}`,
      sourcePlayerId: toNumber(source.player_id),
      teamId: teamSource.fifa_code.toLowerCase(),
      name: displayName,
      number: groupIndex + 1,
      squadOrder: roster.indexOf(source) + 1,
      sourcePosition: source.position,
      primaryPosition,
      secondaryPositions: role.secondaryPositions,
      overall: Math.round(average(weights.map((key) => attributes[key]))),
      attributes,
      roleTags: roleTags[primaryPosition],
      foot: "미표기",
      form: toNumber(tournament.matches_played) >= 4 ? "good" : "normal",
      stamina: clamp(88 + Math.min(6, Math.round(toNumber(tournament.minutes_played) / 180)), 84, 94),
      officialRecord: {
        dateOfBirth: source.date_of_birth,
        club: source.club_team,
        heightCm: toNumber(source.height_cm),
        caps: toNumber(source.caps),
        nationalTeamGoals: toNumber(source.goals),
        marketValueEur: toNumber(source.market_value_eur),
        tournament: { matches: toNumber(tournament.matches_played), starts: toNumber(tournament.matches_started), minutes: toNumber(tournament.minutes_played), goals: toNumber(tournament.goals), assists: toNumber(tournament.assists), saves: toNumber(tournament.saves) }
      }
    });
  }
}

function actualStartingXi(teamSource) {
  const recentMatch = matchesSource
    .filter((match) => completedMatches.has(match.match_id) && (match.home_team_id === teamSource.team_id || match.away_team_id === teamSource.team_id))
    .sort((a, b) => toNumber(b.match_id) - toNumber(a.match_id))[0];
  const lineup = recentMatch ? lineupSource.filter((item) => item.match_id === recentMatch.match_id && item.team_id === teamSource.team_id && item.is_starting_xi === "1") : [];
  const ids = lineup.map((item) => players.find((player) => player.sourcePlayerId === toNumber(item.player_id))?.id).filter(Boolean);
  return ids.length === 11 && new Set(ids).size === 11
    ? ids
    : players.filter((player) => player.teamId === teamSource.fifa_code.toLowerCase()).sort((a, b) => b.overall - a.overall).slice(0, 11).map((player) => player.id);
}

const teams = selectedTeams.map((source) => {
  const tournament = teamMatchSnapshot(source.team_id);
  const [primaryColor, secondaryColor] = teamColors[source.fifa_code] || ["#436f9e", "#e8eff8"];
  const possession = tournament.possession;
  const tacticalStyle = possession >= 55 ? "실제 대회 평균 점유를 바탕으로 한 점유·전개형" : tournament.shots >= 12 ? "실제 대회 슈팅 빈도를 바탕으로 한 빠른 전환형" : "실제 대회 팀 지표를 반영한 균형형";
  return {
    id: source.fifa_code.toLowerCase(),
    name: koreanNames[source.team_name] || source.team_name,
    officialName: source.team_name,
    shortName: source.fifa_code,
    primaryColor,
    secondaryColor,
    baseFormation: possession >= 55 ? "4-3-3" : "4-2-3-1",
    tacticalStyle,
    strengths: [`평균 점유 ${tournament.possession}%`, `평균 슈팅 ${tournament.shots}회`],
    weaknesses: [`평균 파울 ${tournament.fouls}회`, `상대 전술에 따른 변동`],
    defaultTactics: { pressing: tournament.fouls >= 12 ? "high" : "medium", defensiveLine: possession >= 54 ? "high" : "standard", attackWidth: tournament.corners >= 5 ? "wide" : "balanced", tempo: tournament.shots >= 12 ? "fast" : "balanced", buildUp: possession >= 55 ? "possession" : "mixed" },
    defaultStartingXI: actualStartingXi(source),
    tournament: { group: source.group_letter, confederation: source.confederation, fifaRanking: toNumber(source.fifa_ranking_pre_tournament), eloRating: toNumber(source.elo_rating), manager: source.manager_name, ...tournament }
  };
});

const defaultHome = teams.find((team) => team.id === "kor") || teams[0];
const defaultAway = teams.find((team) => team.id === "bra") || teams.find((team) => team.id !== defaultHome.id);
const dataset = {
  metadata: {
    schemaVersion: "1.2.0",
    datasetName: "TACTICA 2026 · 32 Nation Match Lab · CC0 World Cup Data",
    sourceType: "cc0",
    sourceName: "Mominullptr FIFA World Cup 2026 Dataset · CC0-1.0",
    sourceLinks: ["https://github.com/mominullptr/FIFA-World-Cup-2026-Dataset", "https://huggingface.co/datasets/Mominullptr/fifa-world-cup-2026-dataset"],
    license: "CC0-1.0 Public Domain Dedication · 원천 데이터는 출처 표기와 함께 사용",
    replacementContract: "schemaVersion 1.2.0 · teams, players, formations, matchScenarios fields required",
    purpose: "2026 월드컵 본선 참가국 중 개막 전 FIFA 랭킹 상위 32개국의 실제 팀·선수·대회 기록을 자유 매치업 전술 보드에 연결",
    selectionRule: "2026 월드컵 참가 48개국 중 개막 전 FIFA 랭킹이 높은 32개국을 선택 풀로 구성",
    scenarioDataType: "사용자 선택형 가상 전술 매치업 — 실제 선수·팀·대회 통계를 입력으로 하나 시뮬레이션 결과는 TACTICA 모델 값",
    attributeModel: "OVR·7개 스탯은 EA SPORTS FC/FIFA 공식 게임 능력치가 아닌, 실제 포지션·국가대표 기록·시장가치·이번 대회 출전 기록을 규칙으로 환산한 TACTICA 파생 지수",
    disclaimer: "팀·선수·대회 기록은 CC0 원천 데이터에서 가져왔습니다. 전술 보드용 세부 포지션, 기본 전술·포메이션, 파생 지수와 시뮬레이션 결과는 TACTICA 모델 값입니다.",
    lastUpdated: "2026-07-23",
    retrievedAt: "2026-07-23",
    dataSnapshot: "source dataset last verified 2026-07-19"
  },
  attributeLabels: template.attributeLabels,
  formations: template.formations,
  teams,
  players,
  matchScenarios: [{ id: "custom-match", stage: "CUSTOM MATCH LAB", label: "국가 직접 선택 매치업", homeTeamId: defaultHome.id, awayTeamId: defaultAway.id, venue: "TACTICA Match Lab", difficulty: 3, objective: "실제 대회 데이터와 선수 배치를 바탕으로 나만의 전술을 설계", opponentAnalysis: ["선택한 상대의 실제 대회 지표", "포지션별 선수 구성", "전술 상성 분석"] }]
};

mkdirSync(new URL("../data/", import.meta.url), { recursive: true });
writeFileSync(outputFile, `${JSON.stringify(dataset, null, 2)}\n`, "utf8");
console.log(`Created 32-nation data: ${teams.length} teams, ${players.length} players.`);
