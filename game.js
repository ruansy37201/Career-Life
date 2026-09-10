// ===== 剧情数据 =====
// 每条剧情藏了一个"知识点"，在结局时根据玩家倾向做复盘
const scenarios = [
    {
        story: "你拿到两个 offer：\nA. 一家德资自动化厂招设备维护，月薪 5.5K，早九晚五、双休、基本不加班；\nB. 一家机器人集成商招 PLC 调试助理，月薪 7K，但每天平均 9 点半下班、大小周、每月出差驻场 1 周。你认真算了笔账，你选择了——",
        choices: [
            { text: "🏭 德资厂：月薪÷实际工时，时薪其实更高", money: 20, happy: -10, career: 15, tag: "money" },
            { text: "💪 集成商：月薪多 1.5K，年轻就应该多干活，争取早日退休", money: 5, happy: 15, career: 5, tag: "life" }
        ],
        lesson: "时薪 = 收入 ÷ 实际工作时间。高薪不等于高时薪，你的时间有隐性成本。"
    },
    {
        story: "工作半年，父母反复劝你考公务员，说'稳定最重要'。你已经适应了企业节奏，但父母的焦虑也让你动摇。",
        choices: [
            { text: "📚 辞职备考，给父母一个交代", money: -15, happy: -5, career: 10, tag: "safe" },
            { text: "💼 留下来，用成绩证明自己的选择", money: 10, happy: 5, career: 10, tag: "bet" }
        ],
        lesson: "沉没成本：已经投入的时间不该影响未来的决策。但家庭关系也是真实的成本。"
    },
    {
        story: "大学室友拉你合伙创业，说'我上一个项目赚了百万'。你查了一下，他确实赚了，但你们班其他创业的同学你没看到几个成功的。",
        choices: [
            { text: "🚀 加入，他有能力我也有资源", money: -10, happy: -5, career: 20, tag: "bet" },
            { text: "🛡️ 婉拒，我看到的是幸存者偏差", money: 5, happy: 5, career: 0, tag: "safe" }
        ],
        lesson: "幸存者偏差：你只看到了成功的人，没看到沉默的大多数。决策要基于全样本。"
    },
    {
        story: "公司宣布全员降薪 15%。领导说'熬过去就好了'。你算了一下，如果现在走，要损失年终奖 3 万；如果留，每月少拿 2000。",
        choices: [
            { text: "📤 立刻走，止损比沉没成本重要", money: -5, happy: -5, career: 10, tag: "money" },
            { text: "🙏 留下，3万年终奖不能白丢", money: -15, happy: -5, career: 0, tag: "safe" }
        ],
        lesson: "沉没成本陷阱：年终奖是已经承诺的，但继续留下的代价是未来每月的2000。决策看边际，不看过去。"
    },
    {
        story: "工作两年攒了 8 万。一个同事说有个项目，投 5 万，预期年回报 50%。你问他风险呢？他说'放心，我研究了很久'。",
        choices: [
            { text: "💰 投 5 万，高回报值得冒险", money: -20, happy: 0, career: 5, tag: "bet" },
            { text: "🏦 最多投 1 万，分散风险", money: 0, happy: 5, career: 0, tag: "safe" }
        ],
        lesson: "不要把鸡蛋放在一个篮子里。预期收益越高，越要问：这个收益从哪来？谁在亏钱？"
    },
    {
        story: "你被提拔为小组长，带 5 个人。但你发现自己更享受写代码，管理让你头疼，而且团队里有个刺头你搞不定。",
        choices: [
            { text: "👔 接受，管理是必经之路", money: 15, happy: -10, career: 15, tag: "career" },
            { text: "💻 拒绝，做技术专家也很好", money: 0, happy: 15, career: 5, tag: "life" }
        ],
        lesson: "彼得原理：在组织里，人会一直晋升直到自己不能胜任的位置。管理不是唯一的上升通道。"
    },
    {
        story: "一线城市大厂挖你，薪资翻倍到 16K。但扣掉房租 8K、通勤、吃饭，你算了一下实际可支配收入。老家同岗位 10K，但家里有房无贷。",
        choices: [
            { text: "✈️ 去一线，名义收入翻倍", money: 20, happy: -10, career: 20, tag: "money" },
            { text: "🏠 回老家，实际购买力更高", money: 5, happy: 15, career: 0, tag: "life" }
        ],
        lesson: "名义收入 vs 实际购买力。一线城市的高薪可能被房租和物价吃掉大半。决策要看实际可支配收入。"
    },
    {
        story: "工作第四年，你开始频繁失眠，对上班有抵触。医生说是轻度抑郁倾向，建议休息。存款够撑 4 个月。",
        choices: [
            { text: "🎒 辞职休息 2 个月，身体第一", money: -15, happy: 20, career: -10, tag: "life" },
            { text: "💊 边上班边调理，不能断收入", money: 5, happy: -15, career: 10, tag: "money" }
        ],
        lesson: "精力管理比时间管理更重要。Burnout 不是矫情，是身体在强制止损。"
    },
    {
        story: "HR 找你谈，说公司愿意资助你继续深造，学费报销 70%，但要签 3 年服务期。你专科已经够用了吗？",
        choices: [
            { text: "🎓 读，学历是长期信号", money: -10, happy: -5, career: 20, tag: "career" },
            { text: "⏩ 不读，能力比文凭更有说服力", money: 5, happy: 5, career: 5, tag: "bet" }
        ],
        lesson: "信号理论：学历在信息不对称的市场中是能力的信号。但工作几年后，履历本身也是信号。"
    },
    {
        story: "你 34 岁了。公司新来了 95 后总监，你向他汇报。你感到危机，但房贷还有 15 年。朋友建议你现在就开始准备副业。",
        choices: [
            { text: "🦅 马上启动副业，多条腿走路", money: -10, happy: -5, career: 10, tag: "bet" },
            { text: "🐢 先把主业做到极致，副业以后再说", money: 10, happy: 0, career: 10, tag: "career" }
        ],
        lesson: "T型能力模型：一专多能比样样通样样松更有抗风险能力。但精力有限，先深后广。"
    }
];

