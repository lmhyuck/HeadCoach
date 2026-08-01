const app = document.querySelector("#app");

const slotLayouts = {
  "4-3-3": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RCM: [68, 55], CM: [50, 50], LCM: [32, 55], RW: [82, 25], ST: [50, 17], LW: [18, 25]
  },
  "4-3-3-false-9": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RCM: [68, 55], CM: [50, 50], LCM: [32, 55], RW: [82, 25], CF: [50, 20], LW: [18, 25]
  },
  "4-2-3-1": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RDM: [63, 59], LDM: [37, 59], RAM: [78, 39], CAM: [50, 34], LAM: [22, 39], ST: [50, 15]
  },
  "3-4-3": {
    GK: [50, 91], RCB: [69, 78], CB: [50, 81], LCB: [31, 78], RWB: [83, 55],
    RCM: [63, 51], LCM: [37, 51], LWB: [17, 55], RW: [80, 24], ST: [50, 15], LW: [20, 24]
  },
  "4-4-2": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RM: [83, 54], RCM: [62, 53], LCM: [38, 53], LM: [17, 54], RST: [63, 21], LST: [37, 21]
  },
  "4-1-4-1": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    CDM: [50, 62], RM: [83, 51], RCM: [62, 49], LCM: [38, 49], LM: [17, 51], ST: [50, 16]
  },
  "5-3-2": {
    GK: [50, 91], RWB: [84, 66], RCB: [68, 78], CB: [50, 81], LCB: [32, 78], LWB: [16, 66],
    RCM: [64, 52], CM: [50, 48], LCM: [36, 52], RST: [63, 21], LST: [37, 21]
  },
  "4-3-1-2": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RCM: [65, 56], CM: [50, 60], LCM: [35, 56], CAM: [50, 38], RST: [63, 20], LST: [37, 20]
  },
  "4-3-3-holding": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    CDM: [50, 63], RCM: [66, 54], LCM: [34, 54], RW: [82, 25], ST: [50, 16], LW: [18, 25]
  },
  "4-3-3-attack": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RCM: [66, 55], CAM: [50, 41], LCM: [34, 55], RW: [82, 25], ST: [50, 16], LW: [18, 25]
  },
  "4-2-2-2": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RDM: [63, 62], LDM: [37, 62], RAM: [76, 42], LAM: [24, 42], RST: [63, 19], LST: [37, 19]
  },
  "4-3-2-1": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RCM: [65, 58], CM: [50, 61], LCM: [35, 58], RAM: [70, 37], LAM: [30, 37], ST: [50, 16]
  },
  "4-4-1-1": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RM: [83, 53], RCM: [62, 53], LCM: [38, 53], LM: [17, 53], CF: [50, 32], ST: [50, 15]
  },
  "4-4-2-holding": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RM: [83, 53], RDM: [63, 59], LDM: [37, 59], LM: [17, 53], RST: [63, 20], LST: [37, 20]
  },
  "4-1-2-1-2": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    CDM: [50, 65], RCM: [63, 53], LCM: [37, 53], CAM: [50, 36], RST: [63, 19], LST: [37, 19]
  },
  "4-5-1": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RM: [84, 51], RCM: [67, 53], CM: [50, 55], LCM: [33, 53], LM: [16, 51], ST: [50, 16]
  },
  "4-2-4": {
    GK: [50, 91], RB: [83, 75], RCB: [62, 79], LCB: [38, 79], LB: [17, 75],
    RDM: [63, 59], LDM: [37, 59], RW: [82, 31], LW: [18, 31], RST: [63, 16], LST: [37, 16]
  },
  "3-5-2": {
    GK: [50, 91], RCB: [68, 79], CB: [50, 82], LCB: [32, 79], RWB: [84, 65],
    CDM: [50, 63], RCM: [64, 52], LCM: [36, 52], LWB: [16, 65], RST: [63, 20], LST: [37, 20]
  },
  "3-4-2-1": {
    GK: [50, 91], RCB: [68, 79], CB: [50, 82], LCB: [32, 79], RWB: [84, 62],
    RCM: [64, 55], LCM: [36, 55], LWB: [16, 62], RAM: [70, 37], LAM: [30, 37], ST: [50, 16]
  },
  "3-4-1-2": {
    GK: [50, 91], RCB: [68, 79], CB: [50, 82], LCB: [32, 79], RWB: [84, 62],
    RCM: [64, 55], LCM: [36, 55], LWB: [16, 62], CAM: [50, 39], RST: [63, 19], LST: [37, 19]
  },
  "5-2-1-2": {
    GK: [50, 91], RWB: [84, 67], RCB: [68, 79], CB: [50, 82], LCB: [32, 79], LWB: [16, 67],
    RCM: [62, 55], LCM: [38, 55], CAM: [50, 39], RST: [63, 19], LST: [37, 19]
  },
  "5-2-2-1": {
    GK: [50, 91], RWB: [84, 67], RCB: [68, 79], CB: [50, 82], LCB: [32, 79], LWB: [16, 67],
    RCM: [62, 55], LCM: [38, 55], RAM: [70, 38], LAM: [30, 38], ST: [50, 16]
  },
  "5-4-1": {
    GK: [50, 91], RWB: [84, 67], RCB: [68, 79], CB: [50, 82], LCB: [32, 79], LWB: [16, 67],
    RM: [83, 52], RCM: [62, 53], LCM: [38, 53], LM: [17, 52], ST: [50, 16]
  }
};

const positionZones = [
  { id: "ST", label: "ST", coords: [50, 13] }, { id: "CF", label: "CF", coords: [50, 22] },
  { id: "LW", label: "LW", coords: [18, 25] }, { id: "RW", label: "RW", coords: [82, 25] },
  { id: "CAM", label: "CAM", coords: [50, 37] },
  { id: "LM", label: "LM", coords: [16, 52] }, { id: "LCM", label: "LCM", coords: [37, 52] }, { id: "CM", label: "CM", coords: [50, 52] }, { id: "RCM", label: "RCM", coords: [63, 52] }, { id: "RM", label: "RM", coords: [84, 52] },
  { id: "CDM", label: "CDM", coords: [50, 63] },
  { id: "LWB", label: "LWB", coords: [16, 66] }, { id: "RWB", label: "RWB", coords: [84, 66] },
  { id: "LB", label: "LB", coords: [16, 76] }, { id: "LCB", label: "LCB", coords: [38, 80] }, { id: "RCB", label: "RCB", coords: [62, 80] }, { id: "RB", label: "RB", coords: [84, 76] },
  { id: "GK", label: "GK", coords: [50, 91] }
];

const formationForPositionZone = {
  GK: "4-2-3-1", ST: "4-2-3-1", CF: "4-3-3-false-9", LW: "4-3-3", RW: "4-3-3",
  CAM: "4-2-3-1", CM: "4-3-3", CDM: "4-1-4-1", LCM: "4-3-3", RCM: "4-3-3",
  LM: "4-4-2", RM: "4-4-2", LWB: "5-3-2", RWB: "5-3-2",
  LB: "4-2-3-1", LCB: "4-2-3-1", RCB: "4-2-3-1", RB: "4-2-3-1"
};

const roleLabels = {
  "sweeper-keeper": "스위퍼 키퍼", "shot-stopper": "선방형 키퍼", distribution: "배급",
  "overlapping-fullback": "오버래핑 풀백", crossing: "크로스", "defensive-fullback": "수비형 풀백",
  "recovery-pace": "복귀 속도", "aerial-duel": "공중 경합", "ball-playing": "빌드업 수비수",
  "cover-defender": "커버 수비수", anchor: "앵커", "ball-winner": "볼 위너",
  "box-to-box": "박스 투 박스", "switch-play": "전환 패스", "creative-passer": "창의적 패서",
  "inverted-winger": "인버티드 윙어", dribbler: "드리블러", playmaker: "플레이메이커",
  "set-piece": "세트피스", "inside-forward": "인사이드 포워드", "counter-attack": "역습형",
  "pressing-forward": "압박형 공격수", finisher: "피니셔", "super-sub": "조커", poacher: "포처",
  "attacking-fullback": "공격형 풀백", "tempo-setter": "템포 조율", "long-shot": "중거리",
  "1v1-specialist": "1대1 특화", "direct-winger": "측면 돌파형", "complete-forward": "완성형 공격수",
  "inverted-fullback": "인버티드 풀백", "line-breaker": "전진 패스", regista: "레지스타",
  "wide-playmaker": "와이드 플레이메이커", "false-nine": "폴스 나인", "link-up": "연계형",
  aggressive: "대인 수비", "wide-playmaker": "측면 플레이메이커", "target-forward": "타깃형 공격수",
  "wide-playmaker": "측면 플레이메이커", "counter-press": "카운터 프레스"
};

const statLabels = {
  pace: "속도", shooting: "슈팅", passing: "패스", dribbling: "드리블",
  defense: "수비", physical: "피지컬", positioning: "위치 선정"
};

const DEFAULT_TACTICS = Object.freeze({
  pressing: "medium",
  defensiveLine: "standard",
  attackWidth: "wide",
  tempo: "balanced",
  buildUp: "mixed"
});

const TACTIC_OPTIONS = Object.freeze({
  pressing: ["low", "medium", "high"],
  defensiveLine: ["low", "standard", "high"],
  attackWidth: ["narrow", "standard", "wide"],
  tempo: ["slow", "balanced", "fast"],
  buildUp: ["possession", "mixed", "direct"]
});

const state = {
  data: null,
  scenarioId: null,
  formationId: "4-2-3-1",
  lineup: {},
  freePositions: {},
  selectedPlayerId: null,
  dragPlayerId: null,
  playerStates: {},
  tactics: { ...DEFAULT_TACTICS },
  result: null,
  analysisRevealed: false,
  savedPlans: [],
  resultViewOpen: false,
  resultTab: "overview",
  rightPanelTab: "match",
  theme: "dark",
  activeTab: "starters",
  squadDensity: "detail",
  squadFilter: "all",
  shareNotice: "",
  dataNotice: "",
  customHomeTeamId: null,
  customAwayTeamId: null,
  methodologyOpen: false,
  coachAdvice: null,
  playback: null,
  playbackTimer: null
};

const WORKSPACE_DRAFT_KEY = "tactica-2026-workspace-v2";

function applyDarkTheme() {
  state.theme = "dark";
  document.documentElement?.setAttribute("data-theme", "dark");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#071d1a");
}

function normalizeTactics(candidate, fallback = DEFAULT_TACTICS) {
  return Object.fromEntries(Object.entries(TACTIC_OPTIONS).map(([key, options]) => [
    key,
    options.includes(candidate?.[key]) ? candidate[key] : (options.includes(fallback?.[key]) ? fallback[key] : DEFAULT_TACTICS[key])
  ]));
}

function safeIdentifier(value) {
  return typeof value === "string" && /^[a-z0-9][a-z0-9_-]{1,79}$/i.test(value);
}

function usableFormationLayout(item) {
  return item?.slots?.every((slot) => {
    const coords = slotLayouts[item.id]?.[slot];
    return Array.isArray(coords) && coords.length === 2 && coords.every(Number.isFinite);
  });
}

function validateDataset(dataset) {
  const requiredAttributes = ["pace", "shooting", "passing", "dribbling", "defense", "physical", "positioning"];
  const teams = Array.isArray(dataset?.teams) ? dataset.teams : [];
  const players = Array.isArray(dataset?.players) ? dataset.players : [];
  const teamIds = new Set(teams.map((item) => item.id));
  const playerIds = new Set(players.map((item) => item.id));
  const playerTeamById = new Map(players.map((item) => [item.id, item.teamId]));
  const formationIsValid = (item) => safeIdentifier(item?.id) && typeof item?.label === "string" && Array.isArray(item.slots) && item.slots.length === 11 && new Set(item.slots).size === 11 && item.slots.every(safeIdentifier) && usableFormationLayout(item);
  const scenarioIsValid = (item) => safeIdentifier(item?.id) && teamIds.has(item.homeTeamId) && teamIds.has(item.awayTeamId) && item.homeTeamId !== item.awayTeamId;
  const playerIsValid = (item) => safeIdentifier(item?.id) && teamIds.has(item.teamId) && typeof item.primaryPosition === "string" && Array.isArray(item.secondaryPositions) && Array.isArray(item.roleTags) && Number.isFinite(item.overall) && requiredAttributes.every((key) => Number.isFinite(item.attributes?.[key]));
  const teamIsValid = (item) => safeIdentifier(item?.id) && typeof item.name === "string" && typeof item.shortName === "string" && /^#[0-9a-f]{6}$/i.test(item.primaryColor || "") && Array.isArray(item.defaultStartingXI) && item.defaultStartingXI.length === 11 && new Set(item.defaultStartingXI).size === 11 && item.defaultStartingXI.every((id) => playerTeamById.get(id) === item.id);
  return Boolean(
    dataset?.metadata?.schemaVersion && dataset?.metadata?.sourceType && dataset?.metadata?.sourceName &&
    Array.isArray(dataset?.teams) && dataset.teams.length >= 2 &&
    Array.isArray(dataset?.players) && dataset.players.length &&
    Array.isArray(dataset?.formations) && dataset.formations.length &&
    Array.isArray(dataset?.matchScenarios) && dataset.matchScenarios.length &&
    teamIds.size === dataset.teams.length && playerIds.size === dataset.players.length &&
    dataset.formations.every(formationIsValid) &&
    dataset.matchScenarios.every(scenarioIsValid) &&
    players.every(playerIsValid) &&
    teams.every(teamIsValid)
  );
}

function validLineupForFormation(candidate, teamId) {
  const slots = formation()?.slots || [];
  const entries = Object.entries(candidate || {});
  const playerIds = entries.map(([, id]) => id);
  return entries.length === slots.length && slots.every((slot) => safeIdentifier(candidate?.[slot])) && new Set(playerIds).size === slots.length && playerIds.every((id) => player(id)?.teamId === teamId);
}

function sanitizedFreePositions(source, homeIds) {
  return Object.fromEntries(Object.entries(source || {})
    .filter(([id, coords]) => homeIds.has(id) && Array.isArray(coords) && coords.length === 2 && coords.every(Number.isFinite))
    .map(([id, coords]) => [id, [clamp(coords[0], 7, 93), clamp(coords[1], 8, 92)]]));
}

function persistWorkspaceDraft() {
  if (!state.data) return;
  try {
    const draft = {
      version: 2,
      scenarioId: state.scenarioId,
      customHomeTeamId: state.customHomeTeamId,
      customAwayTeamId: state.customAwayTeamId,
      formationId: state.formationId,
      lineup: state.lineup,
      freePositions: state.freePositions,
      tactics: state.tactics,
      savedPlans: state.savedPlans,
      activeTab: state.activeTab,
      squadDensity: state.squadDensity,
      squadFilter: state.squadFilter
    };
    window.localStorage.setItem(WORKSPACE_DRAFT_KEY, JSON.stringify(draft));
  } catch (_) {
    // Private browsing or storage quotas should not block the tactical board.
  }
}

function restoreWorkspaceDraft() {
  try {
    const draft = JSON.parse(window.localStorage.getItem(WORKSPACE_DRAFT_KEY) || "null");
    if (!draft || draft.version !== 2 || !state.data.matchScenarios.some((item) => item.id === draft.scenarioId)) return false;
    if (state.data.teams.some((item) => item.id === draft.customHomeTeamId)) state.customHomeTeamId = draft.customHomeTeamId;
    if (state.data.teams.some((item) => item.id === draft.customAwayTeamId)) state.customAwayTeamId = draft.customAwayTeamId;
    resetForScenario(draft.scenarioId);
    if (state.data.formations.some((item) => item.id === draft.formationId)) state.formationId = draft.formationId;
    const homeIds = new Set(teamPlayers(homeTeam().id).map((item) => item.id));
    const nextLineup = Object.fromEntries(formation().slots.map((slot) => [slot, draft.lineup?.[slot]]));
    state.lineup = validLineupForFormation(nextLineup, homeTeam().id) ? nextLineup : buildLineup(homeTeam());
    state.freePositions = sanitizedFreePositions(draft.freePositions, homeIds);
    state.tactics = normalizeTactics(draft.tactics, state.tactics);
    state.savedPlans = Array.isArray(draft.savedPlans) ? draft.savedPlans.slice(0, 2) : [];
    state.activeTab = draft.activeTab === "bench" ? "bench" : "starters";
    state.squadDensity = draft.squadDensity === "dense" ? "dense" : "detail";
    state.squadFilter = ["all", "attack", "midfield", "defense", "goalkeeper"].includes(draft.squadFilter) ? draft.squadFilter : "all";
    syncFreePositions(false);
    return true;
  } catch (_) {
    return false;
  }
}

function sharedWorkspacePayload() {
  return {
    version: 1,
    scenarioId: state.scenarioId,
    customHomeTeamId: state.customHomeTeamId,
    customAwayTeamId: state.customAwayTeamId,
    formationId: state.formationId,
    lineup: state.lineup,
    freePositions: state.freePositions,
    tactics: state.tactics
  };
}

function applyWorkspaceConfig(config) {
  if (!config || !state.data.matchScenarios.some((item) => item.id === config.scenarioId)) return false;
  if (state.data.teams.some((item) => item.id === config.customHomeTeamId)) state.customHomeTeamId = config.customHomeTeamId;
  if (state.data.teams.some((item) => item.id === config.customAwayTeamId)) state.customAwayTeamId = config.customAwayTeamId;
  resetForScenario(config.scenarioId);
  if (state.data.formations.some((item) => item.id === config.formationId)) state.formationId = config.formationId;
  const homeIds = new Set(teamPlayers(homeTeam().id).map((item) => item.id));
  const nextLineup = Object.fromEntries(formation().slots.map((slot) => [slot, config.lineup?.[slot]]));
  state.lineup = validLineupForFormation(nextLineup, homeTeam().id) ? nextLineup : buildLineup(homeTeam());
  state.freePositions = sanitizedFreePositions(config.freePositions, homeIds);
  state.tactics = normalizeTactics(config.tactics, state.tactics);
  syncFreePositions(false);
  return true;
}

function restoreSharedWorkspace() {
  try {
    const shared = new URLSearchParams(window.location.hash.slice(1)).get("tactica");
    if (!shared) return false;
    const config = JSON.parse(decodeURIComponent(escape(window.atob(shared))));
    return applyWorkspaceConfig(config);
  } catch (_) {
    return false;
  }
}

async function copyShareLink() {
  try {
    const encoded = window.btoa(unescape(encodeURIComponent(JSON.stringify(sharedWorkspacePayload()))));
    const url = new URL(window.location.href);
    url.hash = `tactica=${encoded}`;
    await navigator.clipboard.writeText(url.toString());
    state.shareNotice = "링크를 복사했습니다.";
  } catch (_) {
    state.shareNotice = "링크 복사에 실패했습니다.";
  }
  render();
}

function datasetStatus() {
  const metadata = state.data?.metadata || {};
  const isMock = metadata.sourceType === "mock";
  return {
    label: isMock ? "DEMO DATA" : "VERIFIED DATA",
    note: isMock ? "가상 데이터" : metadata.sourceName || "검증 데이터",
    isMock
  };
}

function datasetProvenance() {
  const metadata = state.data?.metadata || {};
  const source = datasetStatus();
  return {
    ...source,
    datasetName: metadata.datasetName || "TACTICA 데이터 세트",
    sourceName: metadata.sourceName || "출처 미기록",
    schemaVersion: metadata.schemaVersion || "-",
    lastUpdated: metadata.lastUpdated || "-",
    purpose: metadata.purpose || "전술 보드용 선수·팀·경기 데이터",
    selectionRule: metadata.selectionRule || "-",
    license: metadata.license || "출처 데이터의 이용 조건을 확인하세요.",
    attributeModel: metadata.attributeModel || "능력치 산정 기준을 기록하세요.",
    scenarioDataType: metadata.scenarioDataType || "경기 시나리오 성격을 확인하세요.",
    disclaimer: metadata.disclaimer || "데이터 출처와 이용 허가를 확인하세요.",
    replacementContract: metadata.replacementContract || "teams, players, formations, matchScenarios"
  };
}

function hasUnsafeRenderableText(value) {
  // Player names and clubs legitimately contain apostrophes, accents and ampersands.
  // Imported data is rendered as text in the current template; a literal tag opener is
  // the unsafe case we reject before it reaches any innerHTML interpolation.
  if (typeof value === "string") return /</.test(value);
  if (Array.isArray(value)) return value.some(hasUnsafeRenderableText);
  if (value && typeof value === "object") return Object.values(value).some(hasUnsafeRenderableText);
  return false;
}

async function importDatasetFile(file) {
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (hasUnsafeRenderableText(imported)) throw new Error("화면에 안전하게 표시할 수 없는 특수 문자가 포함되어 있습니다.");
    if (!validateDataset(imported)) throw new Error("필수 필드 또는 선발 XI 구성이 누락되었습니다.");
    clearPlayback();
    state.data = imported;
    state.savedPlans = [];
    state.result = null;
    state.analysisRevealed = false;
    state.resultViewOpen = false;
    resetForScenario(imported.matchScenarios[0].id);
    state.dataNotice = `${imported.metadata.datasetName || "가져온 데이터"}를 적용했습니다.`;
  } catch (error) {
    state.dataNotice = `데이터를 적용하지 못했습니다: ${error.message}`;
  }
  render();
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const average = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
const hash = (text) => [...text].reduce((seed, char) => ((seed << 5) - seed + char.charCodeAt(0)) | 0, 0) >>> 0;
const seeded = (text) => {
  let value = hash(String(text)) ^ 0x9e3779b9;
  value = Math.imul(value ^ (value >>> 16), 0x85ebca6b);
  value = Math.imul(value ^ (value >>> 13), 0xc2b2ae35);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
};

function currentScenario() {
  const scenario = state.data.matchScenarios.find((item) => item.id === state.scenarioId);
  if (!scenario) return state.data.matchScenarios[0];
  if (scenario.id !== "custom-match") return scenario;
  return {
    ...scenario,
    homeTeamId: state.customHomeTeamId || scenario.homeTeamId,
    awayTeamId: state.customAwayTeamId || scenario.awayTeamId
  };
}

function team(id) {
  return state.data.teams.find((item) => item.id === id);
}

function teamPlayers(teamId) {
  return state.data.players.filter((player) => player.teamId === teamId);
}

function player(id) {
  return state.data.players.find((item) => item.id === id);
}

function formation() {
  return state.data.formations.find((item) => item.id === state.formationId);
}

function homeTeam() {
  return team(currentScenario().homeTeamId);
}

function awayTeam() {
  return team(currentScenario().awayTeamId);
}

function basePosition(slot) {
  if (slot === "CF") return "ST";
  if (slot === "CDM") return "DM";
  if (["RST", "LST"].includes(slot)) return "ST";
  if (slot === "RM") return "RW";
  if (slot === "LM") return "LW";
  if (["RDM", "LDM"].includes(slot)) return "DM";
  if (["RCM", "LCM"].includes(slot)) return "CM";
  if (["RAM", "LAM"].includes(slot)) return "AM";
  if (["RCB", "LCB"].includes(slot)) return "CB";
  if (["RWB"].includes(slot)) return "RB";
  if (["LWB"].includes(slot)) return "LB";
  return slot;
}

