window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Fundamental Theorem of Calculus',
    subtitle: 'The bridge between differentiation and integration: the most important theorem in calculus',
    sections: [
        // ============================================================
        // SECTION 1: Area Function A(x)
        // ============================================================
        {
            id: 'area-function',
            title: 'Area Function A(x)',
            content: `
<h2>10.1 Area Function A(x)</h2>

<div class="env-block env-intuition">
<div class="env-header">Chapter Overview</div>
<p>We have developed two big ideas independently: <strong>antiderivatives</strong> (Chapter 8) reverse the process of differentiation, and <strong>definite integrals</strong> (Chapter 9) compute areas via Riemann sums. At first glance these seem unrelated; one is an algebraic operation on functions, the other is a geometric quantity defined by limits of sums. This chapter proves they are two faces of the same coin. The <strong>Fundamental Theorem of Calculus</strong> is the single most important result in the course, and it connects every topic that came before to every topic that follows.</p>
<p>We begin by studying what happens when the upper limit of a definite integral is allowed to vary, producing a new function called the <em>area function</em>. From there, we prove the two parts of the FTC, explore the Net Change Theorem, and finally step back to see how differentiation and integration form a unified whole.</p>
</div>

<div class="env-block env-motivation">
<div class="env-header">Motivation</div>
<p>In the previous chapter, we defined the definite integral \\(\\int_a^b f(t)\\,dt\\) as the limit of Riemann sums. Now we ask a powerful question: <strong>what happens if we let the upper limit vary?</strong> If we replace the fixed endpoint \\(b\\) with a variable \\(x\\), we obtain a new function&mdash;the <em>area function</em>&mdash;that accumulates the signed area under \\(f\\) as \\(x\\) moves.</p>
</div>

<div class="env-block env-definition">
<div class="env-header">Definition 10.1 &mdash; Accumulation Function (Area Function)</div>
<p>Let \\(f\\) be continuous on \\([a, b]\\). The <strong>accumulation function</strong> (or area function) is defined by</p>
\\[ A(x) = \\int_a^x f(t)\\,dt, \\quad a \\le x \\le b. \\]
<p>Here \\(t\\) is a <em>dummy variable</em> of integration. The value \\(A(x)\\) represents the net signed area between the graph of \\(f\\) and the \\(t\\)-axis from \\(t = a\\) to \\(t = x\\).</p>
</div>

<div class="env-block env-intuition">
<div class="env-header">Intuition</div>
<p>Think of \\(A(x)\\) as a "running total." Imagine walking along the \\(t\\)-axis from \\(a\\) to \\(x\\). As you walk, you accumulate signed area: positive where \\(f(t) > 0\\) (above the axis) and negative where \\(f(t) < 0\\) (below the axis). The function \\(A(x)\\) records this running total at each moment.</p>
</div>

<div class="viz-container" id="viz-area-function-accumulation"></div>

<div class="env-block env-example">
<div class="env-header">Example 10.1</div>
<p>Let \\(f(t) = t\\) and \\(a = 0\\). Then</p>
\\[ A(x) = \\int_0^x t\\,dt = \\frac{x^2}{2}. \\]
<p>For \\(x = 3\\): \\(A(3) = \\frac{9}{2} = 4.5\\), which is the area of the triangle with base 3 and height 3.</p>
</div>

<div class="env-block env-example">
<div class="env-header">Example 10.2</div>
<p>Let \\(f(t) = \\cos t\\) and \\(a = 0\\). Then</p>
\\[ A(x) = \\int_0^x \\cos t\\,dt = \\sin x. \\]
<p>Notice that \\(A(0) = 0\\), \\(A(\\pi/2) = 1\\), \\(A(\\pi) = 0\\), and \\(A(3\\pi/2) = -1\\). The accumulation increases when \\(\\cos t > 0\\) and decreases when \\(\\cos t < 0\\).</p>
</div>

<div class="env-block env-definition">
<div class="env-header">Key Properties of the Accumulation Function</div>
<ul>
<li>\\(A(a) = \\int_a^a f(t)\\,dt = 0\\) always.</li>
<li>If \\(f(t) \\ge 0\\) on \\([a, x]\\), then \\(A(x) \\ge 0\\) and \\(A\\) is non-decreasing.</li>
<li>If \\(f(t) \\le 0\\) on \\([a, x]\\), then \\(A(x) \\le 0\\) and \\(A\\) is non-increasing.</li>
<li>\\(A(x)\\) is increasing where \\(f(x) > 0\\) and decreasing where \\(f(x) < 0\\).</li>
<li>\\(A(x)\\) has a local extremum where \\(f\\) changes sign.</li>
</ul>
</div>

<div class="viz-container" id="viz-area-function-properties"></div>

<div class="env-block env-intuition">
<div class="env-header">Rate of Change of A(x)</div>
<p>Observe from Example 10.1 that \\(A(x) = \\frac{x^2}{2}\\) and \\(A'(x) = x = f(x)\\). From Example 10.2, \\(A(x) = \\sin x\\) and \\(A'(x) = \\cos x = f(x)\\). This is no coincidence; it is the content of the Fundamental Theorem of Calculus, Part I.</p>
<p><strong>Connection to what follows.</strong> The pattern \\(A'(x) = f(x)\\) suggests that the area function is an antiderivative of \\(f\\). The next section makes this observation precise and proves it rigorously.</p>
</div>
`,
            visualizations: [
                {
                    id: 'viz-area-function-accumulation',
                    title: 'Area Accumulation Function',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 50, originX: 80, originY: 220, height: 420 });
                        var xVal = 3;

                        var f = function(t) { return 0.5 * t * t - 2 * t + 2.5; };

                        // Numerical integration
                        function integrate(a, x, steps) {
                            if (x <= a) return 0;
                            var h = (x - a) / steps;
                            var sum = 0;
                            for (var i = 0; i < steps; i++) {
                                var t0 = a + i * h;
                                var t1 = t0 + h;
                                sum += (f(t0) + f(t1)) / 2 * h;
                            }
                            return sum;
                        }

                        var slider = VizEngine.createSlider(container, 'x =', 0, 7, xVal, 0.05, function(v) { xVal = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Shade area under f from 0 to x
                            if (xVal > 0.01) {
                                viz.shadeUnder(f, 0, xVal, 'rgba(88,166,255,0.25)');
                            }

                            // Draw f(t)
                            viz.drawFunction(f, -0.5, 7.5, viz.colors.blue, 2.5);

                            // Vertical line at x
                            viz.drawSegment(xVal, 0, xVal, f(xVal), viz.colors.orange, 1.5, true);
                            viz.drawPoint(xVal, f(xVal), viz.colors.orange, 'f(x)', 5);
                            viz.drawPoint(xVal, 0, viz.colors.orange, null, 4);

                            // Draw A(x) curve in lower portion
                            var aFunc = function(x) { return integrate(0, x, 200) * 0.3 - 3.5; };
                            viz.drawFunction(aFunc, 0, 7.5, viz.colors.green, 2.5);

                            // Current A(x) point
                            var aVal = integrate(0, xVal, 200);
                            viz.drawPoint(xVal, aFunc(xVal), viz.colors.green, null, 5);

                            // Labels
                            viz.screenText('f(t) = 0.5t\u00B2 - 2t + 2.5', viz.width - 10, 20, viz.colors.blue, 13, 'right', 'top');
                            viz.screenText('A(x) = \u222B\u2080\u02E3 f(t) dt', viz.width - 10, 40, viz.colors.green, 13, 'right', 'top');
                            viz.screenText('A(' + xVal.toFixed(1) + ') = ' + aVal.toFixed(2), viz.width - 10, 60, viz.colors.yellow, 13, 'right', 'top');

                            // Mark a=0
                            viz.drawPoint(0, 0, viz.colors.white, 'a=0', 3);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-area-function-properties',
                    title: 'Properties of A(x)',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 40, originX: 100, originY: 180, height: 400 });

                        var f = function(t) { return Math.sin(t); };

                        function integrate(a, x, steps) {
                            if (Math.abs(x - a) < 1e-10) return 0;
                            var h = (x - a) / steps;
                            var sum = 0;
                            for (var i = 0; i < steps; i++) {
                                var t0 = a + i * h;
                                var t1 = t0 + h;
                                sum += (f(t0) + f(t1)) / 2 * h;
                            }
                            return sum;
                        }

                        var xVal = 4;
                        var slider = VizEngine.createSlider(container, 'x =', 0, 9, xVal, 0.05, function(v) { xVal = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Shade positive area
                            var posEnd = Math.min(xVal, Math.PI);
                            if (posEnd > 0.01) {
                                viz.shadeUnder(f, 0, posEnd, 'rgba(63,185,80,0.2)');
                            }
                            // Shade negative area
                            if (xVal > Math.PI) {
                                var negEnd = Math.min(xVal, 2 * Math.PI);
                                viz.shadeUnder(f, Math.PI, negEnd, 'rgba(248,81,73,0.2)');
                            }
                            if (xVal > 2 * Math.PI) {
                                viz.shadeUnder(f, 2 * Math.PI, xVal, 'rgba(63,185,80,0.2)');
                            }

                            // Draw f(t) = sin(t)
                            viz.drawFunction(f, -0.5, 9.5, viz.colors.blue, 2.5);

                            // Draw A(x) = 1 - cos(x)
                            var aFunc = function(x) { return 1 - Math.cos(x); };
                            viz.drawFunction(aFunc, 0, 9.5, viz.colors.green, 2.5);

                            // Current position marker
                            viz.drawSegment(xVal, 0, xVal, f(xVal), viz.colors.orange, 1, true);
                            viz.drawPoint(xVal, f(xVal), viz.colors.orange, 'f(x)', 5);
                            viz.drawPoint(xVal, aFunc(xVal), viz.colors.green, 'A(x)', 5);

                            var aVal = aFunc(xVal);
                            viz.screenText('f(t) = sin(t)', viz.width - 10, 18, viz.colors.blue, 13, 'right', 'top');
                            viz.screenText('A(x) = 1 - cos(x)', viz.width - 10, 38, viz.colors.green, 13, 'right', 'top');
                            viz.screenText('A(' + xVal.toFixed(1) + ') = ' + aVal.toFixed(3), viz.width - 10, 58, viz.colors.yellow, 13, 'right', 'top');

                            // Annotations: where f changes sign
                            viz.drawSegment(Math.PI, -0.3, Math.PI, 0.3, viz.colors.red, 1, true);
                            viz.drawText('\u03C0', Math.PI, -0.6, viz.colors.text, 11);
                            viz.drawSegment(2 * Math.PI, -0.3, 2 * Math.PI, 0.3, viz.colors.red, 1, true);
                            viz.drawText('2\u03C0', 2 * Math.PI, -0.6, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-10-1-1',
                    type: 'multiple-choice',
                    question: 'If A(x) = integral from 0 to x of t^2 dt, what is A(3)?',
                    options: ['3', '6', '9', '27/3'],
                    answer: 2,
                    solution: 'A(3) = integral from 0 to 3 of t^2 dt = [t^3/3] from 0 to 3 = 27/3 = 9.'
                },
                {
                    id: 'ex-10-1-2',
                    type: 'multiple-choice',
                    question: 'If f(t) >= 0 on [a, b] and A(x) = integral from a to x of f(t) dt, which statement is always true?',
                    options: [
                        'A(x) is decreasing',
                        'A(x) is non-decreasing',
                        'A(x) is concave up',
                        'A(x) = 0 for all x'
                    ],
                    answer: 1,
                    solution: 'When f(t) >= 0, each increment adds non-negative area, so A(x) is non-decreasing.'
                },
                {
                    id: 'ex-10-1-3',
                    type: 'multiple-choice',
                    question: 'What is A(a) = integral from a to a of f(t) dt?',
                    options: ['f(a)', '1', '0', 'undefined'],
                    answer: 2,
                    solution: 'By definition, integrating over an interval of zero width gives 0.'
                },
                {
                    id: 'ex-10-1-4',
                    type: 'short-answer',
                    question: 'Let A(x) = integral from 1 to x of (3t^2 + 1) dt. Find A(2).',
                    answer: '8',
                    solution: 'A(2) = integral from 1 to 2 of (3t^2 + 1) dt = [t^3 + t] from 1 to 2 = (8 + 2) - (1 + 1) = 10 - 2 = 8.',
                    accept: ['8']
                }
            ]
        },

        // ============================================================
        // SECTION 2: FTC Part I
        // ============================================================
        {
            id: 'ftc-part-i',
            title: 'FTC Part I',
            content: `
<h2>10.2 The Fundamental Theorem of Calculus, Part I</h2>

<div class="env-block env-intuition">
<div class="env-header">Section Roadmap</div>
<p>This section states and proves <strong>FTC Part I</strong>, then extends it via the chain rule. The key message: differentiating a definite integral with a variable upper limit simply recovers the integrand. This is the first half of the bridge connecting derivatives and integrals.</p>
</div>

<div class="env-block env-motivation">
<div class="env-header">Motivation</div>
<p>We noticed in the previous section that the derivative of the area function \\(A(x)\\) seemed to equal \\(f(x)\\) itself. Is this always true? The answer is <em>yes</em>, and this profound result is the <strong>First Fundamental Theorem of Calculus</strong>. It tells us that integration and differentiation are inverse processes.</p>
</div>

<div class="env-block env-theorem">
<div class="env-header">Theorem 10.1 &mdash; Fundamental Theorem of Calculus, Part I (FTC I)</div>
<p>Let \\(f\\) be continuous on \\([a, b]\\). Define</p>
\\[ A(x) = \\int_a^x f(t)\\,dt, \\quad a \\le x \\le b. \\]
<p>Then \\(A\\) is differentiable on \\((a, b)\\) and</p>
\\[ A'(x) = \\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x). \\]
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<p>By the definition of derivative,</p>
\\[ A'(x) = \\lim_{h \\to 0} \\frac{A(x+h) - A(x)}{h} = \\lim_{h \\to 0} \\frac{1}{h}\\left[\\int_a^{x+h} f(t)\\,dt - \\int_a^x f(t)\\,dt\\right]. \\]
<p>By the additive property of integrals,</p>
\\[ A(x+h) - A(x) = \\int_x^{x+h} f(t)\\,dt. \\]
<p>By the Mean Value Theorem for Integrals, there exists \\(c_h\\) between \\(x\\) and \\(x+h\\) such that</p>
\\[ \\int_x^{x+h} f(t)\\,dt = f(c_h) \\cdot h. \\]
<p>Therefore,</p>
\\[ A'(x) = \\lim_{h \\to 0} \\frac{f(c_h) \\cdot h}{h} = \\lim_{h \\to 0} f(c_h). \\]
<p>Since \\(c_h\\) is between \\(x\\) and \\(x + h\\), as \\(h \\to 0\\) we have \\(c_h \\to x\\). Since \\(f\\) is continuous,</p>
\\[ A'(x) = f(x). \\quad \\blacksquare \\]
</div>

<div class="env-block env-intuition">
<div class="env-header">Intuition &mdash; Why is A'(x) = f(x)?</div>
<p>When you increase \\(x\\) by a tiny amount \\(h\\), the new area added is approximately a thin rectangle with width \\(h\\) and height \\(f(x)\\). So the rate of change of area is approximately \\(f(x) \\cdot h / h = f(x)\\). As \\(h \\to 0\\), this approximation becomes exact.</p>
</div>

<div class="viz-container" id="viz-ftc1-derivative"></div>

<div class="env-block env-example">
<div class="env-header">Example 10.3 &mdash; Direct Application of FTC I</div>
<p>Find the derivative of \\(g(x) = \\int_1^x e^{-t^2}\\,dt\\).</p>
<p><strong>Solution.</strong> By FTC I directly, \\(g'(x) = e^{-x^2}\\).</p>
<p>Note: the function \\(e^{-t^2}\\) has no elementary antiderivative, yet we can still compute the derivative of its integral!</p>
</div>

<div class="env-block env-example">
<div class="env-header">Example 10.4 &mdash; Chain Rule with FTC I</div>
<p>Find \\(\\frac{d}{dx}\\int_0^{x^2} \\sin(t)\\,dt\\).</p>
<p><strong>Solution.</strong> Let \\(u = x^2\\). Then \\(\\int_0^{x^2} \\sin(t)\\,dt = \\int_0^u \\sin(t)\\,dt\\). By FTC I and the chain rule:</p>
\\[ \\frac{d}{dx}\\int_0^{x^2} \\sin(t)\\,dt = \\sin(u) \\cdot \\frac{du}{dx} = \\sin(x^2) \\cdot 2x. \\]
</div>

<div class="env-block env-theorem">
<div class="env-header">Generalization &mdash; FTC I with Chain Rule</div>
<p>If \\(f\\) is continuous and \\(u(x)\\) is differentiable, then</p>
\\[ \\frac{d}{dx}\\int_a^{u(x)} f(t)\\,dt = f(u(x)) \\cdot u'(x). \\]
<p>More generally, if both limits depend on \\(x\\):</p>
\\[ \\frac{d}{dx}\\int_{v(x)}^{u(x)} f(t)\\,dt = f(u(x)) \\cdot u'(x) - f(v(x)) \\cdot v'(x). \\]
</div>

<p><strong>Looking ahead.</strong> FTC I tells us that differentiation undoes integration. The natural follow-up question is the reverse: can integration undo differentiation? That is, can we <em>evaluate</em> a definite integral by finding an antiderivative? FTC Part II, in the next section, answers with a resounding yes.</p>

<div class="viz-container" id="viz-ftc1-thin-rectangle"></div>
`,
            visualizations: [
                {
                    id: 'viz-ftc1-derivative',
                    title: 'FTC Part I: A\'(x) = f(x)',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 45, originX: 90, originY: 200, height: 400 });

                        var f = function(t) { return 0.3 * t * t - 1.2 * t + 2.5; };

                        function integrate(a, x) {
                            if (Math.abs(x - a) < 1e-10) return 0;
                            var n = 300;
                            var h = (x - a) / n;
                            var sum = 0;
                            for (var i = 0; i < n; i++) {
                                var t0 = a + i * h;
                                sum += (f(t0) + f(t0 + h)) / 2 * h;
                            }
                            return sum;
                        }

                        var xVal = 3;
                        var hVal = 0.5;
                        var slider1 = VizEngine.createSlider(container, 'x =', 0.5, 6, xVal, 0.05, function(v) { xVal = v; draw(); });
                        var slider2 = VizEngine.createSlider(container, 'h =', 0.05, 1.5, hVal, 0.05, function(v) { hVal = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Shade accumulated area
                            if (xVal > 0.01) {
                                viz.shadeUnder(f, 0, xVal, 'rgba(88,166,255,0.15)');
                            }

                            // Shade the thin strip from x to x+h
                            viz.shadeUnder(f, xVal, xVal + hVal, 'rgba(240,136,62,0.4)');

                            // Draw the approximate rectangle
                            viz.drawSegment(xVal, 0, xVal, f(xVal), viz.colors.orange, 2);
                            viz.drawSegment(xVal + hVal, 0, xVal + hVal, f(xVal), viz.colors.orange, 2, true);
                            viz.drawSegment(xVal, f(xVal), xVal + hVal, f(xVal), viz.colors.orange, 2, true);

                            // Draw f(t)
                            viz.drawFunction(f, -0.5, 7, viz.colors.blue, 2.5);

                            // Points
                            viz.drawPoint(xVal, f(xVal), viz.colors.orange, 'f(x)', 5);
                            viz.drawPoint(xVal, 0, viz.colors.white, 'x', 3);
                            viz.drawPoint(xVal + hVal, 0, viz.colors.white, 'x+h', 3);

                            // Compute values
                            var areaStrip = integrate(xVal, xVal + hVal);
                            var approxDeriv = areaStrip / hVal;

                            viz.screenText('f(t) = 0.3t\u00B2 - 1.2t + 2.5', viz.width - 10, 18, viz.colors.blue, 12, 'right', 'top');
                            viz.screenText('Strip area = ' + areaStrip.toFixed(4), viz.width - 10, 38, viz.colors.orange, 12, 'right', 'top');
                            viz.screenText('\u0394A/h = ' + approxDeriv.toFixed(4), viz.width - 10, 58, viz.colors.yellow, 12, 'right', 'top');
                            viz.screenText('f(x) = ' + f(xVal).toFixed(4), viz.width - 10, 78, viz.colors.green, 12, 'right', 'top');
                            viz.screenText('As h\u21920, \u0394A/h \u2192 f(x)', viz.width / 2, viz.height - 15, viz.colors.white, 13, 'center', 'bottom');
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ftc1-thin-rectangle',
                    title: 'Thin Rectangle Intuition',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 55, originX: 80, originY: 230, height: 360 });

                        var f = function(t) { return 2 + Math.sin(t); };

                        function integrate(a, x) {
                            if (Math.abs(x - a) < 1e-10) return 0;
                            var n = 300;
                            var h = (x - a) / n;
                            var sum = 0;
                            for (var i = 0; i < n; i++) {
                                var t0 = a + i * h;
                                sum += (f(t0) + f(t0 + h)) / 2 * h;
                            }
                            return sum;
                        }

                        var xVal = 3;
                        var draggable = viz.addDraggable('x-pt', xVal, 0, viz.colors.orange, 8, function(wx) {
                            draggable.x = Math.max(0.1, Math.min(wx, 7));
                            draggable.y = 0;
                        });

                        viz.animate(function() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var x = draggable.x;
                            var h = 0.15;

                            // Shade area from 0 to x
                            if (x > 0.01) {
                                viz.shadeUnder(f, 0, x, 'rgba(88,166,255,0.15)');
                            }

                            // Highlight thin rectangle
                            var ctx = viz.ctx;
                            var sxL = viz.toScreen(x, 0);
                            var sxR = viz.toScreen(x + h, 0);
                            var sxT = viz.toScreen(x, f(x));
                            ctx.fillStyle = 'rgba(240,136,62,0.5)';
                            ctx.fillRect(sxL[0], sxT[1], sxR[0] - sxL[0], sxL[1] - sxT[1]);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(sxL[0], sxT[1], sxR[0] - sxL[0], sxL[1] - sxT[1]);

                            // Draw f
                            viz.drawFunction(f, -0.5, 7.5, viz.colors.blue, 2.5);
                            viz.drawPoint(x, f(x), viz.colors.orange, 'f(x)', 5);

                            // Draw A(x) below
                            var aFunc = function(t) { return integrate(0, t) * 0.2 - 2; };
                            viz.drawFunction(aFunc, 0, 7.5, viz.colors.green, 2);
                            viz.drawPoint(x, aFunc(x), viz.colors.green, 'A(x)', 4);

                            // Arrow showing slope
                            viz.screenText('dA/dx = f(x) = ' + f(x).toFixed(2), viz.width / 2, 18, viz.colors.yellow, 14, 'center', 'top');
                            viz.screenText('Drag the orange point along the x-axis', viz.width / 2, viz.height - 10, viz.colors.text, 11, 'center', 'bottom');

                            viz.drawDraggables();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-10-2-1',
                    type: 'multiple-choice',
                    question: 'By FTC I, what is d/dx of the integral from 2 to x of (t^3 + 1) dt?',
                    options: ['t^3 + 1', 'x^3 + 1', '3x^2', 'x^4/4 + x'],
                    answer: 1,
                    solution: 'By FTC I, d/dx integral from a to x of f(t) dt = f(x). So the answer is x^3 + 1.'
                },
                {
                    id: 'ex-10-2-2',
                    type: 'multiple-choice',
                    question: 'Find d/dx of the integral from 0 to x^3 of sqrt(1 + t^2) dt.',
                    options: [
                        'sqrt(1 + x^6)',
                        '3x^2 * sqrt(1 + x^6)',
                        'sqrt(1 + x^2) * 3x^2',
                        '3x^2 * sqrt(1 + x^2)'
                    ],
                    answer: 1,
                    solution: 'By FTC I with chain rule: d/dx integral from 0 to u of f(t) dt = f(u) * u\'(x). Here u = x^3, so the answer is sqrt(1 + (x^3)^2) * 3x^2 = 3x^2 * sqrt(1 + x^6).'
                },
                {
                    id: 'ex-10-2-3',
                    type: 'multiple-choice',
                    question: 'If g(x) = integral from x to 5 of cos(t^2) dt, then g\'(x) = ?',
                    options: [
                        'cos(x^2)',
                        '-cos(x^2)',
                        'cos(25)',
                        '-cos(25)'
                    ],
                    answer: 1,
                    solution: 'We have g(x) = -integral from 5 to x of cos(t^2) dt. Flipping the limits introduces a minus sign. By FTC I, the derivative is -cos(x^2).'
                },
                {
                    id: 'ex-10-2-4',
                    type: 'short-answer',
                    question: 'Find d/dx of the integral from sin(x) to x^2 of e^t dt. Express your answer in terms of x. (Use the form: A*e^(B) - C*e^(D))',
                    answer: '2x*e^(x^2) - cos(x)*e^(sin(x))',
                    solution: 'By the generalized FTC I: d/dx integral from v(x) to u(x) of f(t) dt = f(u(x)) * u\'(x) - f(v(x)) * v\'(x). Here f(t) = e^t, u(x) = x^2, v(x) = sin(x). So the answer is e^(x^2) * 2x - e^(sin(x)) * cos(x).',
                    accept: ['2x*e^(x^2) - cos(x)*e^(sin(x))', '2xe^(x^2) - cos(x)e^(sin(x))', '2x*e^(x^2)-cos(x)*e^(sin(x))']
                }
            ]
        },

        // ============================================================
        // SECTION 3: FTC Part II
        // ============================================================
        {
            id: 'ftc-part-ii',
            title: 'FTC Part II',
            content: `
<h2>10.3 The Fundamental Theorem of Calculus, Part II</h2>

<div class="env-block env-intuition">
<div class="env-header">Section Roadmap</div>
<p>FTC Part I showed that differentiation undoes integration. This section proves the converse: <strong>FTC Part II</strong> (the Evaluation Theorem) lets us compute any definite integral by finding an antiderivative and subtracting endpoint values. This is the result that makes the Riemann-sum machinery from Chapter 9 largely unnecessary for practical computation.</p>
</div>

<div class="env-block env-motivation">
<div class="env-header">Motivation</div>
<p>FTC I told us that differentiation undoes integration. Now we ask the reverse: can we <em>evaluate</em> a definite integral using antiderivatives? FTC II gives a resounding yes, and provides the most powerful computational tool in all of calculus.</p>
</div>

<div class="env-block env-theorem">
<div class="env-header">Theorem 10.2 &mdash; Fundamental Theorem of Calculus, Part II (Evaluation Theorem)</div>
<p>Let \\(f\\) be continuous on \\([a, b]\\) and let \\(F\\) be any antiderivative of \\(f\\) (i.e., \\(F'(x) = f(x)\\)). Then</p>
\\[ \\int_a^b f(x)\\,dx = F(b) - F(a). \\]
<p>We use the notation \\(F(x)\\Big|_a^b\\) or \\(\\left[F(x)\\right]_a^b\\) to denote \\(F(b) - F(a)\\).</p>
</div>

<div class="env-block env-proof">
<div class="env-header">Proof</div>
<p>Let \\(A(x) = \\int_a^x f(t)\\,dt\\). By FTC I, \\(A'(x) = f(x)\\). Since \\(F'(x) = f(x)\\) as well, we have \\(A'(x) = F'(x)\\) on \\((a, b)\\), so \\(A(x) = F(x) + C\\) for some constant \\(C\\).</p>
<p>Evaluating at \\(x = a\\): \\(A(a) = 0 = F(a) + C\\), so \\(C = -F(a)\\).</p>
<p>Evaluating at \\(x = b\\):</p>
\\[ \\int_a^b f(t)\\,dt = A(b) = F(b) + C = F(b) - F(a). \\quad \\blacksquare \\]
</div>

<div class="env-block env-intuition">
<div class="env-header">Intuition</div>
<p>FTC II says: <em>to find the total accumulated change (the integral), just look at the net change of the antiderivative.</em> You do not need to compute limits of Riemann sums. Just find \\(F\\), plug in the endpoints, and subtract.</p>
</div>

<div class="viz-container" id="viz-ftc2-evaluation"></div>

<div class="env-block env-example">
<div class="env-header">Example 10.5</div>
<p>Evaluate \\(\\int_1^4 x^2\\,dx\\).</p>
<p><strong>Solution.</strong> An antiderivative is \\(F(x) = \\frac{x^3}{3}\\). By FTC II:</p>
\\[ \\int_1^4 x^2\\,dx = \\frac{x^3}{3}\\bigg|_1^4 = \\frac{64}{3} - \\frac{1}{3} = \\frac{63}{3} = 21. \\]
</div>

<div class="env-block env-example">
<div class="env-header">Example 10.6</div>
<p>Evaluate \\(\\int_0^\\pi \\sin x\\,dx\\).</p>
<p><strong>Solution.</strong> An antiderivative is \\(F(x) = -\\cos x\\). Thus:</p>
\\[ \\int_0^\\pi \\sin x\\,dx = -\\cos x\\bigg|_0^\\pi = -\\cos(\\pi) - (-\\cos 0) = -(-1) - (-1) = 1 + 1 = 2. \\]
</div>

<div class="env-block env-example">
<div class="env-header">Example 10.7</div>
<p>Evaluate \\(\\int_{-1}^{2} (3x^2 - 4x + 1)\\,dx\\).</p>
<p><strong>Solution.</strong> An antiderivative is \\(F(x) = x^3 - 2x^2 + x\\).</p>
\\[ F(2) - F(-1) = (8 - 8 + 2) - (-1 - 2 - 1) = 2 - (-4) = 6. \\]
</div>

<div class="viz-container" id="viz-ftc2-antiderivative-graph"></div>

<div class="env-block env-definition">
<div class="env-header">Remark &mdash; Any Antiderivative Works</div>
<p>Since \\((F(x) + C)\\big|_a^b = F(b) + C - F(a) - C = F(b) - F(a)\\), the constant of integration cancels. Thus we can use <em>any</em> antiderivative; the simplest one (with \\(C = 0\\)) is preferred.</p>
</div>

<p><strong>Connection.</strong> FTC II converts every definite integral into an antiderivative evaluation. But there is another way to read the same equation: the integral of a <em>rate of change</em> gives the <em>net change</em>. The next section develops this interpretation, which is central to applications in physics and the sciences.</p>
`,
            visualizations: [
                {
                    id: 'viz-ftc2-evaluation',
                    title: 'FTC Part II: Evaluating Definite Integrals',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 45, originX: 80, originY: 220, height: 380 });

                        var f = function(x) { return x * x; };
                        var F = function(x) { return x * x * x / 3; };

                        var aVal = 1;
                        var bVal = 4;

                        var sliderA = VizEngine.createSlider(container, 'a =', 0, 4, aVal, 0.1, function(v) { aVal = v; if (aVal >= bVal) aVal = bVal - 0.1; draw(); });
                        var sliderB = VizEngine.createSlider(container, 'b =', 0.5, 5, bVal, 0.1, function(v) { bVal = v; if (bVal <= aVal) bVal = aVal + 0.1; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Shade area
                            viz.shadeUnder(f, aVal, bVal, 'rgba(63,185,80,0.3)');

                            // Draw f(x) = x^2
                            viz.drawFunction(f, -0.5, 5.5, viz.colors.blue, 2.5);

                            // Mark endpoints
                            viz.drawSegment(aVal, 0, aVal, f(aVal), viz.colors.teal, 1.5, true);
                            viz.drawSegment(bVal, 0, bVal, f(bVal), viz.colors.teal, 1.5, true);
                            viz.drawPoint(aVal, 0, viz.colors.teal, 'a', 4);
                            viz.drawPoint(bVal, 0, viz.colors.teal, 'b', 4);

                            // Compute
                            var result = F(bVal) - F(aVal);
                            viz.screenText('f(x) = x\u00B2, F(x) = x\u00B3/3', viz.width - 10, 18, viz.colors.blue, 12, 'right', 'top');
                            viz.screenText('F(' + bVal.toFixed(1) + ') - F(' + aVal.toFixed(1) + ') = ' + F(bVal).toFixed(2) + ' - ' + F(aVal).toFixed(2), viz.width - 10, 38, viz.colors.yellow, 12, 'right', 'top');
                            viz.screenText('= ' + result.toFixed(3), viz.width - 10, 58, viz.colors.green, 14, 'right', 'top');
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ftc2-antiderivative-graph',
                    title: 'f(x) and its Antiderivative F(x)',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 40, originX: 100, originY: 200, height: 400 });

                        var f = function(x) { return 3 * x * x - 4 * x + 1; };
                        var F = function(x) { return x * x * x - 2 * x * x + x; };

                        var aVal = -1;
                        var bVal = 2;

                        var sliderA = VizEngine.createSlider(container, 'a =', -2, 2, aVal, 0.1, function(v) { aVal = v; draw(); });
                        var sliderB = VizEngine.createSlider(container, 'b =', -1, 4, bVal, 0.1, function(v) { bVal = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var left = Math.min(aVal, bVal);
                            var right = Math.max(aVal, bVal);

                            // Shade area under f
                            viz.shadeUnder(f, left, right, 'rgba(88,166,255,0.2)');

                            // Draw f(x) and F(x)
                            viz.drawFunction(f, -2.5, 4.5, viz.colors.blue, 2.5);
                            viz.drawFunction(F, -2.5, 4.5, viz.colors.green, 2.5);

                            // Mark F(a) and F(b)
                            viz.drawPoint(aVal, F(aVal), viz.colors.orange, 'F(a)', 5);
                            viz.drawPoint(bVal, F(bVal), viz.colors.orange, 'F(b)', 5);
                            viz.drawSegment(aVal, F(aVal), bVal, F(bVal), viz.colors.orange, 1, true);

                            // Vertical dashed lines
                            viz.drawSegment(aVal, 0, aVal, F(aVal), viz.colors.text, 1, true);
                            viz.drawSegment(bVal, 0, bVal, F(bVal), viz.colors.text, 1, true);

                            var result = F(bVal) - F(aVal);
                            viz.screenText('f(x) = 3x\u00B2 - 4x + 1 (blue)', viz.width - 10, 18, viz.colors.blue, 11, 'right', 'top');
                            viz.screenText('F(x) = x\u00B3 - 2x\u00B2 + x (green)', viz.width - 10, 36, viz.colors.green, 11, 'right', 'top');
                            viz.screenText('F(b) - F(a) = ' + F(bVal).toFixed(2) + ' - (' + F(aVal).toFixed(2) + ') = ' + result.toFixed(2), viz.width - 10, 56, viz.colors.yellow, 12, 'right', 'top');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-10-3-1',
                    type: 'multiple-choice',
                    question: 'Evaluate the integral from 0 to 2 of (3x^2) dx using FTC II.',
                    options: ['4', '6', '8', '12'],
                    answer: 2,
                    solution: 'F(x) = x^3. So the integral = F(2) - F(0) = 8 - 0 = 8.'
                },
                {
                    id: 'ex-10-3-2',
                    type: 'multiple-choice',
                    question: 'Evaluate the integral from 0 to pi/2 of cos(x) dx.',
                    options: ['0', '1', '-1', '2'],
                    answer: 1,
                    solution: 'F(x) = sin(x). The integral = sin(pi/2) - sin(0) = 1 - 0 = 1.'
                },
                {
                    id: 'ex-10-3-3',
                    type: 'short-answer',
                    question: 'Evaluate the integral from 1 to e of (1/x) dx.',
                    answer: '1',
                    solution: 'F(x) = ln(x). The integral = ln(e) - ln(1) = 1 - 0 = 1.',
                    accept: ['1', '1.0']
                },
                {
                    id: 'ex-10-3-4',
                    type: 'multiple-choice',
                    question: 'Why does the constant C cancel when evaluating F(b) - F(a)?',
                    options: [
                        'Because C = 0 always',
                        'Because (F(b)+C) - (F(a)+C) = F(b) - F(a)',
                        'Because the integral of a constant is zero',
                        'Because F is unique'
                    ],
                    answer: 1,
                    solution: 'When we compute (F(b) + C) - (F(a) + C), the C terms cancel: F(b) + C - F(a) - C = F(b) - F(a).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Net Change Theorem
        // ============================================================
        {
            id: 'net-change-theorem',
            title: 'Net Change Theorem',
            content: `
<h2>10.4 The Net Change Theorem</h2>

<div class="env-block env-intuition">
<div class="env-header">Section Roadmap</div>
<p>This section reinterprets FTC II from a physical and applied perspective. The <strong>Net Change Theorem</strong> says: if you know the rate at which a quantity changes, integrating that rate gives the total (net) change. We will apply this to displacement vs. distance, flow rates, and population growth, building intuition for the integral as "total accumulation."</p>
</div>

<div class="env-block env-motivation">
<div class="env-header">Motivation</div>
<p>FTC II can be rewritten in a way that emphasizes a physical interpretation: the integral of a rate of change gives the net change. This viewpoint connects calculus to real-world problems involving velocity, flow rates, population growth, and more.</p>
</div>

<div class="env-block env-theorem">
<div class="env-header">Theorem 10.3 &mdash; Net Change Theorem</div>
<p>If \\(F'\\) is continuous on \\([a, b]\\), then</p>
\\[ \\int_a^b F'(x)\\,dx = F(b) - F(a). \\]
<p>In words: <em>the integral of the rate of change equals the net change.</em></p>
</div>

<div class="env-block env-intuition">
<div class="env-header">Intuition</div>
<p>If you know the <em>rate</em> at which something changes, integrating that rate over time gives you the <em>total</em> change. This is just FTC II read from right to left.</p>
</div>

<div class="env-block env-example">
<div class="env-header">Example 10.8 &mdash; Displacement vs. Distance</div>
<p>A particle moves along a line with velocity \\(v(t) = t^2 - 4t + 3\\) (in m/s) for \\(0 \\le t \\le 5\\).</p>
<p><strong>(a) Displacement</strong> (net change in position):</p>
\\[ \\text{Displacement} = \\int_0^5 v(t)\\,dt = \\int_0^5 (t^2 - 4t + 3)\\,dt = \\left[\\frac{t^3}{3} - 2t^2 + 3t\\right]_0^5 \\]
\\[ = \\frac{125}{3} - 50 + 15 = \\frac{125 - 150 + 45}{3} = \\frac{20}{3} \\approx 6.67 \\text{ m}. \\]
<p><strong>(b) Total distance traveled</strong> (always positive):</p>
<p>We need \\(\\int_0^5 |v(t)|\\,dt\\). Factor: \\(v(t) = (t-1)(t-3)\\). So \\(v(t) < 0\\) on \\((1, 3)\\).</p>
\\[ \\text{Distance} = \\int_0^1 v\\,dt + \\int_1^3 |v|\\,dt + \\int_3^5 v\\,dt \\]
\\[ = \\int_0^1 v\\,dt - \\int_1^3 v\\,dt + \\int_3^5 v\\,dt. \\]
<p>Computing each piece: \\(\\frac{4}{3} + \\frac{4}{3} + \\frac{32}{3} = \\frac{40}{3} \\approx 13.33\\) m.</p>
</div>

<div class="viz-container" id="viz-displacement-vs-distance"></div>

<div class="env-block env-example">
<div class="env-header">Example 10.9 &mdash; Water Tank</div>
<p>Water flows into a tank at a rate of \\(r(t) = 3t + 2\\) liters per minute for \\(0 \\le t \\le 10\\) minutes. How much water enters the tank?</p>
<p><strong>Solution.</strong> By the Net Change Theorem:</p>
\\[ \\int_0^{10} (3t + 2)\\,dt = \\left[\\frac{3t^2}{2} + 2t\\right]_0^{10} = 150 + 20 = 170 \\text{ liters}. \\]
</div>

<div class="env-block env-definition">
<div class="env-header">Displacement vs. Distance</div>
<ul>
<li><strong>Displacement</strong> = \\(\\int_a^b v(t)\\,dt\\) = net change in position (can be negative)</li>
<li><strong>Total distance</strong> = \\(\\int_a^b |v(t)|\\,dt\\) = total path length (always non-negative)</li>
</ul>
<p>These differ whenever the velocity changes sign (the object reverses direction).</p>
</div>

<p><strong>Looking ahead.</strong> With the Net Change Theorem in hand, we have seen the FTC from both the theoretical and the applied side. The final section of this chapter steps back to view the full picture: differentiation and integration as inverse operations, unified by the FTC.</p>

<div class="viz-container" id="viz-net-change-rates"></div>
`,
            visualizations: [
                {
                    id: 'viz-displacement-vs-distance',
                    title: 'Displacement vs. Total Distance',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 50, originX: 60, originY: 200, height: 380 });

                        var v = function(t) { return t * t - 4 * t + 3; };
                        var showDistance = false;

                        VizEngine.createButton(container, 'Toggle: Distance / Displacement', function() {
                            showDistance = !showDistance;
                            draw();
                        });

                        var tEnd = 5;
                        var slider = VizEngine.createSlider(container, 't =', 0, 5, tEnd, 0.05, function(val) { tEnd = val; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            if (showDistance) {
                                // Show |v(t)| shading
                                var absV = function(t) { return Math.abs(v(t)); };
                                viz.shadeUnder(absV, 0, tEnd, 'rgba(63,185,80,0.3)');
                                viz.drawFunction(absV, -0.3, 5.5, viz.colors.green, 2, 200);
                                viz.screenText('Showing |v(t)| — Total Distance', viz.width / 2, 18, viz.colors.green, 13, 'center', 'top');
                            } else {
                                // Positive parts green, negative parts red
                                var t1 = 1, t3 = 3;
                                var posEnd1 = Math.min(tEnd, t1);
                                if (posEnd1 > 0) viz.shadeUnder(v, 0, posEnd1, 'rgba(63,185,80,0.3)');
                                if (tEnd > t1 && tEnd <= t3) viz.shadeUnder(v, t1, tEnd, 'rgba(248,81,73,0.3)');
                                if (tEnd > t1 && tEnd > t3) {
                                    viz.shadeUnder(v, t1, t3, 'rgba(248,81,73,0.3)');
                                    viz.shadeUnder(v, t3, tEnd, 'rgba(63,185,80,0.3)');
                                }
                                viz.screenText('Showing v(t) — Net Displacement', viz.width / 2, 18, viz.colors.blue, 13, 'center', 'top');
                            }

                            // Draw v(t)
                            viz.drawFunction(v, -0.3, 5.5, viz.colors.blue, 2.5);

                            // Mark roots
                            viz.drawPoint(1, 0, viz.colors.yellow, 't=1', 4);
                            viz.drawPoint(3, 0, viz.colors.yellow, 't=3', 4);

                            // Marker at tEnd
                            viz.drawSegment(tEnd, 0, tEnd, v(tEnd), viz.colors.orange, 1.5, true);
                            viz.drawPoint(tEnd, v(tEnd), viz.colors.orange, null, 5);

                            // Compute values
                            function numIntegrate(fn, a, b) {
                                var n = 500, h = (b - a) / n, s = 0;
                                for (var i = 0; i < n; i++) { var x = a + i * h; s += (fn(x) + fn(x + h)) / 2 * h; }
                                return s;
                            }
                            var disp = numIntegrate(v, 0, tEnd);
                            var dist = numIntegrate(function(t) { return Math.abs(v(t)); }, 0, tEnd);
                            viz.screenText('Displacement = ' + disp.toFixed(2) + ' m', viz.width - 10, viz.height - 40, viz.colors.blue, 12, 'right', 'bottom');
                            viz.screenText('Distance = ' + dist.toFixed(2) + ' m', viz.width - 10, viz.height - 20, viz.colors.green, 12, 'right', 'bottom');
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-net-change-rates',
                    title: 'Net Change from Rate',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 22, originX: 60, originY: 250, height: 350 });

                        // Water tank: r(t) = 3t + 2
                        var r = function(t) { return 3 * t + 2; };
                        var R = function(t) { return 1.5 * t * t + 2 * t; };

                        var tVal = 10;
                        var slider = VizEngine.createSlider(container, 'time =', 0, 10, tVal, 0.1, function(v) { tVal = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(2);
                            viz.drawAxes();

                            // Shade area under r(t) from 0 to tVal
                            if (tVal > 0.01) {
                                viz.shadeUnder(r, 0, tVal, 'rgba(88,166,255,0.25)');
                            }

                            // Draw rate function
                            viz.drawFunction(r, -0.5, 11, viz.colors.blue, 2.5);

                            // Draw total accumulation (scaled down)
                            var scaledR = function(t) { return R(t) * 0.15; };
                            viz.drawFunction(scaledR, 0, 11, viz.colors.green, 2);

                            viz.drawPoint(tVal, r(tVal), viz.colors.orange, null, 5);
                            viz.drawPoint(tVal, scaledR(tVal), viz.colors.green, null, 4);

                            viz.drawSegment(tVal, 0, tVal, r(tVal), viz.colors.orange, 1, true);

                            var total = R(tVal);
                            viz.screenText('r(t) = 3t + 2 (rate, L/min)', viz.width - 10, 18, viz.colors.blue, 12, 'right', 'top');
                            viz.screenText('Total water = ' + total.toFixed(1) + ' L (green, scaled)', viz.width - 10, 38, viz.colors.green, 12, 'right', 'top');
                            viz.screenText('Current rate = ' + r(tVal).toFixed(1) + ' L/min', viz.width - 10, 58, viz.colors.orange, 12, 'right', 'top');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-10-4-1',
                    type: 'multiple-choice',
                    question: 'A car has velocity v(t) = 2t - 6 m/s for 0 <= t <= 5. What is the displacement from t=0 to t=5?',
                    options: ['-5 m', '0 m', '-5/2 m', '5 m'],
                    answer: 0,
                    solution: 'Displacement = integral from 0 to 5 of (2t - 6) dt = [t^2 - 6t] from 0 to 5 = (25 - 30) - 0 = -5 m.'
                },
                {
                    id: 'ex-10-4-2',
                    type: 'multiple-choice',
                    question: 'For v(t) = 2t - 6 on [0, 5], the total distance traveled is:',
                    options: ['5 m', '13 m', '10 m', '8 m'],
                    answer: 1,
                    solution: 'v(t) = 0 when t = 3. Distance = integral from 0 to 3 of |2t-6| dt + integral from 3 to 5 of |2t-6| dt = integral from 0 to 3 of (6-2t) dt + integral from 3 to 5 of (2t-6) dt = [6t - t^2] from 0 to 3 + [t^2 - 6t] from 3 to 5 = (18-9) + ((25-30) - (9-18)) = 9 + (-5+9) = 9 + 4 = 13 m.'
                },
                {
                    id: 'ex-10-4-3',
                    type: 'short-answer',
                    question: 'A population grows at rate r(t) = 100 + 20t individuals per year. How many individuals are added in the first 5 years?',
                    answer: '750',
                    solution: 'Net change = integral from 0 to 5 of (100 + 20t) dt = [100t + 10t^2] from 0 to 5 = 500 + 250 = 750.',
                    accept: ['750', '750.0']
                }
            ]
        },

        // ============================================================
        // SECTION 5: Connecting Differentiation & Integration
        // ============================================================
        {
            id: 'connecting-diff-integration',
            title: 'Connecting Differentiation & Integration',
            content: `
<h2>10.5 Connecting Differentiation and Integration</h2>

<div class="env-block env-intuition">
<div class="env-header">Section Roadmap</div>
<p>This final section synthesizes everything. We place FTC I and FTC II side by side, see how they form a complete cycle between \\(f\\) and its antiderivative \\(F\\), and reflect on the historical significance of this unification. We also preview how the FTC motivates the integration techniques developed in Chapter 11.</p>
</div>

<div class="env-block env-motivation">
<div class="env-header">The Big Picture</div>
<p>The two parts of the Fundamental Theorem of Calculus reveal that differentiation and integration are <strong>inverse processes</strong>. This is arguably the most profound idea in all of mathematics:</p>
<ul>
<li><strong>FTC I:</strong> \\(\\displaystyle \\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)\\) &mdash; differentiation undoes integration.</li>
<li><strong>FTC II:</strong> \\(\\displaystyle \\int_a^b F'(x)\\,dx = F(b) - F(a)\\) &mdash; integration undoes differentiation (up to a constant).</li>
</ul>
</div>

<div class="env-block env-theorem">
<div class="env-header">Summary: The Fundamental Theorem of Calculus</div>
<p>Let \\(f\\) be continuous on \\([a, b]\\).</p>
<p><strong>Part I (Differentiation of an integral):</strong></p>
\\[ \\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x). \\]
<p><strong>Part II (Integration of a derivative):</strong></p>
\\[ \\int_a^b f(x)\\,dx = F(b) - F(a), \\quad \\text{where } F' = f. \\]
<p>Together, they form the bridge between differential and integral calculus, two subjects that were developed independently before Newton and Leibniz unified them in the 17th century.</p>
</div>

<div class="viz-container" id="viz-inverse-processes"></div>

<div class="env-block env-intuition">
<div class="env-header">An Analogy</div>
<p>Think of differentiation and integration as <em>inverse operations</em>, like squaring and taking square roots, or like encryption and decryption. Differentiation breaks down a function into its instantaneous rates; integration reassembles those rates into accumulated totals. The FTC says these two operations perfectly undo each other.</p>
</div>

<div class="env-block env-example">
<div class="env-header">Example 10.10 &mdash; Round-Trip</div>
<p>Start with \\(f(x) = \\cos x\\).</p>
<p><strong>Integrate then differentiate (FTC I):</strong></p>
\\[ \\frac{d}{dx}\\int_0^x \\cos t\\,dt = \\frac{d}{dx}[\\sin x] = \\cos x = f(x). \\checkmark \\]
<p><strong>Differentiate then integrate (FTC II):</strong></p>
\\[ \\int_a^b (\\cos x)'\\,dx = \\int_a^b (-\\sin x)\\,dx = \\cos b - \\cos a. \\]
<p>We recover the net change of \\(\\cos x\\) from \\(a\\) to \\(b\\). \\(\\checkmark\\)</p>
</div>

<div class="env-block env-example">
<div class="env-header">Example 10.11 &mdash; Table of Definite Integrals via FTC II</div>
<table class="styled-table" style="width:100%;">
<tr><th style="text-align:left;">Integral</th><th style="text-align:left;">Antiderivative \\(F(x)\\)</th><th style="text-align:left;">Result</th></tr>
<tr><td>\\(\\int_0^1 x^n\\,dx\\)</td><td>\\(\\frac{x^{n+1}}{n+1}\\)</td><td>\\(\\frac{1}{n+1}\\)</td></tr>
<tr><td>\\(\\int_1^e \\frac{1}{x}\\,dx\\)</td><td>\\(\\ln|x|\\)</td><td>\\(1\\)</td></tr>
<tr><td>\\(\\int_0^{\\pi} \\sin x\\,dx\\)</td><td>\\(-\\cos x\\)</td><td>\\(2\\)</td></tr>
<tr><td>\\(\\int_0^1 e^x\\,dx\\)</td><td>\\(e^x\\)</td><td>\\(e - 1\\)</td></tr>
</table>
</div>

<div class="viz-container" id="viz-ftc-cycle"></div>

<div class="env-block env-definition">
<div class="env-header">Historical Note</div>
<p>The definite integral was first understood as a limit of sums (Archimedes, Riemann). Separately, derivatives were studied for tangent lines and rates of change (Fermat, Newton). The FTC, discovered independently by Newton (c. 1666) and Leibniz (c. 1675), showed these are two sides of the same coin. This unification launched modern calculus and transformed mathematics, physics, and engineering.</p>
</div>

<div class="env-block env-intuition">
<div class="env-header">Looking Ahead</div>
<p>The FTC says that to evaluate a definite integral, find an antiderivative. But finding antiderivatives can be tricky: while every continuous function has an antiderivative (FTC I guarantees it), there is no single formula that works for all integrands. The next chapter develops systematic <em>techniques of integration</em>, including substitution, integration by parts, and partial fractions, giving you a toolkit for computing antiderivatives of a wide variety of functions.</p>
</div>

<div class="env-block env-intuition">
<div class="env-header">Chapter Summary</div>
<p>This chapter established the Fundamental Theorem of Calculus in two parts. <strong>FTC I</strong> says that differentiating the area function recovers the integrand: \\(\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)\\). <strong>FTC II</strong> (the Evaluation Theorem) says that \\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\) for any antiderivative \\(F\\). Together, these results show that differentiation and integration are inverse processes, unifying the two main branches of calculus. The Net Change Theorem recast this relationship in applied terms: integrating a rate of change gives the total change. With the FTC as our foundation, the remaining challenge is practical: how to find antiderivatives efficiently. That is the subject of Chapter 11.</p>
</div>
`,
            visualizations: [
                {
                    id: 'viz-inverse-processes',
                    title: 'Differentiation and Integration as Inverse Processes',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 45, originX: 100, originY: 200, height: 420 });

                        var mode = 0; // 0: show f, 1: integrate then diff, 2: differentiate then integrate
                        var modeLabels = ['f(x) = cos(x)', 'Integrate then Differentiate', 'Differentiate then Integrate'];

                        VizEngine.createButton(container, 'Next Step', function() {
                            mode = (mode + 1) % 3;
                            draw();
                        });

                        var f = function(x) { return Math.cos(x); };
                        var F = function(x) { return Math.sin(x); };     // integral of cos
                        var fPrime = function(x) { return -Math.sin(x); }; // derivative of cos

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            viz.screenText(modeLabels[mode], viz.width / 2, 15, viz.colors.white, 15, 'center', 'top');

                            if (mode === 0) {
                                viz.drawFunction(f, -1, 8, viz.colors.blue, 3);
                                viz.screenText('f(x) = cos(x)', viz.width - 10, 40, viz.colors.blue, 13, 'right', 'top');
                            } else if (mode === 1) {
                                // Show F = integral of f, then d/dx(F) = f
                                viz.drawFunction(F, -1, 8, viz.colors.green, 2.5);
                                viz.drawFunction(f, -1, 8, viz.colors.orange, 2.5);
                                viz.screenText('Step 1: Integrate \u2192 F(x) = sin(x) (green)', viz.width - 10, 40, viz.colors.green, 12, 'right', 'top');
                                viz.screenText('Step 2: Differentiate \u2192 F\'(x) = cos(x) (orange)', viz.width - 10, 60, viz.colors.orange, 12, 'right', 'top');
                                viz.screenText('We get back f(x) = cos(x)!', viz.width - 10, 80, viz.colors.yellow, 12, 'right', 'top');
                            } else {
                                // Show f' = derivative of f, then integral of f'
                                viz.drawFunction(fPrime, -1, 8, viz.colors.purple, 2.5);
                                viz.drawFunction(f, -1, 8, viz.colors.orange, 2.5);
                                viz.screenText('Step 1: Differentiate \u2192 f\'(x) = -sin(x) (purple)', viz.width - 10, 40, viz.colors.purple, 12, 'right', 'top');
                                viz.screenText('Step 2: Integrate f\' \u2192 cos(b) - cos(a)', viz.width - 10, 60, viz.colors.orange, 12, 'right', 'top');
                                viz.screenText('We recover f(b) - f(a)!', viz.width - 10, 80, viz.colors.yellow, 12, 'right', 'top');

                                // Shade area under f'
                                viz.shadeUnder(fPrime, 0, 4, 'rgba(188,140,255,0.15)');
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-ftc-cycle',
                    title: 'The FTC Cycle: f <-> F',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 40, originX: 100, originY: 220, height: 420 });

                        var funcChoice = 0;
                        var funcs = [
                            { name: 'x^2', f: function(x) { return x * x; }, F: function(x) { return x * x * x / 3; }, fLabel: 'f(x) = x\u00B2', FLabel: 'F(x) = x\u00B3/3' },
                            { name: 'sin(x)', f: function(x) { return Math.sin(x); }, F: function(x) { return -Math.cos(x); }, fLabel: 'f(x) = sin(x)', FLabel: 'F(x) = -cos(x)' },
                            { name: 'e^x', f: function(x) { return Math.exp(x); }, F: function(x) { return Math.exp(x); }, fLabel: 'f(x) = e^x', FLabel: 'F(x) = e^x' }
                        ];

                        VizEngine.createButton(container, 'Switch Function', function() {
                            funcChoice = (funcChoice + 1) % funcs.length;
                            draw();
                        });

                        var aVal = 0;
                        var bVal = 3;
                        var sliderA = VizEngine.createSlider(container, 'a =', -2, 3, aVal, 0.1, function(v) { aVal = v; draw(); });
                        var sliderB = VizEngine.createSlider(container, 'b =', -1, 5, bVal, 0.1, function(v) { bVal = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var cur = funcs[funcChoice];
                            var left = Math.min(aVal, bVal);
                            var right = Math.max(aVal, bVal);

                            // Shade integral
                            viz.shadeUnder(cur.f, left, right, 'rgba(88,166,255,0.2)');

                            // Draw f and F
                            viz.drawFunction(cur.f, -3, 6, viz.colors.blue, 2.5);
                            viz.drawFunction(cur.F, -3, 6, viz.colors.green, 2.5);

                            // Mark F(a), F(b)
                            viz.drawPoint(aVal, cur.F(aVal), viz.colors.orange, 'F(a)', 5);
                            viz.drawPoint(bVal, cur.F(bVal), viz.colors.orange, 'F(b)', 5);
                            viz.drawSegment(aVal, 0, aVal, cur.F(aVal), viz.colors.text, 1, true);
                            viz.drawSegment(bVal, 0, bVal, cur.F(bVal), viz.colors.text, 1, true);

                            var result = cur.F(bVal) - cur.F(aVal);
                            viz.screenText(cur.fLabel + ' (blue)', viz.width - 10, 18, viz.colors.blue, 12, 'right', 'top');
                            viz.screenText(cur.FLabel + ' (green)', viz.width - 10, 38, viz.colors.green, 12, 'right', 'top');
                            viz.screenText('\u222B f dx = F(b) - F(a) = ' + result.toFixed(3), viz.width - 10, 60, viz.colors.yellow, 13, 'right', 'top');

                            // Arrows showing the cycle
                            viz.screenText('d/dx', 30, viz.height / 2 - 30, viz.colors.red, 12, 'center');
                            viz.screenText('\u2193', 30, viz.height / 2 - 15, viz.colors.red, 16, 'center');
                            viz.screenText('\u222B', 30, viz.height / 2 + 15, viz.colors.green, 16, 'center');
                            viz.screenText('\u2191', 30, viz.height / 2 + 30, viz.colors.green, 12, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-10-5-1',
                    type: 'multiple-choice',
                    question: 'Which statement best describes the relationship between differentiation and integration?',
                    options: [
                        'They are the same operation',
                        'They are inverse operations',
                        'They are unrelated',
                        'Integration is always harder than differentiation'
                    ],
                    answer: 1,
                    solution: 'The FTC shows that differentiation and integration are inverse processes: differentiating an integral returns the integrand, and integrating a derivative gives net change.'
                },
                {
                    id: 'ex-10-5-2',
                    type: 'multiple-choice',
                    question: 'If we first integrate f from a to x, then differentiate with respect to x, we get:',
                    options: [
                        'F(x) - F(a)',
                        'f(x)',
                        'f(a)',
                        '0'
                    ],
                    answer: 1,
                    solution: 'By FTC I: d/dx integral from a to x of f(t) dt = f(x).'
                },
                {
                    id: 'ex-10-5-3',
                    type: 'multiple-choice',
                    question: 'Evaluate the integral from 0 to 1 of e^x dx.',
                    options: ['e', 'e - 1', '1', 'e + 1'],
                    answer: 1,
                    solution: 'F(x) = e^x. By FTC II: integral = e^1 - e^0 = e - 1.'
                },
                {
                    id: 'ex-10-5-4',
                    type: 'short-answer',
                    question: 'Find d/dx of the integral from 2 to x of (t^4 + 3t) dt.',
                    answer: 'x^4 + 3x',
                    solution: 'By FTC I, the answer is simply f(x) = x^4 + 3x.',
                    accept: ['x^4 + 3x', 'x^4+3x', 'x^4 + 3*x']
                }
            ]
        }
    ]
});
