// Painel de gráficos da professora: participação, médias e progresso por sala
const ProfessorGraficosView = {
  charts: [],
  cores: {
    serie1: "#3987e5", serie2: "#d95926", serie3: "#199e70", neutro: "#5c5b56",
    texto: "#ffffff", texto2: "#c3c2b7", grade: "rgba(255,255,255,0.08)",
    bom: "#0ca30c", alerta: "#fab219", critico: "#d03b3b"
  },

  async carregarChart() {
    if (window.Chart) return;
    await new Promise((ok, erro) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js";
      s.onload = ok; s.onerror = erro;
      document.head.appendChild(s);
    });
  },

  esc(v) {
    return String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  },

  nomeSim(id) {
    const c = window.SimuladosData?.getAllConfigs().find((x) => x.id === id);
    if (c) return c.titulo || id;
    const m = id.match(/^(\d)serie_dia(\d)$/);
    return m ? `Simulado ENEM · ${m[1]}ª Série · ${m[2]}º Dia (antigo)` : id;
  },

  serieDoSim(id) {
    const m = id.match(/^(\d)serie/) || id.match(/^saresp_2026_(\d)em/);
    return m ? m[1] : null;
  },

  // Simulado "anterior" da mesma série: Dia 2 compara com Dia 1, Matemática com Português
  anteriorDe(id) {
    if (/dia2$/.test(id)) return id.replace(/dia2$/, "dia1");
    if (/_mat$/.test(id)) return id.replace(/_mat$/, "_lp");
    return null;
  },

  async render() {
    const root = document.getElementById("app-root");
    root.innerHTML = `
      <main class="min-h-screen bg-dark-950 text-slate-100 p-4 md:p-8">
        <div class="max-w-6xl mx-auto space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <a href="#professor" class="text-xs text-slate-400 hover:text-white">← Voltar ao painel</a>
              <h1 class="text-2xl font-black text-white mt-1">Gráficos dos simulados</h1>
              <p class="text-xs text-slate-400">Participação e desempenho das salas, com base nos alunos ativos cadastrados.</p>
            </div>
            <select id="graf-sim" class="bg-dark-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white max-w-full"></select>
          </div>
          <div id="graf-conteudo" class="text-slate-400 text-sm">Carregando dados...</div>
        </div>
      </main>`;
    try {
      await this.carregarChart();
      const [fin, and, salas] = await Promise.all([DB.getResultadosSimulados(), DB.getSimuladosEmAndamento(), DB.lerTurmas()]);
      this.dados = { fin, and, salas };
    } catch (e) {
      document.getElementById("graf-conteudo").innerHTML = `<p class="text-rose-400">Não foi possível carregar os dados: ${this.esc(e.message || e)}</p>`;
      return;
    }
    // Simulados com entregas primeiro
    const cont = {};
    this.dados.fin.forEach((p) => { cont[p.simuladoId] = (cont[p.simuladoId] || 0) + 1; });
    const ocultos = window.SimuladosData?.OCULTOS || [];
    const ids = Object.keys(cont).filter((i) => !ocultos.includes(i)).sort((a, b) => cont[b] - cont[a]);
    const sel = document.getElementById("graf-sim");
    if (!ids.length) { document.getElementById("graf-conteudo").innerHTML = "Ainda não há simulados entregues."; return; }
    sel.innerHTML = ids.map((id) => `<option value="${id}">${this.esc(this.nomeSim(id))} — ${cont[id]} entregas</option>`).join("");
    sel.onchange = () => this.desenhar(sel.value);
    this.desenhar(ids[0]);
  },

  // Monta os números de um simulado por sala
  calcular(simId) {
    const { fin, and, salas } = this.dados;
    const serie = this.serieDoSim(simId);
    const nomes = Object.keys(salas).sort().filter((n) => !serie || n.startsWith(serie));
    const fezPorEmail = {};
    fin.filter((p) => p.simuladoId === simId).forEach((p) => { fezPorEmail[DB.emailPadrao(p.studentEmail)] = p.result?.score ?? null; });
    const fazendo = new Set(and.filter((p) => p.simuladoId === simId).map((p) => DB.emailPadrao(p.studentEmail)));
    const porSala = nomes.map((sala) => {
      const al = salas[sala];
      const notas = al.map((a) => fezPorEmail[DB.emailPadrao(a.email)]).filter((n) => n !== undefined);
      const vals = notas.filter((n) => n != null).map(Number);
      return {
        sala, ativos: al.length, fizeram: notas.length,
        fazendo: al.filter((a) => fazendo.has(DB.emailPadrao(a.email)) && fezPorEmail[DB.emailPadrao(a.email)] === undefined).length,
        media: vals.length ? Math.round(vals.reduce((x, y) => x + y, 0) / vals.length) : null,
        notas: vals
      };
    });
    return porSala;
  },

  // Percentual de acerto por questão e por habilidade (descritor)
  calcularHabilidades(simId, sala) {
    const questoes = window.SimuladosData?.getQuestoesPorSimulado(simId) || [];
    let emails = null;
    if (sala) emails = new Set((this.dados.salas[sala] || []).map((a) => DB.emailPadrao(a.email)));
    const provas = this.dados.fin.filter((p) => p.simuladoId === simId && (!emails || emails.has(DB.emailPadrao(p.studentEmail))))
      .map((p) => p.answers || p.result?.answers || {}).filter((a) => Object.keys(a).length);
    const porQ = questoes.map((q) => {
      const resp = provas.map((a) => a[q.id]).filter((v) => v != null && v !== "");
      const certa = String(q.respostaCorreta).toUpperCase();
      const cont = {}; resp.forEach((v) => { const k = String(v).toUpperCase(); cont[k] = (cont[k] || 0) + 1; });
      const erro = Object.entries(cont).filter(([k]) => k !== certa).sort((x, y) => y[1] - x[1])[0];
      return {
        n: q.numero, comp: q.componente || "", desc: q.descritor || q.assunto || "Sem descritor", assunto: q.assunto || "",
        certa, total: resp.length, pct: resp.length ? Math.round(((cont[certa] || 0) / resp.length) * 100) : null,
        erro: erro ? `${erro[0]} (${Math.round((erro[1] / resp.length) * 100)}%)` : "-"
      };
    }).filter((x) => x.pct != null);
    const grupos = {};
    porQ.forEach((q) => { const k = q.comp + "|" + q.desc; (grupos[k] = grupos[k] || { comp: q.comp, desc: q.desc, qs: [] }).qs.push(q); });
    const porHab = Object.values(grupos).map((g) => ({ ...g, pct: Math.round(g.qs.reduce((x, q) => x + q.pct, 0) / g.qs.length) }))
      .sort((a, b) => a.pct - b.pct);
    return { porQ: [...porQ].sort((a, b) => a.pct - b.pct), porHab, alunos: provas.length };
  },

  desenharHabilidades(simId, sala) {
    const r = this.calcularHabilidades(simId, sala);
    this._hab = { ...r, simId, sala };
    const el = document.getElementById("hab-conteudo");
    if (!r.alunos) { el.innerHTML = `<p class="text-slate-400">Nenhuma prova entregue ${sala ? "nesta sala" : ""} ainda.</p>`; return; }
    const cor = (p) => p < 40 ? "#e5484d" : p < 70 ? "#d9a21b" : "#2e9e6b";
    const barra = (p) => `<div class="flex items-center gap-2"><div class="h-2 rounded bg-slate-800 w-24"><div class="h-2 rounded" style="width:${p}%;background:${cor(p)}"></div></div><b style="color:${cor(p)}">${p}%</b></div>`;
    el.innerHTML = `
      <p class="text-slate-400 mb-2">${r.alunos} prova(s) analisada(s) · <span style="color:#e5484d">abaixo de 40% = prioridade</span> · <span style="color:#d9a21b">40 a 69%</span> · <span style="color:#2e9e6b">70% ou mais</span></p>
      <div class="overflow-x-auto"><table class="w-full text-left">
        <thead class="text-slate-400"><tr><th class="py-1 pr-2">Habilidade / descritor</th><th class="pr-2">Componente</th><th class="pr-2">Questões</th><th>Acerto</th></tr></thead>
        <tbody>${r.porHab.map((h) => `<tr class="border-t border-slate-800"><td class="py-1 pr-2 text-slate-200">${this.esc(h.desc)}</td><td class="pr-2">${this.esc(h.comp)}</td><td class="pr-2">${h.qs.map((q) => "Q" + q.n).join(", ")}</td><td>${barra(h.pct)}</td></tr>`).join("")}</tbody>
      </table></div>
      <details class="mt-3"><summary class="cursor-pointer font-bold text-white">Ver questão por questão</summary>
      <div class="overflow-x-auto"><table class="w-full text-left mt-2">
        <thead class="text-slate-400"><tr><th class="py-1 pr-2">Questão</th><th class="pr-2">Componente</th><th class="pr-2">Assunto</th><th class="pr-2">Gabarito</th><th class="pr-2">Erro mais marcado</th><th>Acerto</th></tr></thead>
        <tbody>${r.porQ.map((q) => `<tr class="border-t border-slate-800"><td class="py-1 pr-2 font-bold text-white">Q${q.n}</td><td class="pr-2">${this.esc(q.comp)}</td><td class="pr-2">${this.esc(q.assunto)}</td><td class="pr-2">${q.certa}</td><td class="pr-2">${q.erro}</td><td>${barra(q.pct)}</td></tr>`).join("")}</tbody>
      </table></div></details>`;
  },

  baixarHabilidades() {
    const h = this._hab; if (!h || !h.alunos) return;
    const c = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const linhas = [["Questão", "Componente", "Habilidade/descritor", "Assunto", "Gabarito", "Erro mais marcado", "Respostas", "% acerto"].map(c).join(";")]
      .concat([...h.porQ].sort((a, b) => a.n - b.n).map((q) => [q.n, q.comp, q.desc, q.assunto, q.certa, q.erro, q.total, q.pct].map(c).join(";")));
    const blob = new Blob(["\uFEFF" + linhas.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `acertos-${h.simId}${h.sala ? "-" + h.sala : ""}.csv`;
    a.click();
  },

  desenhar(simId) {
    this.charts.forEach((c) => c.destroy()); this.charts = [];
    const atual = this.calcular(simId);
    const antId = this.anteriorDe(simId);
    const anterior = antId && this.dados.fin.some((p) => p.simuladoId === antId) ? this.calcular(antId) : null;
    const ativos = atual.reduce((x, s) => x + s.ativos, 0);
    const fizeram = atual.reduce((x, s) => x + s.fizeram, 0);
    const todas = atual.flatMap((s) => s.notas);
    const mediaGeral = todas.length ? Math.round(todas.reduce((x, y) => x + y, 0) / todas.length) : null;
    const part = ativos ? Math.round((fizeram / ativos) * 100) : 0;
    const tile = (rot, val, sub) => `<div class="rounded-2xl bg-slate-900/60 border border-slate-800 p-4">
      <div class="text-[11px] uppercase tracking-wide text-slate-400 font-bold">${rot}</div>
      <div class="text-3xl font-black text-white mt-1">${val}</div><div class="text-[11px] text-slate-400 mt-1">${sub}</div></div>`;
    const card = (id, titulo, sub) => `<div class="rounded-2xl bg-slate-900/60 border border-slate-800 p-4">
      <h3 class="text-sm font-black text-white">${titulo}</h3><p class="text-[11px] text-slate-400 mb-3">${sub}</p>
      <div class="relative h-64"><canvas id="${id}" aria-label="${this.esc(titulo)}"></canvas></div></div>`;

    document.getElementById("graf-conteudo").innerHTML = `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        ${tile("Alunos ativos", ativos, `${atual.length} sala(s) desta série`)}
        ${tile("Fizeram", fizeram, `${ativos - fizeram} ainda não fizeram`)}
        ${tile("Participação", part + "%", "dos alunos ativos")}
        ${tile("Média de acertos", mediaGeral != null ? mediaGeral + "%" : "-", "de quem entregou")}
      </div>
      <div class="grid lg:grid-cols-2 gap-4 mt-4">
        ${card("g-part", "Participação por sala", "Quantos alunos ativos fizeram e quantos ainda não fizeram")}
        ${card("g-media", "Média de acertos por sala", "Percentual médio de acertos de quem entregou")}
        ${card("g-prog", "Progresso em relação ao simulado anterior", anterior ? `Média de cada sala: ${this.esc(this.nomeSim(antId))} × atual` : "Sem simulado anterior com entregas para comparar")}
        ${card("g-dist", "Distribuição das notas", "Quantos alunos em cada faixa de acertos")}
      </div>
      <details class="mt-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-4 text-xs">
        <summary class="cursor-pointer font-bold text-white">Ver os números em tabela</summary>
        <table class="w-full mt-3 text-left"><thead class="text-slate-400"><tr><th class="py-1">Sala</th><th>Ativos</th><th>Fizeram</th><th>Fazendo</th><th>Não fizeram</th><th>Participação</th><th>Média</th>${anterior ? "<th>Média anterior</th>" : ""}</tr></thead>
        <tbody>${atual.map((s, i) => `<tr class="border-t border-slate-800"><td class="py-1 font-bold text-white">${this.esc(s.sala)}</td><td>${s.ativos}</td><td>${s.fizeram}</td><td>${s.fazendo}</td><td>${s.ativos - s.fizeram}</td><td>${s.ativos ? Math.round(s.fizeram / s.ativos * 100) : 0}%</td><td>${s.media ?? "-"}${s.media != null ? "%" : ""}</td>${anterior ? `<td>${anterior[i]?.media ?? "-"}${anterior[i]?.media != null ? "%" : ""}</td>` : ""}</tr>`).join("")}</tbody></table>
      </details>
      <section class="mt-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-4 text-xs">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div><h3 class="text-sm font-black text-white">Acertos por habilidade e por questão</h3>
          <p class="text-[11px] text-slate-400">Do mais difícil para o mais fácil. Use para planejar a recuperação.</p></div>
          <div class="flex gap-2 items-center">
            <select id="hab-sala" class="bg-dark-950 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-white">
              <option value="">Série inteira</option>${atual.map((s) => `<option>${this.esc(s.sala)}</option>`).join("")}
            </select>
            <button id="hab-csv" class="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-[11px] text-slate-200 font-bold">Baixar planilha</button>
          </div>
        </div>
        <div id="hab-conteudo" class="mt-3"></div>
      </section>`;
    const selSala = document.getElementById("hab-sala");
    selSala.onchange = () => this.desenharHabilidades(simId, selSala.value);
    document.getElementById("hab-csv").onclick = () => this.baixarHabilidades();
    this.desenharHabilidades(simId, "");

    const C = this.cores;
    Chart.defaults.color = C.texto2;
    Chart.defaults.font.family = "Outfit, Arial, sans-serif";
    const eixos = (pct) => ({
      x: { grid: { display: false }, border: { color: C.grade } },
      y: { beginAtZero: true, max: pct ? 100 : undefined, grid: { color: C.grade }, border: { display: false }, ticks: { callback: (v) => pct ? v + "%" : v } }
    });
    const barra = { borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: "bottom", maxBarThickness: 36, borderColor: "#1a1a19", borderWidth: { top: 0, left: 1, right: 1, bottom: 0 } };
    const rotulos = atual.map((s) => s.sala);

    this.charts.push(new Chart(document.getElementById("g-part"), {
      type: "bar",
      data: { labels: rotulos, datasets: [
        { label: "Fizeram", data: atual.map((s) => s.fizeram), backgroundColor: C.serie1, ...barra, stack: "a" },
        { label: "Não fizeram", data: atual.map((s) => s.ativos - s.fizeram), backgroundColor: C.neutro, ...barra, stack: "a" }
      ] },
      options: { maintainAspectRatio: false, interaction: { mode: "index", intersect: false }, scales: { ...eixos(false), x: { ...eixos(false).x, stacked: true }, y: { ...eixos(false).y, stacked: true } },
        plugins: { legend: { position: "top", align: "start", labels: { boxWidth: 10, boxHeight: 10 } },
          tooltip: { callbacks: { footer: (it) => { const s = atual[it[0].dataIndex]; return `Participação: ${s.ativos ? Math.round(s.fizeram / s.ativos * 100) : 0}% de ${s.ativos}`; } } } } }
    }));

    this.charts.push(new Chart(document.getElementById("g-media"), {
      type: "bar",
      data: { labels: rotulos, datasets: [{ label: "Média de acertos", data: atual.map((s) => s.media), backgroundColor: C.serie1, ...barra }] },
      options: { maintainAspectRatio: false, scales: eixos(true), plugins: { legend: { display: false },
        tooltip: { callbacks: { label: (it) => `Média: ${it.raw ?? "-"}% (${atual[it.dataIndex].fizeram} entregas)` } } } }
    }));

    if (anterior) {
      this.charts.push(new Chart(document.getElementById("g-prog"), {
        type: "bar",
        data: { labels: rotulos, datasets: [
          { label: "Anterior", data: anterior.map((s) => s.media), backgroundColor: C.neutro, ...barra },
          { label: "Atual", data: atual.map((s) => s.media), backgroundColor: C.serie1, ...barra }
        ] },
        options: { maintainAspectRatio: false, scales: eixos(true), interaction: { mode: "index", intersect: false },
          plugins: { legend: { position: "top", align: "start", labels: { boxWidth: 10, boxHeight: 10 } },
            tooltip: { callbacks: { label: (it) => `${it.dataset.label}: ${it.raw ?? "-"}%`, footer: (it) => {
              const a = anterior[it[0].dataIndex].media, b = atual[it[0].dataIndex].media;
              return a != null && b != null ? `Variação: ${b - a >= 0 ? "+" : ""}${b - a} pontos` : ""; } } } } }
      }));
    } else {
      document.getElementById("g-prog").parentElement.innerHTML = `<p class="text-slate-500 text-xs pt-20 text-center">Quando a série tiver dois simulados com entregas (Dia 1 e Dia 2), a comparação aparece aqui.</p>`;
    }

    const faixas = ["0–19%", "20–39%", "40–59%", "60–79%", "80–100%"];
    const contFaixa = [0, 0, 0, 0, 0];
    todas.forEach((n) => { contFaixa[Math.min(4, Math.floor(n / 20))]++; });
    this.charts.push(new Chart(document.getElementById("g-dist"), {
      type: "bar",
      data: { labels: faixas, datasets: [{ label: "Alunos", data: contFaixa, backgroundColor: C.serie1, ...barra }] },
      options: { maintainAspectRatio: false, scales: eixos(false), plugins: { legend: { display: false },
        tooltip: { callbacks: { label: (it) => `${it.raw} aluno(s)` } } } }
    }));
  }
};

window.ProfessorGraficosView = ProfessorGraficosView;
