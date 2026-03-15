window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Functions Review',
    subtitle: 'Building blocks of calculus: function families, composition, inversion, and transformations',
    sections: [
        // ===================== Section 1: Polynomials & Rational Functions =====================
        {
            id: 'ch00-sec01',
            title: 'Polynomials & Rational Functions',
            content: `<h2>Polynomials & Rational Functions</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why Start with Functions?</div>
                    <div class="env-body"><p>Every concept in calculus, from limits to derivatives to integrals, is an operation performed on a <strong>function</strong>. Before we can ask "what is the derivative of \\(f\\)?" or "what is \\(\\int f(x)\\,dx\\)?", we need fluency with the basic function families: polynomials, rational functions, trigonometric functions, exponentials, and logarithms. This chapter builds that fluency so that when calculus proper begins, you can focus on the new ideas rather than struggling with the functions themselves.</p></div>
                </div>

                <p>This section covers polynomials and rational functions, the algebraic workhorses of calculus. You will encounter polynomials in Taylor approximations, rational functions in partial-fraction integration, and their asymptotic behavior in limit computations.</p>

                <p>Polynomials are the most fundamental building blocks in mathematics. They arise in physics, engineering, economics, and virtually every application of calculus. Understanding their behavior is essential before moving into limits and derivatives.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Polynomial Function)</div>
                    <div class="env-body"><p>A <strong>polynomial function</strong> of degree \\(n\\) is a function of the form
                    \\[p(x) = a_n x^n + a_{n-1} x^{n-1} + \\cdots + a_1 x + a_0\\]
                    where \\(a_n \\neq 0\\), each \\(a_i \\in \\mathbb{R}\\), and \\(n\\) is a non-negative integer. The number \\(a_n\\) is called the <strong>leading coefficient</strong>, and \\(a_0\\) is the <strong>constant term</strong>.</p></div>
                </div>

                <h3>Degree and Shape</h3>
                <p>The <strong>degree</strong> of a polynomial determines its overall shape and the maximum number of turning points:</p>
                <ul>
                    <li><strong>Degree 0:</strong> Constant \\(p(x) = c\\) &mdash; a horizontal line</li>
                    <li><strong>Degree 1:</strong> Linear \\(p(x) = ax + b\\) &mdash; a straight line with slope \\(a\\)</li>
                    <li><strong>Degree 2:</strong> Quadratic \\(p(x) = ax^2 + bx + c\\) &mdash; a parabola</li>
                    <li><strong>Degree 3:</strong> Cubic &mdash; an S-shaped curve with up to 2 turning points</li>
                    <li><strong>Degree \\(n\\):</strong> At most \\(n - 1\\) turning points</li>
                </ul>

                <div class="env-block theorem">
                    <div class="env-title">Fundamental Theorem of Algebra</div>
                    <div class="env-body"><p>Every non-constant polynomial with complex coefficients has at least one complex root. Consequently, a polynomial of degree \\(n\\) has exactly \\(n\\) roots (counting multiplicities) in \\(\\mathbb{C}\\).</p></div>
                </div>

                <h3>End Behavior</h3>
                <p>For a polynomial \\(p(x) = a_n x^n + \\cdots\\), the end behavior is governed by the leading term \\(a_n x^n\\):</p>
                <ul>
                    <li>If \\(n\\) is <strong>even</strong> and \\(a_n &gt; 0\\): both ends go to \\(+\\infty\\)</li>
                    <li>If \\(n\\) is <strong>even</strong> and \\(a_n &lt; 0\\): both ends go to \\(-\\infty\\)</li>
                    <li>If \\(n\\) is <strong>odd</strong> and \\(a_n &gt; 0\\): left end \\(\\to -\\infty\\), right end \\(\\to +\\infty\\)</li>
                    <li>If \\(n\\) is <strong>odd</strong> and \\(a_n &lt; 0\\): left end \\(\\to +\\infty\\), right end \\(\\to -\\infty\\)</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body"><p>Think of the leading term as the "skeleton" of the polynomial. For very large \\(|x|\\), the lower-order terms become negligible compared to \\(a_n x^n\\). This is why end behavior depends only on degree and leading coefficient.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-poly-explorer"></div>

                <h3>Rational Functions</h3>
                <p>Polynomials are defined everywhere, but many real-world situations involve quotients of polynomials, which introduce new phenomena: points where the function is undefined, and asymptotic behavior as the function blows up or flattens out. These features make rational functions a natural setting for studying limits.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Rational Function)</div>
                    <div class="env-body"><p>A <strong>rational function</strong> is a ratio of two polynomials:
                    \\[r(x) = \\frac{p(x)}{q(x)}\\]
                    The domain excludes all \\(x\\) where \\(q(x) = 0\\).</p></div>
                </div>

                <h3>Asymptotes</h3>
                <p>Rational functions can exhibit three types of asymptotic behavior:</p>
                <ul>
                    <li><strong>Vertical asymptotes:</strong> Occur at \\(x = c\\) where \\(q(c) = 0\\) but \\(p(c) \\neq 0\\). The function blows up near \\(x = c\\).</li>
                    <li><strong>Horizontal asymptotes:</strong> If \\(\\deg(p) &lt; \\deg(q)\\), then \\(y = 0\\). If \\(\\deg(p) = \\deg(q)\\), then \\(y = a_n/b_m\\) (ratio of leading coefficients).</li>
                    <li><strong>Oblique (slant) asymptotes:</strong> If \\(\\deg(p) = \\deg(q) + 1\\), perform polynomial long division to find \\(y = mx + b\\).</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Consider \\(r(x) = \\dfrac{2x^2 - 3x + 1}{x^2 - 4}\\). Since degrees are equal, the horizontal asymptote is \\(y = 2/1 = 2\\). Vertical asymptotes are at \\(x = \\pm 2\\) (where \\(x^2 - 4 = 0\\)).</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>If both \\(p(c) = 0\\) and \\(q(c) = 0\\), then \\(x = c\\) is a <strong>hole</strong>, not a vertical asymptote. Factor and cancel the common factor first. For instance, \\(\\dfrac{x^2 - 1}{x - 1} = x + 1\\) for \\(x \\neq 1\\) has a hole at \\(x = 1\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-rational-explorer"></div>`,

            visualizations: [
                {
                    id: 'viz-poly-explorer',
                    title: 'Polynomial Explorer',
                    description: 'Adjust the degree and leading coefficient to see how polynomial shape and end behavior change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 30, originY: body.clientHeight ? body.clientHeight * 0.55 : 230});

                        var degree = 3;
                        var leadCoeff = 0.5;

                        VizEngine.createSlider(controls, 'Degree', 1, 6, degree, 1, function(v) {
                            degree = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Lead Coeff', -2, 2, leadCoeff, 0.1, function(v) {
                            leadCoeff = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var f = function(x) {
                                return leadCoeff * Math.pow(x, degree);
                            };

                            var xRange = 7;
                            viz.drawFunction(f, -xRange, xRange, viz.colors.blue, 2.5);

                            // Mark roots
                            viz.drawPoint(0, 0, viz.colors.orange, 'root', 5);

                            // End behavior arrows
                            var ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';

                            var leftEnd, rightEnd;
                            if (degree % 2 === 0) {
                                leftEnd = leadCoeff > 0 ? '+inf' : '-inf';
                                rightEnd = leadCoeff > 0 ? '+inf' : '-inf';
                            } else {
                                leftEnd = leadCoeff > 0 ? '-inf' : '+inf';
                                rightEnd = leadCoeff > 0 ? '+inf' : '-inf';
                            }

                            ctx.textAlign = 'left';
                            ctx.fillText('x -> -inf: y -> ' + leftEnd, 10, 20);
                            ctx.textAlign = 'right';
                            ctx.fillText('x -> +inf: y -> ' + rightEnd, viz.width - 10, 20);

                            // Label
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var sign = leadCoeff >= 0 ? '' : '';
                            ctx.fillText('p(x) = ' + leadCoeff.toFixed(1) + 'x^' + degree, viz.width / 2, viz.height - 15);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-rational-explorer',
                    title: 'Rational Function & Asymptotes',
                    description: 'Explore a rational function with adjustable numerator and denominator. Watch how asymptotes appear.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 35});

                        var a = 1;
                        var b = 0;

                        VizEngine.createSlider(controls, 'Numerator coeff a', -3, 3, a, 0.1, function(v) {
                            a = v;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Shift b', -3, 3, b, 0.1, function(v) {
                            b = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // r(x) = a*x / (x^2 - 1) + b
                            // Vertical asymptotes at x = +/- 1
                            var f = function(x) {
                                var denom = x * x - 1;
                                if (Math.abs(denom) < 0.01) return NaN;
                                return a * x / denom + b;
                            };

                            // Draw vertical asymptotes
                            viz.drawSegment(1, -10, 1, 10, viz.colors.red + '88', 1.5, true);
                            viz.drawSegment(-1, -10, -1, 10, viz.colors.red + '88', 1.5, true);

                            // Horizontal asymptote at y = b
                            viz.drawSegment(-10, b, 10, b, viz.colors.green + '88', 1.5, true);

                            // Draw function in three parts to avoid connecting across asymptotes
                            viz.drawFunction(f, -7, -1.05, viz.colors.blue, 2.5);
                            viz.drawFunction(f, -0.95, 0.95, viz.colors.blue, 2.5);
                            viz.drawFunction(f, 1.05, 7, viz.colors.blue, 2.5);

                            var ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var sx1 = viz.toScreen(1.1, 4);
                            ctx.fillText('x = 1', sx1[0], sx1[1]);
                            var sx2 = viz.toScreen(-1.1, 4);
                            ctx.textAlign = 'right';
                            ctx.fillText('x = -1', sx2[0], sx2[1]);

                            ctx.fillStyle = viz.colors.green;
                            ctx.textAlign = 'left';
                            var sy = viz.toScreen(5, b + 0.3);
                            ctx.fillText('y = ' + b.toFixed(1), sy[0], sy[1]);
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    id: 'ch00-sec01-ex01',
                    type: 'short-answer',
                    question: 'What is the degree of the polynomial p(x) = 4x^5 - 2x^3 + 7x - 1? Describe its end behavior.',
                    hint: 'The degree is the highest power of x. End behavior depends on the sign of the leading coefficient and whether the degree is odd or even.',
                    solution: 'Degree 5 (odd) with positive leading coefficient 4. End behavior: as x -> -infinity, p(x) -> -infinity; as x -> +infinity, p(x) -> +infinity.'
                },
                {
                    id: 'ch00-sec01-ex02',
                    type: 'short-answer',
                    question: 'Find all vertical and horizontal asymptotes of r(x) = (3x + 6) / (x^2 - 4).',
                    hint: 'Factor numerator and denominator. Check if any common factors create holes instead of asymptotes.',
                    solution: 'Factor: r(x) = 3(x + 2) / ((x - 2)(x + 2)) = 3/(x - 2) for x != -2. Vertical asymptote at x = 2. Hole at x = -2 (not an asymptote). Horizontal asymptote at y = 0 since the numerator has lower degree after cancellation.'
                },
                {
                    id: 'ch00-sec01-ex03',
                    type: 'short-answer',
                    question: 'A polynomial of degree 4 has roots at x = -1, x = 0 (multiplicity 2), and x = 3. If p(1) = 8, find p(x).',
                    hint: 'Write p(x) = a(x + 1)(x)^2(x - 3). Use the condition p(1) = 8 to find a.',
                    solution: 'p(x) = a * x^2 * (x + 1)(x - 3). Then p(1) = a * 1 * 2 * (-2) = -4a = 8, so a = -2. Therefore p(x) = -2x^2(x + 1)(x - 3).'
                },
                {
                    id: 'ch00-sec01-ex04',
                    type: 'short-answer',
                    question: 'Find the oblique asymptote of f(x) = (x^2 + 3x + 5) / (x + 1).',
                    hint: 'Perform polynomial long division since the degree of the numerator is exactly one more than the denominator.',
                    solution: 'Dividing: (x^2 + 3x + 5) / (x + 1) = x + 2 + 3/(x + 1). As x -> +/- infinity, the remainder 3/(x+1) -> 0. So the oblique asymptote is y = x + 2.'
                }
            ]
        },

        // ===================== Section 2: Trigonometric Functions =====================
        {
            id: 'ch00-sec02',
            title: 'Trigonometric Functions',
            content: `<h2>Trigonometric Functions</h2>
                <p>Having seen polynomials and rational functions, which are built from algebraic operations, we turn to a fundamentally different family: trigonometric functions. Unlike polynomials, these functions are <strong>periodic</strong>, repeating their values in regular cycles.</p>

                <p>Trigonometric functions model periodic phenomena: oscillations, waves, rotations, and cycles. They are indispensable in calculus, especially for integration techniques, Taylor series, and differential equations. This section reviews the unit-circle definitions, the key identities you will need repeatedly, and the inverse trigonometric functions that arise when solving equations.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Unit Circle Approach)</div>
                    <div class="env-body"><p>For any angle \\(\\theta\\) (in radians), consider the point \\(P = (\\cos\\theta, \\sin\\theta)\\) on the unit circle \\(x^2 + y^2 = 1\\). The six trigonometric functions are:
                    \\[\\cos\\theta = x, \\quad \\sin\\theta = y, \\quad \\tan\\theta = \\frac{y}{x}\\]
                    \\[\\sec\\theta = \\frac{1}{x}, \\quad \\csc\\theta = \\frac{1}{y}, \\quad \\cot\\theta = \\frac{x}{y}\\]</p></div>
                </div>

                <h3>Key Values</h3>
                <p>You should memorize the values at the standard angles:</p>
                <table style="width:100%; text-align:center; border-collapse:collapse; margin:1em 0;">
                    <tr style="border-bottom:1px solid #30363d;">
                        <th style="padding:6px;">\\(\\theta\\)</th>
                        <th>\\(0\\)</th><th>\\(\\pi/6\\)</th><th>\\(\\pi/4\\)</th><th>\\(\\pi/3\\)</th><th>\\(\\pi/2\\)</th>
                    </tr>
                    <tr style="border-bottom:1px solid #30363d;">
                        <td style="padding:6px;">\\(\\cos\\theta\\)</td>
                        <td>\\(1\\)</td><td>\\(\\frac{\\sqrt{3}}{2}\\)</td><td>\\(\\frac{\\sqrt{2}}{2}\\)</td><td>\\(\\frac{1}{2}\\)</td><td>\\(0\\)</td>
                    </tr>
                    <tr>
                        <td style="padding:6px;">\\(\\sin\\theta\\)</td>
                        <td>\\(0\\)</td><td>\\(\\frac{1}{2}\\)</td><td>\\(\\frac{\\sqrt{2}}{2}\\)</td><td>\\(\\frac{\\sqrt{3}}{2}\\)</td><td>\\(1\\)</td>
                    </tr>
                </table>

                <div class="env-block theorem">
                    <div class="env-title">Pythagorean Identity</div>
                    <div class="env-body"><p>For all \\(\\theta\\):
                    \\[\\sin^2\\theta + \\cos^2\\theta = 1\\]
                    Dividing by \\(\\cos^2\\theta\\): \\(\\tan^2\\theta + 1 = \\sec^2\\theta\\). Dividing by \\(\\sin^2\\theta\\): \\(1 + \\cot^2\\theta = \\csc^2\\theta\\).</p></div>
                </div>

                <h3>Important Identities for Calculus</h3>
                <ul>
                    <li><strong>Double angle:</strong> \\(\\sin 2\\theta = 2\\sin\\theta\\cos\\theta\\), \\(\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta\\)</li>
                    <li><strong>Half angle:</strong> \\(\\cos^2\\theta = \\frac{1 + \\cos 2\\theta}{2}\\), \\(\\sin^2\\theta = \\frac{1 - \\cos 2\\theta}{2}\\)</li>
                    <li><strong>Sum formulas:</strong> \\(\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta\\)</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">Why Radians?</div>
                    <div class="env-body"><p>In calculus, we always use radians because the derivative formula \\(\\frac{d}{dx}\\sin x = \\cos x\\) is only true when \\(x\\) is measured in radians. If we used degrees, there would be an extra factor of \\(\\pi/180\\). Radians make the fundamental limit \\(\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1\\) exact.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-unit-circle"></div>

                <h3>Inverse Trigonometric Functions</h3>
                <p>In calculus, we often need to "undo" a trigonometric function: given a value like \\(\\sin\\theta = 0.5\\), what is \\(\\theta\\)? This requires inverse trigonometric functions, which also appear as the results of important integrals (for example, \\(\\int \\frac{1}{1+x^2}\\,dx = \\arctan x + C\\)).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Inverse Trig)</div>
                    <div class="env-body"><p>Since trig functions are not one-to-one, we restrict their domains to define inverses:
                    <ul>
                        <li>\\(\\arcsin x = \\sin^{-1}x\\): domain \\([-1,1]\\), range \\([-\\pi/2, \\pi/2]\\)</li>
                        <li>\\(\\arccos x = \\cos^{-1}x\\): domain \\([-1,1]\\), range \\([0, \\pi]\\)</li>
                        <li>\\(\\arctan x = \\tan^{-1}x\\): domain \\(\\mathbb{R}\\), range \\((-\\pi/2, \\pi/2)\\)</li>
                    </ul></p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>The notation \\(\\sin^{-1}x\\) means the inverse function, <strong>not</strong> \\(1/\\sin x\\). We write \\(\\csc x = 1/\\sin x\\) for the reciprocal. This is a common source of confusion.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-unit-circle',
                    title: 'Unit Circle & Trig Functions',
                    description: 'Drag the angle slider to see how sine and cosine relate to the unit circle. The graphs on the right show the periodic behavior.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 80, originX: 160, originY: 200});

                        var theta = 0.8;

                        VizEngine.createSlider(controls, 'Angle (rad)', 0, 6.28, theta, 0.01, function(v) {
                            theta = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            var ctx = viz.ctx;
                            var cx = 160, cy = 200;
                            var R = 80;

                            // Draw unit circle grid and axes
                            viz.drawGrid();
                            viz.drawAxes();

                            // Unit circle
                            viz.drawCircle(0, 0, 1, null, viz.colors.axis, 1.5);

                            // Point on circle
                            var px = Math.cos(theta);
                            var py = Math.sin(theta);

                            // Angle arc
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var arcR = 25;
                            ctx.arc(cx, cy, arcR, 0, -theta, true);
                            ctx.stroke();

                            // Radius line
                            viz.drawSegment(0, 0, px, py, viz.colors.white, 2);

                            // cos projection (horizontal)
                            viz.drawSegment(0, 0, px, 0, viz.colors.blue, 3);
                            // sin projection (vertical)
                            viz.drawSegment(px, 0, px, py, viz.colors.orange, 3);

                            // Point
                            viz.drawPoint(px, py, viz.colors.white, '', 6);

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var cosLabel = viz.toScreen(px / 2, -0.15);
                            ctx.fillText('cos = ' + px.toFixed(2), cosLabel[0], cosLabel[1]);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            var sinLabel = viz.toScreen(px + 0.1, py / 2);
                            ctx.fillText('sin = ' + py.toFixed(2), sinLabel[0], sinLabel[1]);

                            // Angle label
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('θ = ' + theta.toFixed(2), cx + 30, cy - 12);

                            // --- Small graph of sin and cos on the right ---
                            var graphX0 = 340;
                            var graphY0 = 80;
                            var graphW = viz.width - graphX0 - 20;
                            var graphH = 240;
                            var graphScale = graphW / (2 * Math.PI);

                            // Graph background
                            ctx.fillStyle = '#0e0e28';
                            ctx.fillRect(graphX0, graphY0, graphW, graphH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            ctx.strokeRect(graphX0, graphY0, graphW, graphH);

                            // Graph axis
                            var graphMidY = graphY0 + graphH / 2;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(graphX0, graphMidY);
                            ctx.lineTo(graphX0 + graphW, graphMidY);
                            ctx.stroke();

                            var amp = graphH / 2 - 20;

                            // Sin curve
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var t = 2 * Math.PI * i / 200;
                                var gx = graphX0 + t * graphScale;
                                var gy = graphMidY - Math.sin(t) * amp;
                                if (i === 0) ctx.moveTo(gx, gy);
                                else ctx.lineTo(gx, gy);
                            }
                            ctx.stroke();

                            // Cos curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var t = 2 * Math.PI * i / 200;
                                var gx = graphX0 + t * graphScale;
                                var gy = graphMidY - Math.cos(t) * amp;
                                if (i === 0) ctx.moveTo(gx, gy);
                                else ctx.lineTo(gx, gy);
                            }
                            ctx.stroke();

                            // Current position marker
                            var markerX = graphX0 + theta * graphScale;
                            ctx.strokeStyle = viz.colors.white + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath();
                            ctx.moveTo(markerX, graphY0);
                            ctx.lineTo(markerX, graphY0 + graphH);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Dots on graph
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(markerX, graphMidY - py * amp, 4, 0, Math.PI * 2);
                            ctx.fill();

                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(markerX, graphMidY - px * amp, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Legend
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.textAlign = 'left';
                            ctx.fillText('sin(x)', graphX0 + 5, graphY0 + 14);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('cos(x)', graphX0 + 5, graphY0 + 28);
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    id: 'ch00-sec02-ex01',
                    type: 'short-answer',
                    question: 'Simplify sin^2(x) + cos^2(x) + tan^2(x) into a single trig function.',
                    hint: 'Use the Pythagorean identity sin^2 + cos^2 = 1, then recall that 1 + tan^2 = sec^2.',
                    solution: 'sin^2(x) + cos^2(x) + tan^2(x) = 1 + tan^2(x) = sec^2(x).'
                },
                {
                    id: 'ch00-sec02-ex02',
                    type: 'short-answer',
                    question: 'Find the exact value of arcsin(sqrt(3)/2). Express your answer in radians.',
                    hint: 'Which standard angle has sine equal to sqrt(3)/2? Check the unit circle values.',
                    solution: 'arcsin(sqrt(3)/2) = pi/3, since sin(pi/3) = sqrt(3)/2 and pi/3 is in the range [-pi/2, pi/2].'
                },
                {
                    id: 'ch00-sec02-ex03',
                    type: 'short-answer',
                    question: 'Prove that sin(alpha + beta) = sin(alpha)cos(beta) + cos(alpha)sin(beta) starting from the unit circle definition.',
                    hint: 'Consider two points on the unit circle at angles alpha and alpha+beta. Use the distance formula and the cosine subtraction formula.',
                    solution: 'Consider point A at angle alpha and B at angle alpha+beta. The y-coordinate of B is sin(alpha+beta). By rotating the coordinate system by alpha, the new y-coordinate is the projection: sin(alpha)cos(beta) + cos(alpha)sin(beta). Alternatively, use Euler formula: sin(a+b) = Im(e^{i(a+b)}) = Im(e^{ia} * e^{ib}) = sin(a)cos(b) + cos(a)sin(b).'
                }
            ]
        },

        // ===================== Section 3: Exponential & Logarithmic Functions =====================
        {
            id: 'ch00-sec03',
            title: 'Exponential & Logarithmic Functions',
            content: `<h2>Exponential & Logarithmic Functions</h2>
                <p>Polynomials grow at a rate determined by their degree, and trigonometric functions oscillate within fixed bounds. Exponential functions do something qualitatively different: they grow (or decay) at a rate proportional to their current value. This makes them the language of continuous growth and the cornerstone of differential equations.</p>

                <p>This section reviews exponential and logarithmic functions, their algebraic laws, and the special role of the number \\(e\\). In calculus, the natural exponential \\(e^x\\) and natural logarithm \\(\\ln x\\) will appear constantly, from differentiation rules to integration techniques to series expansions.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Exponential Function)</div>
                    <div class="env-body"><p>For any base \\(b &gt; 0\\) with \\(b \\neq 1\\), the <strong>exponential function</strong> is
                    \\[f(x) = b^x\\]
                    Domain: \\(\\mathbb{R}\\). Range: \\((0, \\infty)\\). The function is increasing if \\(b &gt; 1\\) and decreasing if \\(0 &lt; b &lt; 1\\).</p></div>
                </div>

                <h3>Laws of Exponents</h3>
                <p>For \\(a, b &gt; 0\\) and all real \\(x, y\\):</p>
                <ul>
                    <li>\\(b^{x+y} = b^x \\cdot b^y\\)</li>
                    <li>\\(b^{x-y} = b^x / b^y\\)</li>
                    <li>\\((b^x)^y = b^{xy}\\)</li>
                    <li>\\((ab)^x = a^x \\cdot b^x\\)</li>
                    <li>\\(b^0 = 1\\), \\(b^1 = b\\)</li>
                </ul>

                <p>Among all possible bases, one stands out as uniquely important for calculus. The question is: is there a base \\(b\\) such that the derivative of \\(b^x\\) is simply \\(b^x\\) itself, with no extra constant factor? The answer is yes, and that base is \\(e\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (The Number \\(e\\))</div>
                    <div class="env-body"><p>The number \\(e \\approx 2.71828\\) is defined as
                    \\[e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n\\]
                    Equivalently, \\(e\\) is the unique base for which the exponential function \\(e^x\\) satisfies \\(\\frac{d}{dx}e^x = e^x\\).</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why \\(e\\) is Natural</div>
                    <div class="env-body"><p>Imagine investing \\$1 at 100% annual interest. Compounding yearly gives \\$2. Compounding monthly gives \\((1 + 1/12)^{12} \\approx 2.613\\). Compounding continuously gives exactly \\(e \\approx 2.718\\). The limit of more and more frequent compounding converges to \\(e\\), making it the natural base for continuous growth.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-exp-log"></div>

                <h3>Logarithmic Functions</h3>
                <p>Exponential functions are strictly monotonic, so they have inverses. These inverses are the logarithmic functions, which convert multiplicative relationships into additive ones. In calculus, the natural logarithm \\(\\ln x\\) will serve as the antiderivative of \\(1/x\\) and the key to differentiating expressions like \\(x^x\\) via logarithmic differentiation.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Logarithm)</div>
                    <div class="env-body"><p>The <strong>logarithm</strong> base \\(b\\) is the inverse of \\(b^x\\):
                    \\[y = \\log_b x \\iff b^y = x\\]
                    The <strong>natural logarithm</strong> \\(\\ln x = \\log_e x\\) is the most important in calculus.</p></div>
                </div>

                <h3>Laws of Logarithms</h3>
                <ul>
                    <li>\\(\\log_b(xy) = \\log_b x + \\log_b y\\)</li>
                    <li>\\(\\log_b(x/y) = \\log_b x - \\log_b y\\)</li>
                    <li>\\(\\log_b(x^r) = r\\log_b x\\)</li>
                    <li><strong>Change of base:</strong> \\(\\log_b x = \\frac{\\ln x}{\\ln b}\\)</li>
                </ul>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Inverse Relationship)</div>
                    <div class="env-body"><p>For \\(b &gt; 0, b \\neq 1\\):
                    \\[b^{\\log_b x} = x \\quad (x &gt; 0), \\qquad \\log_b(b^x) = x \\quad (\\forall x \\in \\mathbb{R})\\]
                    These are the cancellation equations that confirm \\(b^x\\) and \\(\\log_b x\\) are inverses.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Exponential Growth)</div>
                    <div class="env-body"><p>A bacteria population doubles every 3 hours. If the initial count is \\(N_0 = 100\\), how many bacteria after \\(t\\) hours?</p>
                    <p><strong>Solution:</strong> \\(N(t) = 100 \\cdot 2^{t/3}\\). After 12 hours: \\(N(12) = 100 \\cdot 2^4 = 1600\\). To find when the population reaches 10,000: \\(10000 = 100 \\cdot 2^{t/3}\\), so \\(2^{t/3} = 100\\), \\(t/3 = \\log_2 100 = \\ln 100 / \\ln 2 \\approx 6.644\\), thus \\(t \\approx 19.9\\) hours.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>The domain of \\(\\ln x\\) is \\((0, \\infty)\\). You <strong>cannot</strong> take the log of zero or a negative number (in the reals). This constraint becomes important when solving equations with logarithms &mdash; always check that your solutions give positive arguments.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-exp-log',
                    title: 'Exponential & Logarithmic Families',
                    description: 'Adjust the base to see how exponential and logarithmic curves change. Notice they are reflections across y = x.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 40});

                        var base = 2.718;

                        VizEngine.createSlider(controls, 'Base b', 0.2, 5, base, 0.01, function(v) {
                            base = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // y = x line (mirror)
                            viz.drawFunction(function(x) { return x; }, -6, 8, viz.colors.text + '55', 1);

                            if (Math.abs(base - 1) < 0.02) {
                                // base = 1: exp is constant 1, log is undefined
                                viz.drawSegment(-7, 1, 7, 1, viz.colors.blue, 2);
                                var ctx = viz.ctx;
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('b = 1: exp is constant, log undefined', viz.width / 2, 25);
                            } else {
                                // Exponential: b^x
                                var expF = function(x) { return Math.pow(base, x); };
                                viz.drawFunction(expF, -7, 7, viz.colors.blue, 2.5);

                                // Logarithm: log_b(x)
                                var logF = function(x) {
                                    if (x <= 0) return NaN;
                                    return Math.log(x) / Math.log(base);
                                };
                                viz.drawFunction(logF, 0.01, 10, viz.colors.orange, 2.5);

                                // Key point: (0, 1) on exp, (1, 0) on log
                                viz.drawPoint(0, 1, viz.colors.blue, '(0,1)', 4);
                                viz.drawPoint(1, 0, viz.colors.orange, '(1,0)', 4);

                                // Labels
                                var ctx = viz.ctx;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('y = ' + base.toFixed(2) + '^x', 10, 20);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('y = log_' + base.toFixed(2) + '(x)', 10, 38);
                                ctx.fillStyle = viz.colors.text + 'aa';
                                ctx.fillText('y = x (mirror line)', 10, 56);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    id: 'ch00-sec03-ex01',
                    type: 'short-answer',
                    question: 'Solve for x: 3^(2x - 1) = 27.',
                    hint: 'Express 27 as a power of 3.',
                    solution: '27 = 3^3. So 3^(2x-1) = 3^3, giving 2x - 1 = 3, thus x = 2.'
                },
                {
                    id: 'ch00-sec03-ex02',
                    type: 'short-answer',
                    question: 'Simplify: ln(e^3) + ln(1/e) - ln(e^(1/2)).',
                    hint: 'Use the property ln(e^a) = a for all real a.',
                    solution: 'ln(e^3) + ln(1/e) - ln(e^(1/2)) = 3 + (-1) - 1/2 = 3/2.'
                },
                {
                    id: 'ch00-sec03-ex03',
                    type: 'short-answer',
                    question: 'The half-life of a radioactive substance is 5 years. Write the decay formula and find the time to reach 10% of the initial amount.',
                    hint: 'Use N(t) = N_0 * (1/2)^(t/5). Set N(t)/N_0 = 0.1 and solve for t.',
                    solution: 'N(t) = N_0 * (1/2)^(t/5). Setting 0.1 = (1/2)^(t/5), take ln: ln(0.1) = (t/5)*ln(1/2). So t = 5 * ln(0.1)/ln(0.5) = 5 * (-2.3026)/(-0.6931) = 16.61 years.'
                }
            ]
        },

        // ===================== Section 4: Composition & Inverse Functions =====================
        {
            id: 'ch00-sec04',
            title: 'Composition & Inverse Functions',
            content: `<h2>Composition & Inverse Functions</h2>
                <p>The previous sections built up a library of basic function families: polynomials, rational functions, trig, exponentials, and logarithms. But most functions you encounter in practice are not one of these basic types; rather, they are built by plugging one function into another. This section formalizes that idea.</p>

                <p>Composition is how we build complex functions from simpler parts. The chain rule, the most important differentiation technique, is entirely about derivatives of compositions. Understanding composition and inverses now will pay dividends throughout the course. We also revisit inverse functions in a general setting, unifying the specific inverses (\\(\\arcsin\\), \\(\\ln\\), etc.) we have already seen.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Composition)</div>
                    <div class="env-body"><p>Given functions \\(f\\) and \\(g\\), the <strong>composition</strong> \\(f \\circ g\\) is defined by
                    \\[(f \\circ g)(x) = f(g(x))\\]
                    The domain of \\(f \\circ g\\) consists of all \\(x\\) in the domain of \\(g\\) such that \\(g(x)\\) is in the domain of \\(f\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Let \\(f(x) = \\sqrt{x}\\) and \\(g(x) = 1 - x^2\\).</p>
                    <p>Then \\((f \\circ g)(x) = \\sqrt{1 - x^2}\\), with domain \\(\\{x : 1 - x^2 \\geq 0\\} = [-1, 1]\\).</p>
                    <p>And \\((g \\circ f)(x) = 1 - (\\sqrt{x})^2 = 1 - x\\), with domain \\([0, \\infty)\\).</p>
                    <p>Notice: \\(f \\circ g \\neq g \\circ f\\) in general!</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Machine Analogy</div>
                    <div class="env-body"><p>Think of functions as machines. In \\(f(g(x))\\), input \\(x\\) goes into the \\(g\\)-machine first, producing \\(g(x)\\). That output then feeds into the \\(f\\)-machine, producing \\(f(g(x))\\). The "inner" function \\(g\\) runs first, the "outer" function \\(f\\) runs second. This inside-out reading is exactly what the chain rule unpacks.</p></div>
                </div>

                <h3>Inverse Functions</h3>
                <p>Composition naturally leads to the question of "undoing" a function: if \\(f\\) maps \\(x\\) to \\(y\\), can we find a function that maps \\(y\\) back to \\(x\\)? This is the idea behind inverse functions. In calculus, the inverse function theorem will give a powerful formula for the derivative of \\(f^{-1}\\) in terms of the derivative of \\(f\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Inverse Function)</div>
                    <div class="env-body"><p>A function \\(f\\) is <strong>one-to-one</strong> (injective) if \\(f(a) = f(b) \\implies a = b\\). If \\(f\\) is one-to-one and onto a set \\(B\\), then the <strong>inverse</strong> \\(f^{-1}: B \\to A\\) satisfies
                    \\[f^{-1}(f(x)) = x \\quad \\text{and} \\quad f(f^{-1}(y)) = y\\]</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Horizontal Line Test</div>
                    <div class="env-body"><p>A function \\(f\\) is one-to-one if and only if every horizontal line intersects its graph at most once. Equivalently, \\(f\\) is <strong>strictly monotonic</strong> (either strictly increasing or strictly decreasing) on an interval.</p></div>
                </div>

                <h3>Finding Inverses: The Algorithm</h3>
                <ol>
                    <li>Write \\(y = f(x)\\)</li>
                    <li>Solve for \\(x\\) in terms of \\(y\\)</li>
                    <li>Swap \\(x\\) and \\(y\\): the result is \\(y = f^{-1}(x)\\)</li>
                    <li>Verify: check \\(f(f^{-1}(x)) = x\\) and \\(f^{-1}(f(x)) = x\\)</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Find the inverse of \\(f(x) = \\dfrac{2x + 3}{x - 1}\\) for \\(x \\neq 1\\).</p>
                    <p><strong>Solution:</strong> Set \\(y = \\dfrac{2x+3}{x-1}\\). Then \\(y(x-1) = 2x+3\\), so \\(yx - y = 2x + 3\\), \\(x(y-2) = y+3\\), and \\(x = \\dfrac{y+3}{y-2}\\). Therefore \\(f^{-1}(x) = \\dfrac{x+3}{x-2}\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-composition-inverse"></div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>When restricting domains to create inverses, be precise about which branch you choose. For instance, \\(f(x) = x^2\\) restricted to \\([0, \\infty)\\) has inverse \\(f^{-1}(x) = \\sqrt{x}\\), but restricted to \\((-\\infty, 0]\\) the inverse is \\(f^{-1}(x) = -\\sqrt{x}\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-composition-inverse',
                    title: 'Composition & Inverse Visualizer',
                    description: 'See how f(g(x)) is built step by step, and explore the reflection property of inverse functions across y = x.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 40});

                        var mode = 0; // 0 = composition, 1 = inverse
                        var param = 1;

                        VizEngine.createButton(controls, 'Composition', function() {
                            mode = 0;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Inverse', function() {
                            mode = 1;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Parameter a', 0.5, 3, param, 0.1, function(v) {
                            param = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            if (mode === 0) {
                                // Composition: f(g(x)) where g(x) = a*sin(x), f(x) = x^2
                                var g = function(x) { return param * Math.sin(x); };
                                var f = function(x) { return x * x; };
                                var fg = function(x) { return f(g(x)); };

                                viz.drawFunction(g, -7, 7, viz.colors.teal, 1.5);
                                viz.drawFunction(f, -7, 7, viz.colors.purple + '88', 1.5);
                                viz.drawFunction(fg, -7, 7, viz.colors.orange, 2.5);

                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('g(x) = ' + param.toFixed(1) + ' sin(x)', 10, 20);
                                ctx.fillStyle = viz.colors.purple;
                                ctx.fillText('f(x) = x^2', 10, 38);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('f(g(x)) = ' + param.toFixed(1) + '^2 sin^2(x)', 10, 56);
                            } else {
                                // Inverse: f(x) = a*x^3, f^{-1}(x) = (x/a)^{1/3}
                                var f = function(x) { return param * x * x * x; };
                                var fInv = function(x) {
                                    var val = x / param;
                                    return val >= 0 ? Math.pow(val, 1/3) : -Math.pow(-val, 1/3);
                                };

                                // Mirror line y = x
                                viz.drawFunction(function(x) { return x; }, -7, 7, viz.colors.text + '44', 1);

                                viz.drawFunction(f, -4, 4, viz.colors.blue, 2.5);
                                viz.drawFunction(fInv, -10, 10, viz.colors.green, 2.5);

                                // Show a point and its reflection
                                var px = 1;
                                var py = f(px);
                                viz.drawPoint(px, py, viz.colors.blue, '(' + px + ', ' + py.toFixed(1) + ')', 5);
                                viz.drawPoint(py, px, viz.colors.green, '(' + py.toFixed(1) + ', ' + px + ')', 5);
                                viz.drawSegment(px, py, py, px, viz.colors.white + '44', 1, true);

                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('f(x) = ' + param.toFixed(1) + 'x^3', 10, 20);
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('f^(-1)(x) = (x/' + param.toFixed(1) + ')^(1/3)', 10, 38);
                                ctx.fillStyle = viz.colors.text + 'aa';
                                ctx.fillText('y = x (reflection line)', 10, 56);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    id: 'ch00-sec04-ex01',
                    type: 'short-answer',
                    question: 'Let f(x) = x^2 + 1 and g(x) = sqrt(x - 1). Find the domain of (f o g)(x) and simplify the expression.',
                    hint: 'First determine when g(x) is defined (need x - 1 >= 0). Then compose: f(g(x)) = (sqrt(x-1))^2 + 1.',
                    solution: 'Domain of g: x >= 1. (f o g)(x) = f(sqrt(x-1)) = (sqrt(x-1))^2 + 1 = x - 1 + 1 = x. So (f o g)(x) = x for x >= 1. Note: f and g are not full inverses since (g o f)(x) = sqrt(x^2) = |x| != x for x < 0.'
                },
                {
                    id: 'ch00-sec04-ex02',
                    type: 'short-answer',
                    question: 'Find the inverse of f(x) = (e^x - e^(-x)) / 2 (this is the hyperbolic sine function).',
                    hint: 'Set y = (e^x - e^(-x))/2. Multiply by 2e^x to get a quadratic in e^x.',
                    solution: 'Let y = (e^x - e^(-x))/2. Then 2y = e^x - e^(-x). Multiply by e^x: 2y * e^x = e^(2x) - 1. Let u = e^x: u^2 - 2yu - 1 = 0. By quadratic formula: u = y + sqrt(y^2 + 1) (taking the positive root since u = e^x > 0). So x = ln(y + sqrt(y^2 + 1)). Therefore f^(-1)(x) = ln(x + sqrt(x^2 + 1)).'
                },
                {
                    id: 'ch00-sec04-ex03',
                    type: 'short-answer',
                    question: 'Express the function h(x) = sin(ln(x^2 + 1)) as a composition of three simpler functions.',
                    hint: 'Identify the innermost operation, then the middle, then the outermost.',
                    solution: 'Let u(x) = x^2 + 1, v(x) = ln(x), w(x) = sin(x). Then h(x) = w(v(u(x))) = (w o v o u)(x). The chain rule will give h\'(x) = w\'(v(u(x))) * v\'(u(x)) * u\'(x).'
                }
            ]
        },

        // ===================== Section 5: Function Transformations =====================
        {
            id: 'ch00-sec05',
            title: 'Function Transformations',
            content: `<h2>Function Transformations</h2>
                <p>We now know how to build functions by composing basic families and how to invert them. The final tool in our pre-calculus toolkit is understanding how simple algebraic changes to a function's formula, such as adding a constant or multiplying the input, correspond to geometric changes in its graph.</p>

                <p>This section catalogs the standard transformations (shifts, stretches, reflections) and introduces even/odd symmetry. These ideas matter in calculus for sketching derivatives, recognizing symmetry in integrals (e.g., \\(\\int_{-a}^{a} f(x)\\,dx = 0\\) when \\(f\\) is odd), and understanding how parameter changes propagate through the chain rule.</p>

                <p>Given a base function \\(y = f(x)\\), we can systematically transform it by shifting, stretching, compressing, and reflecting. Mastering these transformations lets you quickly sketch graphs and understand how parameters affect function behavior, skills you will use constantly in calculus.</p>

                <div class="env-block definition">
                    <div class="env-title">Summary of Transformations</div>
                    <div class="env-body"><p>Starting from \\(y = f(x)\\):</p>
                    <table style="width:100%; border-collapse:collapse; margin:0.5em 0;">
                        <tr style="border-bottom:1px solid #30363d;"><th style="padding:4px; text-align:left;">Transformation</th><th style="text-align:left;">Equation</th><th style="text-align:left;">Effect</th></tr>
                        <tr style="border-bottom:1px solid #30363d22;"><td style="padding:4px;">Vertical shift up \\(k\\)</td><td>\\(y = f(x) + k\\)</td><td>Graph moves up</td></tr>
                        <tr style="border-bottom:1px solid #30363d22;"><td style="padding:4px;">Horizontal shift right \\(h\\)</td><td>\\(y = f(x - h)\\)</td><td>Graph moves right</td></tr>
                        <tr style="border-bottom:1px solid #30363d22;"><td style="padding:4px;">Vertical stretch by \\(a\\)</td><td>\\(y = a \\cdot f(x)\\)</td><td>Taller if \\(a &gt; 1\\), shorter if \\(0 &lt; a &lt; 1\\)</td></tr>
                        <tr style="border-bottom:1px solid #30363d22;"><td style="padding:4px;">Horizontal compress by \\(b\\)</td><td>\\(y = f(bx)\\)</td><td>Narrower if \\(b &gt; 1\\), wider if \\(0 &lt; b &lt; 1\\)</td></tr>
                        <tr style="border-bottom:1px solid #30363d22;"><td style="padding:4px;">Reflect over \\(x\\)-axis</td><td>\\(y = -f(x)\\)</td><td>Flips upside down</td></tr>
                        <tr><td style="padding:4px;">Reflect over \\(y\\)-axis</td><td>\\(y = f(-x)\\)</td><td>Flips left-right</td></tr>
                    </table></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Inside vs. Outside</div>
                    <div class="env-body"><p>A useful mnemonic: changes <strong>inside</strong> the function argument (replacing \\(x\\) with \\(x-h\\) or \\(bx\\)) affect the graph <strong>horizontally</strong> and work in the <strong>opposite</strong> direction from what you might expect. Changes <strong>outside</strong> (adding \\(k\\), multiplying by \\(a\\)) affect the graph <strong>vertically</strong> in the <strong>expected</strong> direction.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Describe the graph of \\(y = -2\\sin(3x - \\pi) + 1\\) relative to \\(y = \\sin x\\).</p>
                    <p><strong>Solution:</strong> Factor inside: \\(y = -2\\sin\\bigl(3(x - \\pi/3)\\bigr) + 1\\).</p>
                    <ul>
                        <li>Horizontal compress by factor 3 (period becomes \\(2\\pi/3\\))</li>
                        <li>Shift right by \\(\\pi/3\\)</li>
                        <li>Vertical stretch by 2 (amplitude becomes 2)</li>
                        <li>Reflect over \\(x\\)-axis</li>
                        <li>Shift up by 1</li>
                    </ul></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-transformations"></div>

                <h3>Even and Odd Functions</h3>
                <p>Among all transformations, the reflections \\(f(-x)\\) and \\(-f(x)\\) have a special status: they reveal symmetry. Recognizing symmetry simplifies many calculus problems, most notably definite integrals over symmetric intervals.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition</div>
                    <div class="env-body"><p>A function \\(f\\) is <strong>even</strong> if \\(f(-x) = f(x)\\) for all \\(x\\) (symmetric about the \\(y\\)-axis). It is <strong>odd</strong> if \\(f(-x) = -f(x)\\) for all \\(x\\) (symmetric about the origin).</p></div>
                </div>

                <p><strong>Examples:</strong></p>
                <ul>
                    <li>Even: \\(x^2\\), \\(\\cos x\\), \\(|x|\\)</li>
                    <li>Odd: \\(x^3\\), \\(\\sin x\\), \\(\\tan x\\)</li>
                    <li>Neither: \\(e^x\\), \\(x^2 + x\\)</li>
                </ul>

                <div class="env-block theorem">
                    <div class="env-title">Decomposition into Even and Odd Parts</div>
                    <div class="env-body"><p>Any function can be written as the sum of an even part and an odd part:
                    \\[f(x) = \\underbrace{\\frac{f(x) + f(-x)}{2}}_{\\text{even part}} + \\underbrace{\\frac{f(x) - f(-x)}{2}}_{\\text{odd part}}\\]
                    For example, \\(e^x = \\cosh x + \\sinh x\\), where \\(\\cosh\\) is even and \\(\\sinh\\) is odd.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>Order of transformations matters! Applying a vertical stretch before a vertical shift gives a different result than shift-then-stretch. Always read transformations from the equation: inner operations first (closest to \\(x\\)), outer operations last.</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Looking Ahead: Limits</div>
                    <div class="env-body"><p>We now have a rich library of functions: polynomials, rational functions, trigonometric functions, exponentials, logarithms, and ways to combine them through composition, inversion, and transformation. With this toolkit in hand, we can ask the central question that launches calculus: <strong>what happens to \\(f(x)\\) as \\(x\\) approaches a particular value?</strong> This is the concept of a <em>limit</em>. In the next chapter, we develop both the intuitive idea and the precise \\(\\varepsilon\\)-\\(\\delta\\) definition, then establish the limit laws and the squeeze theorem that make limits computable for all the function families we have just reviewed.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-transformations',
                    title: 'Transformation Playground',
                    description: 'Apply translations, scaling, and reflections to a base function. Watch the graph update in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 35});

                        var hShift = 0;
                        var vShift = 0;
                        var hScale = 1;
                        var vScale = 1;
                        var reflectX = false;
                        var reflectY = false;
                        var baseFunc = 0; // 0=sin, 1=x^2, 2=|x|

                        VizEngine.createSlider(controls, 'h (right shift)', -4, 4, hShift, 0.1, function(v) { hShift = v; draw(); });
                        VizEngine.createSlider(controls, 'k (up shift)', -4, 4, vShift, 0.1, function(v) { vShift = v; draw(); });
                        VizEngine.createSlider(controls, 'a (vert scale)', 0.2, 3, vScale, 0.1, function(v) { vScale = v; draw(); });
                        VizEngine.createSlider(controls, 'b (horiz compress)', 0.2, 3, hScale, 0.1, function(v) { hScale = v; draw(); });

                        VizEngine.createButton(controls, 'Reflect x-axis', function() { reflectX = !reflectX; draw(); });
                        VizEngine.createButton(controls, 'Reflect y-axis', function() { reflectY = !reflectY; draw(); });
                        VizEngine.createButton(controls, 'Base: sin', function() { baseFunc = 0; draw(); });
                        VizEngine.createButton(controls, 'Base: x^2', function() { baseFunc = 1; draw(); });
                        VizEngine.createButton(controls, 'Base: |x|', function() { baseFunc = 2; draw(); });

                        function getBase(x) {
                            if (baseFunc === 0) return Math.sin(x);
                            if (baseFunc === 1) return x * x;
                            return Math.abs(x);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Original function (dim)
                            viz.drawFunction(function(x) { return getBase(x); }, -8, 8, viz.colors.text + '44', 1.5);

                            // Transformed function
                            var rY = reflectY ? -1 : 1;
                            var rX = reflectX ? -1 : 1;
                            var transformed = function(x) {
                                var inner = hScale * (rY * x - hShift);
                                return rX * vScale * getBase(inner) + vShift;
                            };

                            viz.drawFunction(transformed, -8, 8, viz.colors.blue, 2.5);

                            var ctx = viz.ctx;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.text + 'aa';
                            ctx.fillText('Original (dim)', 10, 20);
                            ctx.fillStyle = viz.colors.blue;

                            var baseName = baseFunc === 0 ? 'sin' : (baseFunc === 1 ? 'x^2' : '|x|');
                            var label = 'y = ';
                            if (reflectX) label += '-';
                            label += vScale.toFixed(1) + ' * ' + baseName;
                            label += '(' + hScale.toFixed(1);
                            if (reflectY) label += '(-x)';
                            else label += 'x';
                            if (hShift !== 0) label += (hShift > 0 ? ' - ' : ' + ') + Math.abs(hShift).toFixed(1);
                            label += ')';
                            if (vShift !== 0) label += (vShift > 0 ? ' + ' : ' - ') + Math.abs(vShift).toFixed(1);
                            ctx.fillText(label, 10, 38);
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    id: 'ch00-sec05-ex01',
                    type: 'short-answer',
                    question: 'Starting from y = x^2, describe the sequence of transformations to obtain y = -(x + 3)^2 + 5.',
                    hint: 'Read from the equation: what happens inside the parentheses? What happens outside?',
                    solution: '(1) Shift left 3 units (replace x by x + 3). (2) Reflect over the x-axis (multiply by -1). (3) Shift up 5 units (add 5). The vertex moves from (0,0) to (-3, 5).'
                },
                {
                    id: 'ch00-sec05-ex02',
                    type: 'short-answer',
                    question: 'Is f(x) = x^3 - x even, odd, or neither? Verify algebraically.',
                    hint: 'Compute f(-x) and compare with f(x) and -f(x).',
                    solution: 'f(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x). Since f(-x) = -f(x), the function is odd.'
                },
                {
                    id: 'ch00-sec05-ex03',
                    type: 'short-answer',
                    question: 'The graph of y = f(x) passes through (2, 5). What point must be on the graph of y = 3f(x - 4) + 1?',
                    hint: 'We need x - 4 = 2 (to use the known point). Then apply the vertical transformation.',
                    solution: 'Set x - 4 = 2, so x = 6. Then y = 3 * f(2) + 1 = 3 * 5 + 1 = 16. The point (6, 16) is on the graph.'
                },
                {
                    id: 'ch00-sec05-ex04',
                    type: 'short-answer',
                    question: 'Decompose f(x) = e^x into its even and odd parts. What familiar functions do you get?',
                    hint: 'Use the formulas: even part = (f(x) + f(-x))/2, odd part = (f(x) - f(-x))/2.',
                    solution: 'Even part: (e^x + e^(-x))/2 = cosh(x) (hyperbolic cosine). Odd part: (e^x - e^(-x))/2 = sinh(x) (hyperbolic sine). So e^x = cosh(x) + sinh(x).'
                }
            ]
        }
    ]
});
