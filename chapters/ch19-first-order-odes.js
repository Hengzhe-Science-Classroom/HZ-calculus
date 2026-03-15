window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch19',
    number: 19,
    title: 'First-Order ODEs',
    subtitle: 'An introduction to ordinary differential equations: direction fields, separable and linear equations, and applications',
    sections: [
        // ===== SECTION 1: Direction Fields & Euler's Method =====
        {
            id: 'direction-fields-euler',
            title: 'Direction Fields & Euler\'s Method',
            content: `
<div class="env-block intuition">
<div class="env-label">Intuition &mdash; From Computing Derivatives to Finding Functions</div>
Throughout this course, we have computed derivatives and integrals of known functions. Now we face a new challenge: given an equation involving an unknown function and its derivative (for example, \\(y' = ky\\)), find the function itself. These are <strong>ordinary differential equations</strong> (ODEs), and they model everything from population growth to radioactive decay. This chapter introduces the core techniques for solving first-order ODEs, completing your calculus toolkit with the ability to recover unknown functions from information about their rates of change.
</div>

<p>
We begin with qualitative and numerical approaches: direction fields let us <em>see</em> solutions before computing them, and Euler's method provides a simple algorithm for approximation. Then we move to exact analytical methods (separable, linear, and exact equations) before closing with real-world applications that bring together ideas from across the entire course.
</p>

<h2>1 &middot; Direction Fields &amp; Euler&rsquo;s Method</h2>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Ordinary Differential Equation (ODE)</div>
An <strong>ordinary differential equation</strong> is an equation that relates a function \\(y(x)\\) to its derivatives.
A <strong>first-order ODE</strong> has the general form
\\[\\frac{dy}{dx} = f(x, y),\\]
where \\(f\\) is a given function of two variables.
</div>

<p>
A <strong>solution</strong> to the ODE is any function \\(y = \\phi(x)\\) that, when substituted, satisfies the equation
on some interval. A first-order ODE typically has infinitely many solutions forming a family of curves;
specifying an <strong>initial condition</strong> \\(y(x_0) = y_0\\) picks out exactly one member.
</p>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Initial Value Problem (IVP)</div>
An <strong>initial value problem</strong> consists of a differential equation together with an initial condition:
\\[\\frac{dy}{dx} = f(x, y), \\qquad y(x_0) = y_0.\\]
Under suitable conditions on \\(f\\) (see Section 5), the IVP has a unique solution.
</div>

<h3>Direction Fields</h3>

<p>
Before solving analytically, we can <em>visualize</em> an ODE. At every point \\((x,y)\\) in the plane, the
value \\(f(x,y)\\) tells us the slope of the solution curve passing through that point. Drawing a short
line segment with slope \\(f(x,y)\\) at each point of a grid produces a <strong>direction field</strong>
(also called a <strong>slope field</strong>).
</p>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Reading a Direction Field</div>
Think of the direction field as a &ldquo;current&rdquo; that solution curves must follow. A solution
curve is tangent to every segment it passes through. If you place a particle at \\((x_0, y_0)\\), the
direction field tells you which way the solution flows.
</div>

<div class="viz-container" data-viz="direction-field-explorer">
<div class="viz-canvas" id="direction-field-explorer"></div>
<div class="viz-controls" id="direction-field-explorer-controls"></div>
<div class="viz-caption">Direction field for dy/dx = f(x,y). Drag the orange point to trace different solution curves through new initial conditions.</div>
</div>

<h3>Euler&rsquo;s Method</h3>

<p>
When an ODE cannot be solved in closed form, we turn to <strong>numerical methods</strong>. The simplest is
<strong>Euler&rsquo;s method</strong>, which approximates the solution by taking small linear steps along the
direction field.
</p>

<div class="env-block theorem">
<div class="env-label">Euler&rsquo;s Method</div>
Given \\(y' = f(x,y)\\) with \\(y(x_0) = y_0\\) and step size \\(h\\), the iterative scheme is:
\\[x_{n+1} = x_n + h, \\qquad y_{n+1} = y_n + h \\, f(x_n, y_n).\\]
Each step moves along the tangent line at the current point by a horizontal distance \\(h\\).
</div>

<div class="env-block warning">
<div class="env-label">Warning</div>
Euler&rsquo;s method is only first-order accurate: the global error is \\(O(h)\\). A small step size improves accuracy
but requires more computations. More sophisticated methods (Runge&ndash;Kutta, etc.) achieve higher accuracy with
larger step sizes.
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Euler&rsquo;s Method by Hand</div>
Consider \\(y' = x + y\\), \\(y(0) = 1\\), with \\(h = 0.5\\).
<ul>
<li>Step 0: \\((x_0, y_0) = (0, 1)\\), \\(f(0,1) = 1\\), so \\(y_1 = 1 + 0.5(1) = 1.5\\).</li>
<li>Step 1: \\((x_1, y_1) = (0.5, 1.5)\\), \\(f(0.5, 1.5) = 2\\), so \\(y_2 = 1.5 + 0.5(2) = 2.5\\).</li>
<li>Step 2: \\((x_2, y_2) = (1.0, 2.5)\\), \\(f(1.0, 2.5) = 3.5\\), so \\(y_3 = 2.5 + 0.5(3.5) = 4.25\\).</li>
</ul>
The exact solution is \\(y = 2e^x - x - 1\\), giving \\(y(1.5) \\approx 5.96\\). With \\(h = 0.5\\) Euler gives \\(y_3 = 4.25\\), a rough estimate.
</div>

<div class="viz-container" data-viz="euler-method-viz">
<div class="viz-canvas" id="euler-method-viz"></div>
<div class="viz-controls" id="euler-method-viz-controls"></div>
<div class="viz-caption">Euler&rsquo;s method approximation (orange steps) vs. the exact solution (blue curve). Adjust the step size to see how accuracy changes.</div>
</div>
`,
            visualizations: [
                {
                    id: 'direction-field-explorer',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 40 });

                        // ODE choices: dy/dx = f(x,y)
                        const odes = [
                            { label: 'y - x', fn: (x, y) => y - x },
                            { label: 'x + y', fn: (x, y) => x + y },
                            { label: '-y', fn: (x, y) => -y },
                            { label: 'x*y', fn: (x, y) => x * y },
                            { label: 'y(1-y)', fn: (x, y) => y * (1 - y) },
                            { label: 'sin(x)*y', fn: (x, y) => Math.sin(x) * y }
                        ];
                        let currentODE = 0;

                        const pt = viz.addDraggable('ic', 0, 1, viz.colors.orange, 8);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const f = odes[currentODE].fn;
                            const xMin = -viz.originX / viz.scale;
                            const xMax = (viz.width - viz.originX) / viz.scale;
                            const yMin = -(viz.height - viz.originY) / viz.scale;
                            const yMax = viz.originY / viz.scale;

                            viz.drawDirectionField(f, xMin, xMax, yMin, yMax, 22, 16);

                            // Draw solution curve forward and backward from draggable
                            viz.drawODESolution(f, pt.x, pt.y, xMax + 1, viz.colors.blue, 2.5, 600);
                            viz.drawODESolution(f, pt.x, pt.y, xMin - 1, viz.colors.blue, 2.5, 600);

                            viz.drawDraggables();

                            viz.screenText("dy/dx = " + odes[currentODE].label, 12, 20, viz.colors.white, 14, 'left', 'top');
                            viz.screenText("(" + pt.x.toFixed(2) + ", " + pt.y.toFixed(2) + ")", 12, 40, viz.colors.orange, 12, 'left', 'top');
                        }

                        pt.onDrag = function() { draw(); };

                        // ODE selector buttons
                        odes.forEach(function(ode, i) {
                            VizEngine.createButton(controls, "dy/dx = " + ode.label, function() {
                                currentODE = i;
                                draw();
                            });
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'euler-method-viz',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 50, originX: 80, originY: 300 });

                        // ODE: y' = x + y, exact: y = 2e^x - x - 1
                        const f = function(x, y) { return x + y; };
                        const exact = function(x) { return 2 * Math.exp(x) - x - 1; };
                        let stepSize = 0.25;
                        let nSteps = 12;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw exact solution
                            viz.drawFunction(exact, -0.5, 3, viz.colors.blue, 2.5);

                            // Draw Euler steps
                            var x = 0, y = 1;
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            for (var i = 0; i < nSteps; i++) {
                                var slope = f(x, y);
                                var xNew = x + stepSize;
                                var yNew = y + stepSize * slope;
                                // Draw step: horizontal then follow tangent
                                var p1 = viz.toScreen(x, y);
                                var p2 = viz.toScreen(xNew, yNew);
                                ctx.beginPath();
                                ctx.moveTo(p1[0], p1[1]);
                                ctx.lineTo(p2[0], p2[1]);
                                ctx.stroke();
                                // Mark point
                                viz.drawPoint(x, y, viz.colors.orange, null, 3);
                                x = xNew;
                                y = yNew;
                                if (y > 15 || y < -15) break;
                            }
                            viz.drawPoint(x, y, viz.colors.orange, null, 3);

                            viz.screenText("Exact: y = 2e^x - x - 1", 12, 20, viz.colors.blue, 13, 'left', 'top');
                            viz.screenText("Euler (h = " + stepSize.toFixed(2) + ")", 12, 38, viz.colors.orange, 13, 'left', 'top');
                        }

                        VizEngine.createSlider(controls, 'Step size h', 0.05, 0.5, stepSize, 0.05, function(v) {
                            stepSize = v;
                            nSteps = Math.ceil(3 / stepSize);
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'df-ex1',
                    type: 'short-answer',
                    question: 'For the ODE dy/dx = y - x, what is the slope of the direction field at the point (2, 3)?',
                    hint: 'Substitute x = 2 and y = 3 into f(x,y) = y - x.',
                    solution: 'f(2, 3) = 3 - 2 = 1. The slope at (2, 3) is 1.'
                },
                {
                    id: 'df-ex2',
                    type: 'short-answer',
                    question: 'Use Euler\'s method with h = 0.1 and two steps to approximate y(0.2) for the IVP y\' = 2x, y(0) = 1.',
                    hint: 'Step 1: y_1 = y_0 + h*f(x_0, y_0). Step 2: y_2 = y_1 + h*f(x_1, y_1).',
                    solution: 'Step 1: f(0, 1) = 0, so y_1 = 1 + 0.1*0 = 1. Step 2: f(0.1, 1) = 0.2, so y_2 = 1 + 0.1*0.2 = 1.02. Euler gives y(0.2) approximately 1.02. The exact solution y = x^2 + 1 gives y(0.2) = 1.04.'
                },
                {
                    id: 'df-ex3',
                    type: 'short-answer',
                    question: 'On the direction field for dy/dx = -y, describe the qualitative behavior of solutions as x increases. Where are the equilibrium solutions?',
                    hint: 'What happens when y > 0? When y < 0? What value of y makes dy/dx = 0 for all x?',
                    solution: 'When y > 0, dy/dx < 0 so solutions decrease. When y < 0, dy/dx > 0 so solutions increase. All solutions approach y = 0 as x increases. The equilibrium solution is y = 0 (a constant solution where dy/dx = 0 everywhere).'
                },
                {
                    id: 'df-ex4',
                    type: 'short-answer',
                    question: 'If Euler\'s method with step size h gives a global error of O(h), roughly how much more accurate is the result if you halve the step size?',
                    hint: 'O(h) means the error is proportional to h.',
                    solution: 'Since the global error is O(h), halving the step size roughly halves the error. So the result is approximately twice as accurate.'
                }
            ]
        },

        // ===== SECTION 2: Separable Equations =====
        {
            id: 'separable-equations',
            title: 'Separable Equations',
            content: `
<h2>2 &middot; Separable Equations</h2>

<p>
Direction fields and Euler's method give us qualitative and numerical tools. Now we turn to <strong>analytical methods</strong> that produce exact formulas. The simplest class of solvable ODEs are those where the variables can be pulled apart onto opposite sides of the equation. These are the <em>separable equations</em>, and solving them reduces to performing two separate integrations, one skill you have practiced extensively in earlier chapters.
</p>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Separable Equation</div>
A first-order ODE is called <strong>separable</strong> if it can be written in the form
\\[\\frac{dy}{dx} = g(x) \\, h(y),\\]
i.e., the right-hand side factors into a function of \\(x\\) alone times a function of \\(y\\) alone.
</div>

<p>
The key idea is to &ldquo;separate variables&rdquo;: move all \\(y\\)-terms to one side and all \\(x\\)-terms to the other,
then integrate both sides:
</p>

<div class="env-block theorem">
<div class="env-label">Method &mdash; Solving Separable Equations</div>
If \\(h(y) \\neq 0\\), rewrite the equation as
\\[\\frac{1}{h(y)} \\, dy = g(x) \\, dx.\\]
Integrating both sides:
\\[\\int \\frac{1}{h(y)} \\, dy = \\int g(x) \\, dx + C.\\]
This gives an implicit (or sometimes explicit) solution for \\(y\\) as a function of \\(x\\).
</div>

<div class="env-block warning">
<div class="env-label">Warning &mdash; Lost Solutions</div>
When we divide by \\(h(y)\\), we assume \\(h(y) \\neq 0\\). Any constant \\(y = c\\) where \\(h(c) = 0\\) is an
<strong>equilibrium solution</strong> that might be lost in the separation process. Always check for these separately.
</div>

<div class="env-block example">
<div class="env-label">Example 1 &mdash; A Simple Separable Equation</div>
Solve \\(\\dfrac{dy}{dx} = xy\\).
<br><br>
Separate: \\(\\dfrac{1}{y}\\,dy = x\\,dx\\). Integrate: \\(\\ln|y| = \\dfrac{x^2}{2} + C\\).
<br>
Exponentiate: \\(|y| = e^C \\cdot e^{x^2/2}\\), so \\(y = Ae^{x^2/2}\\) where \\(A = \\pm e^C\\).
<br>
Note: \\(y = 0\\) is also a solution (equilibrium), covered by \\(A = 0\\). General solution: \\(y = Ae^{x^2/2}\\).
</div>

<div class="env-block example">
<div class="env-label">Example 2 &mdash; Logistic-Type Equation</div>
Solve \\(\\dfrac{dy}{dx} = y(1 - y)\\).
<br><br>
Separate: \\(\\dfrac{dy}{y(1-y)} = dx\\). Use partial fractions:
\\(\\dfrac{1}{y(1-y)} = \\dfrac{1}{y} + \\dfrac{1}{1-y}\\).
<br>
Integrate: \\(\\ln|y| - \\ln|1-y| = x + C\\), i.e., \\(\\ln\\left|\\dfrac{y}{1-y}\\right| = x + C\\).
<br>
Solve: \\(\\dfrac{y}{1-y} = Ke^x\\), so \\(y = \\dfrac{Ke^x}{1 + Ke^x} = \\dfrac{1}{1 + K^{-1}e^{-x}}\\).
<br>
Equilibria: \\(y = 0\\) and \\(y = 1\\).
</div>

<div class="viz-container" data-viz="separable-explorer">
<div class="viz-canvas" id="separable-explorer"></div>
<div class="viz-controls" id="separable-explorer-controls"></div>
<div class="viz-caption">Family of solutions to a separable ODE. Drag the point to see different solution curves; adjust the equation with the buttons.</div>
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Why Separation Works</div>
When \\(f(x,y) = g(x)h(y)\\), the slope at \\((x,y)\\) factors into an &ldquo;\\(x\\)-part&rdquo; and a &ldquo;\\(y\\)-part.&rdquo;
This means the ODE respects a product structure: the rate at which \\(y\\) changes can be decomposed into
an \\(x\\)-driven factor times a \\(y\\)-driven factor. Integration of each factor independently recovers the solution.
</div>
`,
            visualizations: [
                {
                    id: 'separable-explorer',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 40 });

                        const odes = [
                            { label: 'xy', fn: function(x, y) { return x * y; }, desc: "dy/dx = xy" },
                            { label: 'y(1-y)', fn: function(x, y) { return y * (1 - y); }, desc: "dy/dx = y(1-y)" },
                            { label: 'x/y', fn: function(x, y) { return Math.abs(y) < 0.01 ? NaN : x / y; }, desc: "dy/dx = x/y" },
                            { label: '-x/y (circle)', fn: function(x, y) { return Math.abs(y) < 0.01 ? NaN : -x / y; }, desc: "dy/dx = -x/y" }
                        ];
                        let currentODE = 0;

                        const pt = viz.addDraggable('ic', 0, 0.5, viz.colors.orange, 8);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var f = odes[currentODE].fn;
                            var xMin = -viz.originX / viz.scale;
                            var xMax = (viz.width - viz.originX) / viz.scale;
                            var yMin = -(viz.height - viz.originY) / viz.scale;
                            var yMax = viz.originY / viz.scale;

                            viz.drawDirectionField(f, xMin, xMax, yMin, yMax, 20, 14);

                            // Draw several solution curves for context
                            var offsets = [-2, -1, -0.5, 0.5, 1, 2];
                            for (var k = 0; k < offsets.length; k++) {
                                var yy = offsets[k];
                                viz.drawODESolution(f, 0, yy, xMax + 1, viz.colors.teal + '55', 1, 400);
                                viz.drawODESolution(f, 0, yy, xMin - 1, viz.colors.teal + '55', 1, 400);
                            }

                            // Highlighted solution from draggable IC
                            viz.drawODESolution(f, pt.x, pt.y, xMax + 1, viz.colors.blue, 2.5, 600);
                            viz.drawODESolution(f, pt.x, pt.y, xMin - 1, viz.colors.blue, 2.5, 600);

                            viz.drawDraggables();
                            viz.screenText(odes[currentODE].desc, 12, 20, viz.colors.white, 14, 'left', 'top');
                        }

                        pt.onDrag = function() { draw(); };

                        odes.forEach(function(ode, i) {
                            VizEngine.createButton(controls, ode.desc, function() {
                                currentODE = i;
                                draw();
                            });
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'sep-ex1',
                    type: 'short-answer',
                    question: 'Solve the IVP dy/dx = y^2, y(0) = 1.',
                    hint: 'Separate: dy/y^2 = dx. Integrate both sides and apply the initial condition.',
                    solution: 'Separate: y^{-2} dy = dx. Integrate: -1/y = x + C. From y(0) = 1: -1 = C, so -1/y = x - 1, giving y = 1/(1 - x). This solution blows up at x = 1 (finite-time blowup).'
                },
                {
                    id: 'sep-ex2',
                    type: 'short-answer',
                    question: 'Solve dy/dx = (1 + y^2) and identify the general solution.',
                    hint: 'Separate: dy/(1 + y^2) = dx. What is the antiderivative of 1/(1 + y^2)?',
                    solution: 'Integrate: arctan(y) = x + C, so y = tan(x + C). The general solution is y = tan(x + C) for constants C.'
                },
                {
                    id: 'sep-ex3',
                    type: 'short-answer',
                    question: 'Find all equilibrium solutions of dy/dx = y^2 - 4.',
                    hint: 'Equilibrium solutions satisfy dy/dx = 0 for all x. Set y^2 - 4 = 0.',
                    solution: 'Setting y^2 - 4 = 0 gives y = 2 and y = -2. These are the two equilibrium (constant) solutions.'
                }
            ]
        },

        // ===== SECTION 3: Linear First-Order ODEs =====
        {
            id: 'linear-first-order',
            title: 'Linear First-Order ODEs',
            content: `
<h2>3 &middot; Linear First-Order ODEs</h2>

<p>
Not every ODE is separable. When the unknown function \\(y\\) appears linearly but is mixed with functions of \\(x\\) in a way that cannot be factored, we need a different strategy. The <strong>integrating factor method</strong> handles all linear first-order ODEs, exploiting the product rule in reverse. This technique connects directly to the exponential function ideas from earlier in the course: the integrating factor is itself an exponential built from the coefficient function.
</p>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Linear First-Order ODE</div>
A first-order ODE is <strong>linear</strong> if it can be written as
\\[\\frac{dy}{dx} + P(x)\\,y = Q(x),\\]
where \\(P\\) and \\(Q\\) are given functions of \\(x\\) (not \\(y\\)). The unknown \\(y\\) and its derivative
appear only to the first power, and there are no products like \\(y \\cdot y'\\).
</div>

<p>
Unlike separable equations, the right side here involves \\(y\\) linearly mixed with functions of \\(x\\). The
universal technique for solving linear first-order ODEs is the <strong>integrating factor method</strong>.
</p>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Integrating Factor Method</div>
To solve \\(y' + P(x)y = Q(x)\\):
<ol>
<li>Compute the <strong>integrating factor</strong> \\(\\mu(x) = e^{\\int P(x)\\,dx}\\).</li>
<li>Multiply both sides by \\(\\mu\\): \\(\\mu y' + \\mu P y = \\mu Q\\).</li>
<li>Recognize the left side as \\(\\frac{d}{dx}[\\mu y]\\).</li>
<li>Integrate: \\(\\mu(x) y = \\int \\mu(x) Q(x)\\,dx + C\\).</li>
<li>Solve for \\(y\\): \\(y = \\frac{1}{\\mu(x)}\\left[\\int \\mu(x) Q(x)\\,dx + C\\right]\\).</li>
</ol>
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Why the Integrating Factor Works</div>
The integrating factor \\(\\mu\\) is chosen precisely so that the left side becomes the derivative
of a product: \\(\\frac{d}{dx}[\\mu y]\\). This is the reverse of the product rule. Once both sides are
an exact derivative, we simply integrate.
</div>

<div class="env-block example">
<div class="env-label">Example 1</div>
Solve \\(y' + 2y = e^{-x}\\).
<br><br>
Here \\(P(x) = 2\\), so \\(\\mu = e^{\\int 2\\,dx} = e^{2x}\\).
<br>
Multiply: \\(e^{2x}y' + 2e^{2x}y = e^{2x} \\cdot e^{-x} = e^x\\).
<br>
Left side: \\(\\frac{d}{dx}[e^{2x}y] = e^x\\).
<br>
Integrate: \\(e^{2x}y = e^x + C\\), so \\(y = e^{-x} + Ce^{-2x}\\).
</div>

<div class="env-block example">
<div class="env-label">Example 2</div>
Solve \\(y' - \\frac{y}{x} = x^2\\) for \\(x > 0\\).
<br><br>
Here \\(P(x) = -1/x\\), so \\(\\mu = e^{\\int -1/x\\,dx} = e^{-\\ln x} = 1/x\\).
<br>
Multiply: \\(\\frac{1}{x}y' - \\frac{1}{x^2}y = x\\), i.e., \\(\\frac{d}{dx}\\!\\left[\\frac{y}{x}\\right] = x\\).
<br>
Integrate: \\(\\frac{y}{x} = \\frac{x^2}{2} + C\\), so \\(y = \\frac{x^3}{2} + Cx\\).
</div>

<div class="viz-container" data-viz="integrating-factor-viz">
<div class="viz-canvas" id="integrating-factor-viz"></div>
<div class="viz-controls" id="integrating-factor-viz-controls"></div>
<div class="viz-caption">Solutions of the linear ODE y' + P(x)y = Q(x). Drag to set the initial condition; use sliders to change P and Q.</div>
</div>

<div class="env-block theorem">
<div class="env-label">General Solution Formula</div>
The general solution to \\(y' + P(x)y = Q(x)\\) is
\\[y(x) = \\frac{1}{\\mu(x)}\\left[\\int \\mu(x)\\,Q(x)\\,dx + C\\right], \\quad \\mu(x) = e^{\\int P(x)\\,dx}.\\]
This formula shows that the solution is the sum of a <strong>particular solution</strong> (from the integral) and
the <strong>homogeneous solution</strong> \\(Ce^{-\\int P\\,dx}\\).
</div>
`,
            visualizations: [
                {
                    id: 'integrating-factor-viz',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 40 });

                        let pVal = 1;  // constant P(x) = p
                        let qVal = 1;  // constant Q(x) = q
                        // ODE: y' + p*y = q => f(x,y) = q - p*y
                        var pt = viz.addDraggable('ic', 0, 2, viz.colors.orange, 8);

                        function f(x, y) { return qVal - pVal * y; }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var xMin = -viz.originX / viz.scale;
                            var xMax = (viz.width - viz.originX) / viz.scale;
                            var yMin = -(viz.height - viz.originY) / viz.scale;
                            var yMax = viz.originY / viz.scale;

                            viz.drawDirectionField(f, xMin, xMax, yMin, yMax, 20, 14);

                            // Several background solutions
                            var starts = [-3, -1.5, 0, 1.5, 3];
                            for (var k = 0; k < starts.length; k++) {
                                viz.drawODESolution(f, 0, starts[k], xMax + 1, viz.colors.teal + '44', 1, 400);
                                viz.drawODESolution(f, 0, starts[k], xMin - 1, viz.colors.teal + '44', 1, 400);
                            }

                            // Equilibrium line y = q/p when p != 0
                            if (Math.abs(pVal) > 0.01) {
                                var eq = qVal / pVal;
                                viz.drawSegment(xMin, eq, xMax, eq, viz.colors.red + '88', 1.5, true);
                                viz.screenText("Equilibrium y = " + eq.toFixed(2), viz.width - 10, 20, viz.colors.red, 12, 'right', 'top');
                            }

                            viz.drawODESolution(f, pt.x, pt.y, xMax + 1, viz.colors.blue, 2.5, 600);
                            viz.drawODESolution(f, pt.x, pt.y, xMin - 1, viz.colors.blue, 2.5, 600);

                            viz.drawDraggables();
                            viz.screenText("y' + " + pVal.toFixed(1) + "y = " + qVal.toFixed(1), 12, 20, viz.colors.white, 14, 'left', 'top');
                        }

                        pt.onDrag = function() { draw(); };

                        VizEngine.createSlider(controls, 'P (coeff of y)', -2, 3, pVal, 0.1, function(v) { pVal = v; draw(); });
                        VizEngine.createSlider(controls, 'Q (forcing)', -3, 3, qVal, 0.1, function(v) { qVal = v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'lin-ex1',
                    type: 'short-answer',
                    question: 'Find the integrating factor for the ODE y\' + 3y = sin(x).',
                    hint: 'The integrating factor is mu = e^{integral of P(x) dx} where P(x) = 3.',
                    solution: 'P(x) = 3, so mu(x) = e^{3x}. Multiplying gives d/dx[e^{3x} y] = e^{3x} sin(x).'
                },
                {
                    id: 'lin-ex2',
                    type: 'short-answer',
                    question: 'Solve the IVP y\' + y = 1, y(0) = 0.',
                    hint: 'Integrating factor: mu = e^x. Multiply, integrate, then apply y(0) = 0.',
                    solution: 'mu = e^x. Then d/dx[e^x y] = e^x. Integrate: e^x y = e^x + C. So y = 1 + Ce^{-x}. From y(0) = 0: 0 = 1 + C, so C = -1. Solution: y = 1 - e^{-x}.'
                },
                {
                    id: 'lin-ex3',
                    type: 'short-answer',
                    question: 'Solve y\' + (2/x)y = x for x > 0.',
                    hint: 'P(x) = 2/x, so the integrating factor is e^{2 ln x} = x^2.',
                    solution: 'mu = x^2. Then d/dx[x^2 y] = x^3. Integrate: x^2 y = x^4/4 + C. So y = x^2/4 + C/x^2.'
                },
                {
                    id: 'lin-ex4',
                    type: 'short-answer',
                    question: 'For the ODE y\' + P(x)y = Q(x), what is the long-term behavior of solutions if P(x) = k > 0 and Q(x) = 0?',
                    hint: 'The general solution when Q = 0 is y = Ce^{-kx}. What happens as x goes to infinity?',
                    solution: 'The general solution is y = Ce^{-kx}. Since k > 0, e^{-kx} tends to 0 as x goes to infinity. All solutions decay exponentially to zero.'
                }
            ]
        },

        // ===== SECTION 4: Exact Equations & Integrating Factors =====
        {
            id: 'exact-equations',
            title: 'Exact Equations & Integrating Factors',
            content: `
<h2>4 &middot; Exact Equations &amp; Integrating Factors</h2>

<p>
Separable and linear equations each exploit specific structural features. <strong>Exact equations</strong> reveal a deeper geometric principle: the ODE is secretly the level-curve equation of a potential function \\(F(x,y)\\). If you studied partial derivatives and gradient fields in Chapter 18 on vector calculus, you will recognize this immediately. The exactness test \\(M_y = N_x\\) is nothing other than the equality of mixed partials, and solving the equation amounts to reconstructing \\(F\\) from its partial derivatives.
</p>

<div class="env-block definition">
<div class="env-label">Definition &mdash; Exact Equation</div>
A first-order ODE written in differential form
\\[M(x,y)\\,dx + N(x,y)\\,dy = 0\\]
is called <strong>exact</strong> if there exists a function \\(F(x,y)\\) such that
\\[\\frac{\\partial F}{\\partial x} = M \\quad \\text{and} \\quad \\frac{\\partial F}{\\partial y} = N.\\]
The solutions are then the level curves \\(F(x,y) = C\\).
</div>

<div class="env-block theorem">
<div class="env-label">Theorem &mdash; Exactness Test</div>
If \\(M\\) and \\(N\\) have continuous first partial derivatives on a simply connected region, then
\\[M\\,dx + N\\,dy = 0 \\quad \\text{is exact} \\quad \\iff \\quad \\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}.\\]
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; The Gradient Connection</div>
An exact equation says that \\((M, N) = \\nabla F\\) for some potential function \\(F\\). The condition
\\(M_y = N_x\\) is precisely the equality of mixed partials \\(F_{xy} = F_{yx}\\), which always holds for
smooth \\(F\\). So the test checks whether \\((M, N)\\) could be a gradient field.
</div>

<div class="env-block theorem">
<div class="env-label">Method &mdash; Solving Exact Equations</div>
Given \\(M\\,dx + N\\,dy = 0\\) with \\(M_y = N_x\\):
<ol>
<li>Integrate \\(M\\) with respect to \\(x\\): \\(F(x,y) = \\int M(x,y)\\,dx + g(y)\\).</li>
<li>Differentiate with respect to \\(y\\) and set equal to \\(N\\):
   \\(\\frac{\\partial F}{\\partial y} = \\frac{\\partial}{\\partial y}\\int M\\,dx + g'(y) = N(x,y)\\).</li>
<li>Solve for \\(g'(y)\\) and integrate to find \\(g(y)\\).</li>
<li>The solution is \\(F(x,y) = C\\).</li>
</ol>
</div>

<div class="env-block example">
<div class="env-label">Example</div>
Solve \\((2xy + 3)\\,dx + (x^2 + 4y)\\,dy = 0\\).
<br><br>
Check: \\(M = 2xy + 3\\), \\(N = x^2 + 4y\\). Then \\(M_y = 2x\\) and \\(N_x = 2x\\). Since \\(M_y = N_x\\), the equation is exact.
<br><br>
Step 1: \\(F = \\int (2xy + 3)\\,dx = x^2 y + 3x + g(y)\\).
<br>
Step 2: \\(F_y = x^2 + g'(y) = x^2 + 4y\\), so \\(g'(y) = 4y\\).
<br>
Step 3: \\(g(y) = 2y^2\\).
<br>
Solution: \\(x^2 y + 3x + 2y^2 = C\\).
</div>

<h3>Integrating Factors for Non-Exact Equations</h3>

<p>
When the equation is <em>not</em> exact, we can sometimes find an <strong>integrating factor</strong>
\\(\\mu\\) that makes it exact. The most common special cases are:
</p>

<div class="env-block theorem">
<div class="env-label">Integrating Factor Formulas</div>
For \\(M\\,dx + N\\,dy = 0\\):
<ul>
<li>If \\(\\dfrac{M_y - N_x}{N}\\) depends only on \\(x\\), then \\(\\mu(x) = e^{\\int \\frac{M_y - N_x}{N}dx}\\).</li>
<li>If \\(\\dfrac{N_x - M_y}{M}\\) depends only on \\(y\\), then \\(\\mu(y) = e^{\\int \\frac{N_x - M_y}{M}dy}\\).</li>
</ul>
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Non-Exact Made Exact</div>
Solve \\(y\\,dx + (2x + y)\\,dy = 0\\).
<br><br>
Check: \\(M_y = 1\\), \\(N_x = 2\\). Since \\(1 \\neq 2\\), not exact.
<br>
Try: \\(\\dfrac{N_x - M_y}{M} = \\dfrac{2 - 1}{y} = \\dfrac{1}{y}\\), which depends only on \\(y\\).
<br>
So \\(\\mu(y) = e^{\\int 1/y\\,dy} = y\\).
<br>
Multiply: \\(y^2\\,dx + (2xy + y^2)\\,dy = 0\\). Now \\(M_y = 2y = N_x\\). Exact!
<br>
Solve: \\(F = xy^2 + \\frac{y^3}{3} = C\\).
</div>

<div class="viz-container" data-viz="exact-equation-viz">
<div class="viz-canvas" id="exact-equation-viz"></div>
<div class="viz-controls" id="exact-equation-viz-controls"></div>
<div class="viz-caption">Level curves F(x,y) = C of the potential function for an exact equation. Each curve is a solution trajectory.</div>
</div>
`,
            visualizations: [
                {
                    id: 'exact-equation-viz',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 35 });

                        // Exact equation: (2xy+3)dx + (x^2+4y)dy = 0
                        // Potential: F(x,y) = x^2*y + 3x + 2y^2
                        const examples = [
                            {
                                label: 'x^2y + 3x + 2y^2',
                                F: function(x, y) { return x * x * y + 3 * x + 2 * y * y; },
                                M: function(x, y) { return 2 * x * y + 3; },
                                N: function(x, y) { return x * x + 4 * y; }
                            },
                            {
                                label: 'x^2 + xy + y^2',
                                F: function(x, y) { return x * x + x * y + y * y; },
                                M: function(x, y) { return 2 * x + y; },
                                N: function(x, y) { return x + 2 * y; }
                            },
                            {
                                label: 'x*sin(y) + y^2',
                                F: function(x, y) { return x * Math.sin(y) + y * y; },
                                M: function(x, y) { return Math.sin(y); },
                                N: function(x, y) { return x * Math.cos(y) + 2 * y; }
                            }
                        ];
                        let currentEx = 0;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ex = examples[currentEx];
                            var ctx = viz.ctx;

                            // Draw level curves by sampling the potential function
                            var xMin = -viz.originX / viz.scale;
                            var xMax = (viz.width - viz.originX) / viz.scale;
                            var yMin = -(viz.height - viz.originY) / viz.scale;
                            var yMax = viz.originY / viz.scale;

                            // Find range of F values for nice contour levels
                            var fMin = Infinity, fMax = -Infinity;
                            for (var px = 0; px < viz.width; px += 8) {
                                for (var py = 0; py < viz.height; py += 8) {
                                    var coords = viz.toMath(px, py);
                                    var val = ex.F(coords[0], coords[1]);
                                    if (isFinite(val)) {
                                        if (val < fMin) fMin = val;
                                        if (val > fMax) fMax = val;
                                    }
                                }
                            }

                            // Draw contour lines using marching approach
                            var nLevels = 16;
                            var colors = [viz.colors.blue, viz.colors.teal, viz.colors.green, viz.colors.purple, viz.colors.orange, viz.colors.pink];
                            var resolution = 2;
                            for (var li = 0; li < nLevels; li++) {
                                var level = fMin + (fMax - fMin) * (li + 0.5) / nLevels;
                                var color = colors[li % colors.length] + '99';
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 1.5;

                                // Simple contour: scan horizontal lines for sign changes
                                for (var py = 0; py < viz.height; py += resolution) {
                                    var prevCoords = viz.toMath(0, py);
                                    var prevVal = ex.F(prevCoords[0], prevCoords[1]) - level;
                                    for (var px = resolution; px < viz.width; px += resolution) {
                                        var coords = viz.toMath(px, py);
                                        var val = ex.F(coords[0], coords[1]) - level;
                                        if (isFinite(prevVal) && isFinite(val) && prevVal * val < 0) {
                                            ctx.fillStyle = color;
                                            ctx.fillRect(px - 1, py - 1, 2, 2);
                                        }
                                        prevVal = val;
                                    }
                                }
                                // Scan vertical lines
                                for (var px = 0; px < viz.width; px += resolution) {
                                    var prevCoords2 = viz.toMath(px, 0);
                                    var prevVal2 = ex.F(prevCoords2[0], prevCoords2[1]) - level;
                                    for (var py2 = resolution; py2 < viz.height; py2 += resolution) {
                                        var coords2 = viz.toMath(px, py2);
                                        var val2 = ex.F(coords2[0], coords2[1]) - level;
                                        if (isFinite(prevVal2) && isFinite(val2) && prevVal2 * val2 < 0) {
                                            ctx.fillStyle = color;
                                            ctx.fillRect(px - 1, py2 - 1, 2, 2);
                                        }
                                        prevVal2 = val2;
                                    }
                                }
                            }

                            // Draw gradient field (M, N) lightly
                            viz.drawVectorField(
                                function(x, y) { return ex.M(x, y); },
                                function(x, y) { return ex.N(x, y); },
                                xMin + 0.5, xMax - 0.5, yMin + 0.5, yMax - 0.5, 10, 8
                            );

                            viz.screenText("F(x,y) = " + ex.label, 12, 20, viz.colors.white, 14, 'left', 'top');
                            viz.screenText("Level curves: F = C", 12, 38, viz.colors.text, 12, 'left', 'top');
                        }

                        examples.forEach(function(ex, i) {
                            VizEngine.createButton(controls, "F = " + ex.label, function() {
                                currentEx = i;
                                draw();
                            });
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'exact-ex1',
                    type: 'short-answer',
                    question: 'Test whether (3x^2 + y) dx + (x + 2y) dy = 0 is exact.',
                    hint: 'Compute dM/dy and dN/dx. Compare.',
                    solution: 'M = 3x^2 + y, N = x + 2y. M_y = 1 and N_x = 1. Since M_y = N_x, the equation is exact.'
                },
                {
                    id: 'exact-ex2',
                    type: 'short-answer',
                    question: 'Solve the exact equation (2x + y) dx + (x - 3y^2) dy = 0.',
                    hint: 'Since M_y = 1 = N_x, it is exact. Integrate M w.r.t. x to get F, then determine g(y) from the N condition.',
                    solution: 'F = integral of (2x + y) dx = x^2 + xy + g(y). Then F_y = x + g\'(y) = x - 3y^2, so g\'(y) = -3y^2, g(y) = -y^3. Solution: x^2 + xy - y^3 = C.'
                },
                {
                    id: 'exact-ex3',
                    type: 'short-answer',
                    question: 'The equation y dx + 2x dy = 0 is not exact. Find an integrating factor mu(y) and solve.',
                    hint: 'Check (N_x - M_y)/M = (2 - 1)/y = 1/y, which depends only on y. So mu(y) = e^{integral 1/y dy} = y.',
                    solution: 'Multiply by mu = y: y^2 dx + 2xy dy = 0. Now M_y = 2y = N_x. Exact! F = integral of y^2 dx = xy^2 + g(y). F_y = 2xy + g\'(y) = 2xy, so g\'(y) = 0. Solution: xy^2 = C.'
                }
            ]
        },

        // ===== SECTION 5: Applications =====
        {
            id: 'applications',
            title: 'Applications',
            content: `
<h2>5 &middot; Applications</h2>

<p>
With the analytical toolkit now complete (separable, linear, and exact methods), we turn to the reason differential equations matter: they model the real world. Every application in this section uses techniques from the previous sections, and many connect back to ideas from much earlier in the course. Exponential growth is the natural consequence of a constant relative rate of change. Newton's law of cooling is a linear first-order ODE. Mixing problems combine integration with modeling. The logistic equation ties together separable equations and partial fractions.
</p>

<p>
First-order ODEs model a vast range of real-world phenomena. Here we explore the most
classical applications.
</p>

<h3>Exponential Growth &amp; Decay</h3>

<div class="env-block theorem">
<div class="env-label">The Exponential Model</div>
If a quantity \\(y(t)\\) grows or decays at a rate proportional to its current value, then
\\[\\frac{dy}{dt} = ky,\\]
with solution \\(y(t) = y_0 e^{kt}\\), where \\(y_0 = y(0)\\).
<ul>
<li>\\(k > 0\\): exponential growth (population growth, compound interest).</li>
<li>\\(k < 0\\): exponential decay (radioactive decay, drug elimination).</li>
</ul>
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Radioactive Decay</div>
A substance has a half-life of 5 years. If the initial amount is 100 g, find the amount after 12 years.
<br><br>
From \\(y(5) = 50 = 100e^{5k}\\), we get \\(k = \\frac{\\ln(1/2)}{5} = -\\frac{\\ln 2}{5}\\).
<br>
At \\(t = 12\\): \\(y(12) = 100 \\, e^{-12\\ln 2 / 5} = 100 \\cdot 2^{-12/5} \\approx 18.9\\) g.
</div>

<h3>Newton&rsquo;s Law of Cooling</h3>

<div class="env-block theorem">
<div class="env-label">Newton&rsquo;s Law of Cooling</div>
The rate of change of an object&rsquo;s temperature \\(T\\) is proportional to the difference between \\(T\\)
and the ambient temperature \\(T_a\\):
\\[\\frac{dT}{dt} = -k(T - T_a), \\qquad k > 0.\\]
Solution: \\(T(t) = T_a + (T_0 - T_a)e^{-kt}\\), where \\(T_0 = T(0)\\).
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Cooling Coffee</div>
A cup of coffee at \\(90^\\circ\\)C is placed in a room at \\(20^\\circ\\)C. After 5 minutes it is \\(70^\\circ\\)C. When will it reach \\(40^\\circ\\)C?
<br><br>
\\(T(t) = 20 + 70e^{-kt}\\). From \\(T(5) = 70\\): \\(70 = 20 + 70e^{-5k}\\), so \\(e^{-5k} = 5/7\\),
giving \\(k = \\frac{1}{5}\\ln(7/5)\\).
<br>
Set \\(40 = 20 + 70e^{-kt}\\): \\(e^{-kt} = 2/7\\), so \\(t = \\frac{\\ln(7/2)}{k} = 5\\,\\frac{\\ln(7/2)}{\\ln(7/5)} \\approx 18.6\\) min.
</div>

<h3>Mixing Problems</h3>

<div class="env-block theorem">
<div class="env-label">Mixing Tank Model</div>
A tank contains \\(V\\) liters of solution. Brine with concentration \\(c_{\\text{in}}\\) g/L flows in at rate \\(r_{\\text{in}}\\) L/min, and the
well-stirred mixture flows out at rate \\(r_{\\text{out}}\\) L/min. If \\(Q(t)\\) is the amount of solute (in grams), then
\\[\\frac{dQ}{dt} = r_{\\text{in}} \\cdot c_{\\text{in}} - r_{\\text{out}} \\cdot \\frac{Q(t)}{V(t)},\\]
where \\(V(t) = V_0 + (r_{\\text{in}} - r_{\\text{out}})t\\). When \\(r_{\\text{in}} = r_{\\text{out}}\\), the volume is constant.
</div>

<div class="env-block example">
<div class="env-label">Example &mdash; Mixing Tank</div>
A 100-liter tank initially contains pure water. Brine with 3 g/L flows in at 2 L/min, and the well-mixed solution flows out at 2 L/min. Find \\(Q(t)\\).
<br><br>
Volume stays at 100 L. The ODE is \\(Q' = 6 - \\frac{2Q}{100} = 6 - 0.02Q\\).
<br>
This is linear: \\(Q' + 0.02Q = 6\\). Integrating factor: \\(\\mu = e^{0.02t}\\).
<br>
Solution: \\(Q(t) = 300(1 - e^{-0.02t})\\). As \\(t \\to \\infty\\), \\(Q \\to 300\\) g (the steady state is 3 g/L in 100 L).
</div>

<h3>Logistic Growth</h3>

<div class="env-block theorem">
<div class="env-label">Logistic Equation</div>
When growth is limited by a carrying capacity \\(K\\), the model becomes
\\[\\frac{dP}{dt} = rP\\left(1 - \\frac{P}{K}\\right),\\]
a separable ODE with solution
\\[P(t) = \\frac{K}{1 + \\left(\\frac{K}{P_0} - 1\\right)e^{-rt}}.\\]
</div>

<div class="env-block intuition">
<div class="env-label">Intuition &mdash; Logistic vs. Exponential</div>
For small \\(P \\ll K\\), the factor \\((1 - P/K) \\approx 1\\) and growth is nearly exponential. As \\(P\\) approaches \\(K\\), the growth rate slows and the population levels off. The inflection point (fastest growth) occurs at \\(P = K/2\\).
</div>

<div class="viz-container" data-viz="applications-viz">
<div class="viz-canvas" id="applications-viz"></div>
<div class="viz-controls" id="applications-viz-controls"></div>
<div class="viz-caption">Applications of first-order ODEs. Choose a model and adjust parameters to explore the dynamics.</div>
</div>

<div class="env-block definition">
<div class="env-label">Existence and Uniqueness (Picard&ndash;Lindel&ouml;f Theorem)</div>
If \\(f(x,y)\\) and \\(\\partial f/\\partial y\\) are continuous on a rectangle containing \\((x_0, y_0)\\), then the IVP
\\(y' = f(x,y)\\), \\(y(x_0) = y_0\\) has a <strong>unique</strong> solution on some interval around \\(x_0\\).
This guarantees that solution curves do not cross (in the region of continuity).
</div>

<div class="env-block intuition">
<div class="env-label">The Journey of Calculus</div>
From functions and limits, through derivatives and integrals, to sequences and series, multivariable calculus, vector calculus, and now differential equations, you have built a complete toolkit for analyzing continuous change. Limits taught you to make the imprecise precise. Derivatives revealed instantaneous rates of change. Integrals let you accumulate quantities and recover functions from their rates. Series showed that complicated functions can be built from simple pieces. Multivariable and vector calculus extended these ideas to higher dimensions. And now, with differential equations, you can model and solve problems where the unknown is a function constrained by its own rate of change.

<br><br>

These ideas form the foundation for virtually all of applied mathematics, physics, and engineering. Whether you continue to real analysis, probability theory, differential geometry, or applied modeling, the concepts and techniques from this course will be with you at every step. Congratulations on completing the journey.
</div>
`,
            visualizations: [
                {
                    id: 'applications-viz',
                    setup: function(container, controls) {
                        const viz = new VizEngine(container, { scale: 1, originX: 60, originY: 340 });

                        var models = ['exponential', 'cooling', 'mixing', 'logistic'];
                        var currentModel = 0;

                        // Parameters
                        var expK = 0.3;
                        var expY0 = 10;
                        var coolT0 = 90;
                        var coolTa = 20;
                        var coolK = 0.1;
                        var mixCin = 3;
                        var mixRin = 2;
                        var mixV = 100;
                        var logR = 0.5;
                        var logK = 100;
                        var logP0 = 5;

                        function drawExponential() {
                            // Scale: x = time (0-20), y = value (0-200)
                            viz.scale = 25;
                            viz.originX = 60;
                            viz.originY = 340;

                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Growth
                            viz.drawFunction(function(t) { return expY0 * Math.exp(expK * t); }, 0, 15, viz.colors.blue, 2.5);
                            // Decay
                            viz.drawFunction(function(t) { return expY0 * Math.exp(-expK * t); }, 0, 15, viz.colors.orange, 2.5);

                            viz.screenText("Exponential Growth/Decay: y = y0 * e^(kt)", 12, 20, viz.colors.white, 13, 'left', 'top');
                            viz.screenText("Growth (k > 0)", viz.width - 10, 50, viz.colors.blue, 12, 'right', 'top');
                            viz.screenText("Decay (k < 0)", viz.width - 10, 68, viz.colors.orange, 12, 'right', 'top');
                        }

                        function drawCooling() {
                            viz.scale = 3;
                            viz.originX = 60;
                            viz.originY = 340;

                            viz.clear();
                            viz.drawGrid(10);

                            // Custom axes
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(60, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();

                            // Ambient temperature line
                            var syA = viz.toScreen(0, coolTa);
                            viz.drawSegment(-10, coolTa, 200, coolTa, viz.colors.red + '88', 1.5, true);
                            viz.screenText("T_a = " + coolTa.toFixed(0), viz.width - 10, syA[1] + 4, viz.colors.red, 11, 'right', 'top');

                            viz.drawFunction(function(t) { return coolTa + (coolT0 - coolTa) * Math.exp(-coolK * t); }, 0, 80, viz.colors.blue, 2.5);

                            viz.screenText("Newton's Cooling: T(t) = Ta + (T0 - Ta)e^(-kt)", 12, 20, viz.colors.white, 13, 'left', 'top');
                        }

                        function drawMixing() {
                            viz.scale = 1.6;
                            viz.originX = 60;
                            viz.originY = 360;

                            viz.clear();
                            viz.drawGrid(50);

                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(60, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();

                            var steadyState = mixCin * mixV;
                            viz.drawSegment(-10, steadyState, 400, steadyState, viz.colors.green + '88', 1.5, true);
                            viz.screenText("Steady = " + steadyState.toFixed(0) + "g", viz.width - 10, viz.toScreen(0, steadyState)[1] - 12, viz.colors.green, 11, 'right', 'bottom');

                            var rate = mixRin / mixV;
                            viz.drawFunction(function(t) { return steadyState * (1 - Math.exp(-rate * t)); }, 0, 300, viz.colors.blue, 2.5);

                            viz.screenText("Mixing: Q(t) = cin*V*(1 - e^(-r/V * t))", 12, 20, viz.colors.white, 13, 'left', 'top');
                        }

                        function drawLogistic() {
                            viz.scale = 2.5;
                            viz.originX = 60;
                            viz.originY = 370;

                            viz.clear();
                            viz.drawGrid(10);

                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(60, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();

                            // Carrying capacity line
                            viz.drawSegment(-10, logK, 200, logK, viz.colors.red + '88', 1.5, true);
                            viz.screenText("K = " + logK.toFixed(0), viz.width - 10, viz.toScreen(0, logK)[1] - 4, viz.colors.red, 11, 'right', 'bottom');

                            // Inflection at K/2
                            viz.drawSegment(-10, logK / 2, 200, logK / 2, viz.colors.yellow + '55', 1, true);
                            viz.screenText("K/2", viz.width - 10, viz.toScreen(0, logK / 2)[1] + 4, viz.colors.yellow, 10, 'right', 'top');

                            // Draw several solution curves
                            var p0vals = [5, 15, 40, 80, 120];
                            var lineColors = [viz.colors.blue, viz.colors.teal, viz.colors.green, viz.colors.purple, viz.colors.orange];
                            for (var i = 0; i < p0vals.length; i++) {
                                var p0 = p0vals[i];
                                viz.drawFunction(function(t) {
                                    return logK / (1 + (logK / p0 - 1) * Math.exp(-logR * t));
                                }, 0, 50, lineColors[i], 2);
                            }

                            viz.screenText("Logistic: P' = rP(1 - P/K)", 12, 20, viz.colors.white, 13, 'left', 'top');
                        }

                        var drawFuncs = [drawExponential, drawCooling, drawMixing, drawLogistic];
                        var labels = ['Exponential Growth/Decay', 'Newton\'s Cooling', 'Mixing Problem', 'Logistic Growth'];

                        labels.forEach(function(label, i) {
                            VizEngine.createButton(controls, label, function() {
                                currentModel = i;
                                drawFuncs[currentModel]();
                            });
                        });

                        drawFuncs[0]();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    id: 'app-ex1',
                    type: 'short-answer',
                    question: 'A bacteria population doubles every 3 hours. If the initial population is 500, how many bacteria are there after 10 hours?',
                    hint: 'Use y = y0 * e^(kt). From y(3) = 1000, find k = ln(2)/3. Then compute y(10).',
                    solution: 'k = ln(2)/3. y(10) = 500 * e^(10 ln(2)/3) = 500 * 2^(10/3) approximately 500 * 10.08 = 5040 bacteria.'
                },
                {
                    id: 'app-ex2',
                    type: 'short-answer',
                    question: 'A hot object at 150 degrees C is placed in a room at 25 degrees C. After 10 minutes it cools to 100 degrees C. What is the cooling constant k?',
                    hint: 'T(t) = 25 + 125*e^(-kt). Use T(10) = 100 to solve for k.',
                    solution: 'T(10) = 25 + 125e^{-10k} = 100, so 125e^{-10k} = 75, e^{-10k} = 3/5, k = -ln(3/5)/10 = ln(5/3)/10 approximately 0.051.'
                },
                {
                    id: 'app-ex3',
                    type: 'short-answer',
                    question: 'For the logistic equation P\' = 0.5P(1 - P/200), what is the carrying capacity and at what population does the fastest growth occur?',
                    hint: 'The carrying capacity K is in the denominator with P. The fastest growth is at the inflection point P = K/2.',
                    solution: 'The carrying capacity is K = 200. The fastest growth occurs at P = K/2 = 100, where the logistic curve has its inflection point.'
                },
                {
                    id: 'app-ex4',
                    type: 'short-answer',
                    question: 'A 200-liter tank initially contains 10 g of salt dissolved in water. Pure water flows in at 5 L/min and the well-mixed solution flows out at 5 L/min. Find Q(t), the amount of salt at time t.',
                    hint: 'No salt enters (c_in = 0), so dQ/dt = -5Q/200 = -Q/40. This is exponential decay.',
                    solution: 'dQ/dt = -Q/40, Q(0) = 10. Solution: Q(t) = 10 e^{-t/40}. The salt decays exponentially with time constant 40 minutes.'
                }
            ]
        }
    ]
});
