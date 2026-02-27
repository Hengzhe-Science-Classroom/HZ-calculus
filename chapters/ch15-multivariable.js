window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'Multivariable Functions & Partial Derivatives',
    subtitle: 'Functions of several variables: partial derivatives, gradients, and directional derivatives',
    sections: [
        // ===== SECTION 1: Functions of Several Variables =====
        {
            id: 'functions-several-variables',
            title: 'Functions of Several Variables',
            content: `
<h2>1 &middot; Functions of Several Variables</h2>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Function of Two Variables</div>
A <strong>function of two variables</strong> is a rule \\(f\\) that assigns to each ordered pair \\((x,y)\\) in a set \\(D \\subseteq \\mathbb{R}^2\\) a unique real number \\(f(x,y)\\). The set \\(D\\) is the <strong>domain</strong> and the set of all values \\(f(x,y)\\) is the <strong>range</strong>.
</div>

<p>
Just as a function of one variable \\(y = f(x)\\) has a graph that is a curve in \\(\\mathbb{R}^2\\), a function of two variables \\(z = f(x,y)\\) has a graph that is a <strong>surface</strong> in \\(\\mathbb{R}^3\\). We cannot draw true 3D surfaces on a flat screen as easily, so we often use alternative representations.
</p>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Level Curve</div>
A <strong>level curve</strong> (or <strong>contour line</strong>) of \\(f(x,y)\\) is the set of all points \\((x,y)\\) where \\(f(x,y) = c\\) for a fixed constant \\(c\\). The collection of level curves for different values of \\(c\\) is called a <strong>contour map</strong>.
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Reading a Contour Map</div>
Think of a topographic map. Each contour line represents a fixed elevation. Where contour lines are <strong>close together</strong>, the terrain is steep; where they are <strong>far apart</strong>, it is flat. The same principle applies to any function \\(f(x,y)\\): closely spaced level curves indicate rapid change (large gradient), while widely spaced curves indicate slow change.
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Common Surfaces</div>
<ol>
<li><strong>Paraboloid:</strong> \\(f(x,y) = x^2 + y^2\\). Level curves are circles \\(x^2 + y^2 = c\\) for \\(c \\geq 0\\).</li>
<li><strong>Saddle surface:</strong> \\(f(x,y) = x^2 - y^2\\). Level curves are hyperbolas \\(x^2 - y^2 = c\\).</li>
<li><strong>Plane:</strong> \\(f(x,y) = 2x + 3y\\). Level curves are parallel lines \\(2x + 3y = c\\).</li>
<li><strong>Cone:</strong> \\(f(x,y) = \\sqrt{x^2 + y^2}\\). Level curves are circles of radius \\(c\\).</li>
</ol>
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Functions of \\(n\\) Variables</div>
More generally, a function \\(f : D \\subseteq \\mathbb{R}^n \\to \\mathbb{R}\\) assigns to each point \\((x_1, x_2, \\ldots, x_n)\\) in \\(D\\) a real number. For \\(n = 3\\), the <strong>level surfaces</strong> \\(f(x,y,z) = c\\) are surfaces in \\(\\mathbb{R}^3\\). For \\(n > 3\\), geometric intuition breaks down but the algebra carries through unchanged.
</div>

<p>
When determining the domain of a multivariable function, we look for all points where the formula makes sense. For example, \\(f(x,y) = \\ln(1 - x^2 - y^2)\\) requires \\(x^2 + y^2 < 1\\), so the domain is the open unit disk.
</p>

<div class="viz-container" data-viz="contour-explorer">
<div class="viz-canvas" id="contour-explorer"></div>
<div class="viz-controls" id="contour-explorer-controls"></div>
<div class="viz-caption">Contour plot of selectable functions. Colors encode the value of f(x,y). Closely spaced contours indicate steep regions.</div>
</div>

<div class="env-block remark">
<div class="env-label">Remark &mdash; Graphs vs. Contour Plots</div>
A graph \\(z = f(x,y)\\) lives in three dimensions. A contour plot is a two-dimensional visualization that captures the same information by slicing the surface at constant heights. In practice, contour plots are often more informative because they display relative rates of change clearly.
</div>
`,
            visualizations: [
                {
                    id: 'contour-explorer',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 40 });

                        const functions = [
                            { name: 'x\u00B2 + y\u00B2', f: (x, y) => x * x + y * y },
                            { name: 'x\u00B2 - y\u00B2', f: (x, y) => x * x - y * y },
                            { name: 'sin(x)cos(y)', f: (x, y) => Math.sin(x) * Math.cos(y) },
                            { name: 'xy', f: (x, y) => x * y }
                        ];
                        let selected = 0;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const f = functions[selected].f;
                            const ctx = viz.ctx;
                            const w = viz.width;
                            const h = viz.height;

                            // Compute function values on a pixel grid
                            const values = [];
                            let fMin = Infinity, fMax = -Infinity;
                            for (let py = 0; py < h; py += 3) {
                                for (let px = 0; px < w; px += 3) {
                                    const [mx, my] = viz.toMath(px, py);
                                    const v = f(mx, my);
                                    values.push({ px, py, v });
                                    if (isFinite(v)) {
                                        if (v < fMin) fMin = v;
                                        if (v > fMax) fMax = v;
                                    }
                                }
                            }

                            // Draw heat map
                            const range = fMax - fMin || 1;
                            for (const { px, py, v } of values) {
                                if (!isFinite(v)) continue;
                                const t = (v - fMin) / range;
                                const r = Math.round(20 + 100 * t);
                                const g = Math.round(20 + 60 * (1 - Math.abs(t - 0.5) * 2));
                                const b = Math.round(120 - 80 * t);
                                ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',0.4)';
                                ctx.fillRect(px, py, 3, 3);
                            }

                            // Draw contour lines
                            const nLevels = 10;
                            const step = range / nLevels;
                            ctx.lineWidth = 1.2;
                            for (let k = 1; k < nLevels; k++) {
                                const c = fMin + k * step;
                                const hue = 200 + k * 15;
                                ctx.strokeStyle = 'hsl(' + hue + ', 70%, 65%)';
                                ctx.beginPath();
                                let started = false;
                                // March along horizontal lines
                                for (let py = 0; py < h; py += 2) {
                                    for (let px = 0; px < w - 2; px += 2) {
                                        const [mx1, my1] = viz.toMath(px, py);
                                        const [mx2, my2] = viz.toMath(px + 2, py);
                                        const v1 = f(mx1, my1);
                                        const v2 = f(mx2, my2);
                                        if ((v1 - c) * (v2 - c) < 0) {
                                            const t = (c - v1) / (v2 - v1);
                                            const ix = px + t * 2;
                                            if (!started) {
                                                ctx.moveTo(ix, py);
                                                started = true;
                                            } else {
                                                ctx.lineTo(ix, py);
                                            }
                                        }
                                    }
                                    started = false;
                                }
                                ctx.stroke();
                            }

                            // Redraw axes on top
                            viz.drawAxes();

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('f(x,y) = ' + functions[selected].name, 12, 20);
                        }

                        VizEngine.createSlider(controls, 'Function', 0, functions.length - 1, selected, 1, v => { selected = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'mv-ex1',
                    type: 'short-answer',
                    question: 'Find the domain of f(x,y) = ln(9 - x^2 - y^2). Express your answer as a region in the xy-plane.',
                    hint: 'The natural logarithm requires a strictly positive argument.',
                    solution: 'We need 9 - x^2 - y^2 > 0, i.e., x^2 + y^2 < 9. The domain is the open disk of radius 3 centered at the origin.'
                },
                {
                    id: 'mv-ex2',
                    type: 'short-answer',
                    question: 'Describe the level curves of f(x,y) = x^2 + 4y^2 for c = 1, 4, 9.',
                    hint: 'Set f(x,y) = c and identify the type of conic section.',
                    solution: 'Each level curve x^2 + 4y^2 = c is an ellipse with semi-axes a = sqrt(c) along the x-axis and b = sqrt(c/4) = sqrt(c)/2 along the y-axis. For c = 1: ellipse with a = 1, b = 1/2. For c = 4: a = 2, b = 1. For c = 9: a = 3, b = 3/2.'
                },
                {
                    id: 'mv-ex3',
                    type: 'short-answer',
                    question: 'The function f(x,y) = x^2 - y^2 has level curves that are hyperbolas. For which value of c does the level curve degenerate into a pair of straight lines?',
                    hint: 'A hyperbola degenerates when c = 0. Factor the equation.',
                    solution: 'When c = 0, we have x^2 - y^2 = 0, which factors as (x - y)(x + y) = 0. This gives the two lines y = x and y = -x.'
                }
            ]
        },

        // ===== SECTION 2: Limits & Continuity in R^n =====
        {
            id: 'limits-continuity-rn',
            title: 'Limits & Continuity in R^n',
            content: `
<h2>2 &middot; Limits &amp; Continuity in \\(\\mathbb{R}^n\\)</h2>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Limit of a Multivariable Function</div>
We say \\(\\displaystyle\\lim_{(x,y) \\to (a,b)} f(x,y) = L\\) if for every \\(\\varepsilon > 0\\) there exists \\(\\delta > 0\\) such that
\\[0 < \\sqrt{(x-a)^2 + (y-b)^2} < \\delta \\implies |f(x,y) - L| < \\varepsilon.\\]
The key difference from single-variable limits is that \\((x,y)\\) can approach \\((a,b)\\) from <strong>any direction</strong> and along <strong>any path</strong>.
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Why Multivariable Limits Are Harder</div>
In single-variable calculus, we only need left and right limits to agree. In multivariable calculus, we must check <em>every possible path</em> of approach. The point \\((a,b)\\) can be reached along infinitely many curves, straight lines at every angle, spirals, and more. If any two paths give different limits, the limit does not exist.
</div>

<div class="env-block theorem">
<div class="env-label">Two-Path Test for Non-Existence</div>
If \\(f(x,y)\\) approaches different values along two different paths to \\((a,b)\\), then \\(\\displaystyle\\lim_{(x,y) \\to (a,b)} f(x,y)\\) <strong>does not exist</strong>.
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Path-Dependent Limit</div>
Consider \\(f(x,y) = \\dfrac{xy}{x^2 + y^2}\\) near \\((0,0)\\).
<ul>
<li>Along the x-axis (\\(y = 0\\)): \\(f(x,0) = 0\\).</li>
<li>Along \\(y = x\\): \\(f(x,x) = \\dfrac{x^2}{2x^2} = \\dfrac{1}{2}\\).</li>
</ul>
Since the limits along these two paths differ (\\(0 \\neq \\frac{1}{2}\\)), the limit does not exist.
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; A Limit That Exists</div>
Consider \\(f(x,y) = \\dfrac{x^2 y}{x^2 + y^2}\\) near \\((0,0)\\).
Since \\(|x^2| \\leq x^2 + y^2\\), we have
\\[|f(x,y)| = \\frac{x^2 |y|}{x^2 + y^2} \\leq |y|.\\]
As \\((x,y) \\to (0,0)\\), \\(|y| \\to 0\\), so by the Squeeze Theorem, \\(f(x,y) \\to 0\\).
</div>

<div class="env-block warning">
<div class="env-label">Warning &mdash; Two Paths Agreeing Is Not Enough</div>
Finding the same limit along several paths does <strong>not</strong> prove the limit exists. You must verify the limit along <em>all</em> paths simultaneously, typically via the \\(\\varepsilon\\)-\\(\\delta\\) definition, the Squeeze Theorem, or polar coordinates.
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Continuity</div>
A function \\(f(x,y)\\) is <strong>continuous at \\((a,b)\\)</strong> if:
<ol>
<li>\\(f(a,b)\\) is defined,</li>
<li>\\(\\displaystyle\\lim_{(x,y) \\to (a,b)} f(x,y)\\) exists, and</li>
<li>\\(\\displaystyle\\lim_{(x,y) \\to (a,b)} f(x,y) = f(a,b)\\).</li>
</ol>
Polynomials and rational functions (where the denominator is nonzero) are continuous on their domains. Compositions of continuous functions are continuous.
</div>

<div class="env-block theorem">
<div class="env-label">Polar Coordinate Technique</div>
To evaluate \\(\\displaystyle\\lim_{(x,y) \\to (0,0)} f(x,y)\\), substitute \\(x = r\\cos\\theta,\\; y = r\\sin\\theta\\).
If the resulting expression converges to \\(L\\) as \\(r \\to 0^+\\) <strong>independently of \\(\\theta\\)</strong>, then the limit is \\(L\\). If the result depends on \\(\\theta\\), the limit does not exist.
</div>

<div class="viz-container" data-viz="path-limits">
<div class="viz-canvas" id="path-limits"></div>
<div class="viz-controls" id="path-limits-controls"></div>
<div class="viz-caption">Explore f(x,y) = xy / (x^2 + y^2) near the origin. Different approach paths give different limits, proving the limit does not exist.</div>
</div>
`,
            visualizations: [
                {
                    id: 'path-limits',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 60 });

                        let pathAngle = 45; // degrees for the linear path y = x*tan(angle)

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const f = (x, y) => {
                                const d = x * x + y * y;
                                if (d < 1e-12) return 0;
                                return x * y / d;
                            };

                            // Draw heat map of f
                            const ctx = viz.ctx;
                            const w = viz.width;
                            const h = viz.height;
                            for (let py = 0; py < h; py += 3) {
                                for (let px = 0; px < w; px += 3) {
                                    const [mx, my] = viz.toMath(px, py);
                                    const v = f(mx, my);
                                    // Map [-0.5, 0.5] to color
                                    const t = Math.max(0, Math.min(1, (v + 0.5)));
                                    const r = Math.round(30 + 200 * t);
                                    const g = Math.round(60);
                                    const b = Math.round(200 - 170 * t);
                                    ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',0.35)';
                                    ctx.fillRect(px, py, 3, 3);
                                }
                            }

                            viz.drawAxes();

                            // Draw approach path
                            const rad = pathAngle * Math.PI / 180;
                            const dx = Math.cos(rad);
                            const dy = Math.sin(rad);
                            viz.drawSegment(-4 * dx, -4 * dy, 4 * dx, 4 * dy, viz.colors.yellow, 2, true);

                            // Compute the limiting value along y = x*tan(angle)
                            const limitVal = Math.cos(rad) * Math.sin(rad);

                            // Draw a moving point along the path
                            for (let t = 0.3; t <= 3; t += 0.5) {
                                const px = t * dx;
                                const py = t * dy;
                                const alpha = 1 - (t - 0.3) / 3;
                                viz.drawPoint(px, py, viz.colors.orange, '', 3 + alpha * 3);
                            }

                            viz.drawPoint(0, 0, viz.colors.red, 'origin', 5);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('f(x,y) = xy / (x\u00B2 + y\u00B2)', 12, 20);
                            ctx.fillText('Path angle: ' + pathAngle + '\u00B0', 12, 38);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Limit along path = ' + limitVal.toFixed(3), 12, 56);
                        }

                        VizEngine.createSlider(controls, 'Path angle (\u00B0)', 0, 180, pathAngle, 5, v => { pathAngle = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'lim-ex1',
                    type: 'short-answer',
                    question: 'Evaluate the limit or show it does not exist: lim_{(x,y)->(0,0)} (x^2 - y^2) / (x^2 + y^2).',
                    hint: 'Try the paths y = 0 and x = 0.',
                    solution: 'Along y = 0: (x^2 - 0) / (x^2 + 0) = 1. Along x = 0: (0 - y^2) / (0 + y^2) = -1. Since 1 != -1, the limit does not exist.'
                },
                {
                    id: 'lim-ex2',
                    type: 'short-answer',
                    question: 'Show that lim_{(x,y)->(0,0)} (x^2 y^2) / (x^2 + y^2) = 0 using the Squeeze Theorem.',
                    hint: 'Note that x^2 <= x^2 + y^2 and y^2 <= x^2 + y^2.',
                    solution: 'We have 0 <= x^2 y^2 / (x^2 + y^2) <= y^2 * x^2 / x^2 = y^2 (when x != 0). More cleanly: x^2 / (x^2 + y^2) <= 1, so x^2 y^2 / (x^2 + y^2) <= y^2 -> 0. By the Squeeze Theorem, the limit is 0.'
                },
                {
                    id: 'lim-ex3',
                    type: 'short-answer',
                    question: 'Use polar coordinates to evaluate lim_{(x,y)->(0,0)} (x^3 + y^3) / (x^2 + y^2).',
                    hint: 'Substitute x = r cos(theta), y = r sin(theta). Simplify and check if the result depends on theta.',
                    solution: 'In polar coordinates: (r^3 cos^3(theta) + r^3 sin^3(theta)) / r^2 = r(cos^3(theta) + sin^3(theta)). As r -> 0, this expression -> 0 regardless of theta (since |cos^3(theta) + sin^3(theta)| is bounded). Therefore the limit is 0.'
                }
            ]
        },

        // ===== SECTION 3: Partial Derivatives =====
        {
            id: 'partial-derivatives',
            title: 'Partial Derivatives',
            content: `
<h2>3 &middot; Partial Derivatives</h2>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Partial Derivatives</div>
Let \\(f(x,y)\\) be defined near \\((a,b)\\). The <strong>partial derivative of \\(f\\) with respect to \\(x\\)</strong> at \\((a,b)\\) is
\\[f_x(a,b) = \\frac{\\partial f}{\\partial x}(a,b) = \\lim_{h \\to 0} \\frac{f(a+h,\\, b) - f(a,b)}{h},\\]
and the <strong>partial derivative with respect to \\(y\\)</strong> is
\\[f_y(a,b) = \\frac{\\partial f}{\\partial y}(a,b) = \\lim_{h \\to 0} \\frac{f(a,\\, b+h) - f(a,b)}{h}.\\]
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Slicing the Surface</div>
To compute \\(f_x\\), we fix \\(y = b\\) and differentiate the resulting one-variable function \\(g(x) = f(x, b)\\). Geometrically, we slice the surface \\(z = f(x,y)\\) with the plane \\(y = b\\), producing a curve. The partial derivative \\(f_x(a,b)\\) is the slope of this curve at \\(x = a\\).
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Computing Partial Derivatives</div>
Let \\(f(x,y) = x^3 + 2x^2 y - y^2\\). Then:
\\[f_x = 3x^2 + 4xy, \\quad f_y = 2x^2 - 2y.\\]
At \\((1, 2)\\): \\(f_x(1,2) = 3 + 8 = 11\\) and \\(f_y(1,2) = 2 - 4 = -2\\).
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Higher-Order Partial Derivatives</div>
If \\(f_x\\) and \\(f_y\\) are themselves differentiable, we can take second partial derivatives:
\\[f_{xx} = \\frac{\\partial^2 f}{\\partial x^2}, \\quad f_{yy} = \\frac{\\partial^2 f}{\\partial y^2}, \\quad f_{xy} = \\frac{\\partial^2 f}{\\partial y \\, \\partial x}, \\quad f_{yx} = \\frac{\\partial^2 f}{\\partial x \\, \\partial y}.\\]
</div>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Clairaut's Theorem (Symmetry of Mixed Partials)</div>
If \\(f_{xy}\\) and \\(f_{yx}\\) are both <strong>continuous</strong> on an open region containing \\((a,b)\\), then
\\[f_{xy}(a,b) = f_{yx}(a,b).\\]
That is, the order of differentiation does not matter for sufficiently smooth functions.
</div>

<div class="env-block proof">
<div class="env-label">Proof Sketch</div>
Define \\(\\Delta(h,k) = f(a+h, b+k) - f(a+h, b) - f(a, b+k) + f(a, b)\\). Apply the Mean Value Theorem twice: first treating \\(\\Delta\\) as a function of \\(x\\) (giving \\(f_{xy}\\)), then as a function of \\(y\\) (giving \\(f_{yx}\\)). By continuity, both expressions converge to the same limit as \\(h, k \\to 0\\).
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Verifying Clairaut's Theorem</div>
Let \\(f(x,y) = e^{xy} \\sin y\\). Then:
\\[f_x = y e^{xy} \\sin y, \\quad f_y = e^{xy}(x \\sin y + \\cos y).\\]
\\[f_{xy} = e^{xy}(\\sin y + xy \\sin y + y \\cos y),\\]
\\[f_{yx} = \\frac{\\partial}{\\partial x}[e^{xy}(x \\sin y + \\cos y)] = e^{xy}(\\sin y + xy \\sin y + y \\cos y).\\]
Indeed \\(f_{xy} = f_{yx}\\).
</div>

<div class="viz-container" data-viz="partial-deriv-slice">
<div class="viz-canvas" id="partial-deriv-slice"></div>
<div class="viz-controls" id="partial-deriv-slice-controls"></div>
<div class="viz-caption">The curve shows a slice of f(x,y) = x^2 - y^2 at fixed y. The tangent line at the marked point has slope equal to the partial derivative f_x.</div>
</div>

<div class="env-block remark">
<div class="env-label">Remark</div>
The notation \\(\\partial f / \\partial x\\) uses a rounded \\(\\partial\\) (called "partial" or "del") to distinguish from the ordinary derivative \\(df/dx\\). The partial symbol reminds us that other variables are being held constant.
</div>
`,
            visualizations: [
                {
                    id: 'partial-deriv-slice',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 30 });

                        let yVal = 0;
                        let xPt = 1;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // f(x,y) = x^2 - y^2, sliced at fixed y
                            const f = x => x * x - yVal * yVal;
                            const fx = x => 2 * x; // partial derivative w.r.t. x

                            viz.drawFunction(f, -5, 5, viz.colors.blue, 2.5);

                            // Tangent line at xPt
                            const fVal = f(xPt);
                            const slope = fx(xPt);
                            const tangent = x => fVal + slope * (x - xPt);
                            viz.drawFunction(tangent, xPt - 2, xPt + 2, viz.colors.orange, 2, 100);

                            viz.drawPoint(xPt, fVal, viz.colors.green, '', 6);

                            const ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('f(x,' + yVal.toFixed(1) + ') = x\u00B2 - (' + yVal.toFixed(1) + ')\u00B2', 12, 20);
                            ctx.fillText('f_x(' + xPt.toFixed(1) + ', ' + yVal.toFixed(1) + ') = ' + slope.toFixed(2), 12, 38);
                        }

                        VizEngine.createSlider(controls, 'y (fixed)', -3, 3, yVal, 0.2, v => { yVal = v; draw(); });
                        VizEngine.createSlider(controls, 'x (point)', -4, 4, xPt, 0.2, v => { xPt = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'pd-ex1',
                    type: 'short-answer',
                    question: 'Find f_x and f_y for f(x,y) = x^2 e^(3y) + sin(xy).',
                    hint: 'Differentiate with respect to x (treating y as constant), then with respect to y (treating x as constant).',
                    solution: 'f_x = 2x e^(3y) + y cos(xy). f_y = 3x^2 e^(3y) + x cos(xy).'
                },
                {
                    id: 'pd-ex2',
                    type: 'short-answer',
                    question: 'For f(x,y) = x^3 y + x y^3, compute f_{xx}, f_{yy}, and verify that f_{xy} = f_{yx}.',
                    hint: 'First find f_x and f_y, then differentiate again.',
                    solution: 'f_x = 3x^2 y + y^3, f_y = x^3 + 3xy^2. Then f_{xx} = 6xy, f_{yy} = 6xy, f_{xy} = 3x^2 + 3y^2, f_{yx} = 3x^2 + 3y^2. Indeed f_{xy} = f_{yx}.'
                },
                {
                    id: 'pd-ex3',
                    type: 'short-answer',
                    question: 'Find all second partial derivatives of f(x,y) = ln(x^2 + y).',
                    hint: 'First compute f_x = 2x / (x^2 + y), f_y = 1 / (x^2 + y). Then differentiate each again.',
                    solution: 'f_x = 2x/(x^2+y), f_y = 1/(x^2+y). f_{xx} = (2(x^2+y) - 2x(2x))/(x^2+y)^2 = (2y-2x^2)/(x^2+y)^2. f_{yy} = -1/(x^2+y)^2. f_{xy} = -2x/(x^2+y)^2 = f_{yx}.'
                },
                {
                    id: 'pd-ex4',
                    type: 'short-answer',
                    question: 'Give an example of a function where f_{xy}(0,0) != f_{yx}(0,0). (Hint: the standard example involves a piecewise definition.)',
                    hint: 'Consider f(x,y) = xy(x^2 - y^2)/(x^2 + y^2) for (x,y) != (0,0) and f(0,0) = 0.',
                    solution: 'For f(x,y) = xy(x^2 - y^2)/(x^2 + y^2) with f(0,0) = 0, direct computation using the limit definition gives f_{xy}(0,0) = -1 and f_{yx}(0,0) = 1. This does not violate Clairaut because f_{xy} and f_{yx} are not continuous at (0,0).'
                }
            ]
        },

        // ===== SECTION 4: Tangent Planes & Linear Approximation =====
        {
            id: 'tangent-planes-linear-approx',
            title: 'Tangent Planes & Linear Approximation',
            content: `
<h2>4 &middot; Tangent Planes &amp; Linear Approximation</h2>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Tangent Plane</div>
If \\(f(x,y)\\) has continuous partial derivatives at \\((a,b)\\), the <strong>tangent plane</strong> to the surface \\(z = f(x,y)\\) at the point \\((a, b, f(a,b))\\) is
\\[z = f(a,b) + f_x(a,b)(x - a) + f_y(a,b)(y - b).\\]
This is the best linear approximation to the surface near the point of tangency.
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; From Tangent Lines to Tangent Planes</div>
In single-variable calculus, the tangent line \\(y = f(a) + f'(a)(x-a)\\) is the best linear approximation near \\(x = a\\). For two variables, we need a flat surface (a plane) to approximate \\(z = f(x,y)\\) near \\((a,b)\\). The plane is determined by two slopes: \\(f_x(a,b)\\) in the \\(x\\)-direction and \\(f_y(a,b)\\) in the \\(y\\)-direction.
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Linearization</div>
The <strong>linearization</strong> of \\(f\\) at \\((a,b)\\) is the function
\\[L(x,y) = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b).\\]
We use \\(f(x,y) \\approx L(x,y)\\) for \\((x,y)\\) near \\((a,b)\\).
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Total Differential</div>
The <strong>total differential</strong> of \\(z = f(x,y)\\) is
\\[dz = f_x(a,b)\\,dx + f_y(a,b)\\,dy,\\]
where \\(dx = x - a\\) and \\(dy = y - b\\). The differential \\(dz\\) approximates the actual change \\(\\Delta z = f(x,y) - f(a,b)\\).
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Tangent Plane of a Paraboloid</div>
Let \\(f(x,y) = x^2 + y^2\\). At \\((1, 1)\\):
<ul>
<li>\\(f(1,1) = 2\\)</li>
<li>\\(f_x = 2x \\implies f_x(1,1) = 2\\)</li>
<li>\\(f_y = 2y \\implies f_y(1,1) = 2\\)</li>
</ul>
Tangent plane: \\(z = 2 + 2(x-1) + 2(y-1) = 2x + 2y - 2\\).
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Linear Approximation in Practice</div>
Estimate \\(\\sqrt{(1.02)^2 + (1.97)^2}\\) using linearization.
<br><br>
Let \\(f(x,y) = \\sqrt{x^2 + y^2}\\), \\((a,b) = (1, 2)\\), so \\(f(1,2) = \\sqrt{5}\\).
\\[f_x = \\frac{x}{\\sqrt{x^2+y^2}} \\implies f_x(1,2) = \\frac{1}{\\sqrt{5}}, \\quad f_y(1,2) = \\frac{2}{\\sqrt{5}}.\\]
\\[L(1.02, 1.97) = \\sqrt{5} + \\frac{1}{\\sqrt{5}}(0.02) + \\frac{2}{\\sqrt{5}}(-0.03) = \\sqrt{5} - \\frac{0.04}{\\sqrt{5}} \\approx 2.2271.\\]
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Differentiability</div>
A function \\(f(x,y)\\) is <strong>differentiable at \\((a,b)\\)</strong> if
\\[\\Delta z = f_x(a,b)\\,\\Delta x + f_y(a,b)\\,\\Delta y + \\varepsilon_1 \\,\\Delta x + \\varepsilon_2 \\,\\Delta y,\\]
where \\(\\varepsilon_1 \\to 0\\) and \\(\\varepsilon_2 \\to 0\\) as \\((\\Delta x, \\Delta y) \\to (0, 0)\\).
</div>

<div class="env-block theorem">
<div class="env-label">Sufficient Condition for Differentiability</div>
If \\(f_x\\) and \\(f_y\\) are <strong>continuous</strong> in an open region containing \\((a,b)\\), then \\(f\\) is differentiable at \\((a,b)\\).
</div>

<div class="env-block warning">
<div class="env-label">Warning</div>
Having both partial derivatives exist at a point does <strong>not</strong> guarantee differentiability. The function \\(f(x,y) = \\frac{xy}{\\sqrt{x^2+y^2}}\\) (with \\(f(0,0)=0\\)) has \\(f_x(0,0) = f_y(0,0) = 0\\), but the tangent plane \\(z = 0\\) is not a good linear approximation near the origin, so \\(f\\) is not differentiable there.
</div>

<div class="viz-container" data-viz="tangent-plane">
<div class="viz-canvas" id="tangent-plane"></div>
<div class="viz-controls" id="tangent-plane-controls"></div>
<div class="viz-caption">The blue curve is a slice of z = f(x,y) at the chosen fixed y-value. The orange line is the tangent from the linearization at the marked point.</div>
</div>
`,
            visualizations: [
                {
                    id: 'tangent-plane',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 25 });

                        let ax = 1, ay = 1;

                        // f(x,y) = sin(x) + cos(y)
                        const f = (x, y) => Math.sin(x) + Math.cos(y);
                        const fx = (x, y) => Math.cos(x);
                        const fy = (x, y) => -Math.sin(y);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw slice at fixed y = ay
                            const slice = x => f(x, ay);
                            viz.drawFunction(slice, -6, 6, viz.colors.blue, 2.5);

                            // Tangent line from linearization
                            const fVal = f(ax, ay);
                            const slope = fx(ax, ay);
                            const tangent = x => fVal + slope * (x - ax);
                            viz.drawFunction(tangent, ax - 3, ax + 3, viz.colors.orange, 2);

                            viz.drawPoint(ax, fVal, viz.colors.green, '', 6);

                            // Show error at a nearby point
                            const nearX = ax + 0.5;
                            const actual = slice(nearX);
                            const approx = tangent(nearX);
                            viz.drawSegment(nearX, actual, nearX, approx, viz.colors.red, 1.5, true);

                            const ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('f(x,y) = sin(x) + cos(y), y = ' + ay.toFixed(1), 12, 20);
                            ctx.fillText('L(x) = ' + fVal.toFixed(2) + ' + ' + slope.toFixed(2) + '(x - ' + ax.toFixed(1) + ')', 12, 38);
                        }

                        VizEngine.createSlider(controls, 'a (x-point)', -4, 4, ax, 0.2, v => { ax = v; draw(); });
                        VizEngine.createSlider(controls, 'b (y-slice)', -3, 3, ay, 0.2, v => { ay = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'tp-ex1',
                    type: 'short-answer',
                    question: 'Find the equation of the tangent plane to z = x^2 + 3xy - y^2 at the point (2, 1, 9).',
                    hint: 'Compute f_x(2,1) and f_y(2,1), then use z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b).',
                    solution: 'f_x = 2x + 3y, so f_x(2,1) = 7. f_y = 3x - 2y, so f_y(2,1) = 4. Tangent plane: z = 9 + 7(x - 2) + 4(y - 1) = 7x + 4y - 9.'
                },
                {
                    id: 'tp-ex2',
                    type: 'short-answer',
                    question: 'Use the linearization of f(x,y) = sqrt(x + 2y) at (1, 1) to approximate f(1.1, 0.95).',
                    hint: 'f(1,1) = sqrt(3), f_x = 1/(2 sqrt(x+2y)), f_y = 1/sqrt(x+2y).',
                    solution: 'f(1,1) = sqrt(3). f_x(1,1) = 1/(2 sqrt(3)), f_y(1,1) = 1/sqrt(3). L(1.1, 0.95) = sqrt(3) + (0.1)/(2 sqrt(3)) + (-0.05)/sqrt(3) = sqrt(3) + 0.1/(2 sqrt(3)) - 0.05/sqrt(3) = sqrt(3) + 0/(2 sqrt(3)) = sqrt(3). More precisely: = sqrt(3) + 0.05/sqrt(3) - 0.05/sqrt(3) = sqrt(3) approx 1.7321.'
                },
                {
                    id: 'tp-ex3',
                    type: 'short-answer',
                    question: 'Use differentials to estimate the change in f(x,y) = x^2 y^3 when (x,y) changes from (2,3) to (2.01, 2.98).',
                    hint: 'dz = f_x dx + f_y dy. Here dx = 0.01 and dy = -0.02.',
                    solution: 'f_x = 2xy^3, f_y = 3x^2 y^2. At (2,3): f_x = 2(2)(27) = 108, f_y = 3(4)(9) = 108. dz = 108(0.01) + 108(-0.02) = 1.08 - 2.16 = -1.08.'
                }
            ]
        },

        // ===== SECTION 5: Directional Derivatives & the Gradient =====
        {
            id: 'directional-derivatives-gradient',
            title: 'Directional Derivatives & the Gradient',
            content: `
<h2>5 &middot; Directional Derivatives &amp; the Gradient</h2>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Directional Derivative</div>
Let \\(f(x,y)\\) be differentiable at \\((a,b)\\) and let \\(\\mathbf{u} = (u_1, u_2)\\) be a <strong>unit vector</strong>. The <strong>directional derivative</strong> of \\(f\\) in the direction \\(\\mathbf{u}\\) is
\\[D_{\\mathbf{u}} f(a,b) = \\lim_{h \\to 0} \\frac{f(a + hu_1, \\, b + hu_2) - f(a,b)}{h}.\\]
This measures the rate of change of \\(f\\) at \\((a,b)\\) in the direction \\(\\mathbf{u}\\).
</div>

<div class="env-block definition">
<div class="env-label">Definition &mdash; The Gradient Vector</div>
The <strong>gradient</strong> of \\(f(x,y)\\) is the vector
\\[\\nabla f(x,y) = \\left(\\frac{\\partial f}{\\partial x}, \\, \\frac{\\partial f}{\\partial y}\\right) = f_x \\,\\mathbf{i} + f_y \\,\\mathbf{j}.\\]
For \\(n\\) variables: \\(\\nabla f = (f_{x_1}, f_{x_2}, \\ldots, f_{x_n})\\).
</div>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Directional Derivative via the Gradient</div>
If \\(f\\) is differentiable at \\((a,b)\\), then for any unit vector \\(\\mathbf{u}\\),
\\[D_{\\mathbf{u}} f(a,b) = \\nabla f(a,b) \\cdot \\mathbf{u}.\\]
</div>

<div class="env-block proof">
<div class="env-label">Proof</div>
Let \\(g(h) = f(a + hu_1, b + hu_2)\\). By the chain rule,
\\[g'(0) = f_x(a,b)\\,u_1 + f_y(a,b)\\,u_2 = \\nabla f(a,b) \\cdot \\mathbf{u}.\\]
But \\(g'(0)\\) is exactly the directional derivative \\(D_{\\mathbf{u}} f(a,b)\\). \\(\\square\\)
</div>

<div class="env-block theorem">
<div class="env-label">Properties of the Gradient</div>
Let \\(f\\) be differentiable at \\((a,b)\\) with \\(\\nabla f(a,b) \\neq \\mathbf{0}\\).
<ol>
<li><strong>Steepest ascent:</strong> \\(f\\) increases most rapidly in the direction of \\(\\nabla f\\). The maximum rate of increase is \\(\\|\\nabla f\\|\\).</li>
<li><strong>Steepest descent:</strong> \\(f\\) decreases most rapidly in the direction of \\(-\\nabla f\\).</li>
<li><strong>Perpendicular to level curves:</strong> \\(\\nabla f(a,b)\\) is perpendicular to the level curve of \\(f\\) passing through \\((a,b)\\).</li>
</ol>
</div>

<div class="env-block proof">
<div class="env-label">Proof of Steepest Ascent</div>
Since \\(D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u} = \\|\\nabla f\\| \\cos\\theta\\), where \\(\\theta\\) is the angle between \\(\\nabla f\\) and \\(\\mathbf{u}\\), the directional derivative is maximized when \\(\\cos\\theta = 1\\), i.e., when \\(\\mathbf{u}\\) points in the same direction as \\(\\nabla f\\). The maximum value is \\(\\|\\nabla f\\|\\). \\(\\square\\)
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; The Gradient as a Compass</div>
Imagine standing on a hillside. The gradient \\(\\nabla f\\) is like a compass that points straight uphill in the steepest direction. Its magnitude tells you how steep the hill is. Walking perpendicular to \\(\\nabla f\\) keeps you on the same contour line (constant elevation). This is exactly how gradient descent optimization works: to minimize \\(f\\), take steps in the direction \\(-\\nabla f\\).
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Directional Derivative Computation</div>
Let \\(f(x,y) = x^2 y - y^3\\). Find the directional derivative at \\((2, 1)\\) in the direction of \\(\\mathbf{v} = (3, 4)\\).
<br><br>
First, compute the gradient: \\(\\nabla f = (2xy, \\, x^2 - 3y^2)\\). At \\((2,1)\\): \\(\\nabla f(2,1) = (4, 1)\\).
<br><br>
The unit vector in the direction of \\(\\mathbf{v}\\) is \\(\\mathbf{u} = \\frac{1}{5}(3, 4)\\).
<br><br>
\\[D_{\\mathbf{u}} f(2,1) = (4, 1) \\cdot \\tfrac{1}{5}(3, 4) = \\frac{12 + 4}{5} = \\frac{16}{5}.\\]
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Maximum Rate of Change</div>
For \\(f(x,y) = \\sin(xy)\\) at \\((\\pi, 1/2)\\):
\\[\\nabla f = (y\\cos(xy), \\, x\\cos(xy)).\\]
At \\((\\pi, 1/2)\\): \\(\\cos(\\pi/2) = 0\\), so \\(\\nabla f(\\pi, 1/2) = (0, 0)\\).
The gradient vanishes! The function has zero rate of change in <em>every</em> direction at this point. (It turns out \\((\\pi, 1/2)\\) is a saddle-like critical point of \\(f\\).)
</div>

<div class="viz-container" data-viz="gradient-field">
<div class="viz-canvas" id="gradient-field"></div>
<div class="viz-controls" id="gradient-field-controls"></div>
<div class="viz-caption">Contour lines with gradient vectors (arrows). Note how the gradient arrows point perpendicular to the contours and toward increasing values. The arrow at the chosen point shows the directional derivative.</div>
</div>

<div class="env-block theorem">
<div class="env-label">Gradient and Level Surfaces in \\(\\mathbb{R}^3\\)</div>
For \\(F(x,y,z)\\), the gradient \\(\\nabla F = (F_x, F_y, F_z)\\) is perpendicular to the level surface \\(F(x,y,z) = c\\) at each point. This gives a quick way to find normal vectors to implicitly defined surfaces.
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Normal to a Surface</div>
The ellipsoid \\(x^2 + 2y^2 + 3z^2 = 6\\) can be written as \\(F(x,y,z) = x^2 + 2y^2 + 3z^2\\). Then \\(\\nabla F = (2x, 4y, 6z)\\). At the point \\((1, 1, 1)\\):
\\[\\nabla F(1,1,1) = (2, 4, 6).\\]
The tangent plane at \\((1,1,1)\\) is \\(2(x-1) + 4(y-1) + 6(z-1) = 0\\), i.e., \\(x + 2y + 3z = 6\\).
</div>
`,
            visualizations: [
                {
                    id: 'gradient-field',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 40 });

                        const funcs = [
                            {
                                name: 'x\u00B2 + y\u00B2',
                                f: (x, y) => x * x + y * y,
                                gx: (x, y) => 2 * x,
                                gy: (x, y) => 2 * y
                            },
                            {
                                name: 'x\u00B2 - y\u00B2',
                                f: (x, y) => x * x - y * y,
                                gx: (x, y) => 2 * x,
                                gy: (x, y) => -2 * y
                            },
                            {
                                name: 'sin(x)cos(y)',
                                f: (x, y) => Math.sin(x) * Math.cos(y),
                                gx: (x, y) => Math.cos(x) * Math.cos(y),
                                gy: (x, y) => -Math.sin(x) * Math.sin(y)
                            },
                            {
                                name: 'xy',
                                f: (x, y) => x * y,
                                gx: (x, y) => y,
                                gy: (x, y) => x
                            }
                        ];

                        let selected = 0;
                        let dirAngle = 45; // degrees

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const { f, gx, gy } = funcs[selected];
                            const ctx = viz.ctx;
                            const w = viz.width;
                            const h = viz.height;

                            // Compute function values for heat map
                            let fMin = Infinity, fMax = -Infinity;
                            const vals = [];
                            for (let py = 0; py < h; py += 3) {
                                for (let px = 0; px < w; px += 3) {
                                    const [mx, my] = viz.toMath(px, py);
                                    const v = f(mx, my);
                                    vals.push({ px, py, v });
                                    if (isFinite(v)) {
                                        if (v < fMin) fMin = v;
                                        if (v > fMax) fMax = v;
                                    }
                                }
                            }

                            // Heat map background
                            const range = fMax - fMin || 1;
                            for (const { px, py, v } of vals) {
                                if (!isFinite(v)) continue;
                                const t = (v - fMin) / range;
                                const r = Math.round(15 + 80 * t);
                                const g = Math.round(15 + 50 * (1 - Math.abs(t - 0.5) * 2));
                                const b = Math.round(100 - 60 * t);
                                ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',0.3)';
                                ctx.fillRect(px, py, 3, 3);
                            }

                            // Contour lines via marching
                            const nLevels = 8;
                            const cStep = range / nLevels;
                            ctx.lineWidth = 1;
                            for (let k = 1; k < nLevels; k++) {
                                const c = fMin + k * cStep;
                                const hue = 180 + k * 20;
                                ctx.strokeStyle = 'hsl(' + hue + ', 60%, 55%)';
                                ctx.beginPath();
                                for (let py = 0; py < h; py += 2) {
                                    for (let px = 0; px < w - 2; px += 2) {
                                        const [mx1, my1] = viz.toMath(px, py);
                                        const [mx2, my2] = viz.toMath(px + 2, py);
                                        const v1 = f(mx1, my1);
                                        const v2 = f(mx2, my2);
                                        if ((v1 - c) * (v2 - c) < 0) {
                                            const t = (c - v1) / (v2 - v1);
                                            const ix = px + t * 2;
                                            ctx.moveTo(ix, py);
                                            ctx.lineTo(ix + 1, py + 1);
                                        }
                                    }
                                }
                                ctx.stroke();
                            }

                            // Draw gradient vector field
                            viz.drawVectorField(gx, gy, -4, 4, -3, 3, 10, 8);

                            // Redraw axes
                            viz.drawAxes();

                            // Draw directional derivative at origin area
                            const rad = dirAngle * Math.PI / 180;
                            const ux = Math.cos(rad);
                            const uy = Math.sin(rad);
                            const ptX = 1, ptY = 1;
                            const gradX = gx(ptX, ptY);
                            const gradY = gy(ptX, ptY);
                            const dDeriv = gradX * ux + gradY * uy;

                            // Show the direction vector
                            viz.drawVector(ptX, ptY, ptX + ux * 1.2, ptY + uy * 1.2, viz.colors.yellow, 'u', 2);

                            // Show the gradient at that point
                            const gLen = Math.sqrt(gradX * gradX + gradY * gradY);
                            if (gLen > 0.01) {
                                const s = 1.2 / gLen;
                                viz.drawVector(ptX, ptY, ptX + gradX * s, ptY + gradY * s, viz.colors.orange, '\u2207f', 2);
                            }

                            viz.drawPoint(ptX, ptY, viz.colors.green, '(1,1)', 5);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system, sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('f(x,y) = ' + funcs[selected].name, 12, 20);
                            ctx.fillText('D_u f(1,1) = ' + dDeriv.toFixed(2), 12, 38);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('u direction: ' + dirAngle + '\u00B0', 12, 56);
                        }

                        VizEngine.createSlider(controls, 'Function', 0, funcs.length - 1, selected, 1, v => { selected = v; draw(); });
                        VizEngine.createSlider(controls, 'Direction (\u00B0)', 0, 360, dirAngle, 5, v => { dirAngle = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'grad-ex1',
                    type: 'short-answer',
                    question: 'Find the gradient of f(x,y) = e^(x^2 - y) and evaluate it at (1, 1).',
                    hint: 'f_x = 2x e^(x^2 - y), f_y = -e^(x^2 - y).',
                    solution: 'nabla f = (2x e^(x^2-y), -e^(x^2-y)). At (1,1): nabla f(1,1) = (2e^0, -e^0) = (2, -1).'
                },
                {
                    id: 'grad-ex2',
                    type: 'short-answer',
                    question: 'Find the directional derivative of f(x,y) = x^2 + xy + y^2 at (1, -1) in the direction of v = (1, 1).',
                    hint: 'First find the gradient, then dot with the unit vector u = v/|v|.',
                    solution: 'nabla f = (2x + y, x + 2y). At (1,-1): nabla f = (1, -1). Unit vector: u = (1/sqrt(2), 1/sqrt(2)). D_u f = (1)(1/sqrt(2)) + (-1)(1/sqrt(2)) = 0. The function has zero rate of change in this direction at (1,-1) because this direction is tangent to the level curve.'
                },
                {
                    id: 'grad-ex3',
                    type: 'short-answer',
                    question: 'At the point (2, 1), in what direction does f(x,y) = x^2 y^3 increase most rapidly? What is the maximum rate of increase?',
                    hint: 'The direction of steepest ascent is the direction of the gradient.',
                    solution: 'nabla f = (2xy^3, 3x^2 y^2). At (2,1): nabla f = (4, 12). The direction of steepest ascent is (4, 12), or as a unit vector: (1/sqrt(10), 3/sqrt(10)). The maximum rate of increase is |nabla f| = sqrt(16 + 144) = sqrt(160) = 4 sqrt(10).'
                },
                {
                    id: 'grad-ex4',
                    type: 'short-answer',
                    question: 'Find the equation of the tangent plane to the surface x^2 + y^2 + z^2 = 14 at the point (1, 2, 3).',
                    hint: 'Write the surface as F(x,y,z) = x^2 + y^2 + z^2 = 14. Use nabla F as the normal.',
                    solution: 'F(x,y,z) = x^2 + y^2 + z^2, nabla F = (2x, 2y, 2z). At (1,2,3): nabla F = (2, 4, 6). Tangent plane: 2(x-1) + 4(y-2) + 6(z-3) = 0, which simplifies to x + 2y + 3z = 14.'
                }
            ]
        }
    ]
});
