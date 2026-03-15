window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'Applications II — Optimization',
    subtitle: 'Optimization, L\'Hopital\'s Rule, Newton\'s Method, and linear approximation',
    sections: [

        /* ============================================================
           SECTION 1: Optimization Problems
           ============================================================ */
        {
            id: 'ch06-sec01',
            title: 'Optimization Problems',
            content: `
<div class="env-block intuition">
<strong>Where we are.</strong>
In Chapter 5 we learned to read a function's behavior from its derivatives: the first derivative tells us where a function increases or decreases and locates local extrema; the second derivative reveals concavity and inflection points. Those tools let us sketch curves, but they also unlock something even more practical. In this chapter we put them to work on real-world problems: finding the dimensions that maximize an enclosed area, minimizing the material needed for a container, approximating values with tangent lines, and tracking how related quantities change over time. Optimization is where calculus meets engineering, economics, and the sciences.
</div>

<h2>Optimization Problems</h2>

<p><strong>Section roadmap.</strong>
We begin with the Closed Interval Method for finding absolute extrema, then develop a general strategy for applied optimization problems. Two worked examples (fencing and box design) illustrate the workflow you will use repeatedly.</p>

<p>One of the most powerful applications of differentiation is finding the <strong>maximum</strong> or <strong>minimum</strong> value of a function on a given domain. This is the heart of <em>optimization</em>.</p>

<div class="concept-box">
<h3>The Closed Interval Method</h3>
<p>To find the <strong>absolute maximum</strong> and <strong>absolute minimum</strong> of a continuous function \\(f\\) on a closed interval \\([a,b]\\):</p>
<ol>
  <li>Find all <strong>critical numbers</strong> of \\(f\\) in \\((a,b)\\) — points where \\(f'(c)=0\\) or \\(f'(c)\\) does not exist.</li>
  <li>Evaluate \\(f\\) at each critical number and at the <strong>endpoints</strong> \\(a\\) and \\(b\\).</li>
  <li>The largest value is the absolute maximum; the smallest is the absolute minimum.</li>
</ol>
</div>

<p>This method works because of the <strong>Extreme Value Theorem</strong>: a continuous function on a closed interval always attains both its maximum and its minimum.</p>

<h3>Applied Optimization Strategy</h3>
<p>For real-world optimization problems, follow these steps:</p>
<ol>
  <li><strong>Draw a diagram</strong> and introduce variables.</li>
  <li>Write the quantity to be optimized as a function of one variable.</li>
  <li>Use any constraints to eliminate extra variables.</li>
  <li>Determine the domain (often a closed interval from physical constraints).</li>
  <li>Apply the Closed Interval Method or the First/Second Derivative Test.</li>
</ol>

<h3>Example: Fencing Problem</h3>
<p>A farmer has 200 m of fencing and wants to enclose the largest possible rectangular area against a barn wall (so only three sides need fencing). If the two sides perpendicular to the barn have length \\(x\\), then the parallel side has length \\(200 - 2x\\), and the area is:</p>
\\[A(x) = x(200 - 2x) = 200x - 2x^2, \\quad 0 \\le x \\le 100\\]
<p>Setting \\(A'(x) = 200 - 4x = 0\\) gives \\(x = 50\\). Since \\(A(0) = A(100) = 0\\) and \\(A(50) = 5000\\), the maximum area is <strong>5000 m\\(^2\\)</strong>.</p>

<h3>Example: Open-Top Box</h3>
<p>A square piece of cardboard with side 12 has squares of side \\(x\\) cut from each corner, then folded up to make an open-top box. The volume is:</p>
\\[V(x) = x(12-2x)^2, \\quad 0 \\le x \\le 6\\]
<p>Setting \\(V'(x) = (12-2x)^2 + x \\cdot 2(12-2x)(-2) = (12-2x)(12-6x) = 0\\) gives \\(x = 2\\) or \\(x = 6\\). Since \\(V(0) = V(6) = 0\\) and \\(V(2) = 2 \\cdot 64 = 128\\), the maximum volume is <strong>128</strong>.</p>
            `,
            visualizations: [
                {
                    id: 'ch06-viz01',
                    title: 'Closed Interval Method',
                    setup(container) {
                        var viz = new VizEngine(container, { scale: 50, originX: 60, originY: 280 });

                        var f = function(x) { return -x * x * x + 3 * x * x - 1; };
                        var fp = function(x) { return -3 * x * x + 6 * x; };
                        var a = -0.5, b = 2.8;

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            viz.drawFunction(f, -1, 3.5, viz.colors.blue, 2.5);

                            // Mark endpoints
                            viz.drawPoint(a, f(a), viz.colors.orange, 'f(' + a.toFixed(1) + ')=' + f(a).toFixed(2), 6);
                            viz.drawPoint(b, f(b), viz.colors.orange, 'f(' + b.toFixed(1) + ')=' + f(b).toFixed(2), 6);

                            // Find critical points (f'(x) = -3x^2 + 6x = 0 => x=0 or x=2)
                            var crits = [0, 2];
                            crits.forEach(function(c) {
                                if (c > a && c < b) {
                                    viz.drawPoint(c, f(c), viz.colors.teal, 'f(' + c + ')=' + f(c).toFixed(2), 6);
                                    viz.drawSegment(c, 0, c, f(c), viz.colors.teal, 1, true);
                                }
                            });

                            // Highlight absolute max and min
                            var candidates = [a, b].concat(crits.filter(function(c) { return c > a && c < b; }));
                            var vals = candidates.map(function(c) { return { x: c, y: f(c) }; });
                            var maxPt = vals.reduce(function(best, v) { return v.y > best.y ? v : best; });
                            var minPt = vals.reduce(function(best, v) { return v.y < best.y ? v : best; });

                            viz.drawPoint(maxPt.x, maxPt.y, viz.colors.green, 'ABS MAX', 8);
                            viz.drawPoint(minPt.x, minPt.y, viz.colors.red, 'ABS MIN', 8);

                            // Interval markers
                            viz.drawSegment(a, -0.3, b, -0.3, viz.colors.yellow, 2);
                            viz.drawPoint(a, -0.3, viz.colors.yellow, 'a', 4);
                            viz.drawPoint(b, -0.3, viz.colors.yellow, 'b', 4);

                            viz.screenText('f(x) = -x\u00B3 + 3x\u00B2 - 1', viz.width / 2, 20, viz.colors.white, 14);
                            viz.screenText('Closed Interval Method: check endpoints + critical points', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'ch06-viz02',
                    title: 'Fencing Optimization — Drag to Explore',
                    setup(container) {
                        var viz = new VizEngine(container, { scale: 2.5, originX: 60, originY: 320 });

                        var totalFence = 200;
                        var paramX = 50;

                        var drag = viz.addDraggable('x', paramX, 0, viz.colors.orange, 8, function(wx) {
                            paramX = Math.max(1, Math.min(99, wx));
                            drag.x = paramX;
                            drag.y = 0;
                        });

                        function areaFn(x) { return x * (totalFence - 2 * x); }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(10);
                            viz.drawAxes();

                            // Draw A(x) curve
                            viz.drawFunction(areaFn, 0, 100, viz.colors.blue, 2.5);

                            // Current point
                            var currentArea = areaFn(paramX);
                            viz.drawPoint(paramX, currentArea, viz.colors.orange, '', 7);
                            viz.drawSegment(paramX, 0, paramX, currentArea, viz.colors.orange, 1, true);

                            // Optimal point
                            viz.drawPoint(50, 5000, viz.colors.green, 'Max: (50, 5000)', 5);

                            // Labels
                            viz.screenText('A(x) = x(200 - 2x)', viz.width / 2, 20, viz.colors.white, 14);
                            viz.screenText('x = ' + paramX.toFixed(1) + ', width = ' + (totalFence - 2 * paramX).toFixed(1) + ', Area = ' + currentArea.toFixed(0), viz.width / 2, viz.height - 12, viz.colors.yellow, 12);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch06-ex01',
                    type: 'numeric',
                    question: 'Find the absolute maximum of f(x) = x^3 - 6x^2 + 9x + 1 on the interval [0, 4]. Enter the maximum value.',
                    answer: 5,
                    tolerance: 0.01,
                    hint: 'Find critical points by setting f\'(x) = 3x^2 - 12x + 9 = 0, then evaluate f at x = 0, 1, 3, and 4.',
                    explanation: 'f\'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3) = 0 gives x = 1 and x = 3. Evaluating: f(0) = 1, f(1) = 5, f(3) = 1, f(4) = 5. The absolute maximum is 5, attained at x = 1 and x = 4.'
                },
                {
                    id: 'ch06-ex02',
                    type: 'multiple-choice',
                    question: 'A farmer wants to fence a rectangular area of 1800 m^2 next to a river (no fence along the river). Which dimensions minimize the total fencing?',
                    options: ['30 m x 60 m', '20 m x 90 m', '45 m x 40 m', '15 m x 120 m'],
                    answer: 0,
                    hint: 'If x is the side perpendicular to the river, then the area constraint gives the parallel side as 1800/x. Minimize P(x) = 2x + 1800/x.',
                    explanation: 'P(x) = 2x + 1800/x. Setting P\'(x) = 2 - 1800/x^2 = 0 gives x^2 = 900, so x = 30. The parallel side is 1800/30 = 60. Dimensions: 30 m x 60 m.'
                },
                {
                    id: 'ch06-ex03',
                    type: 'numeric',
                    question: 'A box with a square base and open top must have volume 32000 cm^3. Find the minimum surface area in cm^2.',
                    answer: 4800,
                    tolerance: 1,
                    hint: 'Let x = side of base, h = height. Volume: x^2 h = 32000 so h = 32000/x^2. Surface area: S = x^2 + 4xh. Substitute and minimize.',
                    explanation: 'S(x) = x^2 + 4x(32000/x^2) = x^2 + 128000/x. Setting S\'(x) = 2x - 128000/x^2 = 0 gives x^3 = 64000, so x = 40 cm. Then h = 32000/1600 = 20 cm. S = 1600 + 4(40)(20) = 1600 + 3200 = 4800 cm^2.'
                }
            ]
        },

        /* ============================================================
           SECTION 2: L'Hopital's Rule
           ============================================================ */
        {
            id: 'ch06-sec02',
            title: 'L\'Hopital\'s Rule',
            content: `
<h2>L'Hopital's Rule</h2>

<p><strong>Section roadmap.</strong>
Optimization showed us how derivatives solve "find the best" problems. Now we turn to a very different application: using derivatives to evaluate stubborn limits. L'Hopital's Rule converts indeterminate forms like \\(0/0\\) and \\(\\infty/\\infty\\) into derivative computations we already know how to handle.</p>

<p><strong>Connection to earlier material.</strong>
Recall from Chapter 1 that we often evaluated limits by algebraic manipulation or the squeeze theorem. L'Hopital's Rule gives us a powerful alternative that works even when those earlier tricks fail.</p>

<p>When computing limits, we often encounter <strong>indeterminate forms</strong> such as \\(\\frac{0}{0}\\) or \\(\\frac{\\infty}{\\infty}\\). L'Hopital's Rule provides an elegant way to evaluate such limits.</p>

<div class="concept-box">
<h3>L'Hopital's Rule</h3>
<p>Suppose \\(f\\) and \\(g\\) are differentiable near \\(a\\) (except possibly at \\(a\\)) and \\(g'(x) \\ne 0\\) near \\(a\\). If</p>
\\[\\lim_{x \\to a} f(x) = 0 \\text{ and } \\lim_{x \\to a} g(x) = 0 \\quad \\text{(0/0 form)}\\]
<p>or</p>
\\[\\lim_{x \\to a} f(x) = \\pm\\infty \\text{ and } \\lim_{x \\to a} g(x) = \\pm\\infty \\quad \\text{(\\(\\infty/\\infty\\) form)}\\]
<p>then</p>
\\[\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}\\]
<p>provided the limit on the right exists (or is \\(\\pm\\infty\\)).</p>
</div>

<h3>Key Examples</h3>

<p><strong>Example 1 (0/0):</strong></p>
\\[\\lim_{x \\to 0} \\frac{\\sin x}{x} = \\lim_{x \\to 0} \\frac{\\cos x}{1} = 1\\]

<p><strong>Example 2 (repeated application):</strong></p>
\\[\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2} \\;\\overset{0/0}{=}\\; \\lim_{x \\to 0} \\frac{e^x - 1}{2x} \\;\\overset{0/0}{=}\\; \\lim_{x \\to 0} \\frac{e^x}{2} = \\frac{1}{2}\\]

<p><strong>Example 3 (\\(\\infty/\\infty\\)):</strong></p>
\\[\\lim_{x \\to \\infty} \\frac{\\ln x}{\\sqrt{x}} = \\lim_{x \\to \\infty} \\frac{1/x}{1/(2\\sqrt{x})} = \\lim_{x \\to \\infty} \\frac{2\\sqrt{x}}{x} = \\lim_{x \\to \\infty} \\frac{2}{\\sqrt{x}} = 0\\]

<h3>Other Indeterminate Forms</h3>
<p>The forms \\(0 \\cdot \\infty\\), \\(\\infty - \\infty\\), \\(0^0\\), \\(\\infty^0\\), and \\(1^\\infty\\) can often be converted to \\(0/0\\) or \\(\\infty/\\infty\\) by algebraic manipulation or by taking a logarithm.</p>

<div class="concept-box">
<p><strong>Warning:</strong> L'Hopital's Rule only applies to indeterminate forms. If the limit is not indeterminate (e.g., \\(\\frac{1}{0}\\) or \\(\\frac{5}{3}\\)), do NOT apply the rule — you will get a wrong answer.</p>
</div>
            `,
            visualizations: [
                {
                    id: 'ch06-viz03',
                    title: 'L\'Hopital\'s Rule: Comparing f(x)/g(x) and f\'(x)/g\'(x)',
                    setup(container) {
                        var viz = new VizEngine(container, { scale: 60, originX: 200, originY: 200 });

                        var choice = 0;
                        var examples = [
                            {
                                label: 'sin(x)/x near x=0',
                                f: function(x) { return Math.sin(x); },
                                g: function(x) { return x; },
                                fp: function(x) { return Math.cos(x); },
                                gp: function() { return 1; },
                                a: 0, limitVal: 1, xMin: -3, xMax: 3
                            },
                            {
                                label: '(e^x - 1)/x near x=0',
                                f: function(x) { return Math.exp(x) - 1; },
                                g: function(x) { return x; },
                                fp: function(x) { return Math.exp(x); },
                                gp: function() { return 1; },
                                a: 0, limitVal: 1, xMin: -3, xMax: 3
                            },
                            {
                                label: '(1-cos(x))/x^2 near x=0',
                                f: function(x) { return 1 - Math.cos(x); },
                                g: function(x) { return x * x; },
                                fp: function(x) { return Math.sin(x); },
                                gp: function(x) { return 2 * x; },
                                a: 0, limitVal: 0.5, xMin: -4, xMax: 4
                            }
                        ];

                        var controls = document.createElement('div');
                        controls.style.cssText = 'display:flex;gap:6px;margin-bottom:6px;flex-wrap:wrap;';
                        container.insertBefore(controls, viz.canvas);

                        examples.forEach(function(ex, i) {
                            VizEngine.createButton(controls, ex.label, function() {
                                choice = i;
                            });
                        });

                        function draw() {
                            var ex = examples[choice];
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw f(x)/g(x) ratio
                            viz.drawFunction(function(x) {
                                var denom = ex.g(x);
                                if (Math.abs(denom) < 1e-10) return NaN;
                                return ex.f(x) / denom;
                            }, ex.xMin, ex.xMax, viz.colors.blue, 2.5);

                            // Draw f'(x)/g'(x) ratio
                            viz.drawFunction(function(x) {
                                var denom = ex.gp(x);
                                if (Math.abs(denom) < 1e-10) return NaN;
                                return ex.fp(x) / denom;
                            }, ex.xMin, ex.xMax, viz.colors.teal, 2, 300);

                            // Mark the limit value
                            viz.drawPoint(ex.a, ex.limitVal, viz.colors.orange, 'L = ' + ex.limitVal, 6);
                            viz.drawSegment(ex.xMin, ex.limitVal, ex.xMax, ex.limitVal, viz.colors.yellow, 1, true);

                            viz.screenText(ex.label, viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('Blue: f/g    Teal: f\'/g\'    Both approach L = ' + ex.limitVal, viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch06-ex04',
                    type: 'numeric',
                    question: 'Evaluate the limit using L\'Hopital\'s Rule: lim(x->0) (e^x - 1 - x - x^2/2) / x^3',
                    answer: 0.1667,
                    tolerance: 0.01,
                    hint: 'Apply L\'Hopital\'s Rule three times. Each time, both numerator and denominator go to 0.',
                    explanation: 'Apply L\'Hopital\'s 3 times: (e^x - 1 - x)/3x^2 -> (e^x - 1)/6x -> e^x/6 -> 1/6 = 0.1667.'
                },
                {
                    id: 'ch06-ex05',
                    type: 'multiple-choice',
                    question: 'Which of the following is NOT an indeterminate form?',
                    options: ['0/0', '1/0', 'infinity/infinity', '0 * infinity'],
                    answer: 1,
                    hint: 'An indeterminate form is one where the limit cannot be determined from the form alone.',
                    explanation: '1/0 is not indeterminate — it means the limit is +infinity, -infinity, or does not exist (depending on direction). The other three are all indeterminate forms.'
                },
                {
                    id: 'ch06-ex06',
                    type: 'numeric',
                    question: 'Evaluate: lim(x->infinity) x^2 / e^x',
                    answer: 0,
                    tolerance: 0.01,
                    hint: 'This is infinity/infinity. Apply L\'Hopital\'s Rule twice.',
                    explanation: 'lim x^2/e^x = lim 2x/e^x = lim 2/e^x = 0. Exponentials grow faster than any polynomial.'
                }
            ]
        },

        /* ============================================================
           SECTION 3: Newton's Method
           ============================================================ */
        {
            id: 'ch06-sec03',
            title: 'Newton\'s Method',
            content: `
<h2>Newton's Method</h2>

<p><strong>Section roadmap.</strong>
L'Hopital's Rule used derivatives to compute limits. Now we use derivatives in a completely different way: as a root-finding engine. Newton's Method exploits the tangent line (the linearization from the derivative) to zero in on solutions of equations with remarkable speed.</p>

<p><strong>Motivation.</strong>
Many important equations, such as \\(\\cos x = x\\) or \\(x^5 - x - 1 = 0\\), have no closed-form solution. We need a numerical method. Newton's Method is the workhorse algorithm, and its quadratic convergence makes it extraordinarily efficient when it works.</p>

<p>Newton's Method (also called the Newton-Raphson method) is an iterative algorithm for finding roots of equations. Starting from an initial guess \\(x_0\\), we use the tangent line at each iterate to get a better approximation.</p>

<div class="concept-box">
<h3>Newton's Iteration Formula</h3>
\\[x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}\\]
<p>Geometrically: draw the tangent line to \\(y = f(x)\\) at the point \\((x_n, f(x_n))\\), and let \\(x_{n+1}\\) be where this tangent line crosses the \\(x\\)-axis.</p>
</div>

<h3>Derivation</h3>
<p>The tangent line at \\((x_n, f(x_n))\\) is:</p>
\\[y - f(x_n) = f'(x_n)(x - x_n)\\]
<p>Setting \\(y = 0\\) and solving for \\(x\\):</p>
\\[x = x_n - \\frac{f(x_n)}{f'(x_n)}\\]

<h3>Convergence</h3>
<p>When it converges, Newton's Method converges <strong>quadratically</strong> — the number of correct digits roughly doubles each iteration. However, it can fail if:</p>
<ul>
  <li>\\(f'(x_n) = 0\\) (horizontal tangent — division by zero)</li>
  <li>The initial guess is too far from the root</li>
  <li>The iterates enter a cycle</li>
</ul>

<h3>Example: Finding \\(\\sqrt{2}\\)</h3>
<p>Solve \\(f(x) = x^2 - 2 = 0\\). Here \\(f'(x) = 2x\\), so:</p>
\\[x_{n+1} = x_n - \\frac{x_n^2 - 2}{2x_n} = \\frac{x_n + 2/x_n}{2}\\]
<p>Starting with \\(x_0 = 1\\):</p>
<ul>
  <li>\\(x_1 = 1.5\\)</li>
  <li>\\(x_2 = 1.41\\overline{6}\\)</li>
  <li>\\(x_3 = 1.41421356...\\) (already 8 correct digits!)</li>
</ul>
            `,
            visualizations: [
                {
                    id: 'ch06-viz04',
                    title: 'Newton\'s Method — Step-by-Step Iteration',
                    setup(container) {
                        var viz = new VizEngine(container, { scale: 50, originX: 250, originY: 260 });

                        var funcChoice = 0;
                        var functions = [
                            {
                                label: 'x^2 - 2',
                                f: function(x) { return x * x - 2; },
                                fp: function(x) { return 2 * x; },
                                x0: 3, root: Math.sqrt(2)
                            },
                            {
                                label: 'x^3 - x - 1',
                                f: function(x) { return x * x * x - x - 1; },
                                fp: function(x) { return 3 * x * x - 1; },
                                x0: 1.5, root: 1.3247
                            },
                            {
                                label: 'cos(x) - x',
                                f: function(x) { return Math.cos(x) - x; },
                                fp: function(x) { return -Math.sin(x) - 1; },
                                x0: 1, root: 0.7391
                            }
                        ];

                        var step = 0;
                        var maxSteps = 6;
                        var iterates = [];

                        function computeIterates() {
                            var fn = functions[funcChoice];
                            iterates = [fn.x0];
                            for (var i = 0; i < maxSteps; i++) {
                                var xn = iterates[iterates.length - 1];
                                var deriv = fn.fp(xn);
                                if (Math.abs(deriv) < 1e-12) break;
                                var xnext = xn - fn.f(xn) / deriv;
                                iterates.push(xnext);
                            }
                        }
                        computeIterates();

                        var controls = document.createElement('div');
                        controls.style.cssText = 'display:flex;gap:6px;margin-bottom:6px;flex-wrap:wrap;align-items:center;';
                        container.insertBefore(controls, viz.canvas);

                        functions.forEach(function(fn, i) {
                            VizEngine.createButton(controls, fn.label, function() {
                                funcChoice = i;
                                step = 0;
                                computeIterates();
                            });
                        });

                        VizEngine.createButton(controls, 'Next Step', function() {
                            if (step < iterates.length - 1) step++;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            step = 0;
                        });

                        function draw() {
                            var fn = functions[funcChoice];
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw function
                            viz.drawFunction(fn.f, -2, 5, viz.colors.blue, 2.5);

                            // Draw tangent lines and iterates up to current step
                            for (var i = 0; i <= step && i < iterates.length; i++) {
                                var xn = iterates[i];
                                var yn = fn.f(xn);
                                var alpha = i < step ? 0.4 : 1.0;

                                // Mark x_n on x-axis
                                viz.drawPoint(xn, 0, viz.colors.orange, 'x' + i, 5);

                                // Mark (x_n, f(x_n))
                                viz.drawPoint(xn, yn, viz.colors.teal, '', 4);
                                viz.drawSegment(xn, 0, xn, yn, viz.colors.text, 1, true);

                                // Draw tangent line from (x_n, f(x_n)) to next x
                                if (i < step && i + 1 < iterates.length) {
                                    var slope = fn.fp(xn);
                                    var xint = xn - yn / slope;
                                    // Draw a short tangent line segment
                                    var dx = 1.5;
                                    var x1t = xn - dx, y1t = yn - slope * dx;
                                    var x2t = xn + dx, y2t = yn + slope * dx;
                                    viz.drawSegment(x1t, y1t, x2t, y2t, viz.colors.red, 1.5);
                                } else if (i === step && i < iterates.length - 1) {
                                    // Current tangent line — highlight
                                    var slope2 = fn.fp(xn);
                                    var dx2 = 2;
                                    var x1t2 = xn - dx2, y1t2 = yn - slope2 * dx2;
                                    var x2t2 = xn + dx2, y2t2 = yn + slope2 * dx2;
                                    viz.drawSegment(x1t2, y1t2, x2t2, y2t2, viz.colors.red, 2);
                                }
                            }

                            // Mark the root
                            viz.drawPoint(fn.root, 0, viz.colors.green, 'root', 6);

                            // Info
                            var currentX = iterates[Math.min(step, iterates.length - 1)];
                            viz.screenText('f(x) = ' + fn.label, viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('Step ' + step + ': x_' + step + ' = ' + currentX.toFixed(8), viz.width / 2, viz.height - 12, viz.colors.yellow, 12);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'ch06-viz05',
                    title: 'Newton\'s Method — Convergence Animation',
                    setup(container) {
                        var viz = new VizEngine(container, { scale: 60, originX: 220, originY: 240 });

                        var f = function(x) { return x * x - 2; };
                        var fp = function(x) { return 2 * x; };
                        var x0 = 3.5;
                        var root = Math.sqrt(2);

                        var drag = viz.addDraggable('x0', x0, 0, viz.colors.orange, 8, function(wx) {
                            x0 = Math.max(-4, Math.min(5, wx));
                            drag.x = x0;
                            drag.y = 0;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            viz.drawFunction(f, -3, 5, viz.colors.blue, 2.5);

                            // Perform iterations from draggable starting point
                            var xn = x0;
                            var colors = [viz.colors.red, viz.colors.orange, viz.colors.yellow, viz.colors.teal, viz.colors.green, viz.colors.purple];
                            for (var i = 0; i < 6; i++) {
                                var yn = f(xn);
                                var deriv = fp(xn);
                                if (Math.abs(deriv) < 1e-10) break;

                                var col = colors[i % colors.length];

                                // Draw vertical to curve
                                viz.drawSegment(xn, 0, xn, yn, col, 1, true);
                                viz.drawPoint(xn, yn, col, '', 3);
                                viz.drawPoint(xn, 0, col, 'x' + i, 4);

                                // Tangent line to x-axis
                                var xnext = xn - yn / deriv;
                                viz.drawSegment(xn, yn, xnext, 0, col, 1.5);

                                if (Math.abs(xnext - xn) < 1e-10) break;
                                xn = xnext;
                            }

                            // Mark roots
                            viz.drawPoint(root, 0, viz.colors.green, '\u221A2', 6);
                            viz.drawPoint(-root, 0, viz.colors.green, '-\u221A2', 6);

                            viz.screenText('Drag orange dot to change x\u2080', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('f(x) = x\u00B2 - 2', viz.width / 2, viz.height - 12, viz.colors.text, 12);
                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch06-ex07',
                    type: 'numeric',
                    question: 'Use Newton\'s Method with x_0 = 2 to find the root of f(x) = x^3 - 5. What is x_1? (Round to 4 decimal places.)',
                    answer: 1.75,
                    tolerance: 0.01,
                    hint: 'x_1 = x_0 - f(x_0)/f\'(x_0) = 2 - (8-5)/(3*4) = 2 - 3/12.',
                    explanation: 'f(2) = 8 - 5 = 3, f\'(2) = 3(4) = 12. So x_1 = 2 - 3/12 = 2 - 0.25 = 1.75.'
                },
                {
                    id: 'ch06-ex08',
                    type: 'multiple-choice',
                    question: 'Newton\'s Method converges quadratically. This means:',
                    options: [
                        'The error is squared each iteration',
                        'The number of correct digits roughly doubles each step',
                        'It takes exactly 2 iterations to converge',
                        'The step size is always halved'
                    ],
                    answer: 1,
                    hint: 'Quadratic convergence refers to the rate at which the error decreases.',
                    explanation: 'Quadratic convergence means |e_{n+1}| ~ C|e_n|^2, so the number of correct decimal digits approximately doubles with each iteration.'
                },
                {
                    id: 'ch06-ex09',
                    type: 'numeric',
                    question: 'Apply two iterations of Newton\'s Method to f(x) = cos(x) - x, starting with x_0 = 1. What is x_2? (Round to 4 decimal places.)',
                    answer: 0.7391,
                    tolerance: 0.001,
                    hint: 'x_1 = 1 - (cos(1)-1)/(-sin(1)-1). Then repeat with x_1.',
                    explanation: 'f(1) = cos(1)-1 = -0.4597, f\'(1) = -sin(1)-1 = -1.8415. x_1 = 1 - (-0.4597)/(-1.8415) = 1 - 0.2496 = 0.7504. f(0.7504) = cos(0.7504)-0.7504 = -0.0189, f\'(0.7504) = -1.6819. x_2 = 0.7504 - (-0.0189)/(-1.6819) = 0.7504 - 0.0112 = 0.7391.'
                }
            ]
        },

        /* ============================================================
           SECTION 4: Linear Approximation & Differentials
           ============================================================ */
        {
            id: 'ch06-sec04',
            title: 'Linear Approximation & Differentials',
            content: `
<h2>Linear Approximation & Differentials</h2>

<p><strong>Section roadmap.</strong>
Newton's Method used the tangent line to find where a function equals zero. Here we zoom in on the tangent line itself and ask: how well does it approximate the function nearby? This idea, called linearization, is one of the most broadly useful concepts in all of applied mathematics. We also introduce differentials, a compact notation for approximating small changes.</p>

<p><strong>Connection.</strong>
The linearization \\(L(x) = f(a) + f'(a)(x-a)\\) is exactly the first-order Taylor polynomial. In later chapters, adding higher-order terms will yield even better approximations (Taylor series), but the linear case already handles a surprising range of practical problems.</p>

<p>The tangent line at \\(x = a\\) gives the best <strong>linear approximation</strong> to \\(f(x)\\) near \\(a\\). This idea has far-reaching applications in science and engineering.</p>

<div class="concept-box">
<h3>Linearization</h3>
<p>The <strong>linearization</strong> of \\(f\\) at \\(x = a\\) is:</p>
\\[L(x) = f(a) + f'(a)(x - a)\\]
<p>For \\(x\\) near \\(a\\), we have the approximation \\(f(x) \\approx L(x)\\).</p>
</div>

<h3>Standard Linearizations (at \\(a = 0\\))</h3>
<p>These are used frequently:</p>
<ul>
  <li>\\((1+x)^n \\approx 1 + nx\\) for small \\(x\\)</li>
  <li>\\(\\sin x \\approx x\\) for small \\(x\\)</li>
  <li>\\(\\cos x \\approx 1 - \\frac{x^2}{2}\\) (quadratic, but the linear part is \\(\\cos x \\approx 1\\))</li>
  <li>\\(e^x \\approx 1 + x\\) for small \\(x\\)</li>
  <li>\\(\\ln(1+x) \\approx x\\) for small \\(x\\)</li>
</ul>

<h3>Differentials</h3>
<p>If \\(y = f(x)\\), we define:</p>
<ul>
  <li>The <strong>differential</strong> \\(dx\\) is an independent variable (a small change in \\(x\\)).</li>
  <li>The <strong>differential</strong> \\(dy = f'(x)\\,dx\\).</li>
</ul>
<p>The quantity \\(dy\\) approximates the actual change \\(\\Delta y = f(x + dx) - f(x)\\) when \\(dx\\) is small:</p>
\\[\\Delta y \\approx dy = f'(x)\\,dx\\]

<h3>Example</h3>
<p>Approximate \\(\\sqrt{4.02}\\). Let \\(f(x) = \\sqrt{x}\\), \\(a = 4\\), \\(dx = 0.02\\).</p>
\\[f(a) = 2, \\quad f'(x) = \\frac{1}{2\\sqrt{x}}, \\quad f'(4) = \\frac{1}{4}\\]
\\[\\sqrt{4.02} \\approx 2 + \\frac{1}{4}(0.02) = 2.005\\]
<p>The exact value is \\(2.004994...\\), so the error is only \\(0.000006\\).</p>
            `,
            visualizations: [
                {
                    id: 'ch06-viz06',
                    title: 'Linear Approximation — Tangent Line as Best Local Fit',
                    setup(container) {
                        var viz = new VizEngine(container, { scale: 60, originX: 80, originY: 280 });

                        var a = 1;

                        var drag = viz.addDraggable('a', a, 0, viz.colors.orange, 8, function(wx) {
                            a = Math.max(0.1, Math.min(5, wx));
                            drag.x = a;
                            drag.y = 0;
                        });

                        var f = function(x) { return Math.sqrt(x); };
                        var fp = function(x) { return 0.5 / Math.sqrt(x); };

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw f(x) = sqrt(x)
                            viz.drawFunction(f, 0.01, 7, viz.colors.blue, 2.5);

                            // Linearization at a
                            var fa = f(a);
                            var fpa = fp(a);
                            var L = function(x) { return fa + fpa * (x - a); };
                            viz.drawFunction(L, -0.5, 7, viz.colors.red, 2);

                            // Mark the point of tangency
                            viz.drawPoint(a, fa, viz.colors.orange, '(' + a.toFixed(2) + ', ' + fa.toFixed(2) + ')', 6);

                            // Show approximation at a nearby point
                            var testX = a + 0.5;
                            var actual = f(testX);
                            var approx = L(testX);
                            if (testX > 0) {
                                viz.drawSegment(testX, actual, testX, approx, viz.colors.yellow, 2);
                                viz.drawPoint(testX, actual, viz.colors.blue, 'actual', 4);
                                viz.drawPoint(testX, approx, viz.colors.red, 'approx', 4);
                            }

                            viz.screenText('f(x) = \u221Ax, linearization at a (drag orange dot)', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('L(x) = ' + fa.toFixed(3) + ' + ' + fpa.toFixed(3) + '(x - ' + a.toFixed(2) + ')', viz.width / 2, viz.height - 12, viz.colors.yellow, 12);
                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'ch06-viz07',
                    title: 'Differentials: dy vs \u0394y',
                    setup(container) {
                        var viz = new VizEngine(container, { scale: 50, originX: 80, originY: 300 });

                        var a = 1.5;
                        var dx = 1.0;

                        var controls = document.createElement('div');
                        controls.style.cssText = 'display:flex;gap:8px;margin-bottom:6px;flex-wrap:wrap;align-items:center;';
                        container.insertBefore(controls, viz.canvas);

                        VizEngine.createSlider(controls, 'a = ', 0.2, 4, a, 0.1, function(v) { a = v; });
                        VizEngine.createSlider(controls, 'dx = ', 0.1, 2, dx, 0.1, function(v) { dx = v; });

                        var f = function(x) { return x * x; };
                        var fp = function(x) { return 2 * x; };

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            viz.drawFunction(f, -1, 5, viz.colors.blue, 2.5);

                            var fa = f(a);
                            var slope = fp(a);
                            var dy = slope * dx;
                            var deltaY = f(a + dx) - fa;

                            // Tangent line
                            viz.drawFunction(function(x) { return fa + slope * (x - a); }, a - 1, a + dx + 0.5, viz.colors.red, 1.5);

                            // dx segment on x-axis
                            viz.drawSegment(a, fa, a + dx, fa, viz.colors.teal, 2);
                            viz.drawText('dx', a + dx / 2, fa - 0.3, viz.colors.teal, 12);

                            // dy (tangent line rise)
                            viz.drawSegment(a + dx, fa, a + dx, fa + dy, viz.colors.red, 2.5);
                            viz.drawText('dy', a + dx + 0.3, fa + dy / 2, viz.colors.red, 12);

                            // Delta y (actual curve rise)
                            viz.drawSegment(a + dx, fa, a + dx, fa + deltaY, viz.colors.yellow, 2, true);
                            viz.drawText('\u0394y', a + dx + 0.8, fa + deltaY / 2, viz.colors.yellow, 12);

                            // Points
                            viz.drawPoint(a, fa, viz.colors.orange, '', 6);
                            viz.drawPoint(a + dx, fa + dy, viz.colors.red, 'L', 4);
                            viz.drawPoint(a + dx, fa + deltaY, viz.colors.blue, 'f', 4);

                            viz.screenText('f(x) = x\u00B2    dy = ' + dy.toFixed(3) + '    \u0394y = ' + deltaY.toFixed(3) + '    error = ' + Math.abs(deltaY - dy).toFixed(4), viz.width / 2, viz.height - 12, viz.colors.text, 11);
                            viz.screenText('Differentials: dy approximates \u0394y', viz.width / 2, 18, viz.colors.white, 13);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch06-ex10',
                    type: 'numeric',
                    question: 'Use linear approximation to estimate (1.02)^5. (Hint: use (1+x)^n approximation with x = 0.02, n = 5.)',
                    answer: 1.1,
                    tolerance: 0.01,
                    hint: '(1+x)^n ~ 1 + nx for small x. Here x = 0.02, n = 5.',
                    explanation: '(1.02)^5 ~ 1 + 5(0.02) = 1 + 0.10 = 1.10. (Exact value is about 1.10408.)'
                },
                {
                    id: 'ch06-ex11',
                    type: 'numeric',
                    question: 'Use differentials to approximate the change in the volume V = (4/3)pi*r^3 of a sphere when r changes from 5 to 5.1. Give dV rounded to one decimal place.',
                    answer: 31.4,
                    tolerance: 0.5,
                    hint: 'dV = V\'(r) dr = 4pi*r^2 * dr. Use r = 5, dr = 0.1.',
                    explanation: 'dV = 4pi(5)^2(0.1) = 4pi(25)(0.1) = 10pi ~ 31.4.'
                },
                {
                    id: 'ch06-ex12',
                    type: 'multiple-choice',
                    question: 'Which linearization is correct for e^x at a = 0?',
                    options: ['L(x) = x', 'L(x) = 1 + x', 'L(x) = 1 - x', 'L(x) = e + ex'],
                    answer: 1,
                    hint: 'L(x) = f(0) + f\'(0)(x - 0). For f(x) = e^x, f(0) = 1 and f\'(0) = 1.',
                    explanation: 'f(0) = e^0 = 1, f\'(0) = e^0 = 1. L(x) = 1 + 1*(x - 0) = 1 + x.'
                }
            ]
        },

        /* ============================================================
           SECTION 5: Related Rates
           ============================================================ */
        {
            id: 'ch06-sec05',
            title: 'Related Rates',
            content: `
<h2>Related Rates</h2>

<p><strong>Section roadmap.</strong>
Linear approximation showed how a small change \\(dx\\) produces a proportional change \\(dy \\approx f'(x)\\,dx\\). Related rates extends this idea to multiple quantities that all change with time. By differentiating a geometric or physical relationship with respect to \\(t\\), we connect the rates of change of different variables through the chain rule.</p>

<p><strong>Motivation.</strong>
In the real world, variables rarely change in isolation. When a balloon inflates, its radius, surface area, and volume all change simultaneously. When a ladder slides, horizontal and vertical positions are linked by the Pythagorean theorem. Related rates problems let us find one rate from another.</p>

<p>In a <strong>related rates</strong> problem, we have several quantities that are changing with time, linked by an equation. We use <strong>implicit differentiation with respect to time</strong> to find how the rate of change of one quantity is related to the rates of change of the others.</p>

<div class="concept-box">
<h3>Strategy for Related Rates Problems</h3>
<ol>
  <li><strong>Draw a picture</strong> and label all quantities that change with time as functions of \\(t\\).</li>
  <li>Write an <strong>equation</strong> relating the variables.</li>
  <li><strong>Differentiate both sides</strong> with respect to \\(t\\) (using the chain rule).</li>
  <li>Substitute the <strong>known values</strong> and solve for the unknown rate.</li>
</ol>
</div>

<h3>Example 1: Expanding Circle</h3>
<p>A stone dropped into a pond creates a circular ripple whose radius increases at \\(\\frac{dr}{dt} = 3\\) m/s. How fast is the area increasing when \\(r = 10\\) m?</p>
\\[A = \\pi r^2 \\implies \\frac{dA}{dt} = 2\\pi r \\cdot \\frac{dr}{dt} = 2\\pi(10)(3) = 60\\pi \\approx 188.5 \\text{ m}^2/\\text{s}\\]

<h3>Example 2: Sliding Ladder</h3>
<p>A 10 m ladder leans against a wall. The base slides away from the wall at 1 m/s. How fast is the top sliding down when the base is 6 m from the wall?</p>
\\[x^2 + y^2 = 100\\]
<p>Differentiating: \\(2x \\frac{dx}{dt} + 2y \\frac{dy}{dt} = 0\\).</p>
<p>When \\(x = 6\\), \\(y = 8\\). With \\(\\frac{dx}{dt} = 1\\):</p>
\\[2(6)(1) + 2(8)\\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -\\frac{6}{8} = -0.75 \\text{ m/s}\\]
<p>The top slides down at 0.75 m/s.</p>

<h3>Example 3: Conical Tank</h3>
<p>Water drains from a conical tank (height 10 m, radius 4 m at top) at 2 m\\(^3\\)/min. How fast is the water level dropping when \\(h = 5\\) m?</p>
<p>By similar triangles: \\(r = \\frac{2h}{5}\\). Volume: \\(V = \\frac{1}{3}\\pi r^2 h = \\frac{4\\pi h^3}{75}\\).</p>
\\[\\frac{dV}{dt} = \\frac{4\\pi}{25} h^2 \\frac{dh}{dt} \\implies \\frac{dh}{dt} = \\frac{25}{4\\pi h^2} \\cdot \\frac{dV}{dt}\\]
<p>With \\(h=5\\) and \\(\\frac{dV}{dt} = -2\\):</p>
\\[\\frac{dh}{dt} = \\frac{25}{4\\pi(25)}(-2) = \\frac{-1}{2\\pi} \\approx -0.159 \\text{ m/min}\\]

<div class="env-block intuition">
<strong>Looking ahead.</strong>
Throughout this chapter, every function we differentiated was given explicitly as \\(y = f(x)\\). But many important relationships are defined implicitly; for example, the equation \\(x^2 + y^2 = 25\\) defines a circle without ever isolating \\(y\\). In the related rates section, we already differentiated the equation \\(x^2 + y^2 = L^2\\) with respect to \\(t\\), treating both \\(x\\) and \\(y\\) as functions of time. That is a preview of implicit differentiation. In Chapter 7 we formalize this technique, extend it to parametric curves and polar coordinates, and open up a much wider class of functions we can analyze.
</div>
            `,
            visualizations: [
                {
                    id: 'ch06-viz08',
                    title: 'Sliding Ladder — Animated',
                    setup(container) {
                        var viz = new VizEngine(container, { scale: 30, originX: 80, originY: 320 });

                        var ladderLen = 10;
                        var baseSpeed = 1; // m/s
                        var baseX = 2;
                        var playing = true;

                        var controls = document.createElement('div');
                        controls.style.cssText = 'display:flex;gap:6px;margin-bottom:6px;flex-wrap:wrap;align-items:center;';
                        container.insertBefore(controls, viz.canvas);

                        VizEngine.createButton(controls, 'Play/Pause', function() { playing = !playing; });
                        VizEngine.createButton(controls, 'Reset', function() { baseX = 2; });
                        VizEngine.createSlider(controls, 'speed', 0.2, 3, baseSpeed, 0.1, function(v) { baseSpeed = v; });

                        var lastT = null;

                        function draw(t) {
                            if (lastT === null) lastT = t;
                            var dt = (t - lastT) / 1000;
                            lastT = t;

                            if (playing && baseX < ladderLen - 0.1) {
                                baseX += baseSpeed * dt;
                                if (baseX > ladderLen - 0.01) baseX = ladderLen - 0.01;
                            }

                            var topY = Math.sqrt(ladderLen * ladderLen - baseX * baseX);
                            var dydt = -baseX * baseSpeed / topY;

                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Wall
                            viz.drawSegment(0, 0, 0, 12, viz.colors.text, 3);
                            // Floor
                            viz.drawSegment(0, 0, 14, 0, viz.colors.text, 3);

                            // Ladder
                            viz.drawSegment(baseX, 0, 0, topY, viz.colors.blue, 3);
                            viz.drawPoint(baseX, 0, viz.colors.orange, 'x=' + baseX.toFixed(1), 6);
                            viz.drawPoint(0, topY, viz.colors.teal, 'y=' + topY.toFixed(1), 6);

                            // Right angle marker
                            var sz = 0.5;
                            viz.drawSegment(sz, 0, sz, sz, viz.colors.text, 1);
                            viz.drawSegment(0, sz, sz, sz, viz.colors.text, 1);

                            // Rates
                            viz.screenText('dx/dt = ' + baseSpeed.toFixed(1) + ' m/s', viz.width - 120, 30, viz.colors.orange, 13);
                            viz.screenText('dy/dt = ' + dydt.toFixed(3) + ' m/s', viz.width - 120, 50, viz.colors.teal, 13);
                            viz.screenText('x\u00B2 + y\u00B2 = ' + ladderLen + '\u00B2 = 100', viz.width / 2, 18, viz.colors.white, 13);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'ch06-viz09',
                    title: 'Expanding Circular Ripple',
                    setup(container) {
                        var viz = new VizEngine(container, { scale: 25, originX: 280, originY: 200 });

                        var drdt = 3;
                        var radius = 1;
                        var playing = true;

                        var controls = document.createElement('div');
                        controls.style.cssText = 'display:flex;gap:6px;margin-bottom:6px;flex-wrap:wrap;align-items:center;';
                        container.insertBefore(controls, viz.canvas);

                        VizEngine.createButton(controls, 'Play/Pause', function() { playing = !playing; });
                        VizEngine.createButton(controls, 'Reset', function() { radius = 1; });
                        VizEngine.createSlider(controls, 'dr/dt', 0.5, 5, drdt, 0.5, function(v) { drdt = v; });

                        var lastT = null;

                        function draw(t) {
                            if (lastT === null) lastT = t;
                            var dt = (t - lastT) / 1000;
                            lastT = t;

                            if (playing) {
                                radius += drdt * dt;
                                if (radius > 8) radius = 1;
                            }

                            var area = Math.PI * radius * radius;
                            var dAdt = 2 * Math.PI * radius * drdt;

                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw concentric circles for effect
                            for (var rr = 1; rr < radius; rr += 1.5) {
                                viz.drawCircle(0, 0, rr, null, viz.colors.blue + '33', 1);
                            }

                            // Current circle
                            viz.drawCircle(0, 0, radius, viz.colors.blue + '22', viz.colors.blue, 2.5);

                            // Radius line
                            viz.drawSegment(0, 0, radius, 0, viz.colors.orange, 2);
                            viz.drawText('r=' + radius.toFixed(1), radius / 2, -0.5, viz.colors.orange, 12);

                            // Center dot
                            viz.drawPoint(0, 0, viz.colors.white, '', 4);

                            viz.screenText('A = \u03C0r\u00B2     dA/dt = 2\u03C0r(dr/dt)', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('r = ' + radius.toFixed(2) + '    A = ' + area.toFixed(1) + '    dA/dt = ' + dAdt.toFixed(1), viz.width / 2, viz.height - 12, viz.colors.yellow, 12);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ch06-ex13',
                    type: 'numeric',
                    question: 'A balloon is being inflated at a rate of 100 cm^3/s. How fast is the radius increasing (in cm/s) when the radius is 5 cm? Round to 2 decimal places. (V = 4pi*r^3/3)',
                    answer: 0.32,
                    tolerance: 0.01,
                    hint: 'dV/dt = 4pi*r^2 * dr/dt. Solve for dr/dt when r = 5 and dV/dt = 100.',
                    explanation: 'dV/dt = 4pi*r^2 * dr/dt => dr/dt = dV/dt / (4pi*r^2) = 100 / (4pi*25) = 100/(100pi) = 1/pi ~ 0.32 cm/s.'
                },
                {
                    id: 'ch06-ex14',
                    type: 'numeric',
                    question: 'A 13-foot ladder rests against a wall. If the bottom slides away at 2 ft/s, how fast (in ft/s) is the top sliding down when the bottom is 5 ft from the wall?',
                    answer: 0.833,
                    tolerance: 0.01,
                    hint: 'x^2 + y^2 = 169. When x = 5, y = 12. Differentiate and solve for dy/dt.',
                    explanation: '2x(dx/dt) + 2y(dy/dt) = 0. 2(5)(2) + 2(12)(dy/dt) = 0 => dy/dt = -20/24 = -5/6 ~ -0.833 ft/s. The top slides down at 5/6 ft/s.'
                },
                {
                    id: 'ch06-ex15',
                    type: 'multiple-choice',
                    question: 'In a related rates problem, which step must come AFTER writing the equation relating the variables?',
                    options: [
                        'Drawing a diagram',
                        'Differentiating with respect to t',
                        'Identifying what is given',
                        'Labeling the variables'
                    ],
                    answer: 1,
                    hint: 'Think about the order of operations in the related rates strategy.',
                    explanation: 'After writing the equation, you differentiate both sides with respect to t (time), then substitute known values.'
                }
            ]
        }
    ]
});
