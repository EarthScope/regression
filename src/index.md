---
toc: true
---

This bite-sized explainer attempts to _interactively_ illustrate the findings published by Blewitt and Lavalleé in 2001 regarding bias in estimation of site velocities.

<a href="https://doi.org/10.1029/2001JB000570" target="_blank"><b>Blewitt, G., and Lavallée, D., Effect of annual signals on geodetic velocity, J. Geophys. Res., 107( B7), doi:10.1029/2001JB000570, 2002.</b></a>
<br>

## Least Squares

<div class="warning">If we naively fit a line using least squares to compute a velocity from daily positions for a given GNSS ground station, the resulting velocity estimate may be biased by un-modeled annual harmonics which are often present in GNSS timeseries.</div>

Below we have a simulated a daily GNSS time-series that includes an annual harmonic with an amplitude of **${amplitude} cm**. The simulated time-series does not include a velocity. However, the resulting line-fit indicates a negative trend or velocity.

```js
const amplitude = view(
  Inputs.range([0, 2], {
    label: "Amplitude (cm)",
    step: 0.1,
    value: 1,
  })
);
```

We can also model a velocity in our time series. See if you can create both a positive and negative slope using the slider below.

```js
const velocity = view(
  Inputs.range([-1, 1], {
    label: "Velocity [cm/year]",
    step: 0.1,
    value: 0.2, // cm
  })
);
```

```js
display(
  Plot.plot({
    width: width,
    x: {
      label: "Days",
      grid: true,
    },
    y: {
      domain: [-3, 3],
      label: "Displacement Up (cm)",
      grid: true,
    },
    marks: [
      Plot.dot(position, { x: (d) => d[0], y: (d) => d[1], fill: "black" }),
      Plot.linearRegressionY(position, {
        x: (d) => d[0],
        y: (d) => d[1],
        stroke: "orange",
        ci: 0.95,
      }),
    ],
  })
);
```

## Noise

Of course, our simulation should probably have a little noise. Here's a Normal distribution that assigns a random value for each position observation above. We can control the "noisiness" by changing the standard deviation (`sigma`).

```js
const sigma = view(
  Inputs.range([0, 2], {
    label: "Sigma",
    step: 0.01,
    value: 0.7,
  })
);
```

```js
display(
  Plot.plot({
    width: width,
    y: {
      domain: [-3, 3],
      grid: true,
    },
    marks: [
      Plot.dot(randomNormal, { x: (d) => d[0], y: (d) => d[1] }),
      Plot.linearRegressionY(randomNormal, {
        x: (d) => d[0],
        y: (d) => d[1],
        stroke: "blue",
        ci: 0.95,
      }),
    ],
  })
);
```

We can add the noise above to our model data to obtain this series of position observations with a real drift of ${d3.format(".2r")(velocity / 10)} mm per year.

```js
display(
  Plot.plot({
    width: width,
    x: {
      label: "Time",
      grid: true,
    },
    y: {
      domain: [-3, 3],
      label: "Displacement (cm)",
      grid: true,
    },
    marks: [
      Plot.dot(
        position.map((d, i) => [d[0], d[1] + randomNormal[i][1]]),
        { x: (d) => d[0], y: (d) => d[1] }
      ),
      Plot.linearRegressionY(position, {
        x: (d) => d[0],
        y: (d) => d[1],
        stroke: "orange",
        ci: 0.95,
      }),
    ],
  })
);
```

## Phase Shift

Try changing the phase of the harmonic using the toggle below. Notice anything about the orange line's <span style="color: orange"><b>slope</b></span>?

```js
const phase = view(
  Inputs.range([0, 365], {
    label: "Phase Shift [days]",
    step: 1,
    value: 0,
  })
);
```

How about if you change the length of the times series, does the slope change?

```js
const years = view(
  Inputs.range([1, 10], {
    label: "Duration [years]",
    step: 0.5,
    value: 3,
  })
);
```

## Bias

Our simulated observations above modeled by a real drift, an annual signal, and some noise gives us the following slope/intercept equation.

```tex
${d3.format(".3r")(solution.a)} t ${
  solution.b > 0 ? "+" : "-"
} ${d3.format(".3r")(Math.abs(solution.b))}
```

```js
const solution = statistics
  .regressionLinear()
  .x((d) => d[0])
  .y((d) => d[1])
  .domain(d3.extent(domain))(
  position.map((d, i) => [d[0], d[1] + randomNormal[i][1]])
);
```

## Further Reading

- <a href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1002/2015JB012552" target="_blank">Blewitt, G., Kreemer, C., Hammond, W. C., and Gazeaux, J. (2016), MIDAS robust trend estimator for accurate GPS station velocities without step detection, J. Geophys. Res. Solid Earth, 121, 2054– 2068, doi:10.1002/2015JB012552.</a>

```js
const domain = d3.range(0, years * 365, 1);
```

```js
const randomNormal = domain.map((d) => [d, d3.randomNormal(0, sigma)()]);
```

```js
// "Daily" position solutions from a GNSS station
const position = domain.map((day, i) => [day, simulatedTSFunc(day)]);
```

```js
const createSimulatedTSFunc = (velocity, phase, amplitude) => {
  return function (day) {
    return (
      (velocity / 365) * day +
      amplitude * Math.sin(((2 * Math.PI) / 365) * (day + phase))
    );
  };
};
```

```js
const simulatedTSFunc = createSimulatedTSFunc(velocity, phase, amplitude);
```

```js
import statistics from "d3-regression";
```
