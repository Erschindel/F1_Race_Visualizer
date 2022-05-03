import {
  select as d3_select,
  interpolateString as d3_interpolateString,
} from "d3";
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
    const { laps } = this.props;
    let first = current.firstChild;
    // remove empty svgs from react auto-rendering
    while (first && !first.firstChild) {
      current.removeChild(first);
      first = current.firstChild;
    }
    // remove old svgs
    current.firstChild && current.removeChild(current.firstChild);
    let pathData = laps.shape;
    laps.race && this.createView(pathData);
  }
  createView = (path = "") => {
    const { race } = this.props.laps;
    const current = d3_select(this.myRef.current);
    const outerWidth = 800;
    const outerHeight = 600;
    let pathData = path;

    const fastest = {};
    const times = [];
    let loadedRace = false;
    race && race.Timings && (loadedRace = true);

    // determine fastest lap, store lap times
    if (loadedRace) {
      race.Timings.forEach((x, i) => {
        const timeStrSplit = x.time.split(":");
        const min = Number(timeStrSplit[0]);
        const [sec, milli] = timeStrSplit[1].split(".");
        const totalMillis =
          min * 60 * 1000 + Number(sec) * 1000 + Number(milli);
        times.push({ totalMillis, driver: x.driverId });
        if (!fastest.totalMillis || fastest.totalMillis > totalMillis) {
          fastest.totalMillis = totalMillis;
          fastest.i = i;
          fastest.time = timeStrSplit;
        }
      });
    }

    const sortedTimes = times.sort((a, b) => a.totalMillis - b.totalMillis);
    let scalingFactor = 2.5;

    // find start coordinates of track from pathData
    let [startX, startY] =
      pathData.length !== 0
        ? pathData
            .split(" ")[1]
            .split(",")
            .map((x) => Number(x) * scalingFactor)
        : [0, 0];

    // build svg container
    const svg = current
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", `scale(${scalingFactor})`);

    // add arrow marker to start
    svg
      .append("defs")
      .data(["end"])
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5");

    // render track path
    svg
      .append("path")
      .attr("id", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", pathData)
      .attr("marker-end", "url(#arrow)")
      .attr("transform", `scale(${scalingFactor})`);

    // position track in top left corner of container node
    const bbox = svg.node().parentNode.getBBox();
    svg.attr(
      "transform",
      `translate(${-bbox.x / scalingFactor + 40},${
        -bbox.y / scalingFactor + 40
      })`
    );

    const fullTrack = svg.node().firstChild.nextSibling;
    const trackLength = fullTrack.getTotalLength();

    // render markers
    let markers = [];
    loadedRace &&
      race.Timings.forEach((_, i) => {
        // add name text for each marker
        svg
          .append("svg:text")
          .attr("text-anchor", "middle")
          .attr("transform", `translate(${startX},${startY})`)
          .attr("class", "driverNames")
          .style("opacity", 0)
          .style("display", "block")
          .style("z-index", -1)
          .text(function () {
            return sortedTimes[i].driver;
          });
        // create markers
        markers.push(
          svg
            .append("circle")
            .attr("id", "marker")
            .attr("r", 5)
            .attr("fill", "#fff")
            .attr("stroke-width", 2)
            .attr("stroke", "steelblue")
            .style("display", "block")
            .style("z-index", 10)
            .attr("transform", `translate(${startX},${startY})`)
        );
      });

    // tween markers along path
    markers.forEach((x, i) => {
      x.on("mouseover", function () {
        const p = fullTrack.getPointAtLength(
          trackLength * (fastest.totalMillis / times[i].totalMillis)
        );
        d3_select(this).attr("r", 10);
        d3_select(svg.node().childNodes[(i + 1) * 2])
          .style("opacity", 1)
          .style("z-index", 10000) // should put text in front of dots, but finnicky
          .attr(
            "transform",
            "translate(" + [p.x * scalingFactor, p.y * scalingFactor + 25] + ")"
          );
      })
        .on("mouseout", function () {
          d3_select(this).attr("r", 5);
          d3_select(svg.node().childNodes[(i + 1) * 2])
            .style("opacity", 0)
            .style("z-index", -1); // should put text behind dots, but finnicky
        })
        .transition()
        .duration(1000)
        .attrTween("transform", function () {
          return trackLength
            ? function (t) {
                const p = fullTrack.getPointAtLength(
                  trackLength * (fastest.totalMillis / times[i].totalMillis) * t // can adjust length of path traveled here
                );
                return (
                  "translate(" +
                  [p.x * scalingFactor, p.y * scalingFactor] +
                  ")"
                );
              }
            : () => "";
        })
        .on("end", function () {
          d3_select(this).transition().duration(600).style("opacity", 0.5);
        });
    });

    path = "" && svg.remove();
  };

  render() {
    const { laps } = this.props;
    return (
      <div className="mapRight">
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
