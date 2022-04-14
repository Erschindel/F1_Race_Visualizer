import paper from 'paper';

export default function Sketch() {
  window.onload = function () {
    paper.install(window);
    paper.setup('paper-canvas');

    paper.Path.prototype.getPointAtPercent = function (percent) {
      return this.getLocationAt(percent * this.length).getPoint();
    };

    const { circle, path } = initial_draw();
    window.circle = circle;
    window.path = path;
    let animationEndTime = null;
    window.animationEndTime = animationEndTime;

    paper.view.onFrame = draw;
  };

  function initial_draw() {
    let pathData =
      'M 93.123884,196.38225 70.759608,175.22858 c 0,0 -4.684647,-3.65102 -2.605776,-9.34428 2.078868,-5.69327 -1.275672,-11.19755 -6.000373,-15.63877 -4.724702,-4.44122 -18.312745,-15.91312 -27.040924,-31.21037 -1.670435,-3.10701 -3.951156,-7.53722 3.700895,-8.68974 l 2.947434,-0.36401 c 0,0 6.046973,0.7684 5.011303,-7.58377 -1.035669,-8.352175 -3.588387,-15.368622 6.238994,-21.463488 9.827381,-6.094866 19.324033,-8.787946 23.151042,-12.142485 3.827008,-3.354539 6.709077,-1.74814 9.260416,0.330729 2.55134,2.078869 6.083786,2.739698 11.128498,3.641733 5.044713,0.902035 13.563933,5.545843 16.236623,15.969354 2.6727,10.423512 3.14877,14.257167 4.04245,18.040697 0.42596,2.35531 0.5763,4.87767 -3.20723,6.34765 0,0 -4.95481,1.68844 -6.04149,7.64156 -1.08668,5.95313 -2.78757,15.0718 -0.14174,25.79688 2.64584,10.72507 9.79061,17.81015 17.38592,24.25393 0,0 4.63303,4.8487 11.58204,3.04463 6.949,-1.80407 9.49112,1.42763 15.20801,5.72711 5.71689,4.29948 14.71232,13.38649 19.22954,28.63169 3.66471,12.36808 4.10726,14.62992 4.31606,15.95791 0.45698,2.96525 -0.58418,4.6907 -3.25688,5.70966 l -12.75282,5.027 c -4.29948,1.70089 -9.35491,1.63002 -12.94568,-4.60658 -2.3052,-4.09256 -4.05326,-8.83627 -4.84282,-10.13449 -2.38872,-4.2095 -5.20598,-4.21735 -7.79515,-0.72614';
    let path = new paper.Path(pathData);
    path.strokeColor = 'blue';
    path.strokeWidth = 2;
    path.closed = true;

    let [startX, startY] = pathData
      .split(' ')[1]
      .split(',')
      .map((x) => Number(x));

    const circle = new paper.Path.Circle({
      center: new Point(startX, startY),
      radius: 5,
      fillColor: 'red',
    });
    return { circle, path };
  }

  function draw(event) {
    const duration = 1000;
    let now = Date.now();

    if (!animationEndTime) {
      animationEndTime = now + duration;
    }

    if (now <= animationEndTime) {
      let percent = (duration - (animationEndTime - now)) / duration;
      circle.position = path.getPointAtPercent(percent);
    }
  }

  return null;
}
