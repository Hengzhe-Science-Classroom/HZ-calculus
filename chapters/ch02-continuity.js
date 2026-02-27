// === Chapter 2: Continuity ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Continuity',
    subtitle: 'When limits meet function values: continuity, types of discontinuities, and the Intermediate Value Theorem',
    sections: [
        // ===== SECTION 1: Definition of Continuity =====
        {
            id: 'sec-definition',
            title: 'Definition of Continuity',
            content: `
<h2>Definition of Continuity</h2>

<div class="env-block definition">
<div class="env-title">Definition 2.1 — Continuity at a Point</div>
<p>A function \\(f\\) is <strong>continuous at</strong> \\(x = a\\) if the following three conditions all hold:</p>
<ol>
<li>\\(f(a)\\) is defined,</li>
<li>\\(\\displaystyle\\lim_{x \\to a} f(x)\\) exists,</li>
<li>\\(\\displaystyle\\lim_{x \\to a} f(x) = f(a)\\).</li>
</ol>
<p>Equivalently, using the \\(\\varepsilon\\text{-}\\delta\\) language: for every \\(\\varepsilon > 0\\) there exists \\(\\delta > 0\\) such that</p>
\\[|x - a| < \\delta \\implies |f(x) - f(a)| < \\varepsilon.\\]
</div>

<p>The three conditions form a <em>checklist</em>. If any one fails, the function is <strong>discontinuous</strong> at \\(a\\). The visualization below lets you test a point on a curve and see whether the three conditions are satisfied.</p>

<div class="viz-placeholder" data-viz="viz-continuity-check"></div>

<div class="env-block definition">
<div class="env-title">Definition 2.2 — One-Sided Continuity</div>
<p>We say \\(f\\) is <strong>continuous from the right</strong> at \\(a\\) if \\(\\displaystyle\\lim_{x \\to a^+} f(x) = f(a)\\), and <strong>continuous from the left</strong> at \\(a\\) if \\(\\displaystyle\\lim_{x \\to a^-} f(x) = f(a)\\).</p>
</div>

<div class="env-block definition">
<div class="env-title">Definition 2.3 — Continuity on an Interval</div>
<p>A function \\(f\\) is <strong>continuous on an open interval</strong> \\((a, b)\\) if it is continuous at every point in \\((a, b)\\).</p>
<p>It is <strong>continuous on a closed interval</strong> \\([a, b]\\) if:</p>
<ul>
<li>it is continuous on \\((a, b)\\),</li>
<li>it is continuous from the right at \\(a\\), and</li>
<li>it is continuous from the left at \\(b\\).</li>
</ul>
</div>

<div class="env-block example">
<div class="env-title">Example 2.1</div>
<p>The function \\(f(x) = \\sqrt{x}\\) is continuous on \\([0, \\infty)\\). At \\(x = 0\\), only the right-hand limit matters, and \\(\\displaystyle\\lim_{x \\to 0^+} \\sqrt{x} = 0 = f(0)\\).</p>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 2.1 — Elementary Continuous Functions</div>
<p>The following functions are continuous on their natural domains:</p>
<ul>
<li>Polynomials: \\(p(x) = a_n x^n + \\cdots + a_1 x + a_0\\)</li>
<li>Rational functions: \\(\\dfrac{p(x)}{q(x)}\\) wherever \\(q(x) \\neq 0\\)</li>
<li>Root functions: \\(\\sqrt[n]{x}\\)</li>
<li>Trigonometric functions: \\(\\sin x,\\ \\cos x,\\ \\tan x,\\ldots\\)</li>
<li>Exponential and logarithmic functions: \\(e^x,\\ \\ln x\\)</li>
</ul>
</div>

<div class="viz-placeholder" data-viz="viz-epsilon-delta-cont"></div>
`,
            visualizations: [
                {
                    id: 'viz-continuity-check',
                    title: 'Continuity Checklist',
                    description: 'Drag the point along the x-axis. The panel shows whether each of the three continuity conditions holds at that point.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 50, originX: 220, originY: 200 });

                        // Piecewise function with a removable discontinuity at x=2
                        function f(x) {
                            if (Math.abs(x - 2) < 0.01) return NaN; // hole at x=2
                            return (x * x - 4) / (x - 2); // = x + 2 when x != 2
                        }
                        const fDefined = 3; // f(2) is defined as 3 (wrong value)
                        const fLimit = 4;   // limit as x->2 is 4

                        function fActual(x) {
                            if (Math.abs(x - 2) < 0.01) return fDefined;
                            return (x * x - 4) / (x - 2);
                        }

                        let testX = 1.0;
                        const drag = viz.addDraggable('pt', testX, 0, viz.colors.yellow, 8, (wx) => {
                            testX = Math.round(wx * 10) / 10;
                            drag.x = testX;
                            drag.y = 0;
                        });

                        const statusDiv = document.createElement('div');
                        statusDiv.style.cssText = 'color:#c9d1d9;font-size:0.82rem;margin-top:8px;line-height:1.7;font-family:monospace;';
                        body.appendChild(statusDiv);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw the function (x+2) with a hole at x=2
                            viz.drawFunction(x => x + 2, -2, 7, viz.colors.blue, 2.5);
                            // Open circle at (2, 4) - limit value
                            viz.drawOpenPoint(2, 4, viz.colors.blue, 6);
                            // Filled point at (2, 3) - defined value
                            viz.drawPoint(2, fDefined, viz.colors.orange, 'f(2)=3', 6);

                            // Vertical dashed line at testX
                            viz.drawSegment(testX, -1, testX, 8, viz.colors.yellow + '55', 1, true);

                            let isAtDisc = Math.abs(testX - 2) < 0.05;
                            let fVal, limVal, limExists, fDefn;

                            if (isAtDisc) {
                                fVal = fDefined;
                                limVal = fLimit;
                                limExists = true;
                                fDefn = true;
                            } else {
                                fVal = testX + 2;
                                limVal = testX + 2;
                                limExists = true;
                                fDefn = true;
                            }

                            // Show test point
                            if (isAtDisc) {
                                viz.drawPoint(testX, fDefined, viz.colors.yellow, '', 7);
                            } else {
                                viz.drawPoint(testX, fVal, viz.colors.yellow, '', 7);
                            }

                            viz.drawDraggables();

                            let c1 = fDefn;
                            let c2 = limExists;
                            let c3 = c1 && c2 && (Math.abs(fVal - limVal) < 0.001);
                            let isCont = c1 && c2 && c3;

                            statusDiv.innerHTML =
                                '<b>Testing x = ' + testX.toFixed(1) + '</b><br>' +
                                (c1 ? '&#9989;' : '&#10060;') + ' (1) f(' + testX.toFixed(1) + ') = ' + fVal.toFixed(2) + ' is defined<br>' +
                                (c2 ? '&#9989;' : '&#10060;') + ' (2) lim = ' + limVal.toFixed(2) + ' exists<br>' +
                                (c3 ? '&#9989;' : '&#10060;') + ' (3) lim = f(a)? ' + limVal.toFixed(2) + (c3 ? ' = ' : ' ≠ ') + fVal.toFixed(2) + '<br>' +
                                '<b style="color:' + (isCont ? '#3fb950' : '#f85149') + '">' +
                                (isCont ? 'Continuous at x = ' + testX.toFixed(1) : 'Discontinuous at x = ' + testX.toFixed(1)) + '</b>';
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-epsilon-delta-cont',
                    title: 'Epsilon-Delta View of Continuity',
                    description: 'Adjust \\(\\varepsilon\\) and see the corresponding \\(\\delta\\)-band. For a continuous function, you can always find a \\(\\delta\\) that works.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 50, originX: 200, originY: 220 });
                        let epsilon = 0.8;
                        let a = 1.5;

                        const f = x => Math.sin(x) + 1.5;
                        const fa = f(a);

                        VizEngine.createSlider(controls, 'epsilon', 0.1, 2.0, epsilon, 0.05, v => { epsilon = v; });

                        const drag = viz.addDraggable('a', a, 0, viz.colors.yellow, 8, (wx) => {
                            a = Math.max(-2, Math.min(8, wx));
                            drag.x = a;
                            drag.y = 0;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            const currentFa = f(a);

                            // Epsilon band
                            viz.drawEpsilonBand(currentFa, epsilon, viz.colors.green + '18');
                            viz.drawSegment(-5, currentFa + epsilon, 10, currentFa + epsilon, viz.colors.green + '66', 1, true);
                            viz.drawSegment(-5, currentFa - epsilon, 10, currentFa - epsilon, viz.colors.green + '66', 1, true);

                            // Find delta: largest delta such that |f(x)-f(a)| < eps for |x-a| < delta
                            let delta = epsilon; // start guess
                            for (let d = epsilon; d > 0.01; d -= 0.01) {
                                let ok = true;
                                for (let t = -1; t <= 1; t += 0.02) {
                                    let x = a + d * t;
                                    if (Math.abs(f(x) - currentFa) >= epsilon) { ok = false; break; }
                                }
                                if (ok) { delta = d; break; }
                            }

                            // Delta band
                            viz.drawDeltaBand(a, delta, viz.colors.purple + '18');
                            viz.drawSegment(a - delta, -3, a - delta, 8, viz.colors.purple + '66', 1, true);
                            viz.drawSegment(a + delta, -3, a + delta, 8, viz.colors.purple + '66', 1, true);

                            viz.drawAxes();
                            viz.drawFunction(f, -3, 9, viz.colors.blue, 2.5);

                            // Point
                            viz.drawPoint(a, currentFa, viz.colors.yellow, '', 6);
                            viz.drawSegment(a, 0, a, currentFa, viz.colors.yellow + '44', 1, true);

                            // Labels
                            viz.drawText('a=' + a.toFixed(1), a, -0.5, viz.colors.yellow, 11);
                            viz.screenText('epsilon = ' + epsilon.toFixed(2), viz.width - 10, 20, viz.colors.green, 12, 'right', 'top');
                            viz.screenText('delta = ' + delta.toFixed(2), viz.width - 10, 36, viz.colors.purple, 12, 'right', 'top');

                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'At which points is the function \\(f(x) = \\dfrac{x^2 - 1}{x - 1}\\) discontinuous? Can the discontinuity be removed?',
                    hint: 'Factor the numerator and check if the limit exists at the problematic point.',
                    solution: 'The function is undefined at \\(x = 1\\). Since \\(\\dfrac{x^2-1}{x-1} = x+1\\) for \\(x \\neq 1\\), the limit as \\(x \\to 1\\) is \\(2\\). Defining \\(f(1) = 2\\) removes the discontinuity. So \\(x = 1\\) is a <strong>removable discontinuity</strong>.'
                },
                {
                    question: 'Prove that \\(f(x) = x^2\\) is continuous at every real number \\(a\\) using the \\(\\varepsilon\\text{-}\\delta\\) definition.',
                    hint: 'Write \\(|x^2 - a^2| = |x-a||x+a|\\). Bound \\(|x+a|\\) by first restricting \\(|x-a| < 1\\).',
                    solution: 'Let \\(\\varepsilon > 0\\). Choose \\(\\delta = \\min\\left(1, \\dfrac{\\varepsilon}{2|a|+1}\\right)\\). If \\(|x - a| < \\delta\\), then \\(|x-a| < 1\\) so \\(|x| < |a|+1\\), giving \\(|x+a| < 2|a|+1\\). Therefore \\(|x^2 - a^2| = |x-a||x+a| < \\delta(2|a|+1) \\leq \\varepsilon\\).'
                },
                {
                    question: 'Is the function \\(f(x) = \\begin{cases} x \\sin(1/x) & x \\neq 0 \\\\ 0 & x = 0 \\end{cases}\\) continuous at \\(x = 0\\)?',
                    hint: 'Use the squeeze theorem: \\(-|x| \\leq x\\sin(1/x) \\leq |x|\\).',
                    solution: 'Yes, it is continuous. We have \\(|f(x) - f(0)| = |x \\sin(1/x)| \\leq |x| \\to 0\\) as \\(x \\to 0\\). So \\(\\lim_{x \\to 0} f(x) = 0 = f(0)\\).'
                },
                {
                    question: 'Let \\(f(x) = \\dfrac{\\sin x}{x}\\) for \\(x \\neq 0\\). What value should we assign to \\(f(0)\\) to make \\(f\\) continuous at \\(0\\)?',
                    hint: 'Recall the fundamental limit \\(\\lim_{x \\to 0} \\frac{\\sin x}{x}\\).',
                    solution: 'Since \\(\\displaystyle\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1\\), we should define \\(f(0) = 1\\) to make \\(f\\) continuous at \\(0\\).'
                }
            ]
        },

        // ===== SECTION 2: Types of Discontinuities =====
        {
            id: 'sec-discontinuities',
            title: 'Types of Discontinuities',
            content: `
<h2>Types of Discontinuities</h2>

<p>When a function fails to be continuous at a point, we classify the <strong>type of discontinuity</strong> based on the behavior of the one-sided limits.</p>

<div class="env-block definition">
<div class="env-title">Definition 2.4 — Removable Discontinuity</div>
<p>A function \\(f\\) has a <strong>removable discontinuity</strong> at \\(x = a\\) if \\(\\displaystyle\\lim_{x \\to a} f(x)\\) exists but either \\(f(a)\\) is undefined or \\(f(a) \\neq \\lim_{x \\to a} f(x)\\).</p>
<p>Graphically, this appears as a <em>hole</em> in the curve. Redefining \\(f(a)\\) to equal the limit "fills the hole."</p>
</div>

<div class="env-block definition">
<div class="env-title">Definition 2.5 — Jump Discontinuity</div>
<p>A function \\(f\\) has a <strong>jump discontinuity</strong> at \\(x = a\\) if both one-sided limits exist but are not equal:</p>
\\[\\lim_{x \\to a^-} f(x) \\neq \\lim_{x \\to a^+} f(x).\\]
<p>The <strong>jump size</strong> is \\(\\left|\\lim_{x \\to a^+} f(x) - \\lim_{x \\to a^-} f(x)\\right|\\).</p>
</div>

<div class="env-block definition">
<div class="env-title">Definition 2.6 — Infinite Discontinuity</div>
<p>A function \\(f\\) has an <strong>infinite discontinuity</strong> at \\(x = a\\) if at least one of the one-sided limits is \\(+\\infty\\) or \\(-\\infty\\). Graphically, this corresponds to a vertical asymptote.</p>
</div>

<div class="env-block definition">
<div class="env-title">Definition 2.7 — Oscillating Discontinuity</div>
<p>A function \\(f\\) has an <strong>oscillating discontinuity</strong> at \\(x = a\\) if \\(f\\) oscillates so wildly near \\(a\\) that neither one-sided limit exists (and the oscillation is bounded). The classic example is \\(f(x) = \\sin(1/x)\\) at \\(x = 0\\).</p>
</div>

<div class="viz-placeholder" data-viz="viz-disc-gallery"></div>

<div class="env-block example">
<div class="env-title">Example 2.2 — Classifying Discontinuities</div>
<p>Consider \\(f(x) = \\dfrac{|x|}{x}\\). This equals \\(-1\\) for \\(x < 0\\) and \\(+1\\) for \\(x > 0\\). At \\(x = 0\\), \\(f\\) is undefined, \\(\\lim_{x \\to 0^-} f(x) = -1\\) and \\(\\lim_{x \\to 0^+} f(x) = 1\\). Since the one-sided limits exist but differ, this is a <strong>jump discontinuity</strong> of size \\(2\\).</p>
</div>

<div class="env-block example">
<div class="env-title">Example 2.3</div>
<p>The function \\(f(x) = \\dfrac{1}{x^2}\\) has an <strong>infinite discontinuity</strong> at \\(x = 0\\) because \\(\\lim_{x \\to 0} \\frac{1}{x^2} = +\\infty\\).</p>
</div>

<div class="viz-placeholder" data-viz="viz-disc-interactive"></div>
`,
            visualizations: [
                {
                    id: 'viz-disc-gallery',
                    title: 'Gallery of Discontinuity Types',
                    description: 'Four panels showing each type of discontinuity. Open circles mark holes; arrows mark limits approaching infinity.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 560, height: 400, scale: 35, originX: 280, originY: 200 });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const w = viz.width, h = viz.height;
                            const hw = w / 2, hh = h / 2;

                            // Divider lines
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(hw, 0); ctx.lineTo(hw, h); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, hh); ctx.lineTo(w, hh); ctx.stroke();

                            // Panel labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Removable', hw / 2, 6);
                            ctx.fillText('Jump', hw + hw / 2, 6);
                            ctx.fillText('Infinite', hw / 2, hh + 6);
                            ctx.fillText('Oscillating', hw + hw / 2, hh + 6);

                            // Helper: draw mini function in a sub-region
                            const drawMiniAxes = (ox, oy) => {
                                ctx.strokeStyle = viz.colors.axis + '66';
                                ctx.lineWidth = 0.8;
                                ctx.beginPath(); ctx.moveTo(ox - 100, oy); ctx.lineTo(ox + 100, oy); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(ox, oy - 70); ctx.lineTo(ox, oy + 70); ctx.stroke();
                            };

                            const plotMini = (ox, oy, fn, xMin, xMax, color, scale) => {
                                scale = scale || 20;
                                ctx.strokeStyle = color; ctx.lineWidth = 2;
                                ctx.beginPath();
                                let started = false;
                                for (let i = 0; i <= 200; i++) {
                                    const x = xMin + (xMax - xMin) * i / 200;
                                    const y = fn(x);
                                    if (!isFinite(y) || Math.abs(y) > 4) { started = false; continue; }
                                    const sx = ox + x * scale;
                                    const sy = oy - y * scale;
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            };

                            const miniPoint = (ox, oy, x, y, color, scale, open) => {
                                scale = scale || 20;
                                const sx = ox + x * scale, sy = oy - y * scale;
                                ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2);
                                if (open) {
                                    ctx.fillStyle = viz.colors.bg; ctx.fill();
                                    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
                                } else {
                                    ctx.fillStyle = color; ctx.fill();
                                }
                            };

                            // (1) Removable: f(x) = x+1 with hole at x=0
                            const ox1 = hw / 2, oy1 = hh / 2 + 15;
                            drawMiniAxes(ox1, oy1);
                            plotMini(ox1, oy1, x => x + 1, -4, 4, viz.colors.blue, 20);
                            miniPoint(ox1, oy1, 0, 1, viz.colors.blue, 20, true);
                            miniPoint(ox1, oy1, 0, 2, viz.colors.orange, 20, false);
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('hole at (0,1)', ox1 + 8, oy1 - 1 * 20 - 4);

                            // (2) Jump: sgn(x)
                            const ox2 = hw + hw / 2, oy2 = hh / 2 + 15;
                            drawMiniAxes(ox2, oy2);
                            plotMini(ox2, oy2, x => x < 0 ? -1 : 1, -4, -0.05, viz.colors.blue, 20);
                            plotMini(ox2, oy2, x => x < 0 ? -1 : 1, 0.05, 4, viz.colors.blue, 20);
                            miniPoint(ox2, oy2, 0, -1, viz.colors.blue, 20, true);
                            miniPoint(ox2, oy2, 0, 1, viz.colors.blue, 20, true);
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('jump = 2', ox2 + 8, oy2 - 4);

                            // (3) Infinite: 1/x
                            const ox3 = hw / 2, oy3 = hh + hh / 2 + 15;
                            drawMiniAxes(ox3, oy3);
                            plotMini(ox3, oy3, x => 1 / x, -4, -0.15, viz.colors.blue, 20);
                            plotMini(ox3, oy3, x => 1 / x, 0.15, 4, viz.colors.blue, 20);
                            ctx.strokeStyle = viz.colors.red + '55'; ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(ox3, oy3 - 70); ctx.lineTo(ox3, oy3 + 70); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('vertical asymptote', ox3 + 5, oy3 - 60);

                            // (4) Oscillating: sin(1/x)
                            const ox4 = hw + hw / 2, oy4 = hh + hh / 2 + 15;
                            drawMiniAxes(ox4, oy4);
                            plotMini(ox4, oy4, x => Math.sin(1 / x), -4, -0.08, viz.colors.blue, 20);
                            plotMini(ox4, oy4, x => Math.sin(1 / x), 0.08, 4, viz.colors.blue, 20);
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('no limit exists', ox4 + 5, oy4 - 60);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-disc-interactive',
                    title: 'Build Your Own Piecewise Function',
                    description: 'Use the sliders to control the left value, right value, and the defined value at \\(x = 2\\). Watch how the discontinuity type changes.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 45, originX: 160, originY: 220 });
                        let leftVal = 1;
                        let rightVal = 3;
                        let defVal = 2;

                        VizEngine.createSlider(controls, 'Left limit', -2, 5, leftVal, 0.1, v => { leftVal = v; });
                        VizEngine.createSlider(controls, 'Right limit', -2, 5, rightVal, 0.1, v => { rightVal = v; });
                        VizEngine.createSlider(controls, 'f(2)', -2, 5, defVal, 0.1, v => { defVal = v; });

                        const labelDiv = document.createElement('div');
                        labelDiv.style.cssText = 'color:#c9d1d9;font-size:0.82rem;margin-top:6px;font-family:monospace;';
                        body.appendChild(labelDiv);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Left piece: line from (0, leftVal-1) to (2, leftVal)
                            viz.drawFunction(x => leftVal + (x - 2) * 0.5, -1, 1.98, viz.colors.blue, 2.5);
                            // Right piece: line from (2, rightVal) to (5, rightVal+1.5)
                            viz.drawFunction(x => rightVal + (x - 2) * 0.5, 2.02, 6, viz.colors.blue, 2.5);

                            // Open points at x=2 (limit values)
                            viz.drawOpenPoint(2, leftVal, viz.colors.blue, 6);
                            viz.drawOpenPoint(2, rightVal, viz.colors.blue, 6);

                            // Defined value
                            viz.drawPoint(2, defVal, viz.colors.orange, 'f(2)', 6);

                            // Classify
                            let limLeft = leftVal;
                            let limRight = rightVal;
                            let sameLimit = Math.abs(limLeft - limRight) < 0.05;
                            let limVal = sameLimit ? (limLeft + limRight) / 2 : NaN;
                            let type;

                            if (sameLimit && Math.abs(defVal - limVal) < 0.05) {
                                type = 'Continuous';
                            } else if (sameLimit) {
                                type = 'Removable discontinuity';
                            } else {
                                type = 'Jump discontinuity (jump = ' + Math.abs(limRight - limLeft).toFixed(2) + ')';
                            }

                            labelDiv.innerHTML = '<b>Type:</b> ' + type;
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Classify the discontinuity of \\(f(x) = \\dfrac{x^2 - 9}{x - 3}\\) at \\(x = 3\\).',
                    hint: 'Factor the numerator. Does the limit exist?',
                    solution: 'We have \\(\\dfrac{x^2-9}{x-3} = x + 3\\) for \\(x \\neq 3\\), so \\(\\lim_{x \\to 3} f(x) = 6\\). Since \\(f(3)\\) is undefined, this is a <strong>removable discontinuity</strong>. Setting \\(f(3) = 6\\) removes it.'
                },
                {
                    question: 'Classify the discontinuity of \\(g(x) = \\lfloor x \\rfloor\\) (the floor function) at every integer \\(n\\).',
                    hint: 'Compute the left and right limits at an integer.',
                    solution: 'At every integer \\(n\\), \\(\\lim_{x \\to n^-} \\lfloor x \\rfloor = n - 1\\) while \\(\\lim_{x \\to n^+} \\lfloor x \\rfloor = n\\). The one-sided limits differ by \\(1\\), so each integer is a <strong>jump discontinuity</strong> of size \\(1\\).'
                },
                {
                    question: 'Show that \\(h(x) = \\sin(1/x)\\) has an oscillating discontinuity at \\(x = 0\\).',
                    hint: 'Consider the sequences \\(x_n = 1/(n\\pi)\\) and \\(x_n = 1/(2n\\pi + \\pi/2)\\).',
                    solution: 'Take \\(x_n = \\frac{1}{n\\pi}\\to 0\\): then \\(h(x_n) = \\sin(n\\pi) = 0\\). Take \\(y_n = \\frac{1}{2n\\pi + \\pi/2}\\to 0\\): then \\(h(y_n) = \\sin(2n\\pi + \\pi/2) = 1\\). Since two sequences converging to \\(0\\) give different function limits, \\(\\lim_{x \\to 0} h(x)\\) does not exist. The function oscillates between \\(-1\\) and \\(1\\), so this is an <strong>oscillating discontinuity</strong>.'
                }
            ]
        },

        // ===== SECTION 3: Properties of Continuous Functions =====
        {
            id: 'sec-properties',
            title: 'Properties of Continuous Functions',
            content: `
<h2>Properties of Continuous Functions</h2>

<p>Continuous functions interact nicely with algebraic operations. This lets us build a large library of continuous functions from basic ones.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 2.2 — Algebra of Continuous Functions</div>
<p>If \\(f\\) and \\(g\\) are continuous at \\(x = a\\), then so are:</p>
<ol>
<li>\\(f + g\\) and \\(f - g\\),</li>
<li>\\(cf\\) for any constant \\(c \\in \\mathbb{R}\\),</li>
<li>\\(f \\cdot g\\),</li>
<li>\\(\\dfrac{f}{g}\\) provided \\(g(a) \\neq 0\\).</li>
</ol>
</div>

<div class="env-block proof">
<div class="env-title">Proof sketch for (3)</div>
<p>We use the limit product law. Since \\(f\\) and \\(g\\) are continuous at \\(a\\),</p>
\\[\\lim_{x \\to a} [f(x) \\cdot g(x)] = \\left[\\lim_{x \\to a} f(x)\\right] \\cdot \\left[\\lim_{x \\to a} g(x)\\right] = f(a) \\cdot g(a),\\]
<p>so \\(f \\cdot g\\) is continuous at \\(a\\). \\(\\square\\)</p>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 2.3 — Composition of Continuous Functions</div>
<p>If \\(g\\) is continuous at \\(a\\) and \\(f\\) is continuous at \\(g(a)\\), then \\(f \\circ g\\) is continuous at \\(a\\):</p>
\\[\\lim_{x \\to a} f(g(x)) = f\\!\\left(\\lim_{x \\to a} g(x)\\right) = f(g(a)).\\]
</div>

<p>This is extremely powerful. It means, for instance, that \\(e^{\\sin x}\\), \\(\\sqrt{x^2 + 1}\\), and \\(\\cos(x^3 - 2x)\\) are all continuous on their natural domains, because they are compositions of continuous functions.</p>

<div class="viz-placeholder" data-viz="viz-composition-continuous"></div>

<div class="env-block example">
<div class="env-title">Example 2.4</div>
<p>Where is \\(f(x) = \\ln(4 - x^2)\\) continuous?</p>
<p>The inner function \\(g(x) = 4 - x^2\\) is a polynomial (continuous everywhere). The outer function \\(\\ln(u)\\) is continuous for \\(u > 0\\). So \\(f\\) is continuous where \\(4 - x^2 > 0\\), i.e., \\(x \\in (-2, 2)\\).</p>
</div>

<div class="env-block example">
<div class="env-title">Example 2.5</div>
<p>Is \\(f(x) = \\dfrac{x^2 \\sin(1/x)}{x^2+1}\\) continuous at \\(x = 0\\)?</p>
<p>At \\(x = 0\\), \\(f(0) = 0\\). For \\(x \\neq 0\\), the numerator satisfies \\(|x^2 \\sin(1/x)| \\leq x^2\\), so \\(|f(x)| \\leq \\frac{x^2}{x^2+1} \\to 0\\). Thus \\(f\\) is continuous at \\(0\\).</p>
</div>

<div class="viz-placeholder" data-viz="viz-continuous-algebra"></div>
`,
            visualizations: [
                {
                    id: 'viz-composition-continuous',
                    title: 'Composition of Continuous Functions',
                    description: 'See how \\(f(g(x))\\) inherits continuity. The outer function \\(f\\) is applied to the output of \\(g\\).',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 40, originX: 200, originY: 200 });

                        const g = x => Math.sin(x);
                        const f = u => u * u;     // f(u) = u^2
                        const comp = x => f(g(x)); // sin^2(x)

                        let traceX = 1.0;
                        const drag = viz.addDraggable('x', traceX, 0, viz.colors.yellow, 8, (wx) => {
                            traceX = Math.max(-3, Math.min(8, wx));
                            drag.x = traceX;
                            drag.y = 0;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw g(x) = sin(x)
                            viz.drawFunction(g, -3, 9, viz.colors.teal, 2);
                            // Draw f(g(x)) = sin^2(x)
                            viz.drawFunction(comp, -3, 9, viz.colors.orange, 2.5);

                            // Trace
                            const gVal = g(traceX);
                            const fgVal = comp(traceX);

                            viz.drawSegment(traceX, 0, traceX, gVal, viz.colors.teal + '66', 1, true);
                            viz.drawPoint(traceX, gVal, viz.colors.teal, 'g(x)=' + gVal.toFixed(2), 5);

                            viz.drawSegment(traceX, 0, traceX, fgVal, viz.colors.orange + '66', 1, true);
                            viz.drawPoint(traceX, fgVal, viz.colors.orange, 'f(g(x))=' + fgVal.toFixed(2), 5);

                            // Legend
                            viz.screenText('g(x) = sin x', 10, 16, viz.colors.teal, 12, 'left', 'top');
                            viz.screenText('f(g(x)) = sin^2 x', 10, 32, viz.colors.orange, 12, 'left', 'top');

                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-continuous-algebra',
                    title: 'Sum and Product of Continuous Functions',
                    description: 'Toggle between sum \\(f+g\\) and product \\(f \\cdot g\\) to see that combining continuous functions preserves continuity.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 35, originX: 180, originY: 200 });

                        const f = x => Math.cos(x);
                        const g = x => 0.5 * x;
                        let mode = 'sum'; // or 'product'

                        VizEngine.createButton(controls, 'f + g', () => { mode = 'sum'; });
                        VizEngine.createButton(controls, 'f * g', () => { mode = 'product'; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            viz.drawFunction(f, -3, 9, viz.colors.blue, 1.5);
                            viz.drawFunction(g, -3, 9, viz.colors.green, 1.5);

                            const combo = mode === 'sum' ? (x => f(x) + g(x)) : (x => f(x) * g(x));
                            viz.drawFunction(combo, -3, 9, viz.colors.orange, 2.5);

                            viz.screenText('f(x) = cos x', 10, 16, viz.colors.blue, 12, 'left', 'top');
                            viz.screenText('g(x) = 0.5x', 10, 32, viz.colors.green, 12, 'left', 'top');
                            const label = mode === 'sum' ? '(f+g)(x)' : '(f*g)(x)';
                            viz.screenText(label, 10, 48, viz.colors.orange, 12, 'left', 'top');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Where is \\(f(x) = \\dfrac{e^x}{x^2 - 4}\\) continuous?',
                    hint: 'The denominator is zero at \\(x = \\pm 2\\).',
                    solution: '\\(e^x\\) is continuous everywhere and \\(x^2 - 4\\) is a polynomial (continuous everywhere). The quotient is continuous wherever the denominator is nonzero, i.e., on \\((-\\infty, -2) \\cup (-2, 2) \\cup (2, \\infty)\\).'
                },
                {
                    question: 'Prove that \\(h(x) = |f(x)|\\) is continuous whenever \\(f\\) is continuous.',
                    hint: 'Write \\(|u| = \\sqrt{u^2}\\) and use the composition theorem.',
                    solution: 'The function \\(|u|\\) is continuous on all of \\(\\mathbb{R}\\) (you can verify the \\(\\varepsilon\\text{-}\\delta\\) definition directly using \\(||a| - |b|| \\leq |a - b|\\)). Since \\(f\\) is continuous, the composition \\(|f(x)|\\) is continuous by Theorem 2.3.'
                },
                {
                    question: 'Find the domain of continuity for \\(g(x) = \\arcsin(\\ln x)\\).',
                    hint: 'The arcsine function requires its input to be in \\([-1, 1]\\). When is \\(-1 \\leq \\ln x \\leq 1\\)?',
                    solution: 'We need \\(-1 \\leq \\ln x \\leq 1\\), which gives \\(e^{-1} \\leq x \\leq e\\). On this interval, \\(\\ln x\\) is continuous (composition of continuous functions), and \\(\\arcsin\\) is continuous on \\([-1,1]\\). So \\(g\\) is continuous on \\([1/e,\\ e]\\).'
                }
            ]
        },

        // ===== SECTION 4: Intermediate Value Theorem =====
        {
            id: 'sec-ivt',
            title: 'Intermediate Value Theorem',
            content: `
<h2>Intermediate Value Theorem</h2>

<p>One of the most important consequences of continuity is that a continuous function cannot "skip" values. If it starts below a line and ends above it, it must cross somewhere in between.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 2.4 — Intermediate Value Theorem (IVT)</div>
<p>If \\(f\\) is continuous on \\([a, b]\\) and \\(N\\) is any number between \\(f(a)\\) and \\(f(b)\\), then there exists at least one \\(c \\in (a, b)\\) such that \\(f(c) = N\\).</p>
</div>

<div class="env-block proof">
<div class="env-title">Proof sketch</div>
<p>Assume \\(f(a) < N < f(b)\\) (the other case is analogous). Define</p>
\\[S = \\{x \\in [a,b] : f(x) < N\\}.\\]
<p>The set \\(S\\) is nonempty (it contains \\(a\\)) and bounded above by \\(b\\). Let \\(c = \\sup S\\). By the continuity of \\(f\\):</p>
<ul>
<li>If \\(f(c) < N\\), we could find points just to the right of \\(c\\) still in \\(S\\), contradicting \\(c = \\sup S\\).</li>
<li>If \\(f(c) > N\\), we could find points just to the left of \\(c\\) with \\(f > N\\), contradicting that \\(c\\) is the <em>least</em> upper bound of \\(S\\).</li>
</ul>
<p>Therefore \\(f(c) = N\\). \\(\\square\\)</p>
</div>

<div class="viz-placeholder" data-viz="viz-ivt-demo"></div>

<div class="env-block corollary">
<div class="env-title">Corollary 2.1 — Root-Finding (Bolzano's Theorem)</div>
<p>If \\(f\\) is continuous on \\([a,b]\\) and \\(f(a)\\) and \\(f(b)\\) have <strong>opposite signs</strong>, then there exists \\(c \\in (a,b)\\) with \\(f(c) = 0\\).</p>
</div>

<p>This corollary underpins the <strong>bisection method</strong>: to find a root of \\(f\\) on \\([a,b]\\) (where \\(f(a)\\) and \\(f(b)\\) have opposite signs), repeatedly cut the interval in half. At each step, keep the half-interval where the sign change occurs.</p>

<div class="viz-placeholder" data-viz="viz-bisection"></div>

<div class="env-block example">
<div class="env-title">Example 2.6 — Proving a Root Exists</div>
<p>Show that \\(x^3 + x - 1 = 0\\) has a solution in \\((0, 1)\\).</p>
<p>Let \\(f(x) = x^3 + x - 1\\). Then \\(f(0) = -1 < 0\\) and \\(f(1) = 1 > 0\\). Since \\(f\\) is a polynomial (hence continuous), the IVT guarantees a root \\(c \\in (0, 1)\\).</p>
</div>

<div class="env-block remark">
<div class="env-title">Remark</div>
<p>The IVT requires continuity on the entire closed interval. A function with a jump discontinuity can skip over values. For instance, the sign function \\(\\text{sgn}(x)\\) jumps from \\(-1\\) to \\(1\\) at \\(x = 0\\) without ever equaling \\(0\\) (unless we define \\(\\text{sgn}(0) = 0\\)).</p>
</div>
`,
            visualizations: [
                {
                    id: 'viz-ivt-demo',
                    title: 'Intermediate Value Theorem',
                    description: 'Drag the horizontal line \\(y = N\\). The IVT guarantees at least one crossing point \\(c\\) with \\(f(c) = N\\).',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 45, originX: 140, originY: 260 });

                        const f = x => 0.15 * (x * x * x) - 0.8 * x * x + 1.2 * x + 0.5;
                        const a = 0, b = 5;
                        const fa = f(a), fb = f(b);

                        let N = 1.0;
                        const drag = viz.addDraggable('N', -0.5, N, viz.colors.yellow, 8, (wx, wy) => {
                            const minN = Math.min(fa, fb) - 0.3;
                            const maxN = Math.max(fa, fb) + 0.3;
                            N = Math.max(minN, Math.min(maxN, wy));
                            drag.x = -0.5;
                            drag.y = N;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Shade interval [a, b]
                            viz.drawVerticalBand((a + b) / 2, (b - a) / 2, viz.colors.blue + '0a');

                            // Draw curve
                            viz.drawFunction(f, -1, 7, viz.colors.blue, 2.5);

                            // Horizontal line y = N
                            viz.drawSegment(-1, N, 7, N, viz.colors.yellow, 1.5, true);

                            // Find crossings in [a, b]
                            const crossings = [];
                            const steps = 1000;
                            for (let i = 0; i < steps; i++) {
                                const x1 = a + (b - a) * i / steps;
                                const x2 = a + (b - a) * (i + 1) / steps;
                                const y1 = f(x1) - N, y2 = f(x2) - N;
                                if (y1 * y2 <= 0 && (Math.abs(y1) + Math.abs(y2)) > 0) {
                                    // linear interpolation for crossing
                                    const xc = Math.abs(y2) < 1e-10 ? x2 : x1 - y1 * (x2 - x1) / (y2 - y1);
                                    crossings.push(xc);
                                }
                            }

                            for (const c of crossings) {
                                viz.drawSegment(c, 0, c, N, viz.colors.green + '66', 1, true);
                                viz.drawPoint(c, N, viz.colors.green, 'c', 5);
                            }

                            // Endpoints
                            viz.drawPoint(a, fa, viz.colors.orange, 'f(a)', 5);
                            viz.drawPoint(b, fb, viz.colors.orange, 'f(b)', 5);

                            // Labels
                            viz.screenText('N = ' + N.toFixed(2), viz.width - 10, 20, viz.colors.yellow, 13, 'right', 'top');
                            viz.screenText(crossings.length + ' crossing(s) found', viz.width - 10, 38, viz.colors.green, 12, 'right', 'top');

                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-bisection',
                    title: 'Bisection Method for Root-Finding',
                    description: 'Click "Step" to perform one iteration of the bisection algorithm on \\(f(x) = x^3 + x - 1\\). Watch the interval shrink toward the root.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 55, originX: 140, originY: 220 });

                        const f = x => x * x * x + x - 1;
                        let lo = 0, hi = 1;
                        let steps = [];
                        steps.push({ lo: 0, hi: 1, mid: 0.5 });

                        VizEngine.createButton(controls, 'Step', () => {
                            const current = steps[steps.length - 1];
                            const mid = (current.lo + current.hi) / 2;
                            const fLo = f(current.lo), fMid = f(mid);
                            let newLo, newHi;
                            if (fLo * fMid <= 0) { newLo = current.lo; newHi = mid; }
                            else { newLo = mid; newHi = current.hi; }
                            const newMid = (newLo + newHi) / 2;
                            steps.push({ lo: newLo, hi: newHi, mid: newMid });
                            if (steps.length > 20) steps = steps.slice(-20);
                        });

                        VizEngine.createButton(controls, 'Reset', () => {
                            steps = [{ lo: 0, hi: 1, mid: 0.5 }];
                        });

                        const infoDiv = document.createElement('div');
                        infoDiv.style.cssText = 'color:#c9d1d9;font-size:0.8rem;margin-top:6px;font-family:monospace;';
                        body.appendChild(infoDiv);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            viz.drawFunction(f, -1, 3, viz.colors.blue, 2.5);

                            // y = 0 line highlight
                            viz.drawSegment(-1, 0, 3, 0, viz.colors.white + '33', 1);

                            const current = steps[steps.length - 1];

                            // Shade current interval
                            viz.drawVerticalBand((current.lo + current.hi) / 2, (current.hi - current.lo) / 2, viz.colors.green + '22');

                            // Endpoints
                            viz.drawPoint(current.lo, f(current.lo), viz.colors.red, '', 4);
                            viz.drawPoint(current.hi, f(current.hi), viz.colors.green, '', 4);

                            // Midpoint
                            const mid = current.mid;
                            viz.drawPoint(mid, f(mid), viz.colors.yellow, '', 5);
                            viz.drawSegment(mid, 0, mid, f(mid), viz.colors.yellow + '66', 1, true);

                            infoDiv.innerHTML =
                                'Step ' + steps.length + ':<br>' +
                                'Interval: [' + current.lo.toFixed(6) + ', ' + current.hi.toFixed(6) + ']<br>' +
                                'Width: ' + (current.hi - current.lo).toFixed(6) + '<br>' +
                                'Midpoint: ' + mid.toFixed(6) + ', f(mid) = ' + f(mid).toFixed(6);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the IVT to show that \\(\\cos x = x\\) has at least one solution on \\((0, \\pi/2)\\).',
                    hint: 'Define \\(g(x) = \\cos x - x\\) and check its sign at the endpoints.',
                    solution: 'Let \\(g(x) = \\cos x - x\\). Then \\(g(0) = 1 > 0\\) and \\(g(\\pi/2) = 0 - \\pi/2 < 0\\). Since \\(g\\) is continuous on \\([0, \\pi/2]\\) and changes sign, the IVT guarantees a \\(c \\in (0, \\pi/2)\\) with \\(g(c) = 0\\), i.e., \\(\\cos c = c\\).'
                },
                {
                    question: 'Prove that every polynomial of odd degree has at least one real root.',
                    hint: 'A polynomial of odd degree with positive leading coefficient satisfies \\(p(x) \\to -\\infty\\) as \\(x \\to -\\infty\\) and \\(p(x) \\to +\\infty\\) as \\(x \\to +\\infty\\).',
                    solution: 'Let \\(p(x) = a_n x^n + \\cdots + a_0\\) with \\(n\\) odd and \\(a_n > 0\\) (WLOG). Then \\(\\lim_{x \\to -\\infty} p(x) = -\\infty\\) and \\(\\lim_{x \\to +\\infty} p(x) = +\\infty\\). So there exist \\(a < b\\) with \\(p(a) < 0 < p(b)\\). Since \\(p\\) is a polynomial (continuous), the IVT gives a root \\(c \\in (a,b)\\) with \\(p(c) = 0\\).'
                },
                {
                    question: 'Apply two steps of the bisection method to find a root of \\(f(x) = x^2 - 2\\) on \\([1, 2]\\).',
                    hint: 'Compute \\(f(1.5)\\). Then decide which half-interval to keep.',
                    solution: '<b>Step 1:</b> midpoint \\(m = 1.5\\), \\(f(1.5) = 0.25 > 0\\). Since \\(f(1) = -1 < 0\\), the root is in \\([1, 1.5]\\).<br><b>Step 2:</b> midpoint \\(m = 1.25\\), \\(f(1.25) = -0.4375 < 0\\). Since \\(f(1.5) > 0\\), the root is in \\([1.25, 1.5]\\). The true root is \\(\\sqrt{2} \\approx 1.4142\\).'
                },
                {
                    question: 'Show that if \\(f: [0,1] \\to [0,1]\\) is continuous, then \\(f\\) has a fixed point (i.e., some \\(c\\) with \\(f(c) = c\\)).',
                    hint: 'Consider \\(g(x) = f(x) - x\\) and apply the IVT.',
                    solution: 'Let \\(g(x) = f(x) - x\\). Then \\(g(0) = f(0) \\geq 0\\) (since \\(f: [0,1] \\to [0,1]\\)) and \\(g(1) = f(1) - 1 \\leq 0\\). If \\(g(0) = 0\\) or \\(g(1) = 0\\), we are done. Otherwise \\(g(0) > 0 > g(1)\\), so by the IVT there exists \\(c \\in (0,1)\\) with \\(g(c) = 0\\), i.e., \\(f(c) = c\\).'
                }
            ]
        },

        // ===== SECTION 5: Extreme Value Theorem =====
        {
            id: 'sec-evt',
            title: 'Extreme Value Theorem',
            content: `
<h2>Extreme Value Theorem</h2>

<p>A continuous function on a <em>closed bounded</em> interval is guaranteed to attain both a maximum and a minimum value. This is a fundamental result with far-reaching applications in optimization.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 2.5 — Extreme Value Theorem (EVT)</div>
<p>If \\(f\\) is continuous on a closed interval \\([a, b]\\), then \\(f\\) attains an <strong>absolute maximum</strong> value \\(f(c)\\) and an <strong>absolute minimum</strong> value \\(f(d)\\) for some \\(c, d \\in [a, b]\\).</p>
<p>That is, for all \\(x \\in [a,b]\\),</p>
\\[f(d) \\leq f(x) \\leq f(c).\\]
</div>

<div class="env-block proof">
<div class="env-title">Proof sketch (Boundedness)</div>
<p>First we show \\(f\\) is <strong>bounded</strong> on \\([a,b]\\). Suppose not: then for each \\(n\\), there exists \\(x_n \\in [a,b]\\) with \\(|f(x_n)| > n\\). By the Bolzano-Weierstrass theorem, \\((x_n)\\) has a convergent subsequence \\(x_{n_k} \\to c \\in [a,b]\\). But continuity gives \\(f(x_{n_k}) \\to f(c)\\), contradicting \\(|f(x_{n_k})| \\to \\infty\\).</p>
<p>Let \\(M = \\sup_{[a,b]} f(x)\\). A similar argument shows \\(M\\) is attained: pick \\(x_n\\) with \\(f(x_n) \\to M\\), extract a convergent subsequence, and use continuity. \\(\\square\\)</p>
</div>

<div class="viz-placeholder" data-viz="viz-evt-demo"></div>

<div class="env-block remark">
<div class="env-title">Why both conditions matter</div>
<p>The EVT requires <em>both</em> continuity and a <em>closed bounded</em> interval:</p>
<ul>
<li><strong>Open interval:</strong> \\(f(x) = x\\) on \\((0, 1)\\) has no max or min (endpoints not included).</li>
<li><strong>Unbounded interval:</strong> \\(f(x) = x\\) on \\([0, \\infty)\\) has no maximum.</li>
<li><strong>Discontinuous:</strong> \\(f(x) = \\begin{cases} x & 0 \\leq x < 1 \\\\ 0 & x = 1 \\end{cases}\\) on \\([0, 1]\\) never reaches \\(\\sup f = 1\\).</li>
</ul>
</div>

<div class="viz-placeholder" data-viz="viz-evt-counterexamples"></div>

<div class="env-block example">
<div class="env-title">Example 2.7</div>
<p>Find the absolute maximum and minimum of \\(f(x) = x^3 - 3x + 1\\) on \\([-2, 2]\\).</p>
<p>By the EVT, they exist. To find them, we evaluate \\(f\\) at the critical points and endpoints. \\(f'(x) = 3x^2 - 3 = 0\\) gives \\(x = \\pm 1\\).</p>
<ul>
<li>\\(f(-2) = -8 + 6 + 1 = -1\\)</li>
<li>\\(f(-1) = -1 + 3 + 1 = 3\\) (abs max)</li>
<li>\\(f(1) = 1 - 3 + 1 = -1\\) (abs min, tied with \\(f(-2)\\))</li>
<li>\\(f(2) = 8 - 6 + 1 = 3\\) (abs max, tied with \\(f(-1)\\))</li>
</ul>
<p>Absolute max = \\(3\\), absolute min = \\(-1\\).</p>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 2.6 — Boundedness Theorem</div>
<p>If \\(f\\) is continuous on \\([a, b]\\), then \\(f\\) is bounded on \\([a, b]\\): there exists \\(M > 0\\) such that \\(|f(x)| \\leq M\\) for all \\(x \\in [a, b]\\).</p>
</div>

<p>The Boundedness Theorem is actually a stepping stone in the proof of the EVT, but it is useful in its own right. It tells us that continuous functions on closed intervals cannot "blow up."</p>
`,
            visualizations: [
                {
                    id: 'viz-evt-demo',
                    title: 'Extreme Value Theorem in Action',
                    description: 'Drag the interval endpoints \\(a\\) and \\(b\\). The absolute max and min on \\([a,b]\\) are highlighted.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 40, originX: 140, originY: 210 });

                        const f = x => 0.2 * x * x * x - 1.2 * x * x + 1.5 * x + 2;

                        let aVal = 0.5, bVal = 5;

                        const dragA = viz.addDraggable('a', aVal, 0, viz.colors.green, 8, (wx) => {
                            aVal = Math.max(-1, Math.min(bVal - 0.3, wx));
                            dragA.x = aVal; dragA.y = 0;
                        });
                        const dragB = viz.addDraggable('b', bVal, 0, viz.colors.green, 8, (wx) => {
                            bVal = Math.max(aVal + 0.3, Math.min(7, wx));
                            dragB.x = bVal; dragB.y = 0;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            // Shade interval
                            viz.drawVerticalBand((aVal + bVal) / 2, (bVal - aVal) / 2, viz.colors.blue + '10');

                            viz.drawAxes();
                            viz.drawFunction(f, -2, 8, viz.colors.blue, 2.5);

                            // Find max and min on [aVal, bVal]
                            let maxVal = -Infinity, minVal = Infinity;
                            let maxX = aVal, minX = aVal;
                            const steps = 500;
                            for (let i = 0; i <= steps; i++) {
                                const x = aVal + (bVal - aVal) * i / steps;
                                const y = f(x);
                                if (y > maxVal) { maxVal = y; maxX = x; }
                                if (y < minVal) { minVal = y; minX = x; }
                            }

                            // Highlight max and min
                            viz.drawSegment(-2, maxVal, 8, maxVal, viz.colors.red + '44', 1, true);
                            viz.drawSegment(-2, minVal, 8, minVal, viz.colors.teal + '44', 1, true);

                            viz.drawPoint(maxX, maxVal, viz.colors.red, 'Max=' + maxVal.toFixed(2), 6);
                            viz.drawPoint(minX, minVal, viz.colors.teal, 'Min=' + minVal.toFixed(2), 6);

                            // Interval boundary markers
                            viz.drawSegment(aVal, -2, aVal, 7, viz.colors.green + '44', 1, true);
                            viz.drawSegment(bVal, -2, bVal, 7, viz.colors.green + '44', 1, true);

                            viz.drawText('a', aVal, -0.6, viz.colors.green, 12);
                            viz.drawText('b', bVal, -0.6, viz.colors.green, 12);

                            viz.drawDraggables();
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-evt-counterexamples',
                    title: 'When the EVT Fails',
                    description: 'Three scenarios where the EVT hypotheses are not met: open interval, unbounded domain, and discontinuity.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 560, height: 360, scale: 30, originX: 280, originY: 180 });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const w = viz.width, h = viz.height;
                            const tw = w / 3;

                            // Dividers
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(tw, 0); ctx.lineTo(tw, h); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(tw * 2, 0); ctx.lineTo(tw * 2, h); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Open interval', tw / 2, 6);
                            ctx.fillText('Unbounded domain', tw + tw / 2, 6);
                            ctx.fillText('Discontinuous', tw * 2 + tw / 2, 6);

                            const scale = 25;
                            const drawMiniF = (ox, oy, fn, xMin, xMax, color) => {
                                ctx.strokeStyle = color; ctx.lineWidth = 2;
                                ctx.beginPath();
                                let started = false;
                                for (let i = 0; i <= 200; i++) {
                                    const x = xMin + (xMax - xMin) * i / 200;
                                    const y = fn(x);
                                    if (!isFinite(y) || Math.abs(y) > 6) { started = false; continue; }
                                    const sx = ox + x * scale, sy = oy - y * scale;
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            };
                            const miniPt = (ox, oy, x, y, color, open) => {
                                const sx = ox + x * scale, sy = oy - y * scale;
                                ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2);
                                if (open) {
                                    ctx.fillStyle = viz.colors.bg; ctx.fill();
                                    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
                                } else {
                                    ctx.fillStyle = color; ctx.fill();
                                }
                            };
                            const miniAxes = (ox, oy) => {
                                ctx.strokeStyle = viz.colors.axis + '55'; ctx.lineWidth = 0.8;
                                ctx.beginPath(); ctx.moveTo(ox - 70, oy); ctx.lineTo(ox + 70, oy); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(ox, oy - 80); ctx.lineTo(ox, oy + 60); ctx.stroke();
                            };

                            // (1) f(x) = 1/x on (0, 1) -- no max at x->0+
                            const ox1 = tw / 2, oy1 = h / 2 + 20;
                            miniAxes(ox1, oy1);
                            drawMiniF(ox1, oy1, x => x, 0.05, 2.5, viz.colors.blue);
                            miniPt(ox1, oy1, 0, 0, viz.colors.blue, true);
                            miniPt(ox1, oy1, 2.5, 2.5, viz.colors.blue, true);
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('f(x)=x on (0,1)', ox1, oy1 + 55);
                            ctx.fillText('no max/min attained', ox1, oy1 + 68);

                            // (2) f(x) = x on [0, inf) -- no max
                            const ox2 = tw + tw / 2, oy2 = h / 2 + 20;
                            miniAxes(ox2, oy2);
                            drawMiniF(ox2, oy2, x => 0.8 * x, 0, 3, viz.colors.blue);
                            miniPt(ox2, oy2, 0, 0, viz.colors.blue, false);
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                            // Arrow tip
                            const ax2 = ox2 + 3 * scale, ay2 = oy2 - 0.8 * 3 * scale;
                            ctx.beginPath();
                            ctx.moveTo(ax2, ay2);
                            ctx.lineTo(ax2 - 8, ay2 + 3);
                            ctx.lineTo(ax2 - 5, ay2 + 8);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('f(x)=x on [0, inf)', ox2, oy2 + 55);
                            ctx.fillText('no maximum', ox2, oy2 + 68);

                            // (3) Discontinuous on [0,1]: f(x)=x for x<1, f(1)=0
                            const ox3 = tw * 2 + tw / 2, oy3 = h / 2 + 20;
                            miniAxes(ox3, oy3);
                            drawMiniF(ox3, oy3, x => x, 0, 2.45, viz.colors.blue);
                            miniPt(ox3, oy3, 2.5, 2.5, viz.colors.blue, true); // open at right
                            miniPt(ox3, oy3, 2.5, 0, viz.colors.orange, false); // defined at 0
                            miniPt(ox3, oy3, 0, 0, viz.colors.blue, false);
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('f(x)=x if x<1, f(1)=0', ox3, oy3 + 55);
                            ctx.fillText('sup=1 not attained', ox3, oy3 + 68);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the absolute maximum and minimum of \\(f(x) = x^3 - 6x^2 + 9x + 2\\) on \\([0, 4]\\).',
                    hint: 'Find the critical points by setting \\(f\'(x) = 0\\), then evaluate \\(f\\) at the critical points and the endpoints.',
                    solution: '\\(f\'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3) = 0\\) gives \\(x = 1\\) and \\(x = 3\\). Evaluating: \\(f(0) = 2\\), \\(f(1) = 6\\), \\(f(3) = 2\\), \\(f(4) = 6\\). The absolute maximum is \\(6\\) (at \\(x = 1\\) and \\(x = 4\\)) and the absolute minimum is \\(2\\) (at \\(x = 0\\) and \\(x = 3\\)).'
                },
                {
                    question: 'Give an example of a bounded continuous function on an open interval that does not attain its supremum.',
                    hint: 'Consider a simple function on \\((0, 1)\\) whose range approaches but never reaches a value.',
                    solution: 'Let \\(f(x) = x\\) on \\((0, 1)\\). Then \\(\\sup f = 1\\), but there is no \\(x \\in (0, 1)\\) with \\(f(x) = 1\\). The supremum is not attained because the interval is open.'
                },
                {
                    question: 'Let \\(f\\) be continuous on \\([0, 2]\\) with \\(f(0) = 1\\) and \\(f(2) = 5\\). Must there exist \\(c \\in [0,2]\\) with \\(f(c) = 4\\)?',
                    hint: 'This is a direct application of the IVT. Check whether \\(4\\) is between \\(f(0)\\) and \\(f(2)\\).',
                    solution: 'Yes. Since \\(f\\) is continuous on \\([0, 2]\\) and \\(f(0) = 1 < 4 < 5 = f(2)\\), the IVT guarantees that there exists \\(c \\in (0, 2)\\) with \\(f(c) = 4\\).'
                }
            ]
        }
    ]
});