function positionFit(playerData, slot) {
  if (!playerData) return 0;
  const base = basePosition(slot);
  if (playerData.primaryPosition === base) return 100;
  if (playerData.secondaryPositions.includes(base)) return 85;
  const widePair = ["RW", "LW", "AM"];
  if (widePair.includes(playerData.primaryPosition) && widePair.includes(base)) return 70;
  if (["RB", "LB"].includes(playerData.primaryPosition) && ["RB", "LB"].includes(base)) return 70;
  if (["DM", "CM", "AM"].includes(playerData.primaryPosition) && ["DM", "CM", "AM"].includes(base)) return 65;
  if (["ST", "LW", "RW"].includes(playerData.primaryPosition) && ["ST", "LW", "RW"].includes(base)) return 60;
  return 45;
}

function positionStatRating(playerData, slot) {
  if (!playerData) return 0;
  const weights = {
    GK: { defense: .35, positioning: .3, physical: .2, passing: .1, pace: .05 },
    CB: { defense: .38, physical: .25, positioning: .2, pace: .12, passing: .05 },
    RB: { pace: .25, defense: .24, passing: .18, positioning: .14, physical: .11, dribbling: .08 },
    LB: { pace: .25, defense: .24, passing: .18, positioning: .14, physical: .11, dribbling: .08 },
    DM: { defense: .28, passing: .25, physical: .18, positioning: .17, dribbling: .07, pace: .05 },
    CM: { passing: .28, dribbling: .2, positioning: .2, defense: .15, physical: .1, pace: .07 },
    AM: { passing: .27, dribbling: .24, positioning: .2, shooting: .16, pace: .08, physical: .05 },
    RW: { pace: .26, dribbling: .27, shooting: .17, passing: .15, positioning: .1, physical: .05 },
    LW: { pace: .26, dribbling: .27, shooting: .17, passing: .15, positioning: .1, physical: .05 },
    ST: { shooting: .34, positioning: .25, pace: .15, physical: .14, dribbling: .08, passing: .04 }
  };
  const profile = weights[basePosition(slot)] || weights.CM;
  return Math.round(Object.entries(profile).reduce((sum, [key, weight]) => sum + playerData.attributes[key] * weight, 0));
}

function playerState(playerData, scenarioId) {
  if (!state.playerStates[playerData.id]) {
    const form = playerData.form === "good" ? "good" : seeded(`${scenarioId}-${playerData.id}`) > 0.82 ? "poor" : "normal";
    const baseStamina = form === "good" ? 91 : form === "poor" ? 68 : 79;
    const stamina = clamp(Math.round(baseStamina + seeded(playerData.id) * 13 - 5), 54, 99);
    state.playerStates[playerData.id] = { form, stamina };
  }
  return state.playerStates[playerData.id];
}

function formLabel(form) {
  return form === "good" ? "상승" : form === "poor" ? "저하" : "보통";
}

function formMultiplier(form) {
  return form === "good" ? 1.06 : form === "poor" ? 0.94 : 1;
}

function staminaMultiplier(stamina) {
  return stamina < 40 ? 0.88 : stamina < 70 ? 0.95 : 1;
}

function buildLineup(teamData, sourcePlayers = null) {
  const candidates = sourcePlayers?.length ? sourcePlayers : teamData.defaultStartingXI.map(player);
  const available = [...candidates];
  const next = {};
  formation().slots.forEach((slot) => {
    const ranked = available
      .map((playerData) => ({ playerData, score: positionFit(playerData, slot) * 2 + playerData.overall }))
      .sort((a, b) => b.score - a.score);
    const best = ranked[0]?.playerData;
    if (best) {
      next[slot] = best.id;
      available.splice(available.findIndex((item) => item.id === best.id), 1);
    }
  });
  return next;
}

function formationById(formationId) {
  return state.data.formations.find((item) => item.id === formationId);
}

function slotCoordinate(formationId, slot) {
  return slotLayouts[formationId]?.[slot] || [50, 50];
}

function syncFreePositions(snapToFormation = false) {
  const next = {};
  Object.entries(state.lineup).forEach(([slot, playerId]) => {
    const existing = state.freePositions[playerId];
    next[playerId] = snapToFormation || !existing ? [...slotCoordinate(state.formationId, slot)] : existing;
  });
  state.freePositions = next;
}

function placementForFormation(formationId) {
  const targetFormation = formationById(formationId);
  const slots = [...(targetFormation?.slots || [])];
  const players = currentLineupPlayers();
  const lineup = {};
  const remainingSlots = [...slots];
  const remainingPlayers = [...players];
  let totalCost = 0;

  while (remainingSlots.length && remainingPlayers.length) {
    let bestPair = null;
    remainingSlots.forEach((slot) => {
      const target = slotCoordinate(formationId, slot);
      remainingPlayers.forEach((playerData) => {
        const current = state.freePositions[playerData.id] || slotCoordinate(state.formationId, slotForPlayer(playerData.id));
        const distance = Math.hypot((current[0] - target[0]) * .86, current[1] - target[1]);
        const fitPenalty = (100 - positionFit(playerData, slot)) * .045;
        const cost = distance + fitPenalty;
        if (!bestPair || cost < bestPair.cost) bestPair = { slot, playerData, cost };
      });
    });
    if (!bestPair) break;
    lineup[bestPair.slot] = bestPair.playerData.id;
    totalCost += bestPair.cost;
    remainingSlots.splice(remainingSlots.indexOf(bestPair.slot), 1);
    remainingPlayers.splice(remainingPlayers.indexOf(bestPair.playerData), 1);
  }

  return { formationId, lineup, cost: totalCost / Math.max(1, players.length) };
}

function autoDetectFormation() {
  const candidates = state.data.formations
    .map((item) => placementForFormation(item.id))
    .filter((item) => Object.keys(item.lineup).length === currentLineupPlayers().length)
    .sort((a, b) => a.cost - b.cost);
  const best = candidates[0];
  if (!best) return;
  state.formationId = best.formationId;
  state.lineup = best.lineup;
  syncFreePositions(false);
}

function positionZoneAt(x, y) {
  const nearest = positionZones
    .map((zone) => ({ zone, distance: Math.hypot((zone.coords[0] - x) * .86, zone.coords[1] - y) }))
    .sort((a, b) => a.distance - b.distance)[0];
  return nearest?.distance <= 6.5 ? nearest.zone : null;
}

function movePlayerToPosition(playerId, nextPosition) {
  const playerData = player(playerId);
  if (!playerData || playerData.teamId !== homeTeam().id) return false;
  const currentSlot = slotForPlayer(playerId);

  if (currentSlot) {
    state.freePositions[playerId] = nextPosition;
  } else {
    const nearest = Object.entries(state.lineup)
      .map(([slot, assignedId]) => {
        const current = state.freePositions[assignedId] || slotCoordinate(state.formationId, slot);
        return { slot, assignedId, distance: Math.hypot(current[0] - nextPosition[0], current[1] - nextPosition[1]) };
      })
      .sort((a, b) => a.distance - b.distance)[0];
    if (!nearest) return false;
    state.lineup[nearest.slot] = playerId;
    delete state.freePositions[nearest.assignedId];
    state.freePositions[playerId] = nextPosition;
  }
  return true;
}

function clearPlacementResult() {
  state.selectedPlayerId = null;
  state.result = null;
  state.resultViewOpen = false;
  state.coachAdvice = null;
  clearPlayback();
}

function placePlayerFreely(playerId, x, y) {
  const nextPosition = [clamp(x, 7, 93), clamp(y, 8, 92)];
  if (!movePlayerToPosition(playerId, nextPosition)) return;
  autoDetectFormation();
  clearPlacementResult();
  render();
}

function placePlayerInPositionZone(playerId, zone) {
  if (!movePlayerToPosition(playerId, [...zone.coords])) return;
  const formationId = formationForPositionZone[zone.id] || state.formationId;
  const placement = placementForFormation(formationId);
  if (Object.keys(placement.lineup).length === currentLineupPlayers().length) {
    state.formationId = formationId;
    state.lineup = placement.lineup;
    syncFreePositions(false);
  } else {
    autoDetectFormation();
  }
  clearPlacementResult();
  render();
}

function resetForScenario(scenarioId) {
  state.scenarioId = scenarioId;
  const selectedScenario = currentScenario();
  state.formationId = team(selectedScenario.homeTeamId).baseFormation || "4-2-3-1";
  state.playerStates = {};
  state.lineup = buildLineup(homeTeam());
  state.freePositions = {};
  syncFreePositions(true);
  state.selectedPlayerId = null;
  state.result = null;
  state.analysisRevealed = false;
  state.savedPlans = [];
  state.resultViewOpen = false;
  state.resultTab = "overview";
  state.rightPanelTab = "match";
  state.activeTab = "starters";
  state.tactics = normalizeTactics(homeTeam().defaultTactics, DEFAULT_TACTICS);
  state.coachAdvice = null;
  clearPlayback();
}

function currentLineupPlayers() {
  return Object.values(state.lineup).map(player).filter(Boolean);
}

function benchPlayers() {
  const assigned = new Set(Object.values(state.lineup));
  return teamPlayers(homeTeam().id).filter((playerData) => !assigned.has(playerData.id));
}

function usedSubstitutionIds(live = state.playback) {
  return new Set((live?.substitutions || []).flatMap((substitution) => [substitution.outId, substitution.inId]));
}

function liveBenchPlayers() {
  const used = usedSubstitutionIds();
  return benchPlayers().filter((playerData) => !used.has(playerData.id));
}

const substitutionPositionOrder = ["ST", "CF", "LW", "RW", "CAM", "LM", "RM", "LCM", "CM", "RCM", "CDM", "LWB", "RWB", "LB", "RB", "LCB", "CB", "RCB", "GK"];

function substitutionPosition(playerData, isStarter = false) {
  const source = isStarter ? (slotForPlayer(playerData.id) || playerData.primaryPosition) : playerData.primaryPosition;
  return positionLabel(source);
}

function positionLabel(position) {
  const labels = {
    RST: "ST", LST: "ST", AM: "CAM", RAM: "CAM", LAM: "CAM",
    DM: "CDM", RDM: "CDM", LDM: "CDM"
  };
  return labels[position] || position;
}

function squadPositionGroup(playerData) {
  const position = substitutionPosition(playerData);
  if (["GK"].includes(position)) return "goalkeeper";
  if (["CB", "LCB", "RCB", "LB", "RB", "LWB", "RWB"].includes(position)) return "defense";
  if (["CDM", "CM", "LCM", "RCM", "CAM", "LM", "RM"].includes(position)) return "midfield";
  if (["ST", "CF", "RST", "LST", "LW", "RW"].includes(position)) return "attack";
  return "midfield";
}

function sortSubstitutionPlayers(players, isStarter = false) {
  return [...players].sort((first, second) => {
    const firstRank = substitutionPositionOrder.indexOf(substitutionPosition(first, isStarter));
    const secondRank = substitutionPositionOrder.indexOf(substitutionPosition(second, isStarter));
    const rankDifference = (firstRank < 0 ? 99 : firstRank) - (secondRank < 0 ? 99 : secondRank);
    return rankDifference || first.name.localeCompare(second.name, "ko");
  });
}

function assignPlayer(slot, playerId) {
  const playerData = player(playerId);
  if (!playerData || playerData.teamId !== homeTeam().id) return;
  Object.entries(state.lineup).forEach(([currentSlot, assignedId]) => {
    if (assignedId === playerId) delete state.lineup[currentSlot];
  });
  const previous = state.lineup[slot];
  state.lineup[slot] = playerId;
  if (previous && previous !== playerId) {
    const openSlot = formation().slots.find((candidate) => !state.lineup[candidate]);
    if (openSlot) state.lineup[openSlot] = previous;
  }
  syncFreePositions(true);
  state.selectedPlayerId = null;
  state.result = null;
  state.resultViewOpen = false;
  state.coachAdvice = null;
  clearPlayback();
  render();
}

function metricDeltaLabel(value) {
  return value >= 75 ? "강점" : value >= 60 ? "안정" : value >= 48 ? "보통" : "주의";
}

function tacticText() {
  const maps = {
    pressing: { low: "낮은 압박", medium: "중간 압박", high: "높은 압박" },
    defensiveLine: { low: "낮은 라인", standard: "보통 라인", high: "높은 라인" },
    attackWidth: { narrow: "좁은 폭", standard: "보통 폭", wide: "넓은 폭" },
    tempo: { slow: "느린 템포", balanced: "균형 템포", fast: "빠른 템포" },
    buildUp: { possession: "점유 빌드업", mixed: "혼합 빌드업", direct: "직선 빌드업" }
  };
  return Object.entries(state.tactics).map(([key, value]) => maps[key][value]).join(" · ");
}

function calculateLegacySimulation() {
  const scenario = currentScenario();
  const homePlayers = currentLineupPlayers();
  const opponentPlayers = awayTeam().defaultStartingXI.map(player);
  const playerBySlot = Object.fromEntries(Object.entries(state.lineup).map(([slot, id]) => [slot, player(id)]));
  const category = (slots) => slots.map((slot) => playerBySlot[slot]).filter(Boolean);
  const attackPlayers = category(formation().slots.filter((slot) => ["ST", "RW", "LW", "AM"].includes(basePosition(slot))));
  const midfieldPlayers = category(formation().slots.filter((slot) => ["DM", "CM", "AM"].includes(basePosition(slot))));
  const defensivePlayers = category(formation().slots.filter((slot) => ["GK", "RB", "LB", "CB"].includes(basePosition(slot))));
  const effective = (players, keys) => average(players.map((playerData) => {
    const playerMatchState = playerState(playerData, scenario.id);
    return average(keys.map((key) => playerData.attributes[key])) * formMultiplier(playerMatchState.form) * staminaMultiplier(playerMatchState.stamina);
  }));
  const opponentEffective = (players, keys) => average(players.map((playerData) => average(keys.map((key) => playerData.attributes[key]))));
  const attackBase = effective(attackPlayers, ["pace", "shooting", "dribbling", "positioning"]);
  const possessionBase = effective([...midfieldPlayers, ...attackPlayers], ["passing", "dribbling", "positioning"]);
  const defenseBase = effective(defensivePlayers, ["defense", "physical", "pace", "positioning"]);
  const opponentAttack = opponentEffective(opponentPlayers.filter((item) => ["ST", "RW", "LW", "AM"].includes(item.primaryPosition)), ["pace", "shooting", "dribbling"]);
  const opponentDefense = opponentEffective(opponentPlayers.filter((item) => ["GK", "RB", "LB", "CB", "DM"].includes(item.primaryPosition)), ["defense", "physical", "pace"]);
  const opponentPossession = opponentEffective(opponentPlayers.filter((item) => ["DM", "CM", "AM", "RW", "LW"].includes(item.primaryPosition)), ["passing", "dribbling", "positioning"]);
  const fits = formation().slots.map((slot) => positionFit(playerBySlot[slot], slot));
  const fitAverage = average(fits);
  const lowStamina = homePlayers.filter((item) => playerState(item, scenario.id).stamina < 70);
  const hasRole = (role) => homePlayers.some((item) => item.roleTags.includes(role));
  let attack = attackBase;
  let possession = possessionBase;
  let defense = defenseBase;
  let risk = 50;
  const effects = [];

  if (state.tactics.pressing === "high") { defense += 4; risk += 7; effects.push("높은 압박으로 상대의 후방 전개를 흔듭니다."); }
  if (state.tactics.pressing === "low") { defense += 2; possession -= 4; effects.push("낮은 압박으로 수비 블록을 안정화합니다."); }
  if (state.tactics.defensiveLine === "high") { possession += 3; risk += opponentAttack > 78 ? 10 : 5; effects.push("높은 라인이 점유를 돕지만 뒷공간 위험을 키웁니다."); }
  if (state.tactics.defensiveLine === "low") { defense += 4; attack -= 3; effects.push("낮은 수비 라인으로 역습 실점 위험을 줄입니다."); }
  if (state.tactics.attackWidth === "wide") { attack += hasRole("overlapping-fullback") || hasRole("attacking-fullback") ? 5 : 3; possession -= 1; effects.push("넓은 폭으로 측면 1대1 기회를 만듭니다."); }
  if (state.tactics.attackWidth === "narrow") { possession += 3; attack -= 1; effects.push("좁은 폭으로 중앙 패스 연결을 강화합니다."); }
  if (state.tactics.tempo === "fast") { attack += 4; possession -= 3; risk += 3; effects.push("빠른 템포가 기회 수와 체력 소모를 함께 높입니다."); }
  if (state.tactics.tempo === "slow") { possession += 4; attack -= 2; effects.push("느린 템포가 점유 안정성을 높입니다."); }
  if (state.tactics.buildUp === "possession") { possession += hasRole("playmaker") || hasRole("regista") ? 5 : 3; attack -= 1; effects.push("점유 빌드업이 중원 전개를 강화합니다."); }
  if (state.tactics.buildUp === "direct") { attack += hasRole("counter-attack") || hasRole("direct-winger") ? 5 : 3; possession -= 4; risk += 2; effects.push("직선 빌드업이 빠른 공격수의 침투를 살립니다."); }

  const fitPenalty = (100 - fitAverage) * 0.18;
  attack -= fitPenalty;
  possession -= fitPenalty;
  defense -= fitPenalty;
  if (lowStamina.length) {
    defense -= lowStamina.length * 1.4;
    risk += lowStamina.length * 3;
    effects.push(`체력 70 미만 선수가 ${lowStamina.length}명 있어 후반 수비 집중력이 낮아집니다.`);
  }

  attack = Math.round(clamp(attack, 35, 95));
  possession = Math.round(clamp(possession, 35, 95));
  defense = Math.round(clamp(defense, 35, 95));
  risk = Math.round(clamp(risk + opponentAttack - defense * 0.35, 20, 92));
  const seedText = `${scenario.id}-${Object.values(state.lineup).join("-")}-${JSON.stringify(state.tactics)}`;
  const random = seeded(seedText);
  const xgHome = clamp(1.05 + (attack - opponentDefense) / 20 + (possession - opponentPossession) / 48 + random * 0.42, 0.3, 3.9);
  const xgAway = clamp(0.85 + (opponentAttack - defense) / 20 + risk / 100 + (1 - random) * 0.3, 0.25, 3.6);
  const homeScore = clamp(Math.floor(xgHome + random * 0.7), 0, 4);
  const awayScore = clamp(Math.floor(xgAway + (1 - random) * 0.58), 0, 4);
  const keyWing = attackPlayers.sort((a, b) => (b.attributes.pace + b.attributes.dribbling) - (a.attributes.pace + a.attributes.dribbling))[0];
  const finisher = attackPlayers.sort((a, b) => b.attributes.shooting - a.attributes.shooting)[0];
  const anchor = midfieldPlayers.sort((a, b) => b.attributes.defense - a.attributes.defense)[0];
  const minutes = [12 + Math.round(random * 8), 29 + Math.round(random * 9), 52 + Math.round(random * 8), 71 + Math.round(random * 10), 84 + Math.round(random * 5)];
  const events = [
    { minute: minutes[0], type: "attack", text: `${keyWing?.name || "윙어"}이(가) 측면에서 수비를 벗겨내며 첫 기회를 만듭니다.` },
    { minute: minutes[1], type: possession > 70 ? "control" : "warning", text: possession > 70 ? "중앙 패스 연결이 살아나며 점유를 안정적으로 가져갑니다." : "중원에서 패스 연결이 끊기며 상대의 전환을 허용합니다." },
    { minute: minutes[2], type: homeScore > awayScore ? "goal" : "warning", text: homeScore > awayScore ? `${finisher?.name || "공격수"}의 마무리로 득점 기대가 현실화됩니다.` : "상대의 빠른 전환으로 수비 라인 뒤 공간이 위협받습니다." },
    { minute: minutes[3], type: lowStamina.length ? "sub" : "control", text: lowStamina.length ? `${lowStamina[0].name}의 체력이 떨어져 교체 카드가 필요합니다.` : `${anchor?.name || "중원"}이(가) 2차 볼을 회수하며 흐름을 유지합니다.` },
    { minute: minutes[4], type: "finish", text: `예상 종료 스코어: ${homeTeam().shortName} ${homeScore} - ${awayScore} ${awayTeam().shortName}` }
  ];
  const insights = [
    `포지션 적합도 평균 ${Math.round(fitAverage)}점: ${fitAverage >= 88 ? "선발 조합이 안정적입니다." : "비적합 배치를 조정하면 전술 지표가 좋아집니다."}`,
    attack >= 75 ? "공격 라인의 침투와 마무리 조합이 강점입니다." : "공격 지표가 낮습니다. 빠른 윙어 또는 피니셔 교체를 검토하세요.",
    risk >= 65 ? "상대 역습 위험이 높습니다. 수비 라인을 낮추거나 앵커 역할을 보강하세요." : "수비 전환 위험이 관리 가능한 수준입니다."
  ];
  const shotsHome = Math.max(homeScore + 3, Math.round(xgHome * 3.9 + attack / 26));
  const shotsAway = Math.max(awayScore + 3, Math.round(xgAway * 3.9 + opponentAttack / 29));
  const onTargetHome = clamp(Math.max(homeScore, Math.round(shotsHome * (0.35 + attack / 420))), 1, shotsHome);
  const onTargetAway = clamp(Math.max(awayScore, Math.round(shotsAway * (0.34 + opponentAttack / 450))), 1, shotsAway);
  const cornersHome = clamp(Math.round(2 + attack / 28 + (state.tactics.attackWidth === "wide" ? 2 : 0) + random * 2), 2, 11);
  const cornersAway = clamp(Math.round(2 + opponentAttack / 31 + (1 - random) * 2), 2, 10);
  const foulsHome = clamp(Math.round(6 + (state.tactics.pressing === "high" ? 4 : state.tactics.pressing === "medium" ? 2 : 0) + random * 3), 5, 16);
  const foulsAway = clamp(Math.round(7 + (1 - random) * 5), 5, 16);
  const matchStats = [
    { label: "슈팅", home: shotsHome, away: shotsAway },
    { label: "유효 슈팅", home: onTargetHome, away: onTargetAway },
    { label: "선방", home: Math.max(0, onTargetAway - awayScore), away: Math.max(0, onTargetHome - homeScore) },
    { label: "코너킥", home: cornersHome, away: cornersAway },
    { label: "반칙", home: foulsHome, away: foulsAway }
  ];
  return { attack, possession, defense, risk, xgHome, xgAway, homeScore, awayScore, events, effects: effects.slice(0, 3), insights, fitAverage, lowStamina, matchStats };
}

function roleCount(players, role) {
  return players.filter((item) => item.roleTags.includes(role)).length;
}

function hasRole(players, ...roles) {
  return roles.some((role) => roleCount(players, role) > 0);
}

