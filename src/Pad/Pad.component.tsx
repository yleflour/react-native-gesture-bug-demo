import * as React from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import Svg, { Defs, ClipPath, Circle, G, Path } from "react-native-svg";
import { DIR } from "./Pad.types";
import { getRelativePosition } from "./Pad.utils";

interface Props {
  size: number;
}

const STYLE = {
  backgroundColor: "red",
  buttonColor__iddle: "red",
  buttonColor__active: "darkred",
  strokeColor: "black",
  strokeWidth: 13,
};

const DEADZONE = 0.2;

export const Pad = (props: Props) => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const [xValue, yValue] = React.useMemo<
    [DIR.NEUTRAL | DIR.LEFT | DIR.RIGHT, DIR.NEUTRAL | DIR.UP | DIR.DOWN]
  >(
    // prettier-ignore
    () => [
      pos.x >= DEADZONE ? DIR.RIGHT : pos.x <= -DEADZONE ? DIR.LEFT : DIR.NEUTRAL,
      pos.y >= DEADZONE ? DIR.DOWN : pos.y <= -DEADZONE ? DIR.UP : DIR.NEUTRAL,
    ],
    [pos]
  );

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    // 0x1 left, 0x2 right, 0x4 up, 0x8 down
    const xPos = getRelativePosition(event.nativeEvent.x, props.size);
    const yPos = getRelativePosition(event.nativeEvent.y, props.size);
    setPos({ x: xPos, y: yPos });
  };

  const onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (
      event.nativeEvent.state === State.CANCELLED ||
      event.nativeEvent.state === State.END
    ) {
      setPos({ x: 0, y: 0 });
    }
    if (event.nativeEvent.state === State.BEGAN) onGestureEvent(event);
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Svg viewBox="0 0 447.17 447.17" width={props.size} height={props.size}>
        <Defs>
          <ClipPath id="clip-path">
            <Circle id="mask" cx={223.59} cy={223.59} r={192.86} />
          </ClipPath>
        </Defs>
        <G id="Layer_2" data-name="Layer 2">
          <G id="Pad">
            <Circle
              id="outside"
              cx={223.59}
              cy={223.59}
              r={219.59}
              fill={STYLE.backgroundColor}
              stroke={STYLE.strokeColor}
              strokeWidth={STYLE.strokeWidth}
            />
            <G id="pad-2" data-name="pad">
              <Circle
                id="mask-2"
                data-name="mask"
                cx={223.59}
                cy={223.59}
                r={192.86}
              />
              <G clipPath="url(#clip-path)">
                <Path
                  id="up"
                  d="M287.23 159.94V30.73H159.94v129.21l63.65 63.65 63.64-63.65z"
                  fill={
                    yValue === DIR.UP
                      ? STYLE.buttonColor__active
                      : STYLE.buttonColor__iddle
                  }
                  stroke={STYLE.strokeColor}
                  strokeWidth={STYLE.strokeWidth}
                />
                <Path
                  id="down"
                  d="M159.94 287.23v129.21h127.29V287.23l-63.64-63.64-63.65 63.64z"
                  fill={
                    yValue === DIR.DOWN
                      ? STYLE.buttonColor__active
                      : STYLE.buttonColor__iddle
                  }
                  stroke={STYLE.strokeColor}
                  strokeWidth={STYLE.strokeWidth}
                />
                <Path
                  id="right"
                  d="M223.59 223.59l63.64 63.64h129.21V159.94H287.23l-63.64 63.65z"
                  fill={
                    xValue === DIR.RIGHT
                      ? STYLE.buttonColor__active
                      : STYLE.buttonColor__iddle
                  }
                  stroke={STYLE.strokeColor}
                  strokeWidth={STYLE.strokeWidth}
                />
                <Path
                  id="left"
                  d="M159.94 159.94H30.73v127.29h129.21l63.65-63.64-63.65-63.65z"
                  fill={
                    xValue === DIR.LEFT
                      ? STYLE.buttonColor__active
                      : STYLE.buttonColor__iddle
                  }
                  stroke={STYLE.strokeColor}
                  strokeWidth={STYLE.strokeWidth}
                />
              </G>
            </G>
            <Circle
              id="inside"
              cx={223.59}
              cy={223.59}
              r={192.86}
              fill="none"
              stroke={STYLE.strokeColor}
              strokeWidth={STYLE.strokeWidth}
              strokeMiterlimit={10}
            />
          </G>
        </G>
      </Svg>
    </PanGestureHandler>
  );
};
