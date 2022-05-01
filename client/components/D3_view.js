import { select as d3_select } from "d3";
import React from "react";
import { connect } from "react-redux";

class D3_view extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.createView();
  }
  componentDidUpdate() {
    const { current } = this.myRef;
    let first = current.firstChild;
    while (first && !first.firstChild) {
      // remove empty svgs
      current.removeChild(first);
      first = current.firstChild;
    }
    // remove finished svgs
    current.firstChild && current.removeChild(current.firstChild);

    let pathData =
      "M 93.123884,196.38225 70.759608,175.22858 c 0,0 -4.684647,-3.65102 -2.605776,-9.34428 2.078868,-5.69327 -1.275672,-11.19755 -6.000373,-15.63877 -4.724702,-4.44122 -18.312745,-15.91312 -27.040924,-31.21037 -1.670435,-3.10701 -3.951156,-7.53722 3.700895,-8.68974 l 2.947434,-0.36401 c 0,0 6.046973,0.7684 5.011303,-7.58377 -1.035669,-8.352175 -3.588387,-15.368622 6.238994,-21.463488 9.827381,-6.094866 19.324033,-8.787946 23.151042,-12.142485 3.827008,-3.354539 6.709077,-1.74814 9.260416,0.330729 2.55134,2.078869 6.083786,2.739698 11.128498,3.641733 5.044713,0.902035 13.563933,5.545843 16.236623,15.969354 2.6727,10.423512 3.14877,14.257167 4.04245,18.040697 0.42596,2.35531 0.5763,4.87767 -3.20723,6.34765 0,0 -4.95481,1.68844 -6.04149,7.64156 -1.08668,5.95313 -2.78757,15.0718 -0.14174,25.79688 2.64584,10.72507 9.79061,17.81015 17.38592,24.25393 0,0 4.63303,4.8487 11.58204,3.04463 6.949,-1.80407 9.49112,1.42763 15.20801,5.72711 5.71689,4.29948 14.71232,13.38649 19.22954,28.63169 3.66471,12.36808 4.10726,14.62992 4.31606,15.95791 0.45698,2.96525 -0.58418,4.6907 -3.25688,5.70966 l -12.75282,5.027 c -4.29948,1.70089 -9.35491,1.63002 -12.94568,-4.60658 -2.3052,-4.09256 -4.05326,-8.83627 -4.84282,-10.13449 -2.38872,-4.2095 -5.20598,-4.21735 -7.79515,-0.72614";
    this.props.laps.race && this.createView(pathData);
  }
  createView = (path = "") => {
    const { race } = this.props.laps;
    let clear = false;
    const current = d3_select(this.myRef.current);
    const margin = { top: 10, right: 10, bottom: 20, left: 30 };
    const outerWidth = 500;
    const outerHeight = 500;
    // const innerWidth = outerWidth - margin.left - margin.right;
    // const innerHeight = outerHeight - margin.top - margin.bottom;
    let pathData = path;
    // const { laps } = this.props;
    const fastest = {};
    const times = [];
    let loadedRace = false;

    race && race.Timings && (loadedRace = true);

    if (loadedRace) {
      race.Timings.forEach((x, i) => {
        const timeStr = x.time;
        const min = Number(timeStr.split(":")[0]);
        const [sec, milli] = timeStr.split(":")[1].split(".");
        const totalMillis =
          min * 60 * 1000 + Number(sec) * 1000 + Number(milli);
        times.push(totalMillis);
        if (!fastest.totalMillis || fastest.totalMillis > totalMillis) {
          fastest.totalMillis = totalMillis;
          fastest.i = i;
          fastest.time = timeStr;
        }
      });
    }

    let [startX, startY] =
      pathData.length !== 0
        ? pathData
            .split(" ")[1]
            .split(",")
            .map((x) => Number(x))
        : [0, 0];

    path === "" && (clear = true);

    const svg = current
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("path")
      .attr("id", "line")
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke", "steelblue")
      .attr("d", pathData);

    const fullTrack = svg.node().firstChild;
    const trackLength = fullTrack.getTotalLength();

    // Render marker.
    let markers = [];
    race &&
      race.Timings &&
      race.Timings.forEach(() => {
        markers.push(
          svg
            .append("circle")
            .attr("id", "marker")
            .attr("r", 5)
            .attr("fill", "#fff")
            .attr("stroke-width", 2)
            .attr("stroke", "steelblue")
            .attr("transform", "translate(" + startX + "," + startY + ")")
        );
      });
    // const marker = svg
    //   .append("circle")
    //   .attr("id", "marker")
    //   .attr("r", 5)
    //   .attr("fill", "#fff")
    //   .attr("stroke-width", 2)
    //   .attr("stroke", "steelblue")
    //   .attr("transform", "translate(" + startX + "," + startY + ")");

    markers.forEach((x, i) => {
      x.transition()
        .duration(1000)
        //   .ease("linear")
        .attrTween("transform", function () {
          return trackLength
            ? function (t) {
                const p = fullTrack.getPointAtLength(
                  trackLength * (fastest.totalMillis / times[i]) * t // can adjust length of path traveled here
                );
                return "translate(" + [p.x, p.y] + ")";
              }
            : (t) => "";
        })
        .on("end", function () {
          // might need "each" instead of "on" later
          d3_select(this)
            .transition()
            .duration(600)
            //   .attr("r", 10)
            .style("opacity", 0.5);
          //   .remove();
        });
    });

    clear && svg.remove();
    // path === "" && clear();
    // function clear() {
    //   marker.remove();
    //   svg.remove();
    //   //   current.attr("display", "none");
    //   //   console.log(current);
    // }
  };
  render() {
    const { laps } = this.props;
    return (
      <div>
        {!laps.race && <p>No race selected</p>}
        <div ref={this.myRef}></div>
      </div>
    );
  }
}

function getPropsFromState(state) {
  return {
    races: state.races,
    latest: state.latest,
    laps: state.laps.race,
  };
}

export default connect(getPropsFromState)(D3_view);
