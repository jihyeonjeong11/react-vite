# 기존에 알고있던 내용 + v6 최신 내용 가리지 않고 정리함

먼저 react-touer 와 react-router-dom 중 무엇을 사용하는가??

react-router-dom을 사용한다.

react-router 가 코어 기능을 export하며, react-router-dom에서는 위 코어를 활용한 end-components를 제공하는데,

react-router-dom에서 react-router 코드를 포함하고 또 재 export하기 떄문에 실제 사용에선 *react-router-dom*만 사용해도 괜찮음.