function opponentProfile() {
  const profiles = {
    bra: {
      pressing: "high", defensiveLine: "high", attackWidth: "wide", tempo: "fast", buildUp: "direct",
      label: "측면 돌파 · 빠른 전환", threat: "측면 1대1과 전환 속도", counter: "풀백 뒤 공간을 보호하고, 탈취 뒤 즉시 반대 측면을 노리세요."
    },
    esp: {
      pressing: "high", defensiveLine: "high", attackWidth: "narrow", tempo: "slow", buildUp: "possession",
      label: "점유 · 중앙 압박", threat: "중앙 패스 네트워크와 카운터프레스", counter: "중앙 숫자를 유지하고, 압박을 넘기면 빠르게 뒷공간을 공략하세요."
    },
    fra: {
      pressing: "medium", defensiveLine: "standard", attackWidth: "wide", tempo: "fast", buildUp: "direct",
      label: "피지컬 · 직선 전환", threat: "속도와 공중 경합을 활용한 직선 침투", counter: "수비 라인을 무리하게 올리지 말고, 세컨드볼을 먼저 회수하세요."
    }
  };
  return profiles[awayTeam().id] || {
    pressing: "medium", defensiveLine: "standard", attackWidth: "standard", tempo: "balanced", buildUp: "mixed",
    label: "균형형 운영", threat: "균형 잡힌 전개", counter: "포지션 간격을 유지하며 상대 약점을 탐색하세요."
  };
}

function tacticLabel(key, value) {
  const labels = {
    pressing: { low: "낮은 압박", medium: "중간 압박", high: "높은 압박" },
    defensiveLine: { low: "낮은 라인", standard: "보통 라인", high: "높은 라인" },
    attackWidth: { narrow: "좁은 폭", standard: "표준 폭", wide: "넓은 폭" },
    tempo: { slow: "느린 템포", balanced: "균형 템포", fast: "빠른 템포" },
    buildUp: { possession: "점유 빌드업", mixed: "혼합 빌드업", direct: "직선 빌드업" }
  };
  return labels[key]?.[value] || value;
}

function resultSnapshot(result) {
  if (!result) return null;
  return {
    homeScore: result.homeScore,
    awayScore: result.awayScore,
    xgHome: Number(result.xgHome.toFixed(2)),
    xgAway: Number(result.xgAway.toFixed(2)),
    attack: result.attack,
    possession: result.possession,
    defense: result.defense,
    risk: result.risk
  };
}

function signedValue(value, digits = 0) {
  const rounded = Number(value.toFixed(digits));
  return `${rounded > 0 ? "+" : ""}${rounded.toFixed(digits)}`;
}

function decisionOptionBlueprints() {
  const profile = opponentProfile();
  const counterSetup = profile.tempo === "fast"
    ? { pressing: "medium", defensiveLine: "low", attackWidth: "standard", tempo: "balanced", buildUp: "possession" }
    : { pressing: "medium", defensiveLine: "standard", attackWidth: "narrow", tempo: "balanced", buildUp: "possession" };
  return [
    {
      id: "protect",
      label: "흐름 잠금",
      shortLabel: "PROTECT",
      goal: "실점 위험을 낮추고 경기를 안정화",
      reason: `${awayTeam().shortName}의 ${profile.threat}에 대비해 수비 블록과 점유를 우선합니다.`,
      tactics: { pressing: "low", defensiveLine: "low", attackWidth: "narrow", tempo: "slow", buildUp: "possession" }
    },
    {
      id: "control",
      label: "균형 회복",
      shortLabel: "CONTROL",
      goal: "상대 장점을 억제하며 주도권을 회복",
      reason: "중원 연결과 전환 대비를 함께 유지하는 균형형 선택입니다.",
      tactics: counterSetup
    },
    {
      id: "push",
      label: "승부수",
      shortLabel: "PUSH",
      goal: "득점 기회를 늘리는 적극적 전환",
      reason: "압박과 템포를 끌어올려 후반의 공격 빈도를 높이는 선택입니다.",
      tactics: { pressing: "high", defensiveLine: "high", attackWidth: "wide", tempo: "fast", buildUp: "direct" }
    }
  ];
}

function calculateDecisionPreview(tactics) {
  const previousTactics = state.tactics;
  try {
    state.tactics = { ...tactics };
    return resultSnapshot(calculateSimulation());
  } finally {
    state.tactics = previousTactics;
  }
}

function createDecisionReplay(result) {
  const baseline = resultSnapshot(result);
  if (!baseline) return null;
  return {
    baseline,
    chosenId: null,
    options: decisionOptionBlueprints().map((option) => ({ ...option, preview: calculateDecisionPreview(option.tactics) }))
  };
}

function buildDecisionImpact(baseline, result, choice) {
  if (!baseline || !result || !choice) return null;
  const after = resultSnapshot(result);
  const attackDelta = after.attack - baseline.attack;
  const possessionDelta = after.possession - baseline.possession;
  const defenseDelta = after.defense - baseline.defense;
  const riskDelta = after.risk - baseline.risk;
  const xgDelta = after.xgHome - baseline.xgHome;
  const scoreDelta = (after.homeScore - after.awayScore) - (baseline.homeScore - baseline.awayScore);
  const verdict = scoreDelta > 0 || xgDelta >= .2
    ? "선택 이후의 후반 플랜이 공격 기대값을 끌어올렸습니다."
    : riskDelta <= -3
      ? "득점보다 경기 안정화를 우선한 선택이 위험도를 낮췄습니다."
      : "결과 차이는 크지 않았지만, 선택의 효과를 지표로 추적했습니다.";
  return {
    label: choice.label,
    shortLabel: choice.shortLabel,
    appliedAt: 45,
    baseline,
    after,
    verdict,
    metrics: [
      { label: "xG", before: baseline.xgHome.toFixed(1), after: after.xgHome.toFixed(1), delta: signedValue(xgDelta, 1), tone: xgDelta >= 0 ? "good" : "warning" },
      { label: "공격", before: baseline.attack, after: after.attack, delta: signedValue(attackDelta), tone: attackDelta >= 0 ? "good" : "warning" },
      { label: "점유", before: baseline.possession, after: after.possession, delta: signedValue(possessionDelta), tone: possessionDelta >= 0 ? "good" : "warning" },
      { label: "수비", before: baseline.defense, after: after.defense, delta: signedValue(defenseDelta), tone: defenseDelta >= 0 ? "good" : "warning" },
      { label: "위험", before: baseline.risk, after: after.risk, delta: signedValue(riskDelta), tone: riskDelta <= 0 ? "good" : "warning" }
    ]
  };
}

function applyDecisionChoice(choiceId) {
  const live = state.playback;
  if (!live?.paused || live.breakKind !== "half") return;
  const choice = live.decisionReplay?.options.find((option) => option.id === choiceId);
  if (!choice) return;
  const beforeTactics = { ...state.tactics };
  state.tactics = { ...choice.tactics };
  state.coachAdvice = null;
  recordLiveTacticChange(beforeTactics, state.tactics, `IF: ${choice.label}`);
  const updatedLive = state.playback || live;
  state.playback = {
    ...updatedLive,
    decisionReplay: { ...live.decisionReplay, chosenId: choice.id },
    needsReplan: true
  };
  render();
}

function recordLiveTacticChange(before, after, source = "수동") {
  const live = state.playback;
  if (!live?.paused) return;
  const changes = Object.keys(after).filter((key) => before[key] !== after[key]);
  if (!changes.length) return;
  const summary = changes.map((key) => `${tacticLabel(key, before[key])} → ${tacticLabel(key, after[key])}`).join(" · ");
  const event = {
    minute: live.minute, type: "tactic", moment: "tactic", team: "home", attackingTeam: "home",
    scoreHome: live.homeScore, scoreAway: live.awayScore,
    text: `${source} 전술 변경 · ${summary}`
  };
  state.playback = {
    ...live,
    adjustmentEvents: [...(live.adjustmentEvents || []), event],
    visibleEvents: [...live.visibleEvents, event],
    needsReplan: true,
    motion: buildEventMotion(event)
  };
}

function recordLiveFormationChange(beforeFormationId) {
  const live = state.playback;
  if (!live?.paused || beforeFormationId === state.formationId) return;
  const beforeLabel = state.data.formations.find((item) => item.id === beforeFormationId)?.label || beforeFormationId;
  const event = {
    minute: live.minute, type: "tactic", moment: "tactic", team: "home", attackingTeam: "home",
    scoreHome: live.homeScore, scoreAway: live.awayScore,
    text: `포메이션 변경 · ${beforeLabel} → ${formation().label}`
  };
  state.playback = {
    ...live,
    adjustmentEvents: [...(live.adjustmentEvents || []), event],
    visibleEvents: [...live.visibleEvents, event],
    needsReplan: true,
    motion: buildEventMotion(event)
  };
}

function fatigueRate(playerData, slot, tactics) {
  const position = basePosition(slot);
  let rate = position === "GK" ? 4.2 : ["CB", "RB", "LB"].includes(position) ? 10.5 : ["DM", "CM", "AM"].includes(position) ? 13.2 : 12.2;
  if (tactics.pressing === "high") rate += 4.3;
  if (tactics.pressing === "low") rate -= 1.4;
  if (tactics.tempo === "fast") rate += 3.5;
  if (tactics.tempo === "slow") rate -= 1.2;
  if (tactics.defensiveLine === "high") rate += 1.3;
  if (hasRole([playerData], "box-to-box")) rate += 3.3;
  if (hasRole([playerData], "pressing-forward", "counter-press")) rate += 4.1;
  if (hasRole([playerData], "overlapping-fullback", "attacking-fullback")) rate += 2.2;
  if (hasRole([playerData], "anchor", "target-forward")) rate -= 1.1;
  rate += (80 - playerData.attributes.physical) * 0.1;
  return clamp(rate, 3.6, 24);
}

function fatigueMultiplier(stamina) {
  if (stamina < 25) return 0.76;
  if (stamina < 40) return 0.85;
  if (stamina < 60) return 0.93;
  return 1;
}

function playerStaminaAt(playerData, slot, tactics, initial, minute) {
  return clamp(Math.round(initial - fatigueRate(playerData, slot, tactics) * (minute / 90)), 14, 99);
}

function rankedActor(players, type, randomKey) {
  const roleBonus = {
    goal: ["finisher", "poacher", "inside-forward", "complete-forward", "target-forward"],
    wing: ["direct-winger", "inverted-winger", "dribbler", "1v1-specialist", "overlapping-fullback"],
    press: ["pressing-forward", "counter-press", "ball-winner", "aggressive"],
    recover: ["anchor", "ball-winner", "cover-defender", "recovery-pace"],
    build: ["playmaker", "regista", "creative-passer", "ball-playing", "switch-play"]
  };
  const statMap = {
    goal: ["shooting", "positioning", "dribbling"], wing: ["pace", "dribbling", "passing"], press: ["defense", "physical", "pace"],
    recover: ["defense", "physical", "positioning"], build: ["passing", "dribbling", "positioning"]
  };
  const candidates = [...players].sort((a, b) => {
    const score = (item) => average(statMap[type].map((key) => item.attributes[key])) + roleBonus[type].filter((role) => item.roleTags.includes(role)).length * 15 + seeded(`${randomKey}-${item.id}`) * 4;
    return score(b) - score(a);
  });
  return candidates[0] || null;
}

function getCoachAdvice() {
  const profile = opponentProfile();
  const starters = currentLineupPlayers();
  const initialStamina = average(starters.map((item) => playerState(item, currentScenario().id).stamina));
  const advice = { pressing: "medium", defensiveLine: "standard", attackWidth: "standard", tempo: "balanced", buildUp: "mixed" };
  const reasons = [];

  if (profile.buildUp === "possession") {
    advice.pressing = initialStamina >= 75 ? "high" : "medium";
    advice.buildUp = "direct";
    advice.tempo = "fast";
    reasons.push("상대의 점유 전개를 압박하고, 탈취 직후 빈 뒷공간을 직선적으로 노립니다.");
  }
  if (profile.tempo === "fast" || profile.buildUp === "direct") {
    advice.defensiveLine = "low";
    advice.buildUp = "possession";
    reasons.push("상대의 빠른 전환에 대비해 수비 라인을 한 단계 낮추고 세컨드볼을 확보합니다.");
  }
  if (profile.attackWidth === "wide") {
    advice.attackWidth = "wide";
    reasons.push("상대 풀백을 넓게 벌려 우리 측면 자원의 1대1과 크로스 선택지를 만듭니다.");
  } else {
    advice.attackWidth = "narrow";
    reasons.push("중앙 숫자를 확보해 상대 패스 길을 차단하고, 플레이메이커의 전개를 지원합니다.");
  }
  if (hasRole(starters, "playmaker", "regista") && advice.buildUp === "mixed") {
    advice.buildUp = "possession";
    reasons.push("중앙 전개 역할 보유 선수가 있어 점유 빌드업의 성공 확률이 높습니다.");
  }
  if (initialStamina < 70) {
    advice.pressing = "low";
    advice.tempo = "slow";
    reasons.push("선발 평균 체력이 낮아 무리한 압박보다 후반 교체 카드 확보가 유리합니다.");
  }
  const changes = Object.keys(advice).filter((key) => advice[key] !== state.tactics[key]);
  return {
    tactics: advice,
    confidence: clamp(Math.round(72 + changes.length * 4 + (initialStamina >= 75 ? 5 : 0)), 70, 93),
    title: changes.length ? `${awayTeam().name} 상대로 전환 균형안을 제안합니다.` : "현재 전술은 상대 대응에 이미 잘 맞습니다.",
    reasons: reasons.slice(0, 3),
    changes
  };
}

function applyCoachAdvice() {
  const advice = getCoachAdvice();
  const previousTactics = { ...state.tactics };
  state.tactics = { ...advice.tactics };
  state.coachAdvice = advice;
  if (state.playback?.paused) {
    recordLiveTacticChange(previousTactics, state.tactics, "대응 추천");
    render();
    return;
  }
  state.result = null;
  clearPlayback();
  render();
}

function opponentAdaptationForPhase(profile, phaseIndex, homeScore, awayScore) {
  const baseline = { mode: "baseline", label: "기본 운영", reason: "경기 초반에는 사전 스카우팅 전술을 유지합니다.", profile };
  if (phaseIndex < 4) return baseline;
  if (awayScore < homeScore) {
    return {
      mode: "chase", label: "추격 전환", reason: "스코어 열세를 만회하기 위해 상대가 압박과 라인을 끌어올립니다.",
      profile: { ...profile, pressing: "high", defensiveLine: "high", attackWidth: "wide", tempo: "fast", buildUp: "direct", label: `${profile.label} · 추격 전환` }
    };
  }
  if (awayScore > homeScore) {
    return {
      mode: "protect", label: "리드 보호", reason: "스코어 우세를 지키기 위해 상대가 수비 블록과 점유를 우선합니다.",
      profile: { ...profile, pressing: "low", defensiveLine: "low", attackWidth: "narrow", tempo: "slow", buildUp: "possession", label: `${profile.label} · 리드 보호` }
    };
  }
  return {
    mode: "pressure", label: "균형 압박", reason: "동점 흐름에서 상대가 중원 압박과 전환 속도를 강화합니다.",
    profile: { ...profile, pressing: "high", defensiveLine: "standard", tempo: "fast", label: `${profile.label} · 균형 압박` }
  };
}

function roleContribution(playerData, slot, stamina = 100) {
  if (!playerData) return { attack: 0, possession: 0, defense: 0, overall: 0 };
  const attributes = playerData.attributes || {};
  const stat = (keys) => average(keys.map((key) => attributes[key] || 0));
  const position = basePosition(slot || playerData.primaryPosition);
  const fit = positionFit(playerData, slot || playerData.primaryPosition) / 100;
  const freshness = clamp(stamina / 100, .55, 1);
  const attack = stat(["pace", "shooting", "dribbling", "positioning"]);
  const possession = stat(["passing", "dribbling", "positioning", "physical"]);
  const defense = stat(["defense", "physical", "pace", "positioning"]);
  const roleBias = {
    GK: [0.2, 0.25, 1.25], RB: [.7, .8, 1.2], LB: [.7, .8, 1.2], CB: [.35, .55, 1.35],
    DM: [.55, 1.05, 1.15], CM: [.8, 1.2, .85], AM: [1.15, 1.1, .45],
    RW: [1.25, .8, .35], LW: [1.25, .8, .35], ST: [1.4, .55, .2]
  }[position] || [1, 1, 1];
  const values = {
    attack: attack * roleBias[0] * fit * freshness,
    possession: possession * roleBias[1] * fit * freshness,
    defense: defense * roleBias[2] * fit * freshness
  };
  return { ...values, overall: average(Object.values(values)) };
}

function buildRoleImpactMap(players, slotsById, finalStamina, events) {
  const staminaById = Object.fromEntries((finalStamina || []).map((item) => [item.id, item.stamina]));
  const eventPoints = {};
  (events || []).forEach((event) => {
    if (event.team !== "home") return;
    const points = event.moment === "goal" ? 18 : event.moment === "save" ? 11 : event.moment === "press" ? 7 : event.moment === "build" ? 6 : event.moment === "shot" ? 5 : 0;
    if (event.playerId) eventPoints[event.playerId] = (eventPoints[event.playerId] || 0) + points;
    if (event.supportId) eventPoints[event.supportId] = (eventPoints[event.supportId] || 0) + Math.round(points * .45);
  });
  return players.map((item) => {
    const slot = slotsById[item.id] || item.primaryPosition;
    const stamina = staminaById[item.id] ?? 78;
    const contribution = roleContribution(item, slot, stamina);
    const score = Math.round(clamp(contribution.overall * .8 + (eventPoints[item.id] || 0) + positionFit(item, slot) * .12, 20, 99));
    const strongest = [["공격", contribution.attack], ["전개", contribution.possession], ["수비", contribution.defense]].sort((first, second) => second[1] - first[1])[0][0];
    return {
      id: item.id, name: item.name, slot, stamina, score, strongest,
      events: eventPoints[item.id] || 0,
      note: `${slot} · ${strongest} 기여 ${Math.round(Math.max(contribution.attack, contribution.possession, contribution.defense))}`
    };
  }).sort((first, second) => second.score - first.score);
}

function buildMissionScore(result) {
  const decisions = result.decisionLog || [];
  const rows = [
    { label: "공격 실행", value: clamp(Math.round(result.attack * .55 + result.xgHome * 19), 25, 98), note: result.xgHome >= 1.4 ? "득점 기회를 만들었습니다." : "박스 안 마무리 보강이 필요합니다." },
    { label: "수비 대응", value: clamp(Math.round(result.defense * .7 + (100 - result.risk) * .3), 20, 98), note: result.risk <= 58 ? "상대 전환 위험을 관리했습니다." : "상대의 전환 위험이 남았습니다." },
    { label: "체력 관리", value: clamp(Math.round(100 - (result.lowStamina?.length || 0) * 13), 35, 100), note: result.lowStamina?.length ? "후반 교체 타이밍을 앞당길 수 있습니다." : "90분 체력 분포가 안정적입니다." },
    { label: "의사결정", value: clamp(64 + Math.min(decisions.length, 3) * 11 + (result.decisionImpact ? 6 : 0), 45, 96), note: decisions.length ? "경기 흐름에 맞춰 개입했습니다." : "다음에는 교체·전술 개입을 비교해 보세요." }
  ];
  const score = Math.round(average(rows.map((item) => item.value)));
  const focus = [...rows].sort((first, second) => first.value - second.value)[0];
  return { objective: currentScenario().objective, score, rows, next: `${focus.label} ${focus.value}점 - ${focus.note}` };
}

function substitutionImpactPreview(outgoing, incoming, live, result) {
  if (!outgoing || !incoming) return null;
  const slot = slotForPlayer(outgoing.id) || outgoing.primaryPosition;
  const currentStamina = liveStaminaSnapshot(result, live.minute).find((item) => item.id === outgoing.id)?.stamina || playerState(outgoing, state.scenarioId).stamina;
  const incomingStamina = clamp(Math.round(playerState(incoming, state.scenarioId).stamina - Math.max(0, live.minute - 45) * .05), 55, 99);
  const before = roleContribution(outgoing, slot, currentStamina);
  const after = roleContribution(incoming, slot, incomingStamina);
  const deltas = [
    ["공격", Math.round(after.attack - before.attack)], ["점유", Math.round(after.possession - before.possession)],
    ["수비", Math.round(after.defense - before.defense)], ["체력", Math.round(incomingStamina - currentStamina)]
  ];
  return { slot, currentStamina, incomingStamina, fit: Math.round(positionFit(incoming, slot)), deltas };
}