// ===== 结局系统 =====
// 按优先级从上到下匹配，最后一条 balanced 作为兜底（match 恒为 true）
const endingArchetypes = [
    {
        id: "winner",
        title: "🏆 长期主义者",
        desc: "你一直在做难而正确的事。短期看不出差别，但 10 年后你会感谢现在的自己。",
        match: (s) => s.career >= 65 && s.money >= 55
    },
    {
        id: "burned",
        title: "🔥 燃烧殆尽",
        desc: "你把所有精力都换成了钱，但幸福值归零。记住：钱是手段，不是目的。你可以用命换钱，但钱买不回命。",
        match: (s) => s.money >= 65 && s.happy <= 30
    },
    {
        id: "comfort",
        title: "😌 舒适区居民",
        desc: "你选择了低风险的路，日子过得舒服。但 35 岁以后，舒适区可能会变成危险区——通胀和年龄不等人。",
        match: (s) => s.happy >= 65 && s.career <= 40
    },
    {
        id: "lost",
        title: "🌫️ 还在迷路",
        desc: "你的三项属性都不高。这不代表你失败了——可能只是说明你还没找到真正想做的事。迷茫本身不是问题，停在迷茫里不作为才是。",
        match: (s) => s.money < 40 && s.happy < 40 && s.career < 40
    },
    {
        id: "balanced",
        title: "⚖️ 平衡大师",
        desc: "你没有极端偏科，三项属性都还过得去。这不是平庸，这是最难达到的状态——大多数人顾此失彼。",
        match: (s) => true  // 兜底，任何情况都命中
    }
];

