import * as React from "react";
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import Svg, { Circle, G } from "react-native-svg";

interface Props {
  size: number;
}

const STYLE = {
  backgroundColor: "red",
  buttonColor__iddle: "red",
  buttonColor__active: "darkred",
  strokeColor: "black",
  strokeWidth: 9,
};

export const Button = (props: Props) => {
  const [pressed, setPressed] = React.useState(false);

  const onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (
      event.nativeEvent.state === State.CANCELLED ||
      event.nativeEvent.state === State.END
    ) {
      setPressed(false);
    }
    if (event.nativeEvent.state === State.BEGAN) setPressed(true);
  };

  return (
    <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
      <Svg
        {...props}
        viewBox="0 0 130.38 130.38"
        width={props.size}
        height={props.size}
      >
        <G data-name="Layer 2">
          <G
            data-name="Layer 3"
            stroke={STYLE.strokeColor}
            strokeMiterlimit={10}
            strokeWidth={STYLE.strokeWidth}
          >
            <Circle
              cx={65.19}
              cy={65.19}
              r={60.69}
              fill={STYLE.backgroundColor}
            />
            <Circle
              cx={65.19}
              cy={65.19}
              r={44.66}
              fill={
                pressed ? STYLE.buttonColor__active : STYLE.buttonColor__iddle
              }
            />
          </G>
        </G>
      </Svg>
    </PanGestureHandler>
  );
};