function calculateSimulation(options = {}) {
  const scenario = currentScenario();
  const profile = opponentProfile();
  const homePlayers = currentLineupPlayers();
  const opponentPlayers = awayTeam().defaultStartingXI.map(player).filter(Boolean);
  const playerBySlot = Object.fromEntries(Object.entries(state.lineup).map(([slot, id]) => [slot, player(id)]));
  const homeSlotsById = Object.fromEntries(Object.entries(state.lineup).map(([slot, id]) => [id, slot]));
  const awaySlotsById = Object.fromEntries(opponentPlayers.map((item) => [item.id, item.primaryPosition]));
  const initialHomeStamina = Object.fromEntries(homePlayers.map((item) => [item.id, playerState(item, scenario.id).stamina]));
  const initialAwayStamina = Object.fromEntries(opponentPlayers.map((item) => [item.id, clamp(Math.round(82 + seeded(`${scenario.id}-${item.id}`) * 14), 74, 96)]));
  const fitAverage = average(formation().slots.map((slot) => positionFit(playerBySlot[slot], slot)));
  const roleSummary = {
    press: roleCount(homePlayers, "pressing-forward") + roleCount(homePlayers, "counter-press") + roleCount(homePlayers, "ball-winner"),
    build: roleCount(homePlayers, "playmaker") + roleCount(homePlayers, "regista") + roleCount(homePlayers, "creative-passer"),
    wing: roleCount(homePlayers, "direct-winger") + roleCount(homePlayers, "inverted-winger") + roleCount(homePlayers, "overlapping-fullback") + roleCount(homePlayers, "attacking-fullback"),
    finish: roleCount(homePlayers, "finisher") + roleCount(homePlayers, "poacher") + roleCount(homePlayers, "inside-forward") + roleCount(homePlayers, "complete-forward"),
    shield: roleCount(homePlayers, "anchor") + roleCount(homePlayers, "cover-defender") + roleCount(homePlayers, "ball-winner")
  };
  const homeGoalkeeper = homePlayers.find((item) => basePosition(homeSlotsById[item.id]) === "GK");
  const effects = [];
  const matchupNotes = [];
  if (state.tactics.pressing === "high") effects.push("높은 압박은 전방 탈취 확률을 높이지만 후반 체력 비용이 큽니다.");
  if (state.tactics.tempo === "fast") effects.push("빠른 템포가 기회 빈도와 선수별 체력 소모를 함께 높입니다.");
  if (state.tactics.attackWidth === "wide" && roleSummary.wing) effects.push("측면 역할 조합이 넓은 폭 전술의 위력을 끌어올립니다.");
  if (state.tactics.buildUp === "possession" && roleSummary.build) effects.push("플레이메이커·레지스타 역할이 점유 전개의 안정성을 높입니다.");
  if (profile.attackWidth === "wide" && state.tactics.defensiveLine !== "low") matchupNotes.push("상대 측면 전환이 강해 풀백 뒷공간 노출 가능성이 있습니다.");
  if (profile.buildUp === "possession" && state.tactics.pressing === "low") matchupNotes.push("상대 중앙 전개를 편하게 허용할 수 있어 압박 트리거가 필요합니다.");
  if (profile.tempo === "fast" && state.tactics.defensiveLine === "high") matchupNotes.push("상대의 빠른 침투와 높은 수비 라인이 충돌해 역습 위험이 커집니다.");

  const teamRating = (players, slots, staminaMap, tactics, homeSide) => {
    const group = (positions) => players.filter((item) => positions.includes(basePosition(slots[item.id] || item.primaryPosition)));
    const rate = (items, keys) => average(items.map((item) => average(keys.map((key) => item.attributes[key])) * fatigueMultiplier(staminaMap[item.id]) * (homeSide ? formMultiplier(playerState(item, scenario.id).form) : 1)));
    const attackers = group(["ST", "RW", "LW", "AM"]);
    const midfield = group(["DM", "CM", "AM"]);
    const defenders = group(["GK", "RB", "LB", "CB"]);
    return {
      attack: rate(attackers, ["pace", "shooting", "dribbling", "positioning"]),
      possession: rate([...midfield, ...attackers], ["passing", "dribbling", "positioning"]),
      defense: rate(defenders, ["defense", "physical", "pace", "positioning"]),
      press: rate([...midfield, ...attackers], ["defense", "physical", "pace"])
    };
  };

  const seedBase = `${scenario.id}-${Object.values(state.lineup).join("-")}-${JSON.stringify(state.tactics)}`;
  let homeScore = 0;
  let awayScore = 0;
  let xgHome = 0;
  let xgAway = 0;
  const totals = { shotsHome: 0, shotsAway: 0, onTargetHome: 0, onTargetAway: 0, cornersHome: 0, cornersAway: 0, foulsHome: 0, foulsAway: 0 };
  const events = [];
  const staminaTimeline = [];
  const phaseMetrics = [];
  const phaseStats = [];
  const opponentAdaptations = [];
  const phaseStarts = [1, 16, 31, 46, 61, 76];

  phaseStarts.forEach((start, phaseIndex) => {
    const end = start === 76 ? 90 : start + 14;
    const adaptation = opponentAdaptationForPhase(profile, phaseIndex, homeScore, awayScore);
    const phaseProfile = adaptation.profile;
    if (adaptation.mode !== "baseline" && !opponentAdaptations.some((item) => item.mode === adaptation.mode)) {
      const adjustment = { minute: start, mode: adaptation.mode, label: adaptation.label, reason: adaptation.reason, scoreHome: homeScore, scoreAway: awayScore };
      opponentAdaptations.push(adjustment);
      events.push({ minute: start, type: "opponent", moment: "opponent", team: "away", attackingTeam: "away", scoreHome: homeScore, scoreAway: awayScore, text: `${awayTeam().shortName} ${adaptation.label} · ${adaptation.reason}` });
    }
    const homeStamina = Object.fromEntries(homePlayers.map((item) => {
      const override = options.staminaOverrides?.[item.id];
      const initial = override?.stamina ?? initialHomeStamina[item.id];
      const elapsed = override ? Math.max(0, end - override.minute) : end;
      return [item.id, playerStaminaAt(item, homeSlotsById[item.id], state.tactics, initial, elapsed)];
    }));
    const awayStamina = Object.fromEntries(opponentPlayers.map((item) => [item.id, playerStaminaAt(item, awaySlotsById[item.id], phaseProfile, initialAwayStamina[item.id], end)]));
    const home = teamRating(homePlayers, homeSlotsById, homeStamina, state.tactics, true);
    const away = teamRating(opponentPlayers, awaySlotsById, awayStamina, phaseProfile, false);
    let homeAttack = home.attack + roleSummary.finish * 1.6 + (state.tactics.attackWidth === "wide" ? roleSummary.wing * 1.5 : 0);
    let homePossession = home.possession + roleSummary.build * 1.7;
    let homeDefense = home.defense + roleSummary.shield * 1.7;
    let awayAttack = away.attack;
    let awayPossession = away.possession;
    let awayDefense = away.defense;
    let risk = 48;

    if (state.tactics.pressing === "high") { homeDefense += 3.5; homeAttack += roleSummary.press * 1.2; risk += 4; }
    if (state.tactics.pressing === "low") { homeDefense += 2; homePossession -= 2.5; }
    if (state.tactics.defensiveLine === "high") { homePossession += 2.5; risk += phaseProfile.tempo === "fast" ? 9 : 4; }
    if (state.tactics.defensiveLine === "low") { homeDefense += 3.5; homeAttack -= 1.8; }
    if (state.tactics.attackWidth === "wide") { homeAttack += roleSummary.wing ? 3.4 : 1.5; homePossession -= 1; }
    if (state.tactics.attackWidth === "narrow") { homePossession += 2.4; homeAttack -= 0.8; }
    if (state.tactics.tempo === "fast") { homeAttack += 3.2; homePossession -= 2.5; risk += 2; }
    if (state.tactics.tempo === "slow") { homePossession += 3; homeAttack -= 1.6; }
    if (state.tactics.buildUp === "possession") { homePossession += roleSummary.build ? 4.5 : 2; homeAttack -= 0.8; }
    if (state.tactics.buildUp === "direct") { homeAttack += roleSummary.wing || roleSummary.finish ? 3.8 : 2; homePossession -= 3; risk += 1.5; }

    if (phaseProfile.pressing === "high") { awayDefense += 2.5; awayAttack += 1.2; homePossession -= 2; }
    if (phaseProfile.defensiveLine === "high") { awayPossession += 2; state.tactics.buildUp === "direct" ? homeAttack += 3.2 : risk += 1.8; }
    if (phaseProfile.attackWidth === "wide") { awayAttack += 2.5; state.tactics.attackWidth === "wide" ? homeDefense += 1.2 : risk += 2.5; }
    if (phaseProfile.buildUp === "possession") { awayPossession += 3.5; state.tactics.pressing === "high" ? homeAttack += 1.8 : awayAttack += 1.4; }
    if (phaseProfile.buildUp === "direct") { awayAttack += 2.8; state.tactics.defensiveLine === "low" ? homeDefense += 1.6 : risk += 3.2; }
    const fitPenalty = (100 - fitAverage) * 0.14;
    homeAttack -= fitPenalty;
    homePossession -= fitPenalty;
    homeDefense -= fitPenalty;
    const phaseSeed = seeded(`${seedBase}-${phaseIndex}`);
    const homeThreat = clamp((homeAttack - awayDefense + 39) / 86 + (homePossession - awayPossession) / 190 + phaseSeed * 0.08, 0.12, 0.88);
    const awayThreat = clamp((awayAttack - homeDefense + 39) / 86 + (awayPossession - homePossession) / 190 + (1 - phaseSeed) * 0.08 + risk / 460, 0.1, 0.86);
    const homeShots = clamp(Math.round(1 + homeThreat * 2.7 + seeded(`${seedBase}-hs-${phaseIndex}`) * 1.4), 1, 4);
    const awayShots = clamp(Math.round(1 + awayThreat * 2.5 + seeded(`${seedBase}-as-${phaseIndex}`) * 1.3), 1, 4);
    const homeOnTarget = clamp(Math.round(homeShots * (0.31 + homeAttack / 470)), 0, homeShots);
    const awayOnTarget = clamp(Math.round(awayShots * (0.3 + awayAttack / 485)), 0, awayShots);
    const homePhaseXg = homeShots * (0.07 + homeThreat * 0.075 + roleSummary.finish * 0.008);
    const awayPhaseXg = awayShots * (0.07 + awayThreat * 0.075);
    xgHome += homePhaseXg;
    xgAway += awayPhaseXg;
    totals.shotsHome += homeShots; totals.shotsAway += awayShots;
    totals.onTargetHome += homeOnTarget; totals.onTargetAway += awayOnTarget;
    totals.cornersHome += clamp(Math.round(homeThreat * 1.7 + (state.tactics.attackWidth === "wide" ? .7 : 0)), 0, 3);
    totals.cornersAway += clamp(Math.round(awayThreat * 1.5 + (phaseProfile.attackWidth === "wide" ? .5 : 0)), 0, 3);
    totals.foulsHome += clamp(Math.round(0.7 + (state.tactics.pressing === "high" ? 1.5 : .5) + seeded(`${seedBase}-hf-${phaseIndex}`)), 0, 3);
    totals.foulsAway += clamp(Math.round(0.8 + (phaseProfile.pressing === "high" ? 1.2 : .5) + seeded(`${seedBase}-af-${phaseIndex}`)), 0, 3);
    phaseStats.push({
      end,
      shotsHome: homeShots, shotsAway: awayShots, onTargetHome: homeOnTarget, onTargetAway: awayOnTarget,
      cornersHome: clamp(Math.round(homeThreat * 1.7 + (state.tactics.attackWidth === "wide" ? .7 : 0)), 0, 3),
      cornersAway: clamp(Math.round(awayThreat * 1.5 + (phaseProfile.attackWidth === "wide" ? .5 : 0)), 0, 3),
      foulsHome: clamp(Math.round(0.7 + (state.tactics.pressing === "high" ? 1.5 : .5) + seeded(`${seedBase}-hf-${phaseIndex}`)), 0, 3),
      foulsAway: clamp(Math.round(0.8 + (phaseProfile.pressing === "high" ? 1.2 : .5) + seeded(`${seedBase}-af-${phaseIndex}`)), 0, 3),
      xgHome: homePhaseXg, xgAway: awayPhaseXg
    });

    const homeGoal = seeded(`${seedBase}-hg-${phaseIndex}`) < clamp(homePhaseXg * .48, .04, .46);
    const awayGoal = seeded(`${seedBase}-ag-${phaseIndex}`) < clamp(awayPhaseXg * .48, .04, .44);
    const minute = clamp(start + 3 + Math.round(seeded(`${seedBase}-m-${phaseIndex}`) * 9), 1, 89);
    const eventType = phaseIndex % 3 === 0 ? "press" : phaseIndex % 3 === 1 ? "build" : "wing";
    const homeActor = rankedActor(homePlayers, homeGoal ? "goal" : eventType, `${seedBase}-ha-${phaseIndex}`);
    const awayActor = rankedActor(opponentPlayers, awayGoal ? "goal" : eventType, `${seedBase}-aa-${phaseIndex}`);
    const homeRecovery = rankedActor(homePlayers, "recover", `${seedBase}-hr-${phaseIndex}`);
    const homeSupport = rankedActor(homePlayers, eventType === "wing" ? "wing" : "build", `${seedBase}-hp-${phaseIndex}`);
    if (homeGoal) {
      homeScore += 1;
      events.push({ minute, type: "goal", moment: "goal", team: "home", attackingTeam: "home", playerId: homeActor?.id, supportId: homeSupport?.id, scoreHome: homeScore, scoreAway: awayScore, text: `${homeActor?.name || "공격수"}이(가) ${homeActor?.roleTags.includes("finisher") ? "피니셔 역할의 마무리" : "침투 타이밍"}로 득점 기회를 마무리합니다.` });
    } else if (awayGoal) {
      awayScore += 1;
      events.push({ minute, type: "goal", moment: "goal", team: "away", attackingTeam: "away", playerId: homeGoalkeeper?.id, supportId: homeRecovery?.id, scoreHome: homeScore, scoreAway: awayScore, text: `${awayActor?.name || awayTeam().name}의 ${phaseProfile.label}이(가) 우리 수비 블록을 흔들며 득점합니다.` });
    } else {
      const homeHasMoment = homeThreat >= awayThreat;
      const actor = homeHasMoment ? homeActor : awayActor;
      const onTarget = homeHasMoment ? homeOnTarget > 0 : awayOnTarget > 0;
      const moment = onTarget ? "save" : eventType === "press" ? "press" : eventType === "wing" ? "shot" : "build";
      const type = moment === "save" ? "save" : homeHasMoment ? (eventType === "press" ? "control" : "attack") : "warning";
      const text = homeHasMoment
        ? moment === "save" ? `${actor?.name || "공격수"}의 유효 슈팅, 상대 골키퍼가 선방으로 막아냅니다.` : `${actor?.name || "우리 팀"}의 ${eventType === "press" ? "압박과 회수" : eventType === "build" ? "전개 패스" : "측면 돌파"}가 위협적인 장면을 만듭니다.`
        : moment === "save" ? `${homeGoalkeeper?.name || "골키퍼"}이(가) ${awayActor?.name || awayTeam().name}의 유효 슈팅을 선방합니다.` : `${awayActor?.name || awayTeam().name}의 수비 전환이 우리 진영을 시험합니다.`;
      events.push({ minute, type, moment, team: homeHasMoment ? "home" : "away", attackingTeam: homeHasMoment ? "home" : "away", playerId: homeHasMoment ? actor?.id : (moment === "save" ? homeGoalkeeper?.id : homeRecovery?.id), supportId: homeHasMoment ? homeSupport?.id : homeRecovery?.id, scoreHome: homeScore, scoreAway: awayScore, text });
    }
    if (phaseIndex === 3 || phaseIndex === 4) {
      const tired = homePlayers.map((item) => ({ item, stamina: homeStamina[item.id] })).sort((a, b) => a.stamina - b.stamina)[0];
      if (tired?.stamina < 56) events.push({ minute: clamp(minute + 3, 1, 89), type: "sub", moment: "fitness", team: "home", attackingTeam: "home", playerId: tired.item.id, scoreHome: homeScore, scoreAway: awayScore, text: `${tired.item.name}의 체력이 ${tired.stamina}까지 내려갔습니다. 역할 부담을 줄이거나 교체 카드를 준비하세요.` });
    }
    staminaTimeline.push({ minute: end, players: homePlayers.map((item) => ({ id: item.id, name: item.name, stamina: homeStamina[item.id], slot: homeSlotsById[item.id] })) });
    phaseMetrics.push({ minute: end, attack: Math.round(homeAttack), possession: Math.round(homePossession), defense: Math.round(homeDefense), risk: Math.round(clamp(risk + awayAttack - homeDefense * .32, 20, 92)) });
  });

  events.push({ minute: 45, type: "half", moment: "half", team: "neutral", attackingTeam: "neutral", scoreHome: 0, scoreAway: 0, text: "하프타임 · 전술과 교체 카드를 점검하세요." });
  events.sort((a, b) => a.minute - b.minute);
  const halfTimeEvent = events.find((event) => event.moment === "half");
  const preHalfEvent = [...events].filter((event) => event.minute < 45).at(-1);
  if (halfTimeEvent) {
    halfTimeEvent.scoreHome = preHalfEvent?.scoreHome || 0;
    halfTimeEvent.scoreAway = preHalfEvent?.scoreAway || 0;
    halfTimeEvent.text = `하프타임 · ${homeTeam().shortName} ${halfTimeEvent.scoreHome} - ${halfTimeEvent.scoreAway} ${awayTeam().shortName}. 전술과 교체 카드를 점검하세요.`;
  }
  const finalMetric = phaseMetrics[phaseMetrics.length - 1];
  const attack = Math.round(clamp(average(phaseMetrics.map((item) => item.attack)), 35, 95));
  const possession = Math.round(clamp(average(phaseMetrics.map((item) => item.possession)), 35, 95));
  const defense = Math.round(clamp(average(phaseMetrics.map((item) => item.defense)), 35, 95));
  const risk = Math.round(clamp(average(phaseMetrics.map((item) => item.risk)), 20, 92));
  xgHome = clamp(xgHome, .25, 4.2);
  xgAway = clamp(xgAway, .25, 4.1);
  // Every goal is, by definition, an on-target shot. The score is sampled from
  // the same phase model, so reconcile the display totals before reporting them.
  totals.onTargetHome = Math.max(totals.onTargetHome, homeScore);
  totals.onTargetAway = Math.max(totals.onTargetAway, awayScore);
  const finalStamina = staminaTimeline[staminaTimeline.length - 1]?.players || [];
  const lowStamina = finalStamina.filter((item) => item.stamina < 55).map((item) => player(item.id));
  const matchStats = [
    { label: "슈팅", home: totals.shotsHome, away: totals.shotsAway },
    { label: "유효 슈팅", home: totals.onTargetHome, away: totals.onTargetAway },
    { label: "선방", home: Math.max(0, totals.onTargetAway - awayScore), away: Math.max(0, totals.onTargetHome - homeScore) },
    { label: "코너킥", home: totals.cornersHome, away: totals.cornersAway },
    { label: "반칙", home: totals.foulsHome, away: totals.foulsAway }
  ];
  const insights = [
    `포지션 적합도 평균 ${Math.round(fitAverage)}점이 ${fitAverage >= 88 ? "안정적인 전술 수행" : "전술 효율의 감점 요인"}으로 작동했습니다.`,
    roleSummary.finish ? `마무리 역할 ${roleSummary.finish}명이 있어 득점 장면의 선수 선택 확률이 높아집니다.` : "피니셔 역할이 부족해 박스 안 결정력 보강이 필요합니다.",
    lowStamina.length ? `${lowStamina.map((item) => item.name).join(", ")}의 후반 체력이 낮아 교체 또는 압박 강도 조절이 필요합니다.` : "90분 기준 선발의 체력 분포가 안정적으로 유지됩니다.",
    matchupNotes[0] || `${awayTeam().name}의 ${profile.threat}에 대해 현재 전술이 균형 있게 대응합니다.`
  ];
  events.push({ minute: 90, type: "finish", moment: "finish", team: "neutral", attackingTeam: "neutral", scoreHome: homeScore, scoreAway: awayScore, text: `경기 종료 · ${homeTeam().shortName} ${homeScore} - ${awayScore} ${awayTeam().shortName}` });
  const roleImpact = buildRoleImpactMap(homePlayers, homeSlotsById, finalStamina, events);
  const result = { attack, possession, defense, risk, xgHome, xgAway, homeScore, awayScore, events, effects: effects.slice(0, 4), insights, fitAverage, lowStamina, matchStats, staminaTimeline, phaseMetrics, phaseStats, opponentProfile: profile, opponentAdaptations, roleSummary, roleImpact, finalMetric, decisionLog: [] };
  return { ...result, missionScore: buildMissionScore(result) };
}

function renderHeaderBase() {
  const source = datasetStatus();
  return `
    <header class="topbar">
      <a class="brand" href="#top" aria-label="TACTICA 2026 홈">
        <span class="brand-mark">T</span>
        <span><b>TACTICA</b><small>2026 / 차라리 내가 감독함</small></span>
      </a>
      <div class="topbar-center"><span class="live-dot"></span>전술 시뮬레이터 <span class="topbar-divider"></span> DYNAMIC TACTICS LAB</div>
      <div class="topbar-actions"><button class="methodology-trigger" data-open-methodology aria-haspopup="dialog">DATA · METHOD</button><div class="topbar-note ${source.isMock ? "mock" : "verified"}"><b>${source.label}</b> ${source.note} <span>●</span> 자동 저장</div></div>
    </header>`;
}

function renderHeader() {
  return renderHeaderBase();
}

function renderMethodologyModal() {
  if (!state.methodologyOpen || !state.data) return "";
  const source = datasetProvenance();
  const dataStatus = source.isMock
    ? `<div class="method-alert warning"><b>현재는 개발 검증용 가상 데이터입니다.</b><p>최종 제출 전에는 대회 제공 또는 사용 허가된 실제 월드컵 데이터로 교체하고, 출처·라이선스·수집일을 함께 기록해야 합니다.</p></div>`
    : `<div class="method-alert verified"><b>검증 데이터가 적용되어 있습니다.</b><p>출처와 갱신 기준은 아래 정보를 기준으로, 결과 리포트에도 함께 남습니다.</p></div>`;
  return `<div class="methodology-backdrop" data-methodology-backdrop><section class="methodology-modal" role="dialog" aria-modal="true" aria-label="데이터와 시뮬레이션 안내"><div class="methodology-top"><div><span class="eyebrow">TRACEABLE TACTICS</span><h2>데이터 · 계산 근거 · 체험 흐름</h2></div><button class="modal-close" data-close-methodology aria-label="안내 닫기">×</button></div><div class="methodology-content">${dataStatus}${state.dataNotice ? `<p class="data-notice">${state.dataNotice}</p>` : ""}<div class="method-grid"><article class="method-card provenance"><span>01 · DATA PROVENANCE</span><h3>${source.datasetName}</h3><dl><div><dt>데이터 상태</dt><dd>${source.label}</dd></div><div><dt>출처</dt><dd>${source.sourceName}</dd></div><div><dt>스키마 / 갱신</dt><dd>${source.schemaVersion} · ${source.lastUpdated}</dd></div><div><dt>활용 범위</dt><dd>${source.purpose}</dd></div><div><dt>국가 선택 기준</dt><dd>${source.selectionRule}</dd></div><div><dt>전술 지수</dt><dd>${source.attributeModel}</dd></div><div><dt>시나리오</dt><dd>${source.scenarioDataType}</dd></div><div><dt>이용 조건</dt><dd>${source.license}</dd></div></dl><p>${source.disclaimer}</p><button class="dataset-import" data-open-dataset-import>JSON 데이터 교체</button><input id="dataset-import" type="file" accept="application/json" hidden><small>필수 구조: ${source.replacementContract}</small></article><article class="method-card engine"><span>02 · EXPLAINABLE MATCH ENGINE</span><h3>결과가 나온 이유를 남깁니다</h3><ol><li><b>선발·포지션</b><p>포지션 적합도와 역할별 핵심 능력치를 계산합니다.</p></li><li><b>전술·상대 상성</b><p>압박, 라인, 폭, 템포, 빌드업을 상대 패턴과 대조합니다.</p></li><li><b>15분 단위 경기 흐름</b><p>체력·역할·전술을 반영해 이벤트와 경기 지표를 갱신합니다.</p></li><li><b>경기 중 의사결정</b><p>교체·전술 변경 후 다음 전술 구간부터 결과를 재계산합니다.</p></li></ol></article><article class="method-card interaction"><span>03 · JUDGE FLOW</span><h3>브라우저에서 바로 확인</h3><ul><li>선수 카드를 드래그하거나 선택해 포지션에 배치</li><li>포메이션과 5가지 전술 지시 변경</li><li>경기 재생 중 교체·전술 변경, 하프타임 지시</li><li>풀타임 뒤 리포트·A/B 전술안·Markdown 보고서 확인</li></ul></article><article class="method-card integrity"><span>04 · FAIR REVIEW</span><h3>과장 없이 검증 가능하게</h3><p>추천은 현재 MVP에서 외부 키 없이 실행되는 <b>규칙 기반 전술 어시스턴트</b>입니다. 실제 경기 결과를 예측하거나 FIFA 공식 시뮬레이션이라고 주장하지 않습니다.</p><p>데이터·로직·실행 방법·라이선스 기록은 저장소 문서에서 확인할 수 있습니다.</p></article></div></div></section></div>`;
}

function teamTournamentSnapshot(teamData) {
  const record = teamData.tournament || {};
  return `<article class="matchup-team-card" style="--team:${teamData.primaryColor}"><div class="matchup-team-top"><span class="flag-dot"></span><div><small>${teamData.shortName} · GROUP ${record.group || "-"}</small><b>${teamData.name}</b><em>${teamData.officialName || teamData.name}</em></div><strong>FIFA<br/><i>#${record.fifaRanking || "-"}</i></strong></div><div class="matchup-team-stats"><span>점유 <b>${record.possession ?? "-"}%</b></span><span>슈팅 <b>${record.shots ?? "-"}</b></span><span>x ELO <b>${record.eloRating ?? "-"}</b></span><span>감독 <b>${record.manager || "-"}</b></span></div></article>`;
}

