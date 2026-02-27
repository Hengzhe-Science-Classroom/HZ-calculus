// === Chapter 1: Limits (Version B) ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Limits',
    subtitle: 'From intuition to rigor: understanding limits, the \u03b5-\u03b4 framework, and asymptotic behavior',
    sections: [
        // ========== SECTION 1: Intuitive Notion of Limits ==========
        {
            id: 'sec01-intuitive-limits',
            title: 'Intuitive Notion of Limits',
            content: `
<h2>1.1 Intuitive Notion of Limits</h2>

<p>The concept of a <em>limit</em> is the foundation on which all of calculus is built. Derivatives, integrals, and infinite series all rely on limits. Informally, a limit describes the value that a function "approaches" as its input approaches a particular point.</p>

<div class="env-block definition">
<strong>Informal Definition.</strong> We write
\\[
\\lim_{x \\to a} f(x) = L
\\]
to mean: as \\(x\\) gets closer and closer to \\(a\\) (from both sides, but not equal to \\(a\\)), the values \\(f(x)\\) get closer and closer to \\(L\\).
</div>

<div class="env-block remark">
<strong>Key Observation.</strong> The limit \\(\\lim_{x \\to a} f(x)\\) does <em>not</em> depend on the value \\(f(a)\\). In fact, \\(f\\) need not even be defined at \\(x = a\\) for the limit to exist. What matters is the behavior of \\(f\\) <em>near</em> \\(a\\).
</div>

<h3>Estimating Limits from Tables</h3>

<p>One intuitive approach is to evaluate \\(f(x)\\) at points progressively closer to \\(a\\) and observe a pattern.</p>

<div class="env-block example">
<strong>Example 1.1.1.</strong> Consider \\(f(x) = \\frac{x^2 - 1}{x - 1}\\) near \\(x = 1\\).

<table class="data-table" style="margin:12px auto;border-collapse:collapse;text-align:center;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px 12px;">\\(x\\)</th><th style="padding:4px 12px;">\\(f(x)\\)</th></tr>
<tr><td>0.9</td><td>1.9</td></tr>
<tr><td>0.99</td><td>1.99</td></tr>
<tr><td>0.999</td><td>1.999</td></tr>
<tr><td>1.001</td><td>2.001</td></tr>
<tr><td>1.01</td><td>2.01</td></tr>
<tr><td>1.1</td><td>2.1</td></tr>
</table>

Since \\(f(x) = \\frac{(x-1)(x+1)}{x-1} = x + 1\\) for \\(x \\neq 1\\), the values approach \\(2\\). Thus \\(\\lim_{x \\to 1} f(x) = 2\\).
</div>

<div class="viz-placeholder" data-viz="viz-limit-table"></div>

<h3>Limits from Graphs</h3>

<p>Graphically, \\(\\lim_{x \\to a} f(x) = L\\) means the curve \\(y = f(x)\\) approaches the height \\(y = L\\) as \\(x\\) approaches \\(a\\). There may be a hole in the graph at \\(x = a\\), but the curve tends toward \\(L\\).</p>

<h3>One-Sided Limits</h3>

<div class="env-block definition">
<strong>Definition 1.1.2 (One-Sided Limits).</strong>
<ul>
<li>The <em>left-hand limit</em> \\(\\displaystyle\\lim_{x \\to a^-} f(x) = L\\) means \\(f(x) \\to L\\) as \\(x \\to a\\) from below (\\(x < a\\)).</li>
<li>The <em>right-hand limit</em> \\(\\displaystyle\\lim_{x \\to a^+} f(x) = L\\) means \\(f(x) \\to L\\) as \\(x \\to a\\) from above (\\(x > a\\)).</li>
</ul>
</div>

<div class="env-block theorem">
<strong>Theorem 1.1.3.</strong> The two-sided limit \\(\\lim_{x \\to a} f(x) = L\\) exists if and only if both one-sided limits exist and are equal:
\\[
\\lim_{x \\to a^-} f(x) = L \\quad \\text{and} \\quad \\lim_{x \\to a^+} f(x) = L.
\\]
</div>

<div class="env-block example">
<strong>Example 1.1.4.</strong> Consider the Heaviside step function
\\[
H(x) = \\begin{cases} 0 & x < 0, \\\\ 1 & x \\ge 0. \\end{cases}
\\]
Then \\(\\lim_{x \\to 0^-} H(x) = 0\\) and \\(\\lim_{x \\to 0^+} H(x) = 1\\). Since the one-sided limits differ, \\(\\lim_{x \\to 0} H(x)\\) does not exist.
</div>

<div class="viz-placeholder" data-viz="viz-one-sided"></div>

<h3>When Limits Fail to Exist</h3>

<p>A limit \\(\\lim_{x \\to a} f(x)\\) fails to exist if:</p>
<ul>
<li>The left-hand and right-hand limits are different (jump discontinuity).</li>
<li>The function oscillates without settling (e.g., \\(\\sin(1/x)\\) near \\(x = 0\\)).</li>
<li>The function grows without bound (\\(f(x) \\to \\pm\\infty\\)).</li>
</ul>

<div class="env-block example">
<strong>Example 1.1.5.</strong> The function \\(f(x) = \\sin\\!\\left(\\frac{1}{x}\\right)\\) oscillates infinitely rapidly as \\(x \\to 0\\). The values cycle through \\([-1, 1]\\) without converging, so \\(\\lim_{x \\to 0} \\sin(1/x)\\) does not exist.
</div>
`,
            visualizations: [
                {
                    id: 'viz-limit-table',
                    title: 'Exploring Limits: \\(f(x) = \\frac{x^2 - 1}{x - 1}\\)',
                    description: 'Drag the point along the x-axis toward \\(x = 1\\) and observe how \\(f(x)\\) approaches 2. The function has a hole at \\(x = 1\\) but the limit exists.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 50, originX: 120, originY: 280 });

                        let xProbe = 0.3;
                        const probe = viz.addDraggable('probe', xProbe, 0, viz.colors.orange, 8, (wx) => {
                            xProbe = Math.max(-1.5, Math.min(4.5, wx));
                            probe.x = xProbe;
                            probe.y = 0;
                        });

                        function f(x) {
                            if (Math.abs(x - 1) < 1e-10) return NaN;
                            return (x * x - 1) / (x - 1);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw the function (line y = x+1 with hole at x=1)
                            viz.drawFunction(f, -1.5, 0.995, viz.colors.blue, 2.5);
                            viz.drawFunction(f, 1.005, 4.5, viz.colors.blue, 2.5);

                            // Open circle at hole
                            viz.drawOpenPoint(1, 2, viz.colors.blue, 6);

                            // Limit line
                            viz.drawSegment(-1.5, 2, 4.5, 2, viz.colors.yellow + '44', 1, true);
                            viz.drawText('L = 2', 4.2, 2.3, viz.colors.yellow, 13);

                            // Probe point
                            const px = xProbe;
                            const py = f(px);
                            if (isFinite(py)) {
                                viz.drawSegment(px, 0, px, py, viz.colors.orange + '66', 1, true);
                                viz.drawSegment(0, py, px, py, viz.colors.orange + '66', 1, true);
                                viz.drawPoint(px, py, viz.colors.orange, '', 5);
                                viz.drawText('(' + px.toFixed(2) + ', ' + py.toFixed(2) + ')', px + 0.3, py + 0.4, viz.colors.orange, 12, 'left');
                            }

                            // Label
                            viz.screenText('Drag the orange point toward x = 1', viz.width / 2, viz.height - 15, viz.colors.text, 12);
                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-one-sided',
                    title: 'One-Sided Limits and Jump Discontinuities',
                    description: 'This piecewise function has different left and right limits at \\(x = 1\\). Drag the probe to see how the function value jumps.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 50, originX: 200, originY: 250 });

                        let xProbe = 0.5;
                        const probe = viz.addDraggable('probe', xProbe, 0, viz.colors.orange, 8, (wx) => {
                            xProbe = Math.max(-2.5, Math.min(5, wx));
                            probe.x = xProbe;
                            probe.y = 0;
                        });

                        function f(x) {
                            if (x < 1) return x * x;
                            return x + 1;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Left piece: x^2 for x < 1
                            viz.drawFunction(x => x * x, -2.5, 0.99, viz.colors.blue, 2.5);
                            viz.drawPoint(1, 1, viz.colors.blue, '', 5); // closed at left

                            // Right piece: x+1 for x >= 1
                            viz.drawFunction(x => x + 1, 1.01, 5, viz.colors.teal, 2.5);
                            viz.drawOpenPoint(1, 2, viz.colors.teal, 5); // open at right

                            // Limit lines
                            viz.drawSegment(-2.5, 1, 5, 1, viz.colors.blue + '33', 1, true);
                            viz.drawText('Left limit = 1', -1.5, 1.3, viz.colors.blue, 11);
                            viz.drawSegment(-2.5, 2, 5, 2, viz.colors.teal + '33', 1, true);
                            viz.drawText('Right limit = 2', 3.5, 2.3, viz.colors.teal, 11);

                            // Probe
                            const px = xProbe;
                            const py = f(px);
                            viz.drawSegment(px, 0, px, py, viz.colors.orange + '66', 1, true);
                            const clr = px < 1 ? viz.colors.blue : viz.colors.teal;
                            viz.drawPoint(px, py, viz.colors.orange, '', 5);
                            viz.drawText('f(' + px.toFixed(2) + ') = ' + py.toFixed(2), px + 0.2, py + 0.5, viz.colors.orange, 12, 'left');

                            // Labels
                            viz.screenText('x < 1: f(x) = x\u00B2', 80, 25, viz.colors.blue, 12, 'left');
                            viz.screenText('x \u2265 1: f(x) = x + 1', 80, 42, viz.colors.teal, 12, 'left');

                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use a table of values to estimate \\(\\displaystyle\\lim_{x \\to 2} \\frac{x^3 - 8}{x - 2}\\).',
                    hint: 'Factor the numerator: \\(x^3 - 8 = (x-2)(x^2+2x+4)\\).',
                    solution: 'Since \\(\\frac{x^3-8}{x-2} = \\frac{(x-2)(x^2+2x+4)}{x-2} = x^2+2x+4\\) for \\(x \\neq 2\\), we get \\(\\lim_{x \\to 2}(x^2+2x+4) = 4+4+4 = 12\\).'
                },
                {
                    question: 'Let \\(g(x) = \\begin{cases} 3x - 1 & x < 2 \\\\ x^2 & x > 2 \\end{cases}\\). Determine whether \\(\\lim_{x \\to 2} g(x)\\) exists.',
                    hint: 'Compute the left-hand limit \\(\\lim_{x \\to 2^-} g(x)\\) and the right-hand limit \\(\\lim_{x \\to 2^+} g(x)\\) separately.',
                    solution: '\\(\\lim_{x \\to 2^-} g(x) = 3(2) - 1 = 5\\) and \\(\\lim_{x \\to 2^+} g(x) = 2^2 = 4\\). Since \\(5 \\neq 4\\), the limit does not exist.'
                },
                {
                    question: 'Explain why \\(\\lim_{x \\to 0} \\cos\\!\\left(\\frac{1}{x}\\right)\\) does not exist.',
                    hint: 'Consider the sequences \\(x_n = \\frac{1}{2n\\pi}\\) and \\(x_n = \\frac{1}{(2n+1)\\pi}\\).',
                    solution: 'Along \\(x_n = \\frac{1}{2n\\pi} \\to 0\\), we have \\(\\cos(2n\\pi) = 1\\). Along \\(x_n = \\frac{1}{(2n+1)\\pi} \\to 0\\), we have \\(\\cos((2n+1)\\pi) = -1\\). Since two sequences converging to 0 give different function values (1 and -1), the limit does not exist.'
                },
                {
                    question: 'Find \\(\\displaystyle\\lim_{x \\to 0^+} \\lfloor 1/x \\rfloor \\cdot x\\), where \\(\\lfloor \\cdot \\rfloor\\) is the floor function.',
                    hint: 'For \\(x > 0\\), write \\(1/x = \\lfloor 1/x \\rfloor + \\{1/x\\}\\) where \\(0 \\le \\{1/x\\} < 1\\). Then \\(\\lfloor 1/x \\rfloor \\cdot x = 1 - \\{1/x\\} \\cdot x\\).',
                    solution: 'Since \\(\\lfloor 1/x \\rfloor = 1/x - \\{1/x\\}\\), we have \\(\\lfloor 1/x \\rfloor \\cdot x = 1 - \\{1/x\\} \\cdot x\\). As \\(x \\to 0^+\\), \\(0 \\le \\{1/x\\} \\cdot x < x \\to 0\\). So the limit is \\(1\\).'
                }
            ]
        },

        // ========== SECTION 2: The Epsilon-Delta Definition ==========
        {
            id: 'sec02-epsilon-delta',
            title: 'The \u03b5-\u03b4 Definition',
            content: `
<h2>1.2 The \\(\\varepsilon\\text{-}\\delta\\) Definition</h2>

<p>The informal notion "\\(f(x)\\) gets close to \\(L\\)" must be made precise. The rigorous definition, due to Weierstrass, uses two quantities: \\(\\varepsilon\\) (epsilon) measures how close \\(f(x)\\) must be to \\(L\\), and \\(\\delta\\) measures how close \\(x\\) must be to \\(a\\).</p>

<div class="env-block definition">
<strong>Definition 1.2.1 (Limit \u2014 Precise).</strong> Let \\(f\\) be defined on an open interval containing \\(a\\), except possibly at \\(a\\) itself. We say
\\[
\\lim_{x \\to a} f(x) = L
\\]
if for every \\(\\varepsilon > 0\\), there exists a \\(\\delta > 0\\) such that
\\[
0 < |x - a| < \\delta \\implies |f(x) - L| < \\varepsilon.
\\]
</div>

<div class="env-block remark">
<strong>Geometric Interpretation.</strong> Given any horizontal band of width \\(2\\varepsilon\\) centered at \\(y = L\\) (the \\(\\varepsilon\\)-band), we must find a vertical strip of width \\(2\\delta\\) centered at \\(x = a\\) (the \\(\\delta\\)-band) such that whenever \\(x\\) is in the \\(\\delta\\)-strip (excluding \\(a\\) itself), the point \\((x, f(x))\\) lies inside the \\(\\varepsilon\\)-band.
</div>

<div class="viz-placeholder" data-viz="viz-epsilon-delta"></div>

<h3>Writing \\(\\varepsilon\\text{-}\\delta\\) Proofs</h3>

<p>An \\(\\varepsilon\\text{-}\\delta\\) proof typically follows this template:</p>
<ol>
<li><strong>Scratch work</strong> (not part of the proof): Start with \\(|f(x) - L|\\) and manipulate it into a form involving \\(|x - a|\\). This reveals what \\(\\delta\\) should be.</li>
<li><strong>Proof</strong>: State "Let \\(\\varepsilon > 0\\). Choose \\(\\delta = \\ldots\\)." Then verify that \\(0 < |x - a| < \\delta\\) implies \\(|f(x) - L| < \\varepsilon\\).</li>
</ol>

<div class="env-block example">
<strong>Example 1.2.2.</strong> Prove that \\(\\displaystyle\\lim_{x \\to 3} (2x + 1) = 7\\).

<em>Scratch work:</em> \\(|f(x) - L| = |(2x+1) - 7| = |2x - 6| = 2|x - 3|\\). We need \\(2|x - 3| < \\varepsilon\\), so \\(|x - 3| < \\varepsilon/2\\). Choose \\(\\delta = \\varepsilon/2\\).

<em>Proof:</em> Let \\(\\varepsilon > 0\\). Set \\(\\delta = \\varepsilon/2\\). If \\(0 < |x - 3| < \\delta\\), then
\\[
|(2x+1) - 7| = 2|x - 3| < 2\\delta = 2 \\cdot \\frac{\\varepsilon}{2} = \\varepsilon. \\qquad \\square
\\]
</div>

<div class="env-block example">
<strong>Example 1.2.3.</strong> Prove that \\(\\displaystyle\\lim_{x \\to 2} x^2 = 4\\).

<em>Scratch work:</em> \\(|x^2 - 4| = |x - 2||x + 2|\\). If we restrict \\(|x - 2| < 1\\), then \\(1 < x < 3\\), so \\(|x + 2| < 5\\). Thus \\(|x^2 - 4| < 5|x - 2|\\). To make this \\(< \\varepsilon\\), we need \\(|x - 2| < \\varepsilon/5\\).

<em>Proof:</em> Let \\(\\varepsilon > 0\\). Set \\(\\delta = \\min(1, \\varepsilon/5)\\). If \\(0 < |x - 2| < \\delta\\), then \\(|x - 2| < 1\\) implies \\(|x + 2| < 5\\), so
\\[
|x^2 - 4| = |x - 2||x + 2| < \\delta \\cdot 5 \\le \\frac{\\varepsilon}{5} \\cdot 5 = \\varepsilon. \\qquad \\square
\\]
</div>

<div class="viz-placeholder" data-viz="viz-epsilon-delta-quadratic"></div>

<h3>One-Sided \\(\\varepsilon\\text{-}\\delta\\) Definitions</h3>

<div class="env-block definition">
<strong>Definition 1.2.4.</strong>
<ul>
<li>\\(\\displaystyle\\lim_{x \\to a^+} f(x) = L\\) means: for every \\(\\varepsilon > 0\\), there exists \\(\\delta > 0\\) such that \\(0 < x - a < \\delta \\implies |f(x) - L| < \\varepsilon\\).</li>
<li>\\(\\displaystyle\\lim_{x \\to a^-} f(x) = L\\) means: for every \\(\\varepsilon > 0\\), there exists \\(\\delta > 0\\) such that \\(0 < a - x < \\delta \\implies |f(x) - L| < \\varepsilon\\).</li>
</ul>
</div>

<div class="env-block theorem">
<strong>Theorem 1.2.5 (Uniqueness of Limits).</strong> If \\(\\lim_{x \\to a} f(x) = L_1\\) and \\(\\lim_{x \\to a} f(x) = L_2\\), then \\(L_1 = L_2\\).

<em>Proof sketch.</em> Suppose \\(L_1 \\neq L_2\\). Set \\(\\varepsilon = |L_1 - L_2|/2 > 0\\). By assumption there exist \\(\\delta_1, \\delta_2 > 0\\). For \\(0 < |x - a| < \\min(\\delta_1, \\delta_2)\\):
\\[
|L_1 - L_2| \\le |f(x) - L_1| + |f(x) - L_2| < \\varepsilon + \\varepsilon = |L_1 - L_2|,
\\]
a contradiction. \\(\\square\\)
</div>
`,
            visualizations: [
                {
                    id: 'viz-epsilon-delta',
                    title: 'The \\(\\varepsilon\\text{-}\\delta\\) Definition: \\(\\lim_{x\\to 2}(2x+1)=5\\)',
                    description: 'Adjust \\(\\varepsilon\\) to set the horizontal band. The visualization automatically computes the required \\(\\delta\\). Any \\(x\\) in the \\(\\delta\\)-strip maps to a point inside the \\(\\varepsilon\\)-band.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 40, originX: 160, originY: 320 });

                        let epsilon = 1.0;
                        const a = 2, L = 5;
                        function f(x) { return 2 * x + 1; }

                        VizEngine.createSlider(controls, '\u03b5', 0.1, 3.0, epsilon, 0.1, val => { epsilon = val; });

                        function draw() {
                            viz.clear();

                            // Compute delta = epsilon / 2
                            const delta = epsilon / 2;

                            // Draw bands
                            viz.drawEpsilonBand(L, epsilon, viz.colors.teal + '22');
                            viz.drawDeltaBand(a, delta, viz.colors.orange + '22');

                            viz.drawGrid();
                            viz.drawAxes();

                            // Function
                            viz.drawFunction(f, -2, 7, viz.colors.blue, 2.5);

                            // Epsilon band borders
                            viz.drawSegment(-2, L + epsilon, 7, L + epsilon, viz.colors.teal, 1, true);
                            viz.drawSegment(-2, L - epsilon, 7, L - epsilon, viz.colors.teal, 1, true);
                            viz.drawText('L + \u03b5 = ' + (L + epsilon).toFixed(1), -1.2, L + epsilon + 0.3, viz.colors.teal, 11, 'left');
                            viz.drawText('L - \u03b5 = ' + (L - epsilon).toFixed(1), -1.2, L - epsilon - 0.4, viz.colors.teal, 11, 'left');

                            // Delta band borders
                            viz.drawSegment(a - delta, -1, a - delta, 9, viz.colors.orange, 1, true);
                            viz.drawSegment(a + delta, -1, a + delta, 9, viz.colors.orange, 1, true);

                            // Labels
                            viz.drawText('a = ' + a, a, -0.6, viz.colors.white, 12);
                            viz.drawText('L = ' + L, -1, L, viz.colors.yellow, 12);
                            viz.drawPoint(a, L, viz.colors.yellow, '', 4);

                            // Info
                            viz.screenText('\u03b5 = ' + epsilon.toFixed(1) + '  \u2192  \u03b4 = \u03b5/2 = ' + delta.toFixed(2), viz.width / 2, 20, viz.colors.white, 13);
                            viz.screenText('f(x) = 2x + 1', viz.width - 20, 20, viz.colors.blue, 12, 'right');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-epsilon-delta-quadratic',
                    title: 'The \\(\\varepsilon\\text{-}\\delta\\) Proof for \\(\\lim_{x\\to 2} x^2 = 4\\)',
                    description: 'For a nonlinear function, \\(\\delta\\) depends on \\(\\varepsilon\\) in a more complex way. Here \\(\\delta = \\min(1, \\varepsilon/5)\\). Adjust \\(\\varepsilon\\) and verify the containment.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 35, originX: 160, originY: 330 });

                        let epsilon = 1.5;
                        const a = 2, L = 4;
                        function f(x) { return x * x; }

                        VizEngine.createSlider(controls, '\u03b5', 0.1, 5.0, epsilon, 0.1, val => { epsilon = val; });

                        function draw() {
                            viz.clear();

                            const delta = Math.min(1, epsilon / 5);

                            viz.drawEpsilonBand(L, epsilon, viz.colors.teal + '22');
                            viz.drawDeltaBand(a, delta, viz.colors.orange + '22');

                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw x^2
                            viz.drawFunction(f, -2, 6, viz.colors.blue, 2.5);

                            // Epsilon borders
                            viz.drawSegment(-2, L + epsilon, 6, L + epsilon, viz.colors.teal, 1, true);
                            viz.drawSegment(-2, L - epsilon, 6, L - epsilon, viz.colors.teal, 1, true);

                            // Delta borders
                            viz.drawSegment(a - delta, -1, a - delta, 12, viz.colors.orange, 1, true);
                            viz.drawSegment(a + delta, -1, a + delta, 12, viz.colors.orange, 1, true);

                            // Mark limit point
                            viz.drawPoint(a, L, viz.colors.yellow, '', 4);

                            // Show the curve within delta-band is inside epsilon-band
                            // Highlight the portion of curve in the delta-band
                            viz.drawFunction(f, a - delta, a + delta, viz.colors.green, 3);

                            // Labels
                            viz.drawText('a = 2', a, -0.7, viz.colors.white, 12);
                            viz.drawText('L = 4', -1.2, L, viz.colors.yellow, 12);
                            viz.screenText('\u03b5 = ' + epsilon.toFixed(1) + '  \u2192  \u03b4 = min(1, \u03b5/5) = ' + delta.toFixed(2), viz.width / 2, 20, viz.colors.white, 13);
                            viz.screenText('f(x) = x\u00B2', viz.width - 20, 20, viz.colors.blue, 12, 'right');
                            viz.screenText('Green = curve inside \u03b4-band', viz.width / 2, viz.height - 15, viz.colors.green, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the \\(\\varepsilon\\text{-}\\delta\\) definition to prove that \\(\\displaystyle\\lim_{x \\to 1} (5x - 3) = 2\\).',
                    hint: 'Compute \\(|(5x-3)-2| = |5x-5| = 5|x-1|\\). Choose \\(\\delta = \\varepsilon/5\\).',
                    solution: 'Let \\(\\varepsilon > 0\\). Choose \\(\\delta = \\varepsilon/5\\). If \\(0 < |x-1| < \\delta\\), then \\(|(5x-3)-2| = 5|x-1| < 5\\delta = \\varepsilon\\). \\(\\square\\)'
                },
                {
                    question: 'Prove that \\(\\displaystyle\\lim_{x \\to 0} x^3 = 0\\) using the \\(\\varepsilon\\text{-}\\delta\\) definition.',
                    hint: 'If \\(|x| < 1\\), then \\(|x^3| = |x|^3 < |x|\\). So choose \\(\\delta = \\min(1, \\varepsilon)\\).',
                    solution: 'Let \\(\\varepsilon > 0\\). Set \\(\\delta = \\min(1, \\varepsilon)\\). If \\(0 < |x - 0| < \\delta\\), then \\(|x| < 1\\) so \\(|x^3 - 0| = |x|^3 \\le |x| \\cdot |x|^2 < |x| \\cdot 1 < \\delta \\le \\varepsilon\\). \\(\\square\\)'
                },
                {
                    question: 'Prove that \\(\\displaystyle\\lim_{x \\to 4} \\sqrt{x} = 2\\) using the \\(\\varepsilon\\text{-}\\delta\\) definition.',
                    hint: 'Write \\(|\\sqrt{x} - 2| = \\frac{|x - 4|}{\\sqrt{x} + 2}\\). Since \\(\\sqrt{x} + 2 \\ge 2\\) for \\(x \\ge 0\\), we have \\(|\\sqrt{x} - 2| \\le \\frac{|x-4|}{2}\\).',
                    solution: 'Let \\(\\varepsilon > 0\\). Choose \\(\\delta = \\min(4, 2\\varepsilon)\\). If \\(0 < |x-4| < \\delta\\), then \\(x > 0\\), so \\(\\sqrt{x} + 2 \\ge 2\\), and \\(|\\sqrt{x}-2| = \\frac{|x-4|}{\\sqrt{x}+2} \\le \\frac{|x-4|}{2} < \\frac{\\delta}{2} \\le \\varepsilon\\). \\(\\square\\)'
                }
            ]
        },

        // ========== SECTION 3: Limit Laws ==========
        {
            id: 'sec03-limit-laws',
            title: 'Limit Laws',
            content: `
<h2>1.3 Limit Laws</h2>

<p>Computing limits directly from the \\(\\varepsilon\\text{-}\\delta\\) definition for every function would be impractical. Instead, we establish <em>limit laws</em> that allow us to compute limits algebraically.</p>

<div class="env-block theorem">
<strong>Theorem 1.3.1 (Limit Laws).</strong> Suppose \\(\\lim_{x \\to a} f(x) = L\\) and \\(\\lim_{x \\to a} g(x) = M\\). Then:
<ol>
<li><strong>Constant:</strong> \\(\\lim_{x \\to a} c = c\\)</li>
<li><strong>Identity:</strong> \\(\\lim_{x \\to a} x = a\\)</li>
<li><strong>Sum:</strong> \\(\\lim_{x \\to a} [f(x) + g(x)] = L + M\\)</li>
<li><strong>Difference:</strong> \\(\\lim_{x \\to a} [f(x) - g(x)] = L - M\\)</li>
<li><strong>Scalar multiple:</strong> \\(\\lim_{x \\to a} [c \\cdot f(x)] = c \\cdot L\\)</li>
<li><strong>Product:</strong> \\(\\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M\\)</li>
<li><strong>Quotient:</strong> \\(\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M}\\), provided \\(M \\neq 0\\)</li>
<li><strong>Power:</strong> \\(\\lim_{x \\to a} [f(x)]^n = L^n\\) for any positive integer \\(n\\)</li>
<li><strong>Root:</strong> \\(\\lim_{x \\to a} \\sqrt[n]{f(x)} = \\sqrt[n]{L}\\), when defined</li>
</ol>
</div>

<div class="env-block remark">
<strong>Proof Sketch (Sum Law).</strong> Given \\(\\varepsilon > 0\\), choose \\(\\delta_1\\) so \\(|f(x) - L| < \\varepsilon/2\\) and \\(\\delta_2\\) so \\(|g(x) - M| < \\varepsilon/2\\). Let \\(\\delta = \\min(\\delta_1, \\delta_2)\\). Then
\\[
|f(x) + g(x) - (L+M)| \\le |f(x)-L| + |g(x)-M| < \\frac{\\varepsilon}{2} + \\frac{\\varepsilon}{2} = \\varepsilon. \\quad \\square
\\]
</div>

<div class="env-block example">
<strong>Example 1.3.2.</strong> Compute \\(\\displaystyle\\lim_{x \\to 3} (x^2 + 5x - 2)\\).

By the limit laws: \\(\\lim_{x \\to 3} x^2 = 9\\), \\(\\lim_{x \\to 3} 5x = 15\\), \\(\\lim_{x \\to 3} 2 = 2\\). So
\\[
\\lim_{x \\to 3} (x^2 + 5x - 2) = 9 + 15 - 2 = 22.
\\]
</div>

<h3>Direct Substitution Property</h3>

<div class="env-block theorem">
<strong>Corollary 1.3.3 (Polynomial Limits).</strong> If \\(p(x)\\) is a polynomial, then \\(\\lim_{x \\to a} p(x) = p(a)\\).
</div>

<div class="env-block theorem">
<strong>Corollary 1.3.4 (Rational Function Limits).</strong> If \\(r(x) = p(x)/q(x)\\) is a rational function and \\(q(a) \\neq 0\\), then \\(\\lim_{x \\to a} r(x) = r(a)\\).
</div>

<h3>Indeterminate Forms</h3>

<p>When direct substitution yields \\(\\frac{0}{0}\\), \\(\\frac{\\infty}{\\infty}\\), \\(0 \\cdot \\infty\\), \\(\\infty - \\infty\\), \\(0^0\\), \\(1^\\infty\\), or \\(\\infty^0\\), we say the expression is <em>indeterminate</em>. The limit may exist but requires more work.</p>

<div class="env-block example">
<strong>Example 1.3.5.</strong> Evaluate \\(\\displaystyle\\lim_{x \\to 1} \\frac{x^2 - 1}{x^2 - x}\\).

Direct substitution gives \\(\\frac{0}{0}\\). Factor:
\\[
\\frac{x^2 - 1}{x^2 - x} = \\frac{(x-1)(x+1)}{x(x-1)} = \\frac{x+1}{x} \\quad (x \\neq 1).
\\]
Then \\(\\lim_{x \\to 1} \\frac{x+1}{x} = \\frac{2}{1} = 2\\).
</div>

<div class="env-block example">
<strong>Example 1.3.6 (Rationalizing).</strong> Evaluate \\(\\displaystyle\\lim_{x \\to 0} \\frac{\\sqrt{x+4} - 2}{x}\\).

Multiply by the conjugate:
\\[
\\frac{\\sqrt{x+4} - 2}{x} \\cdot \\frac{\\sqrt{x+4} + 2}{\\sqrt{x+4} + 2} = \\frac{(x+4) - 4}{x(\\sqrt{x+4} + 2)} = \\frac{1}{\\sqrt{x+4} + 2}.
\\]
As \\(x \\to 0\\): \\(\\frac{1}{\\sqrt{4} + 2} = \\frac{1}{4}\\).
</div>

<div class="viz-placeholder" data-viz="viz-indeterminate"></div>
`,
            visualizations: [
                {
                    id: 'viz-indeterminate',
                    title: 'Resolving Indeterminate Forms',
                    description: 'Compare the original function \\(\\frac{x^2-1}{x^2-x}\\) (with the hole) to the simplified form \\(\\frac{x+1}{x}\\). They agree everywhere except at \\(x=1\\).',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 50, originX: 180, originY: 250 });

                        let showSimplified = false;
                        VizEngine.createButton(controls, 'Toggle Simplified', () => { showSimplified = !showSimplified; });

                        function fOriginal(x) {
                            if (Math.abs(x - 1) < 1e-10) return NaN;
                            if (Math.abs(x) < 1e-10) return NaN;
                            return (x * x - 1) / (x * x - x);
                        }
                        function fSimplified(x) {
                            if (Math.abs(x) < 1e-10) return NaN;
                            return (x + 1) / x;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Original function (two branches around x=1 and x=0 asymptote)
                            viz.drawFunction(fOriginal, -3, -0.05, viz.colors.blue, 2);
                            viz.drawFunction(fOriginal, 0.05, 0.99, viz.colors.blue, 2);
                            viz.drawFunction(fOriginal, 1.01, 5, viz.colors.blue, 2);

                            // Hole at x=1
                            viz.drawOpenPoint(1, 2, viz.colors.blue, 6);
                            viz.drawText('hole: (1, 2)', 1.5, 2.3, viz.colors.blue, 12, 'left');

                            // Limit line
                            viz.drawSegment(-3, 2, 5, 2, viz.colors.yellow + '33', 1, true);
                            viz.drawText('L = 2', -2.5, 2.3, viz.colors.yellow, 11);

                            if (showSimplified) {
                                viz.drawFunction(fSimplified, -3, -0.05, viz.colors.green, 2);
                                viz.drawFunction(fSimplified, 0.05, 5, viz.colors.green, 2);
                                viz.drawPoint(1, 2, viz.colors.green, '', 5);
                                viz.screenText('Green: simplified (x+1)/x', viz.width / 2, viz.height - 15, viz.colors.green, 11);
                            }

                            viz.screenText('f(x) = (x\u00B2-1)/(x\u00B2-x)', viz.width / 2, 20, viz.colors.blue, 13);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\displaystyle\\lim_{x \\to -1} \\frac{x^2 + 3x + 2}{x^2 - 1}\\).',
                    hint: 'Factor numerator and denominator: \\(x^2 + 3x + 2 = (x+1)(x+2)\\), \\(x^2 - 1 = (x+1)(x-1)\\).',
                    solution: '\\(\\frac{(x+1)(x+2)}{(x+1)(x-1)} = \\frac{x+2}{x-1}\\) for \\(x \\neq -1\\). So \\(\\lim_{x \\to -1} \\frac{x+2}{x-1} = \\frac{1}{-2} = -\\frac{1}{2}\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\lim_{h \\to 0} \\frac{(3+h)^2 - 9}{h}\\).',
                    hint: 'Expand \\((3+h)^2 = 9 + 6h + h^2\\).',
                    solution: '\\(\\frac{9 + 6h + h^2 - 9}{h} = \\frac{6h + h^2}{h} = 6 + h\\). As \\(h \\to 0\\), the limit is \\(6\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\lim_{x \\to 9} \\frac{\\sqrt{x} - 3}{x - 9}\\).',
                    hint: 'Rationalize or note \\(x - 9 = (\\sqrt{x} - 3)(\\sqrt{x} + 3)\\).',
                    solution: '\\(\\frac{\\sqrt{x} - 3}{(\\sqrt{x}-3)(\\sqrt{x}+3)} = \\frac{1}{\\sqrt{x}+3}\\) for \\(x \\neq 9\\). So the limit is \\(\\frac{1}{3+3} = \\frac{1}{6}\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\lim_{x \\to 0} \\frac{\\sqrt{1+x} - \\sqrt{1-x}}{x}\\).',
                    hint: 'Multiply by \\(\\frac{\\sqrt{1+x} + \\sqrt{1-x}}{\\sqrt{1+x} + \\sqrt{1-x}}\\).',
                    solution: '\\(\\frac{(1+x)-(1-x)}{x(\\sqrt{1+x}+\\sqrt{1-x})} = \\frac{2}{\\sqrt{1+x}+\\sqrt{1-x}}\\). As \\(x \\to 0\\), this becomes \\(\\frac{2}{1+1} = 1\\).'
                }
            ]
        },

        // ========== SECTION 4: Squeeze Theorem ==========
        {
            id: 'sec04-squeeze-theorem',
            title: 'Squeeze Theorem',
            content: `
<h2>1.4 The Squeeze Theorem</h2>

<p>Some limits cannot be computed by algebraic manipulation alone. The <em>Squeeze Theorem</em> (also called the Sandwich Theorem or Pinching Theorem) provides a powerful indirect method.</p>

<div class="env-block theorem">
<strong>Theorem 1.4.1 (Squeeze Theorem).</strong> Suppose \\(g(x) \\le f(x) \\le h(x)\\) for all \\(x\\) near \\(a\\) (except possibly at \\(a\\)), and
\\[
\\lim_{x \\to a} g(x) = \\lim_{x \\to a} h(x) = L.
\\]
Then \\(\\lim_{x \\to a} f(x) = L\\).
</div>

<div class="env-block remark">
<strong>Proof.</strong> Let \\(\\varepsilon > 0\\). Choose \\(\\delta_1 > 0\\) so \\(|g(x) - L| < \\varepsilon\\) when \\(0 < |x-a| < \\delta_1\\), and \\(\\delta_2 > 0\\) so \\(|h(x) - L| < \\varepsilon\\) when \\(0 < |x-a| < \\delta_2\\). Let \\(\\delta_3 > 0\\) be small enough that \\(g(x) \\le f(x) \\le h(x)\\) for \\(0 < |x-a| < \\delta_3\\).

Set \\(\\delta = \\min(\\delta_1, \\delta_2, \\delta_3)\\). For \\(0 < |x-a| < \\delta\\):
\\[
L - \\varepsilon < g(x) \\le f(x) \\le h(x) < L + \\varepsilon,
\\]
hence \\(|f(x) - L| < \\varepsilon\\). \\(\\square\\)
</div>

<div class="viz-placeholder" data-viz="viz-squeeze"></div>

<h3>The Fundamental Trigonometric Limit</h3>

<div class="env-block theorem">
<strong>Theorem 1.4.2.</strong>
\\[
\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1.
\\]
</div>

<div class="env-block remark">
<strong>Proof (Geometric Argument).</strong> For \\(0 < x < \\pi/2\\), consider a unit circle. Comparing areas of an inscribed triangle, a circular sector, and a circumscribed triangle:
\\[
\\frac{1}{2} \\sin x \\le \\frac{1}{2} x \\le \\frac{1}{2} \\tan x.
\\]
Dividing by \\(\\frac{1}{2} \\sin x > 0\\):
\\[
1 \\le \\frac{x}{\\sin x} \\le \\frac{1}{\\cos x}.
\\]
Taking reciprocals (and flipping inequalities):
\\[
\\cos x \\le \\frac{\\sin x}{x} \\le 1.
\\]
Since \\(\\lim_{x \\to 0^+} \\cos x = 1\\) and the upper bound is \\(1\\), the Squeeze Theorem gives \\(\\lim_{x \\to 0^+} \\frac{\\sin x}{x} = 1\\). By evenness (\\(\\frac{\\sin(-x)}{-x} = \\frac{\\sin x}{x}\\)), the left-hand limit equals \\(1\\) as well. \\(\\square\\)
</div>

<div class="viz-placeholder" data-viz="viz-sinx-over-x"></div>

<div class="env-block example">
<strong>Example 1.4.3.</strong> Evaluate \\(\\displaystyle\\lim_{x \\to 0} \\frac{\\tan x}{x}\\).

Write \\(\\frac{\\tan x}{x} = \\frac{\\sin x}{x} \\cdot \\frac{1}{\\cos x}\\). As \\(x \\to 0\\):
\\[
\\frac{\\sin x}{x} \\to 1, \\quad \\frac{1}{\\cos x} \\to 1.
\\]
By the product rule, the limit is \\(1 \\cdot 1 = 1\\).
</div>

<div class="env-block example">
<strong>Example 1.4.4.</strong> Evaluate \\(\\displaystyle\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}\\).

Using the identity \\(1 - \\cos x = 2\\sin^2(x/2)\\):
\\[
\\frac{1 - \\cos x}{x^2} = \\frac{2\\sin^2(x/2)}{x^2} = \\frac{2\\sin^2(x/2)}{4(x/2)^2} \\cdot \\frac{4}{4} = \\frac{1}{2} \\left(\\frac{\\sin(x/2)}{x/2}\\right)^{\\!2} \\to \\frac{1}{2}.
\\]
</div>

<div class="env-block example">
<strong>Example 1.4.5.</strong> Show \\(\\displaystyle\\lim_{x \\to 0} x^2 \\sin\\!\\left(\\frac{1}{x}\\right) = 0\\).

Since \\(-1 \\le \\sin(1/x) \\le 1\\), we have \\(-x^2 \\le x^2 \\sin(1/x) \\le x^2\\). Both \\(-x^2\\) and \\(x^2\\) tend to \\(0\\), so by the Squeeze Theorem the limit is \\(0\\).
</div>
`,
            visualizations: [
                {
                    id: 'viz-squeeze',
                    title: 'Squeeze Theorem: \\(x^2 \\sin(1/x) \\to 0\\)',
                    description: 'The function \\(x^2\\sin(1/x)\\) (blue) is squeezed between \\(-x^2\\) and \\(x^2\\) (both tending to 0). Zoom in near the origin to see the squeeze in action.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 80, originX: 280, originY: 200 });

                        let zoomLevel = 80;
                        VizEngine.createSlider(controls, 'Zoom', 20, 300, 80, 10, val => {
                            zoomLevel = val;
                            viz.scale = zoomLevel;
                        });

                        function f(x) {
                            if (Math.abs(x) < 1e-12) return 0;
                            return x * x * Math.sin(1 / x);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const xMin = -viz.originX / viz.scale;
                            const xMax = (viz.width - viz.originX) / viz.scale;

                            // Upper and lower bounds
                            viz.drawFunction(x => x * x, xMin, xMax, viz.colors.red + '88', 1.5);
                            viz.drawFunction(x => -x * x, xMin, xMax, viz.colors.red + '88', 1.5);

                            // Function itself
                            viz.drawFunction(f, xMin, xMax, viz.colors.blue, 2, 800);

                            // Labels
                            viz.screenText('Blue: x\u00B2 sin(1/x)', 15, 20, viz.colors.blue, 12, 'left');
                            viz.screenText('Red: \u00B1x\u00B2 (bounds)', 15, 38, viz.colors.red, 12, 'left');
                            viz.screenText('Limit = 0 by Squeeze Theorem', viz.width / 2, viz.height - 15, viz.colors.teal, 12);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-sinx-over-x',
                    title: 'The Fundamental Limit: \\(\\frac{\\sin x}{x} \\to 1\\)',
                    description: 'Visualize the geometric proof. The function \\(\\sin x / x\\) (blue) is squeezed between \\(\\cos x\\) (green) and \\(1\\) (white) near \\(x = 0\\).',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 55, originX: 280, originY: 280 });

                        let showGeometric = false;
                        VizEngine.createButton(controls, 'Toggle Geometric', () => { showGeometric = !showGeometric; });

                        function sinc(x) {
                            if (Math.abs(x) < 1e-12) return 1;
                            return Math.sin(x) / x;
                        }

                        let theta = 0.8;
                        VizEngine.createSlider(controls, '\u03b8', 0.05, 1.5, theta, 0.05, val => { theta = val; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const xMin = -viz.originX / viz.scale;
                            const xMax = (viz.width - viz.originX) / viz.scale;

                            // Upper bound: y = 1
                            viz.drawSegment(xMin, 1, xMax, 1, viz.colors.white + '55', 1, true);

                            // Lower bound: cos(x)
                            viz.drawFunction(Math.cos, xMin, xMax, viz.colors.green + '88', 1.5);

                            // sin(x)/x
                            viz.drawFunction(sinc, xMin, -0.001, viz.colors.blue, 2.5);
                            viz.drawFunction(sinc, 0.001, xMax, viz.colors.blue, 2.5);
                            viz.drawPoint(0, 1, viz.colors.blue, '', 4);

                            // Labels
                            viz.screenText('Blue: sin(x)/x', 15, 20, viz.colors.blue, 12, 'left');
                            viz.screenText('Green: cos(x)', 15, 38, viz.colors.green, 12, 'left');
                            viz.screenText('White dashed: y = 1', 15, 56, viz.colors.white, 12, 'left');

                            if (showGeometric) {
                                // Draw a unit circle diagram in the top-right corner
                                const cx = viz.width - 130;
                                const cy = 130;
                                const R = 90;

                                // Circle
                                viz.ctx.strokeStyle = viz.colors.text;
                                viz.ctx.lineWidth = 1;
                                viz.ctx.beginPath();
                                viz.ctx.arc(cx, cy, R, 0, Math.PI * 2);
                                viz.ctx.stroke();

                                // Angle theta
                                const ex = cx + R * Math.cos(theta);
                                const ey = cy - R * Math.sin(theta);

                                // Triangle (inscribed)
                                viz.ctx.fillStyle = viz.colors.blue + '22';
                                viz.ctx.beginPath();
                                viz.ctx.moveTo(cx, cy);
                                viz.ctx.lineTo(ex, ey);
                                viz.ctx.lineTo(cx + R, cy);
                                viz.ctx.closePath();
                                viz.ctx.fill();
                                viz.ctx.strokeStyle = viz.colors.blue;
                                viz.ctx.stroke();

                                // Sector
                                viz.ctx.fillStyle = viz.colors.teal + '22';
                                viz.ctx.beginPath();
                                viz.ctx.moveTo(cx, cy);
                                viz.ctx.arc(cx, cy, R, -theta, 0);
                                viz.ctx.closePath();
                                viz.ctx.fill();

                                // tan triangle
                                const tanY = cy - R * Math.tan(theta);
                                viz.ctx.strokeStyle = viz.colors.orange;
                                viz.ctx.lineWidth = 1.5;
                                viz.ctx.beginPath();
                                viz.ctx.moveTo(cx + R, cy);
                                viz.ctx.lineTo(cx + R, tanY);
                                viz.ctx.stroke();

                                // Labels in the geometric diagram
                                viz.ctx.fillStyle = viz.colors.blue;
                                viz.ctx.font = '10px -apple-system,sans-serif';
                                viz.ctx.textAlign = 'center';
                                viz.ctx.fillText('sin \u03b8', (cx + ex) / 2 + 12, (cy + ey) / 2);
                                viz.ctx.fillStyle = viz.colors.orange;
                                viz.ctx.fillText('tan \u03b8', cx + R + 18, (cy + tanY) / 2);
                                viz.ctx.fillStyle = viz.colors.teal;
                                viz.ctx.fillText('\u03b8 = ' + theta.toFixed(2), cx, cy + R + 16);
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Squeeze Theorem to evaluate \\(\\displaystyle\\lim_{x \\to 0} x \\cos\\!\\left(\\frac{1}{x^2}\\right)\\).',
                    hint: 'Since \\(-1 \\le \\cos(1/x^2) \\le 1\\), we have \\(-|x| \\le x\\cos(1/x^2) \\le |x|\\).',
                    solution: 'We have \\(-|x| \\le x\\cos(1/x^2) \\le |x|\\). Since \\(\\lim_{x \\to 0} (-|x|) = 0\\) and \\(\\lim_{x \\to 0} |x| = 0\\), the Squeeze Theorem gives \\(\\lim_{x \\to 0} x\\cos(1/x^2) = 0\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}\\).',
                    hint: 'Write \\(\\frac{\\sin(3x)}{x} = 3 \\cdot \\frac{\\sin(3x)}{3x}\\) and use \\(\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1\\) with \\(u = 3x\\).',
                    solution: '\\(\\frac{\\sin(3x)}{x} = 3 \\cdot \\frac{\\sin(3x)}{3x}\\). As \\(x \\to 0\\), \\(3x \\to 0\\), so \\(\\frac{\\sin(3x)}{3x} \\to 1\\). The limit is \\(3 \\cdot 1 = 3\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\lim_{x \\to 0} \\frac{\\sin(5x)}{\\sin(2x)}\\).',
                    hint: 'Rewrite as \\(\\frac{\\sin(5x)}{5x} \\cdot \\frac{2x}{\\sin(2x)} \\cdot \\frac{5}{2}\\).',
                    solution: '\\(\\frac{\\sin(5x)}{\\sin(2x)} = \\frac{\\sin(5x)}{5x} \\cdot \\frac{2x}{\\sin(2x)} \\cdot \\frac{5}{2}\\). Each ratio tends to 1, so the limit is \\(\\frac{5}{2}\\).'
                },
                {
                    question: 'Prove that \\(\\displaystyle\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0\\).',
                    hint: 'Multiply by \\(\\frac{1+\\cos x}{1+\\cos x}\\), or use the identity \\(1 - \\cos x = 2\\sin^2(x/2)\\).',
                    solution: '\\(\\frac{1-\\cos x}{x} = \\frac{2\\sin^2(x/2)}{x} = \\frac{\\sin(x/2)}{x/2} \\cdot \\sin(x/2)\\). As \\(x \\to 0\\): \\(\\frac{\\sin(x/2)}{x/2} \\to 1\\) and \\(\\sin(x/2) \\to 0\\). So the limit is \\(1 \\cdot 0 = 0\\).'
                }
            ]
        },

        // ========== SECTION 5: Limits at Infinity ==========
        {
            id: 'sec05-limits-at-infinity',
            title: 'Limits at Infinity',
            content: `
<h2>1.5 Limits at Infinity</h2>

<p>We now study the behavior of functions as \\(x\\) grows without bound. This leads to the concept of <em>horizontal asymptotes</em> and provides a systematic method for comparing growth rates.</p>

<div class="env-block definition">
<strong>Definition 1.5.1.</strong> We write \\(\\displaystyle\\lim_{x \\to \\infty} f(x) = L\\) if for every \\(\\varepsilon > 0\\), there exists \\(M > 0\\) such that
\\[
x > M \\implies |f(x) - L| < \\varepsilon.
\\]
Similarly, \\(\\lim_{x \\to -\\infty} f(x) = L\\) if for every \\(\\varepsilon > 0\\), there exists \\(N < 0\\) such that \\(x < N \\implies |f(x) - L| < \\varepsilon\\).
</div>

<div class="env-block definition">
<strong>Definition 1.5.2 (Horizontal Asymptote).</strong> The line \\(y = L\\) is a <em>horizontal asymptote</em> of \\(f\\) if
\\[
\\lim_{x \\to \\infty} f(x) = L \\quad \\text{or} \\quad \\lim_{x \\to -\\infty} f(x) = L.
\\]
</div>

<h3>Basic Limits at Infinity</h3>

<div class="env-block theorem">
<strong>Theorem 1.5.3.</strong> For any positive integer \\(n\\):
\\[
\\lim_{x \\to \\infty} \\frac{1}{x^n} = 0, \\qquad \\lim_{x \\to -\\infty} \\frac{1}{x^n} = 0.
\\]
</div>

<h3>Rational Functions at Infinity</h3>

<div class="env-block theorem">
<strong>Theorem 1.5.4 (Dominant Term Method).</strong> For the rational function
\\[
\\frac{a_n x^n + \\cdots + a_0}{b_m x^m + \\cdots + b_0},
\\]
<ul>
<li>If \\(n < m\\): the limit is \\(0\\).</li>
<li>If \\(n = m\\): the limit is \\(a_n / b_m\\) (ratio of leading coefficients).</li>
<li>If \\(n > m\\): the limit is \\(\\pm\\infty\\) (no finite limit).</li>
</ul>
</div>

<div class="env-block example">
<strong>Example 1.5.5.</strong> Evaluate \\(\\displaystyle\\lim_{x \\to \\infty} \\frac{3x^2 - x + 4}{5x^2 + 2x - 1}\\).

Divide numerator and denominator by \\(x^2\\):
\\[
\\frac{3 - 1/x + 4/x^2}{5 + 2/x - 1/x^2} \\to \\frac{3 - 0 + 0}{5 + 0 - 0} = \\frac{3}{5}.
\\]
</div>

<div class="viz-placeholder" data-viz="viz-limits-infinity"></div>

<h3>Infinite Limits and Vertical Asymptotes</h3>

<div class="env-block definition">
<strong>Definition 1.5.6.</strong> We write \\(\\lim_{x \\to a} f(x) = \\infty\\) if for every \\(M > 0\\), there exists \\(\\delta > 0\\) such that
\\[
0 < |x - a| < \\delta \\implies f(x) > M.
\\]
In this case, the line \\(x = a\\) is a <em>vertical asymptote</em>.
</div>

<div class="env-block example">
<strong>Example 1.5.7.</strong> \\(\\displaystyle\\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty\\) and \\(\\lim_{x \\to 0^-} \\frac{1}{x} = -\\infty\\).

The line \\(x = 0\\) is a vertical asymptote of \\(f(x) = 1/x\\).
</div>

<h3>Limits Involving \\(e^x\\) and \\(\\ln x\\)</h3>

<div class="env-block theorem">
<strong>Theorem 1.5.8.</strong>
\\[
\\lim_{x \\to \\infty} e^x = \\infty, \\quad \\lim_{x \\to -\\infty} e^x = 0, \\quad \\lim_{x \\to \\infty} \\ln x = \\infty, \\quad \\lim_{x \\to 0^+} \\ln x = -\\infty.
\\]
</div>

<div class="env-block example">
<strong>Example 1.5.9.</strong> Show \\(\\displaystyle\\lim_{x \\to \\infty} \\frac{e^x}{x^n} = \\infty\\) for any positive integer \\(n\\).

This says exponential growth dominates polynomial growth. A proof by induction using L'Hopital's rule (Ch. 6) is standard, but even without it: for \\(x > 2n\\), the Taylor expansion \\(e^x > \\frac{x^{2n}}{(2n)!}\\), so \\(\\frac{e^x}{x^n} > \\frac{x^n}{(2n)!} \\to \\infty\\).
</div>

<div class="viz-placeholder" data-viz="viz-growth-rates"></div>

<div class="env-block remark">
<strong>Hierarchy of Growth.</strong> As \\(x \\to \\infty\\):
\\[
\\ln x \\ll x^a \\ll b^x \\ll x! \\ll x^x
\\]
for any \\(a > 0\\) and \\(b > 1\\). Each function on the right eventually dwarfs all those on the left.
</div>
`,
            visualizations: [
                {
                    id: 'viz-limits-infinity',
                    title: 'Horizontal Asymptotes of Rational Functions',
                    description: 'Explore \\(f(x) = \\frac{ax^n + \\cdots}{bx^m + \\cdots}\\). Adjust the degrees and leading coefficients to see how the horizontal asymptote changes.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 25, originX: 280, originY: 230 });

                        let numDeg = 2, denDeg = 2;
                        let aCoeff = 3, bCoeff = 5;

                        VizEngine.createSlider(controls, 'Num degree', 0, 4, numDeg, 1, val => { numDeg = Math.round(val); });
                        VizEngine.createSlider(controls, 'Den degree', 1, 4, denDeg, 1, val => { denDeg = Math.round(val); });
                        VizEngine.createSlider(controls, 'Lead a', -5, 5, aCoeff, 0.5, val => { aCoeff = val; });
                        VizEngine.createSlider(controls, 'Lead b', 0.5, 5, bCoeff, 0.5, val => { bCoeff = val; });

                        function f(x) {
                            let num = aCoeff * Math.pow(x, numDeg) + 1;
                            let den = bCoeff * Math.pow(x, denDeg) + 1;
                            if (Math.abs(den) < 1e-10) return NaN;
                            return num / den;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const xMin = -viz.originX / viz.scale;
                            const xMax = (viz.width - viz.originX) / viz.scale;

                            viz.drawFunction(f, xMin, xMax, viz.colors.blue, 2.5, 600);

                            // Draw asymptote if applicable
                            if (numDeg === denDeg) {
                                const L = aCoeff / bCoeff;
                                viz.drawSegment(xMin, L, xMax, L, viz.colors.yellow, 1.5, true);
                                viz.drawText('y = ' + L.toFixed(2), xMax - 1, L + 0.5, viz.colors.yellow, 12, 'right');
                            } else if (numDeg < denDeg) {
                                viz.drawSegment(xMin, 0, xMax, 0, viz.colors.yellow, 1.5, true);
                                viz.drawText('y = 0', xMax - 1, 0.5, viz.colors.yellow, 12, 'right');
                            }

                            // Info
                            let info = 'n = ' + numDeg + ', m = ' + denDeg + ': ';
                            if (numDeg < denDeg) info += 'limit = 0';
                            else if (numDeg === denDeg) info += 'limit = a/b = ' + (aCoeff / bCoeff).toFixed(2);
                            else info += 'limit = \u00B1\u221E';
                            viz.screenText(info, viz.width / 2, 20, viz.colors.white, 13);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-growth-rates',
                    title: 'Growth Rate Comparison',
                    description: 'Compare how \\(\\ln x\\), \\(x\\), \\(x^2\\), \\(2^x\\), and \\(e^x\\) grow. Use the zoom slider to see the dramatically different growth rates.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 30, originX: 80, originY: 360 });

                        let yScale = 30;
                        VizEngine.createSlider(controls, 'Zoom Y', 5, 100, 30, 5, val => {
                            yScale = val;
                            viz.scale = yScale;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const xMax = (viz.width - viz.originX) / viz.scale;

                            // ln(x)
                            viz.drawFunction(Math.log, 0.01, xMax, viz.colors.green, 2);
                            // sqrt(x)
                            viz.drawFunction(Math.sqrt, 0, xMax, viz.colors.teal, 2);
                            // x
                            viz.drawFunction(x => x, 0, xMax, viz.colors.white + 'aa', 1.5);
                            // x^2
                            viz.drawFunction(x => x * x, 0, xMax, viz.colors.orange, 2);
                            // e^x
                            viz.drawFunction(Math.exp, 0, Math.min(xMax, 10), viz.colors.red, 2);

                            // Legend
                            const labels = [
                                { text: 'ln(x)', color: viz.colors.green },
                                { text: '\u221Ax', color: viz.colors.teal },
                                { text: 'x', color: viz.colors.white + 'aa' },
                                { text: 'x\u00B2', color: viz.colors.orange },
                                { text: 'e\u02E3', color: viz.colors.red }
                            ];
                            labels.forEach((l, i) => {
                                viz.screenText(l.text, viz.width - 15, 20 + i * 18, l.color, 12, 'right');
                            });

                            viz.screenText('Growth rate hierarchy', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\displaystyle\\lim_{x \\to \\infty} \\frac{2x^3 + x}{x^3 - 4x^2 + 1}\\).',
                    hint: 'Divide numerator and denominator by \\(x^3\\).',
                    solution: '\\(\\frac{2 + 1/x^2}{1 - 4/x + 1/x^3} \\to \\frac{2}{1} = 2\\) as \\(x \\to \\infty\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\lim_{x \\to \\infty} \\left(\\sqrt{x^2 + x} - x\\right)\\).',
                    hint: 'Multiply and divide by \\(\\sqrt{x^2 + x} + x\\).',
                    solution: '\\(\\frac{(x^2+x) - x^2}{\\sqrt{x^2+x}+x} = \\frac{x}{\\sqrt{x^2+x}+x} = \\frac{1}{\\sqrt{1+1/x}+1} \\to \\frac{1}{1+1} = \\frac{1}{2}\\).'
                },
                {
                    question: 'Find all horizontal asymptotes of \\(f(x) = \\frac{3x + 1}{\\sqrt{4x^2 + 5}}\\).',
                    hint: 'As \\(x \\to +\\infty\\), \\(\\sqrt{4x^2 + 5} \\approx 2x\\). As \\(x \\to -\\infty\\), \\(\\sqrt{4x^2 + 5} \\approx -2x\\) (since \\(\\sqrt{x^2} = |x| = -x\\) for \\(x < 0\\)).',
                    solution: 'As \\(x \\to +\\infty\\): \\(\\frac{3x+1}{\\sqrt{4x^2+5}} = \\frac{3+1/x}{\\sqrt{4+5/x^2}} \\to \\frac{3}{2}\\). As \\(x \\to -\\infty\\): divide by \\(|x| = -x\\): \\(\\frac{3+1/x}{-\\sqrt{4+5/x^2}} \\to \\frac{3}{-2} = -\\frac{3}{2}\\). So there are two horizontal asymptotes: \\(y = 3/2\\) and \\(y = -3/2\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\lim_{x \\to \\infty} x \\sin\\!\\left(\\frac{1}{x}\\right)\\).',
                    hint: 'Substitute \\(u = 1/x\\), so as \\(x \\to \\infty\\), \\(u \\to 0^+\\).',
                    solution: 'Let \\(u = 1/x\\). Then \\(x\\sin(1/x) = \\frac{\\sin u}{u}\\). As \\(x \\to \\infty\\), \\(u \\to 0^+\\), so \\(\\frac{\\sin u}{u} \\to 1\\).'
                }
            ]
        }
    ]
});