// ===== 游戏状态 =====
let state = {
    round: 0,
    money: 50,
    happy: 50,
    career: 50,
    choiceHistory: []
};

// ===== DOM =====
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const storyText = document.getElementById('story-text');
const choicesEl = document.getElementById('choices');
const progressFill = document.getElementById('progress-fill');
const roundText = document.getElementById('round-text');
const moneyVal = document.getElementById('money-val');
const happyVal = document.getElementById('happy-val');
const careerVal = document.getElementById('career-val');

// ===== 工具 =====
function clamp(v) { return Math.max(0, Math.min(100, v)); }

function showScreen(s) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    s.classList.add('active');
}

function updateStats() {
    moneyVal.textContent = state.money;
    happyVal.textContent = state.happy;
    careerVal.textContent = state.career;
}

// ===== 游戏流程 =====
function startGame() {
    state = { round: 0, money: 50, happy: 50, career: 50, choiceHistory: [] };
    showScreen(gameScreen);
    renderRound();
}

function renderRound() {
    const s = scenarios[state.round];
    roundText.textContent = `第 ${state.round + 1} / ${scenarios.length} 轮`;
    progressFill.style.width = `${((state.round + 1) / scenarios.length) * 100}%`;
    storyText.textContent = s.story;

    const buttons = choicesEl.querySelectorAll('.btn-choice');
    s.choices.forEach((c, i) => {
        buttons[i].textContent = c.text;
        buttons[i].onclick = () => makeChoice(c, s.lesson);
    });
    updateStats();
}

function makeChoice(choice, lesson) {
    state.money = clamp(state.money + choice.money);
    state.happy = clamp(state.happy + choice.happy);
    state.career = clamp(state.career + choice.career);
    state.choiceHistory.push({ choice: choice.text, lesson, tag: choice.tag });
    state.round++;

    if (state.round >= scenarios.length) {
        showResult();
    } else {
        renderRound();
    }
}

function showResult() {
    // 按顺序匹配第一条命中的结局，最后 balanced 兜底，确保一定命中
    let ending = endingArchetypes[0];
    for (const e of endingArchetypes) {
        if (e.match(state)) {
            ending = e;
            break;
        }
    }

    // 计算玩家决策倾向
    const tagCounts = {};
    state.choiceHistory.forEach(h => {
        tagCounts[h.tag] = (tagCounts[h.tag] || 0) + 1;
    });
    const dominantTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

    const tagMap = {
        money: "💰 金钱导向",
        life: "😊 生活导向",
        career: "📈 事业导向",
        safe: "🛡️ 风险厌恶",
        bet: "🎲 风险偏好"
    };

    // 挑选与该倾向最相关的知识点
    const lessonsToShow = state.choiceHistory
        .filter(h => h.tag === dominantTag)
        .slice(0, 2)
        .map(h => h.lesson);

    document.getElementById('result-title').textContent = ending.title;
    document.getElementById('final-money').textContent = state.money;
    document.getElementById('final-happy').textContent = state.happy;
    document.getElementById('final-career').textContent = state.career;

    let html = `<p style="margin-bottom:12px;">${ending.desc}</p>`;
    html += `<p style="margin-bottom:8px;color:#888;font-size:14px;">你的决策倾向：<strong>${tagMap[dominantTag] || '均衡型'}</strong></p>`;
    if (lessonsToShow.length > 0) {
        html += `<div style="background:#f8f6ff;border-radius:10px;padding:14px;margin-top:12px;text-align:left;">`;
        html += `<p style="font-size:13px;color:#666;margin-bottom:8px;">💡 这一路你学到的：</p>`;
        lessonsToShow.forEach(l => {
            html += `<p style="font-size:13px;color:#555;line-height:1.6;margin-bottom:6px;">· ${l}</p>`;
        });
        html += `</div>`;
    }

    document.getElementById('result-desc').innerHTML = html;
    showScreen(resultScreen);
}

// ===== 绑定 =====
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);