function nationOptions(selectedId, blockedId) {
  return state.data.teams.map((teamData) => `<option value="${teamData.id}" ${teamData.id === selectedId ? "selected" : ""} ${teamData.id === blockedId ? "disabled" : ""}>${teamData.shortName} · ${teamData.name} (FIFA #${teamData.tournament?.fifaRanking || "-"})</option>`).join("");
}

function renderScenarioChooser() {
  const scenario = currentScenario();
  const home = team(scenario.homeTeamId);
  const away = team(scenario.awayTeamId);
  const selectionRule = state.data.metadata?.selectionRule || "참가국 선택 풀";
  return `
    <section class="scenario-section matchup-section" id="top">
      <div class="section-title-row">
        <div><span class="eyebrow">MATCH LAB · 32 NATIONS</span><h1>어느 두 나라를 맞붙일까요?</h1></div>
        <p>홈팀과 상대팀을 직접 고르면, 해당 국가의 실제 대회 기록과 선수 명단으로 전술 보드가 다시 구성됩니다.</p>
      </div>
      <div class="matchup-builder">
        <div class="matchup-builder-head"><span>DIRECT MATCHUP</span><b>32개국 자유 매치업</b><small>${selectionRule}</small></div>
        <div class="matchup-selectors"><label><small>MY TEAM · HOME</small><select data-match-home>${nationOptions(home.id, away.id)}</select></label><button class="matchup-swap" data-swap-matchup aria-label="홈과 원정팀 바꾸기">⇄</button><label><small>OPPONENT · AWAY</small><select data-match-away>${nationOptions(away.id, home.id)}</select></label></div>
        <div class="matchup-preview"><div>${teamTournamentSnapshot(home)}</div><span class="matchup-vs">VS<small>TACTICS</small></span><div>${teamTournamentSnapshot(away)}</div></div>
        <div class="matchup-builder-foot"><span><i></i> 선수·팀·대회 기록은 CC0 2026 월드컵 데이터</span><b>${home.shortName} vs ${away.shortName}</b><button data-reset-matchup>이 매치업으로 전술 시작 <i>→</i></button></div>
      </div>
    </section>`;
}

function setCustomMatchup(homeId, awayId) {
  const ids = state.data.teams.map((item) => item.id);
  const nextHome = ids.includes(homeId) ? homeId : ids[0];
  const nextAway = ids.includes(awayId) && awayId !== nextHome ? awayId : ids.find((id) => id !== nextHome);
  state.customHomeTeamId = nextHome;
  state.customAwayTeamId = nextAway;
  resetForScenario("custom-match");
}

function renderMatchStripBase() {
  const scenario = currentScenario();
  return `
    <section class="match-strip">
      <div class="team-identity home"><span class="flag-dot" style="--team:${homeTeam().primaryColor}"></span><div><small>MY TEAM</small><b>${homeTeam().name}</b></div></div>
      <div class="versus"><span>${scenario.stage}</span><b>${scenario.matchMinute ? `${scenario.matchMinute}′ LIVE` : "KICK OFF"}</b><i>${scenario.venue}</i></div>
      <div class="team-identity away"><div><small>OPPONENT</small><b>${awayTeam().name}</b></div><span class="flag-dot" style="--team:${awayTeam().primaryColor}"></span></div>
  </section>`;
}

function renderWorkflowRail() {
  const phase = state.analysisRevealed ? "report" : state.playback ? "live" : "setup";
  const steps = [
    ["setup", "01", "전술 설계", "선수·포메이션·역할"],
    ["live", "02", "경기 개입", "하프타임 IF 선택·교체"],
    ["report", "03", "결과 해석", "근거·영향·리포트"]
  ];
  return `<nav class="workflow-rail" aria-label="감독 경험 진행 상태">${steps.map(([id, number, title, detail]) => `<div class="workflow-step ${phase === id ? "active" : ""} ${steps.findIndex((item) => item[0] === phase) > steps.findIndex((item) => item[0] === id) ? "done" : ""}"><i>${number}</i><span><b>${title}</b><small>${detail}</small></span></div>`).join("")}</nav>`;
}

function renderMatchStrip() {
  return `${renderMatchStripBase()}${renderWorkflowRail()}`;
}

function renderFormationOptions() {
  const groups = [["4", "4 BACK"], ["3", "3 BACK"], ["5", "5 BACK"]];
  return groups.map(([prefix, label]) => {
    const options = state.data.formations.filter((item) => item.id.startsWith(`${prefix}-`));
    if (!options.length) return "";
    return `<optgroup label="${label}">${options.map((item) => `<option value="${item.id}" ${item.id === state.formationId ? "selected" : ""}>${item.label}</option>`).join("")}</optgroup>`;
  }).join("");
}

function renderFormationControls() {
  return `
    <section class="control-panel">
      <div class="control-heading"><span class="step">01</span><div><h2>선발과 포메이션</h2><p>카드를 드래그하거나 선수를 선택한 뒤 경기장 슬롯을 클릭하세요.</p></div></div>
      <div class="formation-control-stack"><label class="formation-select">포메이션
        <select id="formation-select">${renderFormationOptions()}</select>
      </label>
      <div class="formation-actions"><button data-share-config>↗ 설정 링크 복사</button>${state.shareNotice ? `<small>${state.shareNotice}</small>` : ""}</div></div>
    </section>`;
}

const rosterStatProfiles = {
  GK: ["defense", "positioning", "passing"],
  CB: ["defense", "physical", "pace"],
  RB: ["pace", "defense", "passing"],
  LB: ["pace", "defense", "passing"],
  DM: ["defense", "passing", "physical"],
  CM: ["passing", "dribbling", "positioning"],
  AM: ["passing", "dribbling", "shooting"],
  RW: ["pace", "dribbling", "shooting"],
  LW: ["pace", "dribbling", "shooting"],
  ST: ["shooting", "pace", "positioning"]
};

function rosterOrderLabel(playerData) {
  return `R${String(playerData.squadOrder ?? playerData.number).padStart(2, "0")}`;
}

function renderRosterCard(playerData, compact = false, rosterGroup = "bench", density = "detail") {
  const matchState = playerState(playerData, state.scenarioId);
  const selected = playerData.id === state.selectedPlayerId;
  if (compact) {
    return `<button class="player-card compact ${selected ? "selected" : ""}" draggable="true" data-player="${playerData.id}">
    <span class="player-number">${rosterOrderLabel(playerData)}</span>
    <span class="player-main"><b>${playerData.name}</b><small>${playerData.primaryPosition} · OVR ${playerData.overall}</small></span>
    <span class="player-state ${matchState.form}"><i></i>${formLabel(matchState.form)}</span>
  </button>`;
  }
  const isStarter = rosterGroup === "starter";
  const slot = slotForPlayer(playerData.id);
  const naturalPosition = substitutionPosition(playerData);
  const assignedPosition = isStarter && slot ? positionLabel(slot) : null;
  const positionChanged = assignedPosition && assignedPosition !== naturalPosition;
  const statKeys = rosterStatProfiles[basePosition(slot || playerData.primaryPosition)] || rosterStatProfiles.CM;
  const overallTone = playerData.overall >= 79 ? "elite" : playerData.overall >= 75 ? "strong" : "steady";
  return `<button class="player-card roster-card ${isStarter ? "starter-card" : "bench-card"} ${density === "dense" ? "dense-card" : ""} ${selected ? "selected" : ""}" draggable="true" data-player="${playerData.id}">
    <span class="player-number">${rosterOrderLabel(playerData)}</span>
    <span class="player-main"><b>${playerData.name}</b><span class="player-meta"><i>${naturalPosition}</i><small class="${positionChanged ? "position-changed" : ""}">${isStarter ? positionChanged ? `선발 · 배치 ${assignedPosition}` : "선발 · 본포지션" : "후보 · 본포지션"}</small></span></span>
    <span class="player-overall ${overallTone}"><small>OVR</small><b>${playerData.overall}</b></span>
    <span class="player-readiness"><span class="player-state ${matchState.form}"><i></i>${formLabel(matchState.form)}</span><span class="stamina"><small>FIT</small><b>${matchState.stamina}</b><em style="--stamina:${matchState.stamina}%"></em></span></span>
    <span class="player-key-stats">${statKeys.map((key) => `<span><small>${statLabels[key]}</small><b>${playerData.attributes[key]}</b></span>`).join("")}</span>
  </button>`;
}

function renderPlayerDetail() {
  const selected = player(state.selectedPlayerId);
  if (!selected) {
    return `<div class="player-detail empty-detail"><span>PLAYER SCOUT</span><p>선발 또는 후보 선수를 선택하면<br/>스탯·성향·경기 상태를 확인할 수 있습니다.</p></div>`;
  }
  const currentPlayerState = playerState(selected, state.scenarioId);
  const assignedSlot = Object.entries(state.lineup).find(([, id]) => id === selected.id)?.[0];
  const fit = assignedSlot ? positionFit(selected, assignedSlot) : null;
  const visibleStats = ["pace", "shooting", "passing", "dribbling", "defense", "physical"];
  return `<section class="player-detail">
    <div class="detail-kicker"><span>PLAYER SCOUT</span><button data-clear-player aria-label="선수 상세 닫기">×</button></div>
    <div class="detail-head"><span class="detail-number">${rosterOrderLabel(selected)}</span><div><h3>${selected.name}</h3><p>${selected.primaryPosition}${selected.secondaryPositions.length ? ` · ${selected.secondaryPositions.join("/")}` : ""} · OVR ${selected.overall}</p></div><b>${assignedSlot || "후보"}</b></div>
    <div class="detail-state-grid"><span class="${currentPlayerState.form}">컨디션 <b>${formLabel(currentPlayerState.form)}</b></span><span>체력 <b>${currentPlayerState.stamina}</b></span><span>적합도 <b>${fit ?? "-"}</b></span></div>
    ${selected.officialRecord ? `<div class="official-record"><span><small>공식 분류</small><b>${selected.sourcePosition}</b></span><span><small>소속</small><b>${selected.officialRecord.club}</b></span><span><small>A매치 / 득점</small><b>${selected.officialRecord.caps} / ${selected.officialRecord.nationalTeamGoals}</b></span><span><small>신장 / 생년</small><b>${selected.officialRecord.heightCm}cm / ${selected.officialRecord.dateOfBirth || "-"}</b></span>${selected.officialRecord.tournament ? `<span><small>이번 대회 출전 / 골</small><b>${selected.officialRecord.tournament.matches} / ${selected.officialRecord.tournament.goals}</b></span><span><small>도움 / 출전 시간</small><b>${selected.officialRecord.tournament.assists} / ${selected.officialRecord.tournament.minutes}′</b></span>` : ""}</div>` : ""}
    <div class="detail-stats">${visibleStats.map((key) => `<div><span>${statLabels[key]}</span><b>${selected.attributes[key]}</b><i><em style="--stat:${selected.attributes[key]}%"></em></i></div>`).join("")}</div>
    <div class="role-tags">${selected.roleTags.map((role) => `<span>${roleLabels[role] || role}</span>`).join("")}</div>
    <p class="detail-note">${selected.roleTags.includes("playmaker") ? "중앙에서 패스 전개를 맡기면 점유 지표가 상승합니다." : selected.roleTags.includes("pressing-forward") ? "높은 압박에서 상대의 후방 전개를 흔들지만 체력 소모가 커집니다." : selected.roleTags.includes("anchor") ? "수비 라인 앞을 보호해 상대의 역습 위험을 줄입니다." : "현재 배치와 전술 지시에 따라 경기 영향도가 달라집니다."}</p>
  </section>`;
}

function renderSquadAnalysis() {
  const profile = opponentProfile();
  const starters = currentLineupPlayers();
  const wideDefenders = starters.filter((item) => ["RB", "LB"].includes(item.primaryPosition));
  const midfieldShield = starters.filter((item) => ["DM", "CM"].includes(item.primaryPosition));
  const speedCover = average(wideDefenders.map((item) => item.attributes.pace));
  const shield = average(midfieldShield.map((item) => (item.attributes.defense + item.attributes.physical) / 2));
  const transitionRisk = profile.tempo === "fast" || profile.buildUp === "direct";
  const widthVerdict = profile.attackWidth === "wide" ? (speedCover >= 76 ? "대응 가능" : "주의 필요") : "중앙 집중";
  const centralVerdict = profile.buildUp === "possession" ? (shield >= 75 ? "대응 가능" : "보강 필요") : "안정";
  const keyOpponent = rankedActor(awayTeam().defaultStartingXI.map(player).filter(Boolean), profile.attackWidth === "wide" ? "wing" : profile.buildUp === "possession" ? "build" : "goal", `scout-${awayTeam().id}`);
  const advice = getCoachAdvice();
  const reportRows = [
    { label: "상대 공격 패턴", value: profile.label, note: profile.threat, tone: "attack" },
    { label: "측면 매치업", value: widthVerdict, note: `우리 풀백 평균 스피드 ${Math.round(speedCover || 0)}`, tone: widthVerdict === "주의 필요" ? "warning" : "good" },
    { label: "중앙 매치업", value: centralVerdict, note: `중원 보호 지수 ${Math.round(shield || 0)}`, tone: centralVerdict === "보강 필요" ? "warning" : "good" }
  ];
  return `<div class="squad-analysis">
    <div class="analysis-title"><span>SCOUTING REPORT</span><b>${awayTeam().name} 상대 분석</b></div>
    <div class="analysis-rows">${reportRows.map((item) => `<div class="analysis-row ${item.tone}"><span>${item.label}</span><b>${item.value}</b><small>${item.note}</small></div>`).join("")}</div>
    <div class="key-opponent"><span>KEY OPPONENT</span><b>${keyOpponent?.name || awayTeam().name}</b><p>${keyOpponent ? `${keyOpponent.primaryPosition} · ${keyOpponent.roleTags.map((role) => roleLabels[role] || role).slice(0, 2).join(" / ")}` : profile.threat}</p></div>
    <div class="left-coach-note"><span>규칙 기반 대응 제안</span><p>${advice.reasons[0]}</p><button data-apply-coach>추천 전술 적용 <i>→</i></button></div>
    <div class="squad-tip"><span>TIP</span>${transitionRisk ? "상대 전환이 빠릅니다. 수비 라인을 올렸다면 재생 전 위험도를 꼭 확인하세요." : "상대의 중앙 전개를 끊으려면 앵커와 볼 위너 역할의 위치가 중요합니다."}</div>
  </div>`;
}

function renderSquadPanel() {
  const starters = currentLineupPlayers();
  const substitutes = benchPlayers();
  const viewingStarters = state.activeTab !== "bench";
  const sourcePlayers = viewingStarters ? starters : substitutes;
  const filterGroups = {
    all: () => true,
    attack: (item) => squadPositionGroup(item) === "attack",
    midfield: (item) => squadPositionGroup(item) === "midfield",
    defense: (item) => squadPositionGroup(item) === "defense",
    goalkeeper: (item) => squadPositionGroup(item) === "goalkeeper"
  };
  const visiblePlayers = sortSubstitutionPlayers(sourcePlayers).filter(filterGroups[state.squadFilter] || filterGroups.all);
  const rosterGroup = viewingStarters ? "starter" : "bench";
  const groupClass = viewingStarters ? "starters" : "substitutes";
  const groupNumber = viewingStarters ? "01" : "02";
  const groupTitle = viewingStarters ? "STARTING XI" : "SUBSTITUTES";
  const groupLabel = viewingStarters ? "선발" : "후보";
  const filterOptions = [["all", "전체"], ["attack", "공격"], ["midfield", "중원"], ["defense", "수비"], ["goalkeeper", "GK"]];
  return `<aside class="squad-panel">
    <div class="panel-tabs"><button class="tab ${viewingStarters ? "active" : ""}" data-tab="starters">선발 XI <span>${starters.length}</span></button><button class="tab ${!viewingStarters ? "active" : ""}" data-tab="bench">후보 <span>${substitutes.length}</span></button></div>
    <div class="squad-summary squad-overview"><span><i class="starting-dot"></i>선발 <b>${starters.length}/11</b></span><span><i class="bench-dot"></i>후보 <b>${substitutes.length}</b></span><span>평균 OVR <b>${Math.round(average(visiblePlayers.map((item) => item.overall)) || 0)}</b></span></div><div class="squad-tools"><label><span>포지션</span><select data-squad-filter>${filterOptions.map(([value, label]) => `<option value="${value}" ${state.squadFilter === value ? "selected" : ""}>${label}</option>`).join("")}</select></label><div class="density-toggle" aria-label="목록 밀도"><button class="${state.squadDensity === "detail" ? "active" : ""}" data-squad-density="detail">상세</button><button class="${state.squadDensity === "dense" ? "active" : ""}" data-squad-density="dense">간단</button></div></div>${renderPlayerDetail()}<div class="roster-list"><section class="roster-group ${groupClass}"><div class="roster-group-heading"><span><i>${groupNumber}</i> ${groupTitle}</span><b>${groupLabel} ${visiblePlayers.length}${state.squadFilter !== "all" ? ` / ${sourcePlayers.length}` : viewingStarters ? "/11" : ""}</b></div><div class="roster-cards">${visiblePlayers.map((item) => renderRosterCard(item, false, rosterGroup, state.squadDensity)).join("") || `<div class="roster-empty">선택한 포지션에 해당하는 선수가 없습니다.</div>`}</div></section></div><div class="squad-tip"><span>TIP</span> 카드의 포지션·OVR·컨디션·FIT과 핵심 스탯을 비교해 후반 교체 카드를 선택하세요.</div>
  </aside>`;
}

function slotForPlayer(playerId) {
  return Object.entries(state.lineup).find(([, id]) => id === playerId)?.[0];
}

function slotCoordinates(playerId) {
  if (state.freePositions[playerId]) return state.freePositions[playerId];
  const slot = slotForPlayer(playerId);
  return slot ? slotCoordinate(state.formationId, slot) : [50, 50];
}

function buildEventMotion(event) {
  const homeAttack = event.attackingTeam === "home";
  const moment = event.moment || event.type;
  const actorStart = event.playerId ? slotCoordinates(event.playerId) : homeAttack ? [50, 38] : [50, 34];
  const lane = seeded(`${event.minute}-${event.text}`) > .5 ? 1 : -1;
  const players = {};
  const addMove = (id, role, x, y) => { if (id && state.lineup && slotForPlayer(id)) players[id] = { role, x, y }; };
  let ballStart = actorStart;
  let ballEnd = homeAttack ? [50 + lane * 7, 8] : [50 + lane * 7, 92];
  let overlay = { kind: moment, team: event.attackingTeam, title: "", detail: "" };

  if (moment === "goal") {
    if (homeAttack) {
      addMove(event.playerId, "attacker", lane * 18, -54);
      addMove(event.supportId, "support", -lane * 18, -31);
      overlay = { kind: "goal", team: "home", title: "GOAL!", detail: `${homeTeam().shortName} 득점` };
    } else {
      addMove(event.playerId, "keeper", lane * 36, -18);
      addMove(event.supportId, "defender", -lane * 18, -30);
      ballStart = [50 + lane * 10, 36];
      overlay = { kind: "goal", team: "away", title: "GOAL", detail: `${awayTeam().shortName} 득점` };
    }
  } else if (moment === "save") {
    if (homeAttack) {
      addMove(event.playerId, "attacker", lane * 14, -45);
      addMove(event.supportId, "support", -lane * 13, -25);
      overlay = { kind: "save", team: "home", title: "ON TARGET", detail: "상대 골키퍼 선방" };
    } else {
      addMove(event.playerId, "keeper", lane * 32, -15);
      addMove(event.supportId, "defender", -lane * 14, -23);
      ballStart = [50 + lane * 10, 37];
      overlay = { kind: "save", team: "away", title: "SAVED!", detail: `${player(event.playerId)?.name || "골키퍼"} 선방` };
    }
  } else if (moment === "shot") {
    if (homeAttack) {
      addMove(event.playerId, "attacker", lane * 12, -40);
      addMove(event.supportId, "support", -lane * 15, -22);
    } else {
      addMove(event.playerId, "defender", lane * 16, -22);
      ballStart = [50 + lane * 12, 37];
    }
    overlay = { kind: "shot", team: event.attackingTeam, title: "SHOT", detail: "슈팅 기회" };
  } else if (moment === "press") {
    addMove(event.playerId, "press", lane * 17, -19);
    addMove(event.supportId, "support", -lane * 13, -14);
    ballEnd = homeAttack ? [54 + lane * 5, 42] : [46 + lane * 5, 57];
    overlay = { kind: "press", team: event.attackingTeam, title: "PRESS WIN", detail: "전방 압박 성공" };
  } else if (moment === "build") {
    addMove(event.playerId, "builder", lane * 15, -24);
    addMove(event.supportId, "support", -lane * 19, -27);
    ballEnd = homeAttack ? [50 + lane * 15, Math.max(14, actorStart[1] - 26)] : [50 + lane * 12, 67];
    overlay = { kind: "build", team: event.attackingTeam, title: "BUILD UP", detail: "전개 패스 연결" };
  } else if (moment === "fitness") {
    addMove(event.playerId, "tired", 0, 8);
    ballStart = [50, 50]; ballEnd = [50, 50];
    overlay = { kind: "fitness", team: "home", title: "FATIGUE", detail: "교체 타이밍 점검" };
  } else if (moment === "sub") {
    addMove(event.playerId, "support", 0, -12);
    ballStart = [50, 50]; ballEnd = [50, 50];
    overlay = { kind: "sub", team: "home", title: "SUBSTITUTION", detail: "교체 적용" };
  } else if (moment === "tactic") {
    ballStart = [50, 50]; ballEnd = [50, 50];
    overlay = { kind: "tactic", team: "home", title: "TACTIC CHANGE", detail: "감독 지시 반영" };
  } else if (moment === "opponent") {
    ballStart = [50, 50]; ballEnd = [50, 50];
    overlay = { kind: "opponent", team: "away", title: "OPPOSITION ADAPT", detail: "상대 전술 전환 감지" };
  } else if (moment === "half") {
    ballStart = [50, 50]; ballEnd = [50, 50];
    overlay = { kind: "half", team: "neutral", title: "HALF TIME", detail: "라커룸 지시" };
  } else {
    ballStart = [50, 50]; ballEnd = [50, 50];
    overlay = { kind: "finish", team: "neutral", title: "FULL TIME", detail: "경기 종료" };
  }
  return { moment, players, ballStart, ballEnd, overlay };
}

function slotCard(slot) {
  const assigned = player(state.lineup[slot]);
  const coords = assigned ? state.freePositions[assigned.id] || slotCoordinate(state.formationId, slot) : slotCoordinate(state.formationId, slot);
  const fit = positionFit(assigned, slot);
  const fitClass = fit >= 85 ? "fit-high" : fit >= 65 ? "fit-mid" : "fit-low";
  const matchState = assigned ? playerState(assigned, state.scenarioId) : null;
  const statRating = assigned ? positionStatRating(assigned, slot) : 0;
  const movement = assigned ? state.playback?.motion?.players?.[assigned.id] : null;
  return `<button class="pitch-slot ${assigned ? "filled" : "empty"} ${fitClass} ${state.playback?.activePlayerId === assigned?.id ? "involved" : ""} ${movement ? `motion-${movement.role}` : ""}" data-slot="${slot}" style="--x:${coords[0]}%;--y:${coords[1]}%;--move-x:${movement?.x || 0}px;--move-y:${movement?.y || 0}px">
    <span class="slot-position">${slot}</span>
    ${assigned ? `<span class="slot-player" draggable="true" data-player="${assigned.id}"><b>${assigned.name}</b><small><span class="slot-rating">평점 ${statRating}</span><span>체력 ${matchState.stamina}</span></small></span><span class="fit-ring">${fit}</span>` : `<span class="slot-empty">선수 배치</span>`}
  </button>`;
}

