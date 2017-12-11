// Can be removed once new version of glamor is released
declare module 'glamor' {
  interface TimeLine {
    [timelineValue: string]: any;
  }

  namespace css {
    export function keyframes(timeline: TimeLine): string;
    export function keyframes(name: string, timeline: TimeLine): string;
  }
}

// Can be removed once https://github.com/apollographql/react-apollo/issues/1286 is resolved
declare module 'lodash.flowright';
