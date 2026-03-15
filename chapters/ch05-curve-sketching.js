window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
  id: 'ch05',
  number: 5,
  title: 'Applications I — Curve Sketching',
  subtitle: 'Using derivatives to understand function behavior: monotonicity, extrema, concavity, and the Mean Value Theorem',
  sections: [

    // ═══════════════════════════════════════════════════════════════════════════
    // SECTION 1: Increasing/Decreasing & First Derivative Test
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: 'ch05-sec01',
      title: '1. Increasing/Decreasing & First Derivative Test',
      content: `
<div class="env-block intuition">
<strong>From Differentiation Rules to Curve Analysis.</strong>
In Chapter 4, we built a powerful toolkit: the power, product, quotient, and chain rules let us differentiate virtually any function we encounter. This chapter puts those tools to work. The first derivative reveals where a function increases or decreases, and the second derivative reveals concavity. Together, they let us sketch accurate graphs without plotting points. By the end of this chapter, you will be able to read a formula and see its shape.
</div>

<h2>Increasing/Decreasing & First Derivative Test</h2>

<div class="env-block intuition">
<strong>Section Roadmap.</strong>
We begin with the most direct application of the derivative: determining where a function goes up and where it goes down. We will define critical points, then state the First Derivative Test, which classifies each critical point as a local maximum, local minimum, or neither.
</div>

<p>
The derivative tells us about the <em>rate of change</em> of a function. When this rate is positive,
the function is climbing; when negative, it is falling. This simple observation is the foundation
of curve analysis.
</p>

<div class="theorem">
  <strong>Theorem (Increasing/Decreasing Test)</strong><br>
  Let \\(f\\) be continuous on \\([a, b]\\) and differentiable on \\((a, b)\\).
  <ul>
    <li>If \\(f'(x) > 0\\) for all \\(x \\in (a, b)\\), then \\(f\\) is <strong>strictly increasing</strong> on \\([a, b]\\).</li>
    <li>If \\(f'(x) < 0\\) for all \\(x \\in (a, b)\\), then \\(f\\) is <strong>strictly decreasing</strong> on \\([a, b]\\).</li>
    <li>If \\(f'(x) = 0\\) for all \\(x \\in (a, b)\\), then \\(f\\) is <strong>constant</strong> on \\([a, b]\\).</li>
  </ul>
</div>

<div class="proof">
  <strong>Proof (sketch).</strong> Suppose \\(f'(x) > 0\\) for all \\(x \\in (a, b)\\). Pick any \\(x_1 < x_2\\) in \\([a, b]\\).
  By the Mean Value Theorem (Section 5), there exists \\(c \\in (x_1, x_2)\\) with
  \\[ f(x_2) - f(x_1) = f'(c)(x_2 - x_1). \\]
  Since \\(f'(c) > 0\\) and \\(x_2 - x_1 > 0\\), we get \\(f(x_2) > f(x_1)\\). \\(\\square\\)
</div>

<div class="intuition">
  <strong>Intuition:</strong> Think of \\(f'(x)\\) as the slope of the road you are driving on.
  Positive slope means you are going uphill; negative slope means downhill. The sign chart
  of \\(f'\\) is a complete road profile.
</div>

<h3>Critical Points</h3>

<div class="definition">
  <strong>Definition.</strong> A number \\(c\\) in the domain of \\(f\\) is a <strong>critical point</strong> if
  \\(f'(c) = 0\\) or \\(f'(c)\\) does not exist.
</div>

<p>
Critical points are the <em>only</em> places where \\(f\\) can change from increasing to decreasing (or vice versa).
To find intervals of increase and decrease:
</p>
<ol>
  <li>Find all critical points of \\(f\\).</li>
  <li>Use the critical points to divide the domain into intervals.</li>
  <li>Test the sign of \\(f'\\) in each interval.</li>
</ol>

<h3>The First Derivative Test</h3>

<div class="theorem">
  <strong>Theorem (First Derivative Test).</strong> Suppose \\(c\\) is a critical point of a continuous function \\(f\\).
  <ul>
    <li>If \\(f'\\) changes from <strong>positive to negative</strong> at \\(c\\), then \\(f(c)\\) is a <strong>local maximum</strong>.</li>
    <li>If \\(f'\\) changes from <strong>negative to positive</strong> at \\(c\\), then \\(f(c)\\) is a <strong>local minimum</strong>.</li>
    <li>If \\(f'\\) does <strong>not change sign</strong> at \\(c\\), then \\(f(c)\\) is <strong>neither</strong> a local max nor a local min.</li>
  </ul>
</div>

<div class="example">
  <strong>Example 1.</strong> Find the intervals of increase/decrease and local extrema of \\(f(x) = x^3 - 3x + 1\\).
  <br><br>
  <strong>Solution.</strong> \\(f'(x) = 3x^2 - 3 = 3(x-1)(x+1)\\).
  <br>
  Critical points: \\(x = -1\\) and \\(x = 1\\).
  <br><br>
  Sign chart of \\(f'\\):
  <table style="width:100%;border-collapse:collapse;margin:0.5rem 0;">
    <tr style="background:#1a1a40;">
      <th style="padding:6px;border:1px solid #30363d;">Interval</th>
      <th style="padding:6px;border:1px solid #30363d;">\\((-\\infty, -1)\\)</th>
      <th style="padding:6px;border:1px solid #30363d;">\\((-1, 1)\\)</th>
      <th style="padding:6px;border:1px solid #30363d;">\\((1, \\infty)\\)</th>
    </tr>
    <tr>
      <td style="padding:6px;border:1px solid #30363d;">Sign of \\(f'\\)</td>
      <td style="padding:6px;border:1px solid #30363d;color:#3fb950;">+</td>
      <td style="padding:6px;border:1px solid #30363d;color:#f85149;">&minus;</td>
      <td style="padding:6px;border:1px solid #30363d;color:#3fb950;">+</td>
    </tr>
    <tr>
      <td style="padding:6px;border:1px solid #30363d;">\\(f\\)</td>
      <td style="padding:6px;border:1px solid #30363d;">increasing</td>
      <td style="padding:6px;border:1px solid #30363d;">decreasing</td>
      <td style="padding:6px;border:1px solid #30363d;">increasing</td>
    </tr>
  </table>
  By the First Derivative Test:
  <ul>
    <li>\\(f(-1) = 3\\) is a <strong>local maximum</strong>.</li>
    <li>\\(f(1) = -1\\) is a <strong>local minimum</strong>.</li>
  </ul>
</div>

<div class="example">
  <strong>Example 2.</strong> Let \\(f(x) = x^{2/3}\\). Then \\(f'(x) = \\frac{2}{3} x^{-1/3}\\), which is undefined at \\(x = 0\\).
  Since \\(f'\\) changes from negative to positive at \\(x = 0\\), the point \\((0, 0)\\) is a local minimum,
  even though \\(f'(0)\\) does not exist (a cusp).
</div>
`,
      visualizations: [
        {
          id: 'viz-inc-dec-explorer',
          title: 'Increasing/Decreasing Explorer',
          setup(container) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'padding:12px;';
            container.appendChild(wrap);

            const viz = new VizEngine(wrap, { width: 700, height: 400, scale: 50, originX: 350, originY: 260 });
            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            // f(x) = x^3 - 3x + 1
            const f = x => x * x * x - 3 * x + 1;
            const fp = x => 3 * x * x - 3;

            let showDerivative = true;

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              // Shade increasing (green) and decreasing (red) regions
              viz.shadeUnder(x => 5, -4, -1, '#3fb95018');
              viz.shadeUnder(x => 5, -1, 1, '#f8514918');
              viz.shadeUnder(x => 5, 1, 4, '#3fb95018');

              // Draw f
              viz.drawFunction(f, -3.5, 3.5, viz.colors.blue, 2.5);

              // Draw f'
              if (showDerivative) {
                viz.drawFunction(fp, -3.5, 3.5, viz.colors.orange, 2, 200);
              }

              // Mark critical points
              viz.drawPoint(-1, f(-1), viz.colors.red, 'local max (-1, 3)', 6);
              viz.drawPoint(1, f(1), viz.colors.green, 'local min (1, -1)', 6);

              // Mark zeros of f'
              if (showDerivative) {
                viz.drawPoint(-1, fp(-1), viz.colors.orange, null, 4);
                viz.drawPoint(1, fp(1), viz.colors.orange, null, 4);
              }

              // Labels
              viz.screenText("f(x) = x\u00B3 - 3x + 1", 150, 20, viz.colors.blue, 14, 'center');
              if (showDerivative) {
                viz.screenText("f'(x) = 3x\u00B2 - 3", 550, 20, viz.colors.orange, 14, 'center');
              }
              viz.screenText("increasing", 85, 85, viz.colors.green, 12, 'center');
              viz.screenText("decreasing", 350, 85, viz.colors.red, 12, 'center');
              viz.screenText("increasing", 600, 85, viz.colors.green, 12, 'center');
            }

            draw();

            VizEngine.createButton(controls, "Toggle f'(x)", () => {
              showDerivative = !showDerivative;
              draw();
            });

            return viz;
          }
        },
        {
          id: 'viz-first-derivative-test',
          title: 'First Derivative Test — Interactive',
          setup(container) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'padding:12px;';
            container.appendChild(wrap);

            const viz = new VizEngine(wrap, { width: 700, height: 400, scale: 40, originX: 350, originY: 200 });
            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            let a = 1;
            let b = -2;

            function f(x) { return a * x * x * x + b * x; }
            function fp(x) { return 3 * a * x * x + b; }

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              viz.drawFunction(f, -4, 4, viz.colors.blue, 2.5);
              viz.drawFunction(fp, -4, 4, viz.colors.orange, 2);

              // Find critical points: 3a x^2 + b = 0 => x = sqrt(-b/(3a))
              var disc = -b / (3 * a);
              if (disc > 0) {
                var c1 = -Math.sqrt(disc);
                var c2 = Math.sqrt(disc);
                viz.drawPoint(c1, f(c1), viz.colors.red, 'max', 6);
                viz.drawPoint(c2, f(c2), viz.colors.green, 'min', 6);
                viz.drawSegment(c1, f(c1), c1, 0, viz.colors.red, 1, true);
                viz.drawSegment(c2, f(c2), c2, 0, viz.colors.green, 1, true);
              }

              viz.screenText('f(x) = ax\u00B3 + bx', 150, 20, viz.colors.blue, 14, 'center');
              viz.screenText("f'(x) = 3ax\u00B2 + b", 550, 20, viz.colors.orange, 14, 'center');
            }

            draw();

            VizEngine.createSlider(controls, 'a', -2, 2, a, 0.1, v => { a = v; draw(); });
            VizEngine.createSlider(controls, 'b', -4, 4, b, 0.1, v => { b = v; draw(); });

            return viz;
          }
        }
      ],
      exercises: [
        {
          id: 'ch05-ex01',
          type: 'multiple-choice',
          question: 'If f\'(x) > 0 for all x in (a, b), then f is ___ on [a, b].',
          options: ['Strictly increasing', 'Strictly decreasing', 'Constant', 'Cannot determine'],
          answer: 0,
          explanation: 'By the Increasing/Decreasing Test, a positive derivative on an interval means the function is strictly increasing there.'
        },
        {
          id: 'ch05-ex02',
          type: 'multiple-choice',
          question: 'Find the critical points of f(x) = 2x\u00B3 - 9x\u00B2 + 12x - 3.',
          options: ['x = 1 and x = 2', 'x = 0 and x = 3', 'x = -1 and x = 2', 'x = 1 and x = 3'],
          answer: 0,
          explanation: 'f\'(x) = 6x\u00B2 - 18x + 12 = 6(x\u00B2 - 3x + 2) = 6(x - 1)(x - 2). Setting f\'(x) = 0 gives x = 1 and x = 2.'
        },
        {
          id: 'ch05-ex03',
          type: 'multiple-choice',
          question: 'For f(x) = x\u00B3 - 3x + 1, what type of extremum is at x = -1?',
          options: ['Local maximum', 'Local minimum', 'Neither', 'Global minimum'],
          answer: 0,
          explanation: 'f\'(x) = 3x\u00B2 - 3 = 3(x+1)(x-1). At x = -1, f\' changes from positive (left) to negative (right), so by the First Derivative Test, x = -1 is a local maximum with f(-1) = 3.'
        },
        {
          id: 'ch05-ex04',
          type: 'multiple-choice',
          question: 'If f\'(c) = 0 but f\' does not change sign at c, what can we conclude?',
          options: ['f(c) is a local max', 'f(c) is a local min', 'f(c) is neither a local max nor local min', 'f is not differentiable at c'],
          answer: 2,
          explanation: 'If f\' does not change sign at c, then c is not a local extremum. For example, f(x) = x\u00B3 has f\'(0) = 0 but x = 0 is neither a max nor a min (the derivative is non-negative on both sides).'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SECTION 2: Concavity & Second Derivative Test
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: 'ch05-sec02',
      title: '2. Concavity & Second Derivative Test',
      content: `
<h2>Concavity & Second Derivative Test</h2>

<div class="env-block intuition">
<strong>Section Roadmap.</strong>
The first derivative told us <em>where</em> a function rises and falls. Now we ask a subtler question: <em>how</em> does it rise or fall? A function can increase while bending upward (like a rocket gaining speed) or increase while bending downward (like a car approaching its top speed). The second derivative captures this distinction, and the Second Derivative Test gives us a quick way to classify critical points without building a full sign chart.
</div>

<p>
<strong>Connection to Section 1.</strong> Recall that the First Derivative Test required us to check the sign of \\(f'\\) on both sides of a critical point. The Second Derivative Test offers a shortcut: if \\(f'(c) = 0\\), we can often determine the nature of the critical point by evaluating \\(f''(c)\\) alone.
</p>

<p>
The first derivative tells us whether a function is increasing or decreasing. The <strong>second derivative</strong>
tells us <em>how</em> it increases or decreases — whether the curve bends upward or downward.
</p>

<div class="definition">
  <strong>Definition (Concavity).</strong> Let \\(f\\) be differentiable on an interval \\(I\\).
  <ul>
    <li>\\(f\\) is <strong>concave up</strong> on \\(I\\) if \\(f'\\) is increasing on \\(I\\).
      Equivalently, the graph of \\(f\\) lies above all of its tangent lines on \\(I\\).</li>
    <li>\\(f\\) is <strong>concave down</strong> on \\(I\\) if \\(f'\\) is decreasing on \\(I\\).
      Equivalently, the graph of \\(f\\) lies below all of its tangent lines on \\(I\\).</li>
  </ul>
</div>

<div class="theorem">
  <strong>Concavity Test.</strong> Let \\(f\\) be twice differentiable on an interval \\(I\\).
  <ul>
    <li>If \\(f''(x) > 0\\) for all \\(x \\in I\\), then \\(f\\) is <strong>concave up</strong> on \\(I\\).</li>
    <li>If \\(f''(x) < 0\\) for all \\(x \\in I\\), then \\(f\\) is <strong>concave down</strong> on \\(I\\).</li>
  </ul>
</div>

<div class="intuition">
  <strong>Intuition:</strong> Concave up means the curve "holds water" like a bowl. Concave down means it
  "sheds water" like an upside-down bowl. The second derivative measures the rate of change of the slope:
  \\(f'' > 0\\) means the slope itself is increasing (the curve bends upward).
</div>

<h3>The Second Derivative Test</h3>

<div class="theorem">
  <strong>Theorem (Second Derivative Test).</strong> Suppose \\(f''\\) is continuous near \\(c\\) and \\(f'(c) = 0\\).
  <ul>
    <li>If \\(f''(c) > 0\\), then \\(f(c)\\) is a <strong>local minimum</strong>.</li>
    <li>If \\(f''(c) < 0\\), then \\(f(c)\\) is a <strong>local maximum</strong>.</li>
    <li>If \\(f''(c) = 0\\), the test is <strong>inconclusive</strong> — use the First Derivative Test instead.</li>
  </ul>
</div>

<div class="proof">
  <strong>Proof (for local min case).</strong> If \\(f'(c) = 0\\) and \\(f''(c) > 0\\), then since \\(f''\\) is
  continuous there is an interval \\((c - \\delta, c + \\delta)\\) where \\(f'' > 0\\), meaning \\(f'\\) is
  increasing. Since \\(f'(c) = 0\\) and \\(f'\\) is increasing: \\(f'(x) < 0\\) for \\(x\\) just left of \\(c\\)
  and \\(f'(x) > 0\\) for \\(x\\) just right of \\(c\\). By the First Derivative Test, \\(c\\) is a local minimum. \\(\\square\\)
</div>

<div class="example">
  <strong>Example 1.</strong> Apply the Second Derivative Test to \\(f(x) = x^4 - 4x^3 + 6\\).
  <br><br>
  <strong>Solution.</strong> \\(f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3)\\).
  <br>
  Critical points: \\(x = 0\\) and \\(x = 3\\).
  <br>
  \\(f''(x) = 12x^2 - 24x = 12x(x - 2)\\).
  <ul>
    <li>At \\(x = 3\\): \\(f''(3) = 12 \\cdot 3 \\cdot 1 = 36 > 0\\) \\(\\Rightarrow\\) <strong>local minimum</strong> at \\((3, -21)\\).</li>
    <li>At \\(x = 0\\): \\(f''(0) = 0\\) \\(\\Rightarrow\\) <strong>inconclusive</strong>. By the First Derivative Test, \\(f'\\) does not change sign at \\(x = 0\\) (negative on both sides), so \\(x = 0\\) is <strong>neither</strong> a max nor a min.</li>
  </ul>
</div>

<div class="warning">
  <strong>Common Mistake:</strong> When the Second Derivative Test gives \\(f''(c) = 0\\), do <em>not</em> conclude
  that \\(c\\) is an inflection point! It could be a flat extremum (like \\(x^4\\) at 0) or an inflection point (like \\(x^3\\) at 0).
  Always fall back to the First Derivative Test.
</div>
`,
      visualizations: [
        {
          id: 'viz-concavity-demo',
          title: 'Concavity & Tangent Lines',
          setup(container) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'padding:12px;';
            container.appendChild(wrap);

            const viz = new VizEngine(wrap, { width: 700, height: 400, scale: 40, originX: 350, originY: 220 });
            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            let xPos = 0;
            const f = x => 0.15 * x * x * x * x - 0.8 * x * x + 1;
            const fp = x => 0.6 * x * x * x - 1.6 * x;
            const fpp = x => 1.8 * x * x - 1.6;

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              // Shade concave up / concave down regions
              // f'' = 0 when x^2 = 1.6/1.8 => x = +/- sqrt(8/9) ~ +/- 0.943
              var inflPt = Math.sqrt(1.6 / 1.8);
              viz.shadeUnder(function() { return 6; }, -4, -inflPt, '#f8514918');
              viz.shadeUnder(function() { return 6; }, -inflPt, inflPt, '#3fb95018');
              viz.shadeUnder(function() { return 6; }, inflPt, 4, '#f8514918');

              viz.drawFunction(f, -3.5, 3.5, viz.colors.blue, 2.5);

              // Draw tangent line at xPos
              var yVal = f(xPos);
              var slope = fp(xPos);
              var tangent = function(x) { return yVal + slope * (x - xPos); };
              viz.drawFunction(tangent, xPos - 2, xPos + 2, viz.colors.yellow, 1.5);
              viz.drawPoint(xPos, yVal, viz.colors.yellow, null, 6);

              // Concavity indicator
              var curv = fpp(xPos);
              var curvLabel = curv > 0.01 ? 'Concave UP (f\'\' > 0)' : (curv < -0.01 ? 'Concave DOWN (f\'\' < 0)' : 'Inflection (f\'\' = 0)');
              var curvColor = curv > 0.01 ? viz.colors.green : (curv < -0.01 ? viz.colors.red : viz.colors.yellow);
              viz.screenText(curvLabel, 350, 20, curvColor, 14, 'center');
              viz.screenText('f(x) = 0.15x\u2074 - 0.8x\u00B2 + 1', 350, 385, viz.colors.blue, 12, 'center');
            }

            draw();

            VizEngine.createSlider(controls, 'x', -3.5, 3.5, xPos, 0.05, v => { xPos = v; draw(); });

            return viz;
          }
        },
        {
          id: 'viz-second-derivative-test',
          title: 'Second Derivative Test Visualizer',
          setup(container) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'padding:12px;';
            container.appendChild(wrap);

            const viz = new VizEngine(wrap, { width: 700, height: 420, scale: 30, originX: 350, originY: 280 });
            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            // f(x) = x^4 - 4x^3 + 6
            var f = function(x) { return x * x * x * x - 4 * x * x * x + 6; };
            var fp = function(x) { return 4 * x * x * x - 12 * x * x; };
            var fpp = function(x) { return 12 * x * x - 24 * x; };

            var showFp = true;
            var showFpp = true;

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              // f
              viz.drawFunction(f, -1.5, 4.5, viz.colors.blue, 2.5);

              // f'
              if (showFp) {
                viz.drawFunction(fp, -1.5, 4.5, viz.colors.orange, 2);
              }

              // f''
              if (showFpp) {
                viz.drawFunction(fpp, -1.5, 4.5, viz.colors.purple, 2);
              }

              // Critical points of f: x=0 and x=3
              viz.drawPoint(0, f(0), viz.colors.teal, 'x=0: f\'\'=0 (inconclusive)', 5);
              viz.drawPoint(3, f(3), viz.colors.green, 'x=3: f\'\'>0 (local min)', 5);

              // Labels
              viz.screenText('f(x) = x\u2074 - 4x\u00B3 + 6', 130, 20, viz.colors.blue, 13, 'center');
              if (showFp) viz.screenText("f'(x)", 530, 20, viz.colors.orange, 13, 'center');
              if (showFpp) viz.screenText("f''(x)", 620, 20, viz.colors.purple, 13, 'center');
            }

            draw();

            VizEngine.createButton(controls, "Toggle f'", function() { showFp = !showFp; draw(); });
            VizEngine.createButton(controls, "Toggle f''", function() { showFpp = !showFpp; draw(); });

            return viz;
          }
        }
      ],
      exercises: [
        {
          id: 'ch05-ex05',
          type: 'multiple-choice',
          question: 'If f\'\'(x) > 0 on an interval I, the graph of f on I is:',
          options: ['Concave up', 'Concave down', 'Linear', 'Increasing'],
          answer: 0,
          explanation: 'A positive second derivative means the first derivative is increasing, which corresponds to the graph being concave up.'
        },
        {
          id: 'ch05-ex06',
          type: 'multiple-choice',
          question: 'For f(x) = x\u00B3 - 6x\u00B2 + 9x + 1, the Second Derivative Test at x = 1 gives:',
          options: ['Local minimum', 'Local maximum', 'Inconclusive', 'Not a critical point'],
          answer: 1,
          explanation: 'f\'(x) = 3x\u00B2 - 12x + 9 = 3(x-1)(x-3), so x = 1 is a critical point. f\'\'(x) = 6x - 12, so f\'\'(1) = -6 < 0, indicating a local maximum.'
        },
        {
          id: 'ch05-ex07',
          type: 'multiple-choice',
          question: 'For f(x) = x\u2074, what does the Second Derivative Test tell us at x = 0?',
          options: ['Local min', 'Local max', 'Inconclusive (f\'\'(0) = 0)', 'Inflection point'],
          answer: 2,
          explanation: 'f\'(x) = 4x\u00B3 so f\'(0) = 0. f\'\'(x) = 12x\u00B2 so f\'\'(0) = 0: the test is inconclusive. (In fact, x = 0 is a local min by the First Derivative Test, since f\' changes from negative to positive.)'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SECTION 3: Inflection Points
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: 'ch05-sec03',
      title: '3. Inflection Points',
      content: `
<h2>Inflection Points</h2>

<div class="env-block intuition">
<strong>Section Roadmap.</strong>
In Section 2 we studied concavity on entire intervals. Now we zoom in on the boundary between concave-up and concave-down regions. These boundaries, called inflection points, are where the curvature direction reverses. Identifying them completes our toolkit for describing a curve's shape.
</div>

<p>
<strong>Connection to Section 2.</strong> The concavity test told us that \\(f'' > 0\\) means concave up and \\(f'' < 0\\) means concave down. An inflection point is precisely where \\(f''\\) changes sign, transitioning the curve from one type of bending to the other.
</p>

<p>
An inflection point is where the concavity of a function changes. These are among the most
important features of a curve, marking the transition between "bending up" and "bending down."
</p>

<div class="definition">
  <strong>Definition.</strong> A point \\(P = (c, f(c))\\) on the graph of \\(f\\) is an <strong>inflection point</strong>
  if \\(f\\) is continuous at \\(c\\) and the concavity of \\(f\\) changes at \\(c\\)
  (from concave up to concave down, or vice versa).
</div>

<div class="theorem">
  <strong>Finding Inflection Points.</strong>
  <ol>
    <li>Compute \\(f''(x)\\).</li>
    <li>Find all \\(c\\) where \\(f''(c) = 0\\) or \\(f''(c)\\) does not exist.</li>
    <li>Check that \\(f''\\) actually <strong>changes sign</strong> at \\(c\\). If it does, \\((c, f(c))\\) is an inflection point.</li>
  </ol>
</div>

<div class="warning">
  <strong>Important:</strong> \\(f''(c) = 0\\) alone does NOT guarantee an inflection point.
  For example, \\(f(x) = x^4\\) has \\(f''(0) = 0\\), but \\(f''\\) does not change sign at \\(x = 0\\)
  (it is positive on both sides). So \\((0, 0)\\) is NOT an inflection point.
</div>

<div class="example">
  <strong>Example 1.</strong> Find the inflection points of \\(f(x) = x^3 - 3x^2 + 2\\).
  <br><br>
  <strong>Solution.</strong>
  \\(f'(x) = 3x^2 - 6x\\), \\(f''(x) = 6x - 6 = 6(x - 1)\\).
  <br>
  \\(f''(x) = 0\\) at \\(x = 1\\).
  <br>
  Sign check: \\(f''(x) < 0\\) for \\(x < 1\\) (concave down) and \\(f''(x) > 0\\) for \\(x > 1\\) (concave up).
  <br>
  Since \\(f''\\) changes sign, \\((1, 0)\\) is an inflection point.
</div>

<div class="example">
  <strong>Example 2.</strong> Find the inflection points of \\(f(x) = x^4 - 6x^2\\).
  <br><br>
  <strong>Solution.</strong>
  \\(f'(x) = 4x^3 - 12x\\), \\(f''(x) = 12x^2 - 12 = 12(x^2 - 1) = 12(x-1)(x+1)\\).
  <br>
  \\(f''(x) = 0\\) at \\(x = \\pm 1\\).
  <br>
  Sign chart of \\(f''\\):
  <table style="width:100%;border-collapse:collapse;margin:0.5rem 0;">
    <tr style="background:#1a1a40;">
      <th style="padding:6px;border:1px solid #30363d;">Interval</th>
      <th style="padding:6px;border:1px solid #30363d;">\\((-\\infty, -1)\\)</th>
      <th style="padding:6px;border:1px solid #30363d;">\\((-1, 1)\\)</th>
      <th style="padding:6px;border:1px solid #30363d;">\\((1, \\infty)\\)</th>
    </tr>
    <tr>
      <td style="padding:6px;border:1px solid #30363d;">Sign of \\(f''\\)</td>
      <td style="padding:6px;border:1px solid #30363d;color:#3fb950;">+</td>
      <td style="padding:6px;border:1px solid #30363d;color:#f85149;">&minus;</td>
      <td style="padding:6px;border:1px solid #30363d;color:#3fb950;">+</td>
    </tr>
    <tr>
      <td style="padding:6px;border:1px solid #30363d;">Concavity</td>
      <td style="padding:6px;border:1px solid #30363d;">up</td>
      <td style="padding:6px;border:1px solid #30363d;">down</td>
      <td style="padding:6px;border:1px solid #30363d;">up</td>
    </tr>
  </table>
  Both \\(x = -1\\) and \\(x = 1\\) are inflection points: \\((-1, -5)\\) and \\((1, -5)\\).
</div>

<div class="intuition">
  <strong>Geometric Meaning:</strong> At an inflection point, the tangent line <em>crosses</em> the curve.
  Before the inflection, the curve is on one side of the tangent; after, it is on the other side.
  An inflection point is where the "curvature direction" reverses.
</div>
`,
      visualizations: [
        {
          id: 'viz-inflection-points',
          title: 'Inflection Points Explorer',
          setup(container) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'padding:12px;';
            container.appendChild(wrap);

            const viz = new VizEngine(wrap, { width: 700, height: 400, scale: 35, originX: 350, originY: 250 });
            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            // f(x) = x^4 - 6x^2
            var f = function(x) { return x * x * x * x - 6 * x * x; };
            var fp = function(x) { return 4 * x * x * x - 12 * x; };
            var fpp = function(x) { return 12 * x * x - 12; };

            var showTangent = true;
            var xT = 0;

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              // Shade concavity regions
              viz.shadeUnder(function() { return 8; }, -4, -1, '#3fb95015');
              viz.shadeUnder(function() { return 8; }, -1, 1, '#f8514915');
              viz.shadeUnder(function() { return 8; }, 1, 4, '#3fb95015');

              // Draw function
              viz.drawFunction(f, -3.2, 3.2, viz.colors.blue, 2.5);

              // Draw tangent at xT
              if (showTangent) {
                var yT = f(xT);
                var slope = fp(xT);
                var tangLine = function(x) { return yT + slope * (x - xT); };
                viz.drawFunction(tangLine, xT - 2.5, xT + 2.5, viz.colors.yellow, 1.5);
                viz.drawPoint(xT, yT, viz.colors.yellow, null, 5);
              }

              // Mark inflection points
              viz.drawPoint(-1, f(-1), viz.colors.purple, 'inflection (-1, -5)', 6);
              viz.drawPoint(1, f(1), viz.colors.purple, 'inflection (1, -5)', 6);

              // Concavity labels
              viz.screenText('concave up', 80, 30, viz.colors.green, 12, 'center');
              viz.screenText('concave down', 350, 30, viz.colors.red, 12, 'center');
              viz.screenText('concave up', 620, 30, viz.colors.green, 12, 'center');
              viz.screenText('f(x) = x\u2074 - 6x\u00B2', 350, 385, viz.colors.blue, 12, 'center');
            }

            draw();

            VizEngine.createSlider(controls, 'tangent at x', -3, 3, xT, 0.05, function(v) { xT = v; draw(); });
            VizEngine.createButton(controls, 'Toggle tangent', function() { showTangent = !showTangent; draw(); });

            return viz;
          }
        },
        {
          id: 'viz-fpp-sign-chart',
          title: 'f\'\' Sign Chart',
          setup(container) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'padding:12px;';
            container.appendChild(wrap);

            const viz = new VizEngine(wrap, { width: 700, height: 380, scale: 35, originX: 350, originY: 190 });

            // f(x) = x^3 - 3x^2 + 2
            var f = function(x) { return x * x * x - 3 * x * x + 2; };
            var fpp = function(x) { return 6 * x - 6; };

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              // Draw f
              viz.drawFunction(f, -2, 4, viz.colors.blue, 2.5);

              // Draw f'' (scaled for visibility)
              viz.drawFunction(fpp, -2, 4, viz.colors.purple, 2);

              // Shade f'' > 0 and f'' < 0 regions
              viz.shadeUnder(function() { return 6; }, -2, 1, '#f8514915');
              viz.shadeUnder(function() { return 6; }, 1, 4, '#3fb95015');

              // Inflection point
              viz.drawPoint(1, f(1), viz.colors.yellow, 'inflection (1, 0)', 6);
              viz.drawPoint(1, 0, viz.colors.purple, null, 4);

              // Labels
              viz.screenText('f(x) = x\u00B3 - 3x\u00B2 + 2', 150, 20, viz.colors.blue, 13, 'center');
              viz.screenText("f''(x) = 6x - 6", 550, 20, viz.colors.purple, 13, 'center');
              viz.screenText('f\'\' < 0: concave down', 160, 55, viz.colors.red, 11, 'center');
              viz.screenText('f\'\' > 0: concave up', 530, 55, viz.colors.green, 11, 'center');
            }

            draw();

            return viz;
          }
        }
      ],
      exercises: [
        {
          id: 'ch05-ex08',
          type: 'multiple-choice',
          question: 'Which condition is necessary for (c, f(c)) to be an inflection point?',
          options: ['f\'\'(c) = 0', 'f\'\'(c) does not exist', 'f\'\' changes sign at c', 'f\'(c) = 0'],
          answer: 2,
          explanation: 'An inflection point requires the concavity to actually change, i.e., f\'\' must change sign. The condition f\'\'(c) = 0 is necessary (if f\'\' exists at c) but not sufficient.'
        },
        {
          id: 'ch05-ex09',
          type: 'multiple-choice',
          question: 'How many inflection points does f(x) = x\u2074 - 6x\u00B2 have?',
          options: ['0', '1', '2', '4'],
          answer: 2,
          explanation: 'f\'\'(x) = 12x\u00B2 - 12 = 12(x-1)(x+1). f\'\' changes sign at x = -1 and x = 1, giving two inflection points.'
        },
        {
          id: 'ch05-ex10',
          type: 'multiple-choice',
          question: 'Does f(x) = x\u2074 have an inflection point at x = 0?',
          options: ['Yes, because f\'\'(0) = 0', 'No, because f\'\' does not change sign at x = 0', 'Yes, because f\'(0) = 0', 'Cannot determine'],
          answer: 1,
          explanation: 'f\'\'(x) = 12x\u00B2 which is non-negative everywhere. f\'\'(0) = 0 but f\'\' does not change sign (it is positive on both sides of 0), so there is no inflection point at x = 0.'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SECTION 4: Curve Sketching Strategy
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: 'ch05-sec04',
      title: '4. Curve Sketching Strategy',
      content: `
<h2>Curve Sketching Strategy</h2>

<div class="env-block intuition">
<strong>Section Roadmap.</strong>
Sections 1 through 3 gave us the individual tools: the first derivative for monotonicity and local extrema, the second derivative for concavity, and inflection points for curvature transitions. This section brings everything together into a systematic procedure. Given any function, you will be able to produce an accurate sketch by following a structured checklist.
</div>

<p>
<strong>Why this matters.</strong> Being able to sketch a curve by hand is not just an exercise; it builds the geometric intuition that underpins optimization, modeling, and applied analysis. Every time you look at a formula and "see" its shape, you are applying the ideas from this section.
</p>

<p>
We now have all the tools to sketch the graph of a function without a graphing calculator.
Here is the systematic procedure that combines everything from this chapter.
</p>

<div class="theorem">
  <strong>Curve Sketching Checklist:</strong>
  <ol>
    <li><strong>Domain:</strong> Find where \\(f(x)\\) is defined.</li>
    <li><strong>Intercepts:</strong> Find \\(y\\)-intercept \\(f(0)\\) and \\(x\\)-intercepts (solve \\(f(x) = 0\\)).</li>
    <li><strong>Symmetry:</strong> Is \\(f\\) even (\\(f(-x) = f(x)\\)), odd (\\(f(-x) = -f(x)\\)), or periodic?</li>
    <li><strong>Asymptotes:</strong> Find horizontal (\\(\\lim_{x \\to \\pm\\infty} f(x)\\)), vertical (where \\(f\\) blows up), and oblique asymptotes.</li>
    <li><strong>First Derivative:</strong> Find \\(f'(x)\\), critical points, intervals of increase/decrease, local extrema.</li>
    <li><strong>Second Derivative:</strong> Find \\(f''(x)\\), concavity intervals, inflection points.</li>
    <li><strong>Plot key points and sketch:</strong> Put it all together on a coordinate plane.</li>
  </ol>
</div>

<div class="example">
  <strong>Example: Sketch \\(f(x) = \\frac{x^2}{x^2 - 1}\\).</strong>
  <br><br>
  <strong>1. Domain:</strong> All \\(x \\neq \\pm 1\\). Domain: \\((-\\infty, -1) \\cup (-1, 1) \\cup (1, \\infty)\\).
  <br><br>
  <strong>2. Intercepts:</strong> \\(f(0) = 0\\) (origin). \\(f(x) = 0\\) only at \\(x = 0\\).
  <br><br>
  <strong>3. Symmetry:</strong> \\(f(-x) = \\frac{(-x)^2}{(-x)^2 - 1} = \\frac{x^2}{x^2 - 1} = f(x)\\). Even function — symmetric about the \\(y\\)-axis.
  <br><br>
  <strong>4. Asymptotes:</strong>
  <ul>
    <li>Vertical: \\(x = 1\\) and \\(x = -1\\) (denominator is zero).</li>
    <li>Horizontal: \\(\\lim_{x \\to \\pm\\infty} \\frac{x^2}{x^2 - 1} = 1\\). So \\(y = 1\\) is a horizontal asymptote.</li>
  </ul>
  <strong>5. First Derivative:</strong>
  \\[ f'(x) = \\frac{2x(x^2 - 1) - x^2 \\cdot 2x}{(x^2 - 1)^2} = \\frac{-2x}{(x^2 - 1)^2}. \\]
  Critical point: \\(x = 0\\).
  <ul>
    <li>\\(f'(x) > 0\\) for \\(x < 0\\) (where defined), so \\(f\\) increases on \\((-\\infty, -1)\\) and \\((-1, 0)\\).</li>
    <li>\\(f'(x) < 0\\) for \\(x > 0\\) (where defined), so \\(f\\) decreases on \\((0, 1)\\) and \\((1, \\infty)\\).</li>
    <li>\\(f(0) = 0\\) is a <strong>local maximum</strong> (on the interval \\((-1, 1)\\)).</li>
  </ul>
  <strong>6. Second Derivative:</strong> (computation omitted for brevity) shows concavity changes, confirming the shape.
  <br><br>
  <strong>7. Sketch:</strong> The graph has a local max at the origin, vertical asymptotes at \\(x = \\pm 1\\),
  and approaches \\(y = 1\\) from above as \\(x \\to \\pm\\infty\\).
</div>

<div class="intuition">
  <strong>Tip:</strong> You do not always need every step. For polynomials, there are no asymptotes or domain
  restrictions. For simple functions, symmetry might be obvious. Use the checklist as a guide, not a rigid recipe.
</div>
`,
      visualizations: [
        {
          id: 'viz-triple-panel',
          title: 'f / f\' / f\'\' Triple-Panel Linked Display',
          setup(container) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'padding:12px;';
            container.appendChild(wrap);

            // Create three canvases stacked
            var panelHeight = 180;

            var label1 = document.createElement('div');
            label1.style.cssText = 'color:#58a6ff;font-size:13px;font-weight:bold;margin-bottom:4px;';
            label1.textContent = 'f(x)';
            wrap.appendChild(label1);
            var wrap1 = document.createElement('div');
            wrap.appendChild(wrap1);
            var viz1 = new VizEngine(wrap1, { width: 700, height: panelHeight, scale: 35, originX: 350, originY: 110 });

            var label2 = document.createElement('div');
            label2.style.cssText = 'color:#f0883e;font-size:13px;font-weight:bold;margin:8px 0 4px;';
            label2.textContent = "f'(x)";
            wrap.appendChild(label2);
            var wrap2 = document.createElement('div');
            wrap.appendChild(wrap2);
            var viz2 = new VizEngine(wrap2, { width: 700, height: panelHeight, scale: 35, originX: 350, originY: 90 });

            var label3 = document.createElement('div');
            label3.style.cssText = 'color:#bc8cff;font-size:13px;font-weight:bold;margin:8px 0 4px;';
            label3.textContent = "f''(x)";
            wrap.appendChild(label3);
            var wrap3 = document.createElement('div');
            wrap.appendChild(wrap3);
            var viz3 = new VizEngine(wrap3, { width: 700, height: panelHeight, scale: 35, originX: 350, originY: 90 });

            var controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            // Default function: x^3 - 3x
            var funcChoice = 0;
            var funcs = [
              {
                name: 'x\u00B3 - 3x',
                f: function(x) { return x * x * x - 3 * x; },
                fp: function(x) { return 3 * x * x - 3; },
                fpp: function(x) { return 6 * x; },
                xMin: -3, xMax: 3
              },
              {
                name: 'x\u2074 - 4x\u00B2 + 1',
                f: function(x) { return x * x * x * x - 4 * x * x + 1; },
                fp: function(x) { return 4 * x * x * x - 8 * x; },
                fpp: function(x) { return 12 * x * x - 8; },
                xMin: -3, xMax: 3
              },
              {
                name: 'sin(x)',
                f: function(x) { return Math.sin(x); },
                fp: function(x) { return Math.cos(x); },
                fpp: function(x) { return -Math.sin(x); },
                xMin: -7, xMax: 7
              },
              {
                name: 'xe^(-x\u00B2/2)',
                f: function(x) { return x * Math.exp(-x * x / 2); },
                fp: function(x) { return (1 - x * x) * Math.exp(-x * x / 2); },
                fpp: function(x) { return (x * x * x - 3 * x) * Math.exp(-x * x / 2); },
                xMin: -4, xMax: 4
              }
            ];

            var xCursor = 0;

            function draw() {
              var fc = funcs[funcChoice];
              var f = fc.f, fp = fc.fp, fpp = fc.fpp;
              var xMin = fc.xMin, xMax = fc.xMax;

              // Panel 1: f(x)
              viz1.clear(); viz1.drawGrid(1); viz1.drawAxes();
              viz1.drawFunction(f, xMin, xMax, viz1.colors.blue, 2.5);
              // Vertical line at cursor
              viz1.drawSegment(xCursor, -10, xCursor, 10, viz1.colors.white + '44', 1, true);
              viz1.drawPoint(xCursor, f(xCursor), viz1.colors.yellow, null, 5);
              // Mark extrema (where f'=0)
              for (var x = xMin + 0.01; x < xMax; x += 0.01) {
                if (Math.abs(fp(x)) < 0.05) {
                  var prevSign = fp(x - 0.1);
                  var nextSign = fp(x + 0.1);
                  if (prevSign > 0 && nextSign < 0) {
                    viz1.drawPoint(x, f(x), viz1.colors.red, null, 4);
                  } else if (prevSign < 0 && nextSign > 0) {
                    viz1.drawPoint(x, f(x), viz1.colors.green, null, 4);
                  }
                  x += 0.2;
                }
              }

              // Panel 2: f'(x)
              viz2.clear(); viz2.drawGrid(1); viz2.drawAxes();
              // Shade positive/negative regions of f'
              for (var i = 0; i < 600; i++) {
                var xl = xMin + (xMax - xMin) * i / 600;
                var xr = xMin + (xMax - xMin) * (i + 1) / 600;
                var val = fp((xl + xr) / 2);
                if (val > 0) {
                  var s1 = viz2.toScreen(xl, 0);
                  var s2 = viz2.toScreen(xr, val);
                  viz2.ctx.fillStyle = '#3fb95022';
                  viz2.ctx.fillRect(s1[0], s2[1], s2[0] - s1[0], s1[1] - s2[1]);
                } else if (val < 0) {
                  var s1b = viz2.toScreen(xl, val);
                  var s2b = viz2.toScreen(xr, 0);
                  viz2.ctx.fillStyle = '#f8514922';
                  viz2.ctx.fillRect(s1b[0], s2b[1], s2b[0] - s1b[0], s1b[1] - s2b[1]);
                }
              }
              viz2.drawFunction(fp, xMin, xMax, viz2.colors.orange, 2.5);
              viz2.drawSegment(xCursor, -10, xCursor, 10, viz2.colors.white + '44', 1, true);
              viz2.drawPoint(xCursor, fp(xCursor), viz2.colors.yellow, null, 5);

              // Panel 3: f''(x)
              viz3.clear(); viz3.drawGrid(1); viz3.drawAxes();
              for (var j = 0; j < 600; j++) {
                var xl2 = xMin + (xMax - xMin) * j / 600;
                var xr2 = xMin + (xMax - xMin) * (j + 1) / 600;
                var val2 = fpp((xl2 + xr2) / 2);
                if (val2 > 0) {
                  var ss1 = viz3.toScreen(xl2, 0);
                  var ss2 = viz3.toScreen(xr2, val2);
                  viz3.ctx.fillStyle = '#3fb95022';
                  viz3.ctx.fillRect(ss1[0], ss2[1], ss2[0] - ss1[0], ss1[1] - ss2[1]);
                } else if (val2 < 0) {
                  var ss1b = viz3.toScreen(xl2, val2);
                  var ss2b = viz3.toScreen(xr2, 0);
                  viz3.ctx.fillStyle = '#f8514922';
                  viz3.ctx.fillRect(ss1b[0], ss2b[1], ss2b[0] - ss1b[0], ss1b[1] - ss2b[1]);
                }
              }
              viz3.drawFunction(fpp, xMin, xMax, viz3.colors.purple, 2.5);
              viz3.drawSegment(xCursor, -10, xCursor, 10, viz3.colors.white + '44', 1, true);
              viz3.drawPoint(xCursor, fpp(xCursor), viz3.colors.yellow, null, 5);

              // Info
              viz1.screenText('x = ' + xCursor.toFixed(2) + '  f = ' + f(xCursor).toFixed(2), 600, 15, viz1.colors.yellow, 11, 'right');
              viz2.screenText("f' = " + fp(xCursor).toFixed(2), 600, 15, viz2.colors.yellow, 11, 'right');
              viz3.screenText("f'' = " + fpp(xCursor).toFixed(2), 600, 15, viz3.colors.yellow, 11, 'right');
            }

            draw();

            VizEngine.createSlider(controls, 'x cursor', -4, 4, 0, 0.05, function(v) { xCursor = v; draw(); });
            VizEngine.createButton(controls, 'x\u00B3 - 3x', function() { funcChoice = 0; draw(); });
            VizEngine.createButton(controls, 'x\u2074 - 4x\u00B2 + 1', function() { funcChoice = 1; draw(); });
            VizEngine.createButton(controls, 'sin(x)', function() { funcChoice = 2; draw(); });
            VizEngine.createButton(controls, 'xe^(-x\u00B2/2)', function() { funcChoice = 3; draw(); });

            return viz1;
          }
        },
        {
          id: 'viz-curve-sketch-rational',
          title: 'Rational Function Sketch: x\u00B2/(x\u00B2-1)',
          setup(container) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'padding:12px;';
            container.appendChild(wrap);

            const viz = new VizEngine(wrap, { width: 700, height: 420, scale: 50, originX: 350, originY: 210 });

            var f = function(x) {
              var denom = x * x - 1;
              if (Math.abs(denom) < 0.001) return NaN;
              return (x * x) / denom;
            };

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              // Asymptotes
              viz.drawSegment(-1, -8, -1, 8, viz.colors.red + '88', 1.5, true);
              viz.drawSegment(1, -8, 1, 8, viz.colors.red + '88', 1.5, true);
              viz.drawSegment(-8, 1, 8, 1, viz.colors.teal + '88', 1.5, true);

              // Draw function in three pieces
              viz.drawFunction(f, -6, -1.05, viz.colors.blue, 2.5);
              viz.drawFunction(f, -0.95, 0.95, viz.colors.blue, 2.5);
              viz.drawFunction(f, 1.05, 6, viz.colors.blue, 2.5);

              // Local max at origin
              viz.drawPoint(0, 0, viz.colors.yellow, 'local max (0, 0)', 5);

              // Labels
              viz.screenText('x = -1', 110, 395, viz.colors.red, 11, 'center');
              viz.screenText('x = 1', 400, 395, viz.colors.red, 11, 'center');
              viz.screenText('y = 1', 660, 185, viz.colors.teal, 11, 'center');
              viz.screenText('f(x) = x\u00B2 / (x\u00B2 - 1)', 350, 15, viz.colors.blue, 13, 'center');
            }

            draw();

            return viz;
          }
        }
      ],
      exercises: [
        {
          id: 'ch05-ex11',
          type: 'multiple-choice',
          question: 'In the curve sketching procedure, which step comes first?',
          options: ['Find f\'(x)', 'Find the domain', 'Find inflection points', 'Find asymptotes'],
          answer: 1,
          explanation: 'Always start by determining the domain. You need to know where the function is defined before analyzing its behavior.'
        },
        {
          id: 'ch05-ex12',
          type: 'multiple-choice',
          question: 'f(x) = x\u00B2/(x\u00B2 - 1) has vertical asymptotes at:',
          options: ['x = 0', 'x = 1 only', 'x = -1 and x = 1', 'No vertical asymptotes'],
          answer: 2,
          explanation: 'The denominator x\u00B2 - 1 = (x-1)(x+1) is zero at x = -1 and x = 1, and the numerator is nonzero there, so both are vertical asymptotes.'
        },
        {
          id: 'ch05-ex13',
          type: 'multiple-choice',
          question: 'What is the horizontal asymptote of f(x) = x\u00B2/(x\u00B2 - 1)?',
          options: ['y = 0', 'y = 1', 'y = -1', 'No horizontal asymptote'],
          answer: 1,
          explanation: 'As x approaches infinity, x\u00B2/(x\u00B2 - 1) approaches 1 (divide numerator and denominator by x\u00B2). So y = 1 is the horizontal asymptote.'
        },
        {
          id: 'ch05-ex14',
          type: 'multiple-choice',
          question: 'If f(-x) = f(x) for all x, the function is:',
          options: ['Odd', 'Even', 'Periodic', 'Neither even nor odd'],
          answer: 1,
          explanation: 'The condition f(-x) = f(x) defines an even function. Its graph is symmetric about the y-axis.'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SECTION 5: Mean Value Theorem
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: 'ch05-sec05',
      title: '5. Mean Value Theorem',
      content: `
<h2>The Mean Value Theorem</h2>

<div class="env-block intuition">
<strong>Section Roadmap.</strong>
We close this chapter with the theoretical backbone behind everything we have done. The Increasing/Decreasing Test in Section 1 relied on the Mean Value Theorem (MVT), and we deferred its proof until now. The MVT connects the local information given by \\(f'(c)\\) at a single point to the global behavior of \\(f\\) over an interval. It is the reason we can draw conclusions about a function's shape from its derivative.
</div>

<p>
<strong>Connection to earlier sections.</strong> In Section 1, the proof that \\(f' > 0\\) implies \\(f\\) is increasing invoked the MVT. In Section 4, we used these monotonicity results as part of our curve-sketching checklist. Now we prove the MVT itself, completing the logical foundation of the chapter.
</p>

<p>
The Mean Value Theorem (MVT) is one of the most important theorems in calculus. It says that
for a "nice enough" function, there is always a point where the instantaneous rate of change
equals the average rate of change.
</p>

<h3>Rolle's Theorem</h3>

<div class="theorem">
  <strong>Theorem (Rolle's Theorem).</strong> If \\(f\\) is
  <ol>
    <li>continuous on \\([a, b]\\),</li>
    <li>differentiable on \\((a, b)\\), and</li>
    <li>\\(f(a) = f(b)\\),</li>
  </ol>
  then there exists at least one \\(c \\in (a, b)\\) such that \\(f'(c) = 0\\).
</div>

<div class="intuition">
  <strong>Intuition:</strong> If you start and end at the same height, you must have turned around
  somewhere — and at that turning point, the tangent line is horizontal.
</div>

<div class="proof">
  <strong>Proof (sketch).</strong> Since \\(f\\) is continuous on \\([a, b]\\), by the Extreme Value Theorem,
  \\(f\\) attains its maximum \\(M\\) and minimum \\(m\\) on \\([a, b]\\).
  <ul>
    <li>If \\(M = m\\), then \\(f\\) is constant and \\(f'(x) = 0\\) everywhere on \\((a, b)\\).</li>
    <li>If \\(M \\neq m\\), then at least one of \\(M, m\\) is attained at an interior point \\(c \\in (a, b)\\)
      (since \\(f(a) = f(b)\\), they cannot both be at endpoints unless \\(M = m\\)).
      At such \\(c\\), \\(f\\) has a local extremum and \\(f'(c) = 0\\) (by Fermat's Theorem). \\(\\square\\)</li>
  </ul>
</div>

<h3>The Mean Value Theorem</h3>

<div class="theorem">
  <strong>Theorem (Mean Value Theorem).</strong> If \\(f\\) is
  <ol>
    <li>continuous on \\([a, b]\\), and</li>
    <li>differentiable on \\((a, b)\\),</li>
  </ol>
  then there exists at least one \\(c \\in (a, b)\\) such that
  \\[ f'(c) = \\frac{f(b) - f(a)}{b - a}. \\]
</div>

<div class="proof">
  <strong>Proof.</strong> Consider the function
  \\[ g(x) = f(x) - \\left[ f(a) + \\frac{f(b) - f(a)}{b - a}(x - a) \\right]. \\]
  This subtracts the secant line from \\(f\\). Then \\(g(a) = 0\\) and \\(g(b) = 0\\),
  so by Rolle's Theorem, there exists \\(c \\in (a, b)\\) with \\(g'(c) = 0\\).
  Since \\(g'(x) = f'(x) - \\frac{f(b) - f(a)}{b - a}\\), we get
  \\(f'(c) = \\frac{f(b) - f(a)}{b - a}\\). \\(\\square\\)
</div>

<div class="intuition">
  <strong>Geometric Meaning:</strong> The secant line connecting \\((a, f(a))\\) and \\((b, f(b))\\)
  has slope \\(\\frac{f(b) - f(a)}{b - a}\\). The MVT guarantees that somewhere between \\(a\\) and \\(b\\),
  the tangent line is <em>parallel</em> to this secant line.
</div>

<div class="example">
  <strong>Example 1.</strong> Verify the MVT for \\(f(x) = x^2\\) on \\([1, 3]\\).
  <br><br>
  <strong>Solution.</strong> The average rate of change is
  \\(\\frac{f(3) - f(1)}{3 - 1} = \\frac{9 - 1}{2} = 4\\).
  <br>
  We need \\(f'(c) = 4\\), i.e., \\(2c = 4\\), so \\(c = 2 \\in (1, 3)\\). Verified.
</div>

<div class="example">
  <strong>Example 2.</strong> Show that \\(|\\sin(a) - \\sin(b)| \\leq |a - b|\\) for all \\(a, b\\).
  <br><br>
  <strong>Solution.</strong> By the MVT applied to \\(f(x) = \\sin(x)\\), there exists \\(c\\) between \\(a\\) and \\(b\\) with
  \\(\\sin(b) - \\sin(a) = \\cos(c)(b - a)\\).
  Since \\(|\\cos(c)| \\leq 1\\), we get \\(|\\sin(b) - \\sin(a)| = |\\cos(c)||b - a| \\leq |b - a|\\).
</div>

<div class="example">
  <strong>Example 3 (Application).</strong> Suppose \\(f'(x) = 0\\) for all \\(x\\) in an interval \\(I\\). Then \\(f\\) is constant on \\(I\\).
  <br><br>
  <strong>Proof.</strong> For any \\(x_1, x_2 \\in I\\), the MVT gives \\(f(x_2) - f(x_1) = f'(c)(x_2 - x_1) = 0\\),
  so \\(f(x_2) = f(x_1)\\). Since \\(x_1, x_2\\) were arbitrary, \\(f\\) is constant. \\(\\square\\)
</div>

<div class="warning">
  <strong>Caution:</strong> The MVT requires <em>both</em> hypotheses: continuity on \\([a, b]\\) and differentiability
  on \\((a, b)\\). If either fails, the conclusion may not hold. For instance, \\(f(x) = |x|\\) on \\([-1, 1]\\)
  has \\(f(-1) = f(1) = 1\\), but there is no \\(c\\) where \\(f'(c) = 0\\) because \\(f\\) is not differentiable at 0
  and \\(f' = \\pm 1\\) elsewhere.
</div>

<div class="env-block intuition">
<strong>Looking Ahead: From Shape to Optimization.</strong>
Throughout this chapter, we have learned to read a function's shape from its derivatives: where it rises and falls, where it bends, and where it turns around. Understanding a function's shape naturally leads to finding its peaks and valleys, which is the heart of optimization. In Chapter 6, we will apply these curve-sketching ideas to solve practical problems: finding the maximum area, the minimum cost, or the optimal design. The critical-point analysis and derivative tests you have mastered here will be the primary tools for those optimization problems.
</div>
`,
      visualizations: [
        {
          id: 'viz-mvt-interactive',
          title: 'Mean Value Theorem — Interactive',
          setup(container) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'padding:12px;';
            container.appendChild(wrap);

            const viz = new VizEngine(wrap, { width: 700, height: 420, scale: 50, originX: 100, originY: 340 });
            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            var aVal = 1;
            var bVal = 5;
            var f = function(x) { return 0.08 * x * x * x - 0.6 * x * x + 1.5 * x + 1; };
            var fp = function(x) { return 0.24 * x * x - 1.2 * x + 1.5; };

            function findMVTPoint(a, b) {
              // Find c where f'(c) = (f(b)-f(a))/(b-a)
              var avgSlope = (f(b) - f(a)) / (b - a);
              // Search numerically
              var bestC = (a + b) / 2;
              var bestErr = Infinity;
              for (var t = a + 0.01; t < b; t += 0.005) {
                var err = Math.abs(fp(t) - avgSlope);
                if (err < bestErr) {
                  bestErr = err;
                  bestC = t;
                }
              }
              return bestC;
            }

            function draw() {
              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              // Draw f
              viz.drawFunction(f, -0.5, 8, viz.colors.blue, 2.5);

              // Secant line
              var avgSlope = (f(bVal) - f(aVal)) / (bVal - aVal);
              var secant = function(x) { return f(aVal) + avgSlope * (x - aVal); };
              viz.drawFunction(secant, -0.5, 8, viz.colors.teal, 2, 100);

              // Points on curve
              viz.drawPoint(aVal, f(aVal), viz.colors.teal, 'a', 6);
              viz.drawPoint(bVal, f(bVal), viz.colors.teal, 'b', 6);

              // Find MVT point
              var c = findMVTPoint(aVal, bVal);
              var tangent = function(x) { return f(c) + fp(c) * (x - c); };
              viz.drawFunction(tangent, c - 2, c + 2, viz.colors.orange, 2, 100);
              viz.drawPoint(c, f(c), viz.colors.orange, 'c = ' + c.toFixed(2), 6);

              // Dashed verticals
              viz.drawSegment(c, 0, c, f(c), viz.colors.orange, 1, true);

              // Labels
              viz.screenText('Secant slope = ' + avgSlope.toFixed(3), 500, 20, viz.colors.teal, 12, 'center');
              viz.screenText("f'(c) = " + fp(c).toFixed(3), 500, 40, viz.colors.orange, 12, 'center');
              viz.screenText('Mean Value Theorem: tangent || secant', 400, 405, viz.colors.white, 12, 'center');
            }

            draw();

            VizEngine.createSlider(controls, 'a', 0, 4, aVal, 0.1, function(v) { aVal = v; if (aVal >= bVal) bVal = aVal + 0.5; draw(); });
            VizEngine.createSlider(controls, 'b', 1, 7, bVal, 0.1, function(v) { bVal = v; if (bVal <= aVal) aVal = bVal - 0.5; draw(); });

            return viz;
          }
        },
        {
          id: 'viz-rolle-theorem',
          title: 'Rolle\'s Theorem',
          setup(container) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'padding:12px;';
            container.appendChild(wrap);

            const viz = new VizEngine(wrap, { width: 700, height: 380, scale: 50, originX: 100, originY: 280 });
            const controls = document.createElement('div');
            controls.className = 'viz-controls';
            container.appendChild(controls);

            // f(x) = (x-1)(x-4) = x^2 - 5x + 4 on [1,4]
            // f(1)=0, f(4)=0, f'(x)=2x-5, f'(c)=0 => c=2.5
            var f = function(x) { return (x - 1) * (x - 4); };
            var fp = function(x) { return 2 * x - 5; };

            var funcIdx = 0;
            var funcList = [
              {
                name: '(x-1)(x-4)',
                f: function(x) { return (x - 1) * (x - 4); },
                fp: function(x) { return 2 * x - 5; },
                a: 1, b: 4
              },
              {
                name: 'sin(x) on [0, pi]',
                f: function(x) { return Math.sin(x); },
                fp: function(x) { return Math.cos(x); },
                a: 0, b: Math.PI
              },
              {
                name: 'x\u00B3 - 3x on [-sqrt(3), sqrt(3)]',
                f: function(x) { return x * x * x - 3 * x; },
                fp: function(x) { return 3 * x * x - 3; },
                a: -Math.sqrt(3), b: Math.sqrt(3)
              }
            ];

            function draw() {
              var fc = funcList[funcIdx];
              var fn = fc.f, fnp = fc.fp, a = fc.a, b = fc.b;

              viz.clear();
              viz.drawGrid(1);
              viz.drawAxes();

              // Draw function
              viz.drawFunction(fn, a - 0.5, b + 0.5, viz.colors.blue, 2.5);

              // Endpoints
              viz.drawPoint(a, fn(a), viz.colors.teal, 'a', 6);
              viz.drawPoint(b, fn(b), viz.colors.teal, 'b', 6);

              // Secant (horizontal since f(a) = f(b))
              viz.drawSegment(a, fn(a), b, fn(b), viz.colors.teal, 1.5, true);

              // Find c where f'(c)=0
              var bestC = (a + b) / 2;
              var bestErr = Infinity;
              for (var t = a + 0.01; t < b; t += 0.005) {
                var err = Math.abs(fnp(t));
                if (err < bestErr) {
                  bestErr = err;
                  bestC = t;
                }
              }
              // There might be multiple c values; find all
              var cPoints = [];
              for (var t2 = a + 0.02; t2 < b - 0.01; t2 += 0.005) {
                if (Math.abs(fnp(t2)) < 0.02) {
                  if (cPoints.length === 0 || t2 - cPoints[cPoints.length - 1] > 0.1) {
                    cPoints.push(t2);
                  }
                }
              }

              for (var k = 0; k < cPoints.length; k++) {
                var c = cPoints[k];
                viz.drawPoint(c, fn(c), viz.colors.orange, 'c', 6);
                viz.drawSegment(c - 1.5, fn(c), c + 1.5, fn(c), viz.colors.orange, 2);
                viz.drawSegment(c, 0, c, fn(c), viz.colors.orange, 1, true);
              }

              // Labels
              viz.screenText('f(a) = f(b): Rolle guarantees f\'(c) = 0', 400, 15, viz.colors.white, 12, 'center');
              viz.screenText(fc.name, 400, 365, viz.colors.blue, 12, 'center');
            }

            draw();

            VizEngine.createButton(controls, '(x-1)(x-4)', function() { funcIdx = 0; draw(); });
            VizEngine.createButton(controls, 'sin(x)', function() { funcIdx = 1; draw(); });
            VizEngine.createButton(controls, 'x\u00B3 - 3x', function() { funcIdx = 2; draw(); });

            return viz;
          }
        }
      ],
      exercises: [
        {
          id: 'ch05-ex15',
          type: 'multiple-choice',
          question: 'The Mean Value Theorem guarantees the existence of c in (a,b) such that:',
          options: [
            'f\'(c) = 0',
            'f\'(c) = (f(b) - f(a))/(b - a)',
            'f\'(c) = f(b) - f(a)',
            'f(c) = (f(a) + f(b))/2'
          ],
          answer: 1,
          explanation: 'The MVT states that there exists c in (a,b) with f\'(c) = (f(b)-f(a))/(b-a), i.e., the instantaneous rate of change equals the average rate of change.'
        },
        {
          id: 'ch05-ex16',
          type: 'multiple-choice',
          question: 'Rolle\'s Theorem is a special case of the MVT when:',
          options: ['f\'(a) = 0', 'f(a) = f(b)', 'f is a polynomial', 'a = 0'],
          answer: 1,
          explanation: 'When f(a) = f(b), the average slope is 0, so the MVT guarantees f\'(c) = 0 for some c in (a,b). This is exactly Rolle\'s Theorem.'
        },
        {
          id: 'ch05-ex17',
          type: 'multiple-choice',
          question: 'For f(x) = x\u00B2 on [1, 3], the MVT point c equals:',
          options: ['c = 1.5', 'c = 2', 'c = 2.5', 'c = 3'],
          answer: 1,
          explanation: 'Average slope = (9-1)/(3-1) = 4. We need f\'(c) = 2c = 4, so c = 2.'
        },
        {
          id: 'ch05-ex18',
          type: 'multiple-choice',
          question: 'Which hypothesis is NOT required for the MVT?',
          options: [
            'f is continuous on [a,b]',
            'f is differentiable on (a,b)',
            'f(a) = f(b)',
            'All of the above are required'
          ],
          answer: 2,
          explanation: 'The condition f(a) = f(b) is required for Rolle\'s Theorem, but NOT for the Mean Value Theorem. The MVT only requires continuity on [a,b] and differentiability on (a,b).'
        }
      ]
    }
  ]
});
