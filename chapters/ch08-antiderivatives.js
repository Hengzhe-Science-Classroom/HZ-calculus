// === Chapter 8: Antiderivatives (Version A) ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Antiderivatives',
    subtitle: 'Reversing differentiation: antiderivative families, basic formulas, and initial value problems',
    sections: [
        // ========== SECTION 1: Antiderivatives & Indefinite Integrals ==========
        {
            id: 'sec01-antiderivatives',
            title: 'Antiderivatives & Indefinite Integrals',
            content: `
<h2>8.1 Antiderivatives & Indefinite Integrals</h2>

<p>Throughout differential calculus we asked: <em>given a function, what is its derivative?</em> We now reverse the question entirely. Given a function \\(f\\), can we find a function \\(F\\) whose derivative is \\(f\\)?</p>

<div class="env-block definition">
<strong>Definition 8.1.1 (Antiderivative).</strong> A function \\(F\\) is called an <em>antiderivative</em> of \\(f\\) on an interval \\(I\\) if
\\[
F'(x) = f(x) \\quad \\text{for all } x \\in I.
\\]
</div>

<div class="env-block example">
<strong>Example 8.1.2.</strong> Let \\(f(x) = 2x\\). Then \\(F(x) = x^2\\) is an antiderivative because \\(F'(x) = 2x = f(x)\\). But \\(G(x) = x^2 + 5\\) is also an antiderivative, since \\(G'(x) = 2x\\) as well. In fact, \\(x^2 + C\\) for <em>any</em> constant \\(C\\) is an antiderivative of \\(2x\\).
</div>

<p>This is no coincidence. The following theorem says that all antiderivatives of a given function differ by at most a constant.</p>

<div class="env-block theorem">
<strong>Theorem 8.1.3.</strong> If \\(F\\) and \\(G\\) are both antiderivatives of \\(f\\) on an interval \\(I\\), then there exists a constant \\(C\\) such that
\\[
G(x) = F(x) + C \\quad \\text{for all } x \\in I.
\\]
</div>

<div class="env-block proof">
<strong>Proof.</strong> Let \\(H(x) = G(x) - F(x)\\). Then \\(H'(x) = G'(x) - F'(x) = f(x) - f(x) = 0\\) for all \\(x \\in I\\). By the Mean Value Theorem, a function with zero derivative on an interval is constant, so \\(H(x) = C\\) for some constant \\(C\\). \\(\\square\\)
</div>

<div class="viz-placeholder" data-viz="viz-antideriv-family"></div>

<h3>Indefinite Integral Notation</h3>

<p>The collection of <em>all</em> antiderivatives of \\(f\\) is written using the <strong>indefinite integral</strong> notation:</p>

\\[
\\int f(x)\\,dx = F(x) + C,
\\]

<p>where \\(F\\) is any particular antiderivative of \\(f\\) and \\(C\\) is an arbitrary constant (the <strong>constant of integration</strong>).</p>

<div class="env-block definition">
<strong>Definition 8.1.4 (Indefinite Integral).</strong> The <em>indefinite integral</em> \\(\\int f(x)\\,dx\\) denotes the family of all antiderivatives of \\(f\\). When we write
\\[
\\int f(x)\\,dx = F(x) + C,
\\]
we mean \\(F'(x) = f(x)\\), and \\(C\\) is an arbitrary real constant.
</div>

<div class="env-block remark">
<strong>Remark 8.1.5.</strong> The symbol \\(\\int\\) is called the <em>integral sign</em> (an elongated S, introduced by Leibniz). The function \\(f(x)\\) is the <em>integrand</em>, \\(dx\\) indicates the variable of integration, and \\(C\\) is the <em>constant of integration</em>. Note that \\(\\int f(x)\\,dx\\) is a <em>family</em> of functions, not a single function.
</div>

<div class="env-block example">
<strong>Example 8.1.6.</strong> Verify each antiderivative by differentiating:
<ul>
<li>\\(\\displaystyle\\int 3x^2\\,dx = x^3 + C\\), because \\(\\frac{d}{dx}(x^3 + C) = 3x^2\\).</li>
<li>\\(\\displaystyle\\int \\cos x\\,dx = \\sin x + C\\), because \\(\\frac{d}{dx}(\\sin x + C) = \\cos x\\).</li>
<li>\\(\\displaystyle\\int e^x\\,dx = e^x + C\\), because \\(\\frac{d}{dx}(e^x + C) = e^x\\).</li>
</ul>
</div>

<div class="env-block remark">
<strong>Remark 8.1.7 (Checking Your Work).</strong> Antidifferentiation can always be verified: differentiate your answer and confirm it equals the integrand. This is the single most important check in integration.
</div>
`,
            visualizations: [
                {
                    id: 'viz-antideriv-family',
                    title: 'Family of Antiderivatives',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 40, originY: body.clientHeight ? body.clientHeight * 0.55 : 250 });

                        let cValue = 0;
                        let showDerivative = true;
                        const numCurves = 9;

                        VizEngine.createSlider(controls, 'C (highlighted)', -4, 4, 0, 0.5, val => { cValue = val; });
                        VizEngine.createButton(controls, 'Toggle f(x)', () => { showDerivative = !showDerivative; });

                        function f(x) { return 2 * x; }
                        function F(x, c) { return x * x + c; }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const xMin = -viz.originX / viz.scale;
                            const xMax = (viz.width - viz.originX) / viz.scale;

                            // Draw family of curves in muted color
                            for (let i = 0; i < numCurves; i++) {
                                const c = -4 + i;
                                viz.drawFunction(x => F(x, c), xMin, xMax, viz.colors.purple + '44', 1.2);
                            }

                            // Draw the highlighted antiderivative
                            viz.drawFunction(x => F(x, cValue), xMin, xMax, viz.colors.blue, 3);

                            // Draw the original function f(x)
                            if (showDerivative) {
                                viz.drawFunction(f, xMin, xMax, viz.colors.orange, 2);
                                viz.screenText('f(x) = 2x', viz.width - 80, 30, viz.colors.orange, 13);
                            }

                            viz.screenText('F(x) = x' + String.fromCharCode(178) + ' + ' + cValue.toFixed(1), viz.width - 100, 55, viz.colors.blue, 13);
                            viz.screenText('Family of Antiderivatives: F(x) = x' + String.fromCharCode(178) + ' + C', viz.width / 2, 20, viz.colors.white, 14, 'center');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-8.1.1',
                    type: 'mc',
                    question: 'Which of the following is an antiderivative of f(x) = 6x?',
                    options: ['3x + C', '6x + C', '3x^2', '6x^2'],
                    answer: 2,
                    explanation: 'We need F(x) such that F\'(x) = 6x. Since d/dx(3x^2) = 6x, the answer is 3x^2. (The general antiderivative would be 3x^2 + C, but the question asks for "an" antiderivative.)'
                },
                {
                    id: 'ex-8.1.2',
                    type: 'mc',
                    question: 'If F and G are both antiderivatives of f on an interval, what can we say about F - G?',
                    options: ['F - G = 0', 'F - G is a constant', 'F - G is a linear function', 'Nothing in general'],
                    answer: 1,
                    explanation: 'By Theorem 8.1.3, if F\' = G\' = f on an interval, then (F - G)\' = 0, so F - G is a constant by the Mean Value Theorem.'
                },
                {
                    id: 'ex-8.1.3',
                    type: 'mc',
                    question: 'What does the indefinite integral notation "int f(x) dx = F(x) + C" represent?',
                    options: ['A single function F(x)', 'The area under f(x)', 'The family of all antiderivatives of f', 'The derivative of f'],
                    answer: 2,
                    explanation: 'The indefinite integral represents the entire family of antiderivatives. The +C indicates that there are infinitely many antiderivatives, differing by a constant.'
                }
            ]
        },

        // ========== SECTION 2: Basic Integration Formulas ==========
        {
            id: 'sec02-basic-formulas',
            title: 'Basic Integration Formulas',
            content: `
<h2>8.2 Basic Integration Formulas</h2>

<p>Every differentiation rule gives rise to a corresponding integration formula. We simply "read the derivative table backwards." Here we catalog the most important basic antiderivatives.</p>

<h3>The Power Rule for Integration</h3>

<div class="env-block theorem">
<strong>Theorem 8.2.1 (Power Rule for Integration).</strong> For any rational number \\(n \\ne -1\\),
\\[
\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C.
\\]
</div>

<div class="env-block proof">
<strong>Proof.</strong> Differentiate: \\(\\displaystyle\\frac{d}{dx}\\left(\\frac{x^{n+1}}{n+1}\\right) = \\frac{(n+1)x^n}{n+1} = x^n\\). \\(\\square\\)
</div>

<div class="env-block example">
<strong>Example 8.2.2.</strong>
<ul>
<li>\\(\\displaystyle\\int x^4\\,dx = \\frac{x^5}{5} + C\\)</li>
<li>\\(\\displaystyle\\int \\sqrt{x}\\,dx = \\int x^{1/2}\\,dx = \\frac{x^{3/2}}{3/2} + C = \\frac{2}{3}x^{3/2} + C\\)</li>
<li>\\(\\displaystyle\\int \\frac{1}{x^3}\\,dx = \\int x^{-3}\\,dx = \\frac{x^{-2}}{-2} + C = -\\frac{1}{2x^2} + C\\)</li>
</ul>
</div>

<h3>The Case n = -1</h3>

<div class="env-block theorem">
<strong>Theorem 8.2.3.</strong>
\\[
\\int \\frac{1}{x}\\,dx = \\ln|x| + C.
\\]
</div>

<div class="env-block remark">
<strong>Remark 8.2.4.</strong> The absolute value is necessary because \\(\\ln x\\) is only defined for \\(x > 0\\), but \\(1/x\\) is defined for all \\(x \\ne 0\\). One can verify that \\(\\frac{d}{dx}\\ln|x| = \\frac{1}{x}\\) for \\(x \\ne 0\\).
</div>

<div class="viz-placeholder" data-viz="viz-power-rule"></div>

<h3>Trigonometric Integrals</h3>

<div class="env-block theorem">
<strong>Theorem 8.2.5 (Trigonometric Antiderivatives).</strong>
\\[
\\begin{aligned}
\\int \\cos x\\,dx &= \\sin x + C & \\int \\sec^2 x\\,dx &= \\tan x + C \\\\
\\int \\sin x\\,dx &= -\\cos x + C & \\int \\csc^2 x\\,dx &= -\\cot x + C \\\\
\\int \\sec x\\tan x\\,dx &= \\sec x + C & \\int \\csc x\\cot x\\,dx &= -\\csc x + C
\\end{aligned}
\\]
</div>

<h3>Exponential and Logarithmic Integrals</h3>

<div class="env-block theorem">
<strong>Theorem 8.2.6 (Exponential Antiderivatives).</strong>
\\[
\\int e^x\\,dx = e^x + C, \\qquad \\int a^x\\,dx = \\frac{a^x}{\\ln a} + C \\quad (a > 0,\\, a \\ne 1).
\\]
</div>

<h3>Linearity of Integration</h3>

<div class="env-block theorem">
<strong>Theorem 8.2.7 (Linearity).</strong> For constants \\(a, b\\) and integrable functions \\(f, g\\):
\\[
\\int \\bigl[a\\,f(x) + b\\,g(x)\\bigr]\\,dx = a\\int f(x)\\,dx + b\\int g(x)\\,dx.
\\]
</div>

<div class="env-block example">
<strong>Example 8.2.8.</strong> Compute \\(\\displaystyle\\int (3x^2 - 4\\sin x + 5e^x)\\,dx\\).
\\[
\\int (3x^2 - 4\\sin x + 5e^x)\\,dx = 3 \\cdot \\frac{x^3}{3} + 4\\cos x + 5e^x + C = x^3 + 4\\cos x + 5e^x + C.
\\]
</div>

<div class="env-block remark">
<strong>Remark 8.2.9 (No Product or Chain Rule for Integration).</strong> Unlike differentiation, integration does <em>not</em> have a direct "product rule" or "chain rule." Techniques for handling products and compositions (substitution, integration by parts) will be developed in Chapter 11.
</div>

<h3>Table of Basic Antiderivatives</h3>

<div class="env-block definition">
<strong>Reference 8.2.10 (Quick Reference Table).</strong>
\\[
\\begin{array}{|c|c|}
\\hline
f(x) & \\int f(x)\\,dx \\\\
\\hline
x^n \\;(n\\ne -1) & \\frac{x^{n+1}}{n+1} + C \\\\
\\frac{1}{x} & \\ln|x| + C \\\\
e^x & e^x + C \\\\
a^x & \\frac{a^x}{\\ln a} + C \\\\
\\cos x & \\sin x + C \\\\
\\sin x & -\\cos x + C \\\\
\\sec^2 x & \\tan x + C \\\\
\\csc^2 x & -\\cot x + C \\\\
\\frac{1}{\\sqrt{1-x^2}} & \\arcsin x + C \\\\
\\frac{1}{1+x^2} & \\arctan x + C \\\\
\\hline
\\end{array}
\\]
</div>
`,
            visualizations: [
                {
                    id: 'viz-power-rule',
                    title: 'Power Rule: f(x) = x^n and its Antiderivative',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 40 });

                        let n = 2;
                        VizEngine.createSlider(controls, 'n', -3, 5, 2, 0.5, val => { n = val; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const xMin = -viz.originX / viz.scale;
                            const xMax = (viz.width - viz.originX) / viz.scale;

                            // Draw f(x) = x^n
                            viz.drawFunction(x => {
                                if (x === 0 && n < 0) return NaN;
                                return Math.pow(x, n);
                            }, xMin, xMax, viz.colors.orange, 2.5);

                            // Draw F(x) = x^(n+1)/(n+1) when n != -1
                            if (Math.abs(n + 1) > 0.01) {
                                viz.drawFunction(x => {
                                    if (x === 0 && n + 1 < 0) return NaN;
                                    return Math.pow(x, n + 1) / (n + 1);
                                }, xMin, xMax, viz.colors.blue, 2.5);
                                var label = 'F(x) = x^' + (n + 1).toFixed(1) + ' / ' + (n + 1).toFixed(1);
                                viz.screenText(label, viz.width - 120, 55, viz.colors.blue, 12);
                            } else {
                                // n = -1: antiderivative is ln|x|
                                viz.drawFunction(x => {
                                    if (x === 0) return NaN;
                                    return Math.log(Math.abs(x));
                                }, xMin, xMax, viz.colors.blue, 2.5);
                                viz.screenText('F(x) = ln|x|', viz.width - 90, 55, viz.colors.blue, 12);
                            }

                            viz.screenText('f(x) = x^' + n.toFixed(1), viz.width - 90, 30, viz.colors.orange, 12);
                            viz.screenText('Power Rule for Integration', viz.width / 2, 20, viz.colors.white, 14, 'center');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-8.2.1',
                    type: 'mc',
                    question: 'Evaluate the integral: int x^7 dx',
                    options: ['x^8/8 + C', '7x^6 + C', 'x^8/7 + C', '8x^8 + C'],
                    answer: 0,
                    explanation: 'By the power rule, int x^n dx = x^(n+1)/(n+1) + C. With n = 7, we get x^8/8 + C.'
                },
                {
                    id: 'ex-8.2.2',
                    type: 'mc',
                    question: 'Evaluate: int (4x^3 - 2cos(x)) dx',
                    options: ['12x^2 + 2sin(x) + C', 'x^4 - 2sin(x) + C', '4x^4/4 + 2sin(x) + C', 'x^4 + 2sin(x) + C'],
                    answer: 1,
                    explanation: 'Using linearity, int 4x^3 dx = x^4, and int -2cos(x) dx = -2sin(x). So the answer is x^4 - 2sin(x) + C.'
                },
                {
                    id: 'ex-8.2.3',
                    type: 'mc',
                    question: 'Which integral requires the formula int 1/x dx = ln|x| + C?',
                    options: ['int x^0 dx', 'int x^(-1) dx', 'int x^(-2) dx', 'int ln(x) dx'],
                    answer: 1,
                    explanation: 'The power rule int x^n dx = x^(n+1)/(n+1) + C fails when n = -1 because we would divide by zero. The case n = -1 (i.e., int x^(-1) dx = int 1/x dx) requires the special formula ln|x| + C.'
                },
                {
                    id: 'ex-8.2.4',
                    type: 'mc',
                    question: 'Evaluate: int (3/x + 2e^x) dx',
                    options: ['3ln|x| + 2e^x + C', '-3/x^2 + 2e^x + C', '3ln(x) + e^(2x) + C', '3/x + 2e^x + C'],
                    answer: 0,
                    explanation: 'By linearity, int 3/x dx = 3 ln|x| and int 2e^x dx = 2e^x. So the result is 3ln|x| + 2e^x + C.'
                }
            ]
        },

        // ========== SECTION 3: Initial Value Problems ==========
        {
            id: 'sec03-initial-value',
            title: 'Initial Value Problems',
            content: `
<h2>8.3 Initial Value Problems</h2>

<p>An indefinite integral gives us a <em>family</em> of functions (differing by a constant \\(C\\)). In applications, we often have additional information that pins down the specific member of the family. This is the idea behind an <strong>initial value problem</strong>.</p>

<div class="env-block definition">
<strong>Definition 8.3.1 (Initial Value Problem).</strong> An <em>initial value problem</em> (IVP) consists of:
<ol>
<li>A differential equation: \\(F'(x) = f(x)\\)</li>
<li>An initial condition: \\(F(x_0) = y_0\\)</li>
</ol>
The goal is to find the unique function \\(F\\) satisfying both conditions.
</div>

<div class="env-block theorem">
<strong>Theorem 8.3.2 (Existence and Uniqueness).</strong> If \\(f\\) is continuous on an interval \\(I\\) containing \\(x_0\\), then the initial value problem
\\[
F'(x) = f(x), \\quad F(x_0) = y_0
\\]
has exactly one solution on \\(I\\).
</div>

<div class="env-block proof">
<strong>Proof sketch.</strong> The general antiderivative is \\(F(x) = G(x) + C\\) where \\(G\\) is any particular antiderivative. The condition \\(F(x_0) = y_0\\) gives \\(G(x_0) + C = y_0\\), so \\(C = y_0 - G(x_0)\\). This determines \\(C\\) uniquely. \\(\\square\\)
</div>

<div class="viz-placeholder" data-viz="viz-ivp"></div>

<div class="env-block example">
<strong>Example 8.3.3.</strong> Solve the IVP: \\(F'(x) = 3x^2 - 4x + 1\\), \\(F(1) = 2\\).

<strong>Step 1:</strong> Find the general antiderivative:
\\[
F(x) = \\int (3x^2 - 4x + 1)\\,dx = x^3 - 2x^2 + x + C.
\\]

<strong>Step 2:</strong> Apply the initial condition \\(F(1) = 2\\):
\\[
(1)^3 - 2(1)^2 + (1) + C = 2 \\implies 1 - 2 + 1 + C = 2 \\implies C = 2.
\\]

<strong>Solution:</strong> \\(F(x) = x^3 - 2x^2 + x + 2\\).
</div>

<div class="env-block example">
<strong>Example 8.3.4.</strong> Solve: \\(F'(x) = \\cos x\\), \\(F(0) = 3\\).

General antiderivative: \\(F(x) = \\sin x + C\\).

Apply \\(F(0) = 3\\): \\(\\sin 0 + C = 3\\), so \\(C = 3\\).

Solution: \\(F(x) = \\sin x + 3\\).
</div>

<div class="env-block example">
<strong>Example 8.3.5 (Second-Order IVP).</strong> Suppose \\(F''(x) = 6x\\), \\(F'(0) = 4\\), \\(F(0) = 1\\).

<strong>Step 1:</strong> Integrate once: \\(F'(x) = \\int 6x\\,dx = 3x^2 + C_1\\). Using \\(F'(0) = 4\\): \\(C_1 = 4\\), so \\(F'(x) = 3x^2 + 4\\).

<strong>Step 2:</strong> Integrate again: \\(F(x) = \\int (3x^2 + 4)\\,dx = x^3 + 4x + C_2\\). Using \\(F(0) = 1\\): \\(C_2 = 1\\), so \\(F(x) = x^3 + 4x + 1\\).
</div>

<div class="env-block remark">
<strong>Remark 8.3.6.</strong> An \\(n\\)-th order IVP (involving \\(F^{(n)}\\)) requires \\(n\\) initial conditions to determine all \\(n\\) constants of integration. Each integration step introduces one new constant that must be resolved by a corresponding condition.
</div>
`,
            visualizations: [
                {
                    id: 'viz-ivp',
                    title: 'Initial Value Problem: Selecting from the Family',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 35, originY: body.clientHeight ? body.clientHeight * 0.6 : 260 });

                        let x0 = 1, y0 = 2;
                        const pt = viz.addDraggable('ivp-pt', x0, y0, viz.colors.green, 8, (wx, wy) => {
                            x0 = wx; y0 = wy;
                        });

                        // f(x) = 3x^2 - 4x + 1, F(x) = x^3 - 2x^2 + x + C
                        function f(x) { return 3 * x * x - 4 * x + 1; }
                        function F(x, c) { return x * x * x - 2 * x * x + x + c; }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var xMin = -viz.originX / viz.scale;
                            var xMax = (viz.width - viz.originX) / viz.scale;

                            // Determine C from the dragged point
                            var cSolved = y0 - (x0 * x0 * x0 - 2 * x0 * x0 + x0);

                            // Draw family (ghost curves)
                            for (var i = -4; i <= 4; i++) {
                                viz.drawFunction(function(x) { return F(x, i); }, xMin, xMax, viz.colors.purple + '33', 1);
                            }

                            // Draw the specific solution
                            viz.drawFunction(function(x) { return F(x, cSolved); }, xMin, xMax, viz.colors.blue, 3);

                            // Draw the original f(x)
                            viz.drawFunction(f, xMin, xMax, viz.colors.orange, 1.5);

                            // Draw the initial condition point
                            viz.drawPoint(x0, y0, viz.colors.green, '(' + x0.toFixed(1) + ', ' + y0.toFixed(1) + ')', 6);

                            viz.screenText("f(x) = 3x" + String.fromCharCode(178) + " - 4x + 1", viz.width - 120, 30, viz.colors.orange, 12);
                            viz.screenText("C = " + cSolved.toFixed(2), viz.width - 70, 55, viz.colors.blue, 13);
                            viz.screenText('Drag the green point to set the initial condition', viz.width / 2, viz.height - 15, viz.colors.text, 11, 'center');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-8.3.1',
                    type: 'mc',
                    question: 'Solve the IVP: F\'(x) = 4x, F(0) = 5. What is F(x)?',
                    options: ['2x^2 + 5', '4x^2 + 5', '2x^2', '4x + 5'],
                    answer: 0,
                    explanation: 'The general antiderivative is F(x) = 2x^2 + C. Using F(0) = 5, we get 0 + C = 5, so C = 5. Thus F(x) = 2x^2 + 5.'
                },
                {
                    id: 'ex-8.3.2',
                    type: 'mc',
                    question: 'For the IVP: F\'(x) = e^x, F(0) = 0, what is F(x)?',
                    options: ['e^x', 'e^x + 1', 'e^x - 1', 'xe^x'],
                    answer: 2,
                    explanation: 'General antiderivative: F(x) = e^x + C. From F(0) = 0: e^0 + C = 0, so 1 + C = 0, giving C = -1. Thus F(x) = e^x - 1.'
                },
                {
                    id: 'ex-8.3.3',
                    type: 'mc',
                    question: 'If F\'\'(x) = 2, F\'(0) = 3, and F(0) = 1, what is F(x)?',
                    options: ['x^2 + 3x + 1', '2x^2 + 3x + 1', 'x^2 + 3x', '2x + 3'],
                    answer: 0,
                    explanation: 'First integration: F\'(x) = 2x + C1. F\'(0) = 3 gives C1 = 3, so F\'(x) = 2x + 3. Second integration: F(x) = x^2 + 3x + C2. F(0) = 1 gives C2 = 1. So F(x) = x^2 + 3x + 1.'
                }
            ]
        },

        // ========== SECTION 4: Motion Problems ==========
        {
            id: 'sec04-motion',
            title: 'Motion Problems',
            content: `
<h2>8.4 Motion Problems</h2>

<p>The most natural application of antiderivatives is in <strong>kinematics</strong> (the study of motion). The key relationships between position, velocity, and acceleration are:</p>

\\[
\\boxed{\\text{position } s(t) \\xrightarrow{\\text{differentiate}} \\text{velocity } v(t) = s'(t) \\xrightarrow{\\text{differentiate}} \\text{acceleration } a(t) = v'(t) = s''(t)}
\\]

<p>Reading this chain in reverse gives the integration relationships:</p>

\\[
\\boxed{a(t) \\xrightarrow{\\text{integrate}} v(t) = \\int a(t)\\,dt \\xrightarrow{\\text{integrate}} s(t) = \\int v(t)\\,dt}
\\]

<div class="env-block definition">
<strong>Definition 8.4.1.</strong> For an object moving along a line:
<ul>
<li><strong>Position</strong> \\(s(t)\\): location at time \\(t\\)</li>
<li><strong>Velocity</strong> \\(v(t) = s'(t)\\): rate of change of position (signed: positive = right/up, negative = left/down)</li>
<li><strong>Speed</strong> \\(|v(t)|\\): magnitude of velocity</li>
<li><strong>Acceleration</strong> \\(a(t) = v'(t) = s''(t)\\): rate of change of velocity</li>
</ul>
</div>

<div class="viz-placeholder" data-viz="viz-motion"></div>

<div class="env-block example">
<strong>Example 8.4.2 (Free Fall).</strong> An object is dropped from a height of 100 meters. Near the Earth's surface, acceleration due to gravity is \\(a(t) = -9.8\\) m/s\\(^2\\) (downward). Find the position and velocity as functions of time.

<strong>Given:</strong> \\(a(t) = -9.8\\), \\(v(0) = 0\\) (dropped, not thrown), \\(s(0) = 100\\).

<strong>Step 1:</strong> \\(v(t) = \\int (-9.8)\\,dt = -9.8t + C_1\\). From \\(v(0) = 0\\): \\(C_1 = 0\\), so \\(v(t) = -9.8t\\).

<strong>Step 2:</strong> \\(s(t) = \\int (-9.8t)\\,dt = -4.9t^2 + C_2\\). From \\(s(0) = 100\\): \\(C_2 = 100\\), so \\(s(t) = -4.9t^2 + 100\\).

The object hits the ground when \\(s(t) = 0\\): \\(-4.9t^2 + 100 = 0 \\implies t = \\sqrt{100/4.9} \\approx 4.52\\) seconds.
</div>

<div class="env-block example">
<strong>Example 8.4.3 (Thrown Ball).</strong> A ball is thrown upward from ground level with initial velocity 20 m/s.

<strong>Given:</strong> \\(a(t) = -9.8\\), \\(v(0) = 20\\), \\(s(0) = 0\\).

\\(v(t) = -9.8t + 20\\). The ball reaches maximum height when \\(v(t) = 0\\): \\(t = 20/9.8 \\approx 2.04\\) s.

\\(s(t) = -4.9t^2 + 20t\\). Maximum height: \\(s(2.04) \\approx 20.4\\) m.
</div>

<div class="env-block example">
<strong>Example 8.4.4 (Variable Acceleration).</strong> A particle moves along the \\(x\\)-axis with acceleration \\(a(t) = 6t - 2\\), initial velocity \\(v(0) = 1\\), and initial position \\(s(0) = 0\\).

\\(v(t) = \\int (6t - 2)\\,dt = 3t^2 - 2t + C_1\\). From \\(v(0) = 1\\): \\(C_1 = 1\\), so \\(v(t) = 3t^2 - 2t + 1\\).

\\(s(t) = \\int (3t^2 - 2t + 1)\\,dt = t^3 - t^2 + t + C_2\\). From \\(s(0) = 0\\): \\(C_2 = 0\\), so \\(s(t) = t^3 - t^2 + t\\).
</div>

<div class="env-block remark">
<strong>Remark 8.4.5 (From Acceleration to Position: Two Integrations).</strong> Going from acceleration to position requires <em>two</em> integrations, hence <em>two</em> initial conditions (initial velocity and initial position). This is precisely the second-order IVP structure we saw in Example 8.3.5.
</div>
`,
            visualizations: [
                {
                    id: 'viz-motion',
                    title: 'Motion: From Acceleration to Position',
                    setup(body, controls) {
                        const viz = new VizEngine(body, {
                            scale: 30,
                            originX: 80,
                            originY: body.clientHeight ? body.clientHeight * 0.75 : 300
                        });

                        let v0 = 20;
                        let s0 = 0;
                        const g = 9.8;
                        let showWhich = 'all'; // 'all', 'position', 'velocity', 'accel'

                        VizEngine.createSlider(controls, 'v(0) m/s', -30, 30, 20, 1, val => { v0 = val; });
                        VizEngine.createSlider(controls, 's(0) m', -20, 50, 0, 1, val => { s0 = val; });
                        VizEngine.createButton(controls, 'Show All', () => { showWhich = 'all'; });
                        VizEngine.createButton(controls, 'Position Only', () => { showWhich = 'position'; });
                        VizEngine.createButton(controls, 'Velocity Only', () => { showWhich = 'velocity'; });

                        function accel(t) { return -g; }
                        function vel(t) { return -g * t + v0; }
                        function pos(t) { return -0.5 * g * t * t + v0 * t + s0; }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var tMax = 6;

                            // Draw acceleration
                            if (showWhich === 'all' || showWhich === 'accel') {
                                viz.drawFunction(accel, 0, tMax, viz.colors.red, 2);
                                viz.screenText('a(t) = -9.8', viz.width - 80, 30, viz.colors.red, 11);
                            }

                            // Draw velocity
                            if (showWhich === 'all' || showWhich === 'velocity') {
                                viz.drawFunction(vel, 0, tMax, viz.colors.orange, 2.5);
                                viz.screenText('v(t) = -9.8t + ' + v0.toFixed(0), viz.width - 110, 50, viz.colors.orange, 11);
                            }

                            // Draw position
                            if (showWhich === 'all' || showWhich === 'position') {
                                viz.drawFunction(pos, 0, tMax, viz.colors.blue, 3);
                                viz.screenText('s(t) = -4.9t' + String.fromCharCode(178) + ' + ' + v0.toFixed(0) + 't + ' + s0.toFixed(0), viz.width - 150, 70, viz.colors.blue, 11);
                            }

                            // Time axis label
                            viz.screenText('t (seconds)', viz.width - 60, viz.originY + 20, viz.colors.text, 11);

                            // Mark the peak of position
                            if (v0 > 0) {
                                var tPeak = v0 / g;
                                var sPeak = pos(tPeak);
                                if (showWhich === 'all' || showWhich === 'position') {
                                    viz.drawPoint(tPeak, sPeak, viz.colors.green, 'peak', 4);
                                    viz.drawSegment(tPeak, 0, tPeak, sPeak, viz.colors.green + '66', 1, true);
                                }
                            }

                            viz.screenText('Motion: integrate a(t) to get v(t), then s(t)', viz.width / 2, 14, viz.colors.white, 13, 'center');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-8.4.1',
                    type: 'mc',
                    question: 'A particle has acceleration a(t) = 4, v(0) = -3, s(0) = 2. What is s(t)?',
                    options: ['2t^2 - 3t + 2', '4t^2 - 3t + 2', '2t^2 + 3t + 2', '4t - 3'],
                    answer: 0,
                    explanation: 'v(t) = int 4 dt = 4t + C1. v(0) = -3 gives C1 = -3, so v(t) = 4t - 3. Then s(t) = int (4t - 3) dt = 2t^2 - 3t + C2. s(0) = 2 gives C2 = 2. So s(t) = 2t^2 - 3t + 2.'
                },
                {
                    id: 'ex-8.4.2',
                    type: 'mc',
                    question: 'An object in free fall has a(t) = -9.8, v(0) = 0, s(0) = 45. When does it hit the ground (s = 0)?',
                    options: ['t = sqrt(45/9.8) approx 2.14 s', 't = sqrt(90/9.8) approx 3.03 s', 't = 45/9.8 approx 4.59 s', 't = sqrt(45/4.9) approx 3.03 s'],
                    answer: 3,
                    explanation: 's(t) = -4.9t^2 + 45 = 0 gives t^2 = 45/4.9, so t = sqrt(45/4.9) approx 3.03 seconds.'
                },
                {
                    id: 'ex-8.4.3',
                    type: 'mc',
                    question: 'A ball is thrown upward with v(0) = 30 m/s. How high does it go? (Use g = 10 m/s^2 for simplicity.)',
                    options: ['30 m', '45 m', '90 m', '15 m'],
                    answer: 1,
                    explanation: 'v(t) = -10t + 30. At the peak, v = 0, so t = 3 s. s(t) = -5t^2 + 30t (with s(0) = 0). s(3) = -5(9) + 30(3) = -45 + 90 = 45 m.'
                }
            ]
        },

        // ========== SECTION 5: Differential Equations Preview ==========
        {
            id: 'sec05-diff-eq-preview',
            title: 'Differential Equations Preview',
            content: `
<h2>8.5 Differential Equations Preview</h2>

<p>Finding antiderivatives is actually a special case of a much broader problem: solving <strong>differential equations</strong>. A differential equation is any equation involving an unknown function and its derivatives.</p>

<div class="env-block definition">
<strong>Definition 8.5.1 (Ordinary Differential Equation).</strong> An <em>ordinary differential equation</em> (ODE) is an equation of the form
\\[
F\\bigl(x,\\, y,\\, y',\\, y'',\\, \\ldots,\\, y^{(n)}\\bigr) = 0,
\\]
where \\(y = y(x)\\) is the unknown function. The <em>order</em> of the ODE is the highest derivative that appears.
</div>

<div class="env-block example">
<strong>Example 8.5.2.</strong> The equation \\(\\frac{dy}{dx} = f(x)\\) is a <em>first-order</em> ODE. Its solution is simply the antiderivative: \\(y = \\int f(x)\\,dx\\). Everything in this chapter so far has been about this simplest type of ODE.
</div>

<h3>Separable Equations</h3>

<p>A slightly more interesting type of first-order ODE has the form</p>
\\[
\\frac{dy}{dx} = g(x) \\cdot h(y),
\\]
<p>where the right side factors as a function of \\(x\\) alone times a function of \\(y\\) alone. Such equations are called <strong>separable</strong>.</p>

<div class="env-block definition">
<strong>Definition 8.5.3 (Separable ODE).</strong> A first-order ODE is <em>separable</em> if it can be written as
\\[
\\frac{dy}{dx} = g(x) \\cdot h(y).
\\]
</div>

<div class="env-block theorem">
<strong>Method 8.5.4 (Separation of Variables).</strong> To solve \\(\\frac{dy}{dx} = g(x) \\cdot h(y)\\) when \\(h(y) \\ne 0\\):

<strong>Step 1:</strong> Separate the variables: \\(\\displaystyle\\frac{dy}{h(y)} = g(x)\\,dx\\).

<strong>Step 2:</strong> Integrate both sides: \\(\\displaystyle\\int \\frac{1}{h(y)}\\,dy = \\int g(x)\\,dx\\).

<strong>Step 3:</strong> Solve for \\(y\\) (if possible) and apply any initial condition.
</div>

<div class="viz-placeholder" data-viz="viz-direction-field"></div>

<div class="env-block example">
<strong>Example 8.5.5.</strong> Solve \\(\\frac{dy}{dx} = 2xy\\), \\(y(0) = 1\\).

This is separable with \\(g(x) = 2x\\) and \\(h(y) = y\\).

<strong>Step 1:</strong> \\(\\displaystyle\\frac{dy}{y} = 2x\\,dx\\).

<strong>Step 2:</strong> \\(\\displaystyle\\int \\frac{dy}{y} = \\int 2x\\,dx \\implies \\ln|y| = x^2 + C\\).

<strong>Step 3:</strong> \\(|y| = e^{x^2 + C} = e^C \\cdot e^{x^2}\\). Writing \\(A = \\pm e^C\\), we get \\(y = Ae^{x^2}\\).

Apply \\(y(0) = 1\\): \\(1 = Ae^0 = A\\), so \\(y = e^{x^2}\\).
</div>

<div class="env-block example">
<strong>Example 8.5.6.</strong> Solve \\(\\frac{dy}{dx} = -\\frac{x}{y}\\), \\(y(3) = 4\\).

Separate: \\(y\\,dy = -x\\,dx\\). Integrate: \\(\\frac{y^2}{2} = -\\frac{x^2}{2} + C\\), or \\(x^2 + y^2 = 2C\\).

Apply \\(y(3) = 4\\): \\(9 + 16 = 2C\\), so \\(2C = 25\\). The solution is \\(x^2 + y^2 = 25\\), i.e., the circle of radius 5.
</div>

<div class="env-block remark">
<strong>Remark 8.5.7 (Looking Ahead).</strong> The study of differential equations is a vast subject. In this course we will develop the integral tools needed in Chapters 9-12, and return to ODEs more systematically in Chapter 19. Separable equations are just the beginning; other techniques include integrating factors, exact equations, and series solutions.
</div>

<div class="env-block remark">
<strong>Remark 8.5.8 (Growth and Decay).</strong> The separable ODE \\(\\frac{dy}{dt} = ky\\) (where \\(k\\) is a constant) models exponential growth (\\(k > 0\\)) and decay (\\(k < 0\\)). Its solution is \\(y = y_0 e^{kt}\\). This single equation describes radioactive decay, population growth, compound interest, Newton's law of cooling, and many other natural phenomena.
</div>
`,
            visualizations: [
                {
                    id: 'viz-direction-field',
                    title: 'Direction Field and Solution Curves',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 40 });

                        let equation = 'growth'; // 'growth', 'circle', 'custom'
                        let showSolution = true;
                        let x0 = 0, y0 = 1;

                        var pt = viz.addDraggable('ode-pt', x0, y0, viz.colors.green, 8, function(wx, wy) {
                            x0 = wx; y0 = wy;
                        });

                        VizEngine.createButton(controls, 'dy/dx = y', function() { equation = 'growth'; });
                        VizEngine.createButton(controls, 'dy/dx = -x/y', function() { equation = 'circle'; });
                        VizEngine.createButton(controls, 'dy/dx = x-y', function() { equation = 'custom'; });
                        VizEngine.createButton(controls, 'Toggle Solution', function() { showSolution = !showSolution; });

                        function getSlope(x, y) {
                            if (equation === 'growth') return y;
                            if (equation === 'circle') return (Math.abs(y) < 0.01) ? NaN : -x / y;
                            if (equation === 'custom') return x - y;
                            return y;
                        }

                        function getLabel() {
                            if (equation === 'growth') return 'dy/dx = y';
                            if (equation === 'circle') return 'dy/dx = -x/y';
                            if (equation === 'custom') return 'dy/dx = x - y';
                            return '';
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var xMin = -viz.originX / viz.scale;
                            var xMax = (viz.width - viz.originX) / viz.scale;
                            var yMin = -(viz.height - viz.originY) / viz.scale;
                            var yMax = viz.originY / viz.scale;

                            // Draw direction field
                            viz.drawDirectionField(getSlope, xMin, xMax, yMin, yMax, 20, 14);

                            // Draw solution curve using Euler's method from the dragged point
                            if (showSolution) {
                                // Forward
                                viz.drawODESolution(getSlope, x0, y0, xMax + 1, viz.colors.blue, 2.5, 800);
                                // Backward
                                viz.drawODESolution(getSlope, x0, y0, xMin - 1, viz.colors.blue, 2.5, 800);
                            }

                            viz.drawPoint(x0, y0, viz.colors.green, null, 6);

                            viz.screenText(getLabel(), viz.width / 2, 18, viz.colors.white, 14, 'center');
                            viz.screenText('Drag the green point to set the initial condition', viz.width / 2, viz.height - 15, viz.colors.text, 11, 'center');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'ex-8.5.1',
                    type: 'mc',
                    question: 'Which of the following is a separable ODE?',
                    options: ['dy/dx = x + y', 'dy/dx = xy', 'dy/dx = x^2 + y^2', 'dy/dx = sin(x + y)'],
                    answer: 1,
                    explanation: 'An ODE is separable if dy/dx = g(x) * h(y). For dy/dx = xy, we have g(x) = x and h(y) = y. The others cannot be factored in this way.'
                },
                {
                    id: 'ex-8.5.2',
                    type: 'mc',
                    question: 'Solve dy/dx = 3y, y(0) = 2. What is y(x)?',
                    options: ['2e^(3x)', '3e^(2x)', '2 + 3x', 'e^(3x) + 1'],
                    answer: 0,
                    explanation: 'Separate: dy/y = 3dx. Integrate: ln|y| = 3x + C. So y = Ae^(3x). From y(0) = 2: A = 2. Thus y = 2e^(3x).'
                },
                {
                    id: 'ex-8.5.3',
                    type: 'mc',
                    question: 'The ODE dy/dt = -0.5y models which type of behavior?',
                    options: ['Exponential growth', 'Exponential decay', 'Linear growth', 'Oscillation'],
                    answer: 1,
                    explanation: 'The equation dy/dt = ky with k = -0.5 < 0 models exponential decay. Its solution is y = y_0 * e^(-0.5t), which decreases toward zero as t increases.'
                },
                {
                    id: 'ex-8.5.4',
                    type: 'mc',
                    question: 'Solve dy/dx = -x/y with y(0) = 3. What curve does the solution trace?',
                    options: ['A parabola y^2 = 9 - x^2', 'A circle x^2 + y^2 = 9', 'A line y = 3 - x', 'A hyperbola x^2 - y^2 = 9'],
                    answer: 1,
                    explanation: 'Separate: y dy = -x dx. Integrate: y^2/2 = -x^2/2 + C, so x^2 + y^2 = 2C. From y(0) = 3: 0 + 9 = 2C, so 2C = 9. The solution is x^2 + y^2 = 9, a circle of radius 3.'
                },
                {
                    id: 'ex-8.5.5',
                    type: 'mc',
                    question: 'A population grows at rate dP/dt = 0.5P with P(0) = 100. What is P(4)?',
                    options: ['200', 'approx 738.9', 'approx 271.8', '400'],
                    answer: 1,
                    explanation: 'The solution of dP/dt = kP with P(0) = P_0 is P(t) = P_0 * e^(kt). So P(t) = 100e^(0.5t) and P(4) = 100e^2 approx 738.9.'
                }
            ]
        }
    ]
});
