// process가 pre-defined 된 창들을 가리킨다면, 메모, 비디오 등

// session은 유저가 어떻게 커스텀하였는지를 나타냄.
// 창의 크기, 위치, 안에 들어가는 value 등등


// import contextFactory from "../contextFactory";
// import type { SessionContextState } from "./useSessionContextState";
// import useSessionContextState from "./useSessionContextState";

// const { Consumer, Provider, useContext } = contextFactory<SessionContextState>(
//     useSessionContextState
// );

// export {
//   Consumer as SessionConsumer,
//   Provider as SessionProvider,
//   useContext as useSession,
// };

// 여기까지 적어놓고 value룰 any로 잡아줘서 일단 에러 안나도록 함.

// useProcessContextState를 복사해서 이름만 바꿔서 에러 안나도록 함.


import contextFactory from "../contextFactory";
//import type { SessionContextState } from "./useSessionContextState";
import useSessionContextState from "./useSessionContextState";

const { Consumer, Provider, useContext } = contextFactory<any>(
    useSessionContextState
);

export {
  Consumer as SessionConsumer,
  Provider as SessionProvider,
  useContext as useSession,
};

