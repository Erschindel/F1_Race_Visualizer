import React from 'react';
import MainView from './MainView';

export default class RaceMap extends React.Component {
  render() {
    return (
      <div className="mapContainer">
        <br />
        <div className="mapLeft">
          <ul>
            <li>Here</li>
            {/* {props.race.Timings.map((x) => {
                    return <li key={Number(x.position)}>{x.driverId}</li>;
                  })} */}
          </ul>
        </div>
        <div className="mapRight">
          <canvas id="paper-canvas" resize="true" />
          <MainView />

          {/* take 3: trying paperjs raw
                <html>
                  <head>
                    <script type="text/javascript" src="js/paper.js"></script>
                    <script type="text/paperscript" canvas="myCanvas">
                    
                    let path = new Path();
                    path.strokeColor = 'black';
                    var start = new Point(100, 100);
                    </script>
                  </head>
                  <body>
                    <canvas id="myCanvas" resize></canvas>
                  </body>
                </html> */}

          {/* take 2: emergency strat
        
                <svg width="500" height="400">
                  <path d="M50,125 C 100,25 150,225, 200, 125" className="path1" />
                  {/* Triangle to be moved along the motion path.
                    It is defined with an upright orientation with the base of
                    the triangle centered horizontally just above the origin. */}
          {/*<circle
                    r="10"
                    stroke="black"
                    strokeWidth="2"
                    fill="red"
                    className="path2"
                  >
                    <animateMotion
                      path="M50,125 C 100,25 150,225, 200, 125"
                      rotate="auto"
                      keyPoints="0;0.1;.9"
                      keyTimes="0;0.3;1"
                      calcMode="linear"
                      dur="1s"
                      fill="freeze"
                    />
                  </circle>
                </svg>*/}

          {/* take 1: playing w svgs */}
          {/* <svg>
                  <path d="M 93.123884,196.38225 70.759608,175.22858 c 0,0 -4.684647,-3.65102 -2.605776,-9.34428 2.078868,-5.69327 -1.275672,-11.19755 -6.000373,-15.63877 -4.724702,-4.44122 -18.312745,-15.91312 -27.040924,-31.21037 -1.670435,-3.10701 -3.951156,-7.53722 3.700895,-8.68974 l 2.947434,-0.36401 c 0,0 6.046973,0.7684 5.011303,-7.58377 -1.035669,-8.352175 -3.588387,-15.368622 6.238994,-21.463488 9.827381,-6.094866 19.324033,-8.787946 23.151042,-12.142485 3.827008,-3.354539 6.709077,-1.74814 9.260416,0.330729 2.55134,2.078869 6.083786,2.739698 11.128498,3.641733 5.044713,0.902035 13.563933,5.545843 16.236623,15.969354 2.6727,10.423512 3.14877,14.257167 4.04245,18.040697 0.42596,2.35531 0.5763,4.87767 -3.20723,6.34765 0,0 -4.95481,1.68844 -6.04149,7.64156 -1.08668,5.95313 -2.78757,15.0718 -0.14174,25.79688 2.64584,10.72507 9.79061,17.81015 17.38592,24.25393 0,0 4.63303,4.8487 11.58204,3.04463 6.949,-1.80407 9.49112,1.42763 15.20801,5.72711 5.71689,4.29948 14.71232,13.38649 19.22954,28.63169 3.66471,12.36808 4.10726,14.62992 4.31606,15.95791 0.45698,2.96525 -0.58418,4.6907 -3.25688,5.70966 l -12.75282,5.027 c -4.29948,1.70089 -9.35491,1.63002 -12.94568,-4.60658 -2.3052,-4.09256 -4.05326,-8.83627 -4.84282,-10.13449 -2.38872,-4.2095 -5.20598,-4.21735 -7.79515,-0.72614"></path>
                </svg> */}
        </div>
      </div>
    );
  }
}
