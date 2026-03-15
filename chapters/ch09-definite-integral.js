window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'The Definite Integral',
    subtitle: 'From Riemann sums to the definite integral: area under a curve made rigorous',
    sections: [
        // ============================================================
        // SECTION 1: Area Problem & Sigma Notation
        // ============================================================
        {
            id: 'ch09-sec01',
            title: 'Area Problem & Sigma Notation',
            content: `
<div class="env-block intuition">
<strong>The Big Picture.</strong> In Chapter 8 we learned to reverse differentiation: given \\(f'\\), find \\(f\\). Now we approach integration from a completely different angle, one that has nothing to do with derivatives at all. Instead, we ask a purely geometric question: <em>what is the area under a curve?</em> We will approximate this area with rectangles (Riemann sums), then make the approximation exact by taking a limit. Along the way we will develop the formal definition of the definite integral, establish its key properties, and learn practical numerical methods for computing it.
</div>

<h2>1 &mdash; Area Problem &amp; Sigma Notation</h2>

<p>In this section we set the stage for integration by revisiting the ancient area problem and equipping ourselves with sigma notation, the compact language of summation. By the end you will be able to write area approximations as concise sums and evaluate them using closed-form summation formulas.</p>

<h3>1.1 The Area Problem</h3>

<p>One of the oldest problems in mathematics is computing the <strong>area</strong> enclosed between a curve \\(y = f(x)\\) and the \\(x\\)-axis over an interval \\([a, b]\\). For rectangles and triangles, the formulas are elementary. But what about the area under a parabola, or beneath \\(\\sin x\\)?</p>

<p>Archimedes tackled this over two thousand years ago by inscribing polygons. The modern approach refines his idea: approximate the region with rectangles whose widths shrink to zero, then take a limit. Before formalizing this, we need a compact way to write sums of many terms.</p>

<h3>1.2 Sigma Notation</h3>

<p>The Greek capital letter \\(\\Sigma\\) (sigma) denotes summation. If \\(a_1, a_2, \\ldots, a_n\\) are real numbers, we write</p>
\\[\\sum_{i=1}^{n} a_i = a_1 + a_2 + \\cdots + a_n.\\]

<p>The variable \\(i\\) is the <strong>index of summation</strong>; it is a dummy variable and may be replaced by any other letter. The number below \\(\\Sigma\\) is the <strong>lower limit</strong>, and the number above is the <strong>upper limit</strong>.</p>

<div class="theorem">
<strong>Properties of Sigma Notation.</strong> Let \\(c\\) be a constant.
<ol>
<li>\\(\\displaystyle\\sum_{i=1}^{n} c\\, a_i = c \\sum_{i=1}^{n} a_i\\) &emsp; (constant factor)</li>
<li>\\(\\displaystyle\\sum_{i=1}^{n}(a_i + b_i) = \\sum_{i=1}^{n} a_i + \\sum_{i=1}^{n} b_i\\) &emsp; (additivity)</li>
<li>\\(\\displaystyle\\sum_{i=1}^{n} c = nc\\) &emsp; (constant sum)</li>
</ol>
</div>

<h3>1.3 Useful Summation Formulas</h3>

<p>Several closed-form sums appear repeatedly in area computations:</p>
\\[\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}, \\qquad \\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}, \\qquad \\sum_{i=1}^{n} i^3 = \\left[\\frac{n(n+1)}{2}\\right]^2.\\]

<h3>1.4 Area as a Limit of Sums</h3>

<p>Suppose \\(f(x) \\geq 0\\) on \\([a, b]\\). Divide \\([a, b]\\) into \\(n\\) equal subintervals, each of width \\(\\Delta x = (b - a)/n\\). The right endpoint of the \\(i\\)-th subinterval is \\(x_i = a + i\\,\\Delta x\\). The total area of the \\(n\\) rectangles is</p>
\\[S_n = \\sum_{i=1}^{n} f(x_i)\\,\\Delta x.\\]

<p>As \\(n \\to \\infty\\) the rectangles fill the region more tightly, and the exact area is</p>
\\[A = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i)\\,\\Delta x.\\]

<div class="example">
<strong>Example 1.1.</strong> Find the area under \\(f(x) = x^2\\) from \\(x = 0\\) to \\(x = 1\\).

<p><em>Solution.</em> Here \\(a = 0\\), \\(b = 1\\), \\(\\Delta x = 1/n\\), \\(x_i = i/n\\). So</p>
\\[S_n = \\sum_{i=1}^{n}\\left(\\frac{i}{n}\\right)^2 \\cdot \\frac{1}{n} = \\frac{1}{n^3}\\sum_{i=1}^{n} i^2 = \\frac{1}{n^3}\\cdot\\frac{n(n+1)(2n+1)}{6} = \\frac{(n+1)(2n+1)}{6n^2}.\\]
<p>Taking \\(n \\to \\infty\\):</p>
\\[A = \\lim_{n \\to \\infty} \\frac{(n+1)(2n+1)}{6n^2} = \\lim_{n \\to \\infty} \\frac{2n^2 + 3n + 1}{6n^2} = \\frac{2}{6} = \\frac{1}{3}.\\]
</div>
`,
            visualizations: [
                {
                    id: 'viz-area-rectangles',
                    title: 'Approximating Area with Rectangles',
                    description: 'Use the slider to increase the number of rectangles approximating the area under f(x) = x^2 on [0, 1]. Watch the sum converge to 1/3.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 200, originX: 80, originY: 340 });
                        var n = 4;
                        var f = function(x) { return x * x; };

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Shade true area
                            viz.shadeUnder(f, 0, 1, viz.colors.blue + '22');

                            // Draw Riemann rectangles (right endpoints)
                            viz.drawRiemannSums(f, 0, 1, n, 'right', viz.colors.orange);

                            // Draw the curve
                            viz.drawFunction(f, -0.2, 1.3, viz.colors.blue, 2);

                            // Compute sum
                            var dx = 1 / n;
                            var sum = 0;
                            for (var i = 1; i <= n; i++) {
                                sum += f(i * dx) * dx;
                            }

                            viz.screenText('n = ' + n, viz.width - 20, 30, viz.colors.white, 16, 'right');
                            viz.screenText('S_n = ' + sum.toFixed(6), viz.width - 20, 55, viz.colors.orange, 14, 'right');
                            viz.screenText('Exact = 1/3 = 0.333...', viz.width - 20, 78, viz.colors.teal, 13, 'right');
                            viz.screenText('Error = ' + Math.abs(sum - 1/3).toFixed(6), viz.width - 20, 100, viz.colors.yellow, 13, 'right');
                        }

                        draw();
                        VizEngine.createSlider(container, 'n (rectangles)', 1, 100, 4, 1, function(val) {
                            n = Math.round(val);
                            draw();
                        });

                        return viz;
                    }
                },
                {
                    id: 'viz-sigma-notation',
                    title: 'Summation Formulas Visualized',
                    description: 'Drag the slider to see the partial sums of i, i^2, and i^3 compared to their closed forms.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 12, originX: 60, originY: 360 });
                        var nVal = 5;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(5);
                            viz.drawAxes();

                            // Draw bars for sum of i
                            var sumI = nVal * (nVal + 1) / 2;
                            var sumI2 = nVal * (nVal + 1) * (2 * nVal + 1) / 6;

                            for (var i = 1; i <= nVal; i++) {
                                var barW = 0.8;
                                // sum of i: bar height = i
                                var sx1 = viz.toScreen(i - barW/2, i);
                                var sx2 = viz.toScreen(i + barW/2, 0);
                                viz.ctx.fillStyle = viz.colors.blue + '88';
                                viz.ctx.fillRect(sx1[0], sx1[1], sx2[0] - sx1[0], sx2[1] - sx1[1]);
                                viz.ctx.strokeStyle = viz.colors.blue;
                                viz.ctx.lineWidth = 1;
                                viz.ctx.strokeRect(sx1[0], sx1[1], sx2[0] - sx1[0], sx2[1] - sx1[1]);
                            }

                            viz.screenText('n = ' + nVal, viz.width - 20, 25, viz.colors.white, 16, 'right');
                            viz.screenText('Sum of i = ' + sumI + '  [n(n+1)/2 = ' + sumI + ']', viz.width - 20, 50, viz.colors.blue, 13, 'right');
                            viz.screenText('Sum of i^2 = ' + sumI2 + '  [n(n+1)(2n+1)/6 = ' + sumI2 + ']', viz.width - 20, 72, viz.colors.orange, 13, 'right');
                        }

                        draw();
                        VizEngine.createSlider(container, 'n', 1, 20, 5, 1, function(val) {
                            nVal = Math.round(val);
                            draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch09-ex01',
                    type: 'multiple-choice',
                    question: 'Evaluate the sum: sum from i=1 to 4 of (2i - 1).',
                    options: ['12', '14', '16', '20'],
                    correct: 2,
                    explanation: 'The terms are 1, 3, 5, 7. Their sum is 1 + 3 + 5 + 7 = 16.'
                },
                {
                    id: 'ch09-ex02',
                    type: 'numeric',
                    question: 'Using the formula for the sum of squares, compute the sum from i=1 to 10 of i^2.',
                    answer: 385,
                    tolerance: 0,
                    explanation: 'By the formula: 10(11)(21)/6 = 2310/6 = 385.'
                },
                {
                    id: 'ch09-ex03',
                    type: 'multiple-choice',
                    question: 'Which expression equals the area under f(x) = 3x on [0, 2] using n right-endpoint rectangles?',
                    options: [
                        'sum from i=1 to n of 3(2i/n)(2/n)',
                        'sum from i=1 to n of 3(i/n)(1/n)',
                        'sum from i=1 to n of 3i/n',
                        'sum from i=1 to n of 6i'
                    ],
                    correct: 0,
                    explanation: 'With a=0, b=2, dx = 2/n, x_i = 2i/n. So f(x_i) dx = 3(2i/n)(2/n) = 12i/n^2.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Riemann Sums
        // ============================================================
        {
            id: 'ch09-sec02',
            title: 'Riemann Sums',
            content: `
<h2>2 &mdash; Riemann Sums</h2>

<p>In Section 1 we approximated area using equal-width rectangles with right endpoints. Now we generalize: the partition need not be uniform, and the sample point in each subinterval can be chosen freely. This flexibility leads to the concept of a <strong>Riemann sum</strong>, the central building block of integration theory. We also introduce upper and lower sums, which provide guaranteed bounds on the true area from above and below.</p>

<h3>2.1 Partitions</h3>

<p>A <strong>partition</strong> \\(P\\) of an interval \\([a, b]\\) is a finite set of points</p>
\\[P = \\{x_0, x_1, x_2, \\ldots, x_n\\}, \\qquad a = x_0 < x_1 < x_2 < \\cdots < x_n = b.\\]

<p>The partition divides \\([a, b]\\) into \\(n\\) subintervals \\([x_{i-1}, x_i]\\) of widths \\(\\Delta x_i = x_i - x_{i-1}\\). The <strong>norm</strong> (or <strong>mesh</strong>) of the partition is</p>
\\[\\|P\\| = \\max_{1 \\leq i \\leq n} \\Delta x_i.\\]

<p>A <strong>regular partition</strong> has all subintervals of equal width: \\(\\Delta x_i = (b - a)/n\\) for all \\(i\\).</p>

<h3>2.2 Riemann Sums</h3>

<p>Given a partition \\(P\\) and a bounded function \\(f\\) on \\([a, b]\\), a <strong>Riemann sum</strong> is</p>
\\[R(f, P) = \\sum_{i=1}^{n} f(c_i)\\,\\Delta x_i,\\]
<p>where \\(c_i \\in [x_{i-1}, x_i]\\) is a <strong>sample point</strong> chosen from each subinterval. Common choices:</p>

<ul>
<li><strong>Left-endpoint sum (\\(L_n\\)):</strong> \\(c_i = x_{i-1}\\)</li>
<li><strong>Right-endpoint sum (\\(R_n\\)):</strong> \\(c_i = x_i\\)</li>
<li><strong>Midpoint sum (\\(M_n\\)):</strong> \\(c_i = (x_{i-1} + x_i)/2\\)</li>
</ul>

<h3>2.3 Upper and Lower Sums</h3>

<p>For a bounded function \\(f\\) on \\([a, b]\\), define on each subinterval:</p>
\\[M_i = \\sup_{x \\in [x_{i-1}, x_i]} f(x), \\qquad m_i = \\inf_{x \\in [x_{i-1}, x_i]} f(x).\\]

<div class="definition">
<strong>Definition 2.1.</strong> The <strong>upper sum</strong> and <strong>lower sum</strong> of \\(f\\) with respect to \\(P\\) are
\\[U(f, P) = \\sum_{i=1}^{n} M_i\\,\\Delta x_i, \\qquad L(f, P) = \\sum_{i=1}^{n} m_i\\,\\Delta x_i.\\]
</div>

<p>For any Riemann sum \\(R(f, P)\\) with the same partition, we have</p>
\\[L(f, P) \\leq R(f, P) \\leq U(f, P).\\]

<p>The upper sum overestimates the area, the lower sum underestimates it, and any Riemann sum lies in between.</p>

<h3>2.4 Accuracy and Convergence</h3>

<p>As the partition becomes finer (\\(\\|P\\| \\to 0\\)), the upper and lower sums squeeze together. If they converge to the same limit, the function is Riemann integrable.</p>

<div class="theorem">
<strong>Theorem 2.2.</strong> If \\(f\\) is continuous on \\([a, b]\\), then for every \\(\\varepsilon > 0\\) there exists \\(\\delta > 0\\) such that whenever \\(\\|P\\| < \\delta\\),
\\[U(f, P) - L(f, P) < \\varepsilon.\\]
</div>

<p>This is a consequence of the <strong>uniform continuity</strong> of \\(f\\) on the closed interval \\([a, b]\\).</p>
`,
            visualizations: [
                {
                    id: 'viz-riemann-sums',
                    title: 'Left, Right, and Midpoint Riemann Sums',
                    description: 'Choose the sum type and adjust n to see how different Riemann sums approximate the area under f(x) = sin(x) + 1 on [0, pi]. The shaded region shows the exact area.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 80, originX: 60, originY: 280 });
                        var n = 6;
                        var sumType = 'left';
                        var a = 0, b = Math.PI;
                        var f = function(x) { return Math.sin(x) + 1; };
                        var exactArea = Math.PI + 2; // integral of sin(x)+1 from 0 to pi

                        function computeSum(type, n) {
                            var dx = (b - a) / n;
                            var s = 0;
                            for (var i = 0; i < n; i++) {
                                var xL = a + i * dx;
                                var xR = xL + dx;
                                var c;
                                if (type === 'left') c = xL;
                                else if (type === 'right') c = xR;
                                else c = (xL + xR) / 2;
                                s += f(c) * dx;
                            }
                            return s;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Shade exact area
                            viz.shadeUnder(f, a, b, viz.colors.teal + '22');

                            // Draw Riemann sums
                            viz.drawRiemannSums(f, a, b, n, sumType, viz.colors.orange);

                            // Draw curve
                            viz.drawFunction(f, -0.3, b + 0.5, viz.colors.blue, 2.5);

                            // Labels
                            var sum = computeSum(sumType, n);
                            viz.screenText('Type: ' + sumType, 20, 25, viz.colors.white, 15, 'left');
                            viz.screenText('n = ' + n, 20, 48, viz.colors.white, 14, 'left');
                            viz.screenText('Sum = ' + sum.toFixed(6), viz.width - 20, 25, viz.colors.orange, 14, 'right');
                            viz.screenText('Exact = ' + exactArea.toFixed(6), viz.width - 20, 48, viz.colors.teal, 14, 'right');
                            viz.screenText('Error = ' + Math.abs(sum - exactArea).toFixed(6), viz.width - 20, 70, viz.colors.yellow, 13, 'right');
                        }

                        draw();

                        VizEngine.createSlider(container, 'n (subintervals)', 1, 50, 6, 1, function(val) {
                            n = Math.round(val);
                            draw();
                        });

                        var btnContainer = document.createElement('div');
                        btnContainer.style.cssText = 'display:flex;gap:8px;margin-top:6px;flex-wrap:wrap;';
                        container.appendChild(btnContainer);

                        ['left', 'right', 'mid'].forEach(function(type) {
                            VizEngine.createButton(btnContainer, type.charAt(0).toUpperCase() + type.slice(1), function() {
                                sumType = type;
                                draw();
                            });
                        });

                        return viz;
                    }
                },
                {
                    id: 'viz-upper-lower',
                    title: 'Upper and Lower Sums',
                    description: 'See how upper sums (overestimate) and lower sums (underestimate) squeeze the true area as n grows. The gap between them shrinks to zero.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 80, originX: 60, originY: 280 });
                        var n = 4;
                        var a = 0, b = Math.PI;
                        var f = function(x) { return Math.sin(x) + 1; };
                        var exactArea = Math.PI + 2;

                        function computeUpperLower(n) {
                            var dx = (b - a) / n;
                            var upper = 0, lower = 0;
                            for (var i = 0; i < n; i++) {
                                var xL = a + i * dx;
                                var xR = xL + dx;
                                // Sample many points to approximate sup and inf
                                var maxVal = -Infinity, minVal = Infinity;
                                for (var j = 0; j <= 20; j++) {
                                    var val = f(xL + (xR - xL) * j / 20);
                                    if (val > maxVal) maxVal = val;
                                    if (val < minVal) minVal = val;
                                }
                                upper += maxVal * dx;
                                lower += minVal * dx;
                            }
                            return { upper: upper, lower: lower };
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw upper sums
                            viz.drawRiemannSums(f, a, b, n, 'upper', viz.colors.red);
                            // Draw lower sums
                            viz.drawRiemannSums(f, a, b, n, 'lower', viz.colors.green);

                            // Draw curve on top
                            viz.drawFunction(f, -0.3, b + 0.5, viz.colors.blue, 2.5);

                            var sums = computeUpperLower(n);
                            viz.screenText('n = ' + n, 20, 25, viz.colors.white, 15, 'left');
                            viz.screenText('Upper = ' + sums.upper.toFixed(5), viz.width - 20, 25, viz.colors.red, 14, 'right');
                            viz.screenText('Lower = ' + sums.lower.toFixed(5), viz.width - 20, 48, viz.colors.green, 14, 'right');
                            viz.screenText('Gap = ' + (sums.upper - sums.lower).toFixed(5), viz.width - 20, 70, viz.colors.yellow, 13, 'right');
                            viz.screenText('Exact = ' + exactArea.toFixed(5), viz.width - 20, 92, viz.colors.teal, 13, 'right');
                        }

                        draw();
                        VizEngine.createSlider(container, 'n', 1, 50, 4, 1, function(val) {
                            n = Math.round(val);
                            draw();
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch09-ex04',
                    type: 'multiple-choice',
                    question: 'For f(x) = x on [0, 2] with n = 4 equal subintervals, what is the left Riemann sum L_4?',
                    options: ['1.0', '1.5', '2.0', '2.5'],
                    correct: 1,
                    explanation: 'dx = 0.5. Left endpoints: 0, 0.5, 1, 1.5. L_4 = (0 + 0.5 + 1 + 1.5)(0.5) = 3(0.5) = 1.5.'
                },
                {
                    id: 'ch09-ex05',
                    type: 'multiple-choice',
                    question: 'For a decreasing function f on [a, b], which inequality holds?',
                    options: [
                        'L_n <= R_n for all n',
                        'R_n <= L_n for all n',
                        'L_n = R_n for all n',
                        'The relationship depends on the specific function'
                    ],
                    correct: 1,
                    explanation: 'When f is decreasing, f(x_i) <= f(x_{i-1}) for each subinterval, so right endpoints give smaller values. Thus R_n <= L_n.'
                },
                {
                    id: 'ch09-ex06',
                    type: 'numeric',
                    question: 'Compute the right Riemann sum R_5 for f(x) = x^2 on [0, 1] with 5 equal subintervals. Give your answer to 2 decimal places.',
                    answer: 0.44,
                    tolerance: 0.01,
                    explanation: 'dx = 0.2. Right endpoints: 0.2, 0.4, 0.6, 0.8, 1.0. R_5 = (0.04 + 0.16 + 0.36 + 0.64 + 1.00)(0.2) = 2.20(0.2) = 0.44.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: The Definite Integral
        // ============================================================
        {
            id: 'ch09-sec03',
            title: 'The Definite Integral',
            content: `
<h2>3 &mdash; The Definite Integral</h2>

<p>We have seen that Riemann sums approximate area, and that finer partitions yield better approximations. It is time to take the limit and make the approximation exact. In this section we give the formal definition of the <strong>definite integral</strong>, state the key existence theorems that tell us which functions are integrable, and interpret the integral geometrically as signed area. This definition transforms an intuitive idea into a precise mathematical object.</p>

<h3>3.1 Definition</h3>

<div class="definition">
<strong>Definition 3.1 (Definite Integral).</strong> Let \\(f\\) be a bounded function on \\([a, b]\\). If there exists a number \\(I\\) such that for every \\(\\varepsilon > 0\\) there exists \\(\\delta > 0\\) satisfying: for every partition \\(P\\) with \\(\\|P\\| < \\delta\\) and every choice of sample points \\(c_i \\in [x_{i-1}, x_i]\\),
\\[\\left|\\sum_{i=1}^{n} f(c_i)\\,\\Delta x_i - I\\right| < \\varepsilon,\\]
then \\(f\\) is <strong>Riemann integrable</strong> on \\([a, b]\\) and we write
\\[I = \\int_a^b f(x)\\,dx.\\]
</div>

<p>The symbol \\(\\int\\) is an elongated "S" (for "sum"), introduced by Leibniz. We call \\(a\\) and \\(b\\) the <strong>limits of integration</strong>, \\(f(x)\\) the <strong>integrand</strong>, and \\(dx\\) indicates the <strong>variable of integration</strong>.</p>

<h3>3.2 Existence of the Integral</h3>

<div class="theorem">
<strong>Theorem 3.2 (Integrability of Continuous Functions).</strong> If \\(f\\) is continuous on \\([a, b]\\), then \\(f\\) is Riemann integrable on \\([a, b]\\).
</div>

<p>More generally:</p>

<div class="theorem">
<strong>Theorem 3.3.</strong> If \\(f\\) is bounded on \\([a, b]\\) and has only finitely many discontinuities, then \\(f\\) is Riemann integrable on \\([a, b]\\).
</div>

<p>In particular, every <strong>monotone</strong> function on a closed interval is integrable, and every <strong>piecewise continuous</strong> function is integrable.</p>

<h3>3.3 Notation and Conventions</h3>

<p>Several important conventions:</p>
<ul>
<li>The variable \\(x\\) in \\(\\int_a^b f(x)\\,dx\\) is a <strong>dummy variable</strong>:
\\[\\int_a^b f(x)\\,dx = \\int_a^b f(t)\\,dt = \\int_a^b f(u)\\,du.\\]</li>
<li><strong>Reversed limits:</strong> \\(\\displaystyle\\int_b^a f(x)\\,dx = -\\int_a^b f(x)\\,dx.\\)</li>
<li><strong>Zero-width interval:</strong> \\(\\displaystyle\\int_a^a f(x)\\,dx = 0.\\)</li>
</ul>

<h3>3.4 Geometric Interpretation</h3>

<p>When \\(f(x) \\geq 0\\) on \\([a, b]\\), the integral \\(\\int_a^b f(x)\\,dx\\) equals the area of the region bounded by \\(y = f(x)\\), the \\(x\\)-axis, \\(x = a\\), and \\(x = b\\).</p>

<p>When \\(f\\) changes sign, the integral computes the <strong>signed area</strong>: regions above the \\(x\\)-axis contribute positively, regions below contribute negatively.</p>
\\[\\int_a^b f(x)\\,dx = (\\text{area above } x\\text{-axis}) - (\\text{area below } x\\text{-axis}).\\]
`,
            visualizations: [
                {
                    id: 'viz-definite-integral',
                    title: 'The Definite Integral as a Limit of Riemann Sums',
                    description: 'Watch the Riemann sum converge to the definite integral as n increases. The function is f(x) = x^2 on [0, 2], with exact integral = 8/3.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 60, originX: 80, originY: 340 });
                        var n = 1;
                        var maxN = 80;
                        var a = 0, b = 2;
                        var f = function(x) { return x * x; };
                        var exactArea = 8 / 3;
                        var animating = false;

                        function computeSum(n) {
                            var dx = (b - a) / n;
                            var s = 0;
                            for (var i = 0; i < n; i++) {
                                s += f(a + (i + 0.5) * dx) * dx; // midpoint
                            }
                            return s;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            viz.shadeUnder(f, a, b, viz.colors.teal + '22');
                            viz.drawRiemannSums(f, a, b, n, 'mid', viz.colors.purple);
                            viz.drawFunction(f, -0.3, 2.5, viz.colors.blue, 2.5);

                            var sum = computeSum(n);
                            viz.screenText('n = ' + n, 20, 25, viz.colors.white, 16, 'left');
                            viz.screenText('Midpoint sum = ' + sum.toFixed(6), viz.width - 20, 25, viz.colors.purple, 14, 'right');
                            viz.screenText('Exact integral = ' + exactArea.toFixed(6), viz.width - 20, 48, viz.colors.teal, 14, 'right');
                            viz.screenText('|Error| = ' + Math.abs(sum - exactArea).toFixed(6), viz.width - 20, 70, viz.colors.yellow, 13, 'right');

                            // Draw integral symbol
                            viz.screenText('\u222B\u2080\u00B2 x\u00B2 dx = 8/3', 20, 50, viz.colors.blue, 14, 'left');
                        }

                        draw();

                        VizEngine.createSlider(container, 'n', 1, maxN, 1, 1, function(val) {
                            n = Math.round(val);
                            if (!animating) draw();
                        });

                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'display:flex;gap:8px;margin-top:6px;';
                        container.appendChild(btnRow);

                        VizEngine.createButton(btnRow, 'Animate n: 1 to 80', function() {
                            if (animating) return;
                            animating = true;
                            n = 1;
                            var timer = setInterval(function() {
                                n++;
                                draw();
                                if (n >= maxN) {
                                    clearInterval(timer);
                                    animating = false;
                                }
                            }, 60);
                        });

                        return viz;
                    }
                },
                {
                    id: 'viz-signed-area',
                    title: 'Signed Area',
                    description: 'The definite integral of sin(x) from 0 to 2pi is zero: positive area above the x-axis exactly cancels negative area below.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 45, originX: 60, originY: 200 });
                        var f = function(x) { return Math.sin(x); };

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Positive part (0 to pi)
                            viz.shadeUnder(f, 0, Math.PI, viz.colors.green + '44');
                            // Negative part (pi to 2pi)
                            viz.shadeUnder(f, Math.PI, 2 * Math.PI, viz.colors.red + '44');

                            viz.drawFunction(f, -0.5, 2 * Math.PI + 0.5, viz.colors.blue, 2.5);

                            // Labels
                            viz.drawText('+2', Math.PI / 2, 0.5, viz.colors.green, 16);
                            viz.drawText('-2', 3 * Math.PI / 2, -0.5, viz.colors.red, 16);

                            viz.screenText('Positive area = +2', viz.width - 20, 25, viz.colors.green, 14, 'right');
                            viz.screenText('Negative area = -2', viz.width - 20, 48, viz.colors.red, 14, 'right');
                            viz.screenText('Net signed area = 0', viz.width - 20, 72, viz.colors.yellow, 14, 'right');
                            viz.screenText('pi', viz.toScreen(Math.PI, 0)[0], viz.originY + 18, viz.colors.text, 12);
                            viz.screenText('2pi', viz.toScreen(2 * Math.PI, 0)[0], viz.originY + 18, viz.colors.text, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch09-ex07',
                    type: 'multiple-choice',
                    question: 'If the integral from 0 to 5 of f(x) dx = 7, what is the integral from 5 to 0 of f(x) dx?',
                    options: ['7', '-7', '0', 'Cannot be determined'],
                    correct: 1,
                    explanation: 'Reversing the limits of integration changes the sign: the integral from b to a equals minus the integral from a to b. So the answer is -7.'
                },
                {
                    id: 'ch09-ex08',
                    type: 'multiple-choice',
                    question: 'Which function is NOT Riemann integrable on [0, 1]?',
                    options: [
                        'f(x) = x^2',
                        'f(x) = |x|',
                        'f(x) = 1 if x is rational, 0 if x is irrational (Dirichlet function)',
                        'f(x) = floor(x)'
                    ],
                    correct: 2,
                    explanation: 'The Dirichlet function is discontinuous at every point in [0, 1] (uncountably many discontinuities), so it is not Riemann integrable. The other functions are continuous or have finitely many discontinuities.'
                },
                {
                    id: 'ch09-ex09',
                    type: 'multiple-choice',
                    question: 'The integral from 0 to 2pi of sin(x) dx equals:',
                    options: ['2pi', '2', '0', '-2'],
                    correct: 2,
                    explanation: 'The positive area from 0 to pi equals 2, and the negative area from pi to 2pi equals -2. The net signed area is 2 + (-2) = 0.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Properties of Definite Integrals
        // ============================================================
        {
            id: 'ch09-sec04',
            title: 'Properties of Definite Integrals',
            content: `
<h2>4 &mdash; Properties of Definite Integrals</h2>

<p>Now that we have a rigorous definition, we develop the algebraic and analytic properties that make the definite integral a powerful tool. Linearity lets us break complicated integrands apart; additivity over intervals lets us split or combine regions; and comparison properties let us estimate integrals even when we cannot compute them exactly. These properties mirror the summation rules from Section 1, which is no coincidence: the integral inherits them from the underlying Riemann sums.</p>

<h3>4.1 Linearity</h3>

<div class="theorem">
<strong>Theorem 4.1 (Linearity of the Integral).</strong> If \\(f\\) and \\(g\\) are integrable on \\([a, b]\\) and \\(c\\) is a constant, then:
<ol>
<li>\\(\\displaystyle\\int_a^b c\\,f(x)\\,dx = c\\int_a^b f(x)\\,dx\\) &emsp; (homogeneity)</li>
<li>\\(\\displaystyle\\int_a^b [f(x) + g(x)]\\,dx = \\int_a^b f(x)\\,dx + \\int_a^b g(x)\\,dx\\) &emsp; (additivity in integrand)</li>
</ol>
</div>

<p>Combined, these say the integral is a <strong>linear operator</strong>: for constants \\(\\alpha, \\beta\\),</p>
\\[\\int_a^b [\\alpha f(x) + \\beta g(x)]\\,dx = \\alpha \\int_a^b f(x)\\,dx + \\beta \\int_a^b g(x)\\,dx.\\]

<h3>4.2 Additivity over Intervals</h3>

<div class="theorem">
<strong>Theorem 4.2 (Additivity over Intervals).</strong> If \\(f\\) is integrable on an interval containing \\(a\\), \\(b\\), and \\(c\\), then
\\[\\int_a^c f(x)\\,dx = \\int_a^b f(x)\\,dx + \\int_b^c f(x)\\,dx,\\]
regardless of the ordering of \\(a\\), \\(b\\), \\(c\\).
</div>

<p>This property lets us "split" an integral at any intermediate point, which is invaluable for piecewise-defined functions.</p>

<h3>4.3 Comparison Properties</h3>

<div class="theorem">
<strong>Theorem 4.3 (Comparison Properties).</strong> Suppose \\(f\\) and \\(g\\) are integrable on \\([a, b]\\) with \\(a < b\\).
<ol>
<li><strong>Non-negativity:</strong> If \\(f(x) \\geq 0\\) for all \\(x \\in [a, b]\\), then \\(\\displaystyle\\int_a^b f(x)\\,dx \\geq 0.\\)</li>
<li><strong>Monotonicity:</strong> If \\(f(x) \\leq g(x)\\) for all \\(x \\in [a, b]\\), then \\(\\displaystyle\\int_a^b f(x)\\,dx \\leq \\int_a^b g(x)\\,dx.\\)</li>
<li><strong>Bounding:</strong> If \\(m \\leq f(x) \\leq M\\) for all \\(x \\in [a, b]\\), then \\(m(b-a) \\leq \\displaystyle\\int_a^b f(x)\\,dx \\leq M(b-a).\\)</li>
</ol>
</div>

<h3>4.4 Integral of Absolute Value</h3>

<div class="theorem">
<strong>Theorem 4.4 (Triangle Inequality for Integrals).</strong>
\\[\\left|\\int_a^b f(x)\\,dx\\right| \\leq \\int_a^b |f(x)|\\,dx.\\]
</div>

<p>This is the continuous analogue of the triangle inequality \\(|a_1 + a_2 + \\cdots| \\leq |a_1| + |a_2| + \\cdots\\).</p>

<h3>4.5 Mean Value Theorem for Integrals</h3>

<div class="theorem">
<strong>Theorem 4.5 (Mean Value Theorem for Integrals).</strong> If \\(f\\) is continuous on \\([a, b]\\), then there exists \\(c \\in [a, b]\\) such that
\\[\\int_a^b f(x)\\,dx = f(c)(b - a).\\]
</div>

<p>Equivalently, the <strong>average value</strong> of \\(f\\) on \\([a, b]\\) is</p>
\\[f_{\\text{avg}} = \\frac{1}{b-a}\\int_a^b f(x)\\,dx,\\]
<p>and the MVT guarantees that \\(f\\) actually attains this average value at some point.</p>
`,
            visualizations: [
                {
                    id: 'viz-additivity',
                    title: 'Additivity over Intervals',
                    description: 'Drag the point c to split the integral from a to b into two parts. The sum of the two colored areas equals the total integral.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 60, originX: 60, originY: 280 });
                        var f = function(x) { return 0.5 * x * x - x + 2; };
                        var a = 0, b = 4;
                        var cPt = viz.addDraggable('c', 2, 0, viz.colors.yellow, 8);

                        function numericalIntegral(f, lo, hi, steps) {
                            var dx = (hi - lo) / steps;
                            var s = 0;
                            for (var i = 0; i < steps; i++) {
                                s += f(lo + (i + 0.5) * dx) * dx;
                            }
                            return s;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var c = Math.max(a, Math.min(b, cPt.x));
                            cPt.x = c;
                            cPt.y = 0;

                            // Shade left part
                            viz.shadeUnder(f, a, c, viz.colors.green + '44');
                            // Shade right part
                            viz.shadeUnder(f, c, b, viz.colors.purple + '44');

                            // Vertical line at c
                            viz.drawSegment(c, 0, c, f(c), viz.colors.yellow, 2, true);

                            // Curve
                            viz.drawFunction(f, -0.5, b + 0.5, viz.colors.blue, 2.5);

                            var intAC = numericalIntegral(f, a, c, 200);
                            var intCB = numericalIntegral(f, c, b, 200);
                            var intAB = numericalIntegral(f, a, b, 200);

                            viz.screenText('c = ' + c.toFixed(2), 20, 25, viz.colors.yellow, 14, 'left');
                            viz.screenText('\u222B_a^c = ' + intAC.toFixed(3), viz.width - 20, 25, viz.colors.green, 14, 'right');
                            viz.screenText('\u222B_c^b = ' + intCB.toFixed(3), viz.width - 20, 48, viz.colors.purple, 14, 'right');
                            viz.screenText('Sum = ' + (intAC + intCB).toFixed(3), viz.width - 20, 72, viz.colors.white, 14, 'right');
                            viz.screenText('\u222B_a^b = ' + intAB.toFixed(3), viz.width - 20, 95, viz.colors.teal, 14, 'right');

                            viz.drawDraggables();
                        }

                        draw();
                        viz.animate(function() { draw(); });

                        return viz;
                    }
                },
                {
                    id: 'viz-mvt-integral',
                    title: 'Mean Value Theorem for Integrals',
                    description: 'The rectangle with height f(c) and width (b-a) has the same area as the region under the curve. The point c is shown where f(c) equals the average value.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 60, originX: 60, originY: 280 });
                        var f = function(x) { return -0.2 * x * x + 1.5 * x + 0.5; };
                        var a = 0, b = 5;

                        function numericalIntegral(f, lo, hi, steps) {
                            var dx = (hi - lo) / steps;
                            var s = 0;
                            for (var i = 0; i < steps; i++) {
                                s += f(lo + (i + 0.5) * dx) * dx;
                            }
                            return s;
                        }

                        var totalArea = numericalIntegral(f, a, b, 1000);
                        var avgVal = totalArea / (b - a);

                        // Find c where f(c) = avgVal by bisection
                        function findC() {
                            for (var x = a; x <= b; x += 0.001) {
                                if (Math.abs(f(x) - avgVal) < 0.005) return x;
                            }
                            return (a + b) / 2;
                        }
                        var cVal = findC();

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Shade area under curve
                            viz.shadeUnder(f, a, b, viz.colors.blue + '33');

                            // Draw mean value rectangle
                            viz.ctx.strokeStyle = viz.colors.orange;
                            viz.ctx.lineWidth = 2;
                            viz.ctx.setLineDash([6, 4]);
                            var p1 = viz.toScreen(a, 0);
                            var p2 = viz.toScreen(b, avgVal);
                            viz.ctx.strokeRect(p1[0], p2[1], p2[0] - p1[0], p1[1] - p2[1]);
                            viz.ctx.setLineDash([]);

                            // Horizontal line at average
                            viz.drawSegment(a, avgVal, b, avgVal, viz.colors.orange, 1.5, true);

                            // Draw curve
                            viz.drawFunction(f, -0.5, b + 0.5, viz.colors.blue, 2.5);

                            // Point c
                            viz.drawPoint(cVal, avgVal, viz.colors.yellow, 'c', 6);
                            viz.drawSegment(cVal, 0, cVal, avgVal, viz.colors.yellow, 1, true);

                            viz.screenText('f_avg = ' + avgVal.toFixed(3), viz.width - 20, 25, viz.colors.orange, 14, 'right');
                            viz.screenText('c = ' + cVal.toFixed(3), viz.width - 20, 48, viz.colors.yellow, 14, 'right');
                            viz.screenText('Area = f(c)(b-a) = ' + totalArea.toFixed(3), viz.width - 20, 72, viz.colors.teal, 14, 'right');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch09-ex10',
                    type: 'multiple-choice',
                    question: 'If the integral from 0 to 3 of f(x) dx = 5 and the integral from 0 to 3 of g(x) dx = 2, what is the integral from 0 to 3 of [3f(x) - 2g(x)] dx?',
                    options: ['11', '13', '15', '1'],
                    correct: 0,
                    explanation: 'By linearity: 3(5) - 2(2) = 15 - 4 = 11.'
                },
                {
                    id: 'ch09-ex11',
                    type: 'multiple-choice',
                    question: 'If the integral from 0 to 5 of f(x) dx = 10 and the integral from 0 to 3 of f(x) dx = 4, what is the integral from 3 to 5 of f(x) dx?',
                    options: ['14', '6', '-6', '4'],
                    correct: 1,
                    explanation: 'By additivity: the integral from 0 to 5 equals the integral from 0 to 3 plus the integral from 3 to 5. So 10 = 4 + (integral from 3 to 5), giving 6.'
                },
                {
                    id: 'ch09-ex12',
                    type: 'numeric',
                    question: 'If f is continuous on [1, 4] with 2 <= f(x) <= 7 for all x in [1, 4], give an upper bound for the integral from 1 to 4 of f(x) dx.',
                    answer: 21,
                    tolerance: 0,
                    explanation: 'By the bounding property, the integral is at most M(b-a) = 7(4-1) = 21.'
                },
                {
                    id: 'ch09-ex13',
                    type: 'numeric',
                    question: 'Find the average value of f(x) = x^2 on [0, 3]. (Hint: the integral from 0 to 3 of x^2 dx = 9.)',
                    answer: 3,
                    tolerance: 0.01,
                    explanation: 'f_avg = (1/(3-0)) * 9 = 9/3 = 3.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Numerical Integration
        // ============================================================
        {
            id: 'ch09-sec05',
            title: 'Numerical Integration',
            content: `
<h2>5 &mdash; Numerical Integration</h2>

<p>So far we have defined the definite integral as a limit and established its properties, but we have not yet developed a general method for <em>computing</em> integrals in closed form (that comes in Chapter 10 with the Fundamental Theorem of Calculus). In the meantime, and even afterward for integrands with no elementary antiderivative, we need reliable numerical approximation methods. This section presents two workhorses of numerical integration: the trapezoid rule and Simpson's rule.</p>

<h3>5.1 Why Numerical Methods?</h3>

<p>Many integrals cannot be evaluated in closed form. Functions like \\(e^{-x^2}\\), \\(\\sin(x^2)\\), or \\(\\sqrt{1 + x^3}\\) do not have elementary antiderivatives. Even when an antiderivative exists, it may be impractical to compute. <strong>Numerical integration</strong> (or <strong>numerical quadrature</strong>) provides systematic ways to approximate definite integrals to any desired accuracy.</p>

<h3>5.2 The Trapezoid Rule</h3>

<p>Instead of rectangles, we approximate the curve on each subinterval by a straight line (a trapezoid).</p>

<div class="definition">
<strong>Definition 5.1 (Trapezoid Rule).</strong> With a regular partition of \\([a, b]\\) into \\(n\\) subintervals of width \\(h = (b-a)/n\\),
\\[T_n = \\frac{h}{2}\\Big[f(x_0) + 2f(x_1) + 2f(x_2) + \\cdots + 2f(x_{n-1}) + f(x_n)\\Big].\\]
</div>

<p>Each trapezoid has area \\(\\frac{1}{2}[f(x_{i-1}) + f(x_i)]\\,h\\), and \\(T_n\\) is the sum of these \\(n\\) trapezoids. Geometrically, the rule connects successive points on the curve with line segments.</p>

<div class="theorem">
<strong>Theorem 5.2 (Trapezoid Error Bound).</strong> If \\(f''\\) is continuous on \\([a, b]\\) with \\(|f''(x)| \\leq K\\), then
\\[|E_T| = \\left|\\int_a^b f(x)\\,dx - T_n\\right| \\leq \\frac{K(b-a)^3}{12n^2}.\\]
</div>

<p>The error decreases like \\(1/n^2\\): doubling \\(n\\) divides the error by about 4.</p>

<h3>5.3 Simpson's Rule</h3>

<p>Simpson's rule uses <strong>parabolas</strong> instead of lines, fitting a quadratic through every three consecutive points.</p>

<div class="definition">
<strong>Definition 5.3 (Simpson's Rule).</strong> With \\(n\\) subintervals (\\(n\\) must be <strong>even</strong>) and \\(h = (b-a)/n\\),
\\[S_n = \\frac{h}{3}\\Big[f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + 2f(x_4) + \\cdots + 4f(x_{n-1}) + f(x_n)\\Big].\\]
</div>

<p>The coefficients follow the pattern \\(1, 4, 2, 4, 2, \\ldots, 4, 1\\).</p>

<div class="theorem">
<strong>Theorem 5.4 (Simpson's Error Bound).</strong> If \\(f^{(4)}\\) is continuous on \\([a, b]\\) with \\(|f^{(4)}(x)| \\leq K\\), then
\\[|E_S| = \\left|\\int_a^b f(x)\\,dx - S_n\\right| \\leq \\frac{K(b-a)^5}{180n^4}.\\]
</div>

<p>The error decreases like \\(1/n^4\\): doubling \\(n\\) divides the error by about 16. This makes Simpson's rule far more accurate than the trapezoid rule for smooth functions.</p>

<div class="example">
<strong>Example 5.5.</strong> Approximate \\(\\int_0^1 e^{-x^2}\\,dx\\) using Simpson's rule with \\(n = 4\\).

<p><em>Solution.</em> \\(h = 1/4 = 0.25\\). Nodes: \\(0, 0.25, 0.5, 0.75, 1\\).</p>
\\[S_4 = \\frac{0.25}{3}\\Big[e^0 + 4e^{-0.0625} + 2e^{-0.25} + 4e^{-0.5625} + e^{-1}\\Big]\\]
\\[= \\frac{0.25}{3}[1 + 3.7586 + 1.5576 + 2.2824 + 0.3679] \\approx \\frac{0.25}{3}(8.9665) \\approx 0.7472.\\]
<p>The true value is approximately \\(0.7468\\), so the error is about \\(0.0004\\).</p>
</div>

<h3>5.4 Comparison of Methods</h3>

<table class="styled-table" style="width:100%;border-collapse:collapse;margin:12px 0;">
<tr style="border-bottom:1px solid #30363d;">
<th style="text-align:left;padding:6px;">Method</th>
<th style="text-align:center;padding:6px;">Error Order</th>
<th style="text-align:center;padding:6px;">Doubling n reduces error by</th>
</tr>
<tr style="border-bottom:1px solid #30363d;">
<td style="padding:6px;">Left/Right Riemann</td>
<td style="text-align:center;padding:6px;">\\(O(1/n)\\)</td>
<td style="text-align:center;padding:6px;">2&times;</td>
</tr>
<tr style="border-bottom:1px solid #30363d;">
<td style="padding:6px;">Midpoint Rule</td>
<td style="text-align:center;padding:6px;">\\(O(1/n^2)\\)</td>
<td style="text-align:center;padding:6px;">4&times;</td>
</tr>
<tr style="border-bottom:1px solid #30363d;">
<td style="padding:6px;">Trapezoid Rule</td>
<td style="text-align:center;padding:6px;">\\(O(1/n^2)\\)</td>
<td style="text-align:center;padding:6px;">4&times;</td>
</tr>
<tr>
<td style="padding:6px;">Simpson's Rule</td>
<td style="text-align:center;padding:6px;">\\(O(1/n^4)\\)</td>
<td style="text-align:center;padding:6px;">16&times;</td>
</tr>
</table>

<div class="env-block intuition">
<strong>Looking Ahead.</strong> We now have two seemingly unrelated concepts: antiderivatives (reversing differentiation, from Chapter 8) and definite integrals (computing area via limits of Riemann sums, from this chapter). One is an algebraic operation on functions; the other is a geometric quantity defined by a limiting process. The next chapter reveals the stunning connection between them: the <strong>Fundamental Theorem of Calculus</strong>, which shows that these two ideas are, in fact, two sides of the same coin.
</div>
`,
            visualizations: [
                {
                    id: 'viz-trapezoid',
                    title: 'Trapezoid Rule vs Riemann Sums',
                    description: 'Compare the trapezoid rule (connecting points with lines) to midpoint rectangles for f(x) = e^(-x^2) on [0, 2]. Adjust n to see convergence.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 120, originX: 60, originY: 320 });
                        var n = 4;
                        var a = 0, b = 2;
                        var f = function(x) { return Math.exp(-x * x); };

                        // Numerical exact integral (high-accuracy midpoint)
                        function exactIntegral() {
                            var steps = 10000;
                            var dx = (b - a) / steps;
                            var s = 0;
                            for (var i = 0; i < steps; i++) {
                                s += f(a + (i + 0.5) * dx) * dx;
                            }
                            return s;
                        }
                        var exact = exactIntegral();

                        function trapezoid(n) {
                            var h = (b - a) / n;
                            var s = f(a) + f(b);
                            for (var i = 1; i < n; i++) {
                                s += 2 * f(a + i * h);
                            }
                            return s * h / 2;
                        }

                        function midpoint(n) {
                            var h = (b - a) / n;
                            var s = 0;
                            for (var i = 0; i < n; i++) {
                                s += f(a + (i + 0.5) * h);
                            }
                            return s * h;
                        }

                        var showTrap = true;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            // Shade exact
                            viz.shadeUnder(f, a, b, viz.colors.teal + '18');

                            if (showTrap) {
                                // Draw trapezoids
                                var h = (b - a) / n;
                                var ctx = viz.ctx;
                                for (var i = 0; i < n; i++) {
                                    var xL = a + i * h;
                                    var xR = xL + h;
                                    var yL = f(xL);
                                    var yR = f(xR);
                                    var p1 = viz.toScreen(xL, 0);
                                    var p2 = viz.toScreen(xL, yL);
                                    var p3 = viz.toScreen(xR, yR);
                                    var p4 = viz.toScreen(xR, 0);
                                    ctx.fillStyle = viz.colors.orange + '33';
                                    ctx.beginPath();
                                    ctx.moveTo(p1[0], p1[1]);
                                    ctx.lineTo(p2[0], p2[1]);
                                    ctx.lineTo(p3[0], p3[1]);
                                    ctx.lineTo(p4[0], p4[1]);
                                    ctx.closePath();
                                    ctx.fill();
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 1;
                                    ctx.stroke();
                                }
                                var tVal = trapezoid(n);
                                viz.screenText('Trapezoid T_' + n + ' = ' + tVal.toFixed(6), viz.width - 20, 25, viz.colors.orange, 14, 'right');
                                viz.screenText('Error = ' + Math.abs(tVal - exact).toFixed(6), viz.width - 20, 48, viz.colors.yellow, 13, 'right');
                            } else {
                                viz.drawRiemannSums(f, a, b, n, 'mid', viz.colors.purple);
                                var mVal = midpoint(n);
                                viz.screenText('Midpoint M_' + n + ' = ' + mVal.toFixed(6), viz.width - 20, 25, viz.colors.purple, 14, 'right');
                                viz.screenText('Error = ' + Math.abs(mVal - exact).toFixed(6), viz.width - 20, 48, viz.colors.yellow, 13, 'right');
                            }

                            // Draw curve
                            viz.drawFunction(f, -0.3, b + 0.3, viz.colors.blue, 2.5);

                            viz.screenText('n = ' + n, 20, 25, viz.colors.white, 15, 'left');
                            viz.screenText('Exact = ' + exact.toFixed(6), viz.width - 20, 70, viz.colors.teal, 13, 'right');
                        }

                        draw();

                        VizEngine.createSlider(container, 'n', 1, 40, 4, 1, function(val) {
                            n = Math.round(val);
                            draw();
                        });

                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'display:flex;gap:8px;margin-top:6px;';
                        container.appendChild(btnRow);

                        VizEngine.createButton(btnRow, 'Trapezoid', function() {
                            showTrap = true;
                            draw();
                        });
                        VizEngine.createButton(btnRow, 'Midpoint', function() {
                            showTrap = false;
                            draw();
                        });

                        return viz;
                    }
                },
                {
                    id: 'viz-simpson',
                    title: 'Simpson\'s Rule: Parabolic Approximation',
                    description: 'Simpson\'s rule fits parabolas through groups of three points. Watch how quickly the error vanishes compared to the trapezoid rule.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 120, originX: 60, originY: 320 });
                        var n = 4; // must be even
                        var a = 0, b = 2;
                        var f = function(x) { return Math.exp(-x * x); };

                        function exactIntegral() {
                            var steps = 10000;
                            var dx = (b - a) / steps;
                            var s = 0;
                            for (var i = 0; i < steps; i++) {
                                s += f(a + (i + 0.5) * dx) * dx;
                            }
                            return s;
                        }
                        var exact = exactIntegral();

                        function simpson(n) {
                            var h = (b - a) / n;
                            var s = f(a) + f(b);
                            for (var i = 1; i < n; i++) {
                                s += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
                            }
                            return s * h / 3;
                        }

                        function trapezoid(n) {
                            var h = (b - a) / n;
                            var s = f(a) + f(b);
                            for (var i = 1; i < n; i++) {
                                s += 2 * f(a + i * h);
                            }
                            return s * h / 2;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            viz.shadeUnder(f, a, b, viz.colors.teal + '18');

                            // Draw Simpson parabolas
                            var h = (b - a) / n;
                            var ctx = viz.ctx;
                            for (var i = 0; i < n; i += 2) {
                                var x0 = a + i * h;
                                var x1 = x0 + h;
                                var x2 = x0 + 2 * h;
                                var y0 = f(x0), y1 = f(x1), y2 = f(x2);

                                // Lagrange interpolation through (x0,y0), (x1,y1), (x2,y2)
                                var parabola = function(x0r, y0r, x1r, y1r, x2r, y2r) {
                                    return function(x) {
                                        var l0 = ((x - x1r) * (x - x2r)) / ((x0r - x1r) * (x0r - x2r));
                                        var l1 = ((x - x0r) * (x - x2r)) / ((x1r - x0r) * (x1r - x2r));
                                        var l2 = ((x - x0r) * (x - x1r)) / ((x2r - x0r) * (x2r - x1r));
                                        return y0r * l0 + y1r * l1 + y2r * l2;
                                    };
                                }(x0, y0, x1, y1, x2, y2);

                                // Shade parabola
                                ctx.fillStyle = viz.colors.green + '33';
                                ctx.beginPath();
                                var sp0 = viz.toScreen(x0, 0);
                                ctx.moveTo(sp0[0], sp0[1]);
                                for (var j = 0; j <= 30; j++) {
                                    var xj = x0 + (x2 - x0) * j / 30;
                                    var pj = viz.toScreen(xj, parabola(xj));
                                    ctx.lineTo(pj[0], pj[1]);
                                }
                                var sp2 = viz.toScreen(x2, 0);
                                ctx.lineTo(sp2[0], sp2[1]);
                                ctx.closePath();
                                ctx.fill();

                                // Draw parabola curve
                                viz.drawFunction(parabola, x0, x2, viz.colors.green, 1.5, 30);

                                // Mark points
                                viz.drawPoint(x0, y0, viz.colors.green, null, 3);
                                viz.drawPoint(x1, y1, viz.colors.green, null, 3);
                                viz.drawPoint(x2, y2, viz.colors.green, null, 3);
                            }

                            // Draw actual curve
                            viz.drawFunction(f, -0.3, b + 0.3, viz.colors.blue, 2.5);

                            var sVal = simpson(n);
                            var tVal = trapezoid(n);
                            viz.screenText('n = ' + n + ' (Simpson)', 20, 25, viz.colors.white, 15, 'left');
                            viz.screenText('S_' + n + ' = ' + sVal.toFixed(8), viz.width - 20, 25, viz.colors.green, 14, 'right');
                            viz.screenText('T_' + n + ' = ' + tVal.toFixed(8), viz.width - 20, 48, viz.colors.orange, 14, 'right');
                            viz.screenText('Exact = ' + exact.toFixed(8), viz.width - 20, 70, viz.colors.teal, 13, 'right');
                            viz.screenText('Simpson err = ' + Math.abs(sVal - exact).toExponential(2), viz.width - 20, 92, viz.colors.yellow, 13, 'right');
                            viz.screenText('Trapez err = ' + Math.abs(tVal - exact).toExponential(2), viz.width - 20, 112, viz.colors.text, 13, 'right');
                        }

                        draw();

                        VizEngine.createSlider(container, 'n (even only)', 2, 40, 4, 2, function(val) {
                            n = Math.round(val);
                            if (n % 2 !== 0) n++;
                            draw();
                        });

                        return viz;
                    }
                },
                {
                    id: 'viz-error-comparison',
                    title: 'Error Convergence Comparison',
                    description: 'Log-log plot showing how errors decrease as n increases for each method. Simpson\'s rule (slope -4) wins decisively.',
                    setup: function(container) {
                        var viz = new VizEngine(container, { scale: 50, originX: 80, originY: 350 });
                        var a = 0, b = 2;
                        var f = function(x) { return Math.exp(-x * x); };

                        function exactIntegral() {
                            var steps = 50000;
                            var dx = (b - a) / steps;
                            var s = 0;
                            for (var i = 0; i < steps; i++) {
                                s += f(a + (i + 0.5) * dx) * dx;
                            }
                            return s;
                        }
                        var exact = exactIntegral();

                        function leftSum(n) {
                            var h = (b - a) / n;
                            var s = 0;
                            for (var i = 0; i < n; i++) s += f(a + i * h);
                            return s * h;
                        }
                        function trapezoid(n) {
                            var h = (b - a) / n;
                            var s = f(a) + f(b);
                            for (var i = 1; i < n; i++) s += 2 * f(a + i * h);
                            return s * h / 2;
                        }
                        function midpoint(n) {
                            var h = (b - a) / n;
                            var s = 0;
                            for (var i = 0; i < n; i++) s += f(a + (i + 0.5) * h);
                            return s * h;
                        }
                        function simpson(n) {
                            if (n % 2 !== 0) n++;
                            var h = (b - a) / n;
                            var s = f(a) + f(b);
                            for (var i = 1; i < n; i++) s += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
                            return s * h / 3;
                        }

                        function draw() {
                            viz.clear();

                            // Custom axes for log-log plot
                            var ctx = viz.ctx;
                            var plotL = 80, plotR = viz.width - 40, plotT = 30, plotB = viz.height - 50;
                            var plotW = plotR - plotL, plotH = plotB - plotT;

                            // Log scale: n from 2 to 64, error from 1e-10 to 1
                            var logNMin = Math.log2(2), logNMax = Math.log2(64);
                            var logEMin = -10, logEMax = 0;

                            function toPlot(logN, logE) {
                                var px = plotL + (logN - logNMin) / (logNMax - logNMin) * plotW;
                                var py = plotB - (logE - logEMin) / (logEMax - logEMin) * plotH;
                                return [px, py];
                            }

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var i = 1; i <= 6; i++) {
                                var p = toPlot(i, logEMin);
                                ctx.beginPath(); ctx.moveTo(p[0], plotT); ctx.lineTo(p[0], plotB); ctx.stroke();
                            }
                            for (var e = -10; e <= 0; e += 2) {
                                var pe = toPlot(logNMin, e);
                                ctx.beginPath(); ctx.moveTo(plotL, pe[1]); ctx.lineTo(plotR, pe[1]); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotR, plotB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(plotL, plotT); ctx.lineTo(plotL, plotB); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (var i = 1; i <= 6; i++) {
                                var px = toPlot(i, logEMin);
                                ctx.fillText(Math.pow(2, i), px[0], plotB + 16);
                            }
                            ctx.textAlign = 'right';
                            for (var e = -10; e <= 0; e += 2) {
                                var py = toPlot(logNMin, e);
                                ctx.fillText('1e' + e, plotL - 6, py[1] + 4);
                            }

                            ctx.textAlign = 'center';
                            ctx.fillText('n', (plotL + plotR) / 2, plotB + 36);
                            ctx.save();
                            ctx.translate(15, (plotT + plotB) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('|Error|', 0, 0);
                            ctx.restore();

                            // Plot data
                            var methods = [
                                { name: 'Left', fn: leftSum, color: viz.colors.red },
                                { name: 'Midpoint', fn: midpoint, color: viz.colors.purple },
                                { name: 'Trapezoid', fn: trapezoid, color: viz.colors.orange },
                                { name: 'Simpson', fn: simpson, color: viz.colors.green }
                            ];

                            var nValues = [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64];

                            methods.forEach(function(m) {
                                ctx.strokeStyle = m.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                nValues.forEach(function(nv) {
                                    var err = Math.abs(m.fn(nv) - exact);
                                    if (err < 1e-15) err = 1e-15;
                                    var logN = Math.log2(nv);
                                    var logE = Math.log10(err);
                                    if (logE < logEMin) logE = logEMin;
                                    var pt = toPlot(logN, logE);
                                    if (!started) { ctx.moveTo(pt[0], pt[1]); started = true; }
                                    else ctx.lineTo(pt[0], pt[1]);
                                });
                                ctx.stroke();

                                // Draw points
                                nValues.forEach(function(nv) {
                                    var err = Math.abs(m.fn(nv) - exact);
                                    if (err < 1e-15) err = 1e-15;
                                    var logN = Math.log2(nv);
                                    var logE = Math.log10(err);
                                    if (logE < logEMin) logE = logEMin;
                                    var pt = toPlot(logN, logE);
                                    ctx.fillStyle = m.color;
                                    ctx.beginPath();
                                    ctx.arc(pt[0], pt[1], 3, 0, Math.PI * 2);
                                    ctx.fill();
                                });
                            });

                            // Legend
                            var legendY = 20;
                            methods.forEach(function(m) {
                                ctx.fillStyle = m.color;
                                ctx.fillRect(plotR - 110, legendY, 12, 12);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(m.name, plotR - 94, legendY + 10);
                                legendY += 18;
                            });

                            viz.screenText('Error Convergence (log-log)', (plotL + plotR) / 2, plotT - 10, viz.colors.white, 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch09-ex14',
                    type: 'numeric',
                    question: 'Use the trapezoid rule with n = 4 to approximate the integral from 0 to 2 of x^2 dx. (Exact value = 8/3.)',
                    answer: 2.75,
                    tolerance: 0.01,
                    explanation: 'h = 0.5. T_4 = (0.5/2)[f(0) + 2f(0.5) + 2f(1) + 2f(1.5) + f(2)] = 0.25[0 + 0.5 + 2 + 4.5 + 4] = 0.25(11) = 2.75. The exact value is 8/3 = 2.667, so the error is about 0.083.'
                },
                {
                    id: 'ch09-ex15',
                    type: 'numeric',
                    question: 'Use Simpson\'s rule with n = 4 to approximate the integral from 0 to 2 of x^2 dx.',
                    answer: 2.6667,
                    tolerance: 0.01,
                    explanation: 'h = 0.5. S_4 = (0.5/3)[f(0) + 4f(0.5) + 2f(1) + 4f(1.5) + f(2)] = (0.5/3)[0 + 1 + 2 + 9 + 4] = (0.5/3)(16) = 8/3 = 2.6667. Simpson\'s rule is exact for polynomials up to degree 3!'
                },
                {
                    id: 'ch09-ex16',
                    type: 'multiple-choice',
                    question: 'For the trapezoid rule, if you double the number of subintervals, by approximately what factor does the error decrease?',
                    options: ['2', '4', '8', '16'],
                    correct: 1,
                    explanation: 'The trapezoid rule has error O(1/n^2). Doubling n means dividing the error by 2^2 = 4.'
                },
                {
                    id: 'ch09-ex17',
                    type: 'multiple-choice',
                    question: 'Simpson\'s rule requires n to be:',
                    options: ['Any positive integer', 'An even number', 'A multiple of 3', 'A power of 2'],
                    correct: 1,
                    explanation: 'Simpson\'s rule fits parabolas through groups of three consecutive points (two subintervals at a time), so n must be even.'
                }
            ]
        }
    ]
});