function renderPositionZones() {
  return `<div class="position-zones ${state.selectedPlayerId ? "selecting" : ""}">${positionZones.map((zone) => `<span class="position-zone" data-position-zone="${zone.id}" style="--zone-x:${zone.coords[0]}%;--zone-y:${zone.coords[1]}%">${zone.label}</span>`).join("")}</div>`;
}

function renderPitch() {
  const live = state.playback;
  const motion = live?.motion;
  const ballStart = motion?.ballStart || [50, 50];
  const ballEnd = motion?.ballEnd || [50, 50];
  return `<section class="pitch-shell">
    <div class="pitch-toolbar"><span><i class="drag-icon">↗</i> FIFA POSITION DROP MAP</span><span class="auto-formation">AUTO ${formation().label}</span><span class="fit-legend"><i class="good"></i>적합 <i class="warn"></i>보통 <i class="bad"></i>주의</span></div>
    <div class="pitch free-layout ${live?.isPlaying ? "playback-active" : ""} ${motion ? `moment-${motion.moment}` : ""}"><span class="match-orb" style="--ball-start-x:${ballStart[0]}%;--ball-start-y:${ballStart[1]}%;--ball-end-x:${ballEnd[0]}%;--ball-end-y:${ballEnd[1]}%">⚽</span>${motion?.overlay ? `<div class="pitch-event-overlay ${motion.overlay.kind} ${motion.overlay.team}"><b>${motion.overlay.title}</b><span>${motion.overlay.detail}</span></div>` : ""}
      <div class="pitch-lines"><span class="halfway"></span><span class="center-circle"></span><span class="penalty top"></span><span class="penalty bottom"></span></div>
      ${renderPositionZones()}
      ${formation().slots.map(slotCard).join("")}
    </div>
    <div class="bench-row"><span>BENCH</span><div>${benchPlayers().map((item) => renderRosterCard(item, true)).join("")}</div></div>
  </section>`;
}

function renderTacticsPanel() {
  const options = {
    pressing: [["low", "낮음"], ["medium", "중간"], ["high", "높음"]],
    defensiveLine: [["low", "낮음"], ["standard", "보통"], ["high", "높음"]],
    attackWidth: [["narrow", "좁게"], ["standard", "보통"], ["wide", "넓게"]],
    tempo: [["slow", "느리게"], ["balanced", "보통"], ["fast", "빠르게"]],
    buildUp: [["possession", "점유"], ["mixed", "혼합"], ["direct", "직선"]]
  };
  const labels = { pressing: "압박", defensiveLine: "수비 라인", attackWidth: "공격 폭", tempo: "템포", buildUp: "빌드업" };
  return `<section class="tactics-panel">
    <div class="control-heading"><span class="step">02</span><div><h2>전술 지시</h2><p>전술 변경은 결과 지표와 이벤트에 즉시 반영됩니다.</p></div></div>
    <div class="tactic-grid">${Object.entries(options).map(([key, values]) => `<label>${labels[key]}<select data-tactic="${key}">${values.map(([value, label]) => `<option value="${value}" ${state.tactics[key] === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>`).join("")}</div>
    <div class="tactic-summary"><span>현재 지시</span><b>${tacticText()}</b></div>
    <button class="simulate-button" id="simulate-button"><span>▶</span> 이 전술로 시뮬레이션</button>
  </section>`;
}

function renderCoachPanel() {
  const advice = state.coachAdvice || getCoachAdvice();
  const recommended = advice.tactics;
  const summary = Object.entries(recommended).map(([key, value]) => tacticLabel(key, value)).join(" · ");
  return `<section class="coach-panel">
    <div class="coach-heading"><div><span class="eyebrow">TACTICA COACH · RULE-BASED</span><h3>상대 전술 대응 추천</h3></div><span class="coach-confidence">상성 지수 ${advice.confidence}%</span></div>
    <p>${advice.title}</p>
    <div class="coach-plan"><b>${summary}</b><div>${advice.reasons.map((item) => `<span>• ${item}</span>`).join("")}</div></div>
    <button class="coach-apply" data-apply-coach>${advice.changes.length ? "추천 전술 적용" : "현재 전술 유지"}<small>${advice.changes.length ? `${advice.changes.length}개 지시 변경` : "상대 대응 완료"}</small></button>
  </section>`;
}

function renderOpponentPanel() {
  const scenario = currentScenario();
  const record = awayTeam().tournament || {};
  return `<section class="opponent-panel">
    <div class="mini-title"><span>OPPONENT SCOUT</span><b>${awayTeam().name} 분석</b></div>
    <p>${awayTeam().tacticalStyle}</p>
    <div class="opponent-tournament-data"><span>GROUP <b>${record.group || "-"}</b></span><span>FIFA <b>#${record.fifaRanking || "-"}</b></span><span>ELO <b>${record.eloRating || "-"}</b></span><span>점유 <b>${record.possession ?? "-"}%</b></span><span>슈팅 <b>${record.shots ?? "-"}</b></span><span>코너 <b>${record.corners ?? "-"}</b></span></div>
    <ul>${scenario.opponentAnalysis.map((item) => `<li>${item}</li>`).join("")}</ul>
    <div class="focus-box"><span>감독 미션</span><b>${scenario.objective}</b></div>
  </section>`;
}

function renderOpponentResponsePanel(result = state.result) {
  const profile = opponentProfile();
  const adaptations = result?.opponentAdaptations || [];
  const timeline = adaptations.length
    ? `<div class="opponent-adaptation-log">${adaptations.map((item) => `<article><time>${item.minute}′</time><div><b>${item.label}</b><p>${item.reason}</p></div></article>`).join("")}</div>`
    : `<p class="opponent-adaptation-empty">후반 60분 이후 스코어와 경기 양상에 따라 상대 대응이 기록됩니다.</p>`;
  return `<section class="opponent-response">
    <span>OPPOSITION TACTICS</span><b>${profile.label}</b>
    <div class="opponent-tactic-tags"><i>${tacticLabel("pressing", profile.pressing)}</i><i>${tacticLabel("defensiveLine", profile.defensiveLine)}</i><i>${tacticLabel("tempo", profile.tempo)}</i></div>
    <p>${profile.counter}</p><div class="opponent-adaptation-heading"><span>ADAPTATION TRACE</span><b>상대 대응 기록</b></div>${timeline}
  </section>`;
}

function metricCard(label, value, note, tone) {
  return `<div class="metric-card ${tone}"><span>${label}</span><b>${value}</b><small>${note}</small><div class="metric-bar"><i style="--value:${value}%"></i></div></div>`;
}

function renderResults() {
  const result = state.result;
  if (!result) {
    return `<section class="results empty-results"><div class="result-placeholder-icon">◌</div><h2>전술 결과를 준비 중입니다</h2><p>선발과 전술을 구성한 뒤 시뮬레이션을 실행하면<br/>감독의 선택이 경기 흐름에 미치는 영향을 확인할 수 있습니다.</p><div class="empty-hints"><span>선수 배치</span><i>→</i><span>전술 지시</span><i>→</i><span>결과 분석</span></div></section>`;
  }
  return `<section class="results">
    <div class="result-heading"><div><span class="eyebrow">SIMULATION RESULT</span><h2>전술 결과 분석</h2></div><button class="save-plan" id="save-plan">+ 현재 안 저장</button></div>
    <div class="scoreboard"><div><small>xG ${result.xgHome.toFixed(1)}</small><b>${homeTeam().shortName}</b></div><strong>${result.homeScore}<i>-</i>${result.awayScore}</strong><div><small>xG ${result.xgAway.toFixed(1)}</small><b>${awayTeam().shortName}</b></div></div>
    <div class="metrics">${metricCard("공격", result.attack, metricDeltaLabel(result.attack), "attack")}${metricCard("점유", result.possession, metricDeltaLabel(result.possession), "possession")}${metricCard("수비", result.defense, metricDeltaLabel(result.defense), "defense")}${metricCard("역습 위험", result.risk, result.risk > 64 ? "주의" : "관리 가능", "risk")}</div>
    <div class="result-grid"><div class="timeline"><h3>예상 경기 흐름</h3>${result.events.map((event) => `<div class="event ${event.type}"><time>${String(event.minute).padStart(2, "0")}′</time><span></span><p>${event.text}</p></div>`).join("")}</div><div class="insights"><h3>감독 리포트</h3>${result.insights.map((item) => `<p>${item}</p>`).join("")}<div class="effect-tags">${result.effects.map((effect) => `<span>${effect}</span>`).join("")}</div></div></div>
    ${renderSavedPlans()}
  </section>`;
}

function renderMatchStats(result, expanded = false) {
  return `<section class="match-stats ${expanded ? "expanded" : ""}">
    <div class="match-stats-heading"><h3>경기 결과 지표</h3><span>${homeTeam().shortName} <i>VS</i> ${awayTeam().shortName}</span></div>
    <div class="stat-rows">${result.matchStats.map((stat) => {
      const total = Math.max(1, stat.home + stat.away);
      const homeWidth = Math.round((stat.home / total) * 100);
      return `<div class="stat-row"><b>${stat.home}</b><div><span>${stat.label}</span><i><em style="--home:${homeWidth}%"></em></i></div><b>${stat.away}</b></div>`;
    }).join("")}</div>
  </section>`;
}

function renderDecisionLog(result, expanded = false) {
  const decisions = result.decisionLog || [];
  if (!decisions.length) {
    return `<section class="decision-log empty"><div><span>COACH DECISIONS</span><b>경기 중 전술 변경 없음</b></div><p>이번 시뮬레이션은 킥오프 전 설정한 선발과 전술을 끝까지 유지했습니다.</p></section>`;
  }
  return `<section class="decision-log ${expanded ? "expanded" : ""}"><div class="decision-heading"><span>COACH DECISIONS</span><b>감독 의사결정 로그</b></div><div class="decision-list">${decisions.map((event) => `<div class="decision-item ${event.type}"><time>${String(event.minute).padStart(2, "0")}′</time><i>${event.type === "sub" ? "SUB" : "TACTIC"}</i><div><p>${event.text}</p>${event.actualImpact ? `<small class="actual-impact">재계산 반영 ${event.actualImpact.map(([label, value]) => `${label} ${value >= 0 ? "+" : ""}${value}`).join(" · ")}</small>` : ""}</div></div>`).join("")}</div></section>`;
}

function tacticalReasonRows(result) {
  const starters = currentLineupPlayers();
  const finisher = [...starters].sort((first, second) => second.attributes.shooting - first.attributes.shooting)[0];
  const profile = result.opponentProfile || opponentProfile();
  const setupNote = result.fitAverage >= 88
    ? "선수의 주 포지션과 배치가 잘 맞아 능력치 효율 손실이 작습니다."
    : "본 포지션과 다른 배치가 있어 공격·점유·수비 효율에서 감점이 발생했습니다.";
  const riskNote = result.risk >= 64
    ? `${profile.threat}을 가진 상대에게 현재 수비 라인과 전환 위험이 겹쳤습니다.`
    : `${profile.threat}에 대한 수비 전환 위험이 관리 가능한 수준입니다.`;
  const staminaNote = result.lowStamina.length
    ? `${result.lowStamina.slice(0, 2).map((item) => item.name).join(", ")}의 후반 체력이 낮아 역할 수행 효율이 줄었습니다.`
    : "90분까지 선발의 체력 분포가 안정적으로 유지됐습니다.";
  return [
    { tone: result.fitAverage >= 88 ? "good" : "warning", label: "배치 적합도", value: `${Math.round(result.fitAverage)}점`, note: setupNote },
    { tone: "info", label: "핵심 마무리", value: finisher ? `${finisher.name} · SHO ${finisher.attributes.shooting}` : "선발 데이터 없음", note: finisher ? "선수의 슈팅·위치 선정·역할 태그가 공격 이벤트의 주체 선택에 반영됩니다." : "마무리 선수를 확인할 수 없습니다." },
    { tone: result.risk >= 64 ? "warning" : "good", label: "상대 상성", value: profile.label, note: riskNote },
    { tone: result.lowStamina.length ? "warning" : "good", label: "후반 체력", value: result.lowStamina.length ? `주의 ${result.lowStamina.length}명` : "안정", note: staminaNote }
  ];
}

function renderTacticalExplanation(result) {
  const rows = tacticalReasonRows(result);
  return `<section class="tactical-explanation"><div class="explanation-heading"><div><span>RULE TRACE</span><b>결과가 만들어진 근거</b></div><small>선수 능력치 · 포지션 적합도 · 체력 · 상대 전술을 합산</small></div><div class="explanation-list">${rows.map((row) => `<article class="explanation-row ${row.tone}"><span>${row.label}</span><b>${row.value}</b><p>${row.note}</p></article>`).join("")}</div></section>`;
}

function renderDecisionImpact(result) {
  const impact = result.decisionImpact;
  if (!impact) return "";
  return `<section class="decision-impact"><div class="decision-impact-heading"><div><span>IF REPLAY COMPLETE</span><b>‘${impact.label}’ 선택의 실제 영향</b></div><small>원래 플랜 → 적용 후</small></div><div class="impact-score"><span>${impact.baseline.homeScore}<i>:</i>${impact.baseline.awayScore}</span><b>→</b><strong>${impact.after.homeScore}<i>:</i>${impact.after.awayScore}</strong></div><div class="impact-metrics">${impact.metrics.map((metric) => `<div class="${metric.tone}"><small>${metric.label}</small><b>${metric.before} <i>→</i> ${metric.after}</b><em>${metric.delta}</em></div>`).join("")}</div><p>${impact.verdict}</p></section>`;
}

function reportMarkdown() {
  const result = state.result;
  if (!result) return "";
  const decisions = result.decisionLog || [];
  const provenance = datasetProvenance();
  return [
    `# TACTICA 2026: 차라리 내가 감독함 - 전술 리포트`,
    ``,
    `- 매치: ${homeTeam().name} vs ${awayTeam().name}`,
    `- 결과: ${homeTeam().shortName} ${result.homeScore} - ${result.awayScore} ${awayTeam().shortName}`,
    `- xG: ${result.xgHome.toFixed(1)} - ${result.xgAway.toFixed(1)}`,
    `- 포메이션: ${formation().label}`,
    `- 전술: ${tacticText()}`,
    ``,
    `## 핵심 지표`,
    ...result.matchStats.map((item) => `- ${item.label}: ${item.home} - ${item.away}`),
    ``,
    `## 감독 의사결정`,
    ...(decisions.length ? decisions.map((item) => `- ${item.minute}′ ${item.text}`) : ["- 경기 중 전술 변경 없음"]),
    ``,
    `## 감독 리포트`,
    ...result.insights.map((item) => `- ${item}`),
    ``,
    `## Mission Score`,
    `- 목표: ${result.missionScore?.objective || currentScenario().objective}`,
    `- 점수: ${result.missionScore?.score ?? "-"}/100`,
    ...(result.missionScore?.rows || []).map((item) => `- ${item.label}: ${item.value}`),
    ``,
    `## Role Impact Map`,
    ...(result.roleImpact || []).slice(0, 3).map((item, index) => `- ${index + 1}. ${item.name} (${item.note}, 기여 ${item.score})`),
    ``,
    `## Opposition Adaptation`,
    ...((result.opponentAdaptations || []).length ? result.opponentAdaptations.map((item) => `- ${item.minute}′ ${item.label}: ${item.reason}`) : ["- 기본 스카우팅 전술 유지"]),
    ``,
    `데이터 상태: ${provenance.note} (${provenance.label})`,
    `데이터 출처: ${provenance.sourceName}`,
    `데이터 갱신: ${provenance.lastUpdated}`,
    `데이터 이용 조건: ${provenance.license}`
  ].join("\n");
}

