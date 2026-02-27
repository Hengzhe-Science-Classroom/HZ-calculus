window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
  id: 'ch04',
  number: 4,
  title: 'Differentiation Rules',
  subtitle: 'The computational engine of calculus: power, product, quotient, and chain rules',
  sections: [

    // ─── SECTION 1 ────────────────────────────────────────────────────────────
    {
      id: 'ch04-sec01',
      title: '1. Power Rule & Basic Rules',
      content: `
<h2>幂法则与基本法则 — Power Rule & Basic Rules</h2>

<p>
In Chapter 3 we learned what a derivative <em>is</em> — the limit of a difference quotient.
Computing that limit from scratch every time would be painfully slow.
Fortunately, a small collection of rules lets us differentiate almost any function
we will ever meet, without returning to the definition.
</p>

<div class="definition">
  <strong>The Power Rule (幂法则)</strong><br>
  For any real number \\(n\\),
  \\[
    \\frac{d}{dx}\\bigl[x^n\\bigr] = n\\,x^{n-1}.
  \\]
  This works for positive integers, negative integers, fractions — any real exponent.
</div>

<div class="example">
  <strong>Example 1 — Applying the Power Rule</strong>
  <ul>
    <li>\\(\\frac{d}{dx}[x^5] = 5x^4\\)</li>
    <li>\\(\\frac{d}{dx}[x^{-2}] = -2x^{-3} = -\\frac{2}{x^3}\\)</li>
    <li>\\(\\frac{d}{dx}[\\sqrt{x}] = \\frac{d}{dx}[x^{1/2}] = \\tfrac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}\\)</li>
    <li>\\(\\frac{d}{dx}[x^{\\pi}] = \\pi\\,x^{\\pi-1}\\)</li>
  </ul>
</div>

<h3>Constant Rule & Constant Multiple Rule</h3>

<div class="definition">
  <strong>Constant Rule</strong>: If \\(c\\) is a constant, \\(\\frac{d}{dx}[c] = 0\\).
  <br><br>
  <strong>Constant Multiple Rule</strong>: \\(\\frac{d}{dx}[c\\,f(x)] = c\\,f'(x)\\).
</div>

<div class="intuition">
  <strong>Intuition:</strong> A constant has no change, so its rate of change is zero.
  Multiplying a function by a constant just scales the slope by the same factor —
  a hill that is 3 times taller has slopes that are 3 times steeper.
</div>

<h3>Sum & Difference Rule</h3>

<div class="definition">
  <strong>Sum / Difference Rule (和差法则)</strong>
  \\[
    \\frac{d}{dx}\\bigl[f(x) \\pm g(x)\\bigr] = f'(x) \\pm g'(x).
  \\]
  Derivatives distribute over addition and subtraction.
</div>

<div class="example">
  <strong>Example 2 — Combining rules</strong><br>
  Let \\(h(x) = 3x^4 - 5x^2 + 7x - 9\\). Then:
  \\[
    h'(x) = 12x^3 - 10x + 7.
  \\]
  Each term is differentiated independently: power rule, constant multiple, sum rule.
</div>

<div class="warning">
  <strong>Common Mistake:</strong> Students sometimes try to use the "power rule" on constants:
  \\(\\frac{d}{dx}[5] \\neq 5 \\cdot x^{-1}\\). The constant 5 has derivative 0.
  Remember: \\(5 = 5x^0\\), so the power rule gives \\(5 \\cdot 0 \\cdot x^{-1} = 0\\). Consistent!
</div>

<h3>Summary Table</h3>
<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
  <thead>
    <tr style="background:#1a1a40;">
      <th style="padding:8px;border:1px solid #30363d;color:#58a6ff;">Rule</th>
      <th style="padding:8px;border:1px solid #30363d;color:#3fb9a0;">Formula</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">Power Rule</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\frac{d}{dx}[x^n] = nx^{n-1}\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">Constant</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\frac{d}{dx}[c] = 0\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">Constant Multiple</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\frac{d}{dx}[cf] = c\\,f'\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">Sum / Difference</td>
      <td style="padding:8px;border:1px solid #30363d;">\\((f \\pm g)' = f' \\pm g'\\)</td>
    </tr>
  </tbody>
</table>

<div class="viz-placeholder" data-viz="viz-power-rule"></div>
`,
      visualizations: [
        {
          id: 'viz-power-rule',
          title: 'Power Rule Explorer: \\(f(x) = x^n\\) and \\(f\'(x) = nx^{n-1}\\)',
          description: 'Adjust the exponent \\(n\\) and watch how the function and its derivative change. The tangent line at the draggable point confirms the slope equals \\(f\'(a)\\).',
          setup(container, controls) {
            const viz = new VizEngine(container, { scale: 40 });
            let n = 2;
            const pt = viz.addDraggable('pt', 1.5, 0, viz.colors.orange, 8);

            VizEngine.createSlider(controls, 'n', -3, 5, n, 0.5, v => { n = v; });

            function f(x) { return Math.pow(x, n); }
            function fp(x) { return n * Math.pow(x, n - 1); }

            function draw() {
              viz.clear();
              viz.drawGrid();
              viz.drawAxes();

              // Draw f(x) = x^n
              viz.drawFunction(f, -7, 7, viz.colors.blue, 2.5);
              // Draw f'(x) = n*x^(n-1)
              viz.drawFunction(fp, -7, 7, viz.colors.teal, 2, 300);

              // Tangent line at draggable point
              const a = pt.x;
              const fa = f(a);
              const slope = fp(a);
              pt.y = fa;

              // Draw tangent line segment
              const dx = 2;
              viz.drawSegment(a - dx, fa - slope * dx, a + dx, fa + slope * dx, viz.colors.orange, 1.5, true);
              viz.drawPoint(a, fa, viz.colors.orange, null, 6);

              // Labels
              viz.screenText('f(x) = x^' + n.toFixed(1), 14, 20, viz.colors.blue, 13, 'left', 'top');
              viz.screenText("f'(x) = " + n.toFixed(1) + ' x^' + (n - 1).toFixed(1), 14, 38, viz.colors.teal, 13, 'left', 'top');
              viz.screenText('slope at x=' + a.toFixed(2) + ': ' + slope.toFixed(3), 14, 56, viz.colors.orange, 12, 'left', 'top');

              viz.drawDraggables();
            }

            viz.animate(draw);
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'Differentiate \\(f(x) = 4x^7 - 3x^3 + 2x - 8\\).',
          hint: 'Apply the power rule to each term independently, and remember the constant term has derivative 0.',
          solution: '\\(f\'(x) = 28x^6 - 9x^2 + 2\\). Each term: \\(4 \\cdot 7x^6 = 28x^6\\), \\(-3 \\cdot 3x^2 = -9x^2\\), \\(2 \\cdot 1 = 2\\), and \\(-8 \\to 0\\).'
        },
        {
          question: 'Find \\(\\frac{d}{dx}\\left[\\frac{3}{x^4} + 5\\sqrt[3]{x}\\right]\\).',
          hint: 'Rewrite as \\(3x^{-4} + 5x^{1/3}\\) before applying the power rule.',
          solution: 'Rewrite: \\(3x^{-4} + 5x^{1/3}\\). Differentiate: \\(-12x^{-5} + \\frac{5}{3}x^{-2/3} = -\\frac{12}{x^5} + \\frac{5}{3\\sqrt[3]{x^2}}\\).'
        },
        {
          question: 'Find all points on the curve \\(y = x^3 - 3x + 1\\) where the tangent line is horizontal.',
          hint: 'A horizontal tangent means \\(y\' = 0\\). Set the derivative equal to zero and solve.',
          solution: '\\(y\' = 3x^2 - 3 = 0 \\implies x^2 = 1 \\implies x = \\pm 1\\). The points are \\((1, -1)\\) and \\((-1, 3)\\).'
        },
        {
          question: 'Use the definition of the derivative to prove the Power Rule for \\(n = 3\\): show \\(\\frac{d}{dx}[x^3] = 3x^2\\).',
          hint: 'Expand \\((x+h)^3 = x^3 + 3x^2h + 3xh^2 + h^3\\) and compute the limit.',
          solution: '\\(\\lim_{h \\to 0}\\frac{(x+h)^3 - x^3}{h} = \\lim_{h \\to 0}\\frac{3x^2h + 3xh^2 + h^3}{h} = \\lim_{h \\to 0}(3x^2 + 3xh + h^2) = 3x^2\\).'
        }
      ]
    },

    // ─── SECTION 2 ────────────────────────────────────────────────────────────
    {
      id: 'ch04-sec02',
      title: '2. Product & Quotient Rules',
      content: `
<h2>乘法法则与除法法则 — Product & Quotient Rules</h2>

<p>
The sum rule says \\((f + g)' = f' + g'\\). You might hope that \\((fg)' = f'g'\\).
Unfortunately, that is <strong>wrong</strong>. The correct product rule is more subtle —
and far more interesting.
</p>

<div class="definition">
  <strong>Product Rule (乘法法则)</strong><br>
  If \\(f\\) and \\(g\\) are differentiable, then
  \\[
    \\frac{d}{dx}\\bigl[f(x)\\,g(x)\\bigr] = f'(x)\\,g(x) + f(x)\\,g'(x).
  \\]
  Mnemonic: "the derivative of the first times the second, plus the first times the derivative of the second."
</div>

<div class="intuition">
  <strong>Rectangle Intuition:</strong> Think of \\(f(x) \\cdot g(x)\\) as the area of a rectangle
  with sides \\(f\\) and \\(g\\). When \\(x\\) changes by \\(dx\\):
  <ul>
    <li>The width grows by \\(df\\), adding a strip of area \\(\\approx df \\cdot g\\).</li>
    <li>The height grows by \\(dg\\), adding a strip of area \\(\\approx f \\cdot dg\\).</li>
    <li>There is also a tiny corner of area \\(df \\cdot dg\\), but it vanishes in the limit.</li>
  </ul>
  Total change: \\(d(fg) \\approx g\\,df + f\\,dg\\).
</div>

<div class="example">
  <strong>Example 1</strong><br>
  Differentiate \\(h(x) = (x^2 + 1)(x^3 - 2x)\\).
  <br><br>
  Let \\(f = x^2 + 1\\), \\(g = x^3 - 2x\\). Then \\(f' = 2x\\), \\(g' = 3x^2 - 2\\).
  \\[
    h'(x) = 2x(x^3 - 2x) + (x^2 + 1)(3x^2 - 2) = 2x^4 - 4x^2 + 3x^4 - 2x^2 + 3x^2 - 2 = 5x^4 - 3x^2 - 2.
  \\]
  (You can verify by expanding first: \\(h = x^5 - x^3 - 2x\\), so \\(h' = 5x^4 - 3x^2 - 2\\). Same answer.)
</div>

<h3>The Quotient Rule</h3>

<div class="definition">
  <strong>Quotient Rule (除法法则)</strong><br>
  If \\(f\\) and \\(g\\) are differentiable and \\(g(x) \\neq 0\\), then
  \\[
    \\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f'(x)\\,g(x) - f(x)\\,g'(x)}{\\bigl[g(x)\\bigr]^2}.
  \\]
  Mnemonic: "low d-high minus high d-low, over low squared."
</div>

<div class="example">
  <strong>Example 2</strong><br>
  Differentiate \\(\\displaystyle y = \\frac{x^2 + 1}{x - 3}\\).
  <br><br>
  \\(f = x^2 + 1\\), \\(g = x - 3\\), \\(f' = 2x\\), \\(g' = 1\\).
  \\[
    y' = \\frac{2x(x - 3) - (x^2 + 1)(1)}{(x - 3)^2}
       = \\frac{2x^2 - 6x - x^2 - 1}{(x - 3)^2}
       = \\frac{x^2 - 6x - 1}{(x - 3)^2}.
  \\]
</div>

<div class="warning">
  <strong>Common Mistake:</strong> The quotient rule has a <em>minus sign</em> in the numerator.
  Swapping the order gives the wrong sign. Remember: "low d-high <strong>minus</strong> high d-low."
  The product rule has a <em>plus</em> sign — the quotient rule has a <em>minus</em>.
</div>

<div class="example">
  <strong>Example 3 — Deriving \\(\\frac{d}{dx}[x^{-n}]\\) via Quotient Rule</strong><br>
  Write \\(x^{-n} = \\frac{1}{x^n}\\). With \\(f = 1\\), \\(g = x^n\\):
  \\[
    \\frac{d}{dx}\\left[\\frac{1}{x^n}\\right] = \\frac{0 \\cdot x^n - 1 \\cdot nx^{n-1}}{x^{2n}} = \\frac{-nx^{n-1}}{x^{2n}} = -nx^{-n-1}.
  \\]
  This confirms the power rule for negative exponents.
</div>

<div class="viz-placeholder" data-viz="viz-product-rule"></div>
`,
      visualizations: [
        {
          id: 'viz-product-rule',
          title: 'Product Rule: Rectangle Area Interpretation',
          description: 'The product \\(f(x) \\cdot g(x)\\) is visualized as a rectangle area. As \\(x\\) changes, observe how the area changes by the two strips \\(g\\,df\\) and \\(f\\,dg\\).',
          setup(container, controls) {
            const viz = new VizEngine(container, { scale: 30, originX: 80, originY: 350 });

            let x0 = 2;
            VizEngine.createSlider(controls, 'x', 0.5, 4, x0, 0.1, v => { x0 = v; });

            const dx = 0.4;

            function f(x) { return 0.5 * x + 1; }
            function g(x) { return 0.3 * x * x + 0.5; }

            function draw() {
              viz.clear();

              const fv = f(x0);
              const gv = g(x0);
              const fv2 = f(x0 + dx);
              const gv2 = g(x0 + dx);

              const ctx = viz.ctx;

              // Main rectangle f * g
              const [sx0, sy0] = viz.toScreen(0, 0);
              const [sx1, sy1] = viz.toScreen(fv, gv);
              ctx.fillStyle = viz.colors.blue + '44';
              ctx.fillRect(sx0, sy1, sx1 - sx0, sy0 - sy1);
              ctx.strokeStyle = viz.colors.blue;
              ctx.lineWidth = 2;
              ctx.strokeRect(sx0, sy1, sx1 - sx0, sy0 - sy1);

              // Strip: g * df (right strip)
              const [sx2] = viz.toScreen(fv2, 0);
              ctx.fillStyle = viz.colors.teal + '66';
              ctx.fillRect(sx1, sy1, sx2 - sx1, sy0 - sy1);
              ctx.strokeStyle = viz.colors.teal;
              ctx.lineWidth = 1.5;
              ctx.strokeRect(sx1, sy1, sx2 - sx1, sy0 - sy1);

              // Strip: f * dg (top strip)
              const [, sy2] = viz.toScreen(0, gv2);
              ctx.fillStyle = viz.colors.orange + '66';
              ctx.fillRect(sx0, sy2, sx1 - sx0, sy1 - sy2);
              ctx.strokeStyle = viz.colors.orange;
              ctx.lineWidth = 1.5;
              ctx.strokeRect(sx0, sy2, sx1 - sx0, sy1 - sy2);

              // Corner piece df * dg (negligible)
              ctx.fillStyle = viz.colors.purple + '44';
              ctx.fillRect(sx1, sy2, sx2 - sx1, sy1 - sy2);

              // Labels
              viz.screenText('f(x) = ' + fv.toFixed(2), (sx0 + sx1) / 2, sy0 + 20, viz.colors.white, 12, 'center');
              viz.screenText('g(x) = ' + gv.toFixed(2), sx0 - 10, (sy0 + sy1) / 2, viz.colors.white, 12, 'right');

              viz.screenText('f . g (area)', (sx0 + sx1) / 2, (sy0 + sy1) / 2, viz.colors.blue, 13, 'center');
              viz.screenText("g . df", (sx1 + sx2) / 2, (sy0 + sy1) / 2, viz.colors.teal, 11, 'center');
              viz.screenText("f . dg", (sx0 + sx1) / 2, (sy1 + sy2) / 2, viz.colors.orange, 11, 'center');
              viz.screenText("df.dg", (sx1 + sx2) / 2, (sy1 + sy2) / 2, viz.colors.purple, 9, 'center');

              viz.screenText('x = ' + x0.toFixed(1), viz.width - 14, 20, viz.colors.white, 13, 'right', 'top');
              viz.screenText('d(fg) = g df + f dg + df dg', viz.width / 2, viz.height - 14, viz.colors.text, 12, 'center');
            }

            viz.animate(draw);
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'Use the product rule to differentiate \\(f(x) = x^2 \\sin x\\). (You may use \\(\\frac{d}{dx}[\\sin x] = \\cos x\\).)',
          hint: 'Let \\(u = x^2\\) and \\(v = \\sin x\\). Then \\(f\' = u\'v + uv\'\\).',
          solution: '\\(f\'(x) = 2x\\sin x + x^2\\cos x\\).'
        },
        {
          question: 'Use the quotient rule to differentiate \\(\\displaystyle g(x) = \\frac{x}{x^2 + 1}\\).',
          hint: 'Set \\(f = x\\), \\(g = x^2 + 1\\). Apply "low d-high minus high d-low, over low squared."',
          solution: '\\(g\'(x) = \\frac{(1)(x^2+1) - x(2x)}{(x^2+1)^2} = \\frac{1 - x^2}{(x^2+1)^2}\\).'
        },
        {
          question: 'Prove: if \\(h = f \\cdot g \\cdot k\\), then \\(h\' = f\'gk + fg\'k + fgk\'\\). (Hint: apply the product rule twice.)',
          hint: 'Group as \\(h = (fg) \\cdot k\\) and apply the product rule. Then expand \\((fg)\'\\) using the product rule again.',
          solution: '\\(h\' = (fg)\'k + (fg)k\' = (f\'g + fg\')k + fgk\' = f\'gk + fg\'k + fgk\'\\). This generalizes: each factor takes a turn being differentiated.'
        }
      ]
    },

    // ─── SECTION 3 ────────────────────────────────────────────────────────────
    {
      id: 'ch04-sec03',
      title: '3. The Chain Rule',
      content: `
<h2>链式法则 — The Chain Rule</h2>

<p>
The <strong>chain rule</strong> is arguably the single most important differentiation rule.
It tells us how to differentiate a <em>composition</em> \\(f(g(x))\\) —
a function inside another function.
</p>

<div class="definition">
  <strong>Chain Rule (链式法则)</strong><br>
  If \\(y = f(u)\\) and \\(u = g(x)\\), then
  \\[
    \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx} = f'\\bigl(g(x)\\bigr) \\cdot g'(x).
  \\]
  Equivalently, \\(\\frac{d}{dx}\\bigl[f(g(x))\\bigr] = f'\\bigl(g(x)\\bigr) \\cdot g'(x)\\).
</div>

<div class="intuition">
  <strong>The "Onion Layer" Intuition</strong><br>
  Think of \\(f(g(x))\\) as an onion: \\(g\\) is the inner layer, \\(f\\) is the outer layer.
  To find the rate of change of the whole thing:
  <ol>
    <li><strong>Differentiate the outer function</strong> (peel the outer layer), leaving the inner function untouched.</li>
    <li><strong>Multiply by the derivative of the inner function</strong> (peel the inner layer).</li>
  </ol>
  Each "layer" contributes its own rate of change, and we multiply them together.
</div>

<div class="example">
  <strong>Example 1</strong><br>
  Differentiate \\(y = (3x^2 + 1)^5\\).
  <br><br>
  Outer: \\(u^5\\), so \\(f'(u) = 5u^4\\). Inner: \\(u = 3x^2 + 1\\), so \\(g'(x) = 6x\\).
  \\[
    y' = 5(3x^2 + 1)^4 \\cdot 6x = 30x(3x^2 + 1)^4.
  \\]
</div>

<div class="example">
  <strong>Example 2</strong><br>
  Differentiate \\(y = \\sin(x^3)\\).
  <br><br>
  Outer: \\(\\sin u\\), derivative \\(\\cos u\\). Inner: \\(u = x^3\\), derivative \\(3x^2\\).
  \\[
    y' = \\cos(x^3) \\cdot 3x^2 = 3x^2 \\cos(x^3).
  \\]
</div>

<div class="example">
  <strong>Example 3 — Double chain rule</strong><br>
  Differentiate \\(y = e^{\\sin(2x)}\\).
  <br><br>
  Three layers: \\(e^{(\\cdot)}\\), then \\(\\sin(\\cdot)\\), then \\(2x\\).
  \\[
    y' = e^{\\sin(2x)} \\cdot \\cos(2x) \\cdot 2 = 2\\cos(2x)\\,e^{\\sin(2x)}.
  \\]
</div>

<h3>Leibniz Notation and the Chain Rule</h3>

<p>
In Leibniz notation the chain rule looks especially clean:
\\[
  \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}.
\\]
It looks like the \\(du\\) terms "cancel." While this is not a rigorous proof,
it is an excellent mnemonic and hints at deeper ideas about differentials.
</p>

<div class="warning">
  <strong>Common Mistake:</strong> Forgetting to multiply by the inner derivative.
  For example, \\(\\frac{d}{dx}[\\sin(3x)] = \\cos(3x) \\cdot 3\\), <strong>not</strong> just \\(\\cos(3x)\\).
  Every "layer" must be differentiated.
</div>

<div class="viz-placeholder" data-viz="viz-chain-rule"></div>

<div class="viz-placeholder" data-viz="viz-chain-peeling"></div>
`,
      visualizations: [
        {
          id: 'viz-chain-rule',
          title: 'Chain Rule: \\(f(g(x))\\) and Its Derivative',
          description: 'Compare the composite function \\(f(g(x))\\) with its derivative computed via the chain rule. Drag the point to see the tangent line.',
          setup(container, controls) {
            const viz = new VizEngine(container, { scale: 40 });

            const pt = viz.addDraggable('pt', 1, 0, viz.colors.orange, 8);
            let nPower = 2;
            VizEngine.createSlider(controls, 'power', 2, 5, nPower, 1, v => { nPower = v; });

            // f(g(x)) = (sin(x))^n
            function g(x) { return Math.sin(x); }
            function gp(x) { return Math.cos(x); }
            function f(u) { return Math.pow(u, nPower); }
            function fp(u) { return nPower * Math.pow(u, nPower - 1); }
            function comp(x) { return f(g(x)); }
            function compDeriv(x) { return fp(g(x)) * gp(x); }

            function draw() {
              viz.clear();
              viz.drawGrid();
              viz.drawAxes();

              // Draw composite f(g(x))
              viz.drawFunction(comp, -7, 7, viz.colors.blue, 2.5);
              // Draw derivative
              viz.drawFunction(compDeriv, -7, 7, viz.colors.teal, 2);

              // Tangent at draggable point
              const a = pt.x;
              const ya = comp(a);
              const slope = compDeriv(a);
              pt.y = ya;

              const dx = 1.5;
              viz.drawSegment(a - dx, ya - slope * dx, a + dx, ya + slope * dx, viz.colors.orange, 1.5, true);
              viz.drawPoint(a, ya, viz.colors.orange, null, 6);

              viz.screenText('f(g(x)) = sin(x)^' + nPower, 14, 20, viz.colors.blue, 13, 'left', 'top');
              viz.screenText("(f(g(x)))' = chain rule", 14, 38, viz.colors.teal, 13, 'left', 'top');
              viz.screenText('slope = ' + slope.toFixed(3), 14, 56, viz.colors.orange, 12, 'left', 'top');

              viz.drawDraggables();
            }

            viz.animate(draw);
            return viz;
          }
        },
        {
          id: 'viz-chain-peeling',
          title: 'Chain Rule "Peeling" Animation',
          description: 'Watch how the chain rule peels each layer: outer derivative times inner derivative. The animation shows the decomposition of \\(\\frac{d}{dx}[(2x+1)^n]\\) layer by layer.',
          setup(container, controls) {
            const viz = new VizEngine(container, { scale: 30 });

            let nVal = 3;
            let animPhase = 0;
            VizEngine.createSlider(controls, 'n', 2, 6, nVal, 1, v => { nVal = v; });

            function inner(x) { return 2 * x + 1; }
            function comp(x) { return Math.pow(inner(x), nVal); }
            function deriv(x) { return nVal * Math.pow(inner(x), nVal - 1) * 2; }

            function draw(t) {
              viz.clear();
              viz.drawGrid();
              viz.drawAxes();

              animPhase = (t * 0.001) % (2 * Math.PI);
              const blend = 0.5 + 0.5 * Math.sin(animPhase);

              // Draw original function
              viz.drawFunction(comp, -6, 6, viz.colors.blue, 2.5);

              // Draw derivative with pulsing
              const alpha = Math.floor(blend * 255).toString(16).padStart(2, '0');
              viz.drawFunction(deriv, -6, 6, viz.colors.teal + alpha, 2.5);

              // Draw inner function faintly
              viz.drawFunction(inner, -6, 6, viz.colors.purple + '66', 1.5);

              // Annotation
              const yPos = 20;
              viz.screenText('Outer: u^' + nVal, 14, yPos, viz.colors.blue, 13, 'left', 'top');
              viz.screenText('Inner: u = 2x + 1', 14, yPos + 18, viz.colors.purple, 13, 'left', 'top');

              // Show the peeling steps
              const step1 = nVal + ' * (2x+1)^' + (nVal - 1);
              const step2 = ' * 2';
              if (blend < 0.5) {
                viz.screenText('Step 1: d/du[u^' + nVal + '] = ' + step1, 14, yPos + 42, viz.colors.teal, 12, 'left', 'top');
              } else {
                viz.screenText('Step 1: ' + step1, 14, yPos + 42, viz.colors.teal, 12, 'left', 'top');
                viz.screenText('Step 2: multiply by du/dx = 2', 14, yPos + 60, viz.colors.orange, 12, 'left', 'top');
                viz.screenText('Result: ' + (2 * nVal) + '(2x+1)^' + (nVal - 1), 14, yPos + 78, viz.colors.green, 12, 'left', 'top');
              }
            }

            viz.animate(draw);
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'Differentiate \\(y = (5x^3 - 2x)^7\\).',
          hint: 'Outer function: \\(u^7\\). Inner function: \\(u = 5x^3 - 2x\\). Apply chain rule.',
          solution: '\\(y\' = 7(5x^3 - 2x)^6 \\cdot (15x^2 - 2)\\).'
        },
        {
          question: 'Differentiate \\(y = \\sqrt{1 + x^4}\\).',
          hint: 'Rewrite as \\((1 + x^4)^{1/2}\\) and apply chain rule.',
          solution: '\\(y\' = \\frac{1}{2}(1 + x^4)^{-1/2} \\cdot 4x^3 = \\frac{2x^3}{\\sqrt{1 + x^4}}\\).'
        },
        {
          question: 'Differentiate \\(y = \\cos^3(4x)\\). (This means \\((\\cos(4x))^3\\).)',
          hint: 'Three layers: \\(u^3\\), then \\(\\cos v\\), then \\(v = 4x\\). Apply chain rule twice.',
          solution: '\\(y\' = 3\\cos^2(4x) \\cdot (-\\sin(4x)) \\cdot 4 = -12\\sin(4x)\\cos^2(4x)\\).'
        },
        {
          question: 'If \\(f(x) = e^{\\sqrt{x}}\\), find \\(f\'(x)\\).',
          hint: 'Let \\(u = \\sqrt{x} = x^{1/2}\\). Then \\(f = e^u\\) and apply chain rule.',
          solution: '\\(f\'(x) = e^{\\sqrt{x}} \\cdot \\frac{1}{2\\sqrt{x}} = \\frac{e^{\\sqrt{x}}}{2\\sqrt{x}}\\).'
        }
      ]
    },

    // ─── SECTION 4 ────────────────────────────────────────────────────────────
    {
      id: 'ch04-sec04',
      title: '4. Derivatives of Trigonometric Functions',
      content: `
<h2>三角函数的导数 — Derivatives of Trigonometric Functions</h2>

<p>
The six trigonometric functions have elegant derivative formulas.
The most fundamental pair — sine and cosine — give rise to all the others
through the quotient rule and identities.
</p>

<div class="definition">
  <strong>Core Trig Derivatives</strong>
  \\[
  \\begin{aligned}
    \\frac{d}{dx}[\\sin x] &= \\cos x &\\qquad
    \\frac{d}{dx}[\\cos x] &= -\\sin x \\\\[6pt]
    \\frac{d}{dx}[\\tan x] &= \\sec^2 x &\\qquad
    \\frac{d}{dx}[\\cot x] &= -\\csc^2 x \\\\[6pt]
    \\frac{d}{dx}[\\sec x] &= \\sec x \\tan x &\\qquad
    \\frac{d}{dx}[\\csc x] &= -\\csc x \\cot x
  \\end{aligned}
  \\]
</div>

<div class="intuition">
  <strong>Pattern Recognition:</strong>
  <ul>
    <li>The "co-" functions (cos, cot, csc) all pick up a <strong>negative sign</strong>.</li>
    <li>Sine and cosine are each other's derivatives, up to a sign: differentiating cycles through \\(\\sin \\to \\cos \\to -\\sin \\to -\\cos \\to \\sin \\to \\cdots\\)</li>
    <li>The squared-secant/cosecant derivatives match the integral formulas for tan and cot.</li>
  </ul>
</div>

<h3>Proof Sketch: \\(\\frac{d}{dx}[\\sin x] = \\cos x\\)</h3>
<p>
From the definition:
\\[
  \\frac{d}{dx}[\\sin x] = \\lim_{h \\to 0} \\frac{\\sin(x+h) - \\sin x}{h}.
\\]
Using the angle addition formula \\(\\sin(x+h) = \\sin x \\cos h + \\cos x \\sin h\\):
\\[
  = \\lim_{h \\to 0} \\frac{\\sin x(\\cos h - 1) + \\cos x \\sin h}{h}
  = \\sin x \\cdot \\underbrace{\\lim_{h \\to 0}\\frac{\\cos h - 1}{h}}_{= 0} + \\cos x \\cdot \\underbrace{\\lim_{h \\to 0}\\frac{\\sin h}{h}}_{= 1}
  = \\cos x.
\\]
</p>

<h3>Deriving \\(\\frac{d}{dx}[\\tan x]\\) via Quotient Rule</h3>
<p>
Since \\(\\tan x = \\frac{\\sin x}{\\cos x}\\):
\\[
  \\frac{d}{dx}[\\tan x] = \\frac{\\cos x \\cdot \\cos x - \\sin x \\cdot (-\\sin x)}{\\cos^2 x}
  = \\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} = \\sec^2 x.
\\]
</p>

<div class="example">
  <strong>Example — Combined Rules</strong><br>
  Differentiate \\(y = x^2 \\tan(3x)\\).
  <br><br>
  Product rule + chain rule:
  \\[
    y' = 2x\\tan(3x) + x^2 \\cdot \\sec^2(3x) \\cdot 3 = 2x\\tan(3x) + 3x^2\\sec^2(3x).
  \\]
</div>

<h3>Summary Table</h3>
<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
  <thead>
    <tr style="background:#1a1a40;">
      <th style="padding:8px;border:1px solid #30363d;color:#58a6ff;">Function</th>
      <th style="padding:8px;border:1px solid #30363d;color:#3fb9a0;">Derivative</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\sin x\\)</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\cos x\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\cos x\\)</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(-\\sin x\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\tan x\\)</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\sec^2 x\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\cot x\\)</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(-\\csc^2 x\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\sec x\\)</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\sec x \\tan x\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\csc x\\)</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(-\\csc x \\cot x\\)</td>
    </tr>
  </tbody>
</table>

<div class="viz-placeholder" data-viz="viz-trig-derivatives"></div>
`,
      visualizations: [
        {
          id: 'viz-trig-derivatives',
          title: 'Trig Functions and Their Derivatives Side-by-Side',
          description: 'Select a trig function and see it plotted alongside its derivative. The tangent line at the draggable point confirms the derivative value.',
          setup(container, controls) {
            const viz = new VizEngine(container, { scale: 40 });

            const fns = {
              'sin': { f: Math.sin, fp: Math.cos, label: 'sin x', dlabel: 'cos x' },
              'cos': { f: Math.cos, fp: x => -Math.sin(x), label: 'cos x', dlabel: '-sin x' },
              'tan': { f: Math.tan, fp: x => 1 / (Math.cos(x) * Math.cos(x)), label: 'tan x', dlabel: 'sec^2 x' }
            };
            let current = 'sin';

            const btnSin = VizEngine.createButton(controls, 'sin x', () => { current = 'sin'; });
            const btnCos = VizEngine.createButton(controls, 'cos x', () => { current = 'cos'; });
            const btnTan = VizEngine.createButton(controls, 'tan x', () => { current = 'tan'; });

            const pt = viz.addDraggable('pt', 1, 0, viz.colors.orange, 8);

            function draw() {
              viz.clear();
              viz.drawGrid();
              viz.drawAxes();

              const sel = fns[current];
              const fFn = sel.f;
              const fpFn = sel.fp;

              // Draw function
              viz.drawFunction(fFn, -7, 7, viz.colors.blue, 2.5);
              // Draw derivative
              viz.drawFunction(fpFn, -7, 7, viz.colors.teal, 2);

              // Tangent at draggable point
              const a = pt.x;
              const fa = fFn(a);
              const slope = fpFn(a);

              if (isFinite(fa) && isFinite(slope) && Math.abs(fa) < 20) {
                pt.y = fa;
                const dx = 1;
                viz.drawSegment(a - dx, fa - slope * dx, a + dx, fa + slope * dx, viz.colors.orange, 1.5, true);
                viz.drawPoint(a, fa, viz.colors.orange, null, 6);
                viz.screenText('slope = ' + slope.toFixed(3), 14, 56, viz.colors.orange, 12, 'left', 'top');
              }

              viz.screenText('f(x) = ' + sel.label, 14, 20, viz.colors.blue, 13, 'left', 'top');
              viz.screenText("f'(x) = " + sel.dlabel, 14, 38, viz.colors.teal, 13, 'left', 'top');

              viz.drawDraggables();
            }

            viz.animate(draw);
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'Differentiate \\(y = \\sin(5x) + \\cos(2x^2)\\).',
          hint: 'Apply the chain rule to each term separately.',
          solution: '\\(y\' = 5\\cos(5x) + (-\\sin(2x^2)) \\cdot 4x = 5\\cos(5x) - 4x\\sin(2x^2)\\).'
        },
        {
          question: 'Differentiate \\(y = \\sec^2(x)\\). (This means \\((\\sec x)^2\\).)',
          hint: 'Use the chain rule: outer function \\(u^2\\), inner function \\(\\sec x\\).',
          solution: '\\(y\' = 2\\sec x \\cdot \\sec x \\tan x = 2\\sec^2 x \\tan x\\).'
        },
        {
          question: 'Prove \\(\\frac{d}{dx}[\\csc x] = -\\csc x \\cot x\\) using the quotient rule on \\(\\csc x = \\frac{1}{\\sin x}\\).',
          hint: 'Apply the quotient rule with numerator 1 and denominator \\(\\sin x\\).',
          solution: '\\(\\frac{d}{dx}\\left[\\frac{1}{\\sin x}\\right] = \\frac{0 \\cdot \\sin x - 1 \\cdot \\cos x}{\\sin^2 x} = \\frac{-\\cos x}{\\sin^2 x} = -\\frac{1}{\\sin x} \\cdot \\frac{\\cos x}{\\sin x} = -\\csc x \\cot x\\).'
        }
      ]
    },

    // ─── SECTION 5 ────────────────────────────────────────────────────────────
    {
      id: 'ch04-sec05',
      title: '5. Derivatives of Exp & Log',
      content: `
<h2>指数与对数函数的导数 — Derivatives of Exponential & Logarithmic Functions</h2>

<p>
The natural exponential function \\(e^x\\) is extraordinary:
it is the <em>only</em> function (up to a constant multiple) that is its own derivative.
This self-reproducing property is why \\(e^x\\) appears everywhere in mathematics,
physics, and engineering.
</p>

<div class="definition">
  <strong>Exponential Derivatives</strong>
  \\[
    \\frac{d}{dx}[e^x] = e^x, \\qquad
    \\frac{d}{dx}[a^x] = a^x \\ln a \\quad (a > 0,\\; a \\neq 1).
  \\]
</div>

<div class="intuition">
  <strong>Why \\(e\\) is special:</strong>
  All exponential functions \\(a^x\\) grow proportionally to themselves.
  But the growth rate picks up a factor of \\(\\ln a\\).
  The unique base for which \\(\\ln a = 1\\) is \\(a = e \\approx 2.71828\\).
  That is why \\(e^x\\) is its own derivative — the scaling factor is exactly 1.
</div>

<div class="definition">
  <strong>Logarithmic Derivatives</strong>
  \\[
    \\frac{d}{dx}[\\ln x] = \\frac{1}{x}, \\qquad
    \\frac{d}{dx}[\\log_a x] = \\frac{1}{x \\ln a}.
  \\]
</div>

<h3>Proofs and Connections</h3>

<p><strong>Proof that \\(\\frac{d}{dx}[\\ln x] = \\frac{1}{x}\\):</strong></p>
<p>
Since \\(e^{\\ln x} = x\\), differentiate both sides:
\\[
  e^{\\ln x} \\cdot \\frac{d}{dx}[\\ln x] = 1 \\implies x \\cdot \\frac{d}{dx}[\\ln x] = 1 \\implies \\frac{d}{dx}[\\ln x] = \\frac{1}{x}.
\\]
</p>

<p><strong>Proof that \\(\\frac{d}{dx}[a^x] = a^x \\ln a\\):</strong></p>
<p>
Write \\(a^x = e^{x \\ln a}\\). By the chain rule:
\\[
  \\frac{d}{dx}[e^{x \\ln a}] = e^{x \\ln a} \\cdot \\ln a = a^x \\ln a.
\\]
</p>

<div class="example">
  <strong>Example 1</strong><br>
  \\(\\frac{d}{dx}[e^{3x^2}] = e^{3x^2} \\cdot 6x = 6x\\,e^{3x^2}\\) (chain rule).
</div>

<div class="example">
  <strong>Example 2</strong><br>
  \\(\\frac{d}{dx}[\\ln(x^2 + 1)] = \\frac{1}{x^2 + 1} \\cdot 2x = \\frac{2x}{x^2 + 1}\\) (chain rule).
</div>

<div class="example">
  <strong>Example 3</strong><br>
  \\(\\frac{d}{dx}[2^x] = 2^x \\ln 2\\).
</div>

<h3>Logarithmic Differentiation</h3>
<p>
For complicated products, quotients, and powers, <em>logarithmic differentiation</em>
is a powerful technique: take \\(\\ln\\) of both sides, differentiate using log rules,
then solve for \\(y'\\).
</p>

<div class="example">
  <strong>Example 4 — Logarithmic Differentiation</strong><br>
  Find \\(\\frac{d}{dx}[x^x]\\) for \\(x > 0\\).
  <br><br>
  Let \\(y = x^x\\). Take \\(\\ln\\): \\(\\ln y = x \\ln x\\).
  Differentiate both sides:
  \\[
    \\frac{y'}{y} = \\ln x + 1 \\implies y' = x^x(\\ln x + 1).
  \\]
</div>

<h3>Summary Table</h3>
<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
  <thead>
    <tr style="background:#1a1a40;">
      <th style="padding:8px;border:1px solid #30363d;color:#58a6ff;">Function</th>
      <th style="padding:8px;border:1px solid #30363d;color:#3fb9a0;">Derivative</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">\\(e^x\\)</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(e^x\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">\\(a^x\\)</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(a^x \\ln a\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\ln x\\)</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\dfrac{1}{x}\\)</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\log_a x\\)</td>
      <td style="padding:8px;border:1px solid #30363d;">\\(\\dfrac{1}{x \\ln a}\\)</td>
    </tr>
  </tbody>
</table>

<div class="viz-placeholder" data-viz="viz-exp-derivative"></div>

<div class="viz-placeholder" data-viz="viz-exp-base-compare"></div>
`,
      visualizations: [
        {
          id: 'viz-exp-derivative',
          title: '\\(e^x\\) Is Its Own Derivative',
          description: 'The function \\(f(x) = e^x\\) (blue) is plotted with its derivative \\(f\'(x) = e^x\\) (teal). They are the same curve! Drag the point to verify the slope equals the function value.',
          setup(container, controls) {
            const viz = new VizEngine(container, { scale: 30, originX: 200, originY: 300 });

            const pt = viz.addDraggable('pt', 1, 0, viz.colors.orange, 8);

            function draw() {
              viz.clear();
              viz.drawGrid();
              viz.drawAxes();

              const expFn = x => Math.exp(x);

              // Draw e^x (function and derivative are identical)
              viz.drawFunction(expFn, -7, 4, viz.colors.blue, 3);
              // Overlay derivative (same curve) slightly offset for visibility
              viz.drawFunction(expFn, -7, 4, viz.colors.teal, 1.5);

              const a = pt.x;
              const fa = Math.exp(a);
              if (isFinite(fa) && fa < 50) {
                pt.y = fa;
                const slope = fa; // derivative equals function!

                const dx = 1.5;
                viz.drawSegment(a - dx, fa - slope * dx, a + dx, fa + slope * dx, viz.colors.orange, 1.5, true);
                viz.drawPoint(a, fa, viz.colors.orange, null, 6);

                viz.screenText('f(' + a.toFixed(2) + ') = ' + fa.toFixed(3), 14, 56, viz.colors.white, 12, 'left', 'top');
                viz.screenText("f'(" + a.toFixed(2) + ') = ' + slope.toFixed(3), 14, 74, viz.colors.orange, 12, 'left', 'top');
                viz.screenText('They are equal!', 14, 92, viz.colors.green, 12, 'left', 'top');
              }

              viz.screenText('f(x) = e^x', 14, 20, viz.colors.blue, 13, 'left', 'top');
              viz.screenText("f'(x) = e^x (same!)", 14, 38, viz.colors.teal, 13, 'left', 'top');

              viz.drawDraggables();
            }

            viz.animate(draw);
            return viz;
          }
        },
        {
          id: 'viz-exp-base-compare',
          title: 'Comparing \\(a^x\\) for Different Bases',
          description: 'Adjust the base \\(a\\) and see how the derivative \\(a^x \\ln a\\) changes. When \\(a = e \\approx 2.718\\), the derivative curve matches the function exactly.',
          setup(container, controls) {
            const viz = new VizEngine(container, { scale: 30, originX: 200, originY: 300 });

            let base = Math.E;
            VizEngine.createSlider(controls, 'base a', 0.5, 5, base, 0.1, v => { base = v; });

            const pt = viz.addDraggable('pt', 1, 0, viz.colors.orange, 8);

            function draw() {
              viz.clear();
              viz.drawGrid();
              viz.drawAxes();

              const fn = x => Math.pow(base, x);
              const dfn = x => Math.pow(base, x) * Math.log(base);

              viz.drawFunction(fn, -6, 5, viz.colors.blue, 2.5);
              viz.drawFunction(dfn, -6, 5, viz.colors.teal, 2);

              const a = pt.x;
              const fa = fn(a);
              const slope = dfn(a);
              if (isFinite(fa) && fa < 50 && isFinite(slope)) {
                pt.y = fa;
                const dx = 1.2;
                viz.drawSegment(a - dx, fa - slope * dx, a + dx, fa + slope * dx, viz.colors.orange, 1.5, true);
                viz.drawPoint(a, fa, viz.colors.orange, null, 6);
              }

              viz.screenText('f(x) = ' + base.toFixed(2) + '^x', 14, 20, viz.colors.blue, 13, 'left', 'top');
              viz.screenText("f'(x) = " + base.toFixed(2) + '^x * ln(' + base.toFixed(2) + ')', 14, 38, viz.colors.teal, 13, 'left', 'top');
              viz.screenText('ln(' + base.toFixed(2) + ') = ' + Math.log(base).toFixed(4), 14, 56, viz.colors.yellow, 12, 'left', 'top');

              if (Math.abs(base - Math.E) < 0.15) {
                viz.screenText('base ~ e: derivative = function!', 14, 74, viz.colors.green, 12, 'left', 'top');
              }

              viz.drawDraggables();
            }

            viz.animate(draw);
            return viz;
          }
        }
      ],
      exercises: [
        {
          question: 'Differentiate \\(f(x) = e^{-x^2}\\).',
          hint: 'Chain rule: outer = \\(e^u\\), inner = \\(u = -x^2\\).',
          solution: '\\(f\'(x) = e^{-x^2} \\cdot (-2x) = -2x\\,e^{-x^2}\\). This is related to the Gaussian bell curve.'
        },
        {
          question: 'Differentiate \\(g(x) = x^3 \\ln x\\).',
          hint: 'Product rule: \\((x^3)\' \\ln x + x^3 (\\ln x)\'\\).',
          solution: '\\(g\'(x) = 3x^2 \\ln x + x^3 \\cdot \\frac{1}{x} = 3x^2 \\ln x + x^2 = x^2(3\\ln x + 1)\\).'
        },
        {
          question: 'Find \\(\\frac{d}{dx}[3^{2x}]\\).',
          hint: 'Write as \\(3^{2x} = (3^2)^x = 9^x\\), or use chain rule on \\(a^u\\) with \\(a = 3\\), \\(u = 2x\\).',
          solution: '\\(\\frac{d}{dx}[3^{2x}] = 3^{2x} \\cdot \\ln 3 \\cdot 2 = 2\\ln 3 \\cdot 3^{2x} = 2\\ln 3 \\cdot 9^x\\).'
        },
        {
          question: 'Use logarithmic differentiation to find \\(\\frac{d}{dx}[x^{\\sin x}]\\) for \\(x > 0\\).',
          hint: 'Let \\(y = x^{\\sin x}\\). Take \\(\\ln\\) of both sides: \\(\\ln y = \\sin x \\cdot \\ln x\\). Differentiate implicitly.',
          solution: '\\(\\frac{y\'}{y} = \\cos x \\cdot \\ln x + \\sin x \\cdot \\frac{1}{x}\\), so \\(y\' = x^{\\sin x}\\left(\\cos x \\cdot \\ln x + \\frac{\\sin x}{x}\\right)\\).'
        }
      ]
    }

  ]
});
