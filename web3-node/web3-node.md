# Managing Ether & Contract using web3.js in Node.js

## test env

- network: Mainnet & Ropsten Testnet
- language: javascrpit (in nodejs)
- libraries: web3.js, ethereumjs-tx.js
- ether node server: infura api

## test address

- https://ropsten.etherscan.io/address/0x4a1f48826b4b1aae6616419640e453cccc112220
- https://ropsten.etherscan.io/address/0x62cd1b0fb46ab3896e26049818595af39c0caa76

## 해본 작업

- ETH 지갑 잔고 조회
- ETH 전송 (with Transfer Txn)
- Contract 에서 정보 얻어보기
  - totalSupply
  - name
  - symbol
  - balanceOf
- 빌드 된 Contract 노트 배포
- Contract token 전송
- 과거 Contract events query 해보기
  - block number range
  - type filter(transfer, approval)
- Ether Block 정보 가져오기
  - latest block number
  - block info(json)
  - block의 Transaction

## Questions

- gas price 의 적정값은?
- gas limit 의 적정값은?
  - intrinsic gas too low
- Transaction Fee 가 결정되는 원리
  - 뭔가 gas limit 이랑 관련이 있는 것 같다.
  - Burnt & Txn Savings Fees ???
- etherscan.io. 에는 잡히는 txn 인데 메타마스크에는 activity로 나오지 않음
  - ETH는 receive 이벤트만 나옴
  - 내가 등록한 token 은 receive 이벤트도 나오지 않음

## Refereneces

- https://www.dappuniversity.com/articles/web3-js-intro