function downloadReport() {
  if (!state.result) return;
  const blob = new Blob([reportMarkdown()], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `TACTICA-${homeTeam().shortName}-vs-${awayTeam().shortName}-report.md`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function saveCurrentPlan() {
  if (!state.result || state.savedPlans.length >= 2) return;
  state.savedPlans.push({ name: `PLAN ${String.fromCharCode(65 + state.savedPlans.length)}`, formation: formation().label, summary: tacticText(), lineup: { ...state.lineup }, freePositions: structuredClone(state.freePositions), tactics: { ...state.tactics }, result: state.result });
  render();
}

function renderResultSectionLegacy() {
  const result = state.result;
  if (!result) {
    return `<section class="results empty-results"><div class="result-placeholder-icon">◌</div><h2>전술 결과를 준비 중입니다</h2><p>선발과 전술을 구성한 뒤 시뮬레이션을 실행하면<br/>감독의 선택이 경기 흐름에 미치는 영향을 확인할 수 있습니다.</p><div class="empty-hints"><span>선수 배치</span><i>→</i><span>전술 지시</span><i>→</i><span>결과 분석</span></div></section>`;
  }
  return `<section class="results">
    <div class="result-heading"><div><span class="eyebrow">SIMULATION RESULT</span><h2>전술 결과 분석</h2></div><button class="save-plan" id="save-plan">+ 현재 안 저장</button></div>
    <div class="scoreboard"><div><small>xG ${result.xgHome.toFixed(1)}</small><b>${homeTeam().shortName}</b></div><strong>${result.homeScore}<i>-</i>${result.awayScore}</strong><div><small>xG ${result.xgAway.toFixed(1)}</small><b>${awayTeam().shortName}</b></div></div>
    <div class="metrics">${metricCard("공격", result.attack, metricDeltaLabel(result.attack), "attack")}${metricCard("점유", result.possession, metricDeltaLabel(result.possession), "possession")}${metricCard("수비", result.defense, metricDeltaLabel(result.defense), "defense")}${metricCard("역습 위험", result.risk, result.risk > 64 ? "주의" : "관리 가능", "risk")}</div>
    ${renderMatchStats(result)}
    <div class="result-grid"><div class="timeline"><h3>예상 경기 흐름</h3>${result.events.map((event) => `<div class="event ${event.type}"><time>${String(event.minute).padStart(2, "0")}′</time><span></span><p>${event.text}</p></div>`).join("")}</div><div class="insights"><h3>감독 리포트</h3>${result.insights.map((item) => `<p>${item}</p>`).join("")}<div class="effect-tags">${result.effects.map((effect) => `<span>${effect}</span>`).join("")}</div></div></div>
    <button class="open-results" id="open-results"><span>↗</span> 큰 카드에서 결과 분석하기</button>
    ${renderSavedPlans()}
  </section>`;
}

function clearPlayback() {
  if (state.playbackTimer) window.clearInterval(state.playbackTimer);
  state.playbackTimer = null;
  state.playback = null;
}

function matchStatsFromPhaseStats(phaseStats, homeScore, awayScore, statLabels) {
  const totals = phaseStats.reduce((sum, phase) => ({
    shotsHome: sum.shotsHome + phase.shotsHome, shotsAway: sum.shotsAway + phase.shotsAway,
    onTargetHome: sum.onTargetHome + phase.onTargetHome, onTargetAway: sum.onTargetAway + phase.onTargetAway,
    cornersHome: sum.cornersHome + phase.cornersHome, cornersAway: sum.cornersAway + phase.cornersAway,
    foulsHome: sum.foulsHome + phase.foulsHome, foulsAway: sum.foulsAway + phase.foulsAway
  }), { shotsHome: 0, shotsAway: 0, onTargetHome: 0, onTargetAway: 0, cornersHome: 0, cornersAway: 0, foulsHome: 0, foulsAway: 0 });
  const values = [
    [totals.shotsHome, totals.shotsAway], [totals.onTargetHome, totals.onTargetAway],
    [Math.max(0, totals.onTargetAway - awayScore), Math.max(0, totals.onTargetHome - homeScore)],
    [totals.cornersHome, totals.cornersAway], [totals.foulsHome, totals.foulsAway]
  ];
  return statLabels.map((item, index) => ({ ...item, home: values[index][0], away: values[index][1] }));
}

function resultParticipants(result, substitutions = []) {
  const ids = new Set(Object.values(state.lineup));
  substitutions.forEach((substitution) => {
    ids.add(substitution.outId);
    ids.add(substitution.inId);
  });
  (result?.decisionLog || []).filter((event) => event.type === "sub").forEach((event) => {
    ids.add(event.playerId);
    ids.add(event.supportId);
  });
  return [...ids].map(player).filter((item) => item?.teamId === homeTeam().id);
}

function resultSlots(substitutions = []) {
  const slotsById = Object.fromEntries(Object.entries(state.lineup).map(([slot, id]) => [id, slot]));
  substitutions.forEach((substitution) => {
    if (!substitution.slot) return;
    slotsById[substitution.outId] = substitution.slot;
    slotsById[substitution.inId] = substitution.slot;
  });
  return slotsById;
}

function nextPhaseStartAfter(minute) {
  return [16, 31, 46, 61, 76].find((start) => start > minute) || 91;
}

function replanRemainingMatch() {
  const live = state.playback;
  const previous = state.result;
  if (!live || !previous || live.minute >= 90) return;
  const nextPhaseStart = nextPhaseStartAfter(live.minute);
  const staminaOverrides = Object.fromEntries((live.substitutions || []).map((substitution) => [substitution.inId, { minute: substitution.minute, stamina: substitution.stamina }]));
  const revised = calculateSimulation({ staminaOverrides });
  const completedEvents = previous.events.filter((event) => event.minute <= live.minute && !["finish", "sub", "tactic"].includes(event.moment));
  const adjustmentEvents = live.adjustmentEvents || [];
  let homeScore = live.homeScore;
  let awayScore = live.awayScore;
  const remainingEvents = revised.events
    .filter((event) => event.minute >= nextPhaseStart && event.moment !== "finish")
    .map((event) => {
      if (event.type === "goal") {
        if (event.team === "home") homeScore += 1;
        if (event.team === "away") awayScore += 1;
      }
      return { ...event, scoreHome: homeScore, scoreAway: awayScore };
    });
  const events = [...completedEvents, ...adjustmentEvents, ...remainingEvents, {
    minute: 90, type: "finish", moment: "finish", team: "neutral", attackingTeam: "neutral", scoreHome: homeScore, scoreAway: awayScore,
    text: `FULL TIME · ${homeTeam().shortName} ${homeScore} - ${awayScore} ${awayTeam().shortName}`
  }].sort((a, b) => a.minute - b.minute || (a.moment === "half" ? -1 : b.moment === "half" ? 1 : 0));
  const phaseStats = [...(previous.phaseStats || []).filter((phase) => phase.end < nextPhaseStart), ...revised.phaseStats.filter((phase) => phase.end >= nextPhaseStart)];
  const phaseMetrics = [...previous.phaseMetrics.filter((phase) => phase.minute < nextPhaseStart), ...revised.phaseMetrics.filter((phase) => phase.minute >= nextPhaseStart)];
  const staminaTimeline = [...previous.staminaTimeline.filter((snapshot) => snapshot.minute < nextPhaseStart), ...revised.staminaTimeline.filter((snapshot) => snapshot.minute >= nextPhaseStart)];
  const xgHome = phaseStats.reduce((sum, phase) => sum + phase.xgHome, 0);
  const xgAway = phaseStats.reduce((sum, phase) => sum + phase.xgAway, 0);
  const finalStamina = staminaTimeline.at(-1)?.players || [];
  const lowStamina = finalStamina.filter((item) => item.stamina < 55).map((item) => player(item.id)).filter(Boolean);
  const changeScope = live.minute === 45 ? "하프타임" : `${live.minute}분 경기 중`;
  state.result = {
    ...revised,
    homeScore, awayScore, events, phaseStats, phaseMetrics, staminaTimeline, xgHome: clamp(xgHome, .25, 4.2), xgAway: clamp(xgAway, .25, 4.1),
    matchStats: matchStatsFromPhaseStats(phaseStats, homeScore, awayScore, revised.matchStats),
    attack: Math.round(clamp(average(phaseMetrics.map((item) => item.attack)), 35, 95)),
    possession: Math.round(clamp(average(phaseMetrics.map((item) => item.possession)), 35, 95)),
    defense: Math.round(clamp(average(phaseMetrics.map((item) => item.defense)), 35, 95)),
    risk: Math.round(clamp(average(phaseMetrics.map((item) => item.risk)), 20, 92)),
    finalMetric: phaseMetrics.at(-1), lowStamina, decisionLog: adjustmentEvents,
    effects: [...revised.effects, `${changeScope} 교체·전술 변경을 반영해 ${nextPhaseStart}분부터 결과를 재계산했습니다.`].slice(0, 4)
  };
  const chosenDecision = live.decisionReplay?.options.find((option) => option.id === live.decisionReplay?.chosenId);
  if (chosenDecision) {
    state.result.decisionImpact = buildDecisionImpact(live.decisionReplay?.baseline, state.result, chosenDecision);
  }
  const baselinePhase = previous.phaseMetrics.find((phase) => phase.minute >= nextPhaseStart);
  const revisedPhase = state.result.phaseMetrics.find((phase) => phase.minute >= nextPhaseStart);
  if (baselinePhase && revisedPhase) {
    (state.result.decisionLog || []).filter((event) => event.type === "sub" && event.impact).forEach((event) => {
      event.actualImpact = [
        ["공격", revisedPhase.attack - baselinePhase.attack], ["점유", revisedPhase.possession - baselinePhase.possession],
        ["수비", revisedPhase.defense - baselinePhase.defense], ["위험", revisedPhase.risk - baselinePhase.risk]
      ].map(([label, value]) => [label, Math.round(value)]);
    });
  }
  const retiredStamina = (live.substitutions || []).map((substitution) => {
    const snapshot = previous.staminaTimeline.find((item) => item.minute >= substitution.minute);
    const outgoing = snapshot?.players.find((item) => item.id === substitution.outId);
    return outgoing ? { id: outgoing.id, stamina: outgoing.stamina } : null;
  }).filter(Boolean);
  state.result.roleImpact = buildRoleImpactMap(resultParticipants(state.result, live.substitutions), resultSlots(live.substitutions), [...finalStamina, ...retiredStamina], events);
  state.result.missionScore = buildMissionScore(state.result);
  const nextEventIndex = events.findIndex((event) => event.minute > live.minute);
  state.playback = { ...live, eventIndex: nextEventIndex < 0 ? events.length : nextEventIndex, replanned: true, needsReplan: false };
}

function runSimulation() {
  clearPlayback();
  state.result = calculateSimulation();
  state.analysisRevealed = false;
  state.resultViewOpen = false;
  state.rightPanelTab = "match";
  startPlayback();
}

function startPlaybackLegacy() {
  if (!state.result) return;
  clearPlayback();
  state.playback = { isPlaying: true, eventIndex: 0, visibleEvents: [], minute: 0, homeScore: 0, awayScore: 0, activePlayerId: null, activeTeam: "neutral", motion: null };
  const advance = () => {
    const event = state.result.events[state.playback.eventIndex];
    if (!event) {
      if (state.playbackTimer) window.clearInterval(state.playbackTimer);
      state.playbackTimer = null;
      state.playback = { ...state.playback, isPlaying: false, activePlayerId: null, activeTeam: "neutral", minute: 90, motion: null };
      render();
      return;
    }
    state.playback = {
      ...state.playback,
      eventIndex: state.playback.eventIndex + 1,
      visibleEvents: [...state.playback.visibleEvents, event],
      minute: event.minute,
      homeScore: event.scoreHome,
      awayScore: event.scoreAway,
      activePlayerId: event.playerId,
      activeTeam: event.team,
      motion: buildEventMotion(event)
    };
    render();
  };
  advance();
  state.playbackTimer = window.setInterval(advance, 1350);
}

function schedulePlayback() {
  if (state.playbackTimer) window.clearInterval(state.playbackTimer);
  state.playbackTimer = window.setInterval(advancePlayback, 1350);
}

function startPlayback() {
  if (!state.result) return;
  clearPlayback();
  state.analysisRevealed = false;
  state.resultViewOpen = false;
  state.playback = { isPlaying: true, paused: false, breakKind: null, eventIndex: 0, visibleEvents: [], minute: 0, homeScore: 0, awayScore: 0, activePlayerId: null, activeTeam: "neutral", motion: null, pendingSubOut: null, pendingSubIn: null, substitutions: [], adjustmentEvents: [], needsReplan: false };
  advancePlayback();
  if (state.playback?.isPlaying) schedulePlayback();
}

function advancePlayback() {
  const live = state.playback;
  if (!live || !live.isPlaying || live.paused || !state.result) return;
  const event = state.result.events[live.eventIndex];
  if (!event) {
    if (state.playbackTimer) window.clearInterval(state.playbackTimer);
    state.playbackTimer = null;
    state.playback = { ...live, isPlaying: false, activePlayerId: null, activeTeam: "neutral", minute: 90, motion: null };
    state.analysisRevealed = true;
    state.resultViewOpen = true;
    state.rightPanelTab = "report";
    render();
    return;
  }
  const next = {
    ...live,
    eventIndex: live.eventIndex + 1,
    visibleEvents: [...live.visibleEvents, event],
    minute: event.minute,
    homeScore: event.scoreHome,
    awayScore: event.scoreAway,
    activePlayerId: event.playerId,
    activeTeam: event.team,
    motion: buildEventMotion(event)
  };
  if (event.moment === "half") {
    if (state.playbackTimer) window.clearInterval(state.playbackTimer);
    state.playbackTimer = null;
    state.playback = { ...next, isPlaying: false, paused: true, breakKind: "half", activePlayerId: null, decisionReplay: createDecisionReplay(state.result) };
  } else {
    state.playback = next;
  }
  render();
}

function resumePlayback() {
  if (!state.playback?.paused) return;
  if (state.playback.needsReplan) replanRemainingMatch();
  state.playback = { ...state.playback, isPlaying: true, paused: false, breakKind: null, activePlayerId: null, motion: null, pendingSubOut: null, pendingSubIn: null };
  render();
  schedulePlayback();
}

function openSubstitutionBreak() {
  if (!state.playback?.isPlaying) return;
  if (state.playbackTimer) window.clearInterval(state.playbackTimer);
  state.playbackTimer = null;
  state.playback = { ...state.playback, isPlaying: false, paused: true, breakKind: "sub", activePlayerId: null, motion: null };
  render();
}

function liveStaminaSnapshot(result, minute) {
  const snapshot = result.staminaTimeline.find((item) => item.minute >= minute) || result.staminaTimeline[result.staminaTimeline.length - 1];
  if (!snapshot) return [];
  let players = [...snapshot.players];
  if (state.playback?.replanned && minute >= 45) return players;
  (state.playback?.substitutions || []).forEach((substitution) => {
    players = players.filter((item) => item.id !== substitution.outId && item.id !== substitution.inId);
    const incoming = player(substitution.inId);
    if (incoming) players.push({ id: incoming.id, name: incoming.name, slot: substitution.slot, stamina: substitution.stamina });
  });
  return players;
}

function applyLiveSubstitution() {
  const live = state.playback;
  if (!live?.paused || !live.pendingSubOut || !live.pendingSubIn || live.substitutions.length >= 5) return;
  const outgoing = player(live.pendingSubOut);
  const incoming = player(live.pendingSubIn);
  const slot = slotForPlayer(outgoing?.id);
  const used = usedSubstitutionIds(live);
  if (!outgoing || !incoming || !slot || incoming.teamId !== homeTeam().id || used.has(incoming.id)) return;
  const stamina = clamp(Math.round(playerState(incoming, state.scenarioId).stamina - Math.max(0, live.minute - 45) * .05), 55, 99);
  const impact = substitutionImpactPreview(outgoing, incoming, live, state.result);
  const outgoingPosition = state.freePositions[outgoing.id] || slotCoordinate(state.formationId, slot);
  state.lineup[slot] = incoming.id;
  state.freePositions[incoming.id] = [...outgoingPosition];
  delete state.freePositions[outgoing.id];
  const substitution = { outId: outgoing.id, inId: incoming.id, slot, stamina, minute: live.minute, impact };
  const impactText = impact?.deltas.map(([label, value]) => `${label} ${value >= 0 ? "+" : ""}${value}`).join(" · ") || "역할 재배치";
  const subEvent = { minute: live.minute, type: "sub", moment: "sub", team: "home", attackingTeam: "home", playerId: incoming.id, supportId: outgoing.id, slot, scoreHome: live.homeScore, scoreAway: live.awayScore, impact, text: `${outgoing.name} OUT · ${incoming.name} IN. ${slot} 포지션 교체를 적용합니다. 예상 ${impactText}` };
  state.playback = { ...live, substitutions: [...live.substitutions, substitution], adjustmentEvents: [...(live.adjustmentEvents || []), subEvent], visibleEvents: [...live.visibleEvents, subEvent], pendingSubOut: null, pendingSubIn: null, needsReplan: true, motion: buildEventMotion(subEvent) };
  render();
}

function previewDirection(value, positiveIsGood = true) {
  const direction = positiveIsGood ? value : -value;
  return direction > 1 ? "↑" : direction < -1 ? "↓" : "→";
}

function renderDecisionReplay() {
  const live = state.playback;
  const replay = live?.decisionReplay;
  if (!live?.paused || live.breakKind !== "half" || !replay?.baseline) return "";
  const card = (option) => {
    const selected = replay.chosenId === option.id;
    const attackDirection = previewDirection(option.preview.attack - replay.baseline.attack);
    const defenseDirection = previewDirection(option.preview.defense - replay.baseline.defense);
    const riskDirection = previewDirection(option.preview.risk - replay.baseline.risk, false);
    return `<button class="decision-choice ${option.id} ${selected ? "selected" : ""}" data-decision-choice="${option.id}" aria-pressed="${selected}">
      <span class="decision-choice-top"><i>${option.shortLabel}</i><b>${option.label}</b>${selected ? "<em>선택됨</em>" : ""}</span>
      <strong>${option.goal}</strong>
      <small>${option.reason}</small>
      <span class="decision-signals"><i>기회 <b>${attackDirection}</b></i><i>수비 <b>${defenseDirection}</b></i><i>위험 <b>${riskDirection}</b></i></span>
    </button>`;
  };
  return `<section class="decision-replay"><div class="decision-replay-heading"><div><span>IF: COACH DECISION</span><b>45′, 당신이라면 어떻게 바꿀까요?</b></div><small>최종 점수·xG는 경기 종료 후 공개됩니다.</small></div><p>같은 전반 흐름에서 선택할 수 있는 후반 플랜입니다. 선택 후 교체와 전술 조정도 함께 적용할 수 있습니다.</p><div class="decision-choice-grid">${replay.options.map(card).join("")}</div></section>`;
}

function renderHalfTimeManagerBase(result) {
  const live = state.playback;
  if (!live?.paused) return "";
  const isHalfTime = live.breakKind === "half";
  const currentStates = liveStaminaSnapshot(result, live.minute);
  const staminaById = Object.fromEntries(currentStates.map((item) => [item.id, item.stamina]));
  const starters = sortSubstitutionPlayers(currentLineupPlayers(), true);
  const bench = sortSubstitutionPlayers(liveBenchPlayers());
  const substitutionsLeft = Math.max(0, 5 - live.substitutions.length);
  const substitutionLimitReached = substitutionsLeft === 0;
  const outgoing = player(live.pendingSubOut);
  const incoming = player(live.pendingSubIn);
  const impact = outgoing && incoming ? substitutionImpactPreview(outgoing, incoming, live, result) : null;
  const playerCard = (item, type) => {
    const isOut = type === "out";
    const selected = (isOut ? live.pendingSubOut : live.pendingSubIn) === item.id;
    const stamina = isOut ? (staminaById[item.id] || playerState(item, state.scenarioId).stamina) : playerState(item, state.scenarioId).stamina;
    const dataAttribute = isOut ? `data-live-out="${item.id}"` : `data-live-in="${item.id}"`;
    return `<button class="sub-card sub-${type} ${selected ? "selected" : ""}" ${dataAttribute} ${substitutionLimitReached ? "disabled" : ""}><span class="sub-card-top"><i>${isOut ? "OUT" : "IN"}</i><em>${substitutionPosition(item, isOut)}</em></span><b>${item.name}</b><small>${isOut ? "현재" : "투입"} 체력 ${stamina} · OVR ${item.overall}</small></button>`;
  };
  const comparison = outgoing && incoming
    ? `<div class="sub-matchup-preview ready"><span>BENCH IMPACT LENS · 교체 미리보기</span><div><b class="outgoing">${outgoing.name}<small>${substitutionPosition(outgoing, true)} · 체력 ${impact.currentStamina}</small></b><i>→</i><b class="incoming">${incoming.name}<small>${impact.slot} 적합도 ${impact.fit} · 체력 ${impact.incomingStamina}</small></b></div><div class="sub-impact-deltas">${impact.deltas.map(([label, value]) => `<span class="${value >= 0 ? "good" : "warning"}"><small>${label}</small><b>${value >= 0 ? "+" : ""}${value}</b></span>`).join("")}</div><p>다음 전술 구간의 역할 기여도를 기준으로 계산한 예상 변화입니다.</p></div>`
    : `<div class="sub-matchup-preview"><span>교체 미리보기</span><p>OUT 선수와 IN 선수를 한 명씩 선택하세요.</p></div>`;
  const instruction = substitutionLimitReached
    ? "교체 5회를 모두 사용했습니다. 현재 전술을 확인한 뒤 경기를 재개하세요."
    : isHalfTime
      ? "ST부터 GK까지 포지션 순으로 선수를 확인하고, OUT / IN을 각각 선택해 교체를 적용하세요."
      : "경기 흐름을 잠시 멈췄습니다. OUT / IN 선수를 선택하면 다음 전술 구간부터 결과가 재계산됩니다.";
  return `<section class="half-time-manager"><div class="half-time-heading"><div><span>${isHalfTime ? "HALF TIME MANAGER" : "LIVE SUBSTITUTION"}</span><b>${live.minute}′ ${isHalfTime ? "라커룸 지시" : "경기 중 교체"}</b></div><strong>${homeTeam().shortName} ${live.homeScore} : ${live.awayScore} ${awayTeam().shortName}</strong></div><p>${instruction}</p><div class="sub-limit-status ${substitutionLimitReached ? "complete" : ""}"><span>SUBSTITUTIONS</span><b>${live.substitutions.length}<i>/</i>5</b><small>남은 교체 ${substitutionsLeft}회 · 교체 아웃 선수는 재투입할 수 없습니다.</small></div><div class="substitution-grid"><div class="sub-column sub-out-column"><div class="sub-column-heading"><span>SUB OUT</span><b>교체 아웃 · ST → GK</b></div><div class="sub-list">${starters.map((item) => playerCard(item, "out")).join("")}</div></div><div class="sub-column sub-in-column"><div class="sub-column-heading"><span>SUB IN</span><b>교체 인 · ST → GK</b></div><div class="sub-list">${bench.map((item) => playerCard(item, "in")).join("")}</div></div></div>${comparison}<div class="half-time-actions"><button class="apply-live-sub" data-apply-live-sub ${live.pendingSubOut && live.pendingSubIn && !substitutionLimitReached ? "" : "disabled"}>${substitutionLimitReached ? "교체 종료" : "교체 적용"} <small>${live.substitutions.length}/5</small></button><button class="resume-match" data-resume-match>${isHalfTime ? "후반 시작" : "경기 재개"} <span>▶</span></button></div></section>`;
}

function renderHalfTimeManager(result) {
  return `${renderHalfTimeManagerBase(result)}${renderDecisionReplay()}`;
}

function renderStaminaStrip(result, minute, expanded = false) {
  const snapshot = result.staminaTimeline.find((item) => item.minute >= minute) || result.staminaTimeline[result.staminaTimeline.length - 1];
  if (!snapshot) return "";
  const players = liveStaminaSnapshot(result, minute).sort((a, b) => a.stamina - b.stamina);
  const visible = expanded ? players : players.slice(0, 4);
  return `<div class="energy-panel ${expanded ? "expanded" : ""}"><div class="energy-heading"><span>LIVE FITNESS</span><b>${snapshot.minute}′ 체력 리포트</b></div><div class="energy-list">${visible.map((item) => `<div class="energy-player ${item.stamina < 45 ? "critical" : item.stamina < 60 ? "warning" : ""}"><span>${item.name}<small>${item.slot}</small></span><i><em style="--energy:${item.stamina}%"></em></i><b>${item.stamina}</b></div>`).join("")}</div></div>`;
}

function renderTacticalPulse(result, minute) {
  const phases = result.phaseMetrics || [];
  const active = phases.find((item) => item.minute >= minute) || phases.at(-1);
  if (!active) return "";
  const currentFitness = liveStaminaSnapshot(result, minute);
  const fitness = Math.round(average(currentFitness.map((item) => item.stamina)) || 0);
  const initiative = Math.round(clamp(active.attack * .48 + active.possession * .32 + active.defense * .2 - active.risk * .12, 18, 98));
  const status = initiative >= 70 ? "주도" : initiative >= 54 ? "경합" : "경계";
  const tone = initiative >= 70 ? "good" : initiative >= 54 ? "neutral" : "warning";
  const bars = phases.map((item) => {
    const value = clamp(Math.round(item.attack * .48 + item.possession * .32 + item.defense * .2 - item.risk * .12), 15, 100);
    return `<i class="${item.minute === active.minute ? "active" : ""}" style="--pulse:${value}%"><small>${item.minute}′</small></i>`;
  }).join("");
  return `<section class="tactical-pulse ${tone}"><div class="pulse-heading"><span>TACTICAL PULSE</span><b>${active.minute}′ ${status} 구간</b><em>주도 ${initiative}</em></div><div class="pulse-bars">${bars}</div><div class="pulse-signals"><span>공 <b>${active.attack}</b></span><span>수 <b>${active.defense}</b></span><span>위험 <b>${active.risk}</b></span><span>평균 체력 <b>${fitness}</b></span></div></section>`;
}

function renderRoleImpactMap(result, expanded = false) {
  const impact = (result.roleImpact || []).slice(0, expanded ? 5 : 3);
  if (!impact.length) return "";
  return `<section class="role-impact-map ${expanded ? "expanded" : ""}"><div class="impact-map-heading"><div><span>ROLE IMPACT MAP</span><b>선수별 전술 기여</b></div><small>역할 · 적합도 · 체력 · 이벤트</small></div><div class="impact-player-list">${impact.map((item, index) => `<article class="impact-player rank-${index + 1}"><i>${String(index + 1).padStart(2, "0")}</i><div><b>${item.name}</b><small>${item.note} · 체력 ${item.stamina}</small></div><strong>${item.score}<em>${item.strongest}</em></strong></article>`).join("")}</div></section>`;
}

function renderMissionScore(result) {
  const mission = result.missionScore;
  if (!mission) return "";
  return `<section class="mission-score"><div class="mission-heading"><div><span>MISSION SCORE</span><b>${mission.objective}</b></div><strong>${mission.score}<small>/ 100</small></strong></div><div class="mission-rows">${mission.rows.map((item) => `<div><span>${item.label}</span><i><em style="--mission:${item.value}%"></em></i><b>${item.value}</b></div>`).join("")}</div><p><b>다음 과제</b> ${mission.next}</p></section>`;
}

function renderLiveMatch(result) {
  const live = state.playback;
  if (!live) {
    return `<section class="live-match idle"><div class="live-heading"><div><span>LIVE MATCH ENGINE</span><b>90분 경기 애니메이션</b></div><button class="live-play" id="play-match">▶ 경기 재생</button></div><p>역할별 장면, 상대 대응, 선수 체력 변화를 순서대로 확인하세요.</p></section>`;
  }
  const visible = live.visibleEvents.slice(-3).reverse();
  const status = live.paused ? "half-time" : live.isPlaying ? "playing" : "complete";
  const heading = live.paused ? (live.breakKind === "half" ? "HALF TIME" : "MATCH PAUSED") : live.isPlaying ? "LIVE PLAYBACK" : "FULL TIME";
  const control = live.paused ? `<span class="live-pause-tag">전술 조정 중</span>` : live.isPlaying ? `<div class="live-controls"><button class="live-substitute" data-open-sub-break>교체</button><button class="live-play" id="play-match">재시작</button></div>` : `<button class="live-play" id="play-match">다시 재생</button>`;
  return `<section class="live-match ${status}"><div class="live-heading"><div><span>${heading}</span><b>${String(live.minute).padStart(2, "0")}′ 경기 흐름</b></div>${control}</div><div class="live-score"><b>${homeTeam().shortName}</b><strong>${live.homeScore}<i>:</i>${live.awayScore}</strong><b>${awayTeam().shortName}</b></div><div class="match-progress"><i style="--progress:${(live.minute / 90) * 100}%"></i></div><div class="live-events">${visible.map((event) => `<p class="${event.type}"><time>${String(event.minute).padStart(2, "0")}′</time>${event.text}</p>`).join("") || "<p>킥오프. 양 팀의 전술 간격을 확인하는 중입니다.</p>"}</div>${renderTacticalPulse(result, Math.max(15, live.minute))}${renderStaminaStrip(result, Math.max(15, live.minute))}${renderHalfTimeManager(result)}</section>`;
}

function renderResultSectionBase(includeLive = true) {
  const result = state.result;
  if (!result) {
    return `<section class="results empty-results"><div class="result-placeholder-icon">◌</div><h2>전술 결과를 준비 중입니다</h2><p>선발, 전술, 상대 대응안을 구성한 뒤 시뮬레이션을 실행하면<br/>90분 경기 흐름과 역할·체력 영향을 확인할 수 있습니다.</p><div class="empty-hints"><span>선수 배치</span><i>→</i><span>상대 대응안</span><i>→</i><span>경기 재생</span></div></section>`;
  }
  if (!state.analysisRevealed) {
    return `<section class="results analysis-locked"><div class="analysis-locked-note"><span>RESULTS LOCKED</span><h2>경기 종료 후 전술 분석을 공개합니다</h2><p>하프타임의 전술 변경과 교체까지 반영한 최종 결과만 보여드립니다.</p></div>${includeLive ? renderLiveMatch(result) : ""}</section>`;
  }
  return `<section class="results">
    <div class="result-heading"><div><span class="eyebrow">MATCH ENGINE RESULT</span><h2>전술 결과 분석</h2></div><div class="result-actions"><button class="export-report" data-export-report>↓ 리포트</button><button class="save-plan" data-save-plan ${state.savedPlans.length >= 2 ? "disabled" : ""}>${state.savedPlans.length >= 2 ? "비교안 2/2" : "+ 현재 안 저장"}</button></div></div>
    <div class="scoreboard"><div><small>xG ${result.xgHome.toFixed(1)}</small><b>${homeTeam().shortName}</b></div><strong>${result.homeScore}<i>-</i>${result.awayScore}</strong><div><small>xG ${result.xgAway.toFixed(1)}</small><b>${awayTeam().shortName}</b></div></div>
    <div class="metrics">${metricCard("공격", result.attack, metricDeltaLabel(result.attack), "attack")}${metricCard("점유", result.possession, metricDeltaLabel(result.possession), "possession")}${metricCard("수비", result.defense, metricDeltaLabel(result.defense), "defense")}${metricCard("역습 위험", result.risk, result.risk > 64 ? "주의" : "관리 가능", "risk")}</div>
    ${includeLive ? renderLiveMatch(result) : ""}
    ${renderMatchStats(result)}
    ${renderDecisionLog(result)}
    <div class="result-grid"><div class="timeline"><h3>역할 기반 경기 이벤트</h3>${result.events.map((event) => `<div class="event ${event.type}"><time>${String(event.minute).padStart(2, "0")}′</time><span></span><p>${event.text}</p></div>`).join("")}</div><div class="insights"><h3>감독 리포트</h3>${result.insights.map((item) => `<p>${item}</p>`).join("")}<div class="effect-tags">${result.effects.map((effect) => `<span>${effect}</span>`).join("")}</div></div></div>
    <button class="open-results" id="open-results"><span>↗</span> 큰 카드에서 결과 분석하기</button>
    ${renderSavedPlans()}
  </section>`;
}

function renderResultSection(includeLive = true) {
  const content = renderResultSectionBase(includeLive);
  if (!state.result || !state.analysisRevealed) return content;
  return `${content}${renderDecisionImpact(state.result)}${renderTacticalExplanation(state.result)}${renderRoleImpactMap(state.result)}${renderMissionScore(state.result)}`;
}

function renderPlaybackTab() {
  if (!state.result) {
    return `<section class="live-match idle"><div class="live-heading"><div><span>LIVE MATCH ENGINE</span><b>경기 재생 대기</b></div></div><p>선발과 전술을 설정한 뒤 시뮬레이션을 시작하면 이 탭에서 실시간 경기 흐름을 확인할 수 있습니다.</p></section>`;
  }
  return renderLiveMatch(state.result);
}

function renderRightPanel() {
  const tabs = [
    ["match", "경기 재생", "LIVE"],
    ["opponent", "상대 분석", "SCOUT"],
    ["report", "결과 리포트", "REPORT"]
  ];
  const content = state.rightPanelTab === "match"
    ? renderPlaybackTab()
    : state.rightPanelTab === "opponent"
      ? `${renderOpponentPanel()}${renderOpponentResponsePanel()}`
      : renderResultSection(false);
  return `<aside class="right-tab-panel"><div class="right-tabs">${tabs.map(([id, label, note]) => `<button class="${state.rightPanelTab === id ? "active" : ""}" data-right-tab="${id}"><small>${note}</small><b>${label}</b></button>`).join("")}</div><div class="right-tab-content">${content}</div></aside>`;
}

function renderResultModalLegacy() {
  if (!state.resultViewOpen || !state.result) return "";
  const result = state.result;
  const tabs = [["overview", "전술 요약"], ["stats", "경기 지표"], ["events", "경기 흐름"], ["report", "감독 리포트"]];
  let content = "";
  if (state.resultTab === "overview") {
    content = `<div class="modal-overview"><div><div class="scoreboard large"><div><small>xG ${result.xgHome.toFixed(1)}</small><b>${homeTeam().name}</b></div><strong>${result.homeScore}<i>-</i>${result.awayScore}</strong><div><small>xG ${result.xgAway.toFixed(1)}</small><b>${awayTeam().name}</b></div></div><div class="metrics modal-metrics">${metricCard("공격", result.attack, metricDeltaLabel(result.attack), "attack")}${metricCard("점유", result.possession, metricDeltaLabel(result.possession), "possession")}${metricCard("수비", result.defense, metricDeltaLabel(result.defense), "defense")}${metricCard("역습 위험", result.risk, result.risk > 64 ? "주의" : "관리 가능", "risk")}</div></div><div class="modal-summary"><span>핵심 전술 판단</span><h3>${result.attack >= 75 ? "공격 전개는 강점입니다." : "공격 전개의 보강이 필요합니다."}</h3>${result.insights.map((item) => `<p>${item}</p>`).join("")}</div></div>`;
  } else if (state.resultTab === "stats") {
    content = `<div class="modal-single">${renderMatchStats(result, true)}<div class="stats-footnote"><span>지표 해석</span><p>경기 결과 지표는 현재 선발, 포지션 적합도, 컨디션, 체력, 전술 지시를 함께 반영한 가상 시뮬레이션 값입니다.</p></div></div>`;
  } else if (state.resultTab === "events") {
    content = `<div class="modal-events"><div class="timeline"><h3>90분 예상 경기 흐름</h3>${result.events.map((event) => `<div class="event ${event.type}"><time>${String(event.minute).padStart(2, "0")}′</time><span></span><p>${event.text}</p></div>`).join("")}</div><div class="event-callout"><span>전술 영향</span>${result.effects.map((effect) => `<p>${effect}</p>`).join("")}</div></div>`;
  } else {
    content = `<div class="modal-report"><div><span>감독 리포트</span><h3>선발과 전술의 결과</h3>${result.insights.map((item) => `<p>${item}</p>`).join("")}</div><div class="report-actions"><span>다음 선택 제안</span><p>${result.lowStamina.length ? `${result.lowStamina[0].name}의 체력이 낮습니다. 벤치 교체 후 결과를 다시 비교하세요.` : "현재 선발의 체력은 안정적입니다. 전술 템포나 압박 강도를 바꿔 비교해 보세요."}</p><button data-close-results>전술 보드로 돌아가기</button></div></div>`;
  }
  return `<div class="result-modal-backdrop" data-modal-backdrop><section class="result-modal" role="dialog" aria-modal="true" aria-label="전술 결과 상세 분석"><div class="modal-top"><div><span class="eyebrow">FULL TIME ANALYSIS</span><h2>${homeTeam().name} vs ${awayTeam().name}</h2></div><div class="modal-top-actions"><button class="export-report" data-export-report>↓ 리포트</button><button class="save-plan" data-save-plan ${state.savedPlans.length >= 2 ? "disabled" : ""}>${state.savedPlans.length >= 2 ? "비교안 2/2" : "+ 비교안 저장"}</button><button class="modal-close" data-close-results aria-label="결과 분석 닫기">×</button></div></div><div class="modal-tabs">${tabs.map(([id, label]) => `<button class="${state.resultTab === id ? "active" : ""}" data-result-tab="${id}">${label}</button>`).join("")}</div><div class="modal-content">${content}</div></section></div>`;
}

function renderResultModal() {
  if (!state.resultViewOpen || !state.result || !state.analysisRevealed) return "";
  const result = state.result;
  const tabs = [["overview", "전술 요약"], ["stats", "경기 지표"], ["events", "경기 흐름"], ["energy", "피트니스"], ["report", "감독 리포트"]];
  let content = "";
  if (state.resultTab === "overview") {
    content = `<div class="modal-overview"><div><div class="scoreboard large"><div><small>xG ${result.xgHome.toFixed(1)}</small><b>${homeTeam().name}</b></div><strong>${result.homeScore}<i>-</i>${result.awayScore}</strong><div><small>xG ${result.xgAway.toFixed(1)}</small><b>${awayTeam().name}</b></div></div><div class="metrics modal-metrics">${metricCard("공격", result.attack, metricDeltaLabel(result.attack), "attack")}${metricCard("점유", result.possession, metricDeltaLabel(result.possession), "possession")}${metricCard("수비", result.defense, metricDeltaLabel(result.defense), "defense")}${metricCard("역습 위험", result.risk, result.risk > 64 ? "주의" : "관리 가능", "risk")}</div></div><div class="modal-summary"><span>핵심 매치업</span><h3>${result.opponentProfile.label}</h3><p>${result.opponentProfile.counter}</p>${result.insights.slice(0, 2).map((item) => `<p>${item}</p>`).join("")}</div></div>`;
  } else if (state.resultTab === "stats") {
    content = `<div class="modal-single">${renderMatchStats(result, true)}<div class="stats-footnote"><span>지표 해석</span><p>슈팅·점유·수비 지표는 15분 단위로 다시 계산한 전술, 역할 적합도, 컨디션, 체력 상태를 합산한 결과입니다.</p></div></div>`;
  } else if (state.resultTab === "events") {
    content = `<div class="modal-events"><div class="timeline"><h3>90분 역할 기반 경기 흐름</h3>${result.events.map((event) => `<div class="event ${event.type}"><time>${String(event.minute).padStart(2, "0")}′</time><span></span><p>${event.text}</p></div>`).join("")}</div><div class="event-callout"><span>상대 전술 대응</span><p>${result.opponentProfile.counter}</p><span>전술 효과</span>${result.effects.map((effect) => `<p>${effect}</p>`).join("")}</div></div>`;
  } else if (state.resultTab === "energy") {
    content = `<div class="modal-single">${renderStaminaStrip(result, 90, true)}<div class="phase-grid">${result.phaseMetrics.map((item) => `<div><span>${item.minute}′</span><b>공 ${item.attack}</b><b>점 ${item.possession}</b><b>수 ${item.defense}</b><i style="--phase-risk:${item.risk}%"></i></div>`).join("")}</div><div class="stats-footnote"><span>체력 변화 로직</span><p>압박, 템포, 수비 라인, 포지션과 역할별 활동량을 반영해 15분마다 체력을 차감합니다. 체력 60 미만부터 능력치 효율이 떨어지며, 40 미만이면 전술 수행 효율이 크게 감소합니다.</p></div></div>`;
  } else {
    content = `<div class="modal-report"><div><span>감독 리포트</span><h3>선발과 전술의 최종 평가</h3>${result.insights.map((item) => `<p>${item}</p>`).join("")}</div><div class="report-actions"><span>다음 선택 제안</span><p>${result.lowStamina.length ? `${result.lowStamina[0].name}의 후반 체력이 낮습니다. 대응 추천안을 적용하거나 벤치 교체 후 비교하세요.` : "현재 선발의 체력 분포가 안정적입니다. 압박 강도와 빌드업 방식을 바꿔 다른 경기 흐름을 비교하세요."}</p><button data-export-report>리포트 다운로드</button><button data-close-results>전술 보드로 돌아가기</button></div></div>${renderDecisionLog(result, true)}`;
  }
  return `<div class="result-modal-backdrop" data-modal-backdrop><section class="result-modal" role="dialog" aria-modal="true" aria-label="전술 결과 상세 분석"><div class="modal-top"><div><span class="eyebrow">FULL TIME ANALYSIS</span><h2>${homeTeam().name} vs ${awayTeam().name}</h2></div><div class="modal-top-actions"><button class="export-report" data-export-report>↓ 리포트</button><button class="save-plan" data-save-plan ${state.savedPlans.length >= 2 ? "disabled" : ""}>${state.savedPlans.length >= 2 ? "비교안 2/2" : "+ 비교안 저장"}</button><button class="modal-close" data-close-results aria-label="결과 분석 닫기">×</button></div></div><div class="modal-tabs">${tabs.map(([id, label]) => `<button class="${state.resultTab === id ? "active" : ""}" data-result-tab="${id}">${label}</button>`).join("")}</div><div class="modal-content">${content}</div></section></div>`;
}

function renderSavedPlans() {
  if (!state.savedPlans.length) return "";
  const [planA, planB] = state.savedPlans;
  const compare = planB ? `<div class="plan-comparison"><div><span>PLAN A / B</span><b>${planA.name} 대비 ${planB.name}</b></div><div class="comparison-score"><span>${planA.result.homeScore}-${planA.result.awayScore}</span><i>→</i><b>${planB.result.homeScore}-${planB.result.awayScore}</b></div><div class="comparison-metrics">${[["공격", "attack"], ["점유", "possession"], ["수비", "defense"], ["위험", "risk"]].map(([label, key]) => { const delta = planB.result[key] - planA.result[key]; return `<span><small>${label}</small><b>${planA.result[key]} <i>${delta >= 0 ? "+" : ""}${delta}</i> ${planB.result[key]}</b></span>`; }).join("")}</div></div>` : `<div class="plan-comparison hint"><span>PLAN A 저장됨</span><p>한 가지 안을 더 저장하면 점수와 전술 지표 차이를 바로 비교할 수 있습니다.</p></div>`;
  return `<div class="saved-plans"><div><span>PLAN COMPARE</span><h3>저장한 전술안</h3></div><div class="plan-list">${state.savedPlans.map((plan, index) => `<button class="plan-card" data-load-plan="${index}"><b>${plan.name}</b><small>${plan.formation} · ${plan.summary}</small><span><i>결과 ${plan.result.homeScore}-${plan.result.awayScore}</i><i>공 ${plan.result.attack}</i><i>수 ${plan.result.defense}</i></span></button>`).join("")}</div>${compare}</div>`;
}

function render() {
  applyDarkTheme();
  if (!state.data) {
    app.innerHTML = `<main class="loading"><div class="loading-mark">T</div><p>전술 보드를 준비하고 있습니다.</p></main>`;
    return;
  }
  if (!state.playback?.isPlaying) persistWorkspaceDraft();
  app.innerHTML = `${renderHeader()}<main class="app-main">${renderScenarioChooser()}${renderMatchStrip()}<div class="workspace"><div class="left-column">${renderFormationControls()}${renderSquadPanel()}</div><div class="center-column">${renderPitch()}${renderTacticsPanel()}${renderCoachPanel()}</div><div class="right-column tabbed-right-column">${renderRightPanel()}</div></div></main>${renderResultModal()}${renderMethodologyModal()}`;
  bindInteractions();
}

function bindInteractions() {
  document.querySelectorAll("[data-scenario]").forEach((element) => element.addEventListener("click", () => { resetForScenario(element.dataset.scenario); render(); }));
  document.querySelector("[data-match-home]")?.addEventListener("change", (event) => { setCustomMatchup(event.target.value, state.customAwayTeamId || currentScenario().awayTeamId); render(); });
  document.querySelector("[data-match-away]")?.addEventListener("change", (event) => { setCustomMatchup(state.customHomeTeamId || currentScenario().homeTeamId, event.target.value); render(); });
  document.querySelector("[data-swap-matchup]")?.addEventListener("click", () => { const scenario = currentScenario(); setCustomMatchup(scenario.awayTeamId, scenario.homeTeamId); render(); });
  document.querySelector("[data-reset-matchup]")?.addEventListener("click", () => { resetForScenario("custom-match"); render(); document.querySelector("#match-board")?.scrollIntoView({ behavior: "smooth", block: "start" }); });
  document.querySelector("#formation-select")?.addEventListener("change", (event) => {
    const previousFormationId = state.formationId;
    const current = currentLineupPlayers();
    state.formationId = event.target.value;
    state.lineup = buildLineup(homeTeam(), current);
    syncFreePositions(true);
    if (state.playback?.paused) {
      state.coachAdvice = null;
      recordLiveFormationChange(previousFormationId);
      render();
      return;
    }
    state.result = null;
    state.coachAdvice = null;
    clearPlayback();
    render();
  });
  document.querySelectorAll("[data-tactic]").forEach((element) => element.addEventListener("change", () => { const before = { ...state.tactics }; state.tactics[element.dataset.tactic] = element.value; state.coachAdvice = null; if (state.playback?.paused) { recordLiveTacticChange(before, state.tactics); render(); return; } state.result = null; clearPlayback(); render(); }));
  document.querySelector("#simulate-button")?.addEventListener("click", () => { runSimulation(); document.querySelector(".results")?.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
  document.querySelector("[data-share-config]")?.addEventListener("click", copyShareLink);
  document.querySelector("[data-open-methodology]")?.addEventListener("click", () => { state.methodologyOpen = true; render(); });
  document.querySelectorAll("[data-close-methodology]").forEach((element) => element.addEventListener("click", () => { state.methodologyOpen = false; render(); }));
  document.querySelector("[data-methodology-backdrop]")?.addEventListener("click", (event) => { if (event.target === event.currentTarget) { state.methodologyOpen = false; render(); } });
  document.querySelector("[data-open-dataset-import]")?.addEventListener("click", () => document.querySelector("#dataset-import")?.click());
  document.querySelector("#dataset-import")?.addEventListener("change", (event) => importDatasetFile(event.target.files?.[0]));
  document.querySelectorAll("[data-apply-coach]").forEach((element) => element.addEventListener("click", applyCoachAdvice));
  document.querySelectorAll("[data-tab]").forEach((element) => element.addEventListener("click", () => { state.activeTab = element.dataset.tab; state.selectedPlayerId = null; render(); }));
  document.querySelector("[data-squad-filter]")?.addEventListener("change", (event) => { state.squadFilter = event.target.value; state.selectedPlayerId = null; render(); });
  document.querySelectorAll("[data-squad-density]").forEach((element) => element.addEventListener("click", () => { state.squadDensity = element.dataset.squadDensity; render(); }));
  document.querySelectorAll("[data-right-tab]").forEach((element) => element.addEventListener("click", () => { state.rightPanelTab = element.dataset.rightTab; render(); }));
  document.querySelectorAll("[data-decision-choice]").forEach((element) => element.addEventListener("click", () => applyDecisionChoice(element.dataset.decisionChoice)));
  document.querySelectorAll("[data-live-out]").forEach((element) => element.addEventListener("click", () => { if (!state.playback?.paused) return; state.playback = { ...state.playback, pendingSubOut: element.dataset.liveOut }; render(); }));
  document.querySelectorAll("[data-live-in]").forEach((element) => element.addEventListener("click", () => { if (!state.playback?.paused) return; state.playback = { ...state.playback, pendingSubIn: element.dataset.liveIn }; render(); }));
  document.querySelector("[data-apply-live-sub]")?.addEventListener("click", applyLiveSubstitution);
  document.querySelector("[data-resume-match]")?.addEventListener("click", resumePlayback);
  document.querySelector("[data-open-sub-break]")?.addEventListener("click", openSubstitutionBreak);
  document.querySelector("#play-match")?.addEventListener("click", startPlayback);
  document.querySelector("#open-results")?.addEventListener("click", () => { state.resultViewOpen = true; state.resultTab = "overview"; render(); });
  document.querySelectorAll("[data-export-report]").forEach((element) => element.addEventListener("click", downloadReport));
  document.querySelectorAll("[data-result-tab]").forEach((element) => element.addEventListener("click", () => { state.resultTab = element.dataset.resultTab; render(); }));
  document.querySelectorAll("[data-close-results]").forEach((element) => element.addEventListener("click", () => { state.resultViewOpen = false; render(); }));
  document.querySelector("[data-modal-backdrop]")?.addEventListener("click", (event) => { if (event.target === event.currentTarget) { state.resultViewOpen = false; render(); } });
  document.querySelectorAll("[data-clear-player]").forEach((element) => element.addEventListener("click", () => { state.selectedPlayerId = null; render(); }));
  document.querySelectorAll("[data-save-plan]").forEach((element) => element.addEventListener("click", saveCurrentPlan));
  document.querySelectorAll("[data-load-plan]").forEach((element) => element.addEventListener("click", () => {
    const plan = state.savedPlans[Number(element.dataset.loadPlan)];
    if (!plan) return;
    state.lineup = { ...plan.lineup }; state.freePositions = structuredClone(plan.freePositions || {}); syncFreePositions(false); state.tactics = { ...plan.tactics }; state.result = plan.result; state.analysisRevealed = true; state.rightPanelTab = "report"; render();
  }));
  document.querySelectorAll("[data-player]").forEach((element) => {
    element.addEventListener("dragstart", (event) => { state.dragPlayerId = element.dataset.player; event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("text/plain", state.dragPlayerId); document.querySelector(".pitch")?.classList.add("show-position-zones"); });
    element.addEventListener("dragend", () => { state.dragPlayerId = null; document.querySelector(".pitch")?.classList.remove("drag-over", "show-position-zones"); });
    element.addEventListener("click", (event) => {
      event.stopPropagation();
      state.selectedPlayerId = element.dataset.player;
      render();
    });
  });
  const pitchElement = document.querySelector(".pitch.free-layout");
  const pitchPosition = (event) => {
    const rect = pitchElement.getBoundingClientRect();
    return [
      clamp(((event.clientX - rect.left) / rect.width) * 100, 7, 93),
      clamp(((event.clientY - rect.top) / rect.height) * 100, 8, 92)
    ];
  };
  pitchElement?.addEventListener("dragover", (event) => { event.preventDefault(); pitchElement.classList.add("drag-over", "show-position-zones"); });
  pitchElement?.addEventListener("dragleave", (event) => { if (!pitchElement.contains(event.relatedTarget)) pitchElement.classList.remove("drag-over", "show-position-zones"); });
  pitchElement?.addEventListener("drop", (event) => {
    event.preventDefault();
    pitchElement.classList.remove("drag-over", "show-position-zones");
    const playerId = state.dragPlayerId || event.dataTransfer.getData("text/plain");
    state.dragPlayerId = null;
    if (!playerId) return;
    const [x, y] = pitchPosition(event);
    const zone = positionZoneAt(x, y);
    if (zone) placePlayerInPositionZone(playerId, zone);
    else placePlayerFreely(playerId, x, y);
  });
  pitchElement?.addEventListener("click", (event) => {
    if (!state.selectedPlayerId || event.target.closest("[data-player]")) return;
    const [x, y] = pitchPosition(event);
    const zone = positionZoneAt(x, y);
    if (zone) placePlayerInPositionZone(state.selectedPlayerId, zone);
    else placePlayerFreely(state.selectedPlayerId, x, y);
  });
}

async function init() {
  try {
    applyDarkTheme();
    const response = await fetch("data/world-cup-2026.json");
    if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");
    state.data = await response.json();
    if (!validateDataset(state.data)) throw new Error("데이터 스키마가 요구 조건과 일치하지 않습니다.");
    if (!restoreSharedWorkspace() && !restoreWorkspaceDraft()) resetForScenario(state.data.matchScenarios[0].id);
    render();
  } catch (error) {
    app.innerHTML = `<main class="loading"><div class="loading-mark error">!</div><h1>데이터를 불러오지 못했습니다.</h1><p>${error.message}</p><code>npm run dev</code> 명령으로 로컬 서버를 실행해 주세요.</main>`;
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (state.methodologyOpen) {
    state.methodologyOpen = false;
    render();
    return;
  }
  if (state.resultViewOpen) {
    state.resultViewOpen = false;
    render();
  }
});

init();
