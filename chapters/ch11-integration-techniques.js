window.CHAPTERS.push({
  id: 'ch11',
  number: 11,
  title: 'Integration Techniques',
  subtitle: 'Mastering the art of integration: substitution, parts, trig substitution, and partial fractions',
  sections: [

    // ─── SECTION 1 ────────────────────────────────────────────────────────────
    {
      id: 'ch11-sec01',
      title: '1. u-Substitution',
      content: `
<div class="env-block intuition">
<strong>From the FTC to Technique.</strong> The Fundamental Theorem of Calculus (Chapter 10) reduces every definite integral to a single task: find an antiderivative. But most functions that arise in practice do not have antiderivatives we can write down by inspection. This chapter develops three powerful techniques, substitution, integration by parts, and partial fractions, that vastly expand the class of integrals we can evaluate. Each technique reverses a familiar differentiation rule, turning the problem of integration into a structured, systematic process.
</div>

<h2>u-Substitution — Reversing the Chain Rule</h2>

<div class="env-block intuition">
<strong>Section Roadmap.</strong> We begin with the most frequently used integration technique. The chain rule tells us how to differentiate a composition \\(F(g(x))\\). Reading that rule backwards gives us <em>u-substitution</em>, a method for simplifying integrals whose integrands contain a function and its derivative nested together. We will cover the mechanics for both indefinite and definite integrals, then build intuition for recognizing when substitution applies.
</div>

<p>
The chain rule tells us \\(\\frac{d}{dx}[F(g(x))] = F'(g(x))\\,g'(x)\\). Reading this in reverse gives us the most fundamental integration technique: <strong>u-substitution</strong>.
</p>

<div class="definition">
  <strong>u-Substitution Rule:</strong> If \\(u = g(x)\\) is a differentiable function whose range is an interval \\(I\\), and \\(f\\) is continuous on \\(I\\), then
  \\[
    \\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du
  \\]
  where \\(u = g(x)\\) and \\(du = g'(x)\\,dx\\).
</div>

<h3>How to Apply u-Substitution</h3>
<ol>
  <li><strong>Identify</strong> an "inner function" \\(u = g(x)\\) inside the integrand.</li>
  <li><strong>Compute</strong> \\(du = g'(x)\\,dx\\).</li>
  <li><strong>Rewrite</strong> the entire integral in terms of \\(u\\) and \\(du\\).</li>
  <li><strong>Integrate</strong> the simpler expression in \\(u\\).</li>
  <li><strong>Substitute back</strong> to express the answer in terms of \\(x\\).</li>
</ol>

<div class="example">
  <strong>Example 1:</strong> Evaluate \\(\\displaystyle\\int 2x\\cos(x^2)\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Let \\(u = x^2\\), so \\(du = 2x\\,dx\\). The integral becomes:
  \\[
    \\int \\cos(u)\\,du = \\sin(u) + C = \\sin(x^2) + C
  \\]
</div>

<div class="example">
  <strong>Example 2:</strong> Evaluate \\(\\displaystyle\\int \\frac{e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Let \\(u = \\sqrt{x} = x^{1/2}\\), so \\(du = \\frac{1}{2\\sqrt{x}}\\,dx\\), which gives \\(\\frac{dx}{\\sqrt{x}} = 2\\,du\\). Thus:
  \\[
    \\int \\frac{e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx = 2\\int e^u\\,du = 2e^u + C = 2e^{\\sqrt{x}} + C
  \\]
</div>

<h3>u-Substitution for Definite Integrals</h3>

<div class="definition">
  <strong>Definite Integral Version:</strong> When using u-substitution on a definite integral, change the limits of integration:
  \\[
    \\int_a^b f(g(x))\\,g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du
  \\]
</div>

<div class="example">
  <strong>Example 3:</strong> Evaluate \\(\\displaystyle\\int_0^2 x\\,e^{x^2}\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Let \\(u = x^2\\), \\(du = 2x\\,dx\\). When \\(x=0\\), \\(u=0\\); when \\(x=2\\), \\(u=4\\).
  \\[
    \\int_0^2 x\\,e^{x^2}\\,dx = \\frac{1}{2}\\int_0^4 e^u\\,du = \\frac{1}{2}\\big[e^u\\big]_0^4 = \\frac{e^4 - 1}{2}
  \\]
</div>

<div class="intuition">
  <strong>Key Intuition:</strong> Think of u-substitution as "zooming into" the inner function. The complicated integral in \\(x\\)-space becomes a simpler integral in \\(u\\)-space. The factor \\(g'(x)\\,dx\\) in the original integral is exactly the "change of variables" factor \\(du\\) that makes the transformation work.
</div>

<div class="warning">
  <strong>Common Mistake:</strong> Forgetting to change the limits when applying u-substitution to a definite integral. If you keep the original limits \\(a\\) and \\(b\\), you must substitute back to \\(x\\) before evaluating. If you change limits to \\(g(a)\\) and \\(g(b)\\), evaluate directly in \\(u\\).
</div>
`,
      visualizations: [
        {
          id: 'viz-u-sub-animator',
          title: 'u-Substitution Step-by-Step Animator',
          setup(container) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 50, originX: 280, originY: 320 });
            const ctx = viz.ctx;

            let step = 0;
            const maxSteps = 4;
            const stepLabels = [
              'Original: Integral of 2x*cos(x^2) dx',
              'Let u = x^2,  du = 2x dx',
              'Rewrite: Integral of cos(u) du',
              'Integrate: sin(u) + C = sin(x^2) + C'
            ];

            const controls = document.createElement('div');
            controls.style.cssText = 'display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap;';
            const prevBtn = document.createElement('button');
            prevBtn.textContent = 'Prev';
            prevBtn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;cursor:pointer;font-size:0.78rem;';
            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'Next';
            nextBtn.style.cssText = prevBtn.style.cssText;
            const stepInfo = document.createElement('span');
            stepInfo.style.cssText = 'color:#8b949e;font-size:0.85rem;margin-left:8px;';
            controls.appendChild(prevBtn);
            controls.appendChild(nextBtn);
            controls.appendChild(stepInfo);
            container.appendChild(controls);

            function draw() {
              viz.clear();
              stepInfo.textContent = 'Step ' + (step + 1) + '/' + (maxSteps) + ': ' + stepLabels[step];

              // Draw x-domain on left
              const leftCX = 140, rightCX = 420;
              const baseY = 80;

              // x-space label
              ctx.fillStyle = viz.colors.blue;
              ctx.font = 'bold 16px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('x-space', leftCX, 30);

              // u-space label
              ctx.fillStyle = viz.colors.teal;
              ctx.fillText('u-space', rightCX, 30);

              // Draw function f(g(x)) * g'(x) in x-space
              ctx.save();
              ctx.translate(leftCX - 110, baseY);
              // mini coordinate system
              ctx.strokeStyle = viz.colors.axis;
              ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(0, 140); ctx.lineTo(220, 140); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(20, 0); ctx.lineTo(20, 150); ctx.stroke();

              // Draw 2x*cos(x^2)
              ctx.strokeStyle = viz.colors.blue;
              ctx.lineWidth = 2;
              ctx.beginPath();
              let started = false;
              for (let px = 0; px <= 200; px++) {
                const x = px / 60;
                const y = 2 * x * Math.cos(x * x);
                const sy = 140 - y * 35;
                if (sy < -10 || sy > 160) { started = false; continue; }
                if (!started) { ctx.moveTo(20 + px, sy); started = true; }
                else ctx.lineTo(20 + px, sy);
              }
              ctx.stroke();

              // Shade area 0 to 1.5
              if (step >= 0) {
                ctx.fillStyle = viz.colors.blue + '33';
                ctx.beginPath();
                ctx.moveTo(20, 140);
                for (let px = 0; px <= 90; px++) {
                  const x = px / 60;
                  const y = 2 * x * Math.cos(x * x);
                  ctx.lineTo(20 + px, 140 - y * 35);
                }
                ctx.lineTo(110, 140);
                ctx.closePath();
                ctx.fill();
              }

              ctx.fillStyle = viz.colors.text;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('2x cos(x^2)', 120, 170);
              ctx.restore();

              // Draw cos(u) in u-space
              ctx.save();
              ctx.translate(rightCX - 110, baseY);
              ctx.strokeStyle = viz.colors.axis;
              ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(0, 140); ctx.lineTo(220, 140); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(20, 0); ctx.lineTo(20, 150); ctx.stroke();

              if (step >= 2) {
                ctx.strokeStyle = viz.colors.teal;
                ctx.lineWidth = 2;
                ctx.beginPath();
                for (let px = 0; px <= 200; px++) {
                  const u = px / 60;
                  const y = Math.cos(u);
                  const sy = 140 - y * 35;
                  if (px === 0) ctx.moveTo(20 + px, sy);
                  else ctx.lineTo(20 + px, sy);
                }
                ctx.stroke();

                ctx.fillStyle = viz.colors.teal + '33';
                ctx.beginPath();
                ctx.moveTo(20, 140);
                for (let px = 0; px <= 135; px++) {
                  const u = px / 60;
                  const y = Math.cos(u);
                  ctx.lineTo(20 + px, 140 - y * 35);
                }
                ctx.lineTo(155, 140);
                ctx.closePath();
                ctx.fill();
              }

              ctx.fillStyle = viz.colors.text;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('cos(u)', 120, 170);
              ctx.restore();

              // Arrow between spaces
              if (step >= 1) {
                const arrowY = baseY + 70;
                ctx.strokeStyle = viz.colors.orange;
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 3]);
                ctx.beginPath();
                ctx.moveTo(leftCX + 100, arrowY);
                ctx.lineTo(rightCX - 100, arrowY);
                ctx.stroke();
                ctx.setLineDash([]);
                // arrowhead
                ctx.fillStyle = viz.colors.orange;
                ctx.beginPath();
                ctx.moveTo(rightCX - 100, arrowY);
                ctx.lineTo(rightCX - 112, arrowY - 5);
                ctx.lineTo(rightCX - 112, arrowY + 5);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = viz.colors.orange;
                ctx.font = '12px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('u = x^2', (leftCX + rightCX) / 2, arrowY - 12);
                ctx.fillText('du = 2x dx', (leftCX + rightCX) / 2, arrowY + 18);
              }

              // Result at bottom
              if (step >= 3) {
                ctx.fillStyle = viz.colors.green;
                ctx.font = 'bold 14px -apple-system,sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Result: sin(x^2) + C', viz.width / 2, 330);
              }

              // Step highlight box
              ctx.strokeStyle = viz.colors.purple;
              ctx.lineWidth = 1;
              ctx.setLineDash([3, 3]);
              if (step === 0) {
                ctx.strokeRect(leftCX - 120, baseY - 10, 240, 200);
              } else if (step === 1) {
                ctx.strokeRect(leftCX + 60, baseY + 45, rightCX - leftCX - 20, 55);
              } else if (step === 2) {
                ctx.strokeRect(rightCX - 120, baseY - 10, 240, 200);
              } else if (step === 3) {
                ctx.strokeRect(viz.width / 2 - 120, 310, 240, 30);
              }
              ctx.setLineDash([]);
            }

            prevBtn.addEventListener('click', () => { if (step > 0) { step--; draw(); } });
            nextBtn.addEventListener('click', () => { if (step < maxSteps - 1) { step++; draw(); } });

            draw();
            return viz;
          }
        },
        {
          id: 'viz-u-sub-transform',
          title: 'u-Substitution Variable Transformation',
          setup(container) {
            const viz = new VizEngine(container, { width: 560, height: 380, scale: 40, originX: 50, originY: 300 });

            let uFunc = 0; // 0: x^2, 1: sin(x), 2: e^x
            const uFuncs = [
              { label: 'u = x^2', g: x => x * x, gp: x => 2 * x, name: 'x^2' },
              { label: 'u = sin(x)', g: x => Math.sin(x), gp: x => Math.cos(x), name: 'sin(x)' },
              { label: 'u = e^x', g: x => Math.exp(x), gp: x => Math.exp(x), name: 'e^x' }
            ];

            const controls = document.createElement('div');
            controls.style.cssText = 'display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;align-items:center;';

            uFuncs.forEach((uf, i) => {
              const btn = document.createElement('button');
              btn.textContent = uf.label;
              btn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;cursor:pointer;font-size:0.78rem;';
              btn.addEventListener('click', () => { uFunc = i; draw(); });
              controls.appendChild(btn);
            });
            container.appendChild(controls);

            const tSlider = VizEngine.createSlider(container, 'x = ', 0, 3, 1, 0.05, () => draw());

            function draw() {
              viz.clear();
              const ctx = viz.ctx;
              const uf = uFuncs[uFunc];
              const x0 = parseFloat(tSlider.value);

              // Left panel: x-space
              ctx.fillStyle = viz.colors.blue;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('x-space', 160, 20);

              // Draw u = g(x) curve
              ctx.save();
              ctx.translate(50, 40);
              // Axes
              ctx.strokeStyle = viz.colors.axis;
              ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(0, 220); ctx.lineTo(240, 220); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 230); ctx.stroke();

              ctx.fillStyle = viz.colors.text;
              ctx.font = '10px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              for (let i = 0; i <= 3; i++) {
                ctx.fillText(i.toString(), i * 70, 235);
              }

              // Draw g(x) curve
              ctx.strokeStyle = viz.colors.blue;
              ctx.lineWidth = 2;
              ctx.beginPath();
              for (let px = 0; px <= 210; px++) {
                const x = px / 70;
                const y = uf.g(x);
                const sy = 220 - y * 22;
                if (sy < -20 || sy > 240) { if (px > 0) ctx.moveTo(px, sy); continue; }
                if (px === 0) ctx.moveTo(px, sy);
                else ctx.lineTo(px, sy);
              }
              ctx.stroke();

              // Highlight point
              const uVal = uf.g(x0);
              const px0 = x0 * 70;
              const py0 = 220 - uVal * 22;
              if (py0 > -10 && py0 < 240) {
                ctx.setLineDash([3, 3]);
                ctx.strokeStyle = viz.colors.orange;
                ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(px0, 220); ctx.lineTo(px0, py0); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(0, py0); ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = viz.colors.orange;
                ctx.beginPath(); ctx.arc(px0, py0, 5, 0, Math.PI * 2); ctx.fill();
              }

              ctx.fillStyle = viz.colors.blue;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('u = ' + uf.name, 120, 260);
              ctx.restore();

              // Right panel: mapping info
              ctx.fillStyle = viz.colors.teal;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('Transformation', 430, 20);

              // Info box
              const boxX = 310, boxY = 50;
              ctx.strokeStyle = viz.colors.grid;
              ctx.lineWidth = 1;
              ctx.strokeRect(boxX, boxY, 230, 200);

              ctx.fillStyle = viz.colors.white;
              ctx.font = '13px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('u = ' + uf.name, boxX + 15, boxY + 30);
              ctx.fillText('x = ' + x0.toFixed(2), boxX + 15, boxY + 60);
              ctx.fillText('u(x) = ' + uVal.toFixed(4), boxX + 15, boxY + 90);

              const duVal = uf.gp(x0);
              ctx.fillText("u'(x) = " + duVal.toFixed(4), boxX + 15, boxY + 120);
              ctx.fillText('du = ' + duVal.toFixed(4) + ' dx', boxX + 15, boxY + 150);

              // Stretch/compress indicator
              ctx.fillStyle = duVal > 1 ? viz.colors.orange : duVal < 1 ? viz.colors.purple : viz.colors.green;
              const stretchLabel = duVal > 1 ? 'Stretching (du > dx)' : duVal < 1 ? 'Compressing (du < dx)' : 'No change (du = dx)';
              ctx.fillText(stretchLabel, boxX + 15, boxY + 180);
            }

            draw();
            return viz;
          }
        }
      ],
      exercises: [
        {
          id: 'ch11-ex01',
          type: 'mc',
          question: 'Evaluate the integral: the integral of 3x^2 * cos(x^3) dx. Which substitution is most appropriate?',
          options: ['u = x^3, du = 3x^2 dx', 'u = cos(x^3), du = -sin(x^3) dx', 'u = 3x^2, du = 6x dx', 'u = x^2, du = 2x dx'],
          correct: 0,
          explanation: 'With u = x^3, we get du = 3x^2 dx. The integral becomes the integral of cos(u) du = sin(u) + C = sin(x^3) + C.'
        },
        {
          id: 'ch11-ex02',
          type: 'mc',
          question: 'Evaluate the definite integral from 0 to 1 of x * e^(x^2) dx.',
          options: ['(e - 1)/2', 'e - 1', '(e^2 - 1)/2', 'e/2'],
          correct: 0,
          explanation: 'Let u = x^2, du = 2x dx. When x=0, u=0; when x=1, u=1. The integral becomes (1/2) * integral from 0 to 1 of e^u du = (1/2)(e^1 - e^0) = (e-1)/2.'
        },
        {
          id: 'ch11-ex03',
          type: 'mc',
          question: 'Which integral CANNOT be solved directly by a simple u-substitution?',
          options: ['The integral of x * e^(x^2) dx', 'The integral of cos(x) * sin(x) dx', 'The integral of e^x * cos(e^x) dx', 'The integral of x^2 * e^x dx'],
          correct: 3,
          explanation: 'The integral of x^2 * e^x dx requires integration by parts, not u-substitution, because there is no function-derivative pair. The other three all have a clear inner function whose derivative appears as a factor.'
        }
      ]
    },

    // ─── SECTION 2 ────────────────────────────────────────────────────────────
    {
      id: 'ch11-sec02',
      title: '2. Integration by Parts',
      content: `
<div class="env-block intuition">
<strong>From Compositions to Products.</strong> Substitution handles integrands built from compositions (a function inside another function). But what about integrands that are <em>products</em> of two unrelated functions, like \\(x\\,e^x\\) or \\(x^2\\sin x\\)? No substitution will simplify these, because neither factor is the derivative of the other. We need a new tool, one that reverses the <em>product rule</em> instead of the chain rule. That tool is integration by parts.
</div>

<h2>Integration by Parts — The Product Rule in Reverse</h2>

<p>
Just as u-substitution reverses the chain rule, <strong>integration by parts</strong> reverses the product rule. From \\(\\frac{d}{dx}[u\\,v] = u\\,v' + u'\\,v\\), we obtain:
</p>

<div class="definition">
  <strong>Integration by Parts Formula:</strong>
  \\[
    \\int u\\,dv = u\\,v - \\int v\\,du
  \\]
  The idea is to choose \\(u\\) and \\(dv\\) so that the integral \\(\\int v\\,du\\) is simpler than the original.
</div>

<h3>The LIATE Rule</h3>
<p>
A helpful mnemonic for choosing \\(u\\): pick the function that comes first in the <strong>LIATE</strong> order:
</p>
<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
  <thead>
    <tr style="background:#1a1a40;">
      <th style="padding:8px;border:1px solid #30363d;color:#58a6ff;">Letter</th>
      <th style="padding:8px;border:1px solid #30363d;color:#3fb9a0;">Category</th>
      <th style="padding:8px;border:1px solid #30363d;color:#f0883e;">Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding:8px;border:1px solid #30363d;"><strong>L</strong></td><td style="padding:8px;border:1px solid #30363d;">Logarithmic</td><td style="padding:8px;border:1px solid #30363d;">\\(\\ln x,\\;\\log x\\)</td></tr>
    <tr><td style="padding:8px;border:1px solid #30363d;"><strong>I</strong></td><td style="padding:8px;border:1px solid #30363d;">Inverse trig</td><td style="padding:8px;border:1px solid #30363d;">\\(\\arctan x,\\;\\arcsin x\\)</td></tr>
    <tr><td style="padding:8px;border:1px solid #30363d;"><strong>A</strong></td><td style="padding:8px;border:1px solid #30363d;">Algebraic (polynomial)</td><td style="padding:8px;border:1px solid #30363d;">\\(x^2,\\;x^n\\)</td></tr>
    <tr><td style="padding:8px;border:1px solid #30363d;"><strong>T</strong></td><td style="padding:8px;border:1px solid #30363d;">Trigonometric</td><td style="padding:8px;border:1px solid #30363d;">\\(\\sin x,\\;\\cos x\\)</td></tr>
    <tr><td style="padding:8px;border:1px solid #30363d;"><strong>E</strong></td><td style="padding:8px;border:1px solid #30363d;">Exponential</td><td style="padding:8px;border:1px solid #30363d;">\\(e^x,\\;2^x\\)</td></tr>
  </tbody>
</table>

<div class="example">
  <strong>Example 1:</strong> Evaluate \\(\\displaystyle\\int x\\,e^x\\,dx\\).
  <br><br>
  <strong>Solution:</strong> By LIATE, choose \\(u = x\\) (Algebraic) and \\(dv = e^x\\,dx\\) (Exponential).
  Then \\(du = dx\\) and \\(v = e^x\\).
  \\[
    \\int x\\,e^x\\,dx = x\\,e^x - \\int e^x\\,dx = x\\,e^x - e^x + C = e^x(x - 1) + C
  \\]
</div>

<div class="example">
  <strong>Example 2:</strong> Evaluate \\(\\displaystyle\\int \\ln x\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Choose \\(u = \\ln x\\), \\(dv = dx\\). Then \\(du = \\frac{1}{x}\\,dx\\), \\(v = x\\).
  \\[
    \\int \\ln x\\,dx = x\\ln x - \\int x \\cdot \\frac{1}{x}\\,dx = x\\ln x - x + C
  \\]
</div>

<h3>Tabular Method (Repeated Integration by Parts)</h3>

<p>
When \\(u\\) is a polynomial and \\(dv\\) involves \\(e^x\\), \\(\\sin x\\), or \\(\\cos x\\), the <strong>tabular method</strong> provides a shortcut. Set up a table of successive derivatives of \\(u\\) and antiderivatives of \\(dv\\), with alternating signs.
</p>

<div class="example">
  <strong>Example 3 (Tabular):</strong> Evaluate \\(\\displaystyle\\int x^3 e^x\\,dx\\).
  <br><br>
  <strong>Table:</strong>
  <table style="width:auto;border-collapse:collapse;margin:0.5rem 0;">
    <tr style="background:#1a1a40;">
      <th style="padding:6px 16px;border:1px solid #30363d;color:#58a6ff;">Sign</th>
      <th style="padding:6px 16px;border:1px solid #30363d;color:#3fb9a0;">Derivatives of \\(u\\)</th>
      <th style="padding:6px 16px;border:1px solid #30363d;color:#f0883e;">Antiderivatives of \\(dv\\)</th>
    </tr>
    <tr><td style="padding:6px 16px;border:1px solid #30363d;">+</td><td style="padding:6px 16px;border:1px solid #30363d;">\\(x^3\\)</td><td style="padding:6px 16px;border:1px solid #30363d;">\\(e^x\\)</td></tr>
    <tr><td style="padding:6px 16px;border:1px solid #30363d;">-</td><td style="padding:6px 16px;border:1px solid #30363d;">\\(3x^2\\)</td><td style="padding:6px 16px;border:1px solid #30363d;">\\(e^x\\)</td></tr>
    <tr><td style="padding:6px 16px;border:1px solid #30363d;">+</td><td style="padding:6px 16px;border:1px solid #30363d;">\\(6x\\)</td><td style="padding:6px 16px;border:1px solid #30363d;">\\(e^x\\)</td></tr>
    <tr><td style="padding:6px 16px;border:1px solid #30363d;">-</td><td style="padding:6px 16px;border:1px solid #30363d;">\\(6\\)</td><td style="padding:6px 16px;border:1px solid #30363d;">\\(e^x\\)</td></tr>
    <tr><td style="padding:6px 16px;border:1px solid #30363d;">+</td><td style="padding:6px 16px;border:1px solid #30363d;">\\(0\\)</td><td style="padding:6px 16px;border:1px solid #30363d;">\\(e^x\\)</td></tr>
  </table>
  \\[
    = x^3 e^x - 3x^2 e^x + 6x\\,e^x - 6e^x + C = e^x(x^3 - 3x^2 + 6x - 6) + C
  \\]
</div>

<h3>Cyclic Integration by Parts</h3>

<div class="example">
  <strong>Example 4:</strong> Evaluate \\(\\displaystyle\\int e^x \\sin x\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Let \\(I = \\int e^x \\sin x\\,dx\\). Apply parts twice:
  <br>
  First: \\(u = \\sin x\\), \\(dv = e^x\\,dx\\) gives \\(I = e^x \\sin x - \\int e^x \\cos x\\,dx\\).
  <br>
  Second: \\(u = \\cos x\\), \\(dv = e^x\\,dx\\) gives \\(\\int e^x \\cos x\\,dx = e^x \\cos x + \\int e^x \\sin x\\,dx = e^x \\cos x + I\\).
  <br>
  So \\(I = e^x \\sin x - e^x \\cos x - I\\), hence \\(2I = e^x(\\sin x - \\cos x)\\), and:
  \\[
    I = \\frac{e^x(\\sin x - \\cos x)}{2} + C
  \\]
</div>

<div class="intuition">
  <strong>Key Intuition:</strong> Integration by parts transfers complexity from one factor to another. The art lies in choosing \\(u\\) and \\(dv\\) so that the "remaining" integral \\(\\int v\\,du\\) is genuinely simpler. LIATE is a guideline, not a rigid rule — sometimes you need to experiment.
</div>
`,
      visualizations: [
        {
          id: 'viz-ibp-explorer',
          title: 'Integration by Parts Explorer',
          setup(container) {
            const viz = new VizEngine(container, { width: 560, height: 380, scale: 35, originX: 80, originY: 280 });
            const ctx = viz.ctx;

            const examples = [
              {
                label: 'x * e^x',
                f: x => x * Math.exp(x),
                u: 'u = x',
                dv: 'dv = e^x dx',
                uv: x => x * Math.exp(x),
                vdu: x => Math.exp(x),
                result: 'e^x(x - 1) + C',
                xRange: [-3, 2]
              },
              {
                label: 'x * sin(x)',
                f: x => x * Math.sin(x),
                u: 'u = x',
                dv: 'dv = sin(x) dx',
                uv: x => -x * Math.cos(x),
                vdu: x => -Math.cos(x),
                result: 'sin(x) - x cos(x) + C',
                xRange: [-4, 4]
              },
              {
                label: 'x^2 * e^x',
                f: x => x * x * Math.exp(x),
                u: 'u = x^2',
                dv: 'dv = e^x dx',
                uv: x => x * x * Math.exp(x),
                vdu: x => 2 * x * Math.exp(x),
                result: 'e^x(x^2 - 2x + 2) + C',
                xRange: [-4, 1.5]
              }
            ];
            let exIdx = 0;

            const controls = document.createElement('div');
            controls.style.cssText = 'display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;align-items:center;';
            examples.forEach((ex, i) => {
              const btn = document.createElement('button');
              btn.textContent = ex.label;
              btn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;cursor:pointer;font-size:0.78rem;';
              btn.addEventListener('click', () => { exIdx = i; draw(); });
              controls.appendChild(btn);
            });
            container.appendChild(controls);

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();
              const ex = examples[exIdx];

              // Draw original function
              viz.drawFunction(ex.f, ex.xRange[0], ex.xRange[1], viz.colors.blue, 2.5);

              // Draw uv term
              viz.drawFunction(ex.uv, ex.xRange[0], ex.xRange[1], viz.colors.teal, 1.5);

              // Draw v du term
              viz.drawFunction(ex.vdu, ex.xRange[0], ex.xRange[1], viz.colors.orange, 1.5);

              // Legend
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              const lx = viz.width - 200, ly = 20;

              ctx.fillStyle = viz.colors.blue;
              ctx.fillText('f(x) = ' + ex.label, lx, ly);
              ctx.fillStyle = viz.colors.teal;
              ctx.fillText('uv = ' + ex.u.replace('u = ', '') + ' * v', lx, ly + 20);
              ctx.fillStyle = viz.colors.orange;
              ctx.fillText('v du (remaining integral)', lx, ly + 40);

              // Info
              ctx.fillStyle = viz.colors.white;
              ctx.font = '13px -apple-system,sans-serif';
              ctx.fillText(ex.u + ',  ' + ex.dv, 10, 20);
              ctx.fillStyle = viz.colors.green;
              ctx.fillText('Result: ' + ex.result, 10, 40);
            }

            draw();
            return viz;
          }
        }
      ],
      exercises: [
        {
          id: 'ch11-ex04',
          type: 'mc',
          question: 'Using integration by parts with u = ln(x) and dv = dx, what is the integral of ln(x) dx?',
          options: ['x ln(x) - x + C', 'x ln(x) + x + C', 'ln(x)/x + C', 'x^2 ln(x)/2 + C'],
          correct: 0,
          explanation: 'With u = ln(x), du = (1/x) dx, dv = dx, v = x. So the integral = x ln(x) - integral of x * (1/x) dx = x ln(x) - x + C.'
        },
        {
          id: 'ch11-ex05',
          type: 'mc',
          question: 'Using the LIATE rule, which function should be chosen as u in the integral of x^2 * sin(x) dx?',
          options: ['sin(x)', 'x^2', 'x^2 sin(x)', 'x'],
          correct: 1,
          explanation: 'In LIATE order: Algebraic (x^2) comes before Trigonometric (sin x). So u = x^2 and dv = sin(x) dx. This will require applying parts twice (or using the tabular method).'
        },
        {
          id: 'ch11-ex06',
          type: 'mc',
          question: 'What is the integral of e^x * cos(x) dx?',
          options: [
            'e^x(sin(x) + cos(x))/2 + C',
            'e^x(sin(x) - cos(x))/2 + C',
            'e^x * sin(x) + C',
            'e^x * cos(x) + C'
          ],
          correct: 0,
          explanation: 'Apply parts twice to get a cyclic equation. Let I = integral of e^x cos(x) dx. After two applications: I = e^x sin(x) - e^x(-cos(x)) - I, so 2I = e^x(sin(x) + cos(x)), giving I = e^x(sin(x) + cos(x))/2 + C.'
        }
      ]
    },

    // ─── SECTION 3 ────────────────────────────────────────────────────────────
    {
      id: 'ch11-sec03',
      title: '3. Trigonometric Integrals',
      content: `
<div class="env-block intuition">
<strong>Connecting Back.</strong> Substitution and integration by parts are general-purpose tools. In this section, we focus on a specific but important family of integrands: products and powers of trigonometric functions. These arise naturally in Fourier analysis, physics (wave equations, oscillations), and as intermediate results when applying the techniques from the previous two sections. The strategies here combine substitution with trigonometric identities you already know from precalculus.
</div>

<h2>Trigonometric Integrals</h2>

<p>
Integrals involving products and powers of trigonometric functions appear frequently in applications. The key strategies depend on the powers of \\(\\sin x\\) and \\(\\cos x\\) and whether they are odd or even.
</p>

<h3>Strategy for \\(\\displaystyle\\int \\sin^m x\\,\\cos^n x\\,dx\\)</h3>

<div class="definition">
  <strong>Case 1: One power is odd.</strong> Factor out one copy of the odd-power function and convert the remaining even power using \\(\\sin^2 x + \\cos^2 x = 1\\), then use u-substitution.
  <br><br>
  <strong>Case 2: Both powers are even.</strong> Use the half-angle identities:
  \\[
    \\sin^2 x = \\frac{1 - \\cos 2x}{2}, \\quad \\cos^2 x = \\frac{1 + \\cos 2x}{2}
  \\]
</div>

<div class="example">
  <strong>Example 1 (Odd power):</strong> Evaluate \\(\\displaystyle\\int \\sin^3 x\\,\\cos^2 x\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Since \\(\\sin\\) has odd power, factor out one \\(\\sin x\\):
  \\[
    \\int \\sin^2 x\\,\\cos^2 x\\,\\sin x\\,dx = \\int (1 - \\cos^2 x)\\cos^2 x\\,\\sin x\\,dx
  \\]
  Let \\(u = \\cos x\\), \\(du = -\\sin x\\,dx\\):
  \\[
    = -\\int (1 - u^2)u^2\\,du = -\\int (u^2 - u^4)\\,du = -\\frac{u^3}{3} + \\frac{u^5}{5} + C
  \\]
  \\[
    = -\\frac{\\cos^3 x}{3} + \\frac{\\cos^5 x}{5} + C
  \\]
</div>

<div class="example">
  <strong>Example 2 (Even powers):</strong> Evaluate \\(\\displaystyle\\int \\sin^2 x\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Both powers are even (\\(\\sin^2 x = \\sin^2 x \\cdot \\cos^0 x\\)). Use the half-angle identity:
  \\[
    \\int \\sin^2 x\\,dx = \\int \\frac{1 - \\cos 2x}{2}\\,dx = \\frac{x}{2} - \\frac{\\sin 2x}{4} + C
  \\]
</div>

<h3>Integrals Involving \\(\\tan x\\) and \\(\\sec x\\)</h3>

<div class="definition">
  <strong>Key Formulas:</strong>
  \\[
    \\int \\tan x\\,dx = -\\ln|\\cos x| + C = \\ln|\\sec x| + C
  \\]
  \\[
    \\int \\sec x\\,dx = \\ln|\\sec x + \\tan x| + C
  \\]
  \\[
    \\int \\sec^2 x\\,dx = \\tan x + C
  \\]
  \\[
    \\int \\sec x\\,\\tan x\\,dx = \\sec x + C
  \\]
</div>

<h3>Reduction Formulas</h3>

<div class="definition">
  <strong>Reduction Formula for \\(\\sin^n x\\):</strong>
  \\[
    \\int \\sin^n x\\,dx = -\\frac{\\sin^{n-1}x\\,\\cos x}{n} + \\frac{n-1}{n}\\int \\sin^{n-2}x\\,dx
  \\]
  <br>
  <strong>Reduction Formula for \\(\\cos^n x\\):</strong>
  \\[
    \\int \\cos^n x\\,dx = \\frac{\\cos^{n-1}x\\,\\sin x}{n} + \\frac{n-1}{n}\\int \\cos^{n-2}x\\,dx
  \\]
</div>

<div class="example">
  <strong>Example 3:</strong> Use the reduction formula to find \\(\\displaystyle\\int \\sin^4 x\\,dx\\).
  <br><br>
  <strong>Solution:</strong> With \\(n = 4\\):
  \\[
    \\int \\sin^4 x\\,dx = -\\frac{\\sin^3 x\\,\\cos x}{4} + \\frac{3}{4}\\int \\sin^2 x\\,dx
  \\]
  \\[
    = -\\frac{\\sin^3 x\\,\\cos x}{4} + \\frac{3}{4}\\left(\\frac{x}{2} - \\frac{\\sin 2x}{4}\\right) + C
  \\]
  \\[
    = -\\frac{\\sin^3 x\\,\\cos x}{4} + \\frac{3x}{8} - \\frac{3\\sin 2x}{16} + C
  \\]
</div>

<div class="intuition">
  <strong>Key Intuition:</strong> Trigonometric integrals are essentially a pattern-matching game. The parity (odd vs. even) of the powers determines which identity to apply. Odd powers let you peel off one factor for a u-substitution; even powers require half-angle identities to lower the degree.
</div>

<div class="warning">
  <strong>Common Mistake:</strong> When both powers are odd, you have a choice of which function to peel. Pick the one whose remaining integral is simpler. For example, in \\(\\int \\sin^3 x\\,\\cos^5 x\\,dx\\), peeling a \\(\\sin x\\) leaves \\(\\cos^5 x\\) (use \\(u = \\cos x\\)), but peeling a \\(\\cos x\\) leaves \\(\\sin^3 x\\) (use \\(u = \\sin x\\)). Both work, but the smaller remaining power is usually easier.
</div>
`,
      visualizations: [
        {
          id: 'viz-trig-integrals',
          title: 'Trigonometric Integrals Explorer',
          setup(container) {
            const viz = new VizEngine(container, { width: 560, height: 380, scale: 40, originX: 280, originY: 220 });
            const ctx = viz.ctx;

            let m = 2, n = 1;

            const mSlider = VizEngine.createSlider(container, 'sin^m power m = ', 0, 6, 2, 1, v => { m = Math.round(v); draw(); });
            const nSlider = VizEngine.createSlider(container, 'cos^n power n = ', 0, 6, 1, 1, v => { n = Math.round(v); draw(); });

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              const f = x => Math.pow(Math.sin(x), m) * Math.pow(Math.cos(x), n);

              // Shade the area from 0 to pi
              viz.shadeUnder(f, 0, Math.PI, viz.colors.blue + '33');
              viz.drawFunction(f, -Math.PI - 0.5, Math.PI + 0.5, viz.colors.blue, 2.5);

              // Compute integral from 0 to pi numerically (Simpson's rule)
              const N = 1000;
              const a = 0, b = Math.PI;
              const h = (b - a) / N;
              let sum = f(a) + f(b);
              for (let i = 1; i < N; i++) {
                sum += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
              }
              const integral = sum * h / 3;

              // Labels
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 14px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('sin^' + m + '(x) cos^' + n + '(x)', viz.width / 2, 20);

              ctx.fillStyle = viz.colors.teal;
              ctx.font = '13px -apple-system,sans-serif';
              ctx.fillText('Area [0, pi] = ' + integral.toFixed(4), viz.width / 2, 45);

              // Strategy hint
              const isOddM = m % 2 === 1, isOddN = n % 2 === 1;
              let strategy;
              if (isOddM || isOddN) {
                strategy = 'Strategy: Odd power present - peel one factor, use u-sub';
              } else {
                strategy = 'Strategy: Both even - use half-angle identities';
              }
              ctx.fillStyle = viz.colors.orange;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.fillText(strategy, viz.width / 2, viz.height - 15);

              // Mark pi on x axis
              const [sxPi] = viz.toScreen(Math.PI, 0);
              ctx.fillStyle = viz.colors.text;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText('pi', sxPi, viz.originY + 16);

              const [sxNPi] = viz.toScreen(-Math.PI, 0);
              ctx.fillText('-pi', sxNPi, viz.originY + 16);
            }

            draw();
            return viz;
          }
        }
      ],
      exercises: [
        {
          id: 'ch11-ex07',
          type: 'mc',
          question: 'What is the integral of sin^2(x) dx?',
          options: [
            'x/2 - sin(2x)/4 + C',
            'x/2 + sin(2x)/4 + C',
            '-sin(x)cos(x) + C',
            'sin^3(x)/3 + C'
          ],
          correct: 0,
          explanation: 'Use the half-angle identity sin^2(x) = (1 - cos(2x))/2. Integrating: x/2 - sin(2x)/4 + C.'
        },
        {
          id: 'ch11-ex08',
          type: 'mc',
          question: 'To evaluate the integral of sin^5(x) dx, which first step is most effective?',
          options: [
            'Write sin^5(x) = sin(x)(1 - cos^2(x))^2 and substitute u = cos(x)',
            'Use the half-angle identity for sin^2(x) repeatedly',
            'Apply integration by parts with u = sin^4(x)',
            'Use the reduction formula directly'
          ],
          correct: 0,
          explanation: 'Since 5 is odd, factor out sin(x) and convert: sin^5(x) = sin(x)(sin^2(x))^2 = sin(x)(1-cos^2(x))^2. Then u = cos(x), du = -sin(x) dx. This gives a polynomial in u.'
        },
        {
          id: 'ch11-ex09',
          type: 'mc',
          question: 'Which identity is NOT useful for evaluating trigonometric integrals?',
          options: [
            'sin^2(x) + cos^2(x) = 1',
            'sin^2(x) = (1 - cos(2x))/2',
            'sin(x)cos(x) = sin(2x)/2',
            'sin(x) + cos(x) = 1'
          ],
          correct: 3,
          explanation: 'sin(x) + cos(x) = 1 is FALSE (it equals sqrt(2)sin(x + pi/4), not 1). The other three are all valid and commonly used trigonometric identities for integration.'
        }
      ]
    },

    // ─── SECTION 4 ────────────────────────────────────────────────────────────
    {
      id: 'ch11-sec04',
      title: '4. Trigonometric Substitution',
      content: `
<div class="env-block intuition">
<strong>When Algebra Meets Geometry.</strong> The previous section handled integrands that were already expressed as products of trig functions. Now we reverse the idea: given an algebraic integrand containing a square root like \\(\\sqrt{a^2 - x^2}\\), we <em>introduce</em> trigonometric functions via a substitution to exploit Pythagorean identities. This is u-substitution in reverse, replacing the algebraic variable \\(x\\) with a trigonometric expression. The geometric picture (a right triangle) guides the choice every time.
</div>

<h2>Trigonometric Substitution</h2>

<p>
When the integrand contains expressions like \\(\\sqrt{a^2 - x^2}\\), \\(\\sqrt{a^2 + x^2}\\), or \\(\\sqrt{x^2 - a^2}\\), a <strong>trigonometric substitution</strong> can eliminate the square root using Pythagorean identities.
</p>

<div class="definition">
  <strong>Three Standard Substitutions:</strong>
  <table style="width:100%;border-collapse:collapse;margin:1rem 0;">
    <thead>
      <tr style="background:#1a1a40;">
        <th style="padding:8px;border:1px solid #30363d;color:#58a6ff;">Expression</th>
        <th style="padding:8px;border:1px solid #30363d;color:#3fb9a0;">Substitution</th>
        <th style="padding:8px;border:1px solid #30363d;color:#f0883e;">Identity Used</th>
        <th style="padding:8px;border:1px solid #30363d;color:#bc8cff;">Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding:8px;border:1px solid #30363d;">\\(\\sqrt{a^2 - x^2}\\)</td>
        <td style="padding:8px;border:1px solid #30363d;">\\(x = a\\sin\\theta\\)</td>
        <td style="padding:8px;border:1px solid #30363d;">\\(1 - \\sin^2\\theta = \\cos^2\\theta\\)</td>
        <td style="padding:8px;border:1px solid #30363d;">\\(a\\cos\\theta\\)</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #30363d;">\\(\\sqrt{a^2 + x^2}\\)</td>
        <td style="padding:8px;border:1px solid #30363d;">\\(x = a\\tan\\theta\\)</td>
        <td style="padding:8px;border:1px solid #30363d;">\\(1 + \\tan^2\\theta = \\sec^2\\theta\\)</td>
        <td style="padding:8px;border:1px solid #30363d;">\\(a\\sec\\theta\\)</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #30363d;">\\(\\sqrt{x^2 - a^2}\\)</td>
        <td style="padding:8px;border:1px solid #30363d;">\\(x = a\\sec\\theta\\)</td>
        <td style="padding:8px;border:1px solid #30363d;">\\(\\sec^2\\theta - 1 = \\tan^2\\theta\\)</td>
        <td style="padding:8px;border:1px solid #30363d;">\\(a\\tan\\theta\\)</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="example">
  <strong>Example 1:</strong> Evaluate \\(\\displaystyle\\int \\frac{dx}{\\sqrt{4 - x^2}}\\).
  <br><br>
  <strong>Solution:</strong> Here \\(a = 2\\). Let \\(x = 2\\sin\\theta\\), so \\(dx = 2\\cos\\theta\\,d\\theta\\) and \\(\\sqrt{4 - x^2} = 2\\cos\\theta\\).
  \\[
    \\int \\frac{2\\cos\\theta\\,d\\theta}{2\\cos\\theta} = \\int d\\theta = \\theta + C = \\arcsin\\frac{x}{2} + C
  \\]
</div>

<div class="example">
  <strong>Example 2:</strong> Evaluate \\(\\displaystyle\\int \\frac{dx}{(1 + x^2)^{3/2}}\\).
  <br><br>
  <strong>Solution:</strong> Here \\(a = 1\\). Let \\(x = \\tan\\theta\\), \\(dx = \\sec^2\\theta\\,d\\theta\\), and \\((1 + x^2)^{3/2} = \\sec^3\\theta\\).
  \\[
    \\int \\frac{\\sec^2\\theta\\,d\\theta}{\\sec^3\\theta} = \\int \\cos\\theta\\,d\\theta = \\sin\\theta + C
  \\]
  Since \\(x = \\tan\\theta\\), we have \\(\\sin\\theta = \\frac{x}{\\sqrt{1+x^2}}\\). So the answer is \\(\\frac{x}{\\sqrt{1+x^2}} + C\\).
</div>

<div class="example">
  <strong>Example 3:</strong> Evaluate \\(\\displaystyle\\int \\frac{\\sqrt{x^2 - 9}}{x}\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Here \\(a = 3\\). Let \\(x = 3\\sec\\theta\\), \\(dx = 3\\sec\\theta\\tan\\theta\\,d\\theta\\), \\(\\sqrt{x^2 - 9} = 3\\tan\\theta\\).
  \\[
    \\int \\frac{3\\tan\\theta \\cdot 3\\sec\\theta\\tan\\theta\\,d\\theta}{3\\sec\\theta} = 3\\int \\tan^2\\theta\\,d\\theta = 3\\int (\\sec^2\\theta - 1)\\,d\\theta
  \\]
  \\[
    = 3(\\tan\\theta - \\theta) + C = \\sqrt{x^2 - 9} - 3\\,\\text{arcsec}\\frac{x}{3} + C
  \\]
</div>

<h3>Completing the Square</h3>
<p>
When the expression under the root is a general quadratic \\(ax^2 + bx + c\\), complete the square first to reduce it to one of the three standard forms.
</p>

<div class="example">
  <strong>Example 4:</strong> Evaluate \\(\\displaystyle\\int \\frac{dx}{\\sqrt{x^2 + 4x + 8}}\\).
  <br><br>
  <strong>Solution:</strong> Complete the square: \\(x^2 + 4x + 8 = (x+2)^2 + 4\\). Let \\(u = x + 2\\), then:
  \\[
    \\int \\frac{du}{\\sqrt{u^2 + 4}}
  \\]
  Now use \\(u = 2\\tan\\theta\\): the result is \\(\\ln|u + \\sqrt{u^2+4}| + C = \\ln|x + 2 + \\sqrt{x^2+4x+8}| + C\\).
</div>

<div class="intuition">
  <strong>Key Intuition:</strong> Think of the three substitutions geometrically via a right triangle. For \\(\\sqrt{a^2 - x^2}\\), draw a triangle with hypotenuse \\(a\\) and one leg \\(x\\) — the remaining leg is \\(\\sqrt{a^2 - x^2}\\). The substitution \\(x = a\\sin\\theta\\) makes \\(\\theta\\) the angle opposite to \\(x\\).
</div>

<div class="warning">
  <strong>Common Mistake:</strong> After integrating in \\(\\theta\\), you must convert back to \\(x\\). Draw the reference triangle to express \\(\\sin\\theta\\), \\(\\cos\\theta\\), etc. in terms of \\(x\\).
</div>
`,
      visualizations: [
        {
          id: 'viz-trig-sub-triangles',
          title: 'Trigonometric Substitution Reference Triangles',
          setup(container) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 40, originX: 280, originY: 200 });
            const ctx = viz.ctx;

            let subType = 0; // 0: a^2 - x^2, 1: a^2 + x^2, 2: x^2 - a^2
            let aVal = 3;

            const controls = document.createElement('div');
            controls.style.cssText = 'display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;align-items:center;';
            const labels = ['sqrt(a^2 - x^2)', 'sqrt(a^2 + x^2)', 'sqrt(x^2 - a^2)'];
            labels.forEach((lb, i) => {
              const btn = document.createElement('button');
              btn.textContent = lb;
              btn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;cursor:pointer;font-size:0.78rem;';
              btn.addEventListener('click', () => { subType = i; draw(); });
              controls.appendChild(btn);
            });
            container.appendChild(controls);

            const thetaSlider = VizEngine.createSlider(container, 'theta = ', 0.1, 1.4, 0.6, 0.01, () => draw());

            function draw() {
              viz.clear();
              const theta = parseFloat(thetaSlider.value);

              const cx = viz.width / 2, cy = viz.height / 2 + 20;
              const scale = 80;

              let adj, opp, hyp, xExpr, sqrtExpr, subExpr;

              if (subType === 0) {
                // x = a sin(theta), sqrt(a^2-x^2) = a cos(theta)
                hyp = aVal;
                opp = aVal * Math.sin(theta);
                adj = aVal * Math.cos(theta);
                xExpr = 'x = a sin(theta) = ' + opp.toFixed(2);
                sqrtExpr = 'sqrt(a^2-x^2) = a cos(theta) = ' + adj.toFixed(2);
                subExpr = 'x = a sin theta,  dx = a cos theta d theta';
              } else if (subType === 1) {
                // x = a tan(theta), sqrt(a^2+x^2) = a sec(theta)
                adj = aVal;
                opp = aVal * Math.tan(theta);
                hyp = aVal / Math.cos(theta);
                xExpr = 'x = a tan(theta) = ' + opp.toFixed(2);
                sqrtExpr = 'sqrt(a^2+x^2) = a sec(theta) = ' + hyp.toFixed(2);
                subExpr = 'x = a tan theta,  dx = a sec^2 theta d theta';
              } else {
                // x = a sec(theta), sqrt(x^2-a^2) = a tan(theta)
                adj = aVal;
                hyp = aVal / Math.cos(theta);
                opp = aVal * Math.tan(theta);
                xExpr = 'x = a sec(theta) = ' + hyp.toFixed(2);
                sqrtExpr = 'sqrt(x^2-a^2) = a tan(theta) = ' + opp.toFixed(2);
                subExpr = 'x = a sec theta,  dx = a sec theta tan theta d theta';
              }

              // Draw triangle
              const ax = cx - adj * scale / aVal * 1.2;
              const bx = cx + adj * scale / aVal * 1.2;
              const by = cy + 60;
              const ty = by - opp * scale / aVal * 1.2;

              // Bottom side (adjacent)
              ctx.strokeStyle = viz.colors.teal;
              ctx.lineWidth = 3;
              ctx.beginPath(); ctx.moveTo(ax, by); ctx.lineTo(bx, by); ctx.stroke();

              // Vertical side (opposite)
              ctx.strokeStyle = viz.colors.orange;
              ctx.lineWidth = 3;
              ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, ty); ctx.stroke();

              // Hypotenuse
              ctx.strokeStyle = viz.colors.blue;
              ctx.lineWidth = 3;
              ctx.beginPath(); ctx.moveTo(ax, by); ctx.lineTo(bx, ty); ctx.stroke();

              // Right angle marker
              const rSize = 12;
              ctx.strokeStyle = viz.colors.text;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(bx - rSize, by);
              ctx.lineTo(bx - rSize, by - rSize);
              ctx.lineTo(bx, by - rSize);
              ctx.stroke();

              // Angle arc at bottom-left
              ctx.strokeStyle = viz.colors.purple;
              ctx.lineWidth = 2;
              ctx.beginPath();
              const arcR = 25;
              const angleEnd = -Math.atan2(by - ty, bx - ax);
              ctx.arc(ax, by, arcR, -0.001, angleEnd, true);
              ctx.stroke();
              ctx.fillStyle = viz.colors.purple;
              ctx.font = '14px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText('theta', ax + arcR + 5, by - 8);

              // Side labels
              ctx.font = 'bold 13px -apple-system,sans-serif';
              ctx.textAlign = 'center';

              // Label hypotenuse
              const hMidX = (ax + bx) / 2 - 15, hMidY = (by + ty) / 2 - 5;
              ctx.fillStyle = viz.colors.blue;
              if (subType === 0) ctx.fillText('a', hMidX, hMidY);
              else if (subType === 1) ctx.fillText('sqrt(a^2+x^2)', hMidX - 20, hMidY);
              else ctx.fillText('x', hMidX, hMidY);

              // Label adjacent (bottom)
              ctx.fillStyle = viz.colors.teal;
              if (subType === 0) ctx.fillText('sqrt(a^2-x^2)', (ax + bx) / 2, by + 25);
              else if (subType === 1) ctx.fillText('a', (ax + bx) / 2, by + 25);
              else ctx.fillText('a', (ax + bx) / 2, by + 25);

              // Label opposite (right)
              ctx.fillStyle = viz.colors.orange;
              ctx.textAlign = 'left';
              if (subType === 0) ctx.fillText('x', bx + 10, (by + ty) / 2);
              else if (subType === 1) ctx.fillText('x', bx + 10, (by + ty) / 2);
              else ctx.fillText('sqrt(x^2-a^2)', bx + 10, (by + ty) / 2);

              // Info text at top
              ctx.fillStyle = viz.colors.white;
              ctx.font = 'bold 15px -apple-system,sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText(labels[subType] + '  (a = ' + aVal + ')', viz.width / 2, 25);

              ctx.fillStyle = viz.colors.text;
              ctx.font = '12px -apple-system,sans-serif';
              ctx.fillText(subExpr, viz.width / 2, 50);
              ctx.fillText(xExpr, viz.width / 2, 70);
              ctx.fillStyle = viz.colors.green;
              ctx.fillText(sqrtExpr, viz.width / 2, 90);
            }

            draw();
            return viz;
          }
        }
      ],
      exercises: [
        {
          id: 'ch11-ex10',
          type: 'mc',
          question: 'To evaluate the integral of sqrt(9 - x^2) dx, which substitution should be used?',
          options: [
            'x = 3 sin(theta)',
            'x = 3 tan(theta)',
            'x = 3 sec(theta)',
            'x = 3 cos(theta)'
          ],
          correct: 0,
          explanation: 'The expression sqrt(a^2 - x^2) with a = 3 calls for the substitution x = a sin(theta) = 3 sin(theta). Then sqrt(9 - x^2) = 3 cos(theta).'
        },
        {
          id: 'ch11-ex11',
          type: 'mc',
          question: 'What is the integral of dx / sqrt(x^2 + 1)?',
          options: [
            'ln|x + sqrt(x^2 + 1)| + C',
            'arctan(x) + C',
            'arcsin(x) + C',
            'sqrt(x^2 + 1) + C'
          ],
          correct: 0,
          explanation: 'Use x = tan(theta), dx = sec^2(theta) d(theta), sqrt(x^2+1) = sec(theta). The integral becomes the integral of sec(theta) d(theta) = ln|sec(theta) + tan(theta)| + C = ln|sqrt(x^2+1) + x| + C.'
        },
        {
          id: 'ch11-ex12',
          type: 'mc',
          question: 'For the integral involving sqrt(x^2 + 6x + 13), what is the first step?',
          options: [
            'Complete the square: (x+3)^2 + 4, then let u = x+3',
            'Substitute x = sqrt(13) sec(theta) directly',
            'Factor out x^2 from under the root',
            'Use integration by parts'
          ],
          correct: 0,
          explanation: 'x^2 + 6x + 13 = (x+3)^2 + 4. After substituting u = x+3, we get sqrt(u^2 + 4), which calls for the standard trig sub u = 2 tan(theta).'
        }
      ]
    },

    // ─── SECTION 5 ────────────────────────────────────────────────────────────
    {
      id: 'ch11-sec05',
      title: '5. Partial Fractions',
      content: `
<div class="env-block intuition">
<strong>The Last Major Technique.</strong> We can now handle compositions (substitution), products (integration by parts), and trigonometric expressions (trig integrals and trig substitution). One large, important class of functions remains: <em>rational functions</em>, ratios of polynomials. Partial fraction decomposition is an algebraic technique that breaks any rational function into a sum of simple fractions, each of which integrates to a logarithm or an arctangent. With this tool in hand, every rational function becomes integrable in closed form.
</div>

<h2>Partial Fraction Decomposition</h2>

<p>
The method of <strong>partial fractions</strong> allows us to integrate any rational function \\(\\frac{P(x)}{Q(x)}\\) by decomposing it into simpler fractions that we know how to integrate.
</p>

<div class="definition">
  <strong>Prerequisites:</strong>
  <ol>
    <li>The degree of \\(P(x)\\) must be less than the degree of \\(Q(x)\\) (if not, perform polynomial long division first).</li>
    <li>Factor \\(Q(x)\\) completely into linear factors \\((ax + b)\\) and irreducible quadratic factors \\((ax^2 + bx + c)\\).</li>
  </ol>
</div>

<h3>Case 1: Distinct Linear Factors</h3>

<div class="definition">
  If \\(Q(x) = (a_1 x + b_1)(a_2 x + b_2)\\cdots(a_n x + b_n)\\) with all factors distinct, then:
  \\[
    \\frac{P(x)}{Q(x)} = \\frac{A_1}{a_1 x + b_1} + \\frac{A_2}{a_2 x + b_2} + \\cdots + \\frac{A_n}{a_n x + b_n}
  \\]
</div>

<div class="example">
  <strong>Example 1:</strong> Evaluate \\(\\displaystyle\\int \\frac{5x + 3}{(x+1)(x-2)}\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Decompose: \\(\\frac{5x+3}{(x+1)(x-2)} = \\frac{A}{x+1} + \\frac{B}{x-2}\\).
  <br>
  Multiply both sides by \\((x+1)(x-2)\\): \\(5x + 3 = A(x-2) + B(x+1)\\).
  <br>
  Set \\(x = 2\\): \\(13 = 3B\\), so \\(B = 13/3\\).
  <br>
  Set \\(x = -1\\): \\(-2 = -3A\\), so \\(A = 2/3\\).
  \\[
    \\int \\frac{5x+3}{(x+1)(x-2)}\\,dx = \\frac{2}{3}\\ln|x+1| + \\frac{13}{3}\\ln|x-2| + C
  \\]
</div>

<h3>Case 2: Repeated Linear Factors</h3>

<div class="definition">
  If \\(Q(x)\\) contains a factor \\((ax + b)^k\\), include terms:
  \\[
    \\frac{A_1}{ax+b} + \\frac{A_2}{(ax+b)^2} + \\cdots + \\frac{A_k}{(ax+b)^k}
  \\]
</div>

<div class="example">
  <strong>Example 2:</strong> Evaluate \\(\\displaystyle\\int \\frac{x + 4}{x^2(x-1)}\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Decompose: \\(\\frac{x+4}{x^2(x-1)} = \\frac{A}{x} + \\frac{B}{x^2} + \\frac{C}{x-1}\\).
  <br>
  Multiply through: \\(x + 4 = Ax(x-1) + B(x-1) + Cx^2\\).
  <br>
  Set \\(x = 0\\): \\(4 = -B\\), so \\(B = -4\\).
  <br>
  Set \\(x = 1\\): \\(5 = C\\), so \\(C = 5\\).
  <br>
  Compare \\(x^2\\) coefficients: \\(0 = A + C\\), so \\(A = -5\\).
  \\[
    \\int \\left(-\\frac{5}{x} - \\frac{4}{x^2} + \\frac{5}{x-1}\\right)dx = -5\\ln|x| + \\frac{4}{x} + 5\\ln|x-1| + C
  \\]
</div>

<h3>Case 3: Irreducible Quadratic Factors</h3>

<div class="definition">
  If \\(Q(x)\\) contains an irreducible quadratic factor \\(ax^2 + bx + c\\) (with \\(b^2 - 4ac < 0\\)), include:
  \\[
    \\frac{Ax + B}{ax^2 + bx + c}
  \\]
  For repeated quadratic factors \\((ax^2+bx+c)^k\\), include terms up to power \\(k\\).
</div>

<div class="example">
  <strong>Example 3:</strong> Evaluate \\(\\displaystyle\\int \\frac{2x + 1}{(x-1)(x^2+1)}\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Decompose: \\(\\frac{2x+1}{(x-1)(x^2+1)} = \\frac{A}{x-1} + \\frac{Bx + C}{x^2+1}\\).
  <br>
  Multiply: \\(2x + 1 = A(x^2+1) + (Bx+C)(x-1)\\).
  <br>
  Set \\(x = 1\\): \\(3 = 2A\\), so \\(A = 3/2\\).
  <br>
  Compare \\(x^2\\): \\(0 = A + B\\), so \\(B = -3/2\\).
  <br>
  Compare constants: \\(1 = A - C\\), so \\(C = 1/2\\).
  \\[
    \\int \\left(\\frac{3/2}{x-1} + \\frac{-\\frac{3}{2}x + \\frac{1}{2}}{x^2+1}\\right)dx = \\frac{3}{2}\\ln|x-1| - \\frac{3}{4}\\ln(x^2+1) + \\frac{1}{2}\\arctan x + C
  \\]
</div>

<h3>When Degree(P) >= Degree(Q): Long Division First</h3>

<div class="example">
  <strong>Example 4:</strong> Evaluate \\(\\displaystyle\\int \\frac{x^3 + 2}{x^2 - 1}\\,dx\\).
  <br><br>
  <strong>Solution:</strong> Since degree 3 >= degree 2, perform long division:
  \\[
    \\frac{x^3 + 2}{x^2 - 1} = x + \\frac{x + 2}{x^2 - 1} = x + \\frac{x+2}{(x-1)(x+1)}
  \\]
  Now decompose \\(\\frac{x+2}{(x-1)(x+1)} = \\frac{3/2}{x-1} + \\frac{-1/2}{x+1}\\). So:
  \\[
    \\int \\left(x + \\frac{3/2}{x-1} - \\frac{1/2}{x+1}\\right)dx = \\frac{x^2}{2} + \\frac{3}{2}\\ln|x-1| - \\frac{1}{2}\\ln|x+1| + C
  \\]
</div>

<div class="intuition">
  <strong>Key Intuition:</strong> Partial fractions works because every rational function is a sum of "elementary" pieces. Each linear factor contributes a logarithm; each irreducible quadratic contributes a logarithm and/or an arctangent. The method systematically breaks a complicated fraction into these atomic building blocks.
</div>

<div class="warning">
  <strong>Common Mistake:</strong> For repeated factors like \\((x+1)^3\\), you need <em>three</em> terms: \\(\\frac{A}{x+1} + \\frac{B}{(x+1)^2} + \\frac{C}{(x+1)^3}\\). Forgetting the intermediate powers gives wrong coefficients.
</div>

<div class="env-block intuition">
<strong>Looking Ahead.</strong> With substitution, integration by parts, trigonometric techniques, and partial fractions, we can now evaluate a wide range of integrals. The next chapter puts integration to work: computing areas between curves, volumes of solids of revolution, and arc lengths of curves. These geometric applications are where the power of the techniques developed here becomes most visible.
</div>
`,
      visualizations: [
        {
          id: 'viz-partial-fractions',
          title: 'Partial Fraction Decomposition Visualizer',
          setup(container) {
            const viz = new VizEngine(container, { width: 560, height: 400, scale: 30, originX: 280, originY: 200 });
            const ctx = viz.ctx;

            let exampleIdx = 0;
            const examples = [
              {
                label: '1/((x-1)(x+1))',
                f: x => 1 / ((x - 1) * (x + 1)),
                parts: [
                  { f: x => 0.5 / (x - 1), label: '1/(2(x-1))', color: null },
                  { f: x => -0.5 / (x + 1), label: '-1/(2(x+1))', color: null }
                ],
                xRange: [-4, 4],
                poles: [-1, 1]
              },
              {
                label: '(2x+1)/((x-1)(x+2))',
                f: x => (2 * x + 1) / ((x - 1) * (x + 2)),
                parts: [
                  { f: x => 1 / (x - 1), label: '1/(x-1)', color: null },
                  { f: x => 1 / (x + 2), label: '1/(x+2)', color: null }
                ],
                xRange: [-5, 4],
                poles: [-2, 1]
              },
              {
                label: 'x/((x-1)(x^2+1))',
                f: x => x / ((x - 1) * (x * x + 1)),
                parts: [
                  { f: x => 0.5 / (x - 1), label: '1/(2(x-1))', color: null },
                  { f: x => (-0.5 * x + 0.5) / (x * x + 1), label: '(-x/2+1/2)/(x^2+1)', color: null }
                ],
                xRange: [-4, 4],
                poles: [1]
              }
            ];

            const partColors = [viz.colors.teal, viz.colors.orange, viz.colors.purple];

            const controls = document.createElement('div');
            controls.style.cssText = 'display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';
            examples.forEach((ex, i) => {
              const btn = document.createElement('button');
              btn.textContent = ex.label;
              btn.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;cursor:pointer;font-size:0.75rem;';
              btn.addEventListener('click', () => { exampleIdx = i; draw(); });
              controls.appendChild(btn);
            });
            container.appendChild(controls);

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              const ex = examples[exampleIdx];

              // Draw vertical asymptotes
              for (const p of ex.poles) {
                const [sx] = viz.toScreen(p, 0);
                ctx.strokeStyle = viz.colors.red + '66';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                ctx.setLineDash([]);
              }

              // Draw original function
              const drawSafe = (f, xMin, xMax, color, lw) => {
                ctx.strokeStyle = color;
                ctx.lineWidth = lw;
                ctx.beginPath();
                let started = false;
                const steps = 600;
                for (let i = 0; i <= steps; i++) {
                  const x = xMin + (xMax - xMin) * i / steps;
                  const y = f(x);
                  if (!isFinite(y) || Math.abs(y) > 15) { started = false; continue; }
                  const [sx, sy] = viz.toScreen(x, y);
                  if (!started) { ctx.moveTo(sx, sy); started = true; }
                  else ctx.lineTo(sx, sy);
                }
                ctx.stroke();
              };

              drawSafe(ex.f, ex.xRange[0], ex.xRange[1], viz.colors.blue, 3);

              // Draw partial fraction components
              ex.parts.forEach((part, i) => {
                drawSafe(part.f, ex.xRange[0], ex.xRange[1], partColors[i % partColors.length], 1.5);
              });

              // Legend
              ctx.font = '12px -apple-system,sans-serif';
              ctx.textAlign = 'left';
              ctx.fillStyle = viz.colors.blue;
              ctx.fillText('f(x) = ' + ex.label, 10, 20);

              ex.parts.forEach((part, i) => {
                ctx.fillStyle = partColors[i % partColors.length];
                ctx.fillText(part.label, 10, 40 + i * 18);
              });

              ctx.fillStyle = viz.colors.text;
              ctx.font = '11px -apple-system,sans-serif';
              ctx.fillText('Sum of partial fractions = original', 10, 40 + ex.parts.length * 18 + 5);
            }

            draw();
            return viz;
          }
        }
      ],
      exercises: [
        {
          id: 'ch11-ex13',
          type: 'mc',
          question: 'What is the partial fraction decomposition of 1/((x-1)(x+3))?',
          options: [
            '1/(4(x-1)) - 1/(4(x+3))',
            '1/(2(x-1)) + 1/(2(x+3))',
            '1/((x-1)) - 1/((x+3))',
            '1/(4(x-1)) + 1/(4(x+3))'
          ],
          correct: 0,
          explanation: 'Write 1/((x-1)(x+3)) = A/(x-1) + B/(x+3). Multiply: 1 = A(x+3) + B(x-1). Set x=1: 1=4A, A=1/4. Set x=-3: 1=-4B, B=-1/4. So it is 1/(4(x-1)) - 1/(4(x+3)).'
        },
        {
          id: 'ch11-ex14',
          type: 'mc',
          question: 'For the decomposition of (x+1)/(x^2(x-2)), how many unknown constants are there?',
          options: ['3 (A, B, C)', '2 (A, B)', '4 (A, B, C, D)', '1 (A)'],
          correct: 0,
          explanation: 'x^2 is a repeated linear factor requiring A/x + B/x^2, and (x-2) requires C/(x-2). Total: 3 constants.'
        },
        {
          id: 'ch11-ex15',
          type: 'mc',
          question: 'What is the integral of 1/(x^2 - 1) dx?',
          options: [
            '(1/2) ln|x-1| - (1/2) ln|x+1| + C',
            'ln|x^2 - 1| + C',
            'arctan(x) + C',
            '(1/2) ln|x-1| + (1/2) ln|x+1| + C'
          ],
          correct: 0,
          explanation: '1/(x^2-1) = 1/((x-1)(x+1)) = (1/2)/(x-1) - (1/2)/(x+1). Integrating: (1/2)ln|x-1| - (1/2)ln|x+1| + C = (1/2)ln|(x-1)/(x+1)| + C.'
        }
      ]
    }

  ]
});
