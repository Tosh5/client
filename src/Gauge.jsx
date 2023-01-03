import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GaugeProvider from './GaugeProvider';
import SendIndex from './SendIndex';


const Guage = (props) => {
  const { score } = props;

  // function for calculating the color
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // return an CSS hsl color string
    return 'hsl(' + c + ', 100%, 50%)';
  };

  return (
    <div 
    style={{
      width: '30vw', height: '40vh', 
      marginRight: 'auto', marginLeft: 'auto', 
      // alignItems: 'left', alignContent: 'left'
    }}
    // style={{width: '30vw', height: '40vh', marginRight: '5vw', marginLeft: 'auto', alignItems: 'right', alignContent: 'right'}}
    >
      <GaugeProvider valueStart={0} valueEnd={score}>
        {(value) => (
          <CircularProgressbar
            value={value}
            text={`${value} %`}
            circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
            styles={{
              trail: {
                strokeLinecap: 'butt',
                transform: 'rotate(-126deg)',
                transformOrigin: 'center center',
              },
              path: {
                strokeLinecap: 'butt',
                transform: 'rotate(-126deg)',
                transformOrigin: 'center center',
                stroke: calcColor(value, 0, 120),
              },
              text: {
                fill: '#ddd',
              }
            }
            }
            strokeWidth={10}
          />
        )}
      </GaugeProvider>
      <SendIndex />
    </div>
  );
};

export default Guage